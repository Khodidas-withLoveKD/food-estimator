import { useStyletron } from 'baseui';
import { daysOfTheWeek, mealTimes } from '../constants/constants';
import { ISelect } from '../constants/interfaces';

const MealSelectionPage = () => {
  const [css, theme] = useStyletron()

  const heading = () => (
    <div className={css({
      backgroundColor: 'pink'
    })}>
      <span className={css({
        fontSize: '20px',
        // color: themeColors.menuFontColor,
        textDecoration: 'underline'
      })}>
        Meal Selection
      </span>
    </div>
  )

  const mealSelection = () => {
    const renderDayAndMeal = (day: ISelect) => {
      const dayOfTheWeek = (day: ISelect) => (
        <span className={css({
          width: '45px'
        })}>
          {day.label}
        </span>
      )
      
      const renderMeals = () => {
        const renderEachMeal = () => (
          mealTimes.map((meal: ISelect) => 
            <span className={css({
              borderWidth: '2px',
              borderRadius: '16px',
              cursor: 'pointer',
              width: 'min-content',
              backgroundColor: 'palegoldenrod',
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '10px',
              paddingRight: '10px'
            })}>
              {meal.label}
            </span>
          )
        )

        return (
          <div className={css({
            display: 'flex',
            justifyContent: 'space-evenly',
            flexGrow: 1
          })}>
            {renderEachMeal()}
          </div>
        )
      }

      return (
        <div className={css({
          backgroundColor: 'lime',
          marginTop: '10px',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center'
        })}>
          {dayOfTheWeek(day)} : {renderMeals()}
        </div>
      )
    }

    return (
      <div>
        {daysOfTheWeek.map((day: ISelect) => {
          return renderDayAndMeal(day)
        })}
      </div>
    )
  }

  return (
    <div className={css({
      paddingTop: '20px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingBottom: '20px',
      flexGrow: 0.4,
      backgroundColor: 'grey',
      position: 'sticky', // TODO: make position sticky work
      top: '100px'
    })}>
      {heading()}
      {mealSelection()}
    </div>
  )
}

export default MealSelectionPage;