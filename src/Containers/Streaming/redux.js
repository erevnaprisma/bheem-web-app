import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../Config/AppConfig'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addParticipant:['data'],
  removeParticipant:['data'],
  putToWaitingRoom:['data'],
  kickParticipant:['data'],
  doToggleAudio:['data'],
  doToggleVideo:['data'],
  getListParticipant:['data'],
  putToJoiningList:['data'],
  doSearch:['data'],
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
    isLock:false,
    listWaitingRoom:[],
    listParticipant:[],
    listSearch:[],
    listOnJoining:[],
    tooggleVideo:null,
    tooggleAudio:null,
})
export const add = (state,{data}) =>{ return state.merge({...data}) }
export const get_list = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const do_search = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const joining = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const remove = (state,{data}) => state.replace({ isRequesting:false, listWaitingRoom:data.list })
export const put = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const kick = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const toogleAudio = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const toogleVideo = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_PARTICIPANT]:get_list,
  [Types.ADD_PARTICIPANT]: add,
  [Types.REMOVE_PARTICIPANT]: remove,
  [Types.PUT_TO_WAITING_ROOM]: put,
  [Types.KICK_PARTICIPANT]: kick,
  [Types.DO_TOGGLE_VIDEO] : toogleVideo,
  [Types.DO_TOGGLE_AUDIO] : toogleAudio,
  [Types.RESET_STREAMING]: reset,
  [Types.DO_SEARCH]: do_search,
  [Types.PUT_TO_JOINING_LIST]: joining,
})
