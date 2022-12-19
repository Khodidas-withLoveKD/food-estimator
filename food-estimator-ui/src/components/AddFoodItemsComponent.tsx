import { useStyletron } from "baseui";
import {FileUploader} from 'baseui/file-uploader';
import { useState } from 'react';
import { firebaseStorage } from '../shared/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import uuid from 'react-uuid'
import { Select, SIZE, Value } from "baseui/select";
import { categoriesWithoutAllCategory } from '../constants/constants'
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { category } from "../constants/Enums";
import { adminControllerUrl } from "./api";
import axios from 'axios';



const AddFoodItemsComponent = () => {
  const [css, theme] = useStyletron()

  const [foodName, setFoodName] = useState<string>()
  const [foodDescription, setFoodDescription] = useState<string>()
  const [selectedCategory, setCategory] = useState<Value>()
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadedImageUrl, setImageUrl] = useState<string>()

  const labelCss: any = {
    fontWeight: 500,
    fontSize: '15px',
    marginBottom: '5px'
  }

  const divCss: any = {
    textAlign: 'left',
    marginTop: '30px',
  }

  const heading = () => (
    <h3 className={css({
      textDecoration: 'underline'
    })}>
      Add Food Item
    </h3>
  )

  const name = () => (
    <div className={css(divCss)}>
    <div className={css(labelCss)}>Name</div>
      <Input
        value={foodName}
        onChange={e => setFoodName(e.target.value)}
        placeholder="Enter Food Name"
        size={SIZE.compact}
        clearOnEscape
      />
    </div>
  )

  const categorySection = () => (
    <div className={css(divCss)}>
      <div className={css(labelCss)}>Category</div>
      <Select
        options={categoriesWithoutAllCategory}
        value={selectedCategory}
        placeholder={'Select Category'}
        onChange={currentCategory => setCategory(currentCategory.value)}
        clearable={false}
        size={SIZE.compact}
        />
    </div>
  )

  const description = () => (
    <div className={css(divCss)}>
    <div className={css(labelCss)}>Description</div>
      <Textarea
        value={foodDescription}
        onChange={e => setFoodDescription(e.target.value)}
        placeholder="Enter Food Description"
        clearOnEscape
        size={SIZE.compact}
      />
    </div>
  )

  const uploadFoodImage = () => {
    const uploadFoodImageToFirebase = (imageToBeUploaded: any) => {
      setIsUploading(true)
      const uniqueImageName = imageToBeUploaded.name + uuid()
      
      const imageRef = ref(firebaseStorage, uniqueImageName)
      uploadBytes(imageRef, imageToBeUploaded).then((response) => {
        setIsUploading(false)
        alert('Food Image Uploaded')
        
        getDownloadURL(imageRef).then((repsonse) => {
          setImageUrl(repsonse)
        })
      })
    }

    return(
      <div className={css(divCss)}>
      <div className={css(labelCss)}>Upload Food Image</div>
        <FileUploader
          onDrop={(acceptedFiles, rejectedFiles) => {
            uploadFoodImageToFirebase(acceptedFiles[0]);
          }}
          progressMessage={
            isUploading ? `Uploading... hang tight.` : ''
          }
          overrides={{
            CancelButtonComponent: {
              props: {
                overrides: {
                  BaseButton: {
                    style: {
                      display: 'none'
                    }
                  }
                }
              }
            }
          }}
        />
      </div>
    )
  }

  const addFoodItemToListOfFoods = () => {
    const payload: any = {
      name: '',
      category: category.APPETIZER,
      description: '',
      img_url: ''
    }

    payload['name'] = foodName
    payload['category'] = selectedCategory ? selectedCategory[0].id : 'anything'
    payload['description'] = foodDescription
    payload['img_url'] = uploadedImageUrl

    const postFoodApiUrl =  adminControllerUrl + 'addFood'
    axios.post(postFoodApiUrl, payload).then((response: any) => {
      alert('Food Item Added :)')
    })
  }

  const submitButton = () => (
    <div className={css({
      float: 'right',
      marginTop: '15px'
    })}>
      <Button 
        disabled={isUploading}
        size={SIZE.compact} onClick={() => addFoodItemToListOfFoods()}
      >
        Submit
      </Button>
    </div>
  )

  return (
    <div className={css({
      paddingRight: '50px',
      paddingLeft: '50px',
      width: '25%',
      backgroundColor: 'lime'
    })}>
      {heading()}
      {name()}
      {categorySection()}
      {description()}
      {uploadFoodImage()}
      {submitButton()}
    </div>
  )
} 

export default AddFoodItemsComponent;