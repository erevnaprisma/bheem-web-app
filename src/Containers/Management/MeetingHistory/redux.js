import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../../Config/AppConfig'
import _ from 'lodash'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
 
  doFetchMeetingHistory:['data'],
  doFetchMeetingHistoryDone:['data'],
  doFetchMeetingHistoryReset:['data'],
  doFetchMeetingHistoryFailed:['data'],
  scheduleReset:null
})

export const MeetingHistoryTypes = Types
export default Creators
/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    isDoing:false,
    errors:[],
    status:0,
    meetings:[]
})


export const do_ = (state,{data}) =>state.merge({ isRequesting: true }) 
export const done = (state,{data}) => state.merge({ isRequesting: false, ...data})
export const failed = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_FETCH_MEETING_HISTORY]: do_,
  [Types.DO_FETCH_MEETING_HISTORY_DONE]: done,
  [Types.DO_FETCH_MEETING_HISTORY_FAILED]: failed,
  [Types.DO_FETCH_MEETING_HISTORY_RESET]: reset
})
