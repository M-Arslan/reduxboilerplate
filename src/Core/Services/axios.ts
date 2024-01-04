import axios from "axios";

export const CommonApiHeader = {
    "Content-Type": "application/json",
    G2ApplicationsCommonApiKey: process.env.REACT_APP_COMMON_BACKEND_APP_KEY,
  };
  
  export const CommonApi = axios.create({
    baseURL: process.env.REACT_APP_COMMON_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      G2ApplicationsCommonApiKey: process.env.REACT_APP_COMMON_BACKEND_APP_KEY,
    },
  });
  
  export const SecurityApi = axios.create({
    baseURL: process.env.REACT_APP_SECURITY_API_URL,
    headers: {
      "Content-Type": "application/json",
      G2ApplicationsSecurityApiKey:
        process.env.REACT_APP_SECURITY_BACKEND_APP_KEY,
    },
  });


  export const GenesisUWApi = axios.create({
    baseURL: process.env.REACT_APP_GENESISUW_API_URL,
    headers: {
      "Content-Type": "application/json",
      G2ApplicationsGenesisUWApiKey:
        process.env.REACT_APP_GENESISUW_BACKEND_APP_KEY,
    },
  });




  



  
