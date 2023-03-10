import { Route, Routes } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import { routingPath } from './constants/RoutingPaths';

import './App.css';
import MenuAndMealSelectionPage from './pages/MenuAndMealSelectionPage';
import HeadCountPage from './components/HeadCountPage';
import RatingPage from './components/RatingPage';
import SetMenuAndMenuOfTheWeekPage from './pages/SetMenuAndMenuOfTheWeekPage';
import AddFoodItemsPage from './pages/AddFoodItemsPage';
import HomePage from './pages/HomePage';

const employee_id = localStorage.getItem("employee_id")

function App() {
  // window.location.href =  employee_id ?'http://localhost:3000/login' : ''
  return (
    <div className="App">
      {employee_id ? <NavigationBar /> : <HomePage/>}
      {employee_id && <Routes>
        <Route path = {routingPath.LOGIN} element={<HomePage/>}/>
        <Route path={routingPath.MENU_OF_THE_WEEK_AND_MEAL_SELECTION_PAGE} element={ <MenuAndMealSelectionPage />} />
        <Route path={routingPath.HEAD_COUNT} element={<HeadCountPage/>} />
        <Route path={routingPath.TOP_FOODS} element={<RatingPage/>} />
        <Route path={routingPath.SET_MENU} element={<SetMenuAndMenuOfTheWeekPage/>} />
        <Route path={routingPath.ADD_FOOD_ITEMS} element={<AddFoodItemsPage/>} />
      </Routes>}
    </div>
  )
}


export default App;
