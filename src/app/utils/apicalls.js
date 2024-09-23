import { fetchCall, fetchLoginCall, fetchNoCall } from "../utils/ajax";
import { API_CONSTANTS, API_METHODS } from "../constants/api-constants";

export const Login = (callback, payload) => {
  const url = `${API_CONSTANTS.LOGIN}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const getRefreshToken = (callback, payload) => {
  const url = `${API_CONSTANTS.GET_REFRESH_TOKEN}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const GetAllOTP = (callback, payload) => {
  const url = `${API_CONSTANTS.GET_ALL_OTP}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.GET,
    payload
  );
};

export const getCountriesList = (callback, payload) => {
  const url = `${API_CONSTANTS.GET_COUNTRIES_LIST}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.GET,
    payload
  );
};

export const getStateList = (callback, payload) => {
  let queryString = `?countryId=${payload}`;
  const url = `${API_CONSTANTS.GET_STATE_LIST + queryString}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.GET
  );
};

export const getLogOut = (callback, payload) => {
  let queryString = `?UserId=${payload.userId}`;
  const url = `${API_CONSTANTS.GET_LOGOUT + queryString}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.GET
  );
};

export const getCityList = (callback, payload) => {
  let queryString = `?stateId=${payload}`;
  const url = `${API_CONSTANTS.GET_CITY_LIST + queryString}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.GET
  );
};

export const GenderMaster = (callback, payload) => {
  const url = `${API_CONSTANTS.GET_GENDER_MASTER}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.GET,
    payload
  );
};

export const Register = (callback, payload) => {
  const url = `${API_CONSTANTS.REGISTER}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const GetAllEmployee = (callback, payload) => {
  const url = `${API_CONSTANTS.GET_ALL_EMPLOYEE}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const GetAllEmployeeDetails = (callback, payload) => {
  const queryString = `?supervisorId=${payload?.supervisorId}`;
  const url = `${API_CONSTANTS.GET_ALL_EMPLOYEE_DETAILS + queryString}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const VerifyUser = (callback, payload) => {
  let queryString = `?userId=${payload.userId}&isActive=${payload.isActive}`;
  const url = `${API_CONSTANTS.VERIFY_USER + queryString}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST
  );
};

export const DeleteEmployee = (callback, payload) => {
  let queryString = `?userId=${payload.userId}`;
  const url = `${API_CONSTANTS.DELETE_EMPLOYEE + queryString}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.DELETE
  );
};

export const AddEmployee = (callback, payload) => {
  const url = `${API_CONSTANTS.ADD_EMPLOYEE}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const EditEmployee = (callback, payload) => {
  const url = `${API_CONSTANTS.EDIT_EMPLOYEE}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const GetAllEmployeeDetailsbyId = (callback, payload) => {
  let queryString = `?userId=${payload.userId}`;
  const url = `${API_CONSTANTS.GET_ALL_EMPLOYEE_DETAILS_BY_ID + queryString}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST
  );
};

export const GetAllServiceAuth = (callback, payload) => {
  // let queryString = `?searchString=${payload.searchString}`
  const url = `${API_CONSTANTS.GET_ALL_SERVICE_AUTH}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST
  );
};

export const UpdateFlags = (callback, payload) => {
  // let queryString = `?isFixedInitiated=${payload.isFixedInitiated}&isBlocked=${payload.isBlocked}&id=${payload.id}`
  const url = `${API_CONSTANTS.UPDATE__FLAGS}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const getLogs = (callback, payload) => {
  let queryString = `?startDate=${payload.startDate}&endDate=${payload.endDate}&userId=${payload.userId}`;
  const url = `${API_CONSTANTS.Get_Logs + queryString}`;
  return fetchNoCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const GetAllsupervisordata = (callback, payload) => {
  const url = `${API_CONSTANTS.GET_ALL_SUPERVISOR}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const AddSupervisorDetailsbyId = (callback, payload) => {
  // let queryString = `?userId=${payload.userId}`;
  const url = `${API_CONSTANTS.UPDATE_SUPERVISOR_DETAILS_BY_ID}?`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const UpdateSupervisorDetailsbyId = (callback, payload, userId) => {
  // let queryString = `?userId=${payload.userId}`;
  const url = `${API_CONSTANTS.UPDATE_SUPERVISOR_DETAILS_BY_ID}?userId=${userId}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST,
    payload
  );
};

export const Getsupervisordetailsbyid = (callback, isUserId) => {
  const url = `${API_CONSTANTS.GET_SUPERVISOR_DETAILS_BY_ID}?supervisorId=${isUserId}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST
  );
};


export const CenterType = (callback, payload) => {
  const url = `${API_CONSTANTS.GET_CENTER_TYPE}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.GET,
    payload
  );
};

export const getSupervisorlist = (callback, payload) => {
  let queryString = `?supervisorId=${payload}`;
  const url = `${API_CONSTANTS.GET_SUPERVISOR_LIST + queryString}`;
  return fetchCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.GET
  );
};

export const GetExcel= (callback, isUserId) => {
  const url = `${API_CONSTANTS.GET_EXCEL}`;
  return fetchLoginCall(
    (response) => {
      callback(response);
    },
    url,
    API_METHODS.POST
  );
};

// export const Block_Supervisor = (callback, id, payload) => {
//   const url = `https://aek.fastark.in/api/Admin/BlockManagerById?id=${id}`;
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   })
//   .then(response => response.json())
//   .then(data => callback(data))
//   .catch(error => console.error('Error:', error));
// };

export const Block_Supervisor = (callback, userId, payload) => {
  const url = `${API_CONSTANTS.BLOCK_SUPERVISOR}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm5hbWVpZCI6IjYiLCJyb2xlcyI6IltcIkFkbWluXCJdIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzIzNTQ1ODc4LCJleHAiOjE3MjM1Njc0NzgsImlhdCI6MTcyMzU0NTg3OCwiaXNzIjoiaHR0cDovL3d3dy5ic25sLmNvbSIsImF1ZCI6Imh0dHA6Ly93d3cuYnNubC5jb20ifQ.FNoA8eFjKK29HV_MabsG9EAEGSVq_Xr2OHKmWxyJgTo`,
    },
    body: JSON.stringify(payload), // Stringify the payload
  })
  .then(response => response.json())
  .then(data => callback(data))
  .catch(error => console.error('Error:', error));
};

// export const Block_Supervisor= (callback, userId, payload) => {
//   const url = `${API_CONSTANTS.BLOCK_SUPERVISOR}`;
//   return fetchLoginCall(
//     (response) => {
//       callback(response);
//     },
//     url,
//     API_METHODS.POST
//   );
// };

