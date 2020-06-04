import { call, put, select } from 'redux-saga/effects'
import DashboardActions from './redux'
import AppConfig from '../../Config/AppConfig'
import {setSession,getSession,destroySession} from '../../Utils/Utils'
import _ from 'lodash'
import {path,merge} from 'ramda'
import {isNullOrUndefined} from 'util'
import SignupActions from './redux'
import Swal from 'sweetalert2'

export function * doSignUp (api, action) {
    const { data } = action
    // console.log("data>>>>",data)
    
    const response = yield call(api.doSignUp,data)
    console.log("response fetch signup>>>>",response)
    const err = path(['data','errors'], response)||[]
    
    if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
    const status = parseInt(path(['data', 'data', 'signUp', 'status'], response) || 0)
    const errorbody = path(['data', 'data', 'signUp', 'error'], response)||[]

    if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
    if (_.isEmpty(err)&& status==200) {
      const errors=''
      yield put(SignupActions.doSignUpDone({status,errors}))
      Swal.fire({
        title: 'Success',
        text: 'Your account has been successfully registered',
        icon: 'success',
        confirmButtonText: 'Ok',
        onClose:()=>window.location=AppConfig.basePath+"/login"
      })
    
    }
    else{
      let errors=''
      if(!isNullOrUndefined(err[0].message)){ errors=err[0].message||"Something error" }
      else{ errors=err[0] }
      yield put(SignupActions.doSignUpFailed({errors,status}))
      Swal.fire({
        title: 'Error!',
        text: errors,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
}