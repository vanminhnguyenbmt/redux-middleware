import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import * as ROUTES from 'src/core/utils/routes';
import * as COMMON from 'src/core/utils/common';
import 'src/shared/assets/scss/App.scss';

const App = () => {
    return (
        <Switch>
            <Redirect
                exact
                from="/"
                to="/home"
            />
            {COMMON.buildRoutes(ROUTES.mainRoutes)}
            <Redirect to="/404" />
        </Switch>
    )
}

export default App;
