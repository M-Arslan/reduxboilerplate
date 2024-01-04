import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField, TextareaAutosize } from "@mui/material";
import { Panel, PanelHeader, PanelContent, TextInput, SelectList, DatePicker } from "../../../Core/Common";
import { DispatcherProps } from "../../../Core/Utilities/types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Form: React.FC<DispatcherProps> = (props) => {

    const { request, dispatch, onSave } = props;
    const { register, formState: { errors }, setValue, unregister, clearErrors } = props.formValidator;
    const { submissionStatuses, monitoringCategories, underwriters, riskStates, submissionTypes, businessTypes,divisions } = useSelector((state: any) => state.grid)

    const onValueChanged = (evt: any) => {
        const { name, value } = evt.target;
        setValue(name, value ? value : null)

        // request.currentSubmission[evt.target.name] = evt.target.value.trimStart();
        dispatch({ type: 'UPDATE_UNIVERSAL_REQUEST', request: { ...request, currentSubmission: { ...request.currentSubmission, [name]: value.trimStart() } } });
        onSave && onSave()
    }

    const onDateChanged = (evt: any) => {
        const { name, value } = evt.target;
        setValue(name, value ? value : null)
        debugger;

        dispatch({ type: 'UPDATE_UNIVERSAL_REQUEST', request: { ...request, currentSubmission: { ...request.currentSubmission, [name]: new Date(value) } } });

        onSave && onSave()
    };

    const onDropDownChanged = (evt: any) => {
        debugger;
        const { name, value } = evt.target;
        setValue(name, value ? value : null)

        dispatch({ type: 'UPDATE_UNIVERSAL_REQUEST', request: { ...request, currentSubmission: { ...request.currentSubmission, [name]: value } } });

        onSave && onSave()
    };

    const openBrokerDrawer = () =>{
        dispatch({ type: 'UPDATE_UNIVERSAL_REQUEST', request: { ...request, openBrokerDrawer: true }});
    }
    //    

    return (
        <Panel padding="0" margin="0" border="0">
            <PanelHeader><span style={{ fontWeight: 'bold', fontSize: '14px' }}>Submission Detail</span></PanelHeader>
            <PanelContent padding={'0 20px'}>
                <Grid container spacing={2}>
                    <Grid container item direction={'row'} justifyContent={'space-between'}>

                    </Grid>
                    <Grid item md={4}>
                        <TextInput
                            fullWidth
                            id="submissionID"
                            {...register("submissionID",
                                {
                                    
                                    onChange: onValueChanged
                                }
                            )
                            }
                            value={request.currentSubmission.submissionID}
                            error={!!errors.submissionID}
                            helperText={errors.submissionID ? errors.submissionID.message : ""}
                            label="Submission ID"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={4}>
                        <FormControl fullWidth>
                            <SelectList
                                labelId="demo-simple-select-label"
                                id="submissionStatusID"
                                label="Submission Status"
                                size="small"
                                value={request.currentSubmission.submissionStatusID}
                                required
                                {...register("submissionStatusID",
                                    {
                                        
                                        onChange: onDropDownChanged
                                    }
                                )
                                }
                                error={!!errors.submissionStatusID}
                                helperText={errors.submissionStatusID ? errors.submissionStatusID.message : ""}
                            >
                                {submissionStatuses.map((status: any) => <MenuItem value={status.statusID}>{status?.statusText}</MenuItem>)}

                            </SelectList>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <TextInput
                            fullWidth
                            label="Account Name"
                            size="small"
                            required
                            value={request.currentSubmission.accountName || ''}
                            {...register("accountName",
                                {
                                    
                                    onChange: onValueChanged
                                }
                            )
                            }
                            error={!!errors.accountName}
                            helperText={errors.accountName ? errors.accountName.message : ""}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" size="small">Monitoring Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="monitoringCategoryID"
                                label="Monitoring Category"
                                size="small"
                                value={request.currentSubmission.monitoringCategoryID}
                                {...register("monitoringCategoryID",
                                    {
                                        
                                        onChange: onDropDownChanged
                                    }
                                )
                                }
                                error={!!errors.monitoringCategoryID}
                                helperText={errors.monitoringCategoryID ? errors.monitoringCategoryID.message : ""}
                            >
                                {monitoringCategories.map((category: any) => <MenuItem value={category.monitoringCategoryId}>{category?.description}</MenuItem>)}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label" size="small">SubBusiness Type</InputLabel> */}
                            <SelectList
                                labelId="demo-simple-select-label"
                                id="businessTypeID"
                                label="SubBusiness Type"
                                size="small"
                                value={request.currentSubmission.businessTypeID}
                                {...register("businessTypeID",
                                    {
                                        
                                        onChange: onDropDownChanged
                                    }
                                )
                                }
                                error={!!errors.businessTypeID}
                                helperText={errors.businessTypeID ? errors.businessTypeID.message : ""}

                            >
                                {businessTypes.map((status: any) => <MenuItem value={status.lookupValuesID}>{status?.name}</MenuItem>)}
                            </SelectList>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label" size="small">SubBusiness Type</InputLabel> */}
                            <SelectList
                                labelId="demo-simple-select-label"
                                id="businessTypeID"
                                label="Division Type"
                                size="small"
                                value={request.currentSubmission.divisionID}
                                {...register("divisionID",
                                    {
                                        
                                        onChange: onDropDownChanged
                                    }
                                )
                                }
                                

                            >
                                {divisions.map((status: any) => <MenuItem value={status.lookupValuesID}>{status?.name}</MenuItem>)}
                            </SelectList>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label" size="small">Underwriter</InputLabel> */}
                            <SelectList
                                labelId="demo-simple-select-label"
                                id="underwriterID"
                                label="Underwriter"
                                size="small"
                                value={request.currentSubmission.underwriterID}
                                {...register("underwriterID",
                                    {
                                        
                                        onChange: onDropDownChanged
                                    }
                                )
                                }
                                error={!!errors.underwriterID}
                                helperText={errors.underwriterID ? errors.underwriterID.message : ""}

                            >
                                {underwriters.map((x: any) => <MenuItem value={x.grnAssociateID}>{x?.firstName} {x?.middleName} {x?.lastName} </MenuItem>)}

                            </SelectList>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label" size="small">Risk State</InputLabel> */}
                            <SelectList
                                labelId="demo-simple-select-label"
                                id="insuredState"
                                label="Risk State"
                                size="small"
                                value={request.currentSubmission.insuredState}
                                {...register("insuredState",
                                    {
                                        
                                        onChange: onDropDownChanged
                                    }
                                )
                                }
                                error={!!errors.insuredState}
                                helperText={errors.insuredState ? errors.insuredState.message : ""}
                            >
                                {riskStates.map((state: any) => <MenuItem value={state.riskStateId}>{state?.stateName}</MenuItem>)}
                            </SelectList>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label" size="small">Submission Types</InputLabel> */}
                            <SelectList
                                labelId="demo-simple-select-label"
                                id="submissionTypeID"
                                label="Submission Type"
                                size="small"
                                value={request.currentSubmission.submissionTypeID}
                                {...register("submissionTypeID",
                                    {
                                        
                                        onChange: onDropDownChanged
                                    }
                                )
                                }
                                error={!!errors.submissionTypeID}
                                helperText={errors.submissionTypeID ? errors.submissionTypeID.message : ""}
                            >
                                {submissionTypes.map((status: any) => <MenuItem value={status.lookupValuesID}>{status?.name}</MenuItem>)}
                            </SelectList>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <TextField fullWidth label="Named Insured" size="small" />
                    </Grid>
                    <Grid item md={4}>
                        <DatePicker
                            label="Expiring Policy Expiration Date"
                            value={request.currentSubmission.policyExpirationDate}
                            {...register("policyExpirationDate",
                                {
                                    
                                    onChange: onDateChanged
                                }
                            )
                            }
                            error={!!errors.policyExpirationDate}
                            helperText={errors.policyExpirationDate ? errors.policyExpirationDate.message : ""}
                        // required
                        />
                    </Grid>
                    <Grid item md={4}>
                        <DatePicker
                            label="Effective Date"
                            id="effectiveDate"
                            value={request.currentSubmission.effectiveDate}
                            {...register("effectiveDate",
                                {
                                    
                                    onChange: onDateChanged
                                }
                            )
                            }
                            error={!!errors.effectiveDate}
                            helperText={errors.effectiveDate ? errors.effectiveDate.message : ""} />
                    </Grid>
                    <Grid item md={4}>

                        <DatePicker
                            label="Expiration Date"
                            required
                            id="expirationDate"
                            value={request.currentSubmission.expirationDate}
                            {...register("expirationDate",
                                {
                                    
                                    onChange: onDateChanged
                                }
                            )
                            }
                            error={!!errors.expirationDate}
                            helperText={errors.expirationDate ? errors.expirationDate.message : ""} />
                    </Grid>
                    
                    <Grid item md={4}>
                        <TextField 
                            fullWidth 
                            label="Expiring Contract or Policy" 
                            size="small" 
                            {...register("expiringPolicy",
                                { 
                                    onChange: onValueChanged
                                }
                            )
                            }
                            value={request.currentSubmission.expiringPolicy}
                            error={!!errors.expiringPolicy}
                            helperText={errors.expiringPolicy ? errors.expiringPolicy.message : ""}
                            />
                    </Grid>
                    <Grid item md={4} >
                        {/* <Button variant="contained"  color="primary" size="small" onClick={openBrokerDrawer}>Change Client Contact</Button> */}
                    </Grid>
                    <Grid item md={4}>
                        {/* <Button variant="contained"  color="primary" size="small" onClick={openBrokerDrawer}>Change Client Contact</Button> */}
                    </Grid>
                    <Grid item md={12}>
                        <TextField  
                        fullWidth 
                        label="Comments" 
                        name="comment"
                        onChange={onValueChanged}
                        size="small" 
                        rows={3} />
                    </Grid>
                </Grid>
            </PanelContent>
            {request.currentSubmission.selectedContact && <>
                    <PanelHeader><span style={{ fontWeight: 'bold', fontSize: '14px' }}>Client Contact</span></PanelHeader>
                    <PanelContent padding={'0 20px'}>

                        <Grid container spacing={2}>
                            <Grid item md={4}>
                                <TextField
                                    fullWidth
                                    label="BrokerName"
                                    size="small"
                                    value={request.currentSubmission.selectedContact?.brokerName || ''}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    fullWidth
                                    label="Contact Name"
                                    size="small"
                                    value={request.currentSubmission.selectedContact ? `${request.currentSubmission.selectedContact?.contactFirstName} ${request.currentSubmission.selectedContact?.contactMiddleName} ${request.currentSubmission.selectedContact?.contactLastName}` : ''}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    fullWidth
                                    label="Broker Address 1"
                                    size="small"
                                    value={request.currentSubmission.selectedContact?.brokerAddress1 || ''}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    fullWidth
                                    label="Broker Address 2"
                                    size="small"
                                    value={request.currentSubmission.selectedContact?.brokerAddress2 || ''}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    fullWidth
                                    label="Broker City"
                                    size="small"
                                    value={request.currentSubmission.selectedContact?.brokerCity || ''}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    fullWidth
                                    label="Broker State"
                                    size="small"
                                    value={request.currentSubmission.selectedContact?.brokerState || ''}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    fullWidth
                                    label="Broker Zip"
                                    size="small"
                                    value={request.currentSubmission.selectedContact?.brokerZip || ''}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    fullWidth
                                    label="Contact Email"
                                    size="small"
                                    value={request.currentSubmission.selectedContact?.contactEmail || ''}
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    fullWidth
                                    label="Contact Phone Number"
                                    size="small"
                                    value={request.currentSubmission.selectedContact?.contactPhone || ''}
                                />
                            </Grid>
                        </Grid>

                    </PanelContent>
                </>}
        </Panel>
    )
}

export default Form;