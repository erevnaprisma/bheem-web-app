import { call, put, select } from 'redux-saga/effects'
import DashboardActions from './redux'
import AppConfig from '../../Config/AppConfig'
import {setSession,getSession,destroySession,removeSpecificSession} from '../../Utils/Utils'
import _ from 'lodash'
import {path,merge} from 'ramda'
import {isNullOrUndefined} from 'util'
import Swal from 'sweetalert2'
import ChangePasswordActions from './redux'
import jwtDecode from 'jwt-decode'
import $ from 'jquery'


export function * doChangePassword (api, action) {
  const { data } = action
  const response = yield call(api.doChangePassword, data)
  console.log("Response changePassword>>>>>>>>>>>>",response) 
  
  let errors=[]
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  // detect error from body
  const status = parseInt(path(['data', 'data', 'bheemChangePassword', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'bheemChangePassword', 'error','message'], response)||[]
  const errorbody2 = path(['data', 'data', 'bheemChangePassword', 'error'], response)||[]
  const errorBackend = path(['data', 'errors'], response)||[]
  const token = path(['headers','authorization'], response)||null 
  
  
  if(!_.isEmpty(errorbody)) errors.push({ message: errorbody })
  if(!_.isEmpty(errorbody2)) errors.push({ message: errorbody2 })
  if(!_.isEmpty(errorBackend)){ errors.push({message:'System error'})}

  // success
  if (_.isEmpty(errors) && status) {
    
    yield put(
      ChangePasswordActions.changePasswordDone({
        status,
        errors
      })
    )
    
  } else {    
    let error=''
    let err=errors[0]
    console.log("errors>>>",errors)

    if(_.has(err,'message')){ error=err.message }
    else{ error=err }

    Swal.fire({
      title: 'Failed',
      text: error,
      icon: 'error',
      confirmButtonText: 'Ok'
    }) 
    return yield put(ChangePasswordActions.failedChangePassword({  status, error }))
  } 
}