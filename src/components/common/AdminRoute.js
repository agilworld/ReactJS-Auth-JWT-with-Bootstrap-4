import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar'

const AdminRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ? (
                <div>
                    <Navbar {...rest} />
                    <div id="content" className="app-content box-shadow-z1">
                        <div className="px-4 py-4">
                            <Component {...props} />
                        </div>
                    </div>
                </div>
            ) : (
                    <Redirect to="/" />
                )
        }
    />
);

AdminRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
