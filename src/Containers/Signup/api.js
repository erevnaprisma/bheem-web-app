// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import {getSession,generateHmac, generateSha256 } from '../../Utils/Utils'

export const create = api => ({
  doSignUp: ({email,first_name,last_name}) => {
    const deviceId=navigator.userAgent
    const body = `
    mutation{
      bheemSignUp(email:"${email}",fullName:"${first_name+' '+last_name}",firstName:"${first_name}",lastName:"${last_name}",deviceId:"${deviceId}")
      {
        status
        error
      }
    }`
    console.log(body)
    const query= { query:body }
    // api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
  // doLogout: ({acess_token}) => {
  //   const body = `query{
  //     login(email:"${acccesss_token}")
  //     {
  //       status
  //       error
  //       user
  //     }
  //   }`
  //   const query= { query:body }
  //   api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  //   const resp = api.post('/graphql', query)
  //   return resp
  // }
  
})
