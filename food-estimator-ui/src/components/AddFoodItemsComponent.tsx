import { useStyletron } from "baseui";
import {FileUploader} from 'baseui/file-uploader';
import { useState } from 'react';
import { firebaseStorage } from '../shared/firebaseConfig'
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage'
import uuid from 'react-uuid'

const AddFoodItemsComponent = () => {
  const [css, theme] = useStyletron()
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadedImageUrl, setImageUrl] = useState<string>()
  
  const uploadFoodImage = () => {
    const uploadFoodImageToFirebase = (imageToBeUploaded: any) => {
      setIsUploading(true)
      const uniqueImageName = imageToBeUploaded.name + uuid()
      
      const imageRef = ref(firebaseStorage, uniqueImageName)
      uploadBytes(imageRef, imageToBeUploaded).then((response) => {
        setIsUploading(false)
        alert('Food Item Uploaded')
        
        getDownloadURL(imageRef).then((repsonse) => {
          setImageUrl(repsonse)
        })
      })
    }

    return(
      <FileUploader
      onDrop={(acceptedFiles, rejectedFiles) => {
        // handle file upload...
        console.log('kd rejectedFiles:', rejectedFiles)
        console.log('kd acceptedFiles:', acceptedFiles)
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
    )
  }


  return (
    <div className={css({
      paddingRight: '50px',
      paddingLeft: '50px',
      width: '25%',
      backgroundColor: 'lime'
    })}>
      {uploadFoodImage()}
    </div>
  )
} 

export default AddFoodItemsComponent;