import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import AppConfig from '../../../Config/AppConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchMerchantDashboard:['data'],
  fetchMerchantDashboardDone:['data'],
  fetchMerchantDashboardFailed:['data'],
  fetchMerchantDashboardReset:null,
})

export const DashboardMerchantTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isRequesting:false,
    errors:[],
    status:0,
    totalAmount:0,
    dailyAmount:0,
    totalTransaction:0
})

export const fetch = state  => state.merge({ isRequesting: true })
export const done = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const failed = (state,{data}) => state.merge({ isRequesting:false, ...data })
export const reset = state=> state.merge(INITIAL_STATE)


export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_MERCHANT_DASHBOARD]: fetch,
  [Types.FETCH_MERCHANT_DASHBOARD_DONE]: done,
  [Types.FETCH_MERCHANT_DASHBOARD_FAILED]: failed,
  [Types.FETCH_MERCHANT_DASHBOARD_RESET]: reset
})
