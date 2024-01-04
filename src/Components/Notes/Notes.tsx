import { Button, Grid } from "@mui/material";
import { useState } from "react";
import NewNote from "./NewNote";
import AllNotes from "./AllNotes";
const Notes = () => {
    const [currentSection, setCurrentSection] = useState('new');


    return <Grid container spacing={2} mt={2}>
    <Grid container item direction={'row'} justifyContent={'space-between'}>
        <Grid container direction={'row'} md={4} item>
            <Button variant={currentSection === 'new' ? "contained" : "outlined"} size="small" sx={{ mr: 1 }} onClick={() => setCurrentSection('new')}>New Note</Button>
            <Button variant={currentSection === 'all' ? "contained" : "outlined"} size="small" sx={{ mr: 1 }} onClick={() => setCurrentSection('all')}>All Notes</Button>
        </Grid>
       {currentSection === 'new' && <Grid>
            <Button variant="contained" size="small" sx={{ mr: 1 }}>Save</Button>
            <Button variant="outlined" size="small" sx={{ mr: 1 }}>Cancel</Button>
        </Grid>}
    </Grid>
    <Grid item md={12}>
        { currentSection === 'new' ? <NewNote /> : currentSection === 'all' ? <AllNotes /> : null }
    </Grid>
    </Grid>
}

export default Notes;