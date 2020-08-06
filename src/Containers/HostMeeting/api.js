// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import {getSession,generateHmac, generateSha256 } from '../../Utils/Utils'

export const create = api => ({
  doCreateMeeting: ({title,host,created_by,start_date,end_date,permissionTojoin}) => {
    // const permissionTojoin = "Yes"
    const body = `
                mutation{
                  createMeeting(title:"${title}",host:${JSON.stringify(host)},createdBy:"${created_by}",startDate:"${start_date}",endDate:"${end_date}",permissionToJoin:"${'Yes'}")
                  {
                    status
                    error
                    meeting
                      {
                        title
                        hosts
                        {
                          userId
                        }
                        createdBy
                        startDate
                        endDate
                        createdAt
                        id
                    }
                  }
                }`
    console.log(body)
    const query= { query:body }
    api.setHeader('Authorization',getSession(AppConfig.sessionToken))
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
