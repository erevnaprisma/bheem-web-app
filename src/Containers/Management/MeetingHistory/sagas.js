import { call, put, select } from 'redux-saga/effects'
import AppConfig from '../../../Config/AppConfig'
import {isLogin,getSession} from '../../../Utils/Utils'
import _ from 'lodash'
import {path,merge} from 'ramda'
import {isNullOrUndefined} from 'util'
import MeetingActions from './redux'
import Swal from 'sweetalert2'

export function * fetchMeetingsHistory (api, action) {
    isLogin()
    const { data } = action
    const response = yield call(api.fetchMeetingHistory,data)
    console.log("response fetch meeting history>>>>",response)

    const err = path(['data','errors'], response)||[]
    
    if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
    const loginStatus=getSession(AppConfig.loginFlag)||false

    const status = parseInt(path(['data', 'data', 'meetingHistory', 'status'], response) || 0)
    const errorbody = path(['data', 'data', 'meetingHistory', 'error'], response)||[]
    const meetings = path(['data', 'data', 'meetingHistory', 'meetingList'], response)||[]
    if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
    if (_.isEmpty(err)&& status==200) {
      const errors=''
      yield put(MeetingActions.doFetchMeetingHistoryDone({status,errors,meetings}))
    }
    else{
      let errors=''
      if(_.has(err[0],'message')){ errors=err[0].message||"Something error" }
      else{ errors=err[0] }
      yield put(MeetingActions.doFetchMeetingHistoryFailed({errors,status}))
      Swal.fire({
        title: 'Error!',
        text: errors,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
}