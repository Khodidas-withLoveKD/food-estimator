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
    <MDBContainer breakpoint="sm"  className="my-5">
      <MDBCard >
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://firebasestorage.googleapis.com/v0/b/food-estimator.appspot.com/o/story.png?alt=media&token=51323c1b-8705-4f4b-98fe-cd3cc573d318' alt="login form" className='img-thumbnail' width="420vw" height="auto"/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div  className='d-flex flex-row mt-2'>
                <span className="h1 fw-bold pb-0">Login</span>
              </div>
            
              <div  className='d-flex flex-row mt-2'>
              <span className="h5 fw-normal pb-2 my-4">Register Your Employee Id</span>
              </div>

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
                  }}            
                />
               
              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={setAdminStatusAndEmployeeId}>Login</MDBBtn>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
    );
    
}

export default HomePage;