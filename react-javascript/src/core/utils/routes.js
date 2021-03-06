import React from 'react';
import HomeContainer from 'src/features/pages/Home/Home.container';
import NotFoundContainer from 'src/features/pages/NotFound/NotFound.container';
import * as CONST from 'src/core/utils/constants';

export const mainRoutes = [
    {
        path: CONST.AppURI.HOME,
        exact: true,
        name: 'Home',
        main: (props) => <HomeContainer {...props} />,
    },
    {
        path: CONST.AppURI.NOT_FOUND,
        exact: true,
        name: 'Not found',
        main: (props) => <NotFoundContainer {...props} />,
    },
];