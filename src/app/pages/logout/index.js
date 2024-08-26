import Confirm from '../../components/confirmModal/confirm';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tippy from '@tippyjs/react'
// import './index.scss';

const Logout = () => {
    const history = useHistory();
    const [confirmLogOut, setconfirmLogOut] = useState(false);
    const [alertText, setAlertText] = useState('');

    const handleLogout = () => {
        setconfirmLogOut(true);
        setAlertText('Are you sure want to Logout ?');
    }
    const onConfirm = () => {
        setconfirmLogOut(false);
        history.push('/');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('admin');
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
    }
    return (

        <div className='logout'>
            <Tippy className='tippy' content='LogOut'>
            </Tippy>

            <h4 className='logout-content' onClick={handleLogout} aria-hidden='true'>
                {/*<i className='fas fa-sign-out-alt' />*/}
                Logout
            </h4>
            {confirmLogOut && <Confirm buttonText={'OK'} isCancelRequired={true} confirmTitle={alertText}
                onConfirm={onConfirm} onCancel={() => { setconfirmLogOut(false) }} />}

        </div>

    )
}

export default Logout;
