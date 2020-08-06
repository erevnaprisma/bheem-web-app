import { call, put, select } from 'redux-saga/effects'
import DashboardActions from './redux'
import AppConfig from '../../Config/AppConfig'
import {isLogin,setSession } from '../../Utils/Utils'
import _ from 'lodash'
import {path,merge} from 'ramda'
import {isNullOrUndefined} from 'util'
import HostActions from './redux'
import Swal from 'sweetalert2'
import socketIo from '../Socket/socketListeners'
export function * doCreateMeeting (api,action) {
    const { data } = action
    isLogin()
    const response = yield call(api.doCreateMeeting,data)
    console.log("response fetch createmeeting>>>>",response)
    const err = path(['data','errors'], response)||[]
    
    if (!_.isEmpty(response.problem)) err.push({ message: response.problem })

    const status = parseInt(path(['data', 'data', 'createMeeting', 'status'], response) || 0)
    const errorbody = path(['data', 'data', 'createMeeting', 'error'], response)||[]
    const title = path(['data', 'data', 'createMeeting','meeting', 'title'], response)||[]
    const host = path(['data', 'data', 'createMeeting', 'meeting','hosts'], response)||[]
    const createdBy = path(['data', 'data', 'createMeeting','meeting', 'createdBy'], response)||[] 
    const startDate = path(['data', 'data', 'createMeeting', 'meeting','startDate'], response)||[]
    const endDate = path(['data', 'data', 'createMeeting', 'meeting','endDate'], response)||[] 
    const meetingId = path(['data', 'data', 'createMeeting','meeting','id'], response)||[]
    
    if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
    if (_.isEmpty(err)&& status==200) {
      const errors=''
      setSession({[AppConfig.sessionMeeting]: {meetingId:data.meetingId,needRequestToJoin:true,role:'host'}})
      
      yield put(HostActions.createMeetingDone({status,errors,title,host,createdBy,startDate,endDate,meetingId}))
      Swal.fire({
        title: 'Success',
        text: 'Successfully created meeting',
        icon: 'success',
        confirmButtonText: 'Ok',
        onClose:()=>window.location='/concal/'+meetingId
      })
    }
    else{
      let errors=''
      if(!isNullOrUndefined(err[0].message)){ errors=err[0].message||"Something error" }
      else{ errors=err[0] }
      yield put(HostActions.createMeetingFailed({errors,status}))
      Swal.fire({
        title: 'Error!',
        text: errors,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
}