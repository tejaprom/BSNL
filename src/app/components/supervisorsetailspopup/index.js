import React, { useEffect, useState } from "react";
import "./index.scss";

import {
  Getsupervisordetailsbyid,
  UpdateSupervisorDetailsbyId,
  AddSupervisorDetailsbyId,
  getCountriesList,
  getCityList,
  getStateList,
} from "../../utils/apicalls";
import Confirm from "../confirmModal/confirm";

const Supervisordetailspopup = ({
  setIsdetailsVisible,
  isdetailsVisible,
  closePopup,
  isUserId,
}) => {
  const [response, setResponse] = useState({});
  const [selectedDropdown2, setSelectedDropdown2] = useState("");
  const [selectedDropdown3, setSelectedDropdown3] = useState("");
  const [selectedDropdown4, setSelectedDropdown4] = useState("");

  const [selectedId, setSelectedId] = useState("1");
  const [genId, setGenId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("1");
  const [alertText, setAlertText] = useState("");
  const [isConfirmmodal, setIsConfirmmodal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [details, setdetails] = useState();
  const [isPopUpDetails, setIsPopUpDetails] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [patchData, setPatchData] = useState({});

  useEffect(() => {
    getDetailsById();
  }, [isUserId]);

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
          setIsPopUpDetails(true);
        } else {
          setAlertText(message);
        }
      }, isUserId);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatchData({
      ...patchData,
      [name]: value,
    });
  };

  useEffect(() => {
    getCountries("");
    // getStates('');
  }, []);

  useEffect(() => {
    getCities(selectedId);
  }, [selectedId]);

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

  const getCities = (selectedId) => {
    if (selectedId) {
      getCityList((res) => {
        setSelectedDropdown4(res);
      }, selectedId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    const selectedValue = e.target.value;
    setSelectedCityId(selectedValue);
  };
  const handleChange3 = (e) => {
    const selectedValue = e.target.value;
    setGenId(selectedValue);
  };

  
  const dob = response.dateOfBirth ? response.dateOfBirth.split("T")[0] : '';

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
                <label>* Full Name :</label>
                <input
                  type="text"
                  name="name"
                  value={response ? response.userName : ""}
                  required
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="field">
                <label>* Email:</label>
                <input
                  type="email"
                  name="email"
                  value={response ? response.emailId : ""}
                  required
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
              <div className="field">
                <label>* Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={dob}
                  required
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="field">
                <label>* Select Gender:</label>
                <input
                  type="text"
                  name="gender"
                  required
                  onChange={handleChange3}
                  value={response.genderId === 0 ? "female" : "male"}
                >
                </input>
              </div>
              <div className="field">
                <label>* Select Country:</label>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange1}
                  placeholder="Country"
                  required
                  value={response.country}
                >  
                </input>
              </div>
              <div className="field">
                <label>* Select State:</label>
                <input
                  type="text"
                  name="state"
                  onChange={handleChange1}
                  required
                  value={response.state                  }
                >
                </input>
              </div>
              <div className="field">
                <label>* Select City:</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange2}
                  required
                  value={response.city}
                >
                </input>
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
                  value={patchData.aadharNumber}
                  onChange={handleChange}
                  placeholder="Aadhar Number"
                  required
                />
              </div>
              <div className="field">
                <label>* Mobile Number:</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={patchData.mobile
                  }
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {isConfirmmodal && (
        <Confirm
          buttonText={"OK"}
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
export default Supervisordetailspopup;
