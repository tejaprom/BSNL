/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import './index.scss';
import PropTypes from 'prop-types';
import Button from '../../components/button/index';
import Confirm from '../../components/confirmModal/confirm';
import Loader from '../../components/loader';


const FileIntiatedPopUP = ({ id, onCancel, onConfirm, commonTitle, input1Value, isShowInput1, input1Placeholder,
    btnText, isInput1Required }) => {

    const [text1, setText1] = useState(input1Value ?? '');
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    // const label = { inputProps: { 'aria-label': 'Switch demo' } };


    const handleClick = (e) => {
        if (e?.target.id === 'dialog-target') {
            onCancel();
        }
        return;
    }

    // const handleConfirm = (event) => {
    //     const payload = {
    //         userId: userId
    //     }
    //     if (payload) {
    //         DeleteEmployee((res) => {
    //             const { message, statusCode } = res;
    //             if (statusCode === 200) {
    //                 setIsShowLoader(false);
    //                 setShowConfirmModal(true);
    //                 setAlertText(message);
    //                 getData();
    //             } else {
    //                 setAlertText(message);
    //             }
    //         }, payload)
    //     }
    // }

    const handleValueChange = (event, key, index) => {
        let val = event?.target.value;
        let file;
        setIsBtnDisabled(true);
        if (key === 1) {
            setText1(val);
        }
        if (text1) {
            setIsBtnDisabled(false);
        }
    }


    return (
        <div>
            <div className='pop'>
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
                            <Button buttonId={id}>OKAY</Button>
                            <Button buttonId={id} buttonClick={onCancel}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

FileIntiatedPopUP.propTypes = {
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    commonTitle: PropTypes.string,
    input1Value: PropTypes.string,
    isShowInput1: PropTypes.bool,
    input1Placeholder: PropTypes.string,
    isInput1Required: PropTypes.bool,
    btnText: PropTypes.string,
}

FileIntiatedPopUP.defaultProps = {
    onCancel: () => { },
    onConfirm: () => { },
    commonTitle: '',
    input1Value: '',
    isShowInput1: false,
    isInput1Required: true,
    input1Placeholder: '',
    btnText: '',
}

export default React.memo(FileIntiatedPopUP);