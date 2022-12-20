import axios from "axios";
import { useStyletron } from "baseui";
import { useEffect, useState } from "react";
import { employeeBaseUrl } from "../constants/constants";
import { useNavigate } from 'react-router-dom';

import React from 'react';
import { routingPath } from "../constants/RoutingPaths";
import { Input, SIZE } from "baseui/input";
import { containerCss } from "../constants/commonCss";
import { Button } from "baseui/button";

const HomePage = () => {
     const [css, theme] = useStyletron()
    const navigate = useNavigate()


    const [employeeId, setEmployeeId] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState<string>('');
    
    const setAdminStatusAndEmployeeId = () => {
        
        const url = employeeBaseUrl + `${employeeId}/getAdminStatus`;

        axios.get(url).then((response)=>{
            console.log("responseObjectHome",response.data.responseObject)
            setIsAdmin(response.data.responseObject.is_admin)
            localStorage.setItem('employee_id', employeeId.toString());
            localStorage.setItem('is_admin',response.data.responseObject.is_admin)
        })

    };

    useEffect(() => {
      if (isAdmin) {
        navigate( isAdmin === 'True' ? routingPath.SET_MENU : routingPath.MENU_OF_THE_WEEK_AND_MEAL_SELECTION_PAGE)
        window.location.reload()
      } else navigate(routingPath.LOGIN)
    }, [isAdmin])

    const banner = () => (
      <div className={css({
        width: '50%'
      })}>
        <img src='https://firebasestorage.googleapis.com/v0/b/food-estimator.appspot.com/o/story.png?alt=media&token=51323c1b-8705-4f4b-98fe-cd3cc573d318' alt="login form" width="420vw" height="auto"/>
      </div>
    )

    const loginComponent = () => (
      <div className={css({
        display: 'block',
        width: '45%',
        paddingRight: '20px',
        marginTop: '100px',
        float: 'right',
        textAlign: 'left'
      })}>
        <h1>Login</h1>
        <div className={css({
          color: '#5A5A5A',
          marginBottom: '15px'
        })}>
          Employee ID
        </div>
        <Input 
          value={employeeId} 
          onChange={e => setEmployeeId(parseInt(e.target.value))} 
          placeholder="Enter your Employee Id" 
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
        <Button 
          onClick={setAdminStatusAndEmployeeId}
          size={SIZE.compact}
          className={css({
            width: '100%'
          })}
        >
          LOGIN
        </Button>
      </div>
    )

    return (
      <div className={css({
        ...containerCss,
        marginRight: '6%',
        marginLeft: '6%',
        display: 'flex',
      })}>
        {banner()}
        {loginComponent()}
      </div>
    );
    
}

export default HomePage;