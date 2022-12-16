import axios from 'axios';

const baseUrl = 'http://localhost:10160/v1/food-estimator/'
const employeeControllerUrl = baseUrl + 'employee/'

export const FoodEstimatorAPIs = {
  getMenuOfTheWeek: () => {
    const url = employeeControllerUrl + 'get-menu-of-the-week'
    axios.get(url).then((response) => {
      console.log(response)
    })
  }
}