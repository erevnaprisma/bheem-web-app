import { takeLatest, all } from 'redux-saga/effects'
// You'll need to alter this file when you go to connect the api for realsies. Add
// back the lines ending with with a # (and of course, remove the #) :)
import API from '../Services/Api'
import RehydrationServices from '../Services/RehydrationServices'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import AppConfig from '../Config/AppConfig'

// Types /* ------------- Types ------------- */

import { SignUpTypes } from '../Containers/Signup/redux'
import { LoginTypes } from '../Containers/Login/redux'
import { CreateMeetingTypes } from '../Containers/HostMeeting/redux'
import { JoinMeetingTypes } from '../Containers/JoinMeeting/redux'
import { ScheduleMeetingsTypes } from '../Containers/Management/SceduleMeeting/redux'
import { ChangePasswordTypes } from '../Containers/ChangePassword/redux'




import { doSignUp } from '../Containers/Signup/sagas'
import { doLogin,doLogout} from '../Containers/Login/sagas'
import { doCreateMeeting} from '../Containers/HostMeeting/sagas'
import { doJoinMeeting,checkIsexistMeeting } from '../Containers/JoinMeeting/sagas'
import { fetchMeetings,createScheduleMeeting,cancelScheduleMeeting,startScheduleMeeting,editScheduleMeeting } from '../Containers/Management/SceduleMeeting/sagas'
import { doChangePassword } from '../Containers/ChangePassword/sagas'

/* ------------- API ------------- */

const hostBackend = process.env.NODE_ENV==='development'?process.env.REACT_APP_BACKEND_BASE_URL_LOCAL:process.env.REACT_APP_BACKEND_BASE_URL

const apiDashboard = DebugConfig.useFixtures ? FixtureAPI : API.create(hostBackend)

const apiDashboardPy = DebugConfig.useFixtures ? FixtureAPI : API.create(hostBackend + '')

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(SignUpTypes.DO_SIGN_UP, doSignUp, apiDashboard),
    takeLatest(LoginTypes.DO_LOGIN, doLogin, apiDashboard),
    takeLatest(LoginTypes.DO_LOGOUT, doLogout, apiDashboard),
    takeLatest(CreateMeetingTypes.CREATE_MEETING, doCreateMeeting, apiDashboard),
    takeLatest(JoinMeetingTypes.JOIN_MEETING, doJoinMeeting, apiDashboard),
    takeLatest(JoinMeetingTypes.CHECK_ISEXIST_MEETING, checkIsexistMeeting, apiDashboard),
    takeLatest(ScheduleMeetingsTypes.GET_LIST_MEETING, fetchMeetings, apiDashboard),
    takeLatest(ScheduleMeetingsTypes.CREATE_SCHEDULE_MEETING, createScheduleMeeting, apiDashboard),
    takeLatest(ScheduleMeetingsTypes.CANCEL_SCHEDULE_MEETING, cancelScheduleMeeting, apiDashboard),
    takeLatest(ScheduleMeetingsTypes.START_SCHEDULE_MEETING, startScheduleMeeting, apiDashboard),
    takeLatest(ScheduleMeetingsTypes.EDIT_SCHEDULE_MEETING, editScheduleMeeting, apiDashboard),
    takeLatest(ChangePasswordTypes.DO_CHANGE_PASSWORD, doChangePassword, apiDashboard)
  ])
}
