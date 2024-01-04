import React, { Suspense } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RoutableTabs } from './RoutableTabs';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spinner } from '../../Core/Common';
import Submission from '../Submission/Submission';
import Notes from '../Notes/Notes';


const TabContainer = styled.div`
    height: calc(100% - 40px);
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: ${props => props.theme.backgroundColor};
    
`;



export const AppRouter = () => {

    const visibleApps = [
        { id: 1, key: 'submission-detail', label: 'Form', component: <Submission /> },
        { id: 2, key: 'notes', label: 'Notes', component: <Notes /> },
       
    ];


    const tabMap = new Map();
    visibleApps.forEach(app => tabMap.set(app.key, app.label));
    return (
        <TabContainer>
            <RoutableTabs tabMap={tabMap} >
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        
                        <Route path="/submission" element={<Navigate to="/" replace />} />
                        {
                            visibleApps.map(app => <Route path={app.key} element={app.component} key={`app-${app.id}`} />)
                        }

                    </Routes>
                </Suspense>
            </RoutableTabs>
        </TabContainer>
    );
}
