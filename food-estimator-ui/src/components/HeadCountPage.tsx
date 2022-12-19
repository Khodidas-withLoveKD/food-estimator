import { useStyletron} from 'baseui';
import axios from 'axios';
import { Table, SIZE } from "baseui/table-semantic";


import { useEffect, useState } from 'react';
import { employeeBaseUrl, daysOfTheWeek, mealTimes } from '../constants/constants';
import { ISelect } from '../constants/interfaces';
import { day, meal } from '../constants/Enums';
import { arrayBuffer } from 'stream/consumers';


 
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

  const [mealHeadCount, setMealHeadCount] = useState<Map<String, Array<number>>>(headCountMap)
  console.log('HeadCount:', headCountMap)
  const mealToHeadCountMap = {
    [meal.BREAKFAST]: 0,
    [meal.LUCNH]: 1,
    [meal.DINNER]: 2
  }

  const dayStringToEnum = {
    "MON":day.MON,
    "TUE":day.TUE,
    "WED":day.WED,
    "THURS":day.THURS,
    "FRI":day.FRI
  }

  const mealStringToEnum = (mealType: string) => {
    let mealEnum;
    switch(mealType) {
        case "BREAKFAST": 
            mealEnum = meal.BREAKFAST
            break;
        case "LUNCH":
            mealEnum = meal.LUCNH
            break;
        case "DINNER":
            mealEnum = meal.DINNER
            break;
        default:
            mealEnum = meal.BREAKFAST
            break;
    }
    return mealEnum;
  }

  // mealToIsSelectedMap[meal.BREAKFAST]

  const calculateNewHeadCount = () => {
    const getHeadCountUrl = adminControllerUrl + 'getHeadCount'
     axios.get(getHeadCountUrl).then((response) => {
       console.log('kd response.data.responseObject:', response.data.responseObject)
       const headCountResponse = response.data.responseObject
       const currentHeadCountMap = new Map(mealHeadCount)
       
       const daysFromResponse :Array<String> = []
    //    Object.keys(headCountResponse).forEach(function(key){
    //         daysFromResponse.push(headCountResponse[key]);

    //    })
    for(const day in headCountResponse) {
        console.log("Key from response:",day)
        for(const mealType in headCountResponse[day]) {
            console.log("MealType:",mealType)
            const tempHeadCount = currentHeadCountMap.get(day) ?? []

            console.log("CurrentheadCount:",tempHeadCount)
            
            // tempHeadCount[mealToHeadCountMap[mealStringToEnum[meal]] = headCountResponse[day][meal]
            tempHeadCount[mealToHeadCountMap[mealStringToEnum(mealType)]] = headCountResponse[day][mealType]

            console.log("NewTemp:",tempHeadCount)

            currentHeadCountMap.set(day, tempHeadCount)

        }
    }
       console.log("ResponseDay:",daysFromResponse)

       setMealHeadCount(currentHeadCountMap)

     })
  }

  useEffect(() => { 
    calculateNewHeadCount()
  }, [])

//   useEffect(() => {
//     console.log('kd INSIDE USEEFFECT')
//     calculateNewHeadCount()
//   },[])

  const heading = () => (
    <div className={css({
        paddingLeft: '100px',
        paddingRight: '100px',
        margin: 'auto',
        width: "500px"
    })}>
      <span className={css({
        fontSize: '40px',
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
        const headCountData: string[][] = []

        daysOfTheWeek.map((day:ISelect)=>{
            const headCountDayWise = []
            const headCountOfTheDay: Array<Number> = mealHeadCount.get(day.id) ?? []
            headCountDayWise.push(day.label)
            
            console.log("HeadCount of the day:",headCountOfTheDay)
            mealTimes.forEach(meal=> { console.log("meal_id:",meal.id) ;headCountDayWise.push(headCountOfTheDay[mealToHeadCountMap[meal.id]])})
            
            headCountData.push(headCountDayWise)
            console.log("Day Wise HeadCount:",headCountDayWise)
        })
        
        return headCountData;

    }
    return (
      <div className = {css({
        paddingLeft: '100px',
        paddingRight: '100px',
        paddingBottom: '100px',
        // flexGrow: 0.4,  
        margin: 'auto',
        width: "500px"
      })}>
           <Table
            columns = {mealTimeLables}
            data = {createData()}
            size={SIZE.compact}
            overrides={{
                Table: {
                    style: ({ $theme }) => ({
                        outline: `${$theme.colors.warning200} solid`,
                        backgroundColor: $theme.colors.warning200,
                        width: "100px"
                      })
                //   style: {
                //     width: '500px'
                //   }
                }
                // TableBody: {
                //   style: ({ $theme }) => ({
                //     outline: `${$theme.colors.warning200} solid`,
                //     backgroundColor: $theme.colors.warning200
                //   })
                // }
              }}        
            />
       </div>
    )
}
  return (
    <div className={css({
      paddingTop: '20px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingBottom: '20px',
    //   flexGrow: 0.4,
    //   backgroundColor: 'light blue',
      position: 'sticky', // TODO: make position sticky work
      top: '100px'
    })}>
      {heading()}
      {headCount()}
    </div>
  )
}
export default HeadCountPage ;