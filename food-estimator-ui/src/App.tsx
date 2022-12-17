import { Route, Routes } from 'react-router-dom';

import MenuOfTheWeek from './components/MenuOfTheWeek';
import NavigationBar from './components/NavigationBar';
import { routingPath } from './constants/RoutingPaths';

import './App.css';
import MealSelectionPage from './components/MealSelectionPage';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path={routingPath.MENU_OF_THE_WEEK} element={ <MenuOfTheWeek />} />
        <Route path={routingPath.MEAL_SELECTION_PAGE} element={ <MealSelectionPage />} />
      </Routes>
    </div>
  )
}


export default App;
