import { TextField, Tooltip,TextFieldProps } from '@mui/material';
import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
export interface otherProps {
    helperText?: string | null;
    error?: boolean;
    allowempty?: boolean;
    allowDecimal?: boolean;
    allowNegative?: boolean;
    value:any;
    onChange:any;
    disabled:any;
  }
type NumericInputProps = otherProps & TextFieldProps;


const CustomInput:React.FC<NumericInputProps> = ({error,helperText,...props})=>
{
    return(<TextField size='small' 
    error={error} 
    helperText={helperText} 
    {...props}>        
    </TextField>)
}

export const NumericInput:React.FC<NumericInputProps> = ( { id,name,value,label,allowDecimal = false, allowNegative = false,disabled=false,error,helperText,onChange, ...props} ) => {

    const onValueChange = (obj:any) => {

        if (obj.value.split('.').length > 1)
            onChange({"target":{"name":name, "value":value}});
        else if (obj.value <= 999999999)
            onChange({"target":{"name":name, "value":obj.value === "" ? null : obj.value}});

        else
            onChange({"target":{"name":name, "value":value === "" ? null : value}});

    }

    value = value ? value : "";
    return <CurrencyFormat 
        label={label}
        isNumericString={true} 
        name={name} 
        value={value} 
        customInput={CustomInput} 
        onValueChange={onValueChange} 
        thousandSeparator={false} 
        allowNegative={false} 
        fullWidth={true}  
        disabled={disabled}
        error={error}
        helperText={helperText}
        ></CurrencyFormat>

}
