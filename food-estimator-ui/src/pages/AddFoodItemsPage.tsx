import { useStyletron } from "baseui";
import AddFoodItemsComponent from "../components/AddFoodItemsComponent";
import FoodItemsOrderByDate from "../components/FoodItemsOrderByDate";

const AddFoodItemsPage = () => {
  const [css, theme] = useStyletron()
  
  return (
    <div className={css({
      width: '90%',
      backgroundColor: 'cyan',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center'
    })}>
      <AddFoodItemsComponent />
      <FoodItemsOrderByDate/>
    </div>
  )
} 

export default AddFoodItemsPage;