import { useStyletron } from "baseui";
import MealSelectionPage from "../components/MealSelectionPage";
import MenuOfTheWeek from "../components/MenuOfTheWeek";
import { layoutCss } from "../constants/commonCss";

const MenuAndMealSelectionPage = () => {
  const [css, theme] = useStyletron()

  return (
    <div className={css(layoutCss)}>
      <MealSelectionPage />
      <MenuOfTheWeek />
    </div>
  )
}
export default MenuAndMealSelectionPage;