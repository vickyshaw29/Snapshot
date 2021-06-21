import axios from 'axios'
import {
    USER_IMAGE_FAIL,
    USER_IMAGE_REQUEST,
    USER_IMAGE_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

} from '../constants/user'
// action for user register
export const registerUser = ({ name, email, password }) => async dispatch => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const userdata = {
            name:name,
            email:email,
            password:password
        }
        const config = {

            headers: {
                Accept: "application/json"
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/signup`, userdata, config)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:  error.response.data.error
        })
    }

}
// action for user login
export const loginUser = (email, password) => async dispatch => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const userdata ={
            email:email,
            password:password
        }
        const config = {

            headers: {
                Accept: "application/json"
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/signin`, userdata, config)
        console.log(data, 'login details')
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify({ data, success: true }))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.error
        })
    }

}
// action for getting the image
export const getImage = (word) => async dispatch => {
    console.log(word)
    try {
        dispatch({
            type: USER_IMAGE_REQUEST
        })
        const userdata={
            word:word
        }
        const config = {

            headers: {
                Accept: "application/json"
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/image`,userdata, config)
        console.log(data, 'login details')
        dispatch({ type: USER_IMAGE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_IMAGE_FAIL,
            payload: error
        })
    }

}
