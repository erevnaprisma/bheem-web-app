import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../../Config/AppConfig'
import _ from 'lodash'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  editScheduleMeeting:['data'],
  startScheduleMeeting:['data'],
  cancelScheduleMeeting:['data'],
  createScheduleMeeting:['data'],
  getListMeeting:['data'],
  scheduleDone:['data'],
  scheduleFailed:['data'],
  scheduleReset:null
})

export const ScheduleMeetingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    isDoing:false,
    errors:[],
    status:0,
    meetings:[]
})


export const do_ = (state,{data}) =>{
  if(_.has(data,'do')) return state.merge({ isDoing: true })
  else return state.merge({ isRequesting: true }) 
}
export const done = (state,{data}) => {
  if(_.has(data,'do')) return state.merge({ isDoing: false, ...data})
  else return state.merge({ isRequesting: false, ...data})
}
export const failed = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.EDIT_SCHEDULE_MEETING]: do_,
  [Types.START_SCHEDULE_MEETING]: do_,
  [Types.CANCEL_SCHEDULE_MEETING]: do_,
  [Types.CREATE_SCHEDULE_MEETING]: do_,
  [Types.GET_LIST_MEETING]: do_,
  [Types.SCHEDULE_DONE]: done,
  [Types.SCHEDULE_FAILED]: failed,
  [Types.SCHEDULE_RESET]: reset
})
