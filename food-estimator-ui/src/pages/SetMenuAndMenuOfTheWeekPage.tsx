import { useStyletron } from "baseui";
import { useState } from "react";
import MenuOfTheWeek from "../components/MenuOfTheWeek";
import SetMenu from "../components/SetMenu";
import { layoutCss } from "../constants/commonCss";
import { day } from "../constants/Enums";

const SetMenuAndMenuOfTheWeekPage = () => {
  const [css, theme] = useStyletron()

  const [menuOfTheWeekCount, incrementMenuOfTheWeekCount] = useState<number>(0)
  const [selectedDayOfMenu, setSelectedDayOfMenu] = useState<string>(day.MON)

  return (
    <div className={css(layoutCss)}>
      <SetMenu menuOfTheWeekCount={menuOfTheWeekCount} incrementMenuOfTheWeekCount={incrementMenuOfTheWeekCount} setSelectedDayOfMenu={setSelectedDayOfMenu} />
      <MenuOfTheWeek menuOfTheWeekCount={menuOfTheWeekCount} selectedDayOfMenu={selectedDayOfMenu}/>
    </div>
  )
}
export default SetMenuAndMenuOfTheWeekPage;