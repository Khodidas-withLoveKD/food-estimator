import { useStyletron } from "baseui";

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
      sfsdf
    </div>
  )
}
export default MenuAndMealSelectionPage;