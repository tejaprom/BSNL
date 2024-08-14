import React, { useState, useEffect, forwardRef } from 'react';
import './index.scss'
import MaterialTable from '@material-table/core';
import { useHistory } from 'react-router-dom';
// import { useHistory , useParams} from 'react-router-dom';
// import {useParams} from 'react-router'
import { getLogs } from '../../utils/apicalls';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import moment from 'moment';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import Logout from '../logout';
import logo from '../../../assets/images/Sahyogi-logo.png';
import DatePicker from "react-datepicker";
import $ from 'jquery';

const Logs = () => {
    const history = useHistory();
    // const params = useParams();
    const [data, setData] = useState([]);
    const [keys, setKeys] = useState([]);
    const [userIdC, setUserIdC] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        getData();
        // getUserId();
    }, []);

    // console.log(userIdC)

    const ddd = window.location.href;
    // console.log(ddd);
    // console.log(ddd.substring(ddd.lastIndexOf('/') + 1));

    const handleFilter = () => {
        const payload = {
            startDate: startDate,
            endDate: endDate,
            userId: ddd.substring(ddd.lastIndexOf('/') + 1)
        }
        console.log(payload)
        if (payload) {
            getData();
            //     getLogs((res) => {
            // //         console.log(res);
            //     })
        }
    }

    const handleClear = () => {
        window.location.reload();
    }

    const getData = () => {
        const payload = {
            startDate: startDate,
            endDate: endDate,
            userId: ddd.substring(ddd.lastIndexOf('/') + 1)
        }
        if (payload) {
            getLogs((res) => {
                const { message, statusCode, data } = res;
                let values = res?.data;
                if (values?.length == 0) {
                    const columns = [];
                    let columnNames = [];
                    setKeys(columns);
                    setData(values); 
                }

                values.forEach((val) => {
                    if (val.createdDate) {
                        let momont = moment.utc(val?.createdDate).format('DD-MM-yyyy , HH:mm');
                        val.createdDate = momont;
                    }
                });
                values.forEach((values, index) => { values.serial = index + 1; });
                const columns = [];
                let columnNames = [];

                columnNames = Object.keys(values[0]);
                for (const key in columnNames) {
                    if (columnNames[key] === 'email') {
                        columns.push({ title: 'Sl No.', field: 'serial' });
                    }
                    else if (columnNames[key] === 'createdDate') {
                        columns.push({ title: 'Logs', field: columnNames[key] });
                    }
                }
                setKeys(columns);
                setData(values);

            }, payload)
        }
    }




    const handleEmployeeList = () => {
        history.push('/employee-list');
        window.location.reload();
    }

    const handleBlockedList = () => {
        history.push('/blocked-list');
        window.location.reload();
    }

    const handleHome = () => {
        history.push('/home');
        window.location.reload();
    }

    const handleAddEmployeePage = () => {
        history.push('/add-employee');
        window.location.reload();
    }


    const tableIcons = {
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const handleTitleChange = (ev) => setStartDate(ev.target.value);
    const handleTitleChange1 = (ev) => setEndDate(ev.target.value);


    return (
        <div>
            <div className='employee-details1'>
                <div className='employee-sidebar'>
                    <div className='employee-header'>
                        <img src={logo} alt='' />
                        <p className='line'></p>
                    </div>
                    <div className='employee-links'>
                        <ul>
                            <li onClick={handleEmployeeList}><a>Employee Details</a></li>
                            <li onClick={handleBlockedList}><a>Blocked List</a></li>
                            <li onClick={handleHome}><a>Operators OTP's</a></li>
                            <li onClick={handleAddEmployeePage}><a>Add Employee</a></li>
                            <Logout />
                        </ul>
                    </div>
                </div>
                <div className='employee-data login-data'>
                    <div className='employee-data-header'>
                        <h1>Employee Login details</h1>
                    </div>
                    <div className='login-data__filter'>
                        <div className='login-data__filter__container'>
                            <div className='login-data__dates'>
                                <div className='login-data__start-date'>
                                    <h2>Start Date :</h2>
                                    <input type='date' placeholder='Select Date' value={startDate || ""} className='login-data__date' max={moment().format("YYYY-MM-DD")}
                                        onChange={handleTitleChange} isInvalid={!startDate} />
                                </div>
                                <div className='login-data__start-date'>
                                    <h2> End Date :</h2>
                                    <input placeholder='End Date' type='date' value={endDate || ""} className='login-data__date' max={moment().format("YYYY-MM-DD")}
                                        onChange={handleTitleChange1} isInvalid={!endDate} />
                                </div>
                            </div>
                            <div className='login-data__buttons'>
                                <button className='login-data__button' onClick={() => handleFilter()}>Apply Filter</button>
                                <button className='login-data__button' onClick={() => handleClear()}>Clear</button>
                            </div>
                        </div>
                    </div>
                    {/* <DatePicker 
                        // onSelect={handleDateSelect} //when day is clicked
                        onChange={setStartDate} />
                    <DatePicker 
                        // onSelect={handleDateSelect} //when day is clicked
                        onChange={setEndDate} /> */}
                    <MaterialTable
                        icons={tableIcons}
                        data={data}
                        columns={keys}
                        options={{
                            filtering: false, sorting: true, showTitle: false, paging: true,
                            pageSize: 10,
                            emptyRowsWhenPaging: false,
                            pageSizeOptions: [5, 10, 20, 50, 100],
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Logs;