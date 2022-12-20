import { useStyletron } from "baseui";
import AddFoodItemsComponent from "../components/AddFoodItemsComponent";
import FoodItemsOrderByDate from "../components/FoodItemsOrderByDate";
import { layoutCss } from "../constants/commonCss";

const AddFoodItemsPage = () => {
  const [css, theme] = useStyletron()
  
  return (
    <div className={css(layoutCss)}>
      <AddFoodItemsComponent />
      <FoodItemsOrderByDate/>
    </div>
  )
} 

export default AddFoodItemsPage;