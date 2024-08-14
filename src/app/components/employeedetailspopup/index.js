import React, { useState, useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import { getCountriesList, getStateList, getCityList } from '../../utils/apicalls';
import Button from '../../components/button/index';
import {
    GetAllEmployeeDetailsbyId
} from '../../utils/apicalls';
import moment from 'moment';

const EmployeeDetailsPopUp = ({ id, userId, onCancel, onConfirm, commonTitle, input1Value, input2Value, input3Value, input4Value, input5Value, input6Value, input7Value, input8Value, input9Value, input10Value, input11Value, input12Value,input13Value,input14Value,input15Value,input16Value,input17Value,input18Value,input19Value,input21Value,input22Value,input23Value, isShowInput1, isShowInput2, isShowInput3, isShowInput4, isShowInput5, isShowInput6, isShowInput7, isShowInput8, isShowInput9, isShowInput10, isShowInput11, isShowInput12, isShowInput13, isShowInput14,isShowInput15,isShowInput16,isShowInput17,isShowInput18,isShowInput19,isShowInput21,isShowInput22,isShowInput23, input1Placeholder, input2Placeholder, input3Placeholder, input4Placeholder, input5Placeholder, input6Placeholder, input7Placeholder, input8Placeholder, input9Placeholder, input10Placeholder, input11Placeholder, input12Placeholder,input13Placeholder,input14Placeholder,input15Placeholder,input16Placeholder,input17Placeholder,input18Placeholder,input19Placeholder,input21Placeholder,input22Placeholder,input23Placeholder, btnText, isInput1Required, isInput2Required, isInput3Required, isInput4Required, isInput5Required, isInput6Required, isInput7Required, isInput8Required, isInput9Required, isInput10Required, isInput11Required, isInput12Required, isInput13Required, isInput14Required, isInput15Required, isInput16Required, isInput17Required, isInput18Required, isInput19Required, isInput21Required, isInput22Required,isInput23Required}) => {

    const [nid, setNid] = useState(userId ?? '');
    const [text1, setText1] = useState(input1Value ?? '');
    const [text2, setText2] = useState(input2Value ?? '');
    const [text3, setText3] = useState(input3Value ?? '');
    const [text4, setText4] = useState(input4Value ?? '');
    const [text5, setText5] = useState(input5Value ?? '');
    const [text6, setText6] = useState(input6Value ?? '');
    const [text7, setText7] = useState(input7Value ?? '');
    const [text8, setText8] = useState(input8Value ?? '');
    const [text9, setText9] = useState(input9Value ?? '');
    const [text10, setText10] = useState(input10Value ?? '');
    const [text11, setText11] = useState(input11Value ?? '');
    const [text12, setText12] = useState(input12Value ?? '');
    const [text13 ,setText13] = useState(input13Value ?? '');
    const [text14, setText14] = useState(input14Value ?? '');
    const [text15, setText15] = useState(input15Value ?? '');
    // const [text16, setText16] = useState(input16Value ?? '');
    const [text17, setText17] = useState(input17Value ?? '');
    const [text18, setText18] = useState(input18Value ?? '');
    // const [text19, setText19] = useState(input19Value ?? '');
    const [text21, setText21] = useState(input21Value ?? '');
    const [text22, setText22] = useState(input22Value ?? '');
    const [text23, setText23] = useState(input23Value ?? '');


    


    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [employeeList, setEmployeeList] = useState([]);
    const [isShowLoader, setIsShowLoader] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setNid(userId)
        const payload = {
            userId: nid
        }
        if (payload) {
            GetAllEmployeeDetailsbyId((res) => {
                const { message, statusCode } = res;
                let val = res;
                setEmployeeList(val);
                console.log(val)
                if (statusCode === 200) {
                    setIsShowLoader(false);
                } else {
                }
            }, payload)
        }
    }

    const handleClick = (e) => {
        if (e?.target.id === 'container-target') {
            onCancel();
        }
        return;
    }

    const handleConfirm = (event) => {
        if ((isShowInput1 ? (text1 ? true : false) : true)
        ) {
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
                text9: text9,
                text10: text10,
                text11: text11,
                text12: text12,
                text13: text13,
                text14: text14,
                text15: text15,
                // text16: text16,
                text17: text17,
                text18: text18,
                // text19: text19,
                text21: text21,
                text22: text22,
                text23: text23,




            }
            onConfirm(event?.target.id, obj);
            // console.log(obj.selectedDropdown4Value);
        }
        else {
            setIsBtnDisabled(true);
        }
    }

    const handleValueChange = (event, key, index) => {
        let val = event?.target.value;
        let file;
        setIsBtnDisabled(true);
        if (key === 1) {
            setText1(val);
        }
         else if (key === 2) {
            setText2(val);
        }
         else if (key === 3) {
            setText3(val);
        } else if (key === 4) {
            setText4(val);
        } else if (key === 5) {
            setText5(val);
        } else if (key === 6) {
            setText6(val);
        } else if (key === 7) {
            setText7(val);
        } else if (key === 8) {
            setText8(val);
        }
        else if (key === 14) {
            setText14(val);
        }
        else if (key === 9) {
            setText9(val);
        } else if (key === 10) {
            setText10(val);
        } else if (key === 11) {
            setText11(val);
        } else if (key === 12) {
            setText12(val);
        }
        else if (key === 13) {
            setText13(val);
        }

        else if (key === 15) {
            setText15(val);
        }
        // else if (key === 16) {
        //     setText16(val);
        // }
        else if (key === 17) {
            setText17(val);
        }
        else if (key === 18) {
            setText18(val);
        }
        // else if (key === 19) {
        //     setText19(val);
        // }
        else if (key === 21) {
            setText21(val);
        }
        else if (key === 22) {
            setText22(val);
        }
        else if (key === 23) {
            setText23(val);
        }
        if (text1) {
            setIsBtnDisabled(false);
        }
    }


    return (
        <div className='employeed' id='dialog-target' onClick={handleClick}>
            <div className='employeed__container'>
                <div className='employeed__container__header'>
                    <p className='employeed__container__header__description'>{commonTitle}</p>
                    <div className='employeed__container__header__cancelBackground__cancel-box' onClick={onCancel}>
                        <span className='employeed__container__header__cancelBackground__cross employeed__container__header__cancelBackground__right-arrow'></span>
                        <span className='employeed__container__header__cancelBackground__cross employeed__container__header__cancelBackground__left-arrow'></span>
                    </div>
                </div>
                <div className='employeed__container__elements'>
                    {isShowInput1 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput1Required ? '* ' : '')  + input1Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text1} placeholder={!text1 ? input1Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 1) }} onChange={(event) => { handleValueChange(event, 1) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput18 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput18Required ? '* ' : '') + input18Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text18} placeholder={!text18 ? input18Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 18) }} onChange={(event) => { handleValueChange(event, 18) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput6 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput6Required ? '* ' : '') + input6Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text6} placeholder={!text6 ? input6Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 6) }} onChange={(event) => { handleValueChange(event, 6) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput17 ?
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput17Required ? '* ' : '') + input17Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text17} placeholder={!text17 ? input17Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 17) }} onChange={(event) => { handleValueChange(event, 17) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
 
                    {isShowInput7 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput7Required ? '* ' : '') + input7Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text7} placeholder={!text7 ? input7Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 7) }} onChange={(event) => { handleValueChange(event, 7) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput8 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput8Required ? '* ' : '') + input8Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text8} placeholder={!text8 ? input8Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 8) }} onChange={(event) => { handleValueChange(event, 8) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput3 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput3Required ? '* ' : '') + input3Placeholder}</p>
                            <h6>:</h6>&nbsp;

                            {/* <h2>{employeeList?.dateOfBirth
                                ? moment(employeeList?.dateOfBirth).format('DD/MM/YYYY')
                                : ''}</h2> */}
                            <input type='text' readOnly value={employeeList?.dateOfBirth
                                ? moment(employeeList?.dateOfBirth).format('DD/MM/YYYY')
                                : ''} placeholder={employeeList?.dateOfBirth
                                    ? moment(employeeList?.dateOfBirth).format('DD/MM/YYYY')
                                    : ''}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput9 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput9Required ? '* ' : '') + input9Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly disabled value={text9} placeholder={!text9 ? input9Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 9) }} onChange={(event) => { handleValueChange(event, 9) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput2 ?
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput2Required ? '* ' : '') + input2Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text2} placeholder={!text2 ? input2Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 2) }} onChange={(event) => { handleValueChange(event, 2) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput10 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>* {input10Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text10} placeholder={!text10 ? input6Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 10) }} onChange={(event) => { handleValueChange(event, 10) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                        {isShowInput13 ?
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput13Required ? '* ' : '') + input13Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text13} placeholder={!text13 ? input13Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 13) }} onChange={(event) => { handleValueChange(event, 13) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput11 ?
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>* {input11Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text11} placeholder={!text11 ? input11Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 11) }} onChange={(event) => { handleValueChange(event, 11) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput14 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput14Required ? '* ' : '') + input14Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text14} placeholder={!text14 ? input14Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 14) }} onChange={(event) => { handleValueChange(event, 14) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput12 ?
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>* {input12Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text12} placeholder={!text12 ? input12Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 12) }} onChange={(event) => { handleValueChange(event, 12) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput15 ?
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput15Required ? '* ' : '') + input15Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text15} placeholder={!text15 ? input15Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 15) }} onChange={(event) => { handleValueChange(event, 15) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }

                    {isShowInput4 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput4Required ? '* ' : '') + input4Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text4} placeholder={!text4 ? input4Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 4) }} onChange={(event) => { handleValueChange(event, 4) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                                 
                    {isShowInput22 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput22Required ? '* ' : '') + input22Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text22} placeholder={!text22 ? input22Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 22) }} onChange={(event) => { handleValueChange(event, 22) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput5 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput5Required ? '* ' : '') + input5Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text5} placeholder={!text5 ? input5Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 5) }} onChange={(event) => { handleValueChange(event, 5) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }  
                    {isShowInput21 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput21Required ? '* ' : '') + input21Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly value={text21} placeholder={!text21 ? input21Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 21) }} onChange={(event) => { handleValueChange(event, 21) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }
                    {isShowInput23 ? 
                        <div className='employeed__container__elements__input'>
                            <p className='employeed__container__elements__label'>{(isInput23Required ? '* ' : '') + input23Placeholder}</p>
                            <h6>:</h6>&nbsp;
                            <input type='text' readOnly disabled value={text23} placeholder={!text23 ? input23Placeholder : undefined}
                                onKeyUp={(event) => { handleValueChange(event, 23) }} onChange={(event) => { handleValueChange(event, 23) }}
                                className='employeed__container__elements__customInput'></input>
                        </div>
                        : null
                    }              
                </div >
            </div >
        </div >
    )
}

EmployeeDetailsPopUp.propTypes = {
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
    input13Value: PropTypes.number,
    input14Value: PropTypes.number,
    input15Value: PropTypes.number,
    input16Value: PropTypes.string,
    input17Value: PropTypes.string,
    input18Value: PropTypes.string,


    dropdown4List: PropTypes.array,
    dropdown1List: PropTypes.array,
    dropdown2List: PropTypes.array,
    dropdown3List: PropTypes.array,
    dropdownList: PropTypes.array,
    dropdown6List: PropTypes.array,


////////

    isShowInput1: PropTypes.bool,
    isShowInput2: PropTypes.bool,
    isShowInput3: PropTypes.bool,
    isShowInput4: PropTypes.bool,
    isShowInput5: PropTypes.bool,
    isShowInput6: PropTypes.bool,
    isShowInput7: PropTypes.bool,
    isShowInput8: PropTypes.bool,
    isShowInput9: PropTypes.bool,
    isShowInput10: PropTypes.bool,
    isShowInput11: PropTypes.bool,
    isShowInput12: PropTypes.bool,
    isShowInput13: PropTypes.bool,
    isShowInput14: PropTypes.bool,
    isShowInput15: PropTypes.bool,
    isShowInput16: PropTypes.bool,
    isShowInput17: PropTypes.bool,
    isShowInput18: PropTypes.bool,
    isShowInput19: PropTypes.bool,
    isShowInput23: PropTypes.bool,





    isSearchDropdown: PropTypes.bool,
    input1Placeholder: PropTypes.string,
    input2Placeholder: PropTypes.string,
    input3Placeholder: PropTypes.string,
    input4Placeholder: PropTypes.string,
    input5Placeholder: PropTypes.string,
    input6Placeholder: PropTypes.string,
    input7Placeholder: PropTypes.string,
    input8Placeholder: PropTypes.string,
    input9Placeholder: PropTypes.string,
    input10Placeholder: PropTypes.string,
    input11Placeholder: PropTypes.string,
    input12Placeholder: PropTypes.string,
    input13Placeholder: PropTypes.string,
    input14Placeholder: PropTypes.string,
    input15Placeholder: PropTypes.string,
    input16Placeholder: PropTypes.string,
    input17Placeholder: PropTypes.string,
    input18Placeholder: PropTypes.string,
    input19Placeholder: PropTypes.string,
    input21Placeholder: PropTypes.string,
    input22Placeholder: PropTypes.string,
    input23Placeholder: PropTypes.string,




    
    btnText: PropTypes.string,
    isInput1Required: PropTypes.bool,
    isInput2Required: PropTypes.bool,
    isInput3Required: PropTypes.bool,
    isInput4Required: PropTypes.bool,
    isInput5Required: PropTypes.bool,
    isInput6Required: PropTypes.bool,
    isInput7Required: PropTypes.bool,
    isInput8Required: PropTypes.bool,
    isInput9Required: PropTypes.bool,
    isInput10Required: PropTypes.bool,
    isInput11Required: PropTypes.bool,
    isInput12Required: PropTypes.bool,
    isInput13Required: PropTypes.bool,
    isInput14Required: PropTypes.bool,
    isInput15Required: PropTypes.bool,
    isInput16Required: PropTypes.bool,
    isInput17Required: PropTypes.bool,
    isInput18Required: PropTypes.bool,
    isInput19Required: PropTypes.bool,
    isInput21Required: PropTypes.bool,
    isInput22Required: PropTypes.bool,
    isInput23Required: PropTypes.bool,




}

EmployeeDetailsPopUp.defaultProps = {
    onCancel: () => { },
    onConfirm: () => { },
    commonTitle: '',
    input1Value: '',
    input2Value: '',
    input3Value: '',
    input4Value: '',
    input5Value: '',
    input6Value: '',
    input7Value: '',
    input8Value: '',
    input9Value: '',
    input10Value: '',
    input11Value: '',
    input12Value: '',
    input13Value: '',
    input14Value: '',
    input15Value: '',
    input16Value: '',
    input17Value: '',
    input18Value: '',
    input19Value: '',

    

    isShowInput1: false,
    isShowInput2: false,
    isShowInput3: false,
    isShowInput4: false,
    isShowInput5: false,
    isShowInput6: false,
    isShowInput7: false,
    isShowInput8: false,
    isShowInput9: false,
    isShowInput10: false,
    isShowInput11: false,
    isShowInput12: false,
    isShowInput13: false,
    isShowInput14: false,
    isShowInput15: false,
    isShowInput16: false,
    isShowInput17: false,
    isShowInput18: false,
    isShowInput19: false,




    input1Placeholder: '',
    input2Placeholder: '',
    input3Placeholder: '',
    input4Placeholder: '',
    input5Placeholder: '',
    input6Placeholder: '',
    input7Placeholder: '',
    input8Placeholder: '',
    input9Placeholder: '',
    input10Placeholder: '',
    input11Placeholder: '',
    input12Placeholder: '',
    input13Placeholder: '',
    input14Placeholder: '',
    input15Placeholder: '',
    input16Placeholder: '',
    input17Placeholder: '',
    input18Placeholder: '',
    input19Placeholder: '',
    input21Placeholder: '',
    input22Placeholder: '',
    input23Placeholder: '',




    btnText: '',
    isInput1Required: true,
    isInput2Required: true,
    isInput3Required: true,
    isInput4Required: true,
    isInput5Required: true,
    isInput6Required: true,
    isInput7Required: true,
    isInput8Required: true,
    isInput9Required: true,
    isInput10Required: true,
    isInput11Required: true,
    isInput12Required: true,
    isInput13Required: true,
    isInput14Required: true,
    isInput15Required: true,
    isInput16Required: true,
    isInput17Required: true,
    isInput18Required: true,
    isInput19Required: true,
    isInput21Required: true,
    isInput22Required: true,
    isInput23Required: true,




}

export default React.memo(EmployeeDetailsPopUp);