import { useStyletron } from 'baseui';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { employeeBaseUrl, daysOfTheWeek, mealTimes } from '../constants/constants';
import { ISelect } from '../constants/interfaces';
import { day, meal } from '../constants/Enums';

const selectedMealsMap = new Map([
  [day.MON, [false, false, false]],
  [day.TUE, [false, false, false]],
  [day.WED,  [false, false, false]],
  [day.THURS, [false, false, false]],
  [day.FRI, [false, false, false]],
])

const MealSelectionPage = () => {
  const [css, theme] = useStyletron()

  const [selectedMeal, setSelectedMeal] = useState<Map<string, Array<boolean>>>(selectedMealsMap)
  const mealToIsSelectedMap = {
    [meal.BREAKFAST]: 0,
    [meal.LUCNH]: 1,
    [meal.DINNER]: 2
  }

  useEffect(() => {
    const getMenuSelectionUrl = employeeBaseUrl + '1/getSelection'
    axios.get(getMenuSelectionUrl).then((response) => {
      const selectedMealsResponse = response.data.responseObject
      const currentSelectedMealMap = new Map(selectedMeal)

      const setMealsArrayForCurrentDay = (currentSelectedMeals: Array<meal>, currentMealsArray: Array<boolean>) => {
        currentSelectedMeals.forEach((meal: meal) => {
          currentMealsArray[mealToIsSelectedMap[meal]] = true
        })
        return currentMealsArray
      }

      for (const selectedMealDay in selectedMealsResponse) {
        const selectedMeals = selectedMealsResponse[selectedMealDay].split(',')
        currentSelectedMealMap.set(selectedMealDay, setMealsArrayForCurrentDay(selectedMeals, currentSelectedMealMap.get(selectedMealDay) ?? []) )
      }
      setSelectedMeal(currentSelectedMealMap)
    })
  }, [])

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
        const markMeal = (markedMeal: any, markedDay: ISelect) => {
          const mealId: meal = markedMeal.id
          const currentSelectedMealMap = new Map(selectedMeal)
          const currentSelectedMealArray = currentSelectedMealMap.get(markedDay.id) ?? []
          currentSelectedMealArray[mealToIsSelectedMap[mealId]] = !currentSelectedMealArray[mealToIsSelectedMap[mealId]]
          currentSelectedMealMap.set(markedDay.id, currentSelectedMealArray) 
          setSelectedMeal(currentSelectedMealMap)
        }

        const renderEachMeal = () => {
          const mealOfTheDay: Array<boolean> = selectedMeal.get(day.id) ?? []
          const isSelected = (mealId: meal) => {
           return mealOfTheDay[mealToIsSelectedMap[mealId]]
          }
          const isSelectedCss = (mealId: any) => isSelected(mealId) ? { backgroundColor: 'cyan' } : {}
          
          return mealTimes.map((meal: ISelect) => 
            <span className={css({
              borderWidth: '2px',
              borderRadius: '16px',
              cursor: 'pointer',
              width: 'min-content',
              backgroundColor: 'pink',
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '10px',
              paddingRight: '10px',
              ...isSelectedCss(meal.id)
            })} onClick={() => markMeal(meal, day)}>
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
          backgroundColor: 'pink',
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
        {daysOfTheWeek.map((day: ISelect) => 
          renderDayAndMeal(day)
        )}
      </div>
    )
  }
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

  return (
    <div className={css({
      paddingTop: '20px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingBottom: '20px',
      flexGrow: 0.4,
      backgroundColor: 'grey',
      position: 'sticky', // TODO: make position sticky work OR make right thing scroll inside;
      top: '100px'
    })}>
      {heading()}
      {mealSelection()}
    </div>
  )
}

export default MealSelectionPage;