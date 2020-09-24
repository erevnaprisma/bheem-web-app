import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doChangePassword:['data'],
  changePasswordDone:['data'],
  failedChangePassword:['data'],
  doResetChangePassword:null,
})

export const ChangePasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    error:'', 
})

export const _do = (state,{data}) => state.merge({ isRequesting:true, ...data })
export const _failed = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const _done = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const _reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_CHANGE_PASSWORD]: _do,
  [Types.CHANGE_PASSWORD_DONE]: _done, 
  [Types.FAILED_CHANGE_PASSWORD]: _failed, 
  [Types.DO_RESET_CHANGE_PASSWORD]: _reset
})
