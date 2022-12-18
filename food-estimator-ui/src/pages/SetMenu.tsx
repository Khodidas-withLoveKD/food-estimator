import { useStyletron } from "baseui";
import { useEffect, useState } from "react";
import { adminControllerUrl } from "../components/api";
import { IFood, ISelect } from "../constants/interfaces";
import axios from 'axios';
import { Select, Value } from "baseui/select";
import { daysOfTheWeek } from "../constants/constants";
import { category } from "../constants/Enums";


const SetMenu = () => {
  const [css, theme] = useStyletron()

  const [allFoods, setAllFoods] = useState<Array<ISelect>>()
  const [selectedBreakfastFoods, setSelectedBreakfastFoods] = useState<Value>()
  const [selectedLunchFoods, setSelectedLunchFoods] = useState<Value>()
  const [selectedDinnerFoods, setSelectedDinnerFoods] = useState<Value>()
  const [selectedDay, setSelectedDay] = useState<Value>()

  const [foodOptions, setFoodOptions] = useState<any>()

  const statelessFoodOptions = {
    Salads: [{}],
    Sabji: [{}],
    Breads: [{}],
    Rice: [{}],
    Sweets: [{}],
    Appetizers: [{}],
    Other: [{}]
  }

  useEffect(() => {
    const pushToFoodOptionsBasedOnCategory = (food: IFood) => {
      console.log('kd food:', food.category)
      switch(food.category) {
        case category.SALAD:
          console.log('kd INSIDE SALAD:')
          statelessFoodOptions['Salads'].push({label: food.name, id: food.foodId.toString() })
          console.log('kd foodOptions SALAD', statelessFoodOptions['Salads'])
          break
        
        case category.SABJI:
          statelessFoodOptions['Sabji'].push({label: food.name, id: food.foodId.toString() })
          break
        
        case category.BREAD:
          statelessFoodOptions['Breads'].push({label: food.name, id: food.foodId.toString() })
          break

        case category.RICE:
          statelessFoodOptions['Rice'].push({label: food.name, id: food.foodId.toString() })
          break

        case category.SWEETS:
          statelessFoodOptions['Sweets'].push({label: food.name, id: food.foodId.toString() })
          break

        case category.APPETIZER:
          statelessFoodOptions['Appetizers'].push({label: food.name, id: food.foodId.toString() })
          break

        case category.OTHERS:
          statelessFoodOptions['Other'].push({label: food.name, id: food.foodId.toString() })
          break
      }
    } 

    const getAllFoodsUrl = adminControllerUrl + 'get-all-food-items'
    axios.get(getAllFoodsUrl).then((response: any) => {
      const foodsFromResponse = response.data.responseObject
      const allFoodArr:Array<ISelect> = []

      foodsFromResponse.forEach((food: IFood) => {
        pushToFoodOptionsBasedOnCategory(food)
        allFoodArr.push({ label: food.name, id: food.foodId.toString() })
      })
      setAllFoods(allFoodArr)
  console.log('kd foodOptions:', statelessFoodOptions)
      setFoodOptions(statelessFoodOptions)
    })
  }, [])

  const daySelect = () => (
    <Select
      options={daysOfTheWeek}
      value={selectedDay}
      placeholder={'Select Day'}
      onChange={currentDay => setSelectedDay(currentDay.value)}
      clearable={false}
    />
  )

  const breakfastMenuSelect = () => (
    <Select
      options={foodOptions}
      id={'breakfast'}
      value={selectedBreakfastFoods}
      placeholder={'Select Food Items'}
      onChange={currentFood => setSelectedBreakfastFoods(currentFood.value)}
      labelKey={'label'}
      clearable={false}
      multi
    />
  )
  
  const lunchMenuSelect = () => (
    <Select
      options={foodOptions}
      id={'lunch'}
      value={selectedLunchFoods}
      placeholder={'Select Food Items'}
      onChange={currentFood => setSelectedLunchFoods(currentFood.value)}
      labelKey={'label'}
      clearable={false}
      multi
    />
  )

  const dinnerMenuSelect = () => (
    <Select
      options={foodOptions}
      id={'dinner'}
      value={selectedDinnerFoods}
      placeholder={'Select Food Items'}
      onChange={currentFood => setSelectedDinnerFoods(currentFood.value)}
      labelKey={'label'}
      clearable={false}
      multi
    />
  )

  return (
    <div>
      {daySelect()}
      {breakfastMenuSelect()}
      {lunchMenuSelect()}
      {dinnerMenuSelect()}
    </div>
  )
}

export default SetMenu;