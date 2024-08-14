import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  getCityList,
  getStateList,
  getCountriesList,
  AddEmployee,
  CenterType,
  getSupervisorlist,
} from "../../utils/apicalls";
import { useHistory } from "react-router-dom";
import { regex } from "../../constants/regex";
import Confirm from "../../components/confirmModal/confirm";
import Loader from "../../components/loader";
import logo from "../../../assets/images/Sahyogi-logo.png";
import Logout from "../logout";
// import '@coreui/coreui/dist/css/coreui.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//     CCol, CButton, CForm, CFormFeedback, CFormCheck, CInputGroup, CFormLabel, select, input, CInputGroupText,
// } from '@coreui/react'

const AddEmployeeN = () => {
  const history = useHistory();
  const [countries, setCountries] = useState("");
  const [states, setStates] = useState("");
  const [cities, setCities] = useState("");
  const [email, setEmail] = useState("");
  const [centers, setCenters] = useState([]);
  const [supervisor, setSupervisor] = useState([]);

  // const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState("");
  const [aadharnumber, setAadharNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [selectedDropdown1, setSelectedDropdown1] = useState("");
  const [selectedDropdown2, setSelectedDropdown2] = useState("");
  const [selectedDropdown3, setSelectedDropdown3] = useState("");
  const [selectedDropdown4, setSelectedDropdown4] = useState("");
  const [selectedDropdown5, setSelectedDropdown5] = useState("");
  const [selectedDropdown6, setSelectedDropdown6] = useState("");

  const [aadharcertNumber, setAadharcertNumber] = useState("");
  const [centerName, setCenterName] = useState("");
  const [pincode, setPincode] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [missionId, setMissionId] = useState("");
  const [stationId, setStationId] = useState("");
  const [userId, setUserId] = useState("");
  const [ssaname, setSsaname] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  // const [validated, setValidated] = useState(false)
  // console.log(selectedDropdown2);
  // console.log(selectedDropdown4);
  console.log(centers);

  useEffect(() => {
    getCountries("");
    // getStates('');
  }, []);

  useEffect(() => {
    GetcenterType();
  }, []);

  useEffect(() => {
    getCities(selectedDropdown3);
  }, [selectedDropdown3]);

  useEffect(() => {
    getSupervisor();
  }, []);

  const GetcenterType = () => {
    CenterType((res) => {
      setCenters(res);
    });
  };

  const getCountries = () => {
    getCountriesList((res) => {
      setCountries(res);
      let value = res[0].id;
      if (value) {
        getStateList((res) => {
          setStates(res);
        }, value);
      }
    });
  };

  const getCities = (val) => {
    if (val) {
      getCityList((res) => {
        setCities(res);
      }, val);
    }
  };
  const getSupervisor = () => {
    getSupervisorlist((res) => {
      setSupervisor(res);
    });
  };

  const handleRegistration = (e) => {
    // const form = e.currentTarget
    // if (form.checkValidity() === false) {
    e.preventDefault();
    //     e.stopPropagation()
    // }
    const payload = {
      emailId: email,
      roleId: 2,
      name: fullname,
      aadharNumber: aadharnumber,
      mobile: mobileNumber,
      pancardNumber: panNumber,
      genderId: selectedDropdown1,
      countryId: 1,
      stateId: selectedDropdown3,
      cityId: selectedDropdown4,
      missionId: missionId,
      aadharCertificateNumber: aadharcertNumber,
      ssaName: ssaname,
      stationId: stationId,
      centerName: centerName,
      pincode: pincode,
      dateOfBirth: dob,
      address: address,
      isSelfRegister: true,
      centerTypeId: selectedDropdown5,
      supervisorId: selectedDropdown6,
      employeeUserId:userId,
    };
    if (validateEmail(email) && fullname) {
      // setIsBtnDisabled(false);
      // setIsShowLoader(true);
      if (payload)
        AddEmployee((response) => {
          const { message, statusCode } = response;
          if (statusCode === 200) {
            setIsBtnDisabled(false);
            setIsShowLoader(false);
            setShowConfirmModal(true);
            setTimeout(() => {
              history.push("/employee-list");
            }, 3000);
            setAlertText(message);
          } else {
            setShowConfirmModal(true);
            setIsBtnDisabled(false);
            setIsShowLoader(false);
            history.push("/add-employee");
            setAlertText("invalid Details");
          }
        }, payload);
    } else {
      setShowConfirmModal(true);
      setIsBtnDisabled(false);
      setIsShowLoader(false);
      history.push("/add-employee");
      setAlertText("invalid Details");
    }
  };

  const validateEmail = (Email) => {
    const emailRegex = regex.emailRegex;
    return emailRegex.test(Email);
  };

  // const validatemobile = (Mobile) => {
  //     const mobileRegex = regex.mobileRegex;
  //     return mobileRegex.test(Mobile);
  // };

  const validatePan = (Pan) => {
    const panRegex = regex.panRegex;
    return panRegex.test(Pan);
  };

  // const validateAadhar = (Aadhar) => {
  //     const aadharRegex = regex.aadharRegex;
  //     return aadharRegex.test(Aadhar);
  // };

  const inputHandler = (event, key) => {
    let val = event?.target.value;
    // setIsBtnDisabled(true);
    if (key === 1) {
      setEmail(val);
      // } else if (key === 2) {
      // setPassword(val);
    } else if (key === 3) {
      setFullname(val);
    } else if (key === 4) {
      setAadharNumber(val);
    } else if (key === 5) {
      setMobileNumber(val);
    } else if (key === 6) {
      setPanNumber(val);
    } else if (key === 7) {
      setSelectedDropdown1(val);
    } else if (key === 8) {
      setSelectedDropdown2(val);
    } else if (key === 9) {
      setSelectedDropdown3(val);
    } else if (key === 10) {
      setSelectedDropdown4(val);
    } else if (key === 11) {
      setPincode(val);
    } else if (key === 12) {
      setDob(val);
    } else if (key === 13) {
      setAddress(val);
    } else if (key === 14) {
      setMissionId(val);
    } else if (key === 15) {
      setStationId(val);
    } else if (key === 16) {
      setUserId(val);
    } else if (key === 17) {
      setSsaname(val);
    } else if (key === 18) {
      setSelectedDropdown5(val);
    } else if (key === 19) {
      setCenterName(val);
    } else if (key === 20) {
      setAadharcertNumber(val);
    } else if (key === 21) {
      setSelectedDropdown6(val);
    }
  };

  const handleEmployeeList = () => {
    history.push("/employee-list");
    window.location.reload();
  };

  const handleBlockedList = () => {
    history.push("/blocked-list");
    window.location.reload();
  };

  const handleHome = () => {
    history.push("/home");
    window.location.reload();
  };

  const handleAddEmployeePage = () => {
    history.push("/add-employee");
    window.location.reload();
  };
  const handleSupervisorPage = () => {
    history.push("/manage-supervisor");
    window.location.reload();
  };

  return (
    <div>
      <div className="container1">
        <div className="employee-sidebar">
          <div className="employee-header">
            <img src={logo} alt="" />
            <p className="line"></p>
          </div>
          <div className="employee-links">
            <ul>
              <li onClick={handleEmployeeList}>
                <a>Employee Details</a>
              </li>
              {userData?.roles[0] !== "Supervisor" && (
                <li onClick={handleBlockedList}>
                  <a>Blocked List</a>
                </li>
              )}
              <li onClick={handleHome}>
                <a>Operators OTP's</a>
              </li>
              <li onClick={handleAddEmployeePage}>
                <a>Add Employee</a>
              </li>
              {userData?.roles[0] !== "Supervisor" && (
                <li onClick={handleSupervisorPage}>
                  <a>Manage Supervisor</a>
                </li>
              )}
              <Logout />
            </ul>
          </div>
        </div>
        <div className="form-box2-add">
          <div className="header-form-add">
            <h4 className="text-primary text-center text-header">
              Employee Details
            </h4>
            <div className="image"></div>
          </div>
          <div className="body-form-add">
            <form>
              <div className="form-1-add">
                <div className="form-l-add">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 3);
                    }}
                  ></input>
                  <input
                    required
                    type="text"
                    placeholder="Aaadhar Number"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 4);
                    }}
                    minLength={12}
                    maxLength={12}
                  ></input>
                  <input
                    required
                    type="text"
                    placeholder="Contact Number"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 5);
                    }}
                    minLength={10}
                    maxLength={10}
                  ></input>
                  <input
                    required
                    type="date"
                    placeholder="Date Of Birth"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 12);
                    }}
                  ></input>
                  <input
                    required
                    type="text"
                    placeholder="Email id"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 1);
                    }}
                  ></input>
                  <input
                    required
                    type="text"
                    placeholder="Machine Id"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 14);
                    }}
                  ></input>
                  <input
                    required
                    type="text"
                    placeholder="Station Id"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 15);
                    }}
                    minLength={5}
                    maxLength={5}
                  ></input>
                  {/* <input required type='text' placeholder='Password' className='form--input'
                                        onChange={(e) => { inputHandler(e, 2) }}></input> */}
                  <input
                    type="text"
                    placeholder="User Id"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 16);
                    }}
                  ></input>
                  <input
                    required
                    type="text"
                    placeholder="Aaadhar Certificate Number"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 20);
                    }}
                  ></input>
                  <input
                    type="text"
                    placeholder="SSA Name"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 17);
                    }}
                  ></input>
                </div>
                <div className="form-r-add">
                  <input
                    required
                    type="text"
                    placeholder="Center Name"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 19);
                    }}
                  ></input>
                  <select
                    type="role"
                    className="form--select"
                    placeholder="Center Type"
                    onChange={(e) => {
                      inputHandler(e, 18);
                    }}
                    value={selectedDropdown5}
                  >
                    <option value={10}>Center Type</option>npm
                    <option value={0}>Camp</option>
                    <option value={1}>Permanent</option>
                    {/* {centers.length &&
                      centers.map((val, index) => {
                        return (
                          <option key={val.id} value={val.centerTypeId}>
                            {val.centerType}
                          </option>
                        );
                      })} */}
                  </select>
                  <input
                    type="text"
                    placeholder="Pan Card Number"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 6);
                    }}
                    minLength={10}
                    maxLength={10}
                  ></input>

                  <select
                    type="role"
                    className="form--select"
                    placeholder="Buyer/Seller"
                    onChange={(e) => {
                      inputHandler(e, 7);
                    }}
                    value={selectedDropdown1}
                  >
                    <option value={10}>--Gender--</option>
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                  </select>
                  <select
                    type="role"
                    className="form--select"
                    placeholder="Buyer/Seller"
                    onChange={(e) => {
                      inputHandler(e, 8);
                    }}
                    value={selectedDropdown2}
                  >
                    {countries.length &&
                      countries.map((val, index) => {
                        return (
                          <option key={val.id} value={val.id}>
                            {val.countryName}
                          </option>
                        );
                      })}
                  </select>
                  <select
                    type="role"
                    className="form--select"
                    placeholder="Buyer/Seller"
                    onChange={(e) => {
                      inputHandler(e, 9);
                    }}
                    value={selectedDropdown3}
                  >
                    {states.length &&
                      states.map((val, index) => {
                        return (
                          <option key={val.id} value={val.id}>
                            {val.stateName}
                          </option>
                        );
                      })}
                  </select>
                  <select
                    type="role"
                    className="form--select"
                    placeholder="Buyer/Seller"
                    onChange={(e) => {
                      inputHandler(e, 10);
                    }}
                    value={selectedDropdown4}
                  >
                    {cities.length &&
                      cities.map((val, index) => {
                        return (
                          <option key={val.id} value={val.id}>
                            {val.cityName}
                          </option>
                        );
                      })}
                  </select>

                  <input
                    required
                    type="text"
                    placeholder="Pin Code"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 11);
                    }}
                    minLength={6}
                    maxLength={6}
                  ></input>
                  <input
                    required
                    type="text"
                    placeholder="Address"
                    className="form--input"
                    onChange={(e) => {
                      inputHandler(e, 13);
                    }}
                  ></input>
                  <select
                    type="role"
                    className="form--select"
                    placeholder="Buyer/Seller"
                    onChange={(e) => {
                      inputHandler(e, 21);
                    }}
                    value={selectedDropdown6}
                  >
                    {supervisor.length &&
                      supervisor.map((val, index) => {
                        return (
                          <option key={val.id} value={val.supervisorId}>
                            {val.supervisorName}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <button
                isBtnDisabled={isBtnDisabled}
                onClick={(e) => {
                  handleRegistration(e);
                }}
                className="btn btn-secondary btn-block btn-submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <Confirm
          buttonText={"OK"}
          isCancelRequired={false}
          confirmTitle={alertText}
          onConfirm={() => {
            setShowConfirmModal(false);
          }}
          onCancel={() => {
            setShowConfirmModal(false);
          }}
        />
      )}
      {isShowLoader ? <Loader /> : null}
    </div>
  );
};

export default AddEmployeeN;
