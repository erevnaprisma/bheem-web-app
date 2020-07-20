import { call, put, select } from 'redux-saga/effects'
import DashboardActions from './redux'
import AppConfig from '../../Config/AppConfig'
import {isLogin,getSession,setSession} from '../../Utils/Utils'
import _ from 'lodash'
import {path,merge} from 'ramda'
import {isNullOrUndefined} from 'util'
import JoinActions from './redux'
import Swal from 'sweetalert2'
import io from 'socket.io-client'
import Streaming from '../SubContainer'

//API
export function * doJoinMeeting (api, action) {
    const { data } = action
    const response = yield call(api.doJoinMeeting,data)
    
    console.log("response fetch join meeting>>>>",response)
    const err = path(['data','errors'], response)||[]
    
    if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
    const loginStatus=getSession(AppConfig.loginFlag)||false
    let root=''
    if(loginStatus){ root='requestTojoinMeeting'; }
    else{ root='anonymousRequestTojoinMeeting' ;}

    const status = parseInt(path(['data', 'data', root, 'status'], response) || 0)
    const errorbody = path(['data', 'data', root, 'error'], response)||[]
    if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
    if (_.isEmpty(err)&& status==200) {
      const errors=''
      setSession({[AppConfig.sessionMeeting]: {meetingId:data.meetingId,needRequestToJoin:true,role:'participant'}})
      yield put(JoinActions.joinMeetingDone({status,errors,}))
      window.location='/concal/'+data.meetingId
    }
    else{
      let errors=''
      if(_.has(err[0],'message')){ errors=err[0].message||"Something error" }
      else{ errors=err[0] }
      yield put(JoinActions.joinMeetingFailed({errors,status}))
      Swal.fire({
        title: 'Error!',
        text: 'Can\'t join meeting or invalid meeting or meeting has been ended',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
}
export function * checkIsexistMeeting (api, action) {
  const { data } = action
  const response = yield call(api.isMeetingExist,data)
  console.log("response isExist check meeting>>>>",response)
  const err = path(['data','errors'], response)||[]
  
  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })

  const status = parseInt(path(['data', 'data', 'isMeetingExist', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'isMeetingExist', 'error'], response)||[]


  if (!_.isEmpty(errorbody)) err.push({ message: errorbody })

  if (_.isEmpty(err) && status==200) {
    const isExist=true
    yield put(JoinActions.joinMeetingDone({status,isExist}))  
  }
  else{
    let errors=''
    
    if(_.has(err[0],'message')){ errors=err[0].message||"Something error" }
    else{ errors=err[0] }
    
    Swal.fire({
      title: 'Error!',
      text:'Meeting doens\'t exist or has been ended',
      icon: 'error',
      confirmButtonText: 'Ok',
      onClose:()=>window.location="/join-meeting"
    })
  }
}