import React from 'react';
import _ from 'lodash';
import { Route } from 'react-router-dom';

export const buildRoutes = (routes) => {
    let elementRoute = [];
    if (_.isEmpty(routes)) {
        return elementRoute;
    }

    let length = routes.length;
    for (let index = 0; index < length; index++) {
        const route = routes[index];

        elementRoute.push(
            <Route
                key={route.name + index}
                exact={route.exact}
                path={route.path}
                component={route.main}
            />
        )
    }

    return elementRoute;
}