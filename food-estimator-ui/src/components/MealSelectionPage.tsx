import { useStyletron } from 'baseui';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { employeeBaseUrl, daysOfTheWeek, mealTimes, employeeId } from '../constants/constants';
import { ISelect } from '../constants/interfaces';
import { day, meal } from '../constants/Enums';
import { Button, SIZE } from 'baseui/button';

import { containerCss, hoverItemCss, leftPanelCss, selectedItemCss } from '../constants/commonCss';
import { themeColors } from '../shared/theme';

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
    const getMenuSelectionUrl = employeeBaseUrl + `${employeeId}/getSelection`
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

  const heading = () => (
    <h3 className={css({
      textDecoration: 'underline'
    })}>
      Meal Selection
    </h3>
  )

  const mealSelection = () => {
    const renderDayAndMeal = (day: ISelect) => {
      const dayOfTheWeek = (day: ISelect) => (
        <span className={css({
          width: '45px',
          fontWeight: 700
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
          const selectedCss = (mealId: any) => isSelected(mealId) ? selectedItemCss : { backgroundColor: themeColors.notSelectedColor}
          
          return mealTimes.map((meal: ISelect) => 
            <span className={css({
              borderWidth: '2px',
              borderRadius: '16px',
              cursor: 'pointer',
              width: 'min-content',
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '10px',
              paddingRight: '10px',
              ':hover': {
                ...hoverItemCss
              },
              ...selectedCss(meal.id)
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

  const saveMenuSelection = async () => {
    const generatePayload = () => {
      const payload:any = {}
      selectedMeal.forEach((value, key) => {
        payload[key] = value
      })
      return {selectedOptions: payload}
    }

    const postMenuSelectionUrl = employeeBaseUrl + `${employeeId}/selection`
    axios.post(postMenuSelectionUrl, generatePayload()).then((response: any) => {
      // TODO: create Toaster
      alert('Preference saved :)')
    })
  }

  const submitButton = () => (
    <div className={css({
      float: 'right',
      marginTop: '15px',
      marginRight: '20px'
    })}>
      <Button size={SIZE.compact} onClick={() => saveMenuSelection()}>Submit</Button>
    </div>
  )

  return (
    <div className={css({
      ...containerCss,
      ...leftPanelCss,
    })}>
      {heading()}
      {mealSelection()}
      {submitButton()}
    </div>
  )
}

export default MealSelectionPage;