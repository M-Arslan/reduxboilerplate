import { AgGridClasses } from '@genre/g2common-theme';
import { AggridWrapper } from '@genre/common-wrapper-aggrid'
import { Spinner } from '../../Core/Common';
import { Box } from '@mui/material';
import { GenesisUWApi } from '../../Core/Services/axios';
import { ViewSchema } from '../../Core/Utilities/types';
import { useSelector, useDispatch } from "react-redux";
import { ColDef } from 'ag-grid-community'
import { formatDate } from '../../Core/Utilities/rules.';
import { getGridViewsData,updateGridViewsData,deleteGridViewsData,createGridViewsData } from './Queries/Queries';
export const SubmissionGrid = () => {
 
    const UserSchema = {
        userName: "Grn\\artariq" ?? "",
        email: "",
        fullName: "",
    };
    const grid = useSelector((state: any) => state.grid)

    const colDef: (view?: ViewSchema) => ColDef[] = (view?: ViewSchema) => {
        return [
            { 
                field: 'policyID', 
                filter: 'agTextColumnFilter',
                cellRenderer: function (params: any) {
                    return (<a href={`/submission/${params.value}/submission-detail`}>{params.value}</a>);
                },
            },
            { field: 'submissionID', filter: 'agTextColumnFilter' },
            
            {
                field: 'policyType',
                headerName: 'Policy Type',
                filter: 'agSetColumnFilter',
                cellRenderer: function (params: any) {
                    let data = grid.businessTypes.find((x: any) => x.lookupValuesID == params.value);
                    return data?.value;
                },
            filterParams: {
                    values: grid.businessTypes.map((x: any) => x.name),
                    suppressAndOrCondition: true,
                    convertValuesToStrings: true
                }
            },
            { field: 'accountName', filter: 'agTextColumnFilter' },
            {
                field: 'division',
                headerName: 'Division',
                filter: 'agSetColumnFilter',
                cellRenderer: function (params: any) {
                    let data = grid.divisions.find((x: any) => x.lookupValuesID == params.value);
                    return data?.value;
                },
                filterParams: {
                    values: grid.divisions.map((x: any) => x.name),
                    suppressAndOrCondition: true,
                    convertValuesToStrings: true
                }
            },
            {
                field: 'effectiveDate',
                filter: 'agDateColumnFilter',
                cellRenderer: function (params: any) {
                    return formatDate(params.value);
                },

            },
            
            {
                field: 'expirationDate',
                filter: 'agDateColumnFilter',
                cellRenderer: function (params: any) {
                    return formatDate(params.value);
                },
            },
            {
                field: 'underwriterFullName',
                headerName: "Underwriter",
                filter: 'agSetColumnFilter',
                filterParams: {
                    values: grid.underwriters.map((x: any) => x.firstName + ' ' + x.lastName),
                    suppressAndOrCondition: true,
                    convertValuesToStrings: true
                }
            },
            { field: 'expiringContractDate', filter: 'agDateColumnFilter' },
            {
                field: 'uwStatus',
                headerName: 'Status',
                filter: 'agSetColumnFilter',
                filterParams: {
                    values: grid.submissionStatuses.map((x: any) => x.statusText),
                    suppressAndOrCondition: true,
                    convertValuesToStrings: true
                }
            },
            { 
                field: 'insuredState', 
                filter: 'agSetColumnFilter',
                cellRenderer: function (params: any) {
                    let data = grid.riskStates.find((x: any) => x.riskStateId == params.value);
                    return data?.stateName;
                },
                filterParams: {
                    values: grid.riskStates.map((x: any) => x.stateName),
                    suppressAndOrCondition: true,
                    convertValuesToStrings: true
                },
                

            },
            {
                field: 'submissionTypeID',
                headerName: 'Submission Type',
                filter: 'agSetColumnFilter',
                cellRenderer: function (params: any) {
                    let data = grid.submissionTypes.find((x: any) => x.lookupValuesID == params.value);
                    return data?.value;
                },
                filterParams: {
                    values: grid.submissionTypes.map((x: any) => x.name),
                    suppressAndOrCondition: true,
                    convertValuesToStrings: true
                }
            },
            
            { 
                field: 'monitoringCategoryID', 
                filter: 'agSetColumnFilter',
                headerName: 'Monitoring Category',
                filterParams: {
                    values: grid.monitoringCategories.map((x: any) => x.description),
                    suppressAndOrCondition: true,
                    convertValuesToStrings: true
                } 
            }
        ]
    }

    const loadGridRowsData = async (
        pagination: Object,
        filterModel: any,
        sortModel: Array<Object>,
        selectedView: ViewSchema | undefined
    ) => {

        console.log(filterModel);

        if (filterModel.policyType !== undefined) {
            let trimmed_x = filterModel.policyType.split(',').map((s:string) => s.trim());
            var policyIds: any = [];
            var filters = grid.businessTypes.filter((x: any) => {
                if (trimmed_x.includes(x.name)) {
                    policyIds.push(x.lookupValuesID)
                    return x.lookupValuesID;
                }
            });
            debugger;
            filterModel.policyType = policyIds.toString();
        }

        if (filterModel.division !== undefined) {
            let trimmed_x = filterModel.division.split(',').map((s:string) => s.trim());
            var divisionIds: any = [];
            var filters = grid.divisions.filter((x: any) => {
                if (trimmed_x.includes(x.name)) {
                    divisionIds.push(x.lookupValuesID)
                    return x.lookupValuesID;
                }
            });
            debugger;
            filterModel.division = divisionIds.toString();
        }

        if (filterModel.uwStatus !== undefined) {
 
            let trimmed_x = filterModel.uwStatus.split(',').map((s:string) => s.trim());
            var statusIds: any = [];
            var filters = grid.submissionStatuses.filter((x: any) => {
                if (trimmed_x.includes(x.statusText)) {
                    statusIds.push(x.statusID)
                    return x.statusID;
                }
            });
            debugger;
            filterModel.uwStatus = statusIds.toString();
        }

        if (filterModel.effectiveDate !== undefined) {
            filterModel.effectiveDate = new Date(filterModel.effectiveDate).toISOString();
        }
        if (filterModel.expirationDate !== undefined) {
            filterModel.expirationDate = new Date(filterModel.expirationDate).toISOString()    ;
        }

        if (filterModel.expiringContractDate !== undefined) {
            filterModel.expiringContractDate = new Date(filterModel.expiringContractDate).toISOString()    ;
        }
        // if (filterModel.policyID !== undefined) {
        //     filterModel.policyID = parseInt(filterModel.policyID);
        // }


        if (filterModel.insuredState !== undefined) {
 
            let trimmed_x = filterModel.insuredState.split(',').map((s:string) => s.trim());
            var statetIds: any = [];
            var filters = grid.riskStates.filter((x: any) => {
                if (trimmed_x.includes(x.stateName)) {
                    statetIds.push(x.riskStateId)
                    return x.riskStateID;
                }
            });
            debugger;
            filterModel.insuredState = statetIds.toString();
        }

        if (filterModel.monitoringCategoryID !== undefined) {
 
            let trimmed_x = filterModel.monitoringCategoryID.split(',').map((s:string) => s.trim());
            var mcIds: any = [];
            var filters = grid.monitoringCategories.filter((x: any) => {
                if (trimmed_x.includes(x.description)) {
                    mcIds.push(x.monitoringCategoryId)
                    return x.monitoringCategoryId;
                }
            });
            debugger;
            filterModel.monitoringCategoryID = mcIds.toString();
        }
        if (filterModel.submissionTypeID !== undefined) {
 
            let trimmed_x = filterModel.submissionTypeID.split(',').map((s:string) => s.trim());
            var subIds: any = [];
            var filters = grid.submissionTypes.filter((x: any) => {
                if (trimmed_x.includes(x.name)) {
                    subIds.push(x.lookupValuesID)
                    return x.lookupValuesID;
                }
            });
            debugger;
            filterModel.submissionTypeID = subIds.toString();
        }


        var obj: any = {
            ...pagination,
            ...filterModel,
            orderBy: sortModel.length > 0 ? sortModel
                .map((model: any) => model.colId + " " + model.sort)
                .join(", ") : "createdDate desc",
        };


        return new Promise((resolve, reject) => {

            GenesisUWApi.post('/SubmissionList', obj)
                .then((response) => {
                    if (response.status == 200) {
                        resolve(response.data)
                    }
                })
                .catch((err: any) => {
                    reject(err);
                })

        })
    }


    return (
        grid.isFetching ? <Spinner /> : (
            <Box component="main" sx={{ pl: 2, pr: 2 }}>
                <AggridWrapper
                    gridClassName={`ag-theme-alpine ${AgGridClasses['ag-theme-alpine']}`}
                    
                    currentUser={UserSchema}
                    dashboardName='Genesis UW Dashboard'
                    getColumnDefs={colDef}
                    getGridRowsData={loadGridRowsData}
                    gridHeight={window.innerHeight - 180}
                    landingPage='Genesis Underwriting'
                    views={true}
                    getGridViewsData={getGridViewsData}
                    createGridViewsData={createGridViewsData}
                    updateGridViewsData={updateGridViewsData}
                    deleteGridViewsData={deleteGridViewsData}
                    addIconURL='/submission'
                    addIconText='Submission Screen'
                    enableUserViews
                    enableSystemViews
                />
            </Box>)

    )
}