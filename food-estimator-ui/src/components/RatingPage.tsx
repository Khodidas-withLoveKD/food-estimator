import { useEffect, useState } from "react";
import { category } from "../constants/Enums";
import axios from 'axios';
import { useStyletron } from "baseui";
import {MessageCard, IMAGE_LAYOUT} from 'baseui/message-card';
import { ISelect } from "../constants/interfaces";
import { themeColors } from "../shared/theme";
import * as React from "react";
import { StarRating } from "baseui/rating";
import { catogeries } from "../constants/constants";

const baseUrl = 'http://localhost:10160/v1/food-estimator/'
const employeeControllerUrl = baseUrl + 'employee/'
const adminControllerUrl = baseUrl + 'admin/'


interface IFood {
  name: string;
  imgUrl: string;
  // foodDescription: string; // TODO: to add later
  category: category;
  rating: number;
  personsRated: number;
}

const mockFoodItem0 = {
    name: 'Bhindi Masala',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/food-estimator.appspot.com/o/Bhindi-Masala.jpg?alt=media&token=8df87616-a555-46dc-9d93-e92d18e183a6',
    // foodDescription: string; // TODO: to add later
    category: category.SABJI,
    rating: 4.5,
    personsRated: 3500
}

const mockFoodItem1 = {
    name: 'Peanut Salad',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/food-estimator.appspot.com/o/boiled-peanut-salad-featured.jpg?alt=media&token=092f3e35-02d5-42b4-ab59-fe80f6af92c7',
    // foodDescription: string; // TODO: to add later
    category: category.SALAD,
    rating: 4,
    personsRated: 2500
}


const RatingPage = () => {
  const [css, theme] = useStyletron()

  const [salad, setSalad] = useState<Array<IFood>>([mockFoodItem0])
  const [bread, setBread] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])
  const [sabji, setSabji] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])
  const [rice, setRice] = useState<Array<IFood>>([mockFoodItem0,mockFoodItem1])
  const [appetizer, setAppetizer] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])
  const [sweets, setSweets] = useState<Array<IFood>>([mockFoodItem0,mockFoodItem1])
  const [others, setOthers] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])
  const [selectedCatogery, setSelectedCatogery] = useState<string>(category.SABJI)
  const [foodRating, setFoodRating] = useState<number>(4)
  const [foodItems,setFoodItems] = useState<Array<IFood>>([mockFoodItem0])

  console.log('kd selectedCategory ', selectedCatogery)
  useEffect(() => {
     const url = adminControllerUrl + `${selectedCatogery}/get-sorted-food-items-by-category-desc`
       axios.get(url).then((response) => {
        console.log("ResponseObjectRating:",response.data.responseObject)
        setFoodItems(response.data.responseObject)

        const responseArray: Array<IFood> = response.data.responseObject 

        switch(selectedCatogery) {
            case category.SALAD:
                setSalad(foodItems)
                break;
            case category.BREAD:
                setBread(foodItems)
                break;
            case category.SABJI:
                setSabji(foodItems)
                break;
            case category.RICE:
                setRice(foodItems)
                break;
            case category.APPETIZER:
                setAppetizer(foodItems)
                break;
            case category.SWEETS:
                setSweets(foodItems)
                break;
            default:
                setOthers(foodItems)
                break;       
        }

       })
    
  }, [selectedCatogery,foodItems])

  const renderFoodAsPerCatogery = () => {

    const renderCatogeryItems = (catogeryId:string) =>{
        const foodNotAvailable = () => <h4>food not added yet! :(</h4>

        const getCatogeryItems = (catogeryId: string) => {
            let currentCatogeryItems: Array<IFood> = foodItems
            switch(catogeryId) {
                case category.SALAD:
                    currentCatogeryItems = salad
                    break;
                case category.BREAD:
                    currentCatogeryItems = bread
                    break;
                case category.SABJI:
                    currentCatogeryItems = sabji
                    break;
                case category.RICE:
                    currentCatogeryItems = rice
                    break;
                case category.APPETIZER:
                    currentCatogeryItems = appetizer
                    break;
                case category.SWEETS:
                    currentCatogeryItems = sweets
                    break;
                default:
                    currentCatogeryItems = others
                    break;
              }
              return currentCatogeryItems
          }
    
        const catogeryItems = getCatogeryItems(catogeryId)
        
        const getfoodRating = (foodRated:number, personsRated:number) =>{
            //setFoodRating(foodRated)
            return (
            <div className={css({
                display: 'flex',
            })}>
              <StarRating
                numItems={5}
                // onChange=}
                size={12}
                value={foodRated}
              />
              <span>{foodRated} | {personsRated}</span>
              </div>
            );
          
        }

        return (
            <div className={css({
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            })}>
              {catogeryItems.length ? catogeryItems.map((food: IFood) =>          
                <MessageCard
                  heading={food.name}
                  paragraph="Pellentesque velit purus, luctus non lorem in, rutrum ultricies quam."
                  buttonLabel={getfoodRating(food.rating, food.personsRated)}
                  onClick={() => {}}
                  image={{
                    src: food.imgUrl,
                    layout: IMAGE_LAYOUT.top,
                    ariaLabel:
                      'A woman hiking through a valley with a yellow backpack',
                  }}
                  // backgroundColor={colors.teal200}
                  overrides={{
                    Root: {style: {marginBottom: '20px', minWidth: '200px', width: '30%', cursor: 'default'}},
                    HeadingContainer: {style: {fontSize: '17px'}}
                  }
                }
                />
              ) : foodNotAvailable()}
            </div>
          )
    
    }

    return (
        <div>
            <div className={css({
              padding: '20px'
            })}>
              {renderCatogeryItems(selectedCatogery)}
            </div>
        </div>
      )
  
  }


  const renderCatogeriesOfTheFood = () =>{
    const isSelectedCss = (catogeryId:string) =>(
        selectedCatogery == catogeryId ? { backgroundColor: 'cyan' } : {}
    )

    const renderEachCatogery = (catogerySelection: ISelect) => (
        <span className={css({
          borderRadius: '16px',
          alignItems: 'center',
          paddingTop: '5px',
          paddingBottom: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          cursor: 'pointer',
          boxShadow: '0px 1.95px 2.6px rgba(0, 0, 0, 0.15)',
          ':hover' : {
            textDecoration: 'underline',
            textDecorationColor: themeColors.primary
          },
          ...isSelectedCss(catogerySelection.id)
        })} onClick={() => setSelectedCatogery(catogerySelection.id)}>
          {catogerySelection.label}
        </span>
      )
  
    return (
        <div className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: '10px',
          marginBottom: '10px',
          marginLeft: '10px',
          marginRight: '10px',
          paddingLeft: '10px',
          paddingRight: '10px'
        })}>
          {catogeries.map((categorySelection: ISelect) => 
            renderEachCatogery(categorySelection)
          )}
        </div>
      )
  

  }

  return (
    <div className={css({
      paddingTop: '20px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingBottom: '20px',
      width: '60%',
      backgroundColor: 'pink',
      textAlign: 'left',
    })}>
      {renderCatogeriesOfTheFood()}
      {renderFoodAsPerCatogery()}
    </div>
  )
}

export default RatingPage;