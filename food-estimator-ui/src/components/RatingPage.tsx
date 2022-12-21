import { useEffect, useState } from "react";
import { category } from "../constants/Enums";
import axios from 'axios';
import { useStyletron } from "baseui";
import {MessageCard, IMAGE_LAYOUT} from 'baseui/message-card';
import { ISelect, IFood } from "../constants/interfaces";
import * as React from "react";
import { StarRating } from "baseui/rating";
import { categories } from "../constants/constants";
import {  ArrowUp,ArrowDown} from "baseui/icon";
import { containerCss, hoverItemCss, layoutCss, leftPanelCss, rightPanelCss, selectedItemCss } from "../constants/commonCss";
import { Button, SIZE } from "baseui/button";

const baseUrl = 'http://localhost:10160/v1/food-estimator/'
const adminControllerUrl = baseUrl + 'admin/'
const ratingUrlAll = adminControllerUrl + 'get-all-food-items-sorted-by-rating'
const ratingUrlCatogery = adminControllerUrl + 'get-sorted-food-items-by-category'

const mockFoodItem0 = {
    foodId: 1,
    name: 'Bhindi Masala',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/food-estimator.appspot.com/o/Bhindi-Masala.jpg?alt=media&token=8df87616-a555-46dc-9d93-e92d18e183a6',
    foodDescription: "hgghugubg",
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


const RatingPage = () => {
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
  const [foodRating, setFoodRating] = useState<number>()
  const [foodItems,setFoodItems] = useState<Array<IFood>>([mockFoodItem0])
  const [isAscending,setIsAscending] = useState<boolean>(false)
  const [currentlySelectedFood, setCurrentFood] = useState<IFood>()
  const [getFoodItemsByRatingApiCount, incrementFoodItemsByRatingApiCount] = useState<number>(0)

  useEffect(() => {

    let url:string = ratingUrlAll

    switch(selectedCatogery) {
        case category.ALL:
            url = ratingUrlAll
            switch(isAscending) {
                case true:
                    url = url + `-asc`;
                    break;
                default:
                    url = url + `-desc`;
                    break;
            }        
            break;
        default:
            url = ratingUrlCatogery
            switch(isAscending) {
                case true:
                    url = url + `-asc?category=${selectedCatogery}`;
                    break;
                default:
                    url = url + `-desc?category=${selectedCatogery}`;
                    break;
            }        
            break;
    }

    axios.get(url).then((response) => {
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

    
  }, [selectedCatogery, isAscending, getFoodItemsByRatingApiCount])

  const renderFoodAsPerCatogery = () => {

    const renderCatogeryItems = () =>{
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
                <div className={css({
                    display:'flex',
                    justifyContent:'space-evenly',
                    paddingLeft:'10px'
                })}><span>{foodRated} | {personsRated}</span></div>
                </div>
            );
          
        return (
            <div className={css({
              display: 'flex',
              flexWrap: 'wrap',
              position: 'relative'
            })}>
              {catogeryItems.length ? catogeryItems.map((food: IFood) =>          
                <MessageCard
                  heading={food.name}
                  paragraph={food.foodDescription}
                  buttonLabel={getfoodRating(parseFloat(food.rating.toFixed(1)), food.personsRated)}
                  onClick={() => {
                    setFoodRating(0)
                    setCurrentFood(food)
                  }}
                  image={{
                    src: food.imgUrl,
                    layout: IMAGE_LAYOUT.top,
                    ariaLabel:
                      'A woman hiking through a valley with a yellow backpack',
                  }}
                  // backgroundColor={colors.teal200}
                  overrides={{
                    Root: {style: {marginBottom: '20px', marginRight: '25px', minWidth: '100px', width: '300px'}},
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
              {renderCatogeryItems()}
            </div>
        </div>
      )
  
  }


  const renderCatogeriesOfTheFood = () =>{
    const isSelectedCss = (catogeryId:string) =>(
        selectedCatogery === catogeryId ? selectedItemCss : {}
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
            ...hoverItemCss
          },
          ...isSelectedCss(catogerySelection.id)
        })} onClick={() => setSelectedCatogery(catogerySelection.id)}>
          {catogerySelection.label}
        </span>
      )
    
    const orderArrow =() =>(

        <span className={css({
            borderRadius: '16px',
            alignItems: 'center',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '10px',
            paddingRight: '10px',
            cursor: 'pointer',
            display:'flex',
            boxShadow: '0px 1.95px 2.6px rgba(0, 0, 0, 0.15)',
            ':hover' : {
              ...hoverItemCss
            }
          })}  
          onClick={()=> setIsAscending(!isAscending)}
          >Sort
              {
                  isAscending ? <ArrowDown size={27} /> : <ArrowUp size={27}/>
              }
            </span>
    )

    return (
        <div className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: '10px',
          marginLeft: '10px',
          marginRight: '10px',
          paddingLeft: '10px',
          paddingRight: '10px'
        })}>
          {categories.map((categorySelection: ISelect) => 
            renderEachCatogery(categorySelection)
          )}
          {orderArrow()}
        </div>
    )
  }

  const heading = () => (
    <h2 className={css({
      textDecoration: 'underline',
      textAlign: 'center',
    })}>
      Top Foods
    </h2>
  )

  const rightPanel = () => (
    <div className={css({
      ...containerCss,
      ...rightPanelCss,
    })}>
    {heading()}
    {renderCatogeriesOfTheFood()}
    {renderFoodAsPerCatogery()}
    </div>
  )


  const leftPanel = () => {
    const heading = () => (
      <h3 className={css({
        textDecoration: 'underline',
        textAlign: 'center',
      })}>
        Rate Food
      </h3>
    )
    const noFoodItemSelected = () => <div><h5>No Food Item Selected</h5><h5>Click on Food Card to rate it :)</h5></div>

    const submitCurrentFoodRating = () => {
      const submitFoodRatingUrl:string  = adminControllerUrl + `${currentlySelectedFood?.foodId}/update-food-rating?rating=${foodRating}`
      
      axios.post(submitFoodRatingUrl).then((response) => {
        incrementFoodItemsByRatingApiCount(getFoodItemsByRatingApiCount + 1)
      })
    }

    const ratingSection = () => (
      <div className={css({
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderRadius: '16px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingRight: '10px',
        paddingLeft: '10px'
      })}>
        
        <StarRating
        numItems={5}
        size={18}
        value={foodRating ? foodRating : currentlySelectedFood?.rating}
        onChange={foodRating => setFoodRating(Number(foodRating.value))}
        />
        <span className={css({
          marginLeft: '15px',
          fontSize: '17px',
          fontWeight: 500,
        })}>{foodRating ? foodRating : parseFloat(currentlySelectedFood?.rating.toFixed(1) ?? '1.2')}</span>
      </div>
    )
    const submitFoodRating = () => (
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      })}>
        <MessageCard
          heading={currentlySelectedFood?.name}
          paragraph={currentlySelectedFood?.foodDescription}
          onClick={() => {}}
          image={{
            src: currentlySelectedFood?.imgUrl ?? '',
            layout: IMAGE_LAYOUT.top,
            ariaLabel:
              'A woman hiking through a valley with a yellow backpack',
          }}
          overrides={{
            Root: {style: {marginBottom: '20px', minWidth: '100px', width: '300px', cursor: 'default'}},
            HeadingContainer: {style: {fontSize: '17px'}}
          }
        }
        />
        {ratingSection()}
        <div className={css({
          float: 'right',
          marginTop: '15px'
        })}>
          <Button size={SIZE.compact} onClick={() => submitCurrentFoodRating()}>Submit</Button>
        </div>
      </div>
    )

    return (
      <div className={css({
        ...containerCss,
        ...leftPanelCss,
        width: '300px'
      })}>
        {heading()}
        {currentlySelectedFood ? submitFoodRating() : noFoodItemSelected()}
      </div>
    )
  }

  return (
    <div className={css(
      layoutCss
    )}>
      {leftPanel()}
      {rightPanel()}
    </div>
  )
}

export default RatingPage;