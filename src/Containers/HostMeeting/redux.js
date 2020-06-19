import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createMeeting:['data'],
  createMeetingDone:['data'],
  createMeetingFailed:['data'],
  createMeetingReset:null,
})

export const CreateMeetingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    errors:[],
    status:0,
    
    title:'',
    host:'',
    createdBy:'',
    startDate:'',
    endDate:'',
    meetingId:''
})

export const doCreate = (state,{data}) => state.merge({ isRequesting: true })
export const done = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const failed = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_MEETING]: doCreate,
  [Types.CREATE_MEETING_DONE]: done,
  [Types.CREATE_MEETING_FAILED]: failed,
  [Types.CREATE_MEETING_RESET]: reset
})
