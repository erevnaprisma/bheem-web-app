import { Socket } from "dgram"

const env = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'development' : 'production'
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  analyticsTrackerId: '',
  // auth0: {
  //   clientId: cred.AUTH0_CLIENT_ID,
  //   host: cred.AUTH0_HOST
  // },
  backendURL: '',
  basePath: '',
  env,
  minDesktopScreenWidth: 770,
  authHeader: env === 'development' ? 'Authorization' : 'Authorization',
  authTokenType: 'Bearer',
  publicToken: 'publicToken',
  sessionToken: 'st',
  sessionUserData: 'userData',
  sessionMeeting:'activeMeeting',
  sessionExp: 'exp_date',
  loginFlag: 'il',
  sessionData: 'ssst',
  concalUrl:'https://alpha.jitsi.net/',
  invitationlUrl:'http://localhost:3001/concal/',
  socketUrl:'ws://localhost:3000/participant'
}
