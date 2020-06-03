import { call, put, select } from 'redux-saga/effects'
import DashboardActions from './redux'
import AppConfig from '../../../Config/AppConfig'
import {setSession,getSession,destroySession} from '../../../Utils/Utils'
import _ from 'lodash'
import {path,merge} from 'ramda'
import {isNullOrUndefined} from 'util'

export function * fetchMerchantDashboard (api, action) {
    const { data } = action
    // console.log("data>>>>",data)
    
    const response = yield call(api.fetchDashboard,data)
    console.log("response fetch dashboard>>>>",response)
    const err = path(['data','errors'], response)||[]
    

    if (!_.isEmpty(response.problem)) err.push({ message: response.problem })
    const statusBody = parseInt(path(['data', 'data', 'merchantDashboard', 'status'], response) || 0)
    const errorbody = path(['data', 'data', 'merchantDashboard', 'error'], response)||[]
    const dailyAmount = path(['data', 'data', 'merchantDashboard', 'daily_transaction_amount'], response)||[]
    const totalAmount = path(['data', 'data', 'merchantDashboard', 'total_transaction_amount'], response)||[]
    const totalTransaction = path(['data', 'data', 'merchantDashboard', 'total_transaction'], response)||[]
    
    
    if (!_.isEmpty(errorbody)) err.push({ message: errorbody })
    const status = statusBody || response.status

    

    if (_.isEmpty(err)) {
      const status=statusBody
      const isRequesting=false
      yield put(DashboardActions.fetchMerchantDashboardDone({status,isRequesting,dailyAmount,totalAmount,totalTransaction}))
    }
    else{
      let errors=''
      if(!isNullOrUndefined(err[0].message)){ errors=err[0].message }
      else{ errors=err[0] }
      window.callErrorToast('Fetch dashboard data error. '+errors,'error')
      yield put(DashboardActions.fetchMerchantDashboardFailed({errors,status}))
    }
}