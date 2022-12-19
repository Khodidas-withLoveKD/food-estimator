import axios from "axios";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input, SIZE } from "baseui/input";
import { useEffect, useState } from "react";
import { employeeBaseUrl } from "../constants/constants";
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} 
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const HomePage = () => {
     const [css, theme] = useStyletron()

    const [employeeId, setEmployeeId] = useState<any>(null);
    const[isAdmin, setIsAdmin] = useState<string>('');

    // const labelCss: any = {
    //     fontWeight: 500,
    //     fontSize: '15px',
    //     marginBottom: '5px'
    //   }
    
    //   const divCss: any = {
    //     textAlign: 'left',
    //     marginTop: '30px',
    //   }
    
    //   const heading = () => (
    //     <h3 className={css({
    //       textDecoration: 'underline'
    //     })}>
    //       Enter employee_id
    //     </h3>
    //   )
    
    const setAdminStatusAndEmployeeId = () => {
        
        const url = employeeBaseUrl + `${employeeId}/getAdminStatus`;

        axios.get(url).then((response)=>{
            console.log("responseObjectHome",response.data.responseObject)
            setIsAdmin(response.data.responseObject.is_admin)
            localStorage.setItem('employee_id', employeeId.toString());
            localStorage.setItem('is_admin',response.data.responseObject.is_admin)
            window.location.reload()    
        })

    };

    return (
    // <div className={css{(
    //     paddingTop: '20px',
    //     paddingLeft: '30px',
    //      paddingRight: '30px',
    //     paddingBottom: '20px',
    //     width: '60%',
    //     backgroundColor: 'pink',
    //     textAlign: 'left',
      
    // )}}>
    <MDBContainer breakpoint="sm"  className="my-5">
      <MDBCard >
        <MDBRow className='g-0'>

          <MDBCol size="lg" md='6'>
            <MDBCardImage src='https://firebasestorage.googleapis.com/v0/b/food-estimator.appspot.com/o/story.png?alt=media&token=82c5a5a9-018d-446f-9777-650c3a5ec548' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div  className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Login</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Register Your Employee Id</h5>

                {/* <MDBInput wrapperClass='mb-4' label='Employee Id' id='formControlLg' type='text' size="lg"/> */}
                {/* value={employeeId} onChange={e=>setEmployeeId(parseInt(e.target.value))} */}
                {/* <div classname={css({
                     display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around'
                })}> */}
                <Input 
                value={employeeId} 
                onChange={e => setEmployeeId(parseInt(e.target.value))} 
                placeholder="Enter Employee Id" 
                size={SIZE.compact} 
                clearOnEscape
                overrides={{
                    Root: {
                        style: ({ $theme }) => ({
                          outline: `${$theme.colors.warning200} solid`,
                          backgroundColor: $theme.colors.warning200,
                          flexWrap: 'wrap',
                          justifyContent: 'space-around',
                          marginBottom:'20px'
                        })
                      },              
                    // Input: {
                    //   style: ({ $theme }) => ({
                    //     outline: `${$theme.colors.warning200} solid`,
                    //     backgroundColor: $theme.colors.warning200,
                    //   })
                    // },
                    // After: {
                    //   style: ({ $theme }) => ({
                    //     outline: `${$theme.colors.warning200} solid`,
                    //     backgroundColor: $theme.colors.warning200
                    //   })
                    // },
                    // InputContainer: {
                    //   style: ({ $theme }) => ({
                    //     outline: `${$theme.colors.warning200} solid`,
                    //     backgroundColor: $theme.colors.warning200,
                    //     flexWrap: 'wrap',
                    //     justifyContent: 'space-around'
                    //   })
                    // }
                  }}            
                />
                {/* </div> */}
               
              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={setAdminStatusAndEmployeeId}>Login</MDBBtn>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
    // </div>
    );
    
}

export default HomePage;