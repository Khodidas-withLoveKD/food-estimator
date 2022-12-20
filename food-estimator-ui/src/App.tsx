import { Route, Routes } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import { routingPath } from './constants/RoutingPaths';

import './App.css';
import MenuAndMealSelectionPage from './pages/MenuAndMealSelectionPage';
import HeadCountPage from './components/HeadCountPage';
import RatingPage from './components/RatingPage';
import SetMenuAndMenuOfTheWeekPage from './pages/SetMenuAndMenuOfTheWeekPage';
import AddFoodItemsPage from './pages/AddFoodItemsPage';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path={routingPath.MENU_OF_THE_WEEK_AND_MEAL_SELECTION_PAGE} element={ <MenuAndMealSelectionPage />} />
        <Route path={routingPath.HEAD_COUNT} element={<HeadCountPage/>} />
        <Route path={routingPath.TOP_FOODS} element={<RatingPage/>} />
        <Route path={routingPath.SET_MENU} element={<SetMenuAndMenuOfTheWeekPage/>} />
        <Route path={routingPath.ADD_FOOD_ITEMS} element={<AddFoodItemsPage/>} />
      </Routes>
    </div>
  )
}


export default App;
