import { ViewSchema } from "../Utilities/types";
import { ColDef } from 'ag-grid-community'

const colDef : (view?: ViewSchema) => ColDef[] = (view?: ViewSchema) => {
    return [
        { field: 'policyID', filter: 'agTextColumnFilter' },
        { field: 'submissionID', filter: 'agTextColumnFilter' },
        { field: 'submissionTypeID' },
        { field: 'policyType' },
        { field: 'accountName', filter: 'agTextColumnFilter' },
        { field: 'effectiveDate', filter: 'agDateColumnFilter' },
        { field: 'expirationDate', filter: 'agDateColumnFilter' },
        { field: 'expiringContractDate', filter: 'agDateColumnFilter' },
        { field: 'uwStatus' },
        { field: 'underwriterFullName' },
        { field: 'policyType', filter: 'agTextColumnFilter' },
        { field: 'insuredState', filter: 'agTextColumnFilter' },
        { field: 'contactName', filter: 'agTextColumnFilter' },
        { field: 'monitoringCategoryID', filter: 'agTextColumnFilter' }
    ]
}

export default colDef