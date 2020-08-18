// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import {getSession,generateHmac, generateSha256 } from '../../Utils/Utils'

export const create = api => ({
  doLogin: ({newPassword,password}) => {
    const userId=getSession(AppConfig.sessionUserData).id
    const body = `mutation{
      bheemChangePassword(userId:"${userId}",newPassword:"${newPassword}",password:"${password}")
      {
        status
        error
      }
    }`
    console.log(body)
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
