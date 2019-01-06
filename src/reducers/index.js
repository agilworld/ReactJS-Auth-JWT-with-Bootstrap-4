import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    loadingBar: loadingBarReducer
});
