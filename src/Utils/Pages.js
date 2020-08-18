// --- import list page entity ---
import _ from 'lodash'
// import { merge } from 'ramda'
import PageHome from '../Pages/Home/PageHome'
import Login from '../Pages/Login/PageLogin'
import Signup from '../Pages/SingUp/PageSignup'
import HostMeeting from '../Pages/HostMeeting/PageHostMeeting'
import JoinMeeting from '../Pages/JoinMeeting/PageJoinMeeting'
import PageManagement from '../Pages/Management/PageManageMeeting'
import PageWaitingRoom from '../Pages/WaitingRoom/PageWaitingRoom'
import PageVidStreaming from '../Pages/VideoStream/PageBheem'
import socketIO from '../Containers/Socket/socketListeners'

const lp = {
  '/': { exact:true,route: '/', path: '/', component: PageHome },
  '/home': { exact:true,route: '/home', path: '/home', component: PageHome },
  '/login': { exact:true,route: '/login', path: '/login', component: Login },
  '/signup': { exact:true,route: '/signup', path: '/signup', component: Signup },
  '/host-meeting': { exact:true,route: '/host-meeting', path: '/host-meeting', component: HostMeeting },
  '/join-meeting': { exact:true,route: '/join-meeting', path: '/join-meeting', component: JoinMeeting },
  '/me/': { exact:false,route: '/me', path: '/me/:page', component: PageManagement },
  '/waiting-room': { exact:true,route: '/waiting-room', path: '/waiting-room', component: PageWaitingRoom },
  '/concal': { exact:true,route: '/concal', path: '/concal/:room/', component: PageVidStreaming },
}
export const pageList = _.map(lp, (v) => v)
export const getPage = (pageId) => lp[pageId] || {}
