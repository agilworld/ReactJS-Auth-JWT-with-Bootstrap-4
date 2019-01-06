import axios from 'axios'
import config from '../config'

const rest = axios.create({
    baseURL: config.url,
    // `headers` are custom headers to be sent
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
})

export const restForm = (bodyFormData) => {
    return axios.create({
        baseURL: config.url,
        // `headers` are custom headers to be sent
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'multipart/form-data'
        }
    })
}

export default rest;