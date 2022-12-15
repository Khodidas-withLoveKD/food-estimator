import { colors } from "../../shared/theme";

import './navigation.scss'
const NavigationBar = () => {
  const navCss = {
    width: '100%',
    height: '60px',
    backgroundColor: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  const foodEstimatorLogo = () => {
    const logoCss = {
      marginLeft: '50px'
    }

    return (
      <span style={logoCss}>
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
      color: colors.menuFontColor,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
        textDecorationColor: colors.menuFontColor,
        backgroundColor: 'black'
      }
    }
    
    const menuOfTheWeek = () => {
      return(
        <span className='menu-item'>
          menu of the week
        </span>
      )
    }
    const goingToEat = () => {
      return(
        <span className='menu-item'>
          goingToEat
        </span>
      )
    }
    const topFoods = () => {
      return(
        <span className='menu-item'>
          topFoods
        </span>
      )
    }


    return (
      <div style={menuCss}>
        {menuOfTheWeek()}
        {goingToEat()}
        {topFoods()}
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