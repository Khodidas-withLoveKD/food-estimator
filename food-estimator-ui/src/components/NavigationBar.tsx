import { useStyletron } from 'baseui';

import { colors } from "../shared/theme";

const NavigationBar = () => {
  // TODO: add theme styling support

  const [css, theme] = useStyletron()
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
      marginLeft: '50px',
      color: colors.menuFontColor,
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
      color: colors.menuFontColor,
      cursor: 'pointer',
      ':hover' : {
        textDecoration: 'underline'
      }
    }
    
    const menuOfTheWeek = () => {
      return(
        <span className={css(menuItemCss)}>
          menu of the week
        </span>
      )
    }
    const goingToEat = () => {
      return(
        <span className={css(menuItemCss)}>
          goingToEat
        </span>
      )
    }
    const topFoods = () => {
      return(
        <span className={css(menuItemCss)}>
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