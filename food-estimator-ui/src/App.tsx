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
<<<<<<< HEAD
      <MealSelectionPage />
=======
      <Routes>
        <Route path={routingPath.MENU_OF_THE_WEEK} element={ <MenuOfTheWeek />} />
        <Route path={routingPath.MEAL_SELECTION_PAGE} element={ <MenuOfTheWeek />} />
      </Routes>
>>>>>>> 80a04f2ba2d8e5a53846dba43e959e2668a23aed
    </div>
  );
}


export default App;
