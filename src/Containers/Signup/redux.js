import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doSignUp:['data'],
  doSignUpDone:['data'],
  doSignUpFailed:['data'],
  doSignUpReset:null,
})

export const SignUpTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    errors:[],
    status:0
})

export const doSign = (state,{data}) => state.merge({ isRequesting: true })
export const done = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const failed = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_SIGN_UP]: doSign,
  [Types.DO_SIGN_UP_DONE]: done,
  [Types.DO_SIGN_UP_FAILED]: failed,
  [Types.DO_SIGN_UP_RESET]: reset
})
