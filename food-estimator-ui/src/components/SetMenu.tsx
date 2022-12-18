import { useStyletron } from "baseui";
import { useEffect, useState } from "react";
import { adminControllerUrl } from "./api";
import { IFood, ISelect } from "../constants/interfaces";
import axios from 'axios';
import { Select, Value } from "baseui/select";
import { daysOfTheWeek, mealTimes } from "../constants/constants";
import { category, day, meal } from "../constants/Enums";
import { Button, SIZE } from "baseui/button";

interface ISetMenu {
  menuOfTheWeekCount: number;
  incrementMenuOfTheWeekCount: Function;
  setSelectedDayOfMenu: Function;
}

const SetMenu = (props: ISetMenu) => {
  const { menuOfTheWeekCount, incrementMenuOfTheWeekCount, setSelectedDayOfMenu } = props
  const [css, theme] = useStyletron()

  const [allFoods, setAllFoods] = useState<Array<ISelect>>()
  const [selectedBreakfastFoods, setSelectedBreakfastFoods] = useState<Value>()
  const [selectedLunchFoods, setSelectedLunchFoods] = useState<Value>()
  const [selectedDinnerFoods, setSelectedDinnerFoods] = useState<Value>()
  const [selectedDay, setSelectedDay] = useState<any>()

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
      switch(food.category) {
        case category.SALAD:
          statelessFoodOptions['Salads'].push({label: food.name, id: food.foodId.toString() })
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
      setFoodOptions(statelessFoodOptions)
    })
  }, [])

  const labelCss: any = {
    fontWeight: 500,
    fontSize: '15px',
    marginBottom: '5px'
  }

  const divCss: any = {
    textAlign: 'left',
    marginTop: '30px',
  }

  const heading = () => (
    <h3 className={css({
      textDecoration: 'underline'
    })}>
      Set Menu
    </h3>
  )

  const daySelect = () => (
    <div className={css(divCss)}>
      <div className={css(labelCss)}>Select Day</div>
      <Select
        options={daysOfTheWeek}
        value={selectedDay}
        placeholder={'Select Day'}
        onChange={currentDay => setSelectedDay(currentDay.value)}
        clearable={false}
        size={SIZE.compact}
        />
    </div>
  )

  const breakfastMenuSelect = () => (
    <div className={css(divCss)}>
      <div className={css(labelCss)}>Set Breakfast Menu</div>
      <Select
        options={foodOptions}
        id={'breakfast'}
        value={selectedBreakfastFoods}
        placeholder={'Select Food Items'}
        onChange={currentFood => setSelectedBreakfastFoods(currentFood.value)}
        labelKey={'label'}
        clearable={false}
        multi
        size={SIZE.compact}
      />
    </div>
  )
  
  const lunchMenuSelect = () => (
    <div className={css(divCss)}>
      <div className={css(labelCss)}>Set Lunch Menu</div>
      <Select
        options={foodOptions}
        id={'lunch'}
        value={selectedLunchFoods}
        placeholder={'Select Food Items'}
        onChange={currentFood => setSelectedLunchFoods(currentFood.value)}
        labelKey={'label'}
        clearable={false}
        multi
        size={SIZE.compact}
      />
    </div>
  )

  const dinnerMenuSelect = () => (
    <div className={css(divCss)}>
      <div className={css(labelCss)}>Set Dinner Menu</div>
      <Select
        options={foodOptions}
        id={'dinner'}
        value={selectedDinnerFoods}
        placeholder={'Select Food Items'}
        onChange={currentFood => setSelectedDinnerFoods(currentFood.value)}
        labelKey={'label'}
        clearable={false}
        multi
        size={SIZE.compact}
      />
    </div>
  )

  const setMenuOfTheDay = () => {
    const getBreakfastMenu = () => {
      const foodItems:Array<number> = []
      selectedBreakfastFoods?.forEach((item: any) => {
        foodItems.push(parseInt(item.id))
      })
      return foodItems
    }
    const getLunchMenu = () => {
      const foodItems:Array<number> = []
      selectedLunchFoods?.forEach((item: any) => {
        foodItems.push(parseInt(item.id))
      })
      return foodItems
    }
    const getDinnerMenu = () => {
      const foodItems:Array<number> = []
      selectedDinnerFoods?.forEach((item: any) => {
        foodItems.push(parseInt(item.id))
      })
      return foodItems
    }

    const payload:any = {}
    payload[selectedDay[0].id] = {
      [meal.BREAKFAST]: getBreakfastMenu(),
      [meal.LUCNH]: getLunchMenu(),
      [meal.DINNER]: getDinnerMenu()
    }
    console.log('kd payload:', payload)
    const setMenuUrl = adminControllerUrl + 'editMenu'
    axios.post(setMenuUrl, {newMenu: payload}).then((response: any) => {
      alert('menu added successfully')
      // on success call setMenuof the week
      incrementMenuOfTheWeekCount((menuOfTheWeekCount:number) => menuOfTheWeekCount + 1)
      setSelectedDayOfMenu(selectedDay[0].id)
    })
  }

  const submitButton = () => (
    <div className={css({
      float: 'right',
      marginTop: '15px'
    })}>
      <Button size={SIZE.compact} onClick={() => setMenuOfTheDay()}>Submit</Button>
    </div>
  )

  return (
    <div className={css({
      paddingRight: '50px',
      paddingLeft: '50px',
      width: '25%',
      backgroundColor: 'lime'
    })}>
      {heading()}
      {daySelect()}
      {breakfastMenuSelect()}
      {lunchMenuSelect()}
      {dinnerMenuSelect()}
      {submitButton()}
    </div>
  )
}

export default SetMenu;