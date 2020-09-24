// a library to wrap and simplify api calls
import AppConfig from '../../../Config/AppConfig'
import {getSession,generateHmac, generateSha256,isLogin } from '../../../Utils/Utils'

export const create = api => ({
  fetchMeetingHistory: () => {
    const userId=getSession(AppConfig.sessionUserData).id
    const body=`query{
      meetingHistory(userId:"${userId}")
      {
        status
        error
        meetingList{
          title
          createdBy
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
  }
})
