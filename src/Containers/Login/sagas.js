import { call, put, select } from 'redux-saga/effects'
import DashboardActions from './redux'
import AppConfig from '../../Config/AppConfig'
import {setSession,getSession,destroySession} from '../../Utils/Utils'
import _ from 'lodash'
import {path,merge} from 'ramda'
import {isNullOrUndefined} from 'util'
import Swal from 'sweetalert2'
import LoginActions from './redux'

export function * doLogin (api, action) {
  console.log('loginDoLogin')
  const { data } = action
  const response = yield call(api.doLogin, data)
  console.log("Response>>>>>>>>>>>>",response) 
  let errors=[]
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })

  // detect error from body
  const status = parseInt(path(['data', 'data', 'login', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'login', 'error','message'], response)||[]
  const errorbody2 = path(['data', 'data', 'login', 'error'], response)||[]
  const errorBackend = path(['data', 'errors'], response)||[]
  const token = path(['data', 'data', 'login', 'access_token'], response)
  const userdata = path(['data', 'data', 'login', 'user'], response)
  
  if (!_.isEmpty(errorbody)) errors.push({ message: errorbody })
  if (!_.isEmpty(errorbody2)) errors.push({ message: errorbody2 })
  if(!_.isEmpty(errorBackend)){ errors.push({message:'System error'})}

  // success?
  if (_.isEmpty(errors) && status) {
    setSession({[AppConfig.loginFlag]: true, [AppConfig.sessionUserData]:userdata, [AppConfig.sessionToken]: token})
    
    yield put(

      LoginActions.doLoginDone({
        status,
        errors,
        userdata
      })
    )
    window.location="/"
     
  } else {
    
    let error=''
    let err=errors[0]
    if(_.has(err,'message')){ error=err.message }
    
    else{ error=err }

    Swal.fire({
      title: 'Failed',
      text: error,
      icon: 'error',
      confirmButtonText: 'Ok'
    }) 
    return yield put(LoginActions.doLoginFailed({  status, error }))
  }
}
export function * doLogout (api, action) {
    destroySession()
}