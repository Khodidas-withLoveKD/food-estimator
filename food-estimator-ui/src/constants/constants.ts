import { day, meal } from "./Enums";

export const daysOfTheWeek = [
  {
    label: 'Mon',
    id: day.MON
  },
  {
    label: 'Tue',
    id: day.TUE
  },
  {
    label: 'Wed',
    id: day.WED
  },
  {
    label: 'Thurs',
    id: day.THURS
  },
  {
    label: 'Fri',
    id: day.FRI
  },
  // {
  //   label: 'Sat',
  //   id: day.SAT
  // },
  // {
  //   label: 'Sun',
  //   id: day.SUN
  // },
]

export const mealTimes = [
  {
    label: 'Breakfast',
    id: meal.BREAKFAST
  },
  {
    label: 'Lunch',
    id: meal.LUCNH
  },
  {
    label: 'Dinner',
    id: meal.DINNER
  },
]

const baseUrl = 'http://localhost:10160/v1/food-estimator/'
export const employeeBaseUrl = baseUrl + 'employee/'