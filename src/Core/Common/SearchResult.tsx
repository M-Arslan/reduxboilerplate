import React from 'react';
import {
    ListItemAvatar,
    ListItemText,
    Avatar
} from '@mui/material';
import {
    FileCopy
} from '@mui/icons-material';

interface SearchResultProps {
    broker:any
}

export const BrokerSearchResult:React.FC<SearchResultProps>  = ({ broker }) => (
    <>
        <ListItemAvatar>
            <Avatar><FileCopy /></Avatar>
        </ListItemAvatar>
        <ListItemText primary={broker.brokerName} secondary={
            <span>
                {`${broker.contactFirstName || ''} ${broker.contactMiddleName || ''} ${broker.contactLastName || ''}`}
                <br />
                {`${broker.brokerAddress1 || ''} ${broker.brokerAddress2 || ''}`}
                <br />
                {`${broker.brokerCity || ''}`} {`${broker.brokerState || ''}`}
            </span>
        } />
    </>
);