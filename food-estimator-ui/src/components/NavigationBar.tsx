import { useStyletron } from 'baseui';
import { useNavigate } from 'react-router-dom';

import { routingPath } from '../constants/RoutingPaths';
import { themeColors } from "../shared/theme";

const NavigationBar = () => {
  // TODO: add theme styling support

  const [css, theme] = useStyletron()
  const navigate = useNavigate()

  const navCss = {
    width: '100%',
    height: '60px',
    backgroundColor: themeColors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  const foodEstimatorLogo = () => {
    const logoCss = {
      marginLeft: '50px',
      color: themeColors.menuFontColor,
    }

    return (
      <span className={css(logoCss)}>
      Food Estimator
      </span>
    )
  }

  const menuItems = () => {
    const menuCss = {
      display: 'flex',
      justifyContent: 'space-evenly',
      marginRight: '20px',
      width: '40%',
      fontWeight: 500,
    }
    
    const menuItemCss = {
      color: themeColors.menuFontColor,
      cursor: 'pointer',
      ':hover' : {
        textDecoration: 'underline'
      }
    }
    
    const menuOfTheWeek = () => {
      return(
        <span className={css(menuItemCss)} onClick={() => navigate(routingPath.MENU_OF_THE_WEEK_AND_MEAL_SELECTION_PAGE)}>
          Hungry?
        </span>
      )
    }
    const headCount = () => {
      return(
        <span className={css(menuItemCss)} onClick={() => navigate(routingPath.HEAD_COUNT)}>
          Head Count
        </span>
      )
    }
    const setMenu = () => {
      return(
        <span className={css(menuItemCss)} onClick={() => navigate(routingPath.SET_MENU)}>
          Set Menu
        </span>
      )
    }
    const topFoods = () => {
      return(
        <span className={css(menuItemCss)} onClick={() => navigate(routingPath.TOP_FOOD)}>
          Top Foods
        </span>
      )
    }


    return (
      <div style={menuCss}>
        {menuOfTheWeek()}
        {topFoods()}
        {headCount()}
        {setMenu()}
      </div>
    )
  }

  return (
    <div style={navCss}>
      {foodEstimatorLogo()}
      {menuItems()}
    </div>
  )
}

export default NavigationBar;