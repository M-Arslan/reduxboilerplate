import React from 'react';
import {
    TextField,
    TextFieldProps
} from '@mui/material';

export const TextInput:React.FC<TextFieldProps> = ({...props}) => {
    return (
        <TextField size="small" fullWidth={true} {...props}></TextField>
    );
}

