const id = () => {
    return new Map([
        ['required_field', 'Kolom <%= field %> dibutuhkan'],
        ['required.email', 'Kolom alamat email dibutuhkan'],
        ['required.username', 'Kolom nama pengguna dibutuhkan'],
        ['required.password', 'Kolom password dibutuhkan'],
        ['invalid.email', 'Alamat email tidak valid atau sesuai format'],
        ['first_name', 'Nama depan'],
        ['last_name', 'Nama belakang'],
        ['email', 'Email'],
        ['mobile', 'No. HP'],
        ['logout', 'Keluar'],
        ['success.login', 'Login berhasil!'],
        ['error.server_unknown', 'Something went wrong in server. Please contact administrator'],
        ['remember_me', 'Ingatkan saya'],
        ['success.logout', 'You are logged out']
    ])
}

export default id