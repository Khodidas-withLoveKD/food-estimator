import { useStyletron} from 'baseui';
import axios from 'axios';
import { Table, SIZE } from "baseui/table-semantic";
import { themeColors } from '../shared/theme';


import { useEffect, useState } from 'react';
import { employeeBaseUrl, daysOfTheWeek, mealTimes } from '../constants/constants';
import { ISelect } from '../constants/interfaces';
import { day, meal } from '../constants/Enums';
import { arrayBuffer } from 'stream/consumers';
import { containerCss, leftPanelCss } from '../constants/commonCss';


 
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

  const calculateNewHeadCount = () => {
    const getHeadCountUrl = adminControllerUrl + 'getHeadCount'
     axios.get(getHeadCountUrl).then((response) => {
       console.log('kd response.data.responseObject:', response.data.responseObject)
       const headCountResponse = response.data.responseObject
       const currentHeadCountMap = new Map(mealHeadCount)
       
       const daysFromResponse :Array<String> = []
    for(const day in headCountResponse) {
        console.log("Key from response:",day)
        for(const mealType in headCountResponse[day]) {
            console.log("MealType:",mealType)
            const tempHeadCount = currentHeadCountMap.get(day) ?? []

            console.log("CurrentheadCount:",tempHeadCount)
            
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

  const heading = () => (
    <div className={css({
        paddingBottom:'20px',
        display:'flex',
        justifyContent:'space-around',
        margin: 'auto',
        width: "auto"
    })}>
      <span className={css({
        fontSize: '40px',
        textDecoration: 'underline'
      })}>
        Head-Count
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


    const renderMeals = () => {
        const renderEachMeal = () => {
          return mealTimes.map((meal: ISelect) => 
            <span className={css({
              borderWidth: '2px',
              borderRadius: '16px',
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '80px',
              paddingRight: '40px',
              justifyContent:'space-around'
            })}>
              {meal.label}
            </span>
          )
        }

        return (
            <div className={css({
            })}>
              {renderEachMeal()}
            </div>
          )
  
    }

    const headers = () =>{

        return(
            <div className = {css({
                paddingBottom:'40px',
                justifyContent:'space-evenly',
                width: "auto",
                display:'flex'
              })}>
                {renderMeals()}
                </div>
            )

    }

    const renderDayAndCount = (day: ISelect) =>{
        
        const dayOfTheWeek = (day: ISelect) => (
            <span className={css({
              width: '45px',
              fontWeight: 700,
            })}>
              {day.label}
            </span>
          ) 
        

        const countOfDay=(day:ISelect) =>{
            
            const headCountOfTheDay: Array<Number> = mealHeadCount.get(day.id) ?? []
            
            const getCountOfDay=(meal:ISelect) =>{
                
                switch(meal.label) {
                    case('Breakfast'):
                        return headCountOfTheDay[mealToHeadCountMap.BREAKFAST]
                    case('Lunch'):
                        return headCountOfTheDay[mealToHeadCountMap.LUNCH]
                    default:
                        return headCountOfTheDay[mealToHeadCountMap.DINNER]
                }
            }

            return mealTimes.map((meal: ISelect) => 
            <span className={css({
                borderWidth: '2px',
                borderRadius: '16px',
                width: 'min-content',
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingLeft: '100px',
                paddingRight: '40px',
              })}>
              {getCountOfDay(meal).toString()}
            </span>
          )
        }

        return (
            <div className={css({
                paddingBottom:'40px',
                justifyContent:'space-evenly',
                width: "auto",
                display:'flex'
                    })}>
              {dayOfTheWeek(day)}:{countOfDay(day)}
            </div>
          )
        }


    return (
      
      <><div id="1" className={css({
            paddingBottom: '20px',
            display: 'flex',
            paddingLeft: '500px',
        })}>
            {headers()}
        </div>
        <div id="2" className={css({
            paddingBottom: '100px',
            paddingRight:'450px',
            paddingLeft:'400px'
        })}>
                {daysOfTheWeek.map((day: ISelect) => renderDayAndCount(day)
                )}
            </div>
            </>
    )
           {/* <Table
            data = {createData()}
            size={SIZE.compact}
            overrides={{
                Table: {
                    style: ({ $theme }) => ({
                        outline: `${$theme.colors.warning200} solid`,
                        backgroundColor: $theme.colors.warning200,
                        width: "100px"
                      })
                }
              }}        
            /> */}
    //)
}
//   return (
//     <div className={css({
//       paddingTop: '20px',
//       paddingLeft: '30px',
//       paddingRight: '30px',
//       paddingBottom: '20px',
//       position: 'sticky', // TODO: make position sticky work
//       top: '100px'
//     })}>
//       {heading()}
//       {headCount()}
//     </div>
 // )
 return (
    <div className={css({
      ...containerCss
    })}>
      {heading()}
      {headCount()}
    </div>
  )

}
export default HeadCountPage ;