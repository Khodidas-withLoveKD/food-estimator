import { Route, Routes } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import { routingPath } from './constants/RoutingPaths';

import './App.css';
import MenuAndMealSelectionPage from './pages/MenuAndMealSelectionPage';
import HeadCountPage from './components/HeadCountPage';
import SetMenuAndMenuOfTheWeekPage from './pages/SetMenuAndMenuOfTheWeekPage';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path={routingPath.MENU_OF_THE_WEEK_AND_MEAL_SELECTION_PAGE} element={ <MenuAndMealSelectionPage />} />
        <Route path={routingPath.HEAD_COUNT} element={<HeadCountPage/>} />
        <Route path={routingPath.SET_MENU} element={<SetMenuAndMenuOfTheWeekPage/>} />
      </Routes>
    </div>
  )
}


export default App;
