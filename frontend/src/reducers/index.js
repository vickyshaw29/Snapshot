import { combineReducers } from 'redux'

import {
   imageReducer,
   loginReducer,
   registerReducer,
} from './user'
export default combineReducers({
   userRegister: registerReducer,
   userLogin: loginReducer,
   image:imageReducer
})