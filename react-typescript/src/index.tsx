import React from 'react';
import ReactDOM from 'react-dom';
import 'src/shared/assets/scss/index.scss';
import App from 'src/App';
import reportWebVitals from 'src/reportWebVitals';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import history from 'src/core/utils/history';
import appStore from 'src/core/reduxs/appStore';
import { I18nConfig } from 'src/core/utils/constants';

ReactDOM.render(
    <Provider store={appStore}>
        <IntlProvider locale="en" messages={I18nConfig['en']}>
            <Router history={history}>
                <App />
            </Router>
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
