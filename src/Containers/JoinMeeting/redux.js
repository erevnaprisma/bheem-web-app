import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  joinMeeting:['data'],
  joinMeetingDone:['data'],
  joinMeetingFailed:['data'],
  joinMeetingReset:null,
  checkIsexistMeeting:['data'],
  checkIsexistMeetingDone:['data']
})

export const JoinMeetingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    errors:[],
    status:0,
    isExist:false,
    isNeedPermissionToJoin:false,
    title:'',
    host:'',
    createdBy:'',
    startDate:'',
    endDate:'',
    meetingId:'',
    meetingData:{}
})

export const check = (state,{data}) => state.merge({ isRequesting: true })
export const checkDone = (state,{data}) => state.merge({ isRequesting: true })

export const doJoin = (state,{data}) => state.merge({ isRequesting: true,...data })
export const done = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const failed = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.JOIN_MEETING]: doJoin,
  [Types.JOIN_MEETING_DONE]: done,
  [Types.JOIN_MEETING_FAILED]: failed,
  [Types.JOIN_MEETING_RESET]: reset,
  [Types.CHECK_ISEXIST_MEETING]: check,
  [Types.CHECK_ISEXIST_MEETING_DONE]: checkDone,
})
