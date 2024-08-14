const BaseURL = {
    BASE_URL: `https://aek.fastark.in/api`,
};

export const API_CONSTANTS = {
    GET_ALL_OTP: `${BaseURL.BASE_URL}/Admin/GetAllOTP`,
    LOGIN: `https://aek.fastark.in/api/Account/Login`,
    GET_REFRESH_TOKEN: `${BaseURL.BASE_URL}/Admin/RefreshToken`,
    GET_COUNTRIES_LIST: `${BaseURL.BASE_URL}/DropDown/GetCountry`,
    GET_STATE_LIST: `${BaseURL.BASE_URL}/DropDown/GetState`,
    GET_CITY_LIST: `${BaseURL.BASE_URL}/DropDown/GetCity`,
    GET_GENDER_MASTER: `${BaseURL.BASE_URL}/DropDown/GenderMaster`,
    REGISTER: `${BaseURL.BASE_URL}/Account/Register`,
    GET_ALL_EMPLOYEE: `${BaseURL.BASE_URL}/Admin/GetAllEmployee`,
    GET_ALL_EMPLOYEE_DETAILS: `${BaseURL.BASE_URL}/Admin/GetAllEmployeeDetails`,
    VERIFY_USER: `${BaseURL.BASE_URL}/Admin/VerifyUser`,
    DELETE_EMPLOYEE: `${BaseURL.BASE_URL}/Admin/DeleteEmployee`,
    ADD_EMPLOYEE: `${BaseURL.BASE_URL}/Admin/AddEmployee`,
    EDIT_EMPLOYEE: `${BaseURL.BASE_URL}/Admin/EditEmployee`,
    GET_ALL_EMPLOYEE_DETAILS_BY_ID: `${BaseURL.BASE_URL}/Admin/GetAllEmployeeDetailsbyId`,
    GET_ALL_SERVICE_AUTH: `${BaseURL.BASE_URL}/Admin/GetAllServiceAuth`,
    UPDATE__FLAGS: `${BaseURL.BASE_URL}/Admin/UpdateFlags`,
    Get_Logs: `${BaseURL.BASE_URL}/Admin/GetLogs`,
    GET_LOGOUT: `${BaseURL.BASE_URL}/Admin/LogOutUser`,
    GET_ALL_SUPERVISOR:`${BaseURL.BASE_URL}/Account/GetAllSupervisors`,
    UPDATE_SUPERVISOR_DETAILS_BY_ID: `${BaseURL.BASE_URL}/Account/CreateOrUpdateUser`,
    GET_SUPERVISOR_BY_ID:`${BaseURL.BASE_URL}/Account/CreateOrUpdateUser`,
    GET_SUPERVISOR_DETAILS_BY_ID:`${BaseURL.BASE_URL}/Account/GetSupervisorById`,
    EDIT_SUPERVISOR: `${BaseURL.BASE_URL}/Account/CreateOrUpdateUser`,
    GET_CENTER_TYPE: `${BaseURL.BASE_URL}/DropDown/CenterType`,
    GET_SUPERVISOR_LIST: `${BaseURL.BASE_URL}/DropDown/SupervisorDropDown`,
    GET_EXCEL:`${BaseURL.BASE_URL}/Report/DownloadExcelEmployeeDetails`,
    BLOCK_SUPERVISOR:`${BaseURL.BASE_URL}/Admin/BlockManagerById`,
    

};
export const API_METHODS = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    PUT: 'PUT'
};

