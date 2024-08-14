import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/home';
import Login from '../pages/login';
import Registration from '../pages/register';
import EmployeeList from '../pages/employeelist';
import AddEmployeeN from '../pages/addemployee';
import ProtectedRoute from './protectedRoutes';
import BlockedList from '../pages/blockedlist';
import Logs from '../pages/logs';
import ManageSupervisor from '../pages/managesupervisor';

const AnimatedRoutes = () => {
    // const location = useLocation();
    return (
        <AnimatePresence>
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute exact path='/home' component={Home} />
                    <Route exact path='/' component={Login} />
                    <Route exact path='/register' component={Registration} />
                    <ProtectedRoute exact path='/employee-list' component={EmployeeList} />
                    <ProtectedRoute exact path='/add-employee' component={AddEmployeeN} />
                    <ProtectedRoute exact path='/blocked-list' component={BlockedList} />
                    <ProtectedRoute exact path='/logs/:userId' component={Logs} />
                    <ProtectedRoute exact path='/manage-supervisor' component={ManageSupervisor} />

                </Switch>
            </BrowserRouter>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;