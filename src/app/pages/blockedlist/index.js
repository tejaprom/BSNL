import React, { useState, useEffect, forwardRef } from "react";
import "./index.scss";
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
import Logout from "../logout";
import { GetAllServiceAuth, UpdateFlags } from "../../utils/apicalls";
import Switch from "@mui/material/Switch";
import FileIntiatedPopUP from "../../components/filedeletepopup";
import Button from "../../components/button";

const BlockedList = (id, onCancel) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [keys, setKeys] = useState([]);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isPopUp, setisPopUp] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    getData();
  }, []);

  // const handleClickPopUp = (userId) => {
  //   const payload = {
  //     userId: userId
  //   }
  //   if (payload) {
  //     UpdateFlags((res) => {
  //       const { message, statusCode } = res;
  //       let val = res;
  //       // console.log(val.name);
  //       setEmployeeList(val);
  //       setisPopUp(true);
  //       if (statusCode === 200) {
  //         setIsShowLoader(false);
  //         setShowConfirmModal(true);
  //         setAlertText(message);
  //         getData();
  //         setisPopUp(true);
  //       } else {
  //         setAlertText(message);
  //       }
  //     }, payload)
  //   }
  // }

  const handleDelete = (id, isFixedInitiated, isBlocked) => {
    const payload = {
      id: id,
      isFixed: isFixedInitiated,
      isBlocked: isBlocked,
    };
    if (payload) {
      UpdateFlags((res) => {
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

  const getData = () => {
    GetAllServiceAuth((res) => {
      let values = res;
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
        if (columnNames[key] === "userName") {
          columns.push({ title: "Operator Name", field: columnNames[key] });
        } else if (columnNames[key] === "userIdentification") {
          columns.push({ title: "Operator Email", field: columnNames[key] });
        }
        if (columnNames[key] === "aadhaar") {
          columns.push({ title: "Aadhar No ", field: columnNames[key] });
        } else if (columnNames[key] === "uniqueId") {
          columns.push({ title: "Hard Disk Id", field: columnNames[key] });
        }
        if (columnNames[key] === "centerName") {
          columns.push({ title: "Center Name", field: columnNames[key] });
        } else if (columnNames[key] === "stationId") {
          columns.push({ title: "StationId", field: columnNames[key] });
        }
        if (columnNames[key] === "userId") {
          columns.push({ title: "UserId", field: columnNames[key] });
        } else if (columnNames[key] === "isFixInitiated") {
          columns.push({
            title: "Fixed",
            field: columnNames[key],
            render: (row) => (
              <div>
                <Switch
                  checked={row.isFixInitiated === true}
                  onClick={() => {
                    handleDelete(
                      row.id,
                      (row.isFixInitiated = !row.isFixInitiated),
                      row.isBlocked
                    );
                  }}
                  style={{ cursor: "pointer", paddingLeft: "10px" }}
                />
              </div>
            ),
          });
        }
        if (columnNames[key] === "isFileExists") {
          columns.push({ title: "File Deleted", field: columnNames[key] });
        } else if (columnNames[key] === "isBlocked") {
          columns.push({
            title: "Blocked.",
            field: columnNames[key],
            render: (row) => (
              <div>
                <Switch
                  checked={row.isBlocked === true}
                  onClick={() => {
                    handleDelete(
                      row.id,
                      row.isFixInitiated,
                      (row.isBlocked = !row.isBlocked)
                    );
                  }}
                  style={{ cursor: "pointer", paddingLeft: "10px" }}
                />
              </div>
            ),
          });
        }
      }
      setKeys(columns);
      setData(values);
      // }
    });
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

  return (
    <div>
      <div className="block">
        <div className="block-container">
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
                <li onClick={handleBlockedList}>
                  <a>Blocked List</a>
                </li>
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
              <h1>Blocked List</h1>
            </div>
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
            {/* <Pagination
                        data={data}
                        RenderComponent={data}
                        title='Posts'
                        pageLimit={5}
                        dataLimit={10}
                    /> */}
          </div>
          {/* <div className='pop'>
            <div className='pop__container'>
              <div className='pop__section'>
                <div className='pop__header'>
                  <h1>Are you sure you want to delete the file</h1>
                </div>
                <div className='pop__cancel-box' onClick={onCancel}>
                  <span className='overlay__dialog__title__cancelBackground__cross overlay__dialog__title__cancelBackground__right-arrow'></span>
                  <span className='overlay__dialog__title__cancelBackground__cross overlay__dialog__title__cancelBackground__left-arrow'></span>
                </div>
                <div className='pop__confirm'>
                  <Button buttonId={id} >OKAY</Button>
                  <Button buttonId={id} buttonClick={onCancel}>Cancel</Button>
                </div>
              </div>
            </div>
          </div> */}
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
      {/* {isPopUp ? (
        <FileIntiatedPopUP
          id=''
          isDropdown1Required={true}
          // onConfirm={handleConfirm}
          onCancel={() => { setisPopUp(false); }}
          commonTitle='Update Employee Details'
          input1Placeholder='Full Name'
          input1Value={employeeList?.name}
          isShowInput1={true}
          btnText='Submit' />
      ) :
        null
      } */}
      {isShowLoader ? <Loader /> : null}
    </div>
  );
};

export default BlockedList;
