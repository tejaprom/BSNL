import React, { useState, useEffect, forwardRef } from "react";
import "./index.scss";
import { GetAllOTP } from "../../utils/apicalls";
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
import Logout from "../logout";

const Home = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  // const [isShowLoader, setIsShowLoader] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  var today = moment().format("M/D/YYYY");
  console.log(today);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    GetAllOTP((res) => {
      // const { message, statusCode, data } = res;
      // if (statusCode == 200) {
      let values = res;
      // values.forEach((val) => {
      //     [val.operatorName, val.userOtp, val.operatorEmail]
      // })
      values.forEach((val) => {
        if (val.otpCreatedDate) {
          //   let momont = moment(val?.otpCreatedDate).format("DD/MM/YYYY");
          // let moment = require("moment-timezone");
          // let momont = moment
          //   .utc(val.otpCreatedDate)
          //   .tz("Asia/Kolkata")
          //   .format("YYYY-MM-DD hh:mm:ss A");
          // val.otpCreatedDate = momont;

          const dateString = val.otpCreatedDate;
          const date = new Date(dateString);

          const formatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          };

          const formattedDate = date.toLocaleDateString("en-US", formatOptions);

          const formatTimeOptions = {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "UTC",
          };

          const formattedTime = date.toLocaleTimeString(
            "en-US",
            formatTimeOptions
          );

          const formattedDateTime = `${formattedDate}, ${formattedTime}`;
          val.otpCreatedDate = formattedDateTime;
          console.log(formattedTime);
        }
      });
      values.forEach((val) => {
        if (val.otpUpdatedDate) {
          // let momont = moment(val?.otpUpdatedDate).format('DD/MM/YYYY');

          // const dateWithTime = new Date(val?.otpUpdatedDate);
          // console.log(dateWithTime)

          let moment = require("moment-timezone");

          //   let utcDate = "2023-05-03T11:19:05Z";
          let istDate = moment
            .utc(val.otpUpdatedDate)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm:ss");
          //   val.otpUpdatedDate = dateWithTime;
        }
      });
      values.forEach((values, index) => {
        values.serial = index + 1;
      });
      const columns = [];
      let columnNames = [];

      columnNames = Object.keys(values[0]);
      for (const key in columnNames) {
        if (columnNames[key] === "id") {
          columns.push({ title: "No.", field: "serial" });
        } else if (columnNames[key] === "operatorName") {
          columns.push({ title: "Operator Name", field: columnNames[key] });
        }
        if (columnNames[key] === "centerName") {
          columns.push({ title: "Center Name", field: columnNames[key] });
        } else if (columnNames[key] === "stationId") {
          columns.push({ title: "StationId", field: columnNames[key] });
        }
        if (columnNames[key] === "userOtp") {
          columns.push({ title: "OTP", field: columnNames[key] });
        } else if (columnNames[key] === "operatorEmail") {
          columns.push({
            title: "Operator E-mail / Aadhar No.",
            field: columnNames[key],
          });
        }

        if (columnNames[key] === "ssaName") {
          columns.push({ title: "SSA Name", field: columnNames[key] });
        } else if (columnNames[key] === "ssaName") {
          columns.push({
            title: "SSA Name",
            field: columnNames[key],
          });
        }

        if (columnNames[key] === "userId") {
          columns.push({ title: "User Id", field: columnNames[key] });
        } else if (columnNames[key] === "userId") {
          columns.push({
            title: "userId",
            field: columnNames[key],
          });
        }

        if (columnNames[key] === "otpCreatedDate") {
          columns.push({
            title: "OTP Generated Date",
            field: columnNames[key],
          });
        }
        // else if (columnNames[key] === 'otpUpdatedDate') {
        //     columns.push({ title: 'Updated Date', field: columnNames[key] });
        // }
      }
      setKeys(columns);
      setData(values);
      // }
    });
  };

  const handleEmployee = () => {
    history.push("/employee-list");
    window.location.reload();
  };

  const handleRefresh = () => {
    window.location.reload();
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
      <div className="employee-details ">
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
            <h1>Operator's OTP's</h1>
            <h2>Date:{today}</h2>
            <button onClick={handleRefresh} className="employee-refresh">
              Refresh
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default Home;
