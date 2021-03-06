import React from 'react';
import HomeContainer from 'src/features/pages/home/home.container';
import NotFoundComponent from 'src/shared/components/not-found/not-found.component';
import * as CONST from 'src/core/utils/constants';

export const mainRoutes = [
    {
        path: CONST.AppURI.HOME,
        exact: true,
        name: 'Home',
        main: (props: any): JSX.Element => <HomeContainer {...props} />
    },
    {
        path: CONST.AppURI.NOT_FOUND,
        exact: true,
        name: 'Not found',
        main: (props: any): JSX.Element => <NotFoundComponent {...props} />
    },
];