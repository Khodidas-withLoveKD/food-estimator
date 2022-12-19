import { useStyletron } from "baseui";
import {FileUploader} from 'baseui/file-uploader';
import { useState } from 'react';
import { firebaseStorage } from '../shared/firebaseConfig'
import { ref, uploadBytes, list } from 'firebase/storage'
import uuid from 'react-uuid'

const AddFoodItems = () => {
  const [css, theme] = useStyletron()
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadedImageUrl, setImageUrl] = useState<string>()
  console.log('kd uploadedImageUrl:', uploadedImageUrl)
  
  const uploadFoodImage = () => {
    // const generateImageUrl = (fileName: string, downloadToken: string) => `https://firebasestorage.googleapis.com/v0/b/food-estimator.appspot.com/o/${fileName}?alt=media&token=${downloadToken}`
    
    const uploadFoodImageToFirebase = (imageToBeUploaded: any) => {
      setIsUploading(true)
      const uniqueImageName = imageToBeUploaded.name + uuid()
      const imageUploadedUrlRef = ref(firebaseStorage, uniqueImageName)

      const imageRef = ref(firebaseStorage, uniqueImageName)
      uploadBytes(imageRef, imageToBeUploaded).then((response) => {
        console.log('kd response:', response.metadata)
        console.log('kd response:', response.ref)
        alert('Food Item Uploaded')
        setIsUploading(false)
        list(imageUploadedUrlRef).then((repsonse) => {
          console.log('kd imageUploadedUrlRef repsonse:', repsonse)
        })
        // setImageUrl(generateImageUrl(response.metadata.name, response.metadata.downloadTokens?[0] ?? ''))
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

export default AddFoodItems;