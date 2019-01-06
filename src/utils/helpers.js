import _ from 'lodash';
import lang from '../langs'
import rest from '../utils/rest'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { NotificationManager } from 'react-notifications'

export const setAuthToken = token => {
    if (token) {
        // Apply to every request
        rest.defaults.headers.common['Authorization'] = 'bearer ' + token;
    } else {
        // Delete auth header
        delete rest.defaults.headers.common['Authorization'];
    }
}

export const createNotification = (type, content) => {
    switch (type) {
        case 'info':
            NotificationManager.info(content, 'Info');
            break;
        case 'success':
            NotificationManager.success(content, 'Great!');
            break;
        case 'warning':
            NotificationManager.warning(content, 'Warning message');
            break;
        case 'error':
            NotificationManager.error(content, 'Error message');
            break;
    }
}

export const beforeRequest = () => dispatch => {
    // loading
    dispatch(showLoading('sectionBar'))
}

export const beforeResponse = () => dispatch => {
    // loading
    dispatch(hideLoading('sectionBar'))
}

export const urlExists = (url) => {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

export const validateRequired = (data, filterData) => {
    let output = {}
    filterData.map(key => {
        if (_.has(data, key) && (data[key] === '' || data[key] === null || data[key] === undefined)) {
            output[key] = lang('required.' + key)
        }
    })

    return output;
}

export const findStatusText = data => status => {
    return _.findKey(data, status) ? true : false;
}

export const encodeUri = uri => {
    const str = uri.replace(" ", '%20')
    return encodeURIComponent(str)
}