import { call, put, select } from 'redux-saga/effects'
import SignupActions from './redux'
import AppConfig from '../../Config/AppConfig'
import {setSession,getSession,destroySession} from '../../Utils/Utils'
import _ from 'lodash'
import {path} from 'ramda'
import {isNullOrUndefined} from 'util'

export function * doSignUp (api, action) {
    const { data } = action
    // console.log("data>>>>",data)
    
    const response = yield call(api.submitSignUp,data)
    console.log("response signUp>>>>",response)
    const err = path(['data','errors'], response)||[]

    if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
    const status = parseInt(path(['data', 'data', 'signUpMerchant', 'status'], response) || 0)
    const errorbody = path(['data', 'data', 'signUpMerchant', 'error'], response)||[]

    if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
    if (_.isEmpty(err)) {
      const errors=''
      yield put(SignupActions.signupSubmitDone({status,errors}))
    }
    else{
      let errors=''
      if(!isNullOrUndefined(err[0].message)){ errors=err[0].message }
      else{ errors=err[0] }
      yield put(SignupActions.signupSubmitFailed({errors,status}))
    }
}