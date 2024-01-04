import React from 'react';
import {
    Select,
    FormControl,
    InputLabel,
    FormHelperText,
    MenuItem,
    SelectProps
} from '@mui/material';
export interface otherProps {
    helperText?: string | null;
    error?: boolean;
    allowempty?: boolean;
}
type SelectListProps = otherProps & SelectProps;

export const SelectList: React.FC<SelectListProps> = ({ id, children, label, required, variant, error, helperText, allowempty, ...props }) => {
    const labelid = `${id}__label`;
    return (
        <>
            <FormControl size="small" required={required} fullWidth={true} variant={variant} error={error}>
                <InputLabel id={labelid}>{label}</InputLabel>
                <Select
                    fullWidth={true}
                    displayEmpty={true}
                    label={label}
                    labelId={labelid}
                    variant='outlined'
                    size='small'
                    {...props}
                >
                    <MenuItem disabled={allowempty ? false : true} value="">{" "}</MenuItem>
                    {children}
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </>
    );

}

