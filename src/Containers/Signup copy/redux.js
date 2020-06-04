import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signupSubmit:['data'],
  signupSubmitDone:['data'],
  signupSubmitFailed:['data'],
  signupFormReset:null,
})

export const SignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    isResult:false,
    fullname:'',
    deviceId:'',
    address:'',
    businessName:'',
    errors:[],
    status:0
})

export const signup = state  => state.merge({ isRequesting: true })
export const signupDone = (state,{data}) => state.merge({ isRequesting:false,isResult:true, ...data })
export const signupFailed = (state,{data}) => state.merge({ isRequesting:false,isResult:false, ...data })

export const signupReset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_FORM_RESET]: signupReset,
  [Types.SIGNUP_SUBMIT]: signup,
  [Types.SIGNUP_SUBMIT_DONE]: signupDone,
  [Types.SIGNUP_SUBMIT_FAILED]: signupFailed
})
