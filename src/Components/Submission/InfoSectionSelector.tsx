
 

import {DispatcherProps} from '../../Core/Utilities/types';
import Form from './Detail/SubmissionForm';



const InfoSectionSelector:React.FC<DispatcherProps> = (props) => {
   switch (props.request.selectedMenu) {
       case "DETAILS":
           return <Form request={props.request} dispatch={props.dispatch} onSave={props.onSave} formValidator={props.formValidator}/>

       default:
           return null;
   }
}

export default InfoSectionSelector;