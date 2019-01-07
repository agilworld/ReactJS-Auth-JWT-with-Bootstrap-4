import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'
import { logoutUser, clearCurrentProfile } from '../../actions/auth';
import { createNotification } from '../../utils/helpers'
import Document from '../layout/Document'
import config from '../../config'
import lang from '../../langs'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();

        createNotification('info', lang('success.logout'))
    }

    render() {
        const { user } = this.props.auth.user
        return (
            <Document title="Dashboard Administrator" className="dashboard-page">
                <div className="container">
                    <div className="row justify-content-md-center text-center mt-5">
                        <div className="col">
                            <h2>Hi, {user.name}!</h2>
                            <p>Just show a dashboard page</p>
                            <p>Follow Github Page <a href="https://github.com/agilworld/ReactJS-Auth-JWT-with-Bootstrap-4">https://github.com/agilworld/ReactJS-Auth-JWT-with-Bootstrap-4</a></p>
                            <br />
                            <button type="button" className="btn btn-danger btn-lg" onClick={this.onLogoutClick.bind(this)}>
                                {lang('logout')}
                            </button>
                        </div>
                    </div>
                </div>
            </Document>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};


const mapStatetoProps = state => ({
    auth: state.auth,
});

export default connect(mapStatetoProps, { logoutUser, clearCurrentProfile })(Dashboard);