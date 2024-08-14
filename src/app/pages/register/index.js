import React, { useState, useEffect } from 'react';
import './index.scss';
import { getCityList, getStateList, getCountriesList, Register } from '../../utils/apicalls';
import { useHistory } from 'react-router-dom';
import { regex } from '../../constants/regex';
import Confirm from '../../components/confirmModal/confirm';
import Loader from '../../components/loader';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const Registration = () => {
    const history = useHistory();
    const [countries, setCountries] = useState('');
    const [states, setStates] = useState('');
    const [cities, setCities] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [aadharnumber, setAadharNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [selectedDropdown1, setSelectedDropdown1] = useState('');
    const [selectedDropdown2, setSelectedDropdown2] = useState('');
    const [selectedDropdown3, setSelectedDropdown3] = useState('');
    const [selectedDropdown4, setSelectedDropdown4] = useState('');
    const [pincode, setPincode] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [isShowLoader, setIsShowLoader] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [selectedDate, handleDateChange] = useState(new Date());

    // console.log(selectedDropdown2);
    // console.log(selectedDropdown4);

    useEffect(() => {
        getCountries('');
        // getStates('');

    }, []);

    useEffect(() => {
        getCities(selectedDropdown3);
    }, [selectedDropdown3])




    const getCountries = () => {
        getCountriesList((res) => {
            setCountries(res);
            let value = res[0].id;
            if (value) {
                getStateList((res) => {
                    setStates(res);
                }, value)
            }
        });
    };

    const getCities = (val) => {
        if (val) {
            getCityList((res) => {
                setCities(res);
            }, val)
        }
    }

    const handleLogin = () => {
        history.push('/');
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        const payload = {
            emailId: email,
            password: password,
            roleId: 2,
            name: fullname,
            aadharNumber: aadharnumber,
            mobile: mobileNumber,
            pancardNumber: panNumber,
            genderId: selectedDropdown1,
            countryId: 1,
            stateId: selectedDropdown3,
            cityId: selectedDropdown4,
            pincode: pincode,
            dateOfBirth: dob,
            address: address,
            isSelfRegister: true,
        };
        if (validateEmail(email) && password && fullname) {
            // setIsBtnDisabled(false);
            // setIsShowLoader(true);
            if (payload)

                Register((response) => {
                    const { message, statusCode } = response;
                    if (statusCode === 200) {
                        setIsBtnDisabled(false);
                        setIsShowLoader(false);
                        setShowConfirmModal(true);
                        setTimeout(() => {
                            history.push('/');
                        }, 3000);
                        setAlertText(message);
                    } else {
                        setShowConfirmModal(true);
                        setIsBtnDisabled(false);
                        setIsShowLoader(false);
                        history.push('/register')
                        setAlertText('invalid Details');
                    }
                }, payload);
        }
    }

    const validateEmail = (Email) => {
        const emailRegex = regex.emailRegex;
        return emailRegex.test(Email);
    };


    const inputHandler = (event, key) => {
        let val = event?.target.value;
        // setIsBtnDisabled(true);
        if (key === 1) {
            setEmail(val);
        } else if (key === 2) {
            setPassword(val);
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
        }

    };



    return (
        <div>
            <div className='container'>
                <div className='form-box1'>
                    <div className='header-form'>
                        <h4 className='text-primary text-center'>Registration</h4>
                        <div className='image'>
                        </div>
                    </div>
                    <div className='body-form'>
                        <form>
                            <div className='form-1'>
                                <div className='form-l'>
                                    <input required type='text' placeholder='Email id' className='form-input'
                                        onChange={(e) => { inputHandler(e, 1) }}></input>
                                    <input required type='text' placeholder='Password' className='form-input'
                                        onChange={(e) => { inputHandler(e, 2) }}></input>
                                    <input required type='text' placeholder='Full Name' className='form-input'
                                        onChange={(e) => { inputHandler(e, 3) }}></input>
                                    <input required type='text' placeholder='Aaadhar Number' className='form-input'
                                        onChange={(e) => { inputHandler(e, 4) }} minLength={12} maxLength={12}></input>
                                    <input required type='text' placeholder='Contact Number' className='form-input'
                                        onChange={(e) => { inputHandler(e, 5) }} minLength={10} maxLength={10}></input>
                                    <input required type='text' placeholder='Pan Card Number' className='form-input'
                                        onChange={(e) => { inputHandler(e, 6) }} minLength={10} maxLength={10}></input>
                                    <select
                                        type='role'
                                        className='form-select'
                                        placeholder='Buyer/Seller'
                                        onChange={(e) => { inputHandler(e, 7) }}
                                        value={selectedDropdown1}>
                                        <option value={10}>--Gender--</option>
                                        <option value={0}>Male</option>
                                        <option value={1}>Female</option>
                                    </select>
                                </div>
                                <div className='form-r'>
                                    <select
                                        type='role'
                                        className='form-select'
                                        placeholder='Buyer/Seller'
                                        onChange={(e) => { inputHandler(e, 8) }}
                                        value={selectedDropdown2}>
                                        {countries.length && countries.map((val, index) => {
                                            return (
                                                <option key={val.id} value={val.id}>{val.countryName}</option>
                                            )
                                        })}
                                    </select>
                                    <select
                                        type='role'
                                        className='form-select'
                                        placeholder='Buyer/Seller'
                                        onChange={(e) => { inputHandler(e, 9) }}
                                        value={selectedDropdown3}>
                                        {states.length && states.map((val, index) => {
                                            return (
                                                <option key={val.id} value={val.id}>{val.stateName}</option>
                                            )
                                        })}
                                    </select>
                                    <select
                                        type='role'
                                        className='form-select'
                                        placeholder='Buyer/Seller'
                                        onChange={(e) => { inputHandler(e, 10) }}
                                        value={selectedDropdown4}>
                                        {cities.length && cities.map((val, index) => {
                                            return (
                                                <option key={val.id} value={val.id}>{val.cityName}</option>
                                            )
                                        })}
                                    </select>
                                    <input required type='text' placeholder='Pin Code' className='form-input'
                                        onChange={(e) => { inputHandler(e, 11) }} minLength={6} maxLength={6}></input>
                                    {/* <input required placeholder='Date Of Birth' className='form-input'
                                        onChange={(e) => { inputHandler(e, 12) }}>
                                    </input> */}
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker onChange={(e) => { inputHandler(e, 12) }} value={selectedDate}/>
                                            </MuiPickersUtilsProvider>
                                    <input required type='text' placeholder='Address' className='form-input'
                                        onChange={(e) => { inputHandler(e, 13) }}></input>
                                </div>
                            </div>
                            <button
                                isBtnDisabled={isBtnDisabled}
                                onClick={(e) => { handleRegistration(e) }}
                                className='btn btn-secondary btn-block' >Register</button>
                            <div className='message'>
                                <div><h4>Already Have An Account?</h4></div>
                                <div><a className='btn' onClick={handleLogin}>Sign In</a></div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            {showConfirmModal && (
                <Confirm buttonText={'OK'} isCancelRequired={false} confirmTitle={alertText}
                    onConfirm={() => { setShowConfirmModal(false) }} onCancel={() => { setShowConfirmModal(false) }} />
            )}
            {isShowLoader ? <Loader /> : null}
        </div>

    )
}

export default Registration;