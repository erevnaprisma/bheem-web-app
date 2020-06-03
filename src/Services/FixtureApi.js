export default {
  postProduct: () => { return { ok: true, data: '21' } },
  loginCheckStatus: () => {
    console.log('loginCheckStatus invoked')
    return {
      ok: true,
      data: {}
    }
  },
  getLoginStatus: () => {
    console.log('getLoginStatus invoked')
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS'
      }
    }
  },
  loginDoLogin: () => {
    console.log('loginDoLogin invoked')
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS',
        sessionToken: 'XXX',
        publicToken: 'YYYY',
        user: {
          userFullname: 'Nofrets Poai',
          userRole: '300',
          merchantCode: '000000070070070',
          merchantId: '8afb8b146d7212fa016d721bb5970005'
        }
      }
    }
  },
  merchantReadOneRequest: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS',
        data: {
          instCd: '000000070070070',
          nm: 'Toko Tok',
          website: 'http://www.tokotok.com',
          merchantMobileNo: '085342805673',
          merchantEmail: 'tokotok@gmail.com',
          createdDt: '2019-10-10 13:00:00',
          addr: 'Menteng, Jakarta Selatan',
          frontendCallbackUrl: 'http://frontend.tokotok.com',
          backendCallbackUrl: 'http://backend.tokotok.com'
        }
      }
    }
  },
  merchantGetCredential: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS',
        data: {
          keyId: '8afb8b146d7212fa016d721bb5970005',
          merchantId: '000000070070071',
          merchantSecretKey: 'xxxxxxxmerchantSecretKey',
          publicKey: 'adfadfasdfasdfasfdsfdfadsfadsfdfdfdfdfdf',
          validFrom: '2019-10-10 13:00:00',
          validTo: '2019-12-10 13:00:00',
          remark: 'xxxremark',
          updatedDate: '2019-10-10 13:00:00',
          frontendCallbackUrl: 'http://frontend.tokotok.com',
          backendCallbackUrl: 'http://backend.tokotok.com'
        }
      }
    }
  },
  bankFetchCredential: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS',
        data: {
          apiKey: 'keyIdxxxxyyyyy',
          bankSecretKey: 'xxxxxxxmerchantSecretKey',
          publicKey: 'xasdfasdfasdf',
          validFrom: '2019-10-10 13:00:00',
          validTo: '2019-12-10 13:00:00',
          remark: 'xxxremark',
          updatedDate: '2019-10-10 13:00:00',
          callbackUrl: 'http://directdebit.plink.co.id'
        }
      }
    }
  },
  merchantRequestMinMaxLimit: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS',
        data: {
          limitMinTrxDaily: 500000,
          limitTrxDaily: 1000000
        }
      }
    }
  },
  tablepaginationFetchAllTrxForRefundRequest: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS',
        reports: [],
        pages: 4
      }
    }
  },
  tablepaginationFetchAllTrxForRefundReview: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS',
        refundRequestData: [],
        pages: 4
      }
    }
  },
  tablepaginationReadRequest: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS',
        reports: [],
        pages: 4
      }
    }
  },
  tablepaginationFetchAllUser: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS',
        content: [],
        totalPages: 4
      }
    }
  },
  removeLogin: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS'
      }
    }
  },
  dashbaordFetch: () => {
    return {
      ok: true,
      data: {
        responseCode: 'MBDD00',
        responseMessage: 'SUCCESS',
        responseDescription: 'SUCCESS'
      }
    }
  }
}
