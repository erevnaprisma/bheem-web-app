// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import {getSession,generateHmac, generateSha256 } from '../../Utils/Utils'

export const create = api => ({
  doLogin: ({email,password}) => {
    const body = `mutation{
      login(email:"${email}",password:"${password}")
      {
        status
        error
        user{ 
          userId,
          username,
          fullName,
          email,
          deviceId,
          firstName,
          lastName,
          nickname,
          address,
          profilePicture
        }
      }
    }`
    console.log(body)
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  },
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
