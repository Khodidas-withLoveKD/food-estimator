import { useStyletron } from 'baseui';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { employeeBaseUrl, daysOfTheWeek, mealTimes } from '../constants/constants';
import { ISelect } from '../constants/interfaces';
import { day, meal } from '../constants/Enums';

const selectedMealsMap = new Map([
  [day.MON, [true, false, false]],
  [day.TUE, [false, false, false]],
  [day.WED,  [false, false, false]],
  [day.THURS, [false, false, false]],
  [day.FRI, [false, false, false]],
])

const MealSelectionPage = () => {
  const [css, theme] = useStyletron()

  const [selectedMeal, setSelectedMeal] = useState<Map<string, Array<boolean>>>(selectedMealsMap)
  console.log('kd selectedMeal:', selectedMeal)
  const mealToIsSelectedMap = {
    [meal.BREAKFAST]: 0,
    [meal.LUCNH]: 1,
    [meal.DINNER]: 2
  }

  // mealToIsSelectedMap[meal.BREAKFAST]

  useEffect(() => {
    const getMenuSelectionUrl = employeeBaseUrl + '1/getSelection'
    axios.get(getMenuSelectionUrl).then((response) => {
      // response.data.responseObject
      console.log('kd response.data.responseObject:', response.data.responseObject)
    })
  }, [])

  const heading = () => (
    <div className={css({
      backgroundColor: 'pink'
    })}>
      <span className={css({
        fontSize: '20px',
        // color: themeColors.menuFontColor,
        textDecoration: 'underline'
      })}>
        Meal Selection
      </span>
    </div>
  )

  const mealSelection = () => {
    const renderDayAndMeal = (day: ISelect) => {
      const dayOfTheWeek = (day: ISelect) => (
        <span className={css({
          width: '45px'
        })}>
          {day.label}
        </span>
      )
      
      const renderMeals = () => {
        const renderEachMeal = () => {
          const mealOfTheDay: Array<boolean> = selectedMeal.get(day.id) ?? []
          const isSelected = (mealId: meal) => mealOfTheDay[mealToIsSelectedMap[mealId]]
          const isSelectedCss = (mealId: any) => {
            console.log(`kd day = ${day.id} | meal = ${mealId} | isSelected ${isSelected(mealId)}`)
            return isSelected(mealId) ? { backgroundColor: 'cyan' } : {}
          }
          
          return mealTimes.map((meal: ISelect) => 
            <span className={css({
              borderWidth: '2px',
              borderRadius: '16px',
              cursor: 'pointer',
              width: 'min-content',
              backgroundColor: 'palegoldenrod',
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '10px',
              paddingRight: '10px',
              ...isSelectedCss(meal.id)
            })}>
              {meal.label}
            </span>
          )
          }

        return (
          <div className={css({
            display: 'flex',
            justifyContent: 'space-evenly',
            flexGrow: 1
          })}>
            {renderEachMeal()}
          </div>
        )
      }

      return (
        <div className={css({
          backgroundColor: 'lime',
          marginTop: '10px',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center'
        })}>
          {dayOfTheWeek(day)} : {renderMeals()}
        </div>
      )
    }

    return (
      <div>
        {daysOfTheWeek.map((day: ISelect) => {
          return renderDayAndMeal(day)
        })}
      </div>
    )
  }

  return (
    <div className={css({
      paddingTop: '20px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingBottom: '20px',
      flexGrow: 0.4,
      backgroundColor: 'grey',
      position: 'sticky', // TODO: make position sticky work
      top: '100px'
    })}>
      {heading()}
      {mealSelection()}
    </div>
  )
}

export default MealSelectionPage;