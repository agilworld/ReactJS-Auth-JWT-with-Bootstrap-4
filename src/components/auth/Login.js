import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/auth';
import { loginValidate } from '../../validations/authValidate';
import { findStatusText, createNotification } from '../../utils/helpers'
import Document from '../layout/Document'
import _ from 'lodash'
import lang from '../../langs'
import logo from '../../img/logo.png'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        const userData = {
            phone: this.state.username,
            password: this.state.password
        };

        try {
            await loginValidate(userData)
        } catch (err) {
            this.setState({ errors: err })
            createNotification('error', _.map(err, (val) => { return val }).join("\n\n\n"))
            return false;
        }

        this.props.loginUser(userData)
            .then(res => {
                createNotification('success', lang('success.login'))
            })
            .catch(err => {
                if (_.has(err, 'response')) {
                    const error = err.response
                    if (error.status == 400 ||
                        error.status == 401 ||
                        error.status == 403 ||
                        error.status == 422) {
                        createNotification('warning', error.data.messages)
                    }
                } else {
                    createNotification('error', lang('error.server_unknown'))
                }

            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

        if (this.state.errors) {
            if (this.state.username && this.state.errors.username) {
                this.setState({ errors: { username: null } })
            }
            if (this.state.password && this.state.errors.password) {
                this.setState({ errors: { password: null } })
            }
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <Document title="Login Administrator" className="login-page">
                <div id="bodyLogin">
                    <div className="align-self-center text-center mb-4">
                        <img src={logo} width="300" alt="Logo" />
                    </div>

                    <div className="shadow-sm p-4 mb-5 bg-white rounded">

                        <div className="col align-self-center w-auto-xs mb-3">
                            <div className="text-color">
                                <div className="text-uppercase text-muted text-center mb-4 text-sm">
                                    Sign in with your
                                </div>

                                <form name="formLogin" noValidate>
                                    <div className="form-label-group mb-4">
                                        <input
                                            type="email"
                                            name="username"
                                            id="email"
                                            placeholder="Email Address"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.username
                                            })}
                                            onChange={this.onChange}
                                            value={this.state.username}
                                        />
                                        {errors.username && <div className="invalid-feedback">{errors.username}.</div>}
                                    </div>

                                    <div className="form-label-group mb-4">
                                        <input
                                            type="password"
                                            name="password"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.password
                                            })}
                                            placeholder="Password"
                                            onChange={this.onChange}
                                            value={this.state.password}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}.</div>}
                                    </div>

                                    <div className="custom-control custom-checkbox mr-sm-2 mb-3">
                                        <input type="checkbox" className="custom-control-input" id="rememberMe" />
                                        <label className="custom-control-label" htmlFor="rememberMe">{lang('remember_me')}</label>
                                    </div>

                                    <button type="button" id="loginSubmit" disabled={this.props.loaded ? true : false} onClick={this.onSubmit} className="btn btn-danger btn-block btn-lg">{this.props.loaded ? 'Loading...' : 'Sign In'}</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="text-center  text-muted ">
                        <p>Fork this repo <br /> <small><a target="_blank" href="https://github.com/agilworld/ReactJS-Auth-JWT-with-Bootstrap-4">ReactJS-Auth-JWT-with-Bootstrap-4</a></small></p>
                    </div>

                </div>
            </Document>
        )
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    loaded: state.loadingBar.sectionBar == 1 ? true : false
});

export default connect(mapStateToProps, { loginUser })(Login);

