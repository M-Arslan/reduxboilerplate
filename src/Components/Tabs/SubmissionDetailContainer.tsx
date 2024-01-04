import React from 'react';
import styled from 'styled-components';
import { AppRouter } from './Router';


const SubmissionContainer = styled.div`
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.primaryColor};
`;

const FlexContainer = styled.article`
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: stretch;
`;

const SubmissionInfoToolbar = styled.div`
    background-color: ${props => props.theme.backgroundDark};
    height: 60px;
    width: 100%;
    padding: 0;
    border-bottom: solid 1px ${props => props.theme.backgroundDark};
    margin-bottom: 1em;
    border-radius: 4px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
`;

const Toolbuttons = styled.div`
    height: 36px;
    width: 5%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-content: center;
`;


export const SubmissionDetailContainer = () => {





    return (
        <SubmissionContainer>
            <FlexContainer>
                {/* <SubmissionInfoToolbar>

                </SubmissionInfoToolbar> */}
                <AppRouter />
            </FlexContainer>
        </SubmissionContainer>
    );
}