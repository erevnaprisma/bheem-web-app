// a library to wrap and simplify api calls
import AppConfig from '../../../Config/AppConfig'
import {getSession,generateHmac, generateSha256 } from '../../../Utils/Utils'

export const create = api => ({
  fetchDashboard: ({merchant_id}) => {
    const body = `query{
      merchantDashboard(merchant_id:"${merchant_id}")
      {
        status
        error
        total_transaction
        total_transaction_amount
        daily_transaction_amount
      }
    }`
    const query= { query:body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    const resp = api.post('/graphql', query)
    return resp
  }
})
