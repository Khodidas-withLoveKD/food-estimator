import { useStyletron} from 'baseui';
import axios from 'axios';
import { themeColors } from '../shared/theme';


import { useEffect, useState } from 'react';
import { daysOfTheWeek, mealTimes } from '../constants/constants';
import { ISelect } from '../constants/interfaces';
import { day, meal } from '../constants/Enums';
import { containerCss } from '../constants/commonCss';


 
const baseUrl = 'http://localhost:10160/v1/food-estimator/'
const adminControllerUrl = baseUrl + 'admin/'

const headCountMap = new Map([
    [day.MON, [0, 0, 0]],
    [day.TUE, [0, 0, 0]],
    [day.WED,  [0, 0, 0]],
    [day.THURS, [0, 0, 0]],
    [day.FRI, [0, 0, 0]],
  ])

  const HeadCountPage = () => {
  const [css, theme] = useStyletron()

  const [mealHeadCount, setMealHeadCount] = useState<Map<String, Array<number>>>(headCountMap)
  console.log('HeadCount:', headCountMap)
  const mealToHeadCountMap = {
    [meal.BREAKFAST]: 0,
    [meal.LUCNH]: 1,
    [meal.DINNER]: 2
  }

  const dayStringToEnum = {
    "MON":day.MON,
    "TUE":day.TUE,
    "WED":day.WED,
    "THURS":day.THURS,
    "FRI":day.FRI
  }

  const mealStringToEnum = (mealType: string) => {
    let mealEnum;
    switch(mealType) {
        case "BREAKFAST": 
            mealEnum = meal.BREAKFAST
            break;
        case "LUNCH":
            mealEnum = meal.LUCNH
            break;
        case "DINNER":
            mealEnum = meal.DINNER
            break;
        default:
            mealEnum = meal.BREAKFAST
            break;
    }
    return mealEnum;
  }

  const calculateNewHeadCount = () => {
    const getHeadCountUrl = adminControllerUrl + 'getHeadCount'
     axios.get(getHeadCountUrl).then((response) => {
       console.log('kd response.data.responseObject:', response.data.responseObject)
       const headCountResponse = response.data.responseObject
       const currentHeadCountMap = new Map(mealHeadCount)
       
       const daysFromResponse :Array<String> = []
    for(const day in headCountResponse) {
        console.log("Key from response:",day)
        for(const mealType in headCountResponse[day]) {
            console.log("MealType:",mealType)
            const tempHeadCount = currentHeadCountMap.get(day) ?? []

            console.log("CurrentheadCount:",tempHeadCount)
            
            tempHeadCount[mealToHeadCountMap[mealStringToEnum(mealType)]] = headCountResponse[day][mealType]

            console.log("NewTemp:",tempHeadCount)

            currentHeadCountMap.set(day, tempHeadCount)

        }
    }
       console.log("ResponseDay:",daysFromResponse)

       setMealHeadCount(currentHeadCountMap)

     })
  }

  useEffect(() => { 
    calculateNewHeadCount()
  }, [])

  const heading = () => (
    <div className={css({
        marginBottom:'40px',
    })}>
      <h1 className={css({
        textDecoration: 'underline',
      })}>
        Head-Count
      </h1>
    </div>
  )

  const headCount = () => {
    const mealTimeLables: string[] = []
    mealTimeLables.push("day")
    mealTimes.map((meal:ISelect)=> mealTimeLables.push(meal.label))


    const renderMeals = () => {
        const renderEachMeal = () => 
           mealTimes.map((meal: ISelect) => 
            <span className={css({
              borderRadius: '16px',
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '10px',
              paddingRight: '10px',
              boxShadow: '0px 1.95px 2.6px rgba(0, 0, 0, 0.15)',
              marginLeft: '20px',
              backgroundColor: themeColors.selectedBgColor
            })}>
              {meal.label}
            </span>
          )

        return (
            <div className={css({
              display: 'flex',
              // justifyContent: 'space-evenly',
              marginLeft: '60px'
            })}>
              {renderEachMeal()}
            </div>
          )
  
    }

    const headers = () =>
    (
      <div className = {css({
          marginBottom:'20px',
        })}>
          {renderMeals()}
          </div>
      )

    const renderDayAndCount = (day: ISelect) =>{
        
        const dayOfTheWeek = (day: ISelect) => (
            <span className={css({
              width: '60px',
              fontWeight: 700,
              // marginRight: '200px'
              // display: 'flex'
            })}>
              {day.label}  :
            </span>
          ) 
        

        const countOfDay=(day:ISelect) =>{
            
            const headCountOfTheDay: Array<Number> = mealHeadCount.get(day.id) ?? []
            
            const getCountOfDay=(meal:ISelect) =>{
                
                switch(meal.label) {
                    case('Breakfast'):
                        return headCountOfTheDay[mealToHeadCountMap.BREAKFAST]
                    case('Lunch'):
                        return headCountOfTheDay[mealToHeadCountMap.LUNCH]
                    default:
                        return headCountOfTheDay[mealToHeadCountMap.DINNER]
                }
            }

            return mealTimes.map((meal: ISelect) => 
            <span className={css({
                marginTop: '5px',
                // marginBottom: '5px',
                marginRight: '20px',
                marginLeft: '63px'
              })}>
              {getCountOfDay(meal).toString()}
            </span>
          )
        }

        return (
            <div className={css({
              marginBottom:'20px',
              // justifyContent:'space-between',
              alignItems: 'center',
              width: "auto",
              display:'flex'
            })}>
              {dayOfTheWeek(day)}{countOfDay(day)}
            </div>
          )
        }


    return (
      <>
      <div id="1">
        {headers()}
      </div>
      <div id="2" className={css({
      })}>
          {daysOfTheWeek.map((day: ISelect) => renderDayAndCount(day)
          )}
        </div>
      </>
    )
                }
 return (
    <div className={css({
      ...containerCss,
      margin:'auto',
      width: '400px',
      marginTop: '20px',
      paddingLeft: '100px',
      paddingRight: '50px',
      paddingBottom: '50px',
    })}>
      {heading()}
      {headCount()}
    </div>
  )

}
export default HeadCountPage ;