import { useStyletron } from 'baseui';
import { colors } from '../shared/theme';
import { Select } from "baseui/select";
import React, {useState} from "react";


const MealSelectionPage = () => {

    const [css, theme] = useStyletron()
    const [value, setValue] = useState<String[]>();
      
    return (
        <div className={css({
            color : colors.primary
        })}>
        <Select
        options={[
          { label: "Monday", id: "MON" },
          { label: "Tuesday", id: "TUE" },
          { label: "Wednesday", id: "WED" },
          { label: "Thursday", id: "THURS" },
          { label: "Friday", id: "FRI" },
          { label: "Saturday", id: "SAT" }
        ]}
        value={value}
        onChange={value => setValue(value)}
      />
    )

}

export default MealSelectionPage