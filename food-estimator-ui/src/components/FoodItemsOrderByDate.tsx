import { useEffect, useState } from "react";
import { category } from "../constants/Enums";
import axios from 'axios';
import { useStyletron } from "baseui";
import {MessageCard, IMAGE_LAYOUT} from 'baseui/message-card';
import { IFood, ISelect } from "../constants/interfaces";
import { themeColors } from "../shared/theme";
import * as React from "react";
import { categories } from "../constants/constants";
import { StarRating } from "baseui/rating";

const baseUrl = 'http://localhost:10160/v1/food-estimator/'
const adminControllerUrl = baseUrl + 'admin/'
const foodByDateUrlAll = adminControllerUrl + 'get-all-food-items-sorted-by-date-desc'
const foodByDateUrlCategory = adminControllerUrl + 'get-food-items-by-category-sorted-by-date-desc'

const mockFoodItem0 = {
    foodId: 1,
    name: 'Bhindi Masala',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/food-estimator.appspot.com/o/Bhindi-Masala.jpg?alt=media&token=8df87616-a555-46dc-9d93-e92d18e183a6',
    foodDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: category.SABJI,
    rating: 4.5,
    personsRated: 3500,
    date: new Date()
}

const mockFoodItem1 = {
    foodId: 2,
    name: 'Peanut Salad',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/food-estimator.appspot.com/o/boiled-peanut-salad-featured.jpg?alt=media&token=092f3e35-02d5-42b4-ab59-fe80f6af92c7',
    foodDescription: "aaaaa",
    category: category.SALAD,
    rating: 4,
    personsRated: 2500,
    date: new Date()
}

const FoodItemsOrderByDate = () =>{
    const [css, theme] = useStyletron()

    const [salad, setSalad] = useState<Array<IFood>>([mockFoodItem0])
    const [bread, setBread] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])
    const [sabji, setSabji] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])
    const [rice, setRice] = useState<Array<IFood>>([mockFoodItem0,mockFoodItem1])
    const [appetizer, setAppetizer] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])
    const [sweets, setSweets] = useState<Array<IFood>>([mockFoodItem0,mockFoodItem1])
    const [others, setOthers] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])
    const [all, setAll] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])
    const [selectedCatogery, setSelectedCatogery] = useState<string>(category.ALL)
    const[foodItems,setFoodItems] = useState<Array<IFood>>([mockFoodItem1,mockFoodItem0])

    useEffect(() => {

        let url:string = foodByDateUrlAll
    
        switch(selectedCatogery) {
            case category.ALL:
                url = foodByDateUrlAll
                break;
            default:
                url = foodByDateUrlCategory
                url = url + `?category=${selectedCatogery}`
                break;
        }
    
        axios.get(url).then((response) => {
            console.log("ResponseObjectRating:",response.data.responseObject)
            setFoodItems(response.data.responseObject)
         
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
                case category.OTHERS:
                    setOthers(foodItems)
                    break;   
                default:    
                    setAll(foodItems);
                    break;       
                 }
        })    

      }, [selectedCatogery])
    
    const renderFoodAsPerCatogery = () => {

        const renderCatogeryItems = (catogeryId:string) =>{
            const foodNotAvailable = () => <h4>food not added yet! :(</h4>
        
            const catogeryItems: Array<IFood> = foodItems
            const getfoodRating = (foodRated:number, personsRated:number) => (
              <div className={css({
                  display: 'flex',
              })}>
                  <StarRating
                  numItems={5}
                  size={12}
                  value={foodRated}
                  />
                  <span>{foodRated} | {personsRated}</span>
                  </div>
              );
                               
            return (
                <div className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around'
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
              {categories.map((categorySelection: ISelect) => 
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
            width: '96%',
            backgroundColor: 'pink',
            textAlign: 'left',
          })}>
            {renderCatogeriesOfTheFood()}
            {renderFoodAsPerCatogery()}
          </div>             
    )
}

export default FoodItemsOrderByDate;