import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router'
import { SubmissionGrid } from "./Components/Dashboard/SubmissionGrid";
import { Header } from "./Components/Header";
import { G2Theme } from '@genre/g2common-theme';
import { AuthenticatedTemplate, UnauthenticatedTemplate,useAccount } from "@azure/msal-react";
import { GenReLogin } from "@genre/genre-msal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { SubmissionDetailContainer } from "./Components/Tabs/SubmissionDetailContainer";
import { GetSubmissionStatuses,GetLookupValues,GetMonitoringCategories,GetUnderwritersList ,GetRiskStates, getCurrentUserDetails} from "./Components/Dashboard/Queries/Queries";
import { setDropdownValues } from "./Store/slices/GridSlice";
import { setAuthUser } from "./Store/slices/AuthSlice";
import styled from "styled-components";
import { DROPDOWN_TYPES } from "./Core/Utilities/types";

const Container = styled.article`
  height: 100%;
  width: 100%;
  max-width: 1850px;
  margin: 0px 25px 0px 25px;
  padding: 0;
  padding-bottom: 5px;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
`;

function App() {

  const grid = useSelector((state: any) => state.grid)
  console.log("values",grid);
  const $dispatch = useDispatch();

  let user = useAccount();
  console.log("User",user);
  useEffect(() => {
    if(!grid.valuesAvailable){
      $dispatch(setDropdownValues({type:"DROPDOWN_VALUES_PROCESSING"}))
      Promise.all([
        GetSubmissionStatuses(),
        GetLookupValues(),
        GetMonitoringCategories(),
        GetUnderwritersList(),
        GetRiskStates(),
        getCurrentUserDetails()]
        ).then((values) => {

          let lookupValues: any = values[1];
          let divisionTypes:Array<Object> = []; //6
          let businessTypes:Array<Object> = []; //3
          let submissionTypes:Array<Object> = []; //5
 
          lookupValues?.filter((x : any) => {
              if(x.lookupTypeID === DROPDOWN_TYPES.SUBMISSION) {
                submissionTypes.push(x);
              }else  if(x.lookupTypeID === DROPDOWN_TYPES.DIVISION) {
                divisionTypes.push(x);
              }else  if(x.lookupTypeID === DROPDOWN_TYPES.BUSINESS) {
                businessTypes.push(x);
              } 

          })
       $dispatch(setDropdownValues({type:"DROPDOWN_VALUES_SUCCESS",
       payload:{
        ...grid,
        submissionStatuses:values[0],
        monitoringCategories:values[2],
        underwriters:values[3],
        divisions:divisionTypes,
        businessTypes:businessTypes,
        submissionTypes:submissionTypes,
        valuesAvailable:true,
        riskStates: values[4]
      }}));
      $dispatch(setAuthUser({type:"SET_AUTH_USER",payload:{currentUser: values[5]}}));
      }).catch((error) => console.error(error));
    }
    

  }, [])

  return (
    <>
      <BrowserRouter basename="/">
        <AuthenticatedTemplate>
          <G2Theme>
            <Container>
            <Header />
            <Routes>
              <Route path="/" element={<SubmissionGrid />} />
              <Route path="/submission/:id/*" element={<SubmissionDetailContainer />} />
            </Routes>
            </Container>
          </G2Theme>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <GenReLogin />
        </UnauthenticatedTemplate>
      </BrowserRouter>
    </>

  )
  // any elements you want displayed when authenticated
}
export default App;