import { useEffect, useState } from "react";
import { category, day, meal } from "../constants/Enums";
import axios from 'axios';
import { useStyletron } from "baseui";
import {MessageCard} from 'baseui/message-card';
import { daysOfTheWeek, mealTimes } from "../constants/constants";
import { IFood, ISelect } from "../constants/interfaces";
import { themeColors } from "../shared/theme";
import { employeeControllerUrl } from "./api";

const mockFoodItem = {
    foodId: 0,
    name: '',
    imgUrl: '',
    foodDescription: "Pellentesque velit purus, luctus non lorem in, rutrum ultricies quam.",
    category: category.OTHERS,
    rating: 0,
    personsRated: 0
}

interface IMenuOfTheWeek {
  menuOfTheWeekCount?: number;
  selectedDayOfMenu?: string;
}

const MenuOfTheWeek = (props: IMenuOfTheWeek) => {
  const { menuOfTheWeekCount = 0, selectedDayOfMenu = day.MON } = props
  const [css, theme] = useStyletron()

  const [menu, setMenu] = useState<any>()
  const [breakfastOfTheDay, setBreakfastOfTheDay] = useState<Array<IFood>>([mockFoodItem])
  const [lunchOfTheDay, setLunchOfTheDay] = useState<Array<IFood>>([mockFoodItem])
  const [dinnerOfTheDay, setDinnerOfTheDay] = useState<Array<IFood>>([mockFoodItem])
  const [selectedDay, setSelectedDay] = useState<string>(selectedDayOfMenu)
  
  const getMenuOfTheWeek = () => {
    const url = employeeControllerUrl + 'get-menu-of-the-week'
      axios.get(url).then((response) => {
        setMenu(response.data.responseObject)
      })
  }

  // TODO: check if this ok
  // useEffect(() => {
  //   getMenuOfTheWeek()
  // }, [])

  useEffect(() => {
    getMenuOfTheWeek()
  }, [menuOfTheWeekCount, ])

  useEffect(() => {
    setSelectedDay(selectedDayOfMenu)
  }, [selectedDayOfMenu])

  useEffect(() => {
    if (menu) {
      setBreakfastOfTheDay(menu[selectedDay][meal.BREAKFAST])
      setLunchOfTheDay(menu[selectedDay][meal.LUCNH])
      setDinnerOfTheDay(menu[selectedDay][meal.DINNER])
    }
  }, [selectedDay, menu])

  const renderDaysOfTheWeek = () => {
    const selectedCss = (dayId: string) => ( selectedDay === dayId ? {backgroundColor: 'cyan'} : {})

    const renderEachDay = (day: ISelect) => (
      <span className={css({
        borderRadius: '16px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        cursor: 'pointer',
        boxShadow: '0px 1.95px 2.6px rgba(0, 0, 0, 0.15)',
        ':hover' : {
          textDecoration: 'underline',
          textDecorationColor: themeColors.primary
        },
        ...selectedCss(day.id)
      })} onClick={() => setSelectedDay(day.id)}>
        {day.label}
      </span>
    )

    return (
      <div className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
      })}>
        {daysOfTheWeek.map((day: ISelect) => 
          renderEachDay(day)
        )}
      </div>
    )
  }

  const renderMenuAsPerMealTime = () => {
    const mealHeading = (mealLabel: string) => (
      <div className={css({
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '10px'
      })}>
        {mealLabel}
      </div>
    )

    const renderMealItems = (mealId: string) => {
      const menuNotAvailable = () => <h4>Menu not decided yet! :(</h4>
      const getMealItems = (mealId: string) => {
        let currentMealItems: Array<IFood> = [mockFoodItem]
        switch(mealId) {
          case meal.BREAKFAST:
            currentMealItems = breakfastOfTheDay
            break;
          
          case meal.LUCNH:
            currentMealItems = lunchOfTheDay
            break;
          
          case meal.DINNER:
            currentMealItems = dinnerOfTheDay
            break;
        }
        return currentMealItems
      }

      const mealItems = getMealItems(mealId)
      return (
        <div className={css({
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        })}>
          {mealItems.length ? mealItems.map((food: IFood) =>          
            <MessageCard
              heading={food.name}
              paragraph={food.foodDescription}
              onClick={() => {}}
              image={{
                src: food.imgUrl,
                ariaLabel:
                  'A woman hiking through a valley with a yellow backpack',
              }}
              // backgroundColor={colors.teal200}
              overrides={{
                Root: {style: {marginBottom: '20px', minWidth: '200px', width: '30%', cursor: 'default'}},
                HeadingContainer: {style: {fontSize: '17px'}}
              }
            }
            />
          ) : menuNotAvailable()}
        </div>
      )
    }

    return (
      <div>
        {mealTimes.map((meal: ISelect) => 
          <div className={css({
            padding: '20px'
          })}>
            {mealHeading(meal.label)}
            {renderMealItems(meal.id)}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={css({
      paddingTop: '20px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingBottom: '20px',
      width: '60%',
      backgroundColor: 'pink',
      textAlign: 'left',
    })}>
      {renderDaysOfTheWeek()}
      {menu && renderMenuAsPerMealTime()}
    </div>
  )
}

export default MenuOfTheWeek;