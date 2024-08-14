import Loader from '../../components/loader';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AnimatedRoutes from '../../utils/animatedroutes';
// import Sidebar from '../sidebar';

const Router = () => {
    return (
        <React.Suspense fallback={<Loader />}>
            <HelmetProvider>
                <Helmet>
                    <title>SAHYOGI</title>
                    <meta name='description' content='' />
                    <meta name='keywords' content='' />
                    <meta name='description' content='' />
                </Helmet>
            </HelmetProvider>
            <AnimatedRoutes />
        </React.Suspense>
    );
};

export default Router;
