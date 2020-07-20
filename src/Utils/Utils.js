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
  const publicToken = window.sessionStorage.getItem(AppConfig.publicToken)
  const sessionToken = window.sessionStorage.getItem(AppConfig.sessionToken)
  if (!publicToken || !sessionToken) return ''
  const str = AES.decrypt(msg, sessionToken)
  var plaintext = str.toString(EncUtf8)
  return plaintext
}
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
export const removeSpecificSession = (session, cb) => {
  const encryptedCurrentSession = window.localStorage.getItem(AppConfig.sessionData)
  let currentSessionJson = {}
  if (encryptedCurrentSession) {
    // decrypt
    var bytes = AES.decrypt(encryptedCurrentSession, 'prismalink2019')
    var decryptedData = bytes.toString(EncUtf8)
    currentSessionJson = JSON.parse(decryptedData)
    currentSessionJson = merge(currentSessionJson, session)
  }
  var ciphertext = AES.encrypt(JSON.stringify(currentSessionJson), 'prismalink2019')
  var encryptedData = ciphertext.toString()
  window.localStorage.removeItem(AppConfig.sessionData, encryptedData)
  if (cb) cb()
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
export const formatDate=(e) =>{
  const dt=new Date(parseInt(e))
  return (dt.getMonth()+1)+'/'+dt.getDate()+'/'+dt.getFullYear()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds()
}
export const isLogin = (route)=>{
  // console.log("Check Login Now >>",new Date().getTime())  
  // console.log("Check Login Exp >>",getSession(AppConfig.sessionExp))
  // console.log("Check Login Exped duration >>",new Date().getTime()-getSession(AppConfig.sessionExp))

  if(_.isEmpty(getSession(AppConfig.sessionUserData)) || new Date().getTime()>=getSession(AppConfig.sessionExp)){
      destroySession()
      window.location="/"
      if(route)
      {
        Swal.fire({
          title: 'Expire',
          text: 'Session expired or your not logged in please relogin to your account',
          icon: 'error',
          confirmButtonText: 'Ok',
          onClose:()=>window.location="/"
        })
      }
    }
    else{
        console.log("still valid")
    }
}
export const formValidation=(str,input_name=null,rules)=>
{
  
    let err=[]
    if(_.isEmpty(str))
    {
      if(!input_name || _.isEmpty(input_name)){ err.push("Sorry input can't be empty") }
      else{ err.push(`Sorry input <strong>${input_name}</strong> can't be empty</li>`) }
    }
    else
    {
      if(_.has(rules,'email')) //Email required
      { 
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str))){ err.push(`<li>Email not valid for input <strong>${input_name}</strong></li>`); }
      }
      if(_.has(rules,'max_length')) //Max length
      {
        if((str.length<=rules.max_length)){ err.push(`<li>Sorry character length not longer than ${rules.max_length} for input <strong>${input_name}</strong></li>`) }
      } 
      if(_.has(rules,'min_length')) //Min length
      {
        if((str.length<rules.min_length)){ err.push(`<li>Sorry character length not shorter than ${rules.min_length} for input <strong>${input_name}</strong></li>`) } 
      }
      if(_.has(rules,'special_character')) //Min length
      {
        if(!/\W/.test(str)){ err.push(`<li>Special character not allowed for input ${rules.max_length} for input <strong>${input_name}</strong></li>`) } 
      }  
    }
  
  let isValidate=false
  let value=null
  if(err.length>0){ isValidate=true }
  else( value = str )
  return { isValidate,value,err }
}
export const errorPopup = (errs)=>{
  console.log("Errors>>>",errs)
  const htmlerrs="<div style='color:red'>"+_.flatten(errs).join("").toString()+"</div>"
  Swal.fire({
    title: '<strong>Input error</strong>',
    icon: 'error',
    html:htmlerrs,
    showCloseButton: true,
    confirmButtonText:"Ok"
  })
} 
export const generateConcalURL = (roomId,type,displayname)=>{
    return
}
