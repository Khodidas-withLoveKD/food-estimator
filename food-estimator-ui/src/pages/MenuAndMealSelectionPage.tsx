import { useStyletron } from "baseui";
import MealSelectionPage from "../components/MealSelectionPage";
import MenuOfTheWeek from "../components/MenuOfTheWeek";

const MenuAndMealSelectionPage = () => {
  const [css, theme] = useStyletron()

  return (
    <div className={css({
      width: '90%',
      minHeight: '80%',
      backgroundColor: 'cyan',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center'
    })}>
      <MealSelectionPage />
      <MenuOfTheWeek />
    </div>
  )
}
export default MenuAndMealSelectionPage;