import React from 'react'
import namor from 'namor'
import AppConfig from '../Config/AppConfig'
import Moment from 'moment'
import { merge, path } from 'ramda'
import Swal from 'sweetalert2'
import _ from 'lodash'
// import AES from 'crypto-js/aes'
// import EncUtf8 from 'crypto-js/enc-utf8'
// import Chance from 'chance'

const basePath = AppConfig.basePath

var AES = require('crypto-js/aes')
var hmacSha256 = require('crypto-js/hmac-sha256')
var sha256 = require('crypto-js/sha256')
var EncUtf8 = require('crypto-js/enc-utf8')


export const getAccessToken = (accessTokenState) => {
  const sessionToken = getSession(AppConfig.sessionToken)
  accessTokenState = accessTokenState || sessionToken
  return accessTokenState
}
export const decryptAt = (msg, key) => {
  console.log('decryptAt')
  const publicToken = window.sessionStorage.getItem(AppConfig.publicToken)
  const sessionToken = window.sessionStorage.getItem(AppConfig.sessionToken)
  if (!publicToken || !sessionToken) return ''
  const str = AES.decrypt(msg, sessionToken)
  var plaintext = str.toString(EncUtf8)
  return plaintext
}
// export const isLoggedIn = (isLoggedInState) => {
//   const loginFlag = getSession(AppConfig.loginFlag)
//   isLoggedInState = loginFlag || false
//   if ((isLoggedInState === 'true' || isLoggedInState === true)) isLoggedInState = true
//   else isLoggedInState = false
//   return isLoggedInState
// }
export const generateHmac = (msg) => {
  return hmacSha256(msg, 'r4y4P4y2020').toString()
}
export const generateSha256 = (msg) => {
  return sha256(msg).toString()
}
export const setSession = (newSession, cb) => {
  const encryptedCurrentSession = window.localStorage.getItem(AppConfig.sessionData)
  let currentSessionJson = {}
  if (encryptedCurrentSession) {
    // decrypt
    var bytes = AES.decrypt(encryptedCurrentSession, 'prismalink2019')
    var decryptedData = bytes.toString(EncUtf8)
    currentSessionJson = JSON.parse(decryptedData)
    currentSessionJson = merge(currentSessionJson, newSession)
  }
  var ciphertext = AES.encrypt(JSON.stringify(currentSessionJson), 'prismalink2019')
  var encryptedData = ciphertext.toString()
  window.localStorage.setItem(AppConfig.sessionData, encryptedData)
  if (cb) cb()
}
export const getSession = (parameter) => {
  const encryptedCurrentSession = window.localStorage.getItem(AppConfig.sessionData)
  let currentSessionJson = {}
  if (encryptedCurrentSession) {
    // decrypt
    var bytes = AES.decrypt(encryptedCurrentSession, 'prismalink2019')
    var decryptedData = bytes.toString(EncUtf8)
    currentSessionJson = JSON.parse(decryptedData)
  }
  const sessionValue = path([parameter], currentSessionJson) || ''
  return sessionValue
}
export const destroySession=() =>{
  window.localStorage.clear() 
  console.log("session destroyed")
}
export const updateURLParameter = (url, param, paramVal) => {
  var newAdditionalURL = ''
  var tempArray = url.split('?')
  var baseURL = tempArray[0]
  var additionalURL = tempArray[1]
  var temp = ''
  if (additionalURL) {
    tempArray = additionalURL.split('&')
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] !== param) {
        newAdditionalURL += temp + tempArray[i]
        temp = '&'
      }
    }
  }

  var rowsTxt = temp + '' + param + '=' + paramVal
  return baseURL + '?' + newAdditionalURL + rowsTxt
}
export const expDateFormat=(timestamp) =>{
  const datetime=new Date(timestamp)
  
  return datetime.getFullYear()+'/'+datetime.getMonth()+'/'+datetime.getDay()+' > '+datetime.getHours()+':'+datetime.getMinutes()+':'+datetime.getSeconds()+':'+datetime.getMilliseconds()
}
export const isLogin = (route)=>{
    
  console.log("Session Exp >>",expDateFormat(getSession(AppConfig.sessionExp)))

  if(!_.isEmpty(getSession(AppConfig.sessionUserData))&&new Date().getTime()>=getSession(AppConfig.sessionExp)){
      destroySession()
      Swal.fire({
          title: 'Expire',
          text: 'Session expired or your not logged in please relogin to your account',
          icon: 'error',
          confirmButtonText: 'Ok',
          onClose:()=>window.location="/"
        })
  }
  else{
      console.log("still valid")
  }
}
