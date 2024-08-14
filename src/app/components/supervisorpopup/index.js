import React, { useEffect, useState } from "react";
import "./index.scss";
import {
  UpdateSupervisorDetailsbyId,
  AddSupervisorDetailsbyId,
  getCountriesList,
  getCityList,
  getStateList,
} from "../../utils/apicalls";
import Confirm from "../confirmModal/confirm";

const Supervisorpopup = ({ setIsPopupVisible, isPopupVisible, closePopup, isUserId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    aadharNumber: "",
    mobileNumber: "",
    pancardNumber: "",
  });
  const [selectedDropdown1, setSelectedDropdown1] = useState("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id:formData.id,
      userName: formData.name,
      emailId: formData.email,
      password: formData.password,
      aadharNumber: formData.aadharNumber,
      mobile: formData.mobileNumber,
      pancardNumber: formData.pancardNumber,
      genderId: genId,
      countryId: 1,
      stateId: selectedId,
      cityId: selectedCityId,
      pincode: formData.pincode,
      dateOfBirth: formData.dob,
      address: formData.address,
    };
    if (userId === null) {
      AddSupervisorDetailsbyId((res) => {
       
        if (res.statusCode === 200) {
          setIsConfirmmodal(true);
          setShowConfirmModal(false);
          console.log(res.message);
          setAlertText(res?.message);
        } else {
          setIsConfirmmodal(false);
          setShowConfirmModal(true);
          console.log(res.message);
          setAlertText(res?.message);
        }
      }, payload);
    } else {
      UpdateSupervisorDetailsbyId(
        (res) => {
          if (res.statusCode === 200) {
            setIsConfirmmodal(true);
            setShowConfirmModal(false);
            console.log(res.message);
            setAlertText(res?.message);
          } else {
            setIsConfirmmodal(false);
            setShowConfirmModal(true);
            console.log(res.message);
            setAlertText(res?.message);
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
    const selectedValue = e.target.value;
    setSelectedCityId(selectedValue);
  };
  const handleChange3 = (e) => {
    const selectedValue = e.target.value;
    setGenId(selectedValue);
  };

  console.log(selectedCityId, "selectedCityId");

  return (
    <div className="supervisor-popup">
      <div className="supervisor-popup__container" onClick={(e)=> e.stopPropagation()}>
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
                  name="name"
                  value={formData.name}
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
                  value={formData.email}
                  required
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
              <div className="field">
                <label>* Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="field">
                <label>* Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  required
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="field">
                <label>* Select Gender:</label>
                <select
                  type="text"
                  name="gender"
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
                  onChange={handleChange1}
                  required
                  value={selectedId}
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
                  onChange={handleChange2}
                  required
                  value={selectedCityId}
                >
                  {selectedDropdown4.length &&
                    selectedDropdown4.map((val, index) => {
                      return (
                        <option key={index} value={val.id}>
                          {val.cityName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="field">
                <label>* Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  required
                />
              </div>
              <div className="field">
                <label>* Address:</label>
                <textarea
                  name="address"
                  value={formData.address}
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
                  value={formData.pancardNumber}
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
                  value={formData.aadharNumber}
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
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                />
              </div>
            </div>
            <div className="submit-button">
              <button type="submit">Submit</button>
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
export default Supervisorpopup;
