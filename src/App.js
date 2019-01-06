import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwtDecode from 'jwt-decode'
import config from './config'
import { setAuthToken } from './utils/helpers'
import { NotificationContainer } from 'react-notifications'

import './sass/main.scss';
import 'react-notifications/lib/notifications.css'

// Global Components
import AdminRoute from './components/common/AdminRoute'
import LoadingBar from 'react-redux-loading-bar'
import { logoutUser, setCurrentUser, clearCurrentProfile } from './actions/auth';

// Route Page
import Login from './components/auth/Login'
import Dashboard from './components/dashboard'

// Check for token
if (sessionStorage.getItem(config.tokenKey)) {
  // Set auth token header auth
  setAuthToken(sessionStorage.getItem(config.tokenKey));
  // Decode token and get user info and exp
  const decoded = jwtDecode(sessionStorage.getItem(config.tokenKey));
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter basename="/">
          <React.Fragment>
            <div className="body">
              <NotificationContainer />
              <LoadingBar scope="sectionBar" />
              <Route exact path="/" component={Login} />

              <Switch>
                <AdminRoute name="Dashboard" path="/dashboard" component={Dashboard} />
              </Switch>

            </div>
          </React.Fragment>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;

//<Switch>
//<AdminRoute name="Dashboard" path="/dashboard" component={Dashboard} />
//</Switch>
