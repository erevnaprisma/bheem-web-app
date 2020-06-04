// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import {getSession,generateHmac, generateSha256 } from '../../Utils/Utils'

export const create = api => ({
  submitSignUp: ({fullname,address,businessName,email}) => {
    const deviceId=navigator.userAgent
    const body = `mutation{signUpMerchant(email:"${email}",deviceID:"${deviceId}",fullname:"${fullname}",address:"${address}",businessName:"${businessName}"){ status error } }`
    console.log('body==>', JSON.stringify(body))
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
