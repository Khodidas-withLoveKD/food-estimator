import { useStyletron} from 'baseui';
import axios from 'axios';
import { Table, SIZE } from "baseui/table-semantic";


import { useEffect, useState } from 'react';
import { employeeBaseUrl, daysOfTheWeek, mealTimes } from '../constants/constants';
import { ISelect } from '../constants/interfaces';
import { day, meal } from '../constants/Enums';


 
const baseUrl = 'http://localhost:10160/v1/food-estimator/'
const adminControllerUrl = baseUrl + 'admin/'

const headCountMap = new Map([
    [day.MON, [0, 0, 0]],
    [day.TUE, [0, 0, 0]],
    [day.WED,  [0, 0, 0]],
    [day.THURS, [0, 0, 0]],
    [day.FRI, [0, 0, 0]],
  ])


  const HeadCountPage = () => {
  const [css, theme] = useStyletron()

  const [mealHeadCount, setMealHeadCount] = useState<Map<string, Array<number>>>(headCountMap)
  console.log('HeadCount:', headCountMap)
  const mealToHeadCountMap = {
    [meal.BREAKFAST]: 1,
    [meal.LUCNH]: 2,
    [meal.DINNER]: 3
  }

  // mealToIsSelectedMap[meal.BREAKFAST]

  useEffect(() => {
    const getHeadCountUrl = adminControllerUrl + 'getHeadCount'
    axios.get(getHeadCountUrl).then((response) => {
      // response.data.responseObject
      console.log('kd response.data.responseObject:', response.data.responseObject)
    })
  }, [])

  const heading = () => (
    <div className={css({
      backgroundColor: 'pink'
    })}>
      <span className={css({
        fontSize: '60px',
        // color: themeColors.menuFontColor,
      })}>
        HeadCount
      </span>
    </div>
  )

  const headCount = () => {
    const mealTimeLables: string[] = []
    mealTimeLables.push("day")
    mealTimes.map((meal:ISelect)=> mealTimeLables.push(meal.label))

    const createData = () => {
        const headCountData = []
        
        daysOfTheWeek.map((day:ISelect)=>{
            const headCountDayWise = []
            headCountDayWise.push(day.label)
        })        

    }
    return (
      <div>
           <Table
            columns = {mealTimeLables}
            size={SIZE.spacious}/>
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
      {headCount()}
    </div>
  )
}
export default HeadCountPage ;