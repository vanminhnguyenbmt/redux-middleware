import React, { ReactElement } from 'react';
import 'src/shared/assets/scss/App.scss';
import { Redirect, Switch } from 'react-router-dom';
import * as COMMON from 'src/core/utils/common';
import * as ROUTES from 'src/core/utils/routes';
import * as CONST from 'src/core/utils/constants';

function App(): ReactElement {
    return (
        <Switch>
            <Redirect
                exact
                from={CONST.AppURI.INDEX}
                to={CONST.AppURI.HOME}
            />
            {COMMON.buildRoutes(ROUTES.mainRoutes)}
            <Redirect to={CONST.AppURI.NOT_FOUND} />
        </Switch>
    );
}

export default App;
