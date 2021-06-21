import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_IMAGE_REQUEST,
    USER_IMAGE_SUCCESS,
    USER_IMAGE_FAIL,
    USER_IMAGE_RESET,

} from '../constants/user'
// user register reducer
export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        default: return state
    }
}
// login reducer
export const loginReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true, }
        case USER_LOGIN_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        // case USER_LOGIN_RESET:
        //     return {}
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
// getting image
export const imageReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case USER_IMAGE_REQUEST:
            return { loading: true, }
        case USER_IMAGE_SUCCESS:
            return { loading: false, success: true, userImage: action.payload }
        // case USER_LOGIN_RESET:
        //     return {}
        case USER_IMAGE_FAIL:
            return { loading: false, error: action.payload }
        case USER_IMAGE_RESET:
            return {  }
        default:
            return state
    }
}
