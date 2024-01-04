import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker as MUIDatePicker,DatePickerProps,} from "@mui/x-date-pickers/DatePicker";
import dayjs,{ Dayjs } from "dayjs";

export interface otherProps {
    helperText?: string | null;
    error?: boolean;
    id?:any;
    name?:any;
    onChange:any;
  }
type DateProps = otherProps & DatePickerProps<Dayjs>;

  


export const DatePicker:React.FC<DateProps>  = ({id,name,value,onChange,error,helperText,...props}) => {

    const onValueChanged = (e:any) =>
    {
        onChange({"target":{"name":name, "value":e}});
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MUIDatePicker   
            onChange={onValueChanged}
            value={value?dayjs(value):null}
            {...props}
            closeOnSelect={true}
            format="MM/DD/YYYY"
            orientation="landscape"
            slotProps={{
                textField: {
                    error: !!error,
                    helperText: helperText,
                    size: 'small',
                    fullWidth: true,
                    variant: 'outlined',
                    name:name,
                    id:id,
                },
                actionBar: {
                    actions: ['clear']
                  }
            }}
          
            />
        </LocalizationProvider>
    );
}

