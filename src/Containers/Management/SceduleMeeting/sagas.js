import { call, put, select } from 'redux-saga/effects'
import DashboardActions from './redux'
import AppConfig from '../../../Config/AppConfig'
import {isLogin,getSession} from '../../../Utils/Utils'
import _ from 'lodash'
import {path,merge} from 'ramda'
import {isNullOrUndefined} from 'util'
import ScheduleActions from './redux'
import Swal from 'sweetalert2'

export function * fetchMeetings (api, action) {
    isLogin()
    const { data } = action
    const response = yield call(api.fetchMeetings,data)
    console.log("response fetch schedule meeting>>>>",response)
    const err = path(['data','errors'], response)||[]
    
    if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
    const loginStatus=getSession(AppConfig.loginFlag)||false

    const status = parseInt(path(['data', 'data', 'showScheduleMeeting', 'status'], response) || 0)
    const errorbody = path(['data', 'data', 'showScheduleMeeting', 'error'], response)||[]
    const meetings = path(['data', 'data', 'showScheduleMeeting', 'meetings'], response)||[]
    if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
    if (_.isEmpty(err)&& status==200) {
      const errors=''
      yield put(ScheduleActions.scheduleDone({status,errors,meetings}))
    }
    else{
      let errors=''
      if(_.has(err[0],'message')){ errors=err[0].message||"Something error" }
      else{ errors=err[0] }
      yield put(ScheduleActions.scheduleFailed({errors,status}))
      Swal.fire({
        title: 'Error!',
        text: errors,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
}
export function * createScheduleMeeting (api, action) {
  isLogin()
  const { data } = action
  const response = yield call(api.createScheduleMeeting,data)
  console.log("response fetch schedule meeting>>>>",response)
  const err = path(['data','errors'], response)||[]
  
  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const loginStatus=getSession(AppConfig.loginFlag)||false

  const status = parseInt(path(['data', 'data', 'createScheduleMeeting', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'createScheduleMeeting', 'error'], response)||[]
  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  if (_.isEmpty(err)&& status==200) {
    const errors=''
    yield put(ScheduleActions.scheduleDone({status,errors}))
    Swal.fire({
      title: 'Success',
      text:'Schedule meeting has been created',
      icon: 'success',
      confirmButtonText: 'Ok',
      onClose:()=>window.location="/me/manage-meeting"
    })
  }
  else{
    let errors=''
    if(_.has(err[0],'message')){ errors=err[0].message||"Something error" }
    else{ errors=err[0] }
    yield put(ScheduleActions.scheduleFailed({errors,status}))
    Swal.fire({
      title: 'Error!',
      text: errors,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
}
export function * editScheduleMeeting (api, action) {
  isLogin()
  const { data } = action
  const response = yield call(api.editScheduleMeeting,data)
  console.log("response fetch schedule meeting>>>>",response)
  const err = path(['data','errors'], response)||[]
  
  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const loginStatus=getSession(AppConfig.loginFlag)||false

  const status = parseInt(path(['data', 'data', 'editScheduleMeeting', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'editScheduleMeeting', 'error'], response)||[]
  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  if (_.isEmpty(err)&& status==200) {
    const errors=''
    yield put(ScheduleActions.scheduleDone({status,errors}))
    // Swal.fire({
    //   title: 'Success',
    //   text:'Edit meeting successs',
    //   icon: 'success',
    //   confirmButtonText: 'Ok',
    //   onClose:()=>window.location="/manage-meeting"
    // })
  }
  else{
    let errors=''
    if(_.has(err[0],'message')){ errors=err[0].message||"Something error" }
    else{ errors=err[0] }
    yield put(ScheduleActions.scheduleFailed({errors,status}))
    Swal.fire({
      title: 'Error!',
      text: errors,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
}
export function * cancelScheduleMeeting (api, action) {
  isLogin()
  const { data } = action
  const response = yield call(api.cancelScheduleMeeting,data)
  console.log("response fetch schedule meeting>>>>",response)
  const err = path(['data','errors'], response)||[]
  
  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const loginStatus=getSession(AppConfig.loginFlag)||false

  const status = parseInt(path(['data', 'data', 'cancelScheduleMeeting', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'cancelScheduleMeeting', 'error'], response)||[]
  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  if (_.isEmpty(err)&& status==200) {
    const errors=''
    yield put(ScheduleActions.scheduleDone({status,errors,do:true}))
    Swal.fire({
      title: 'Success',
      text:'Meeting canceled',
      icon: 'success',
      confirmButtonText: 'Ok',
      onClose:()=>window.location="/manage-meeting"
    })
    
  }
  else{
    let errors=''
    if(_.has(err[0],'message')){ errors=err[0].message||"Something error" }
    else{ errors=err[0] }
    yield put(ScheduleActions.scheduleFailed({errors,status}))
    Swal.fire({
      title: 'Error!',
      text: 'Can\'t cancel meeting: '+errors,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
}
export function * startScheduleMeeting (api, action) {
  isLogin()
  const { data } = action
  const response = yield call(api.startScheduleMeeting,data)
  console.log("response fetch schedule meeting>>>>",response)
  const err = path(['data','errors'], response)||[]
  
  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
  const loginStatus=getSession(AppConfig.loginFlag)||false

  const status = parseInt(path(['data', 'data', 'startScheduleMeeting', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'startScheduleMeeting', 'error'], response)||[]
  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
  
  console.log("err>>>>",err)
  if (_.isEmpty(err) && status==200) {
    const errors=''
    yield put(ScheduleActions.scheduleDone({status,errors}))
    window.location=AppConfig.invitationlUrl+data.meetingId
  }
  else{
    let errors=''
    if(_.has(err[0],'message')){ errors=err[0].message||"Something error" }
    else{ errors=err[0] }
    yield put(ScheduleActions.scheduleFailed({errors,status}))
    Swal.fire({
      title: 'Error!',
      text: errors,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
  
}