/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import {
  getCountriesList,
  getStateList,
  getCityList,
  GetAllEmployeeDetailsbyId,
  CenterType,
  getSupervisorlist,
} from "../../utils/apicalls";
import Button from "../../components/button/index";
import Confirm from "../../components/confirmModal/confirm";
import Loader from "../../components/loader";
import moment from "moment";
import Select from "react-select";
import { useStaticState } from "@material-ui/pickers";

const EditEmployeePopUp = ({
  id,
  onCancel,
  onConfirm,
  commonTitle,
  input1Value,
  input2Value,
  input3Value,
  input4Value,
  input5Value,
  input6Value,
  input7Value,
  input8Value,
  input13Value,
  input14Value,
  input15Value,
  input17Value,
  input18Value,
  input19Value,
  input21Value,
  input22Value,
  input23Value,

  isShowInput1,
  isShowInput2,
  isShowInput3,
  isShowInput4,
  isShowInput5,
  isShowInput6,
  isShowInput7,
  isShowInput8,
  isShowInput13,
  isShowInput14,
  isShowInput15,
  isShowInput17,
  isShowInput18,
  isShowInput19,
  isShowInput21,
  isShowInput22,
  isShowInput23,

  input1Placeholder,
  input2Placeholder,
  input3Placeholder,
  input4Placeholder,
  input5Placeholder,
  input6Placeholder,
  input7Placeholder,
  input8Placeholder,
  input13Placeholder,
  input14Placeholder,
  input15Placeholder,
  input17Placeholder,
  input18Placeholder,
  input19Placeholder,
  input21Placeholder,
  input22Placeholder,
  input23Placeholder,

  isDropdown1Required,
  dropdown1Placeholder,
  dropdown1List,
  isDropdown2Required,
  dropdown2Placeholder,
  dropdown2List,
  isDropdown3Required,
  dropdown3Placeholder,
  dropdown3List,
  isDropdown4Required,
  dropdown4Placeholder,
  dropdown4List,

  isDropdown5Required,
  dropdown5Placeholder,
  dropdown5List,
  isDropdown6Required,
  dropdown6Placeholder,
  dropdown6List,

  updateSelectedDropDown1Value,
  updateSelectedDropDown2Value,
  updateSelectedDropDown3Value,
  updateSelectedDropDown4Value,
  updateSelectedDropDown5Value,
  updateSelectedDropDown6Value,

  btnText,
  isInput1Required,
  isInput2Required,
  isInput3Required,
  isInput4Required,
  isInput5Required,
  isInput6Required,
  isInput7Required,
  isInput8Required,
  isInput13Required,
  isInput14Required,
  isInput15Required,
  isInput17Required,
  isInput18Required,
  isInput19Required,
  isInput21Required,
  isInput22Required,
  isInput23Required,

  userId,
}) => {
  const [text1, setText1] = useState(input1Value ?? "");
  const [text2, setText2] = useState(input2Value ?? "");
  const [text3, setText3] = useState(input3Value ?? "");
  const [text4, setText4] = useState(input4Value ?? "");
  const [text5, setText5] = useState(input5Value ?? "");
  const [text6, setText6] = useState(input6Value ?? "");
  const [text7, setText7] = useState(input7Value ?? "");
  const [text8, setText8] = useState(input8Value ?? "");
  const [text13, setText13] = useState(input13Value ?? "");
  const [text14, setText14] = useState(input14Value ?? "");
  const [text15, setText15] = useState(input15Value ?? "");
  // const [text17, setText17] = useState(input17Value ?? "");
  const [text18, setText18] = useState(input18Value ?? "");
  // const [text19, setText19] = useState(input19Value ?? "");
  const [text21, setText21] = useState(input21Value ?? "");
  const [text22, setText22] = useState(input22Value ?? "");
  const [text23, setText23] = useState(input23Value ?? "");

  const [centers, setCenters] = useState("");

  const [dropdown1Items] = useState(dropdown1List ?? []);
  const [dropdown2Items] = useState(dropdown2List ?? []);
  const [dropdown3Items] = useState(dropdown3List ?? []);
  const [dropdown4Items] = useState(dropdown4List ?? []);
  const [dropdown5Items] = useState(dropdown5List ?? []);
  const [dropdown6Items] = useState(dropdown6List ?? []);

  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [selectedDropdown1Value, setSelectedDropdown1Value] = useState("");
  const [selectedDropdown2Value, setSelectedDropdown2Value] = useState("");
  const [selectedDropdown3Value, setSelectedDropdown3Value] = useState("");
  const [selectedDropdown4Value, setSelectedDropdown4Value] = useState("");
  const [selectedDropdown5Value, setSelectedDropdown5Value] = useState("");
  const [selectedDropdown6Value, setSelectedDropdown6Value] = useState("");

  const [dropdownList1, setDropdownList1] = useState("");
  const [dropdownList2, setDropdownList2] = useState("");
  const [dropdownList3, setDropdownList3] = useState("");
  const [dropdownList4, setDropdownList4] = useState("");
  const [dropdownList5, setDropdownList5] = useState("");
  const [dropdownList6, setDropdownList6] = useState("");

  const [isUserId, setIsUserId] = useState(userId ?? null);
  const [employeeList, setEmployeeList] = useState([]);

  console.log(selectedDropdown3Value, selectedDropdown2Value);
console.log(text15)

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getCities(selectedDropdown3Value);
  }, [selectedDropdown3Value]);

  const getCountries = () => {
    getCountriesList((res) => {
      setDropdownList2(res);
      let value = res[0].id;
      if (value) {
        getStateList((res) => {
          setDropdownList3(res);
        }, value);
      }
    });
  };

  useEffect(() => {
    GetcenterType("");
  }, []);

  useEffect(() => {
    getSupervisor();
  }, []);

  const GetcenterType = () => {
    CenterType((res) => {
      setDropdownList5(res);
    });
  };

  const getSupervisor = () => {
    getSupervisorlist((res) => {
      setDropdownList6(res);
    });
  };

  const getCities = (val) => {
    if (val) {
      getCityList((res) => {
        setDropdownList4(res);
      }, val);
    }
  };

  const handleClick = (e) => {
    if (e?.target.id === "dialog-target") {
      onCancel();
    }
    return;
  };

  const handleConfirm = (event) => {
    if (isShowInput1 ? (text1 ? true : false) : true) {
      setIsBtnDisabled(false);
      let obj = {
        text1: text1,
        text2: text2,
        text3: text3,
        text4: text4,
        text5: text5,
        text6: text6,
        text7: text7,
        text8: text8,
        text13: text13,
        text14: text14,
        text15: text15,
        // text17: text17,
        text18: text18,
        // text19: text19,
        text21: text21,
        text22: text22,
        text23: text23,

        selectedDropdown1Value: selectedDropdown1Value,
        selectedDropdown2Value: selectedDropdown2Value,
        selectedDropdown3Value: selectedDropdown3Value,
        selectedDropdown4Value: selectedDropdown4Value,
        selectedDropdown5Value: selectedDropdown5Value,
        selectedDropdown6Value: selectedDropdown6Value,
      };
      onConfirm(event?.target.id, obj);
    } else {
      setIsBtnDisabled(true);
    }
  };

  useEffect(() => {
    getAllEmployeeDetailsbyId();
  }, []);

  const getAllEmployeeDetailsbyId = () => {
    const payload = {
      userId: isUserId,
    };

    GetAllEmployeeDetailsbyId((res) => {
      setEmployeeList(res);
    }, payload);
  };

  const handleValueChange = (event, key, index) => {
    let val = event?.target.value;
    let file;
    setIsBtnDisabled(true);
    if (key === 1) {
      setText1(val);
    } else if (key === 2) {
      setText2(val);
    } else if (key === 3) {
      setText3(val);
    } else if (key === 4) {
      setSelectedDropdown1Value(val);
    } else if (key === 5) {
      setSelectedDropdown2Value(val);
    } else if (key === 6) {
      setSelectedDropdown3Value(val);
    } else if (key === 23) {
      setSelectedDropdown6Value(val);
    } else if (key === 7) {
      setSelectedDropdown4Value(val);
    } else if (key === 8) {
      setText4(val);
    } else if (key === 9) {
      setText5(val);
    } else if (key === 10) {
      setText6(val);
    } else if (key === 11) {
      setText7(val);
    } else if (key === 12) {
      setText8(val);
    } else if (key === 13) {
      setText13(val);
    } else if (key === 14) {
      setText14(val);
    } else if (key === 15) {
      setText15(val);
    }
    // else if (key === 17) {
    //   setText17(val);
    // }
    else if (key === 18) {
      setText18(val);
    }
    // else if (key === 19) {
    //   setText19(val);
    // }
    else if (key === 20) {
      setSelectedDropdown5Value(val);
    } else if (key === 21) {
      setText21(val);
    } else if (key === 22) {
      setText22(val);
    }
    if (text1) {
      setIsBtnDisabled(false);
    }
  };

  const options = [
    { value: dropdown1Items[0].id, label: dropdown1Items[0].genderType },
    { value: dropdown1Items[1].id, label: dropdown1Items[1].genderType },
  ];

  const option = [
    { value: dropdown5Items[0].id, label: dropdown5Items[0].centerType },
    { value: dropdown5Items[1].id, label: dropdown5Items[1].centerType },
  ];
  return (
    <div className="overlay" id="dialog-target" onClick={handleClick}>
      <div className="overlay__dialog">
        <div className="overlay__dialog__title">
          <p className="overlay__dialog__title__description">{commonTitle}</p>
          <div
            className="overlay__dialog__title__cancelBackground__cancel-box"
            onClick={onCancel}
          >
            <span className="overlay__dialog__title__cancelBackground__cross overlay__dialog__title__cancelBackground__right-arrow"></span>
            <span className="overlay__dialog__title__cancelBackground__cross overlay__dialog__title__cancelBackground__left-arrow"></span>
          </div>
        </div>
        <div className="overlay__dialog__elements">
          {isShowInput1 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput1Required ? "* " : "") + input1Placeholder}
              </p>
              <input
                type="text"
                value={text1}
                placeholder={!text1 ? input1Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 1);
                }}
                onChange={(event) => {
                  handleValueChange(event, 1);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isShowInput18 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                * {input18Placeholder}
              </p>
              <input
                type="text"
                value={text18}
                placeholder={!text18 ? input18Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 18);
                }}
                onChange={(event) => {
                  handleValueChange(event, 18);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isShowInput6 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                * {input6Placeholder}
              </p>
              <input
                type="text"
                value={text6}
                placeholder={!text6 ? input6Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 10);
                }}
                onChange={(event) => {
                  handleValueChange(event, 10);
                }}
                className="overlay__dialog__elements__customInput"
                maxLength={12}
              ></input>
            </div>
          ) : null}
          {isDropdown5Required ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput3Required ? "* " : "") + dropdown5Placeholder}
              </p>
              <select
                name="gender"
                className="country-dropdown"
                onChange={(event) => {
                  handleValueChange(event, 20);
                }}
                value={selectedDropdown5Value}
                // placeholder={"dropown1Placeholder"}
              >
                <option value={10}>{updateSelectedDropDown5Value}</option>

                {dropdownList5.length &&
                  dropdownList5.map((val, index) => {
                    return (
                      <option key={index} value={val.centerTypeId}>
                        {val.centerType}
                      </option>
                    );
                  })}
              </select>
            </div>
          ) : null}
          {isShowInput7 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                * {input7Placeholder}
              </p>
              <input
                type="text"
                value={text7}
                placeholder={!text7 ? input7Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 11);
                }}
                onChange={(event) => {
                  handleValueChange(event, 11);
                }}
                className="overlay__dialog__elements__customInput"
                maxLength={10}
              ></input>
            </div>
          ) : null}
          {isShowInput8 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                * {input8Placeholder}
              </p>
              <input
                type="text"
                value={text8}
                placeholder={!text8 ? input8Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 12);
                }}
                onChange={(event) => {
                  handleValueChange(event, 12);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isShowInput3 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput3Required ? "* " : "") + input3Placeholder}
              </p>
              <input
                type="date"
                value={moment(text3).format("YYYY-MM-DD")} // Format the date here
                // placeholder=
                //     {text3
                //         ? moment(text3).format('DD/MM/YYYY')
                //         : ''}
                onKeyUp={(event) => {
                  handleValueChange(event, 3);
                }}
                onChange={(event) => {
                  handleValueChange(event, 3);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isDropdown1Required ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput3Required ? "* " : "") + dropdown1Placeholder}
              </p>
              <select
                name="gender"
                className="country-dropdown"
                onChange={(event) => {
                  handleValueChange(event, 4);
                }}
                value={selectedDropdown1Value}
                // placeholder={"dropown1Placeholder"}
              >
                <option value={10}>{updateSelectedDropDown1Value}</option>
                <option value={1}>Male</option>
                <option value={0}>Female</option>
              </select>
            </div>
          ) : null}
          {isShowInput2 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput2Required ? "* " : "") + input2Placeholder}
              </p>
              <input
                type="text"
                value={text2}
                placeholder={!text2 ? input2Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 2);
                }}
                onChange={(event) => {
                  handleValueChange(event, 2);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isDropdown2Required ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput3Required ? "* " : "") + dropdown2Placeholder}
              </p>
              <select
                name="Countries"
                className="country-dropdown"
                onChange={(e) => {
                  handleValueChange(e, 5);
                }}
                value={selectedDropdown2Value}
                placeholder="Select Country"
              >
                <option value="--Select--">
                  {updateSelectedDropDown2Value}
                </option>
                {dropdown2Items.map((val, index) => {
                  return (
                    <option key={index} value={val?.id}>
                      {" "}
                      {val.countryName}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {isShowInput13 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                * {input13Placeholder}
              </p>
              <input
                type="text"
                value={text13}
                placeholder={!text13 ? input13Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 13);
                }}
                onChange={(event) => {
                  handleValueChange(event, 13);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isDropdown3Required ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput3Required ? "* " : "") + dropdown3Placeholder}
              </p>
              <select
                name="Countries"
                className="country-dropdown"
                onChange={(e) => {
                  handleValueChange(e, 6);
                }}
                value={selectedDropdown3Value}
                placeholder="Select State"
              >
                <option value="--Select--">
                  {updateSelectedDropDown3Value}
                </option>
                {dropdown3Items.map((val, index) => {
                  return (
                    <option key={index} value={val?.id}>
                      {val.stateName}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {isShowInput14 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                * {input14Placeholder}
              </p>
              <input
                type="text"
                value={text14}
                placeholder={!text14 ? input14Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 14);
                }}
                onChange={(event) => {
                  handleValueChange(event, 14);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isDropdown4Required ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput3Required ? "* " : "") + dropdown4Placeholder}
              </p>
              <select
                name="Countries"
                className="country-dropdown"
                onChange={(e) => {
                  handleValueChange(e, 7);
                }}
                value={selectedDropdown4Value}
                placeholder="Select City"
              >
                <option value="--Select--">
                  {updateSelectedDropDown4Value}
                </option>
                {dropdownList4.length &&
                  dropdownList4.map((val, index) => {
                    return (
                      <option key={val.id} value={val?.id}>
                        {" "}
                        {val.cityName}
                      </option>
                    );
                  })}
              </select>
            </div>
          ) : null}
          {isShowInput15 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                * {input15Placeholder}
              </p>
              <input
                type="text"
                value={text15}
                placeholder={!text15 ? input15Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 15);
                }}
                onChange={(event) => {
                  handleValueChange(event, 15);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isShowInput4 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput4Required ? "* " : "") + input4Placeholder}
              </p>
              <input
                type="text"
                value={text4}
                placeholder={!text4 ? input4Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 8);
                }}
                onChange={(event) => {
                  handleValueChange(event, 8);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isShowInput22 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                * {input22Placeholder}
              </p>
              <input
                type="text"
                value={text22}
                placeholder={!text22 ? input22Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 22);
                }}
                onChange={(event) => {
                  handleValueChange(event, 22);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isShowInput5 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput5Required ? "* " : "") + input5Placeholder}
              </p>
              <input
                type="text"
                disabled
                value={text5}
                placeholder={!text5 ? input5Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 9);
                }}
                onChange={(event) => {
                  handleValueChange(event, 9);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isShowInput21 ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                * {input21Placeholder}
              </p>
              <input
                type="text"
                value={text21}
                placeholder={!text21 ? input21Placeholder : undefined}
                onKeyUp={(event) => {
                  handleValueChange(event, 21);
                }}
                onChange={(event) => {
                  handleValueChange(event, 21);
                }}
                className="overlay__dialog__elements__customInput"
              ></input>
            </div>
          ) : null}
          {isDropdown6Required ? (
            <div className="overlay__dialog__elements__input">
              <p className="overlay__dialog__elements__label">
                {(isInput3Required ? "* " : "") + dropdown6Placeholder}
              </p>
              <select
                name="Countries"
                className="country-dropdown"
                onChange={(e) => {
                  handleValueChange(e, 23);
                }}
                value={selectedDropdown6Value}
                placeholder="Select Supervisor"
              >
                <option value="--Select--">
                  {updateSelectedDropDown6Value}
                </option>
                {dropdownList6.length &&
                  dropdownList6.map((val, index) => {
                    return (
                      <option key={index} value={val.supervisorId}>
                        {val.supervisorName}
                      </option>
                    );
                  })}
              </select>
            </div>
          ) : null}
        </div>
        <div className="overlay__dialog__footer u_display_flex u_align_items ">
          <Button
            buttonId={id}
            isBtnDisabled={isBtnDisabled}
            className="overlay__dialog__footer__confirm"
            buttonClick={handleConfirm}
          >
            {btnText}
          </Button>
        </div>
      </div>
    </div>
  );
};

EditEmployeePopUp.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  commonTitle: PropTypes.string,
  input1Value: PropTypes.string,
  input2Value: PropTypes.string,
  input3Value: PropTypes.string,
  input4Value: PropTypes.number,
  input5Value: PropTypes.string,
  input6Value: PropTypes.number,
  input7Value: PropTypes.number,
  input8Value: PropTypes.string,
  input13Value: PropTypes.string,
  input14Value: PropTypes.string,
  input15Value: PropTypes.string,
  input17Value: PropTypes.string,
  input18Value: PropTypes.string,
  input19Value: PropTypes.string,
  input21Value: PropTypes.string,
  input22Value: PropTypes.string,
  input23Value: PropTypes.string,

  dropdown1List: PropTypes.array,
  dropdown2List: PropTypes.array,
  dropdown3List: PropTypes.array,
  dropdownList: PropTypes.array,
  isShowInput1: PropTypes.bool,
  isShowInput2: PropTypes.bool,
  isShowInput3: PropTypes.bool,
  isShowInput4: PropTypes.bool,
  isShowInput5: PropTypes.bool,
  isShowInput6: PropTypes.bool,
  isShowInput7: PropTypes.bool,
  isShowInput8: PropTypes.bool,
  isShowInput13: PropTypes.bool,
  isShowInput14: PropTypes.bool,
  isShowInput15: PropTypes.bool,
  isShowInput17: PropTypes.bool,
  isShowInput18: PropTypes.bool,
  isShowInput19: PropTypes.bool,
  isShowInput21: PropTypes.bool,
  isShowInput22: PropTypes.bool,
  isShowInput23: PropTypes.bool,

  // isShowInput12: PropTypes.bool,

  isDropdown1Required: PropTypes.bool,
  isDropdown2Required: PropTypes.bool,
  isDropdown3Required: PropTypes.bool,
  isDropdown4Required: PropTypes.bool,
  isDropdown5Required: PropTypes.bool,
  isDropdown6Required: PropTypes.bool,

  isSearchDropdown: PropTypes.bool,
  input1Placeholder: PropTypes.string,
  input2Placeholder: PropTypes.string,
  input3Placeholder: PropTypes.string,
  input4Placeholder: PropTypes.string,
  input5Placeholder: PropTypes.string,
  input6Placeholder: PropTypes.string,
  input7Placeholder: PropTypes.string,
  input8Placeholder: PropTypes.string,
  input13Placeholder: PropTypes.string,
  input14Placeholder: PropTypes.string,
  input15placeholder: PropTypes.string,
  input17placeholder: PropTypes.string,
  input18placeholder: PropTypes.string,
  input19placeholder: PropTypes.string,
  input21placeholder: PropTypes.string,
  input22placeholder: PropTypes.string,
  input23placeholder: PropTypes.string,

  dropdown1Placeholder: PropTypes.string,
  updateSelectedDropDown1Value: PropTypes.number,
  dropdown2Placeholder: PropTypes.string,
  updateSelectedDropDown2Value: PropTypes.number,
  dropdown3Placeholder: PropTypes.string,
  updateSelectedDropDown3Value: PropTypes.number,
  dropdown4Placeholder: PropTypes.string,
  updateSelectedDropDown4Value: PropTypes.number,
  dropdown5Placeholder: PropTypes.string,
  updateSelectedDropDown5Value: PropTypes.number,
  dropdown6Placeholder: PropTypes.string,
  updateSelectedDropDown6Value: PropTypes.number,
  btnText: PropTypes.string,
  isInput1Required: PropTypes.bool,
  isInput2Required: PropTypes.bool,
  isInput3Required: PropTypes.bool,
  isInput4Required: PropTypes.bool,
  isInput5Required: PropTypes.bool,
  isInput6Required: PropTypes.bool,
  isInput7Required: PropTypes.bool,
  isInput8Required: PropTypes.bool,
  isInput13Required: PropTypes.bool,
  isInput14Required: PropTypes.bool,
  isInput15Required: PropTypes.bool,
  isInput17Required: PropTypes.bool,
  isInput18Required: PropTypes.bool,
  isInput21Required: PropTypes.bool,
  isInput22Required: PropTypes.bool,
  isInput23Required: PropTypes.bool,

  // isInput19Required: PropTypes.bool,
  // isInput22Required: PropTypes.bool,
};

EditEmployeePopUp.defaultProps = {
  onCancel: () => {},
  onConfirm: () => {},
  commonTitle: "",
  input1Value: "",
  input2Value: "",
  input3Value: "",
  input4Value: "",
  input5Value: "",
  input6Value: "",
  input7Value: "",
  input8Value: "",
  input13Value: "",
  input14Value: "",
  input15Value: "",
  input17Value: "",
  input18Value: "",
  input21Value: "",
  input21Value: "",
  input23Value: "",

  // input19Value: "",
  // input22Value: "",

  isShowInput1: false,
  isShowInput2: false,
  isShowInput3: false,
  isShowInput4: false,
  isShowInput5: false,
  isShowInput6: false,
  isShowInput7: false,
  isShowInput8: false,
  isShowInput13: false,
  isShowInput14: false,
  isShowInput15: false,
  isShowInput17: false,
  isShowInput18: false,
  isShowInput19: false,
  isShowInput23: false,

  isDropdown1Required: false,
  isDropdown2Required: false,
  isDropdown3Required: false,
  isDropdown4Required: false,
  isDropdown5Required: false,
  isDropdown6Required: false,

  input1Placeholder: "",
  input2Placeholder: "",
  input3Placeholder: "",
  input4Placeholder: "",
  input5Placeholder: "",
  input6Placeholder: "",
  input7Placeholder: "",
  input8Placeholder: "",
  input13Placeholder: "",
  input14Placeholder: "",
  input15Placeholder: "",
  input17Placeholder: "",
  input18Placeholder: "",
  input19Placeholder: "",
  input21Placeholder: "",
  input22Placeholder: "",
  input23Placeholder: "",

  dropdown1Placeholder: "",
  updateSelectedDropDown1Value: null,
  dropdown1List: [],
  dropdown2Placeholder: "",
  updateSelectedDropDown2Value: null,
  dropdown2List: [],
  dropdown3Placeholder: "",
  updateSelectedDropDown3Value: null,
  dropdown3List: [],
  dropdown4Placeholder: "",
  updateSelectedDropDown4Value: null,
  dropdown4List: [],
  dropdown5Placeholder: "",
  updateSelectedDropDown5Value: null,
  dropdown5List: [],
  dropdown6Placeholder: "",
  updateSelectedDropDown6Value: null,
  dropdown6List: [],
  btnText: "",
  isInput1Required: true,
  isInput2Required: true,
  isInput3Required: true,
  isInput4Required: true,
  isInput5Required: true,
  isInput6Required: true,
  isInput7Required: true,
  isInput8Required: true,
  isInput13Required: true,
  isInput14Required: true,
  isInput15Required: true,
  isInput17Required: true,
  isInput18Required: true,
  isInput19Required: true,
  isInput23Required: true,
};

export default React.memo(EditEmployeePopUp);
