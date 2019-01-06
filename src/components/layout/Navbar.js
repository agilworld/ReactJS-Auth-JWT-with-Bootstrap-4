import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'
import { logoutUser, clearCurrentProfile } from '../../actions/auth';
import { createNotification } from '../../utils/helpers'
import config from '../../config'
import lang from '../../langs'
import logo from '../../img/logo.png'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.onForkClick = this.onForkClick.bind(this)
    }

    onForkClick(e) {
        window.location.href = 'https://github.com/agilworld'
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();

        createNotification('info', lang('success.logout'))
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    <img src={logo} width="120" alt="Logo" />
                </Link>

                <button onClick={this.onForkClick} className="btn btn-outline-danger" type="button">Fork On Github</button>

            </nav>
        );
    }
}

Navbar.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};


const mapStatetoProps = state => ({
    auth: state.auth,
});

export default connect(mapStatetoProps, { logoutUser, clearCurrentProfile })(Navbar);