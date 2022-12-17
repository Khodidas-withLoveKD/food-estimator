import axios from 'axios';

const baseUrl = 'http://localhost:10160/v1/food-estimator/'
const employeeControllerUrl = baseUrl + 'employee/'

export const foodEstimatorAPIs = {
  getMenuOfTheWeek: () => {
    const url = employeeControllerUrl + 'get-menu-of-the-week'
    axios.get(url).then((response) => {
      return response.data.responseObject
    })
  }
}