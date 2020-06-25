// --- import list page entity ---
import _ from 'lodash'
// import { merge } from 'ramda'
import PageHome from '../Pages/Home/PageHome'
import Concal from '../Pages/Concal/PageConcal'
import Login from '../Pages/Login/PageLogin'
import Signup from '../Pages/SingUp/PageSignup'
import HostMeeting from '../Pages/HostMeeting/PageHostMeeting'
import JoinMeeting from '../Pages/JoinMeeting/PageJoinMeeting'

const lp = {
  '/': { route: '/', path: '/', component: PageHome },
  '/home': { route: '/home', path: '/home', component: PageHome },
  '/login': { route: '/login', path: '/login', component: Login },
  '/signup': { route: '/signup', path: '/signup', component: Signup },
  '/concal': { route: '/concal', path: '/concal/:room', component: Concal },
  '/host-meeting': { route: '/host-meeting', path: '/host-meeting', component: HostMeeting },
  '/join-meeting': { route: '/join-meeting', path: '/join-meeting', component: JoinMeeting },
  '/manage-meeting': { route: '/manage-meeting', path: '/manage-meeting', component: JoinMeeting },
  // '/': {path: '*', component: PageHome }
}
export const pageList = _.map(lp, (v) => v)
export const getPage = (pageId) => lp[pageId] || {}
