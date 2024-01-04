import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Details } from '@mui/icons-material';
 
import { Panel, PanelContent, PanelHeader, ContentRow, ContentCell } from '../../Core/Common';
import {RequestType,Dispatch,DispatcherProps} from '../../Core/Utilities/types'
import React from 'react';
 
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
 
        margin: '0px',
    },
}));
export const SubmissionMenu:React.FC<DispatcherProps> = (props) => {
    let request = props.request;
    let dispatch = props.dispatch;
    const classes = useStyles();
    const onMenuClicked = async (e: any, name: string) => {
        dispatch({ type: "UPDATE_UNIVERSAL_REQUEST", request: { ...request, selectedMenu: e } });
    }
 
 
    return (
        <Panel padding="0" margin="0" border="0">
            <PanelHeader><span style={{ fontWeight: 'bold', fontSize: '14px' }}></span></PanelHeader>
 
            <PanelContent>
                <ContentRow>
                    <ContentCell width="100%" >
                        <List component="nav" className={classes.root}>
                            <ListItem button onClick={() => { onMenuClicked("DETAILS", "DETAILS") }} selected={request.selectedMenu === "DETAILS"}>
                                <ListItemIcon>
                                    <Details />
                                </ListItemIcon>
                                <ListItemText primary="Details" secondary="Details" />
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={() => { onMenuClicked("FORM", "FORM") }} selected={request.selectedMenu === "FORM"}>
                                <ListItemIcon>
                                    <Details />
                                </ListItemIcon>
                                <ListItemText primary="Form" secondary="Form" />
                            </ListItem>
                            <Divider />
                        </List>
                    </ContentCell>
                </ContentRow >
            </PanelContent>
        </Panel>
    );
};