import React, { useState, useEffect, forwardRef } from "react";
import "./index.scss";
import { saveAs } from 'file-saver';
import {
  GetAllEmployeeDetails,
  VerifyUser,
  DeleteEmployee,
  EditEmployee,
  getCityList,
  getStateList,
  getCountriesList,
  GetAllEmployeeDetailsbyId,
  GenderMaster,
  getLogs,
  getLogOut,
  getSupervisorlist,
  CenterType,
  GetExcel
} from "../../utils/apicalls";
import MaterialTable from "@material-table/core";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import moment from "moment";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import logo from "../../../assets/images/Sahyogi-logo.png";
import { useHistory } from "react-router-dom";
import Confirm from "../../components/confirmModal/confirm";
import Loader from "../../components/loader";
import Switch from "@mui/material/Switch";
import Logout from "../logout";
import EditEmployeePopUp from "../../components/editemployeepopup";
import EmployeeDetailsPopUp from "../../components/employeedetailspopup";

const EmployeeList = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [keys, setKeys] = useState([]);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmModalLogout, setShowConfirmModalLogout] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isAddRightMenu, setisAddRightMenu] = useState(false);
  const [isPopUpDetails, setIsPopUpDetails] = useState(false);
  const [isLogsDetails, setIsLogsDetails] = useState(false);
  const [employeeLogs, setEmployeeLogs] = useState([]);
  const [dropdownList1, setDropdownList1] = useState("");
  const [dropdownList2, setDropdownList2] = useState("");
  const [dropdownList3, setDropdownList3] = useState("");
  const [dropdownList4, setDropdownList4] = useState("");
  const [dropdownList5, setDropdownList5] = useState("");
  const [dropdownList6, setDropdownList6] = useState("");
  const [dropdownList7, setDropdownList7] = useState(0);

  const [supervisor, setSupervisor] = useState("");

  // const [selectedDropdown6Value, setSelectedDropdown6Value] = useState("");
  // console.log(dropdownList7, "dropdownList7");
  const userData = JSON.parse(localStorage.getItem("userData"));
  // localStorage.setItem("userData", data);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    getCountries("");
    getGenderMaster("");
    GetcenterType("");
  }, []);

  useEffect(() => {
    getData();
  }, [dropdownList7]);

  useEffect(() => {
    getSupervisor();
    
  }, []);

  const getSupervisor = () => {
    getSupervisorlist((res) => {
      setSupervisor(res);
    });
  };

  useEffect(() => {
    getCities(employeeList.stateId);
  }, [employeeList.stateId]);

  const handleActive = (userId, isActive) => {
    const payload = {
      userId: userId,
      isActive: isActive,
    };
    if (payload) {
      VerifyUser((res) => {
        const { message, statusCode } = res;
        if (statusCode === 200) {
          setIsShowLoader(false);
          setShowConfirmModal(true);
          setAlertText(message);
          getData();
        }
      }, payload);
    }
  };

  const handleDelete = (userId) => {
    const payload = {
      userId: userId,
    };
    if (payload) {
      DeleteEmployee((res) => {
        const { message, statusCode } = res;
        if (statusCode === 200) {
          setIsShowLoader(false);
          setShowConfirmModal(true);
          setAlertText(message);
          getData();
        } else {
          setAlertText(message);
        }
      }, payload);
    }
  };

  const getGenderMaster = () => {
    GenderMaster((res) => {
      setDropdownList1(res);
    });
  };

  const GetcenterType = () => {
    CenterType((res) => {
      setDropdownList5(res);
    });
  };

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

  const getCities = (val) => {
    if (val) {
      getCityList((res) => {
        setDropdownList4(res);
      }, val);
    }
  };
  // const [genderData, setGenderData] = useState([])
  const handleClickPopUp = (userId) => {
    setUserId(userId);
    const payload = {
      userId: userId,
    };
    if (payload) {
      GetAllEmployeeDetailsbyId((res) => {
        const { message, statusCode, data } = res;
        let val = res;
        // setGenderData(data?.genderId)
        setEmployeeList(val);
        setisAddRightMenu(true);
        if (statusCode === 200) {
          setIsShowLoader(false);
          setShowConfirmModal(true);
          setAlertText(message);
          getData();
          setisAddRightMenu(true);
        } else {
          setAlertText(message);
        }
      }, payload);
    }
  };

  // console.log(genderData, "genderData")

  const handlePopUpClick = (userId) => {
    const payload = {
      userId: userId,
    };
    if (payload) {
      GetAllEmployeeDetailsbyId((res) => {
        const { message, statusCode } = res;
        let val = res;
        setEmployeeList(val);
        setIsPopUpDetails(true);
        if (statusCode === 200) {
          setIsShowLoader(false);
          setShowConfirmModal(true);
          setAlertText(message);
          getData();
          setIsPopUpDetails(true);
        } else {
          setAlertText(message);
        }
      }, payload);
    }
  };

  const handleClickLogOut = (userId) => {
    setUserId(userId);
    setShowConfirmModalLogout(true);
  };

  const handleConfirmLogout = () => {
    const payload = {
      userId: userId,
    };
    getLogOut((res) => {
      const { message, statusCode } = res;
      if (statusCode === 200) {
        setShowConfirmModalLogout(false);
        setIsShowLoader(false);
        setShowConfirmModal(true);
        setAlertText(message);
        getData();
      } else {
        setAlertText(message);
      }
    }, payload);
  };

  const handleClickPopup = (userId) => {
    history.push(`/logs/${userId}`);
    window.location.reload();
  };

  function LoadOnce() {
    window.location.reload();
  }

  const getData = () => {
    const payload = {
      supervisorId: dropdownList7,
    };
    GetAllEmployeeDetails((res) => {
      if (res.length === 0) {
        setData([]);
      }
      let values = res;
      console.log(values.length === 0, "true");
      values.forEach((val) => {
        if (val.createdDate) {
          let momont = moment(val?.createdDate).format("DD/MM/YYYY");
          val.createdDate = momont;
        }
      });
      // values.forEach((values, index) => { values.serial = index + 1; });
      const columns = [];
      let columnNames = [];

      columnNames = Object.keys(values[0]);
      for (const key in columnNames) {
        if (columnNames[key] === "name") {
          columns.push({ title: "Operator Name", field: columnNames[key] });
        } else if (columnNames[key] === "isDeleted") {
          columns.push({
            title: "Status",
            field: columnNames[key],
            render: (row) => (
              <div>
                {row?.isDeleted === true ? (
                  <div>
                    <p style={{ color: "red" }}>Disabled</p>
                  </div>
                ) : (
                  <p style={{ color: "green" }}>Enabled</p>
                )}
              </div>
            ),
          });
        }
        if (columnNames[key] === "emailId") {
          columns.push({ title: "Operator Email", field: columnNames[key] });
        }
        if (columnNames[key] === "emailId") {
          columns.push({ title: "Operator Email", field: columnNames[key] });
        } else if (columnNames[key] === "mobileNumber") {
          columns.push({ title: "Mobile No.", field: columnNames[key] });
        }
        if (columnNames[key] === "employeeUserId") {
          columns.push({ title: "User Id", field: columnNames[key] });
        } else if (columnNames[key] === "centerName") {
          columns.push({ title: "Center Name", field: columnNames[key] });
        }
        if (columnNames[key] === "stationId") {
          columns.push({ title: "Station Id", field: columnNames[key] });
        } else if (columnNames[key] === "aadharNumber") {
          columns.push({ title: "Aadhar No.", field: columnNames[key] });
        }
        if (columnNames[key] === "pancardNumber") {
          // columns.push({ title: 'Pancard No.', field: columnNames[key] });
          columns.push({
            title: "Login",
            field: columnNames[key],
            render: (row) => (
              <div style={{ cursor: "pointer" }}>
                <button
                  className="logs"
                  onClick={() => handleClickPopup(row.id)}
                >
                  Logs
                </button>
              </div>
            ),
          });
        } else if (columnNames[key] === "isVerified") {
          columns.push({
            title: "Actions",
            field: columnNames[key],
            render: (row) => (
              <div>
                {row?.isVerified === null ? (
                  <div>
                    <i
                      onClick={() => {
                        handleActive(row.id, row.isActive === false);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "green",
                        padding: " 0 5px",
                      }}
                      className="fa fa-check"
                    ></i>
                    <i
                      onClick={() => {
                        handleActive(row.id, row.isActive === true);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        padding: " 0 5px",
                      }}
                      className="fa fa-times"
                    ></i>
                  </div>
                ) : (
                  <Switch
                    checked={row.isDeleted === false}
                    onClick={() => {
                      handleDelete(row.id, row.isDeleted === false);
                    }}
                    style={{ cursor: "pointer", paddingLeft: "10px" }}
                  />
                )}
              </div>
            ),
          });
        }
        if (columnNames[key] === "isVerified") {
          columns.push({
            title: "Edit",
            field: columnNames[key],
            render: (row) => (
              <div style={{ cursor: "pointer" }}>
                <i
                  onClick={() => handleClickPopUp(row.id)}
                  className="fa fa-pencil"
                />
              </div>
            ),
          });
        }
        if (columnNames[key] === "isVerified") {
          columns.push({
            title: "Logout",
            field: columnNames[key],
            render: (row) => (
              <div style={{ cursor: "pointer" }}>
                <i
                  onClick={() => handleClickLogOut(row.id)}
                  className="fa fa-arrow-right"
                />
              </div>
            ),
          });
        }

        if (columnNames[key] === "dateOfBirth") {
          columns.push({
            title: "Details",
            field: columnNames[key],
            render: (row) => (
              <div style={{ cursor: "pointer" }}>
                <i
                  onClick={() => handlePopUpClick(row.id)}
                  className="fa fa-eye"
                  style={{
                    cursor: "pointer",
                    color: "#1976d2",
                    fontSize: "20px",
                  }}
                />
              </div>
            ),
          });
        }
      }
      setKeys(columns);

      setData(values);
      // }
    }, payload);
  };

  const handleConfirm = (id, obj) => {
    if (obj) {
      let payload = {
        userId: userId,
        name: obj.text1,
        email: obj.text2,
        dateOfBirth: obj.text3,
        genderId: parseInt(obj.selectedDropdown1Value)
          ? parseInt(obj.selectedDropdown1Value)
          : employeeList?.genderId ?? null,
        countryId: 1,
        stateId: parseInt(obj.selectedDropdown3Value)
          ? parseInt(obj.selectedDropdown3Value)
          : employeeList.stateId,
        cityId: parseInt(obj.selectedDropdown4Value)
          ? parseInt(obj.selectedDropdown4Value)
          : employeeList.cityId,
        pincode: parseInt(obj.text4),
        address: obj.text5,
        aadharNumber: parseInt(obj.text6),
        mobileNumber: parseInt(obj.text7),
        pancardNumber: obj.text8,
        stationId: obj.text14,
        missionId: obj.text13,
        ssaName: obj.text21,
        centerName: obj.text18,
        aadharCertificateNumber: obj.text22,
        supervisorId: parseInt(obj.selectedDropdown6Value)
          ? parseInt(obj.selectedDropdown6Value)
          : employeeList.supervisorId,
        centerTypeId: parseInt(obj.selectedDropdown5Value)
          ? parseInt(obj.selectedDropdown5Value)
          : employeeList.centerTypeId,
          employeeUserId: obj.text15,
      };
      if (payload) {
        setIsShowLoader(true);
        EditEmployee((res) => {
          const { message, statusCode } = res;
          if (statusCode === 200) {
            setIsShowLoader(false);
            setShowConfirmModal(true);
            setAlertText(message);
            getData();
          } else {
            setIsShowLoader(false);
            setShowConfirmModal(true);
            setAlertText(message);
          }
        }, payload);
      }
    } else {
      let payload = {
        userId: employeeList.userId,
        name: obj.text1,
        email: obj.text2,
        dateOfBirth: obj.text3,
        genderId: parseInt(obj.selectedDropdown1Value)
          ? parseInt(obj.selectedDropdown1Value)
          : employeeList?.genderId,
        countryId: 1,
        stateId: obj.selectedDropdown3Value,
        cityId: obj.selectedDropdown4Value,
        pincode: parseInt(obj.text4),
        address: obj.text5,
        aadharNumber: parseInt(obj.text6),
        mobileNumber: parseInt(obj.text7),
        pancardNumber: obj.text8,
        stationId: obj.text14,
        missionId: obj.text13,
        ssaName: obj.text21,
        centerName: obj.text18,
        aadharCertificateNumber: obj.text22,
        // supervisorId: obj.selectedDropdown6Value !== 0 ? employeeList.supervisorId : null,
        supervisorId: obj.selectedDropdown6Value,
        centerTypeId: obj.selectedDropdown5Value,
        // centerTypeId: obj.selectedDropdown5Value !== 0 ? employeeList.centerTypeId : null,
        employeeUserId: obj.text15,

      };
      if (payload) {
        setIsShowLoader(true);
        EditEmployee((res) => {
          const { message, statusCode } = res;
          if (statusCode === 200) {
            setIsShowLoader(false);
            setShowConfirmModal(true);
            setAlertText(message);
            getData();
          } else {
            setIsShowLoader(false);
            setShowConfirmModal(true);
            setAlertText(message);
          }
        }, payload);
      }
    }

    setisAddRightMenu(false);
  };

  const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
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

  const getsupervisorexcel = () => {
    GetExcel((res) => {
      if(res?.statusCode === 200) {
      setSupervisor(res?.data);
      console.log(res?.data);
      downloadExcel(res?.data);
      window.location.reload();
      }
    });
  };

  const downloadExcel = (data) => {
    // Base64 data
    const base64Data = data; // Your base64 data

    // Decode base64 data
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Trigger the download
    saveAs(blob, 'example.xlsx');
  };


  return (
    <div>
      <div className="employee-details1">
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
        <div className="employee-data">
          <div className="employee-data-header">
            <h1>Employee List</h1>
          </div>
          {userData?.roles[0] !== "Supervisor" && (
            <div className="employee-data-main">
              <button onClick={getsupervisorexcel}>Download Excel</button>
              <h1>supervisor :&nbsp;</h1>
              <div className="employee-data-search">
                <select
                  type="text"
                  className="form--select"
                  placeholder="Buyer/Seller"
                  onChange={(e) => {
                    setDropdownList7(e.target.value);
                  }}
                  value={dropdownList7}
                >
                  <option value={0}>Please Select</option>
                  {supervisor.length &&
                    supervisor.map((val, index) => {
                      return (
                        <option key={index} value={val.supervisorId}>
                          {val.supervisorName}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          )}
          <MaterialTable
            icons={tableIcons}
            data={data}
            columns={keys}
            options={{
              filtering: false,
              sorting: true,
              showTitle: false,
              paging: true,
              pageSize: 10,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [5, 10, 20, 50, 100],
            }}
          />
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
      {showConfirmModalLogout && (
        <Confirm
          buttonText={"OK"}
          isCancelRequired={true}
          confirmTitle={"Confirm to log out from all the devices?"}
          onConfirm={() => {
            handleConfirmLogout();
          }}
          onCancel={() => {
            setShowConfirmModalLogout(false);
          }}
        />
      )}
      {isAddRightMenu ? (
        <EditEmployeePopUp
          userId={userId}
          id=""
          isDropdown1Required={true}
          isDropdown2Required={true}
          isDropdown3Required={true}
          isDropdown4Required={true}
          isDropdown5Required={true}
          isDropdown6Required={true}
          dropdown1Placeholder="Select Gender"
          dropdown2Placeholder="Select Country"
          dropdown3Placeholder="Select State"
          dropdown4Placeholder="Select City"
          dropdown5Placeholder="Select Center Type"
          dropdown6Placeholder="Select Supervisor"
          updateSelectedDropDown1Value={
            employeeList?.genderId === 0 ? "Male" : "Female"
          }
          updateSelectedDropDown2Value={employeeList?.countryName}
          updateSelectedDropDown3Value={employeeList?.stateName}
          updateSelectedDropDown4Value={employeeList?.cityName}
          updateSelectedDropDown6Value={employeeList?.supervisorName}
          updateSelectedDropDown5Value={employeeList?.centerType}
          selectedDropdown1Value={employeeList?.genderId}
          selectedDropdown2Value={employeeList?.countryId}
          selectedDropdown3Value={employeeList?.stateId}
          selectedDropdown4Value={employeeList?.cityId}
          selectedDropdown5Value={employeeList?.centerTypeId}
          selectedDropdown6Value={employeeList?.supervisorId}
          dropdown1List={dropdownList1}
          dropdown2List={dropdownList2}
          dropdown3List={dropdownList3}
          dropdown4List={dropdownList4}
          dropdown5List={dropdownList5}
          dropdown6List={dropdownList6}
          onConfirm={handleConfirm}
          onCancel={() => {
            setisAddRightMenu(false);
          }}
          commonTitle="Update Employee Details"
          input1Placeholder="Full Name"
          input2Placeholder="Email"
          input3Placeholder="Date of Birth"
          input4Placeholder="Pincode"
          input5Placeholder="Address"
          input6Placeholder="Aadhar Number"
          input7Placeholder="Mobile Number"
          input8Placeholder="Pancard Number"
          input13Placeholder="Machine Id"
          input14Placeholder="Station Id"
          input15Placeholder="User Id"
          // input17Placeholder="SSA Name"
          input16Placeholder=" Center Type"
          input18Placeholder="Center Name"
          // input19Placeholder="Aadhar Certification Number"
          input21Placeholder="SSA Name"
          input22Placeholder="Aadhar Certification Number"
          input23Placeholder="Supervisor"
          input1Value={employeeList?.name}
          input2Value={employeeList?.email}
          input3Value={
            employeeList?.dateOfBirth
              ? moment(employeeList?.dateOfBirth).format("YYYY/MM/DD")
              : ""
          }
          input4Value={employeeList?.pincode}
          input5Value={employeeList?.address}
          input6Value={employeeList?.aadharNumber}
          input13Value={employeeList?.missionId}
          input14Value={employeeList?.stationId}
          input15Value={employeeList?.employeeUserId}
          input16Value={employeeList?.ssaName}
          input17Value={employeeList?.centerTypeId}
          input18Value={employeeList?.centerName}
          input7Value={employeeList?.mobileNumber}
          input8Value={employeeList?.pancardNumber}
          input21Value={employeeList?.ssaName}
          input22Value={employeeList?.aadharCertificateNumber}
          input23Value={employeeList?.supervisorId}
          isShowInput1={true}
          isShowInput2={true}
          isShowInput3={true}
          isShowInput4={true}
          isShowInput5={true}
          isShowInput6={true}
          isShowInput7={true}
          isShowInput8={true}
          isShowInput13={true}
          isShowInput14={true}
          isShowInput15={true}
          isShowInput16={true}
          isShowInput17={true}
          isShowInput18={true}
          isShowInput19={true}
          isShowInput21={true}
          isShowInput22={true}
          isShowInput23={true}
          // input4Placeholder='isPrimary'
          btnText="Submit"
        />
      ) : null}
      {isPopUpDetails ? (
        <EmployeeDetailsPopUp
          id=""
          userId={employeeList.userId}
          isDropdown1Required={true}
          isDropdown2Required={true}
          isDropdown3Required={true}
          isDropdown4Required={true}
          isDropdown5Required={true}
          isDropdown6Required={true}
          onConfirm={handleConfirm}
          onCancel={() => {
            setIsPopUpDetails(false);
          }}
          commonTitle="Employee Details"
          input1Placeholder="Full Name "
          input2Placeholder="Email "
          input3Placeholder="Date of Birth"
          input4Placeholder="Pincode"
          input5Placeholder="Address"
          input6Placeholder="Aadhar Number"
          input7Placeholder="Mobile Number"
          input8Placeholder="Pancard Number"
          input9Placeholder="Gender"
          input10Placeholder="Country"
          input11Placeholder="State"
          input12Placeholder="City"
          input13Placeholder="Machine Id"
          input14Placeholder="Station Id"
          input15Placeholder="User Id"
          // input16Placeholder="SSA Name"
          input17Placeholder=" Center Type"
          input18Placeholder="Center Name"
          input22Placeholder="Aadhar Certification Number"
          input21Placeholder="SSA Name"
          input23Placeholder="Supervisor"
          input1Value={employeeList?.name}
          input2Value={employeeList?.email}
          input3Value={
            employeeList?.dateOfBirth
              ? moment(employeeList?.dateOfBirth).format("DD/MM/YYYY")
              : ""
          }
          input4Value={employeeList?.pincode}
          input5Value={employeeList?.address}
          input6Value={employeeList?.aadharNumber}
          input7Value={employeeList?.mobileNumber}
          input8Value={employeeList?.pancardNumber}
          input9Value={employeeList?.genderName}
          input10Value={employeeList?.countryName}
          input11Value={employeeList?.stateName}
          input12Value={employeeList?.cityName}
          input13Value={employeeList?.missionId}
          input14Value={employeeList?.stationId}
          input15Value={employeeList?.employeeUserId}
          input16Value={employeeList?.ssaName}
          input17Value={employeeList?.centerType}
          input18Value={employeeList?.centerName}
          input21Value={employeeList?.ssaName}
          input22Value={employeeList?.aadharCertificateNumber}
          input23Value={employeeList?.supervisorName}
          isShowInput1={true}
          isShowInput2={true}
          isShowInput3={true}
          isShowInput4={true}
          isShowInput5={true}
          isShowInput6={true}
          isShowInput7={true}
          isShowInput8={true}
          isShowInput9={true}
          isShowInput10={true}
          isShowInput11={true}
          isShowInput12={true}
          isShowInput13={true}
          isShowInput14={true}
          isShowInput15={true}
          isShowInput16={true}
          isShowInput17={true}
          isShowInput18={true}
          isShowInput19={true}
          isShowInput21={true}
          isShowInput22={true}
          isShowInput23={true}
          btnText="Submit"
        />
      ) : null}
      {isShowLoader ? <Loader /> : null}
    </div>
  );
};

export default EmployeeList;
