import axios from "axios";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input, SIZE } from "baseui/input";
import { useEffect, useState } from "react";
import { employeeBaseUrl } from "../constants/constants";

const HomePage = () => {
    const [css, theme] = useStyletron()

    const [employeeId, setEmployeeId] = useState<any>(null);
    const[isAdmin,setIsAdmin] = useState<string>('');

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
          Enter employee_id
        </h3>
      )
    
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
        <div className={css(divCss)}>
        <div className={css(labelCss)}>Employee Id</div>
          <Input
            value={employeeId}
            onChange={e => setEmployeeId(parseInt(e.target.value))}
            placeholder="Enter Employee Id"
            size={SIZE.compact}
            clearOnEscape
            overrides={{
                Input: {
                  style: ({
                    
                  })
                }
              }}        
          />
          <Button onClick={() => setAdminStatusAndEmployeeId()}>Login</Button>
          </div>
      );
    
}

export default HomePage;