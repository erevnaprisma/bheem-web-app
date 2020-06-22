// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import {getSession,generateHmac, generateSha256 } from '../../Utils/Utils'

export const create = api => ({
  doJoinMeeting: ({meetingId,name}) => {
    const userId=getSession(AppConfig.sessionUserData).id
    const isLogin=getSession(AppConfig.loginFlag)||false

    console.log("my userid",userId)
    let body = ``
    if(isLogin)
    {
      body=`mutation{
        requestTojoinMeeting(meetingId:"${meetingId}",userId:"${userId}")
        {
          status
          error
        }
      }`
    }
    else
    {
      body=`mutation{
        anonymousRequestTojoinMeeting(meetingId:"${meetingId}",name:"${name}")
        {
          status
          error
        }
      }`
    }
    console.log(body)
    const query= { query:body }
    // api.setHeader('Authorization',getSession(AppConfig.sess))
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  },
  isMeetingExist: ({meetingId}) => {
    const body = `
                mutation{
                  isMeetingExist(meetingId:"${meetingId}")
                  {
                    status
                    error
                  }
                }`
    console.log(body)
    const query= { query:body }
    // api.setHeader('Authorization',getSession(AppConfig.sess))
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
