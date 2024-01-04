
import React from "react";
export type Dispatch = React.Dispatch<Action>;

export interface Submission {
    submissionID:Number | null,
    submissionStatusID:Number  | null,
    accountName:string,
    monitoringCategoryID:Number  | null,
    businessTypeID:Number  | null,
    underwriterID:Number  | null,
    insuredState:Number  | null,
    submissionTypeID:Number  | null,
    divisionID:Number | null,
    policyExpirationDate:Date  | null,
    effectiveDate:Date  | null,
    expirationDate:Date  | null,
    expiringPolicy:Number  | null,
    comment:string,
    selectedContact:BrokerContact | null
}

export interface BrokerContact {
  brokerName: string
  brokerAddress1: string
  brokerAddress2: string
  brokerCity: string
  brokerState: string
  brokerZip: string
  brokerOfficePhone: string
  brokerContactID: number
  contactFirstName: string
  contactLastName: string
  contactEmail: string
  contactMiddleName: string
  contactPhone: string
  brokerLocationID: number
}

export interface RequestType {
    isProcessing: boolean;
    isSaving: boolean;
    selectedMenu: string;
    requestTypes: any[];
    submissionTypes: any[];
    currentSubmission:Submission;
    policyProcessStatuses: any[];
    openBrokerDrawer:boolean
}
export interface DispatcherProps {
    request: RequestType;
    dispatch: Dispatch;
    onSave?:() => void;
    formValidator?: any;
}
export type Action = { type: "UPDATE_UNIVERSAL_REQUEST"; request: RequestType };

export interface ViewSchema {
    columnData: string;
    createdBy: string;
    createdDate: string;
    filterData: string;
    isDefault: boolean;
    isSystem: boolean;
    modifiedBy: string | null;
    modifiedDate: string | null;
    screenName: string;
    userGridViewID?: string;
    viewName: string;
    appTypeID?: string;
  }
 
  export const DROPDOWN_TYPES = {
    DIVISION: 6,
    BUSINESS:3,
    SUBMISSION: 5
  }
 

  export interface SearchDrawerProps  {
    open:boolean,
    onResultSelected: any,
    onSearch : any,
    title:string,
    options:any
    children :any
  }