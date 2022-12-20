import { useStyletron } from 'baseui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routingPath } from '../constants/RoutingPaths';
import { themeColors } from "../shared/theme";


let isAdminState: Boolean

if (localStorage.getItem("is_admin") === "False") {
  isAdminState = false
}
else{
  isAdminState = true
}

enum menuItemOptions {
  HUNGRY = 'HUNGRY',
  TOP_FOODS = 'TOP_FOODS',
  HEAD_COUNT = 'HEAD_COUNT',
  SET_MENU = 'SET_MENU',
  ADD_FOOD_ITEMS = 'ADD_FOOD_ITEMS'
}

const NavigationBar = () => {
  // TODO: add theme styling support

  const [css, theme] = useStyletron()
  const [selectedOption, setOption] = useState<string>(isAdminState ? menuItemOptions.SET_MENU : menuItemOptions.HUNGRY)
  console.log('kd selectedOption:', selectedOption)
  const navigate = useNavigate()

  const navCss = {
    width: '100%',
    height: '60px',
    backgroundColor: themeColors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  const selectedMenuItemCss: any = {
    textDecoration: 'underline',
    textUnderlineOffset: '12px'
  }

  const menuItems = () => {
    const menuCss = {
      display: 'flex',
      alignItems: 'center',
      marginRight: '100px',
      fontWeight: 500,
    }
    
    const menuItemCss = (menuLabel: string) => {
      const selectedCss = () => menuLabel === selectedOption ? selectedMenuItemCss : {}

      return {color: themeColors.menuFontColor,
      cursor: 'pointer',
      marginRight: '30px',
      ':hover' : {
        ...selectedMenuItemCss
      },
      ...selectedCss()
    }
    }
    
    const menuOfTheWeek = () => (
      <span className={css(menuItemCss(menuItemOptions.HUNGRY))} onClick={() => {
        setOption(menuItemOptions.HUNGRY)
        navigate(routingPath.MENU_OF_THE_WEEK_AND_MEAL_SELECTION_PAGE)}
      }>
        Hungry?
      </span>
    )
    const headCount = () => (
      <span className={css(menuItemCss(menuItemOptions.HEAD_COUNT))} onClick={() => {
        setOption(menuItemOptions.HEAD_COUNT)
        navigate(routingPath.HEAD_COUNT)
      }}>
        Head Count
      </span>
    )

    const setMenu = () => (
      <span className={css(menuItemCss(menuItemOptions.SET_MENU))} onClick={() => {
        setOption('Set Menu')
        navigate(routingPath.SET_MENU)
      }}>
        Set Menu
      </span>
    )
    const topFoods = () => (
      <span className={css(menuItemCss(menuItemOptions.TOP_FOODS))} onClick={() => {
        setOption(menuItemOptions.TOP_FOODS)
        navigate(routingPath.TOP_FOODS)
      }}>
        Top Foods
      </span>
    )
    const addFoodItems = () => (
      <span className={css(menuItemCss(menuItemOptions.ADD_FOOD_ITEMS))} onClick={() => {
        setOption(menuItemOptions.ADD_FOOD_ITEMS)
        navigate(routingPath.ADD_FOOD_ITEMS)
      }}>
        Add Food Items
      </span>
    )
    
    return (
      <div style={menuCss}>
        {!isAdminState && menuOfTheWeek()}
        {!isAdminState && topFoods()}
        {isAdminState && setMenu()}
        {isAdminState && headCount()}
        {isAdminState && addFoodItems()}
      </div>
    )
  }

  return (
    <div className={css(navCss)}>
      {foodEstimatorLogo()}
      {menuItems()}
    </div>
  )
}

export default NavigationBar;