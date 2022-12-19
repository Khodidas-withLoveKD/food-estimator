import { category, day, meal } from "./Enums";

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

export const categories = [
  {
    label: 'All Foods',
    id:category.ALL
  },
  {
    label: 'Salad',
    id: category.SALAD
  },
  {
    label: 'Bread',
    id: category.BREAD
  },
  {
    label: 'Sabji',
    id: category.SABJI
  },
  {
    label: 'Rice',
    id: category.RICE
  },
  {
    label: 'Appetizer',
    id:category.APPETIZER
  },
  {
    label:'Sweets',
    id:category.SWEETS
  },
  {
    label:'Others',
    id:category.OTHERS
  }
]

export const categoriesWithoutAllCategory = [
  {
    label: 'Salad',
    id: category.SALAD
  },
  {
    label: 'Bread',
    id: category.BREAD
  },
  {
    label: 'Sabji',
    id: category.SABJI
  },
  {
    label: 'Rice',
    id: category.RICE
  },
  {
    label: 'Appetizer',
    id:category.APPETIZER
  },
  {
    label:'Sweets',
    id:category.SWEETS
  },
  {
    label:'Others',
    id:category.OTHERS
  }
]


const baseUrl = 'http://localhost:10160/v1/food-estimator/'
export const employeeBaseUrl = baseUrl + 'employee/'
export const employeeId = 1