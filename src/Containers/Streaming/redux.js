import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../Config/AppConfig'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addParticipant:['data'],
  removeParticipant:['data'],
  putToWaitingRoom:['data'],
  kickParticipant:['data'],
  resetStreaming:null
})
export const StreamingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    errors:[],
    status:0,
    needPermission:false,
    allowed:false,
    listWaitingRoom:[],
    listParticipant:[]
})
export const add = (state,{data}) =>{
   return state.merge({...data})
}
export const remove = (state,{data}) => state.replace({ isRequesting:false, listWaitingRoom:data.list })
export const put = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const kick = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PARTICIPANT]: add,
  [Types.REMOVE_PARTICIPANT]: remove,
  [Types.PUT_TO_WAITING_ROOM]: put,
  [Types.KICK_PARTICIPANT]: kick,
  [Types.RESET_STREAMING]: reset,
})
