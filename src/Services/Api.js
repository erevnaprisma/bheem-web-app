// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { merge } from 'ramda'
import ApiElectron from '../Services/ApiElectron'
import {getAccessToken} from '../Utils/Utils'

// our "constructor"
const create = (baseURL = 'https://jsonplaceholder.typicode.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const API_REMOTE = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': '*, Authorization'
      // 'tesss': 'ok'
      // 'Access-Control-Request-Method': 'POST'
      // 'Access-Control-Allow-Credentials': 'true',
      // 'content-type': 'application/x-www-form-urlencoded'
      // accept: 'application/vnd.api+json',
      // 'content-type': 'application/vnd.api+json'
      // 'Access-Control-Expose-Headers': 'X-My-Custom-Header, X-Another-Custom-Header'
    },
    xsrfCookieName: 'myCatx',
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  // Define API Constants

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  API_REMOTE.setHeader('channelid', 'WEB')
  let api = API_REMOTE

  let ipcRenderer = {
    send: () => {},
    on: () => {}
  }

  let server = ''
  if (window.require) {
    
    ipcRenderer = window.require('electron').ipcRenderer
    server = 'electron'
  }
  api = (server === 'electron') ? new ApiElectron(ipcRenderer) : API_REMOTE

  let apiMerged = {}
  // merge api
  // paymentpage
  apiMerged = merge(apiMerged, require('../Containers/Signup/api').create(api))
  apiMerged = merge(apiMerged, require('../Containers/Login/api').create(api))
  apiMerged = merge(apiMerged, require('../Containers/HostMeeting/api').create(api))
  apiMerged = merge(apiMerged, require('../Containers/JoinMeeting/api').create(api))
  apiMerged = merge(apiMerged, require('../Containers/Management/SceduleMeeting/api').create(api))
  apiMerged = merge(apiMerged, require('../Containers/ChangePassword/api').create(api))
  apiMerged = merge(apiMerged, require('../Containers/Management/MeetingHistory/api').create(api))
  apiMerged = merge(apiMerged, {})
  return {
    ...apiMerged
  }
}

// let's return back our create method as the default.
export default {
  create
}
