import * as React from 'react';
import {MuiStyledTabs as Tabs, MuiStyledTab as Tab} from "@genre/g2common-theme"
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Form from './SubmissionForm';
import Notes from '../../Notes/Notes';

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container padding={10}>
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Details" {...tabProps(0)} />
                <Tab label="Underwriter Notes" {...tabProps(1)} />
            </Tabs>
            {
               value === 0 ?
                    <></> :
                value === 1 ?
                    <Notes /> : null
            }
        </Box>
    </Grid>
  );
}