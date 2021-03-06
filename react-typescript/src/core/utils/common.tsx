import React from 'react';
import _ from 'lodash';
import { Route } from 'react-router-dom';
import RouteType from 'src/core/models/route.model';

export const buildRoutes = (routes: Array<RouteType>): React.ReactElement[] => {
    const elementRoute: React.ReactElement[] = [];
    if (_.isEmpty(routes)) {
        return elementRoute;
    }

    const length = routes.length;
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