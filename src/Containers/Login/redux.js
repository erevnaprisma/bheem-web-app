import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../Config/AppConfig'
import { doLogin } from './sagas'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doLogin:['data'],
  doLoginDone:['data'],
  doLoginFailed:['data'],
  doLogout:['data'],
  doLogoutDone:['data'],
  doLogoutFailed:['d ata'],
  doLoginReset:null,
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    error:'',
    userdata:{}
})

export const doIn = state  => state.merge({ isRequesting: true })
export const done_in = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const failed_in = (state,{data}) => state.merge({ isRequesting:false, ...data })

export const doOut = state  => state.merge({ isRequesting: true })
// export const done_out = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const done_out = (state,{data}) => state.merge({ isRequesting:false})
export const failed_out = (state,{data}) => state.merge({ isRequesting:false, ...data })

export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_LOGIN]: doIn,
  [Types.DO_LOGIN_DONE]: done_in,
  [Types.DO_LOGIN_FAILED]: failed_in,
  [Types.DO_LOGOUT]: doOut,
  [Types.DO_LOGOUT_DONE]: done_out,
  [Types.DO_LOGOUT_FAILED]: failed_out,

  [Types.DO_LOGIN_RESET]: reset
})
