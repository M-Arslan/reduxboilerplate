import React from "react";
import { useState, useEffect } from 'react';
import { SubmissionMenu } from "./SubmissionMenu";
import {
    IconButton,
    ButtonGroup,
    Fade,
    Menu,
    MenuItem,
} from '@mui/material';
import InfoSectionSelector from "./InfoSectionSelector";
import {
    TabContainer,
    AppContainer,
    Toolbar,
    ContentRow,
    ContentCell,
    Spinner
} from "../../Core/Common";
import { useForm } from "react-hook-form";
import {
    Menu as MenuIcon
} from '@mui/icons-material';
import { validateSubmissionForm } from "./Validations/SubmissionFormValidation";
import { RequestType, DispatcherProps, Action, Dispatch } from "../../Core/Utilities/types";
import { SearchDrawer } from "../../Core/Common/SearchDrawer";
import { BrokerSearchResult } from "../../Core/Common/SearchResult";
import { GetBrokerContacts, GetBrokerLocations } from "./Queries/Queries";
// import { APP_NAME, Delegated_API_KEY, Delegated_App_URL, G2_COMMON_API_KEY, G2_COMMON_API_URL } from "../urlConfig";
import { useParams } from 'react-router-dom';
// import { getDelegatedPolicyRegistrationDetail, saveDelegatedPolicyRegistrationDetail, getRequestTypes, getSubmissionTypes, getPolicyProcessStatuses } from '../axios/APIs'

const Submission: React.FunctionComponent = () => {

    const formValidator = useForm();
    const {  formState: { errors }, setValue, clearErrors } = formValidator;

    const { subID } = useParams();
    const initialState = {
        isProcessing: false,
        isSaving: false,
        selectedMenu: 'DETAILS',
        requestTypes: [],
        submissionTypes: [],
        currentSubmission: {
            submissionID: null,
            submissionStatusID: null,
            accountName: '',
            monitoringCategoryID: null,
            businessTypeID: null,
            underwriterID: null,
            insuredState: null,
            submissionTypeID: null,
            policyExpirationDate: null,
            effectiveDate: null,
            expirationDate: null,
            expiringPolicy: null,
            comment: '',
            selectedContact:null,
            divisionID:null
        },
        policyProcessStatuses: [],
        openBrokerDrawer:false
    };
    const reducer = (state: RequestType, action: Action) => {
        switch (action.type) {
            case "UPDATE_UNIVERSAL_REQUEST":
                return Object.assign({}, state, action.request);
            default:
                return state;
        }
    };
    const [request, dispatch] = React.useReducer(reducer, initialState);
    const [anchorEl, setAnchorEl] = React.useState(null);



    const onMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const onMenuClose = () => {
        setAnchorEl(null);
    };

   

    const onAutoSave = async () => {
        setAnchorEl(null);
        const validate:boolean= await validateSubmissionForm(formValidator.trigger);
         if(validate){
             console.log("Hello");
             const payload:Object = {
                // policyID: request.currentSubmission.policyID,
                submissionID: request.currentSubmission.submissionID,
                accountName: request.currentSubmission.accountName,
                uWStatus: request.currentSubmission.submissionStatusID,
                policyType: request.currentSubmission.businessTypeID,
                activityTypeID: request.currentSubmission.submissionTypeID,
                underwriterID: request.currentSubmission.underwriterID,
                effectiveDate: request.currentSubmission.effectiveDate,
                expirationDate: request.currentSubmission.expirationDate,
                expiringContractDate: request.currentSubmission.policyExpirationDate,
                insuredState: request.currentSubmission.insuredState,
                division: request.currentSubmission.divisionID,
                contactName : request.currentSubmission.selectedContact?.brokerContactID

                
                
             }
         }
    }

    const onSearch = async (searchType:string,searchTerm : string) => {
        let result:any = await GetBrokerContacts(searchType,searchTerm);
        return result
    }
   
    const onSearchContact = () => {
        dispatch({ type: 'UPDATE_UNIVERSAL_REQUEST', request: { ...request, openBrokerDrawer:true } });
    }

    const onResultSelected = async (result : any) => {
        console.log('Hello',result)
        dispatch({ type: 'UPDATE_UNIVERSAL_REQUEST', request: { ...request, openBrokerDrawer:false, currentSubmission:{...request.currentSubmission, selectedContact:result.selected} } });
        // let result:any = await GetBrokerLocations(searchTerm);
        // return result
    }
   

    return (
        <>
            <>
                {request.isProcessing && <Spinner />}
                {!request.isProcessing && <>
                    <AppContainer>
                        <Toolbar>
                            <ButtonGroup variant="text">
                                <IconButton name="Actions" title="More Actions" onClick={onMenuOpen}><MenuIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={onMenuClose}
                                    TransitionComponent={Fade}
                                >
                                    {/* <MenuItem onClick={onAutoSave}>Save</MenuItem> */}
                                    <MenuItem onClick={onSearchContact}>Change Contact</MenuItem>
                                    <MenuItem onClick={onMenuClose}>Cancel</MenuItem>

                                </Menu>
                                {/** <IconButton name="Help" title="Help" onClick={onHelpDrawerOpen}><HelpOutline /></IconButton> */}
                            </ButtonGroup>
                        </Toolbar>
                        <TabContainer>
                            <ContentRow style={{ justifyContent: "flex-start", alignItems: "flex-start", flex: 1, display: "flex" }}>
                                <ContentCell width="100%" padding={'1 rem '}>
                                    <InfoSectionSelector request={request} dispatch={dispatch} onSave={onAutoSave} formValidator={formValidator} />
                                </ContentCell>
                                {/* <ContentCell width="25%" >
                                    <SubmissionMenu request={request} dispatch={dispatch} />
                                </ContentCell> */}
                            </ContentRow>
                        </TabContainer>
                    </AppContainer>
                    <SearchDrawer
                        title="Broker Search"
                        onSearch={onSearch}
                        onResultSelected={onResultSelected}
                        options={{
                            multiSelect: false,
                            multiFilter: true,
                            filterOptions: [
                                { label: 'Broker Name', value: 'B' },
                                { label: 'Contact Name', value: 'C' },
                             
                            ],
                            // defaultFilter: 'C',
                            noResultsMessages: {}
                        }}
                        open={request.openBrokerDrawer}
                    >
                        {
                            (res:any) => <BrokerSearchResult broker={res} />
                        }
                    </SearchDrawer>
                </>
                }
            </>
        </>

    );

}

export default Submission;