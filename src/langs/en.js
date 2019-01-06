const en = () => {
    return new Map([
        ['required_field', '<%= field %> is required'],
        ['required.email', 'Email address is required field'],
        ['required.username', 'Username is required field'],
        ['required.password', 'password is required field'],
        ['invalid.email', 'Email address is not valid format'],
        ['first_name', 'first name'],
        ['last_name', 'Last name'],
        ['email', 'Email'],
        ['mobile', 'Phone number'],
        ['logout', 'Log out'],
        ['success.login', 'Login successfully'],
        ['error.server_unknown', 'Something went wrong in server. Please contact administrator'],
        ['remember_me', 'Remember me'],
        ['success.logout', 'You are logged out']
    ])
}

export default en