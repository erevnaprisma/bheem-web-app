import { takeLatest, all } from 'redux-saga/effects'
// You'll need to alter this file when you go to connect the api for realsies. Add
// back the lines ending with with a # (and of course, remove the #) :)
import API from '../Services/Api'
import RehydrationServices from '../Services/RehydrationServices'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import AppConfig from '../Config/AppConfig'

// Types /* ------------- Types ------------- */


// import { LoginTypes } from '../Containers/Login/redux'




// import { loginDoLogin,doLogout } from '../Containers/Login/sagas'

/* ------------- API ------------- */

const hostBackend = process.env.NODE_ENV==='development'?process.env.REACT_APP_BACKEND_BASE_URL_LOCAL:process.env.REACT_APP_BACKEND_BASE_URL

const apiDashboard = DebugConfig.useFixtures ? FixtureAPI : API.create(hostBackend)

const apiDashboardPy = DebugConfig.useFixtures ? FixtureAPI : API.create(hostBackend + '')

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  
  yield all([
   
  ])
}
