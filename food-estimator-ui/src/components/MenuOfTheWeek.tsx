import { useEffect, useState } from "react";
import { category, day, meal } from "../constants/Enums";
import { foodEstimatorAPIs } from "./api";
import axios from 'axios';
import { useStyletron } from "baseui";
const baseUrl = 'http://localhost:10160/v1/food-estimator/'
const employeeControllerUrl = baseUrl + 'employee/'


interface IFood {
  name: string;
  imgUrl: string;
  category: category;
  rating: number;
  personsRated: number;
}

const MenuOfTheWeek = () => {
  const [css, theme] = useStyletron()

  const [menu, setMenu] = useState<any>()
  const [breakfastOfTheDay, setBreakfastOfTheDay] = useState<Array<IFood>>()
  const [lunchOfTheDay, setLunchOfTheDay] = useState<Array<IFood>>()
  const [dinnerOfTheDay, setDinnerOfTheDay] = useState<Array<IFood>>()
  const [selectedDay, setSelectedDay] = useState<day>(day.MON)
  
  console.log('kd breakfastOfTheDay:', breakfastOfTheDay)
  console.log('kd lunchOfTheDay:', lunchOfTheDay)
  console.log('kd dinnerOfTheDay:', dinnerOfTheDay)

  useEffect(() => {
    const url = employeeControllerUrl + 'get-menu-of-the-week'
      axios.get(url).then((response) => {
        setMenu(response.data.responseObject)
        console.log('kd MENU', response.data.responseObject)
      })
  }, [])

  useEffect(() => {
    // on change of selectedDay
    // get that days menu
    if (menu) {
      console.log('kd IF MENU menu:', menu)
      setBreakfastOfTheDay(menu[selectedDay][meal.BREAKFAST])
      setLunchOfTheDay(menu[selectedDay][meal.LUCNH])
      setDinnerOfTheDay(menu[selectedDay][meal.DINNER])
    }
  }, [selectedDay, menu])

  return (
    <div>
      Menu FO the Week
    </div>
  )
}

export default MenuOfTheWeek;