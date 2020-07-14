// a library to wrap and simplify api calls
import AppConfig from '../../../Config/AppConfig'
import {getSession,generateHmac, generateSha256,isLogin } from '../../../Utils/Utils'

export const create = api => ({
  fetchMeetings: () => {
    const userId=getSession(AppConfig.sessionUserData).id

    const body=`mutation{
      showScheduleMeeting(userId:"${userId}")
      {
        status
        error
        meetings
        {
          title
          hosts
          {
            userId
          }
          startDate
          endDate
          createdAt
          id
          needPermisionToJoin
        }
      }
    }`
    
    console.log(body)
    const query= { query:body }
    // api.setHeader('Authorization',getSeission(AppConfig.sess))
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  },
  createScheduleMeeting: ({title,createdBy,start_date,end_date,permissionTojoin}) => {
    const userId=getSession(AppConfig.sessionUserData).id
    const host=userId
    const body=`mutation{
      createScheduleMeeting(
        title:"${title}",
        host:"${host}",
        createdBy:"${userId}",
        startDate:"${start_date}",
        endDate:"${end_date}",
        permissionToJoin:"${permissionTojoin}")
      {
        status
        error
      }
    }`
    
    console.log(body)
    const query= { query:body }
    // api.setHeader('Authorization',getSeission(AppConfig.sess))
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  },
  cancelScheduleMeeting: ({meetingId}) => {
    const userId=getSession(AppConfig.sessionUserData).id
    const host=userId
    const body=`mutation{
      cancelScheduleMeeting(
        meetingId:"${meetingId}")
      {
        status
        error
      }
    }`
    
    console.log(body)
    const query= { query:body }
    // api.setHeader('Authorization',getSeission(AppConfig.sess))
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  },
  startScheduleMeeting: ({meetingId}) => {
    const userId=getSession(AppConfig.sessionUserData).id
    const host=userId
    const body=`mutation{
      startScheduleMeeting(
        meetingId:"${meetingId}")
      {
        status
        error
      }
    }`
    
    console.log(body)
    const query= { query:body }
    // api.setHeader('Authorization',getSeission(AppConfig.sess))
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  },
  editScheduleMeeting: ({meetingId,title,start_date,end_date,permission}) => {
    const body=`mutation{
      editScheduleMeeting(
        meetingId:"${meetingId}",
        title:"${title}",
        startDate:"${start_date}",
        endDate:"${end_date}",
        permission:"${permission}")
      {
        status
        error
      }
    }`
    
    console.log(body)
    const query= { query:body }
    // api.setHeader('Authorization',getSeission(AppConfig.sess))
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
