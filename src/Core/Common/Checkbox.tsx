import React from 'react';
import styled from 'styled-components';
import {
    Checkbox as MUICheckbox,
    CheckboxProps
} from '@mui/material';
import CSS from 'csstype';
export interface otherProps {
    helperText?: string | null;
    error?: boolean;
    label?:string;
    onChange:any;
  }
type CheckboxInputProps = otherProps & CheckboxProps;

const CheckboxLabel  = styled.label<CSS.Properties>`
    display: flex;
    flex-flow: row nowrap;
    align-content: center;
    align-items: center;
    width: ${props => (props.width || '100%')};

    & > span {
        padding-left: .5em;
    }
`;

export const Checkbox:React.FC<CheckboxInputProps> = ( {id,name,label,onChange,...props} ) => {

    const onValueChange = (e:any) =>
    {
        onChange({"target":{"name":name, "value":e.target.checked}});
    }

    return (
        <CheckboxLabel htmlFor={id} >
            <MUICheckbox onChange={onValueChange} {...props} />
            <span>{label}</span>
        </CheckboxLabel>
    );
}