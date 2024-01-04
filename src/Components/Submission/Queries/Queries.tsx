import { CommonApi,SecurityApi,GenesisUWApi } from "../../../Core/Services/axios";



export const GetBrokerLocations = async (searchString:string) => {
    return new Promise((resolve,reject) => {
        GenesisUWApi.get(`${process.env.REACT_APP_GENESISUW_API_URL}/BrokerLocations?searchString=${searchString}`)
        .then((response) => {
            if(response.status === 200){
               resolve(response.data)
            }else{
               reject();
            }
        }).catch((error) => reject(error));
    })
}



export const GetBrokerContacts = async (searchType:string ,searchTerm:string) => {
    return new Promise((resolve,reject) => {
        GenesisUWApi.get(`${process.env.REACT_APP_GENESISUW_API_URL}/BrokerContacts?searchType=${searchType}&&searchTerm=${searchTerm}`)
        .then((response) => {
            if(response.status === 200){
               resolve(response.data)
            }else{
               reject();
            }
        }).catch((error) => reject(error));
    })
}