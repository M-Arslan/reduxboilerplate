import { CommonApi,SecurityApi,GenesisUWApi } from "../../../Core/Services/axios";
import { ViewSchema } from "../../../Core/Utilities/types";

export const GetSubmissionStatuses = async () => {
     return new Promise((resolve,reject) => {
         GenesisUWApi.get(`${process.env.REACT_APP_GENESISUW_API_URL}/SubmissionStatuses`)
         .then((response) => {
             if(response.status === 200){
                resolve(response.data)
             }else{
                reject();
             }
         }).catch((error) => reject(error));
     })
}


export const GetLookupValues = async () => {
    return new Promise((resolve,reject) => {
        CommonApi.get(`${process.env.REACT_APP_COMMON_API_URL}/LookupValues`)
        .then((response) => {
            if(response.status === 200){
               resolve(response.data)
            }else{
               reject();
            }
        }).catch((error) => reject(error));
    })
}

export const GetUnderwritersList = async () => {
    return new Promise((resolve,reject) => {
        CommonApi.get(`${process.env.REACT_APP_COMMON_API_URL}/GRNAssociate?flag=true`)
        .then((response) => {
            if(response.status === 200){
               resolve(response.data)
            }else{
               reject();
            }
        }).catch((error) => reject(error));
    })
}


export const GetMonitoringCategories = async () => {
    return new Promise((resolve,reject) => {
        CommonApi.get(`${process.env.REACT_APP_REFERENCE_API_URL}/MonitoringCategories/GetMonitoringCategories?isActive=true&businessId=4`)
        .then((response) => {
            if(response.status === 200){
               resolve(response.data)
            }else{
               reject();
            }
        }).catch((error) => reject(error));
    })
}


export const GetRiskStates = async () => {
    return new Promise((resolve,reject) => {
        CommonApi.get(`${process.env.REACT_APP_REFERENCE_API_URL}/RiskStates`)
        .then((response) => {
            if(response.status === 200){
               resolve(response.data)
            }else{
               reject();
            }
        }).catch((error) => reject(error));
    })
}

export const getGridViewsData = async () => {
    return new Promise((resolve, reject) => {
        CommonApi
          .get(
            `${process.env.REACT_APP_COMMON_API_URL}/User/grn%5Cartariq/UserGridViewsByAppTypeId?appName=Genesis%20Underwriting`
          )
          .then((resp) => {
            if (resp.status === 200) {
              resolve(resp.data);
            } else reject();
          })
          .catch((err) => reject(err))
      });
}

export const deleteGridViewsData = async (id: string) => {
    return CommonApi
      .delete(`${process.env.REACT_APP_COMMON_API_URL}/UserGridViews/${id}`)
      .then(function (response: any) {
        if (response.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((e: any) => {
        return false;
      });
};

  export const updateGridViewsData = async (view: ViewSchema) => {

    return CommonApi
      .put(`${process.env.REACT_APP_COMMON_API_URL}/UserGridViews/${view.userGridViewID}`, JSON.stringify(view))
      .then((data: any) => {

      })
      .catch((e: any) => {

      });
  };

  export const createGridViewsData: (view: ViewSchema) => Promise<any> = async (
    view: ViewSchema
  ) => {
    view.appTypeID = process.env.REACT_APP_TYPE_ID;

    return new Promise((resolve, reject) => {
      CommonApi
        .post("/UserGridViews", JSON.stringify(view))
        .then((resp) => {
          if (resp.status === 201) {
            resolve(resp.data);
          } else reject();
        })
        .catch((err) => reject(err))
    });
  };

  export const getCurrentUserDetails = async () => {

    return new Promise((resolve, reject) => {
       CommonApi.get(`${process.env.REACT_APP_COMMON_API_URL}/GetCurrentUserDetails`)
        .then((resp) => {
          debugger;
          if (resp.status === 200) {
            resolve(resp.data);
          } else reject();
        })
        .catch((err) => reject(err))
    });
  };