import React from 'react';
import ReactDOM from 'react-dom';
import appStore from 'src/core/reduxs/appStore';
import { Provider } from 'react-redux';
import 'src/shared/assets/scss/index.scss';
import App from 'src/App';
import * as serviceWorker from 'src/serviceWorker';
import { Router } from 'react-router-dom';
import history from 'src/core/utils/history';

ReactDOM.render(
    <Provider store={appStore}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
