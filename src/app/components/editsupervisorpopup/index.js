import React, { useEffect, useState } from "react";
import "./index.scss";

import {
  Getsupervisordetailsbyid,
  UpdateSupervisorDetailsbyId,
  AddSupervisorDetailsbyId,
  getCountriesList,
  editsupervisorbyid,
  getCityList,
  getStateList,
} from "../../utils/apicalls";
import Confirm from "../confirmModal/confirm";

const Editsupervisor = ({
  setIsdetailsVisible,
  isdetailsVisible,
  closePopup,
  isUserId,
  Editsupervisor,
}) => {
  const [response, setResponse] = useState({
    name: "",
    emailId: "",
    password: "",
    dob: "",
    genderId: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    aadharNumber: "",
    mobileNumber: "",
    pancardNumber: "",
  });
  const [selectedDropdown2, setSelectedDropdown2] = useState("");
  const [selectedDropdown3, setSelectedDropdown3] = useState("");
  const [selectedDropdown4, setSelectedDropdown4] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [genId, setGenId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState(1);
  const [selectedCityId, setSelectedCityId] = useState();
  const [alertText, setAlertText] = useState("");
  const [isConfirmmodal, setIsConfirmmodal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [details, setdetails] = useState();
  const [isPopUpDetails, setIsPopUpDetails] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [patchData, setPatchData] = useState({});
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    getDetailsById();
  }, [isUserId]);

  // useEffect(() => {
  //   getDetailsById();
  // }, [isUserId])

  // const editsupervisorbyid =()=>{
  //   if (isUserId !== undefined) {
  //     setIsShowLoader(true);
  //     Editsupervisor((res) => {
  //       const { message, statusCode } = res;
  //       if (statusCode === 200) {
  //         setIsShowLoader(false);
  //         setShowConfirmModal(true);
  //           setPatchData(res.data);
  //           setResponse(res.response)
  //       } else {
  //         setIsShowLoader(false);
  //         setShowConfirmModal(true);
  //         setAlertText(message);
  //       }
  //     }, isUserId);
  //   }
  // }
  const getDetailsById = () => {
    if (isUserId !== undefined) {
      Getsupervisordetailsbyid((res) => {
        const { message, statusCode } = res;
        let val = res;
        setIsPopUpDetails(true);
        if (statusCode === 200) {
          setIsShowLoader(false);
          setPatchData(val.data);
          setResponse(val.data);
          setGenId(val.data.genderId);
          setSelectedCityId(val.data.cityId);
          setSelectedStateId(val.data.stateId);
          setIsPopUpDetails(true);
        } else {
          setAlertText(message);
        }
      }, isUserId);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponse({
      ...response,
      [name]: value,
    });
  };

  useEffect(() => {
    getCountries("");
    // getStates('');
  }, []);

  useEffect(() => {
    getCities(selectedStateId);
  }, [selectedStateId]);

  const getCountries = () => {
    getCountriesList((res) => {
      setSelectedDropdown2(res);
      let value = res[0].id;
      if (value) {
        getStateList((res) => {
          setSelectedDropdown3(res);
        }, value);
      }
    });
  };

  // const getStateList=()=>{
  //   getStateList((res)=>{
  //     selectedDropdown3(res);
  //     let value = res[0].id;
  //     if (value){
  //       getCityList((res)=>{
  //         setSelectedDropdown4(res);
  //       },value)
  //     }
  //   })
  // }
  const getCities = (selectedStateId) => {
    if (selectedStateId) {
      getCityList((res) => {
        console.log(res);
        setSelectedDropdown4(res);
        setCityData(res);
      }, selectedStateId);
    }
  };
  const handleSubmit = (e) => {
    const payload = {
      emailId: response.emailId,
      userName: response.userName,
      password: response.password,
      aadharNumber: response.aadharNumber,
      mobile: response.mobile,
      pancardNumber: response.pancardNumber,
      genderId: response.genderId,
      countryId: selectedId,
      stateId: selectedStateId,
      cityId: selectedCityId,
      pincode: response.pincode,
      dateOfBirth: response.dateOfBirth,
      address: response.address,
    };
    console.log(payload);
    if (payload) {
      if (isUserId !== undefined)
        UpdateSupervisorDetailsbyId(
          (res) => {
            const { message, statusCode } = res;
            let val = res;
            setEmployeeList(val);
            setIsPopUpDetails(true);
            if (statusCode === 200) {
              setIsConfirmmodal(true);
              setIsShowLoader(false);
              setPatchData(val.data);
              setResponse(val.data);
              setIsPopUpDetails(true);

            } else {
              setAlertText(message);
            }
          },
          payload,
          isUserId
        );
    }
  };
  const handleClosePopup = () => {
    setIsConfirmmodal(false);
    closePopup();
  };
  const handleClosePopup1 = () => {
    setShowConfirmModal(false);
  };
  const handleChange1 = (e) => {
    const selectedValue = e.target.value;
    setSelectedId(selectedValue);
  };
  const handleChange2 = (e) => {
    const selectedStateId = e.target.value;
    setSelectedStateId(selectedStateId);
  };
  const handleChange3 = (e) => {
    const selectedCityId = e.target.value;
    setSelectedCityId(selectedCityId);
  };

  const dob = response.dateOfBirth ? response.dateOfBirth.split("T")[0] : "";

  return (
    <div className="supervisor-popup">
      <div
        className="supervisor-popup__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="supervisor-popup__header">
          <button
            className="supervisor-popup__header__button"
            onClick={handleClosePopup}
          >
            X
          </button>
        </div>
        <div className="supervisor-popup__main">
          <form onSubmit={handleSubmit}>
            <div className="field-row">
              <div className="field">
                <label>* Full Name:</label>
                <input
                  type="text"
                  name="userName"
                  value={response.userName}
                  required
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="field">
                <label>* Email:</label>
                <input
                  type="email"
                  name="emailId"
                  value={response.emailId}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
              <div className="field">
                <label>* Password:</label>
                <input
                  type="text"
                  name="password"
                  value={response.password}
                  required
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="field">
                <label>* Date of Birth:</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={dob}
                  required
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="field">
                <label>* Select Gender:</label>
                <select
                  type="text"
                  name="genderId"
                  required
                  onChange={handleChange3}
                  value={genId}
                >
                  <option value={10}>--Gender--</option>
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                </select>
              </div>
              <div className="field">
                <label>* Select Country:</label>
                <select
                  type="text"
                  name="country"
                  onChange={handleChange1}
                  placeholder="Country"
                  required
                  value={selectedDropdown2}
                >
                  {selectedDropdown2.length &&
                    selectedDropdown2.map((val, index) => {
                      return (
                        <option key={index} value={val.id}>
                          {val.countryName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="field">
                <label>* Select State:</label>
                <select
                  type="text"
                  name="state"
                  onChange={handleChange2}
                  required
                  value={selectedStateId}
                >
                  {selectedDropdown3.length &&
                    selectedDropdown3.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.stateName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="field">
                <label>* Select City:</label>
                <select
                  type="text"
                  name="city"
                  onChange={handleChange3}
                  required
                  value={selectedCityId}
                >
                   {selectedDropdown4.length &&
                    selectedDropdown4.map((val, index) => (
                      <option key={index} value={val.id}>
                        {val.cityName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="field">
                <label>* Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={response.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  required
                />
              </div>
              <div className="field">
                <label>* Address:</label>
                <textarea
                  name="address"
                  value={response.address}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                />
              </div>
              <div className="field">
                <label>* Pancard Number:</label>
                <input
                  type="text"
                  name="pancardNumber"
                  value={response.pancardNumber}
                  onChange={handleChange}
                  placeholder="Pancard Number"
                  required
                />
              </div>
              <div className="field">
                <label>* Aadhar Number:</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={response.aadharNumber}
                  onChange={handleChange}
                  placeholder="Aadhar Number"
                  required
                />
              </div>
              <div className="field">
                <label>* Mobile Number:</label>
                <input
                  type="text"
                  name="mobile"
                  value={response.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                />
              </div>
            </div>
            <div className="submit-button">
              <button onClick={handleSubmit} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {isConfirmmodal && (
        <Confirm
          buttonText={"ok"}
          isCancelRequired={false}
          confirmTitle={alertText}
          onConfirm={handleClosePopup}
          onCancel={handleClosePopup}
        />
      )}
      {showConfirmModal && (
        <Confirm
          buttonText={"OK"}
          isCancelRequired={false}
          confirmTitle={alertText}
          onConfirm={handleClosePopup1}
          onCancel={handleClosePopup1}
        />
      )}
    </div>
  );
};
export default Editsupervisor;
