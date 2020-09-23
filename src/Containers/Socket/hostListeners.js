import Swal from 'sweetalert2'
//utils
import {isLoggedIn, getSession, setSession,isValuePropertyExist} from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
//socket
import io from 'socket.io-client'
import {store} from '../Container'
import _ from 'lodash'
//sagas
import {doCreateMeeting,} from '../../Containers/HostMeeting/sagas'
//actions
import SocketActions from '../../Containers/Streaming/redux'
import JoinActions from '../../Containers/JoinMeeting/redux'
import socketIo from './socketListeners'



export const onParticipantJoinToParticipantList = (socketIo)=>{
  socketIo.on('userHasJoinMeeting', async(msg) => {
      console.log("SOOOOKKKEETTT ADD PARTICIPANT userHasJoinMeeting>>>>", msg)
      const {listParticipant} = store.getState().streaming
      let list = [...listParticipant]
      let isExist=list.filter(e=> e.userId === msg.userId)
      // const isUser=list.filter(r=> r.userId == msg.userId)
      if(getSession(AppConfig.sessionMeeting).role === 'host'){
        const {listWaitingRoom,listOnJoining} = store.getState().streaming
      
        let lst=[...listOnJoining]
        store.dispatch(SocketActions.removeFromJoiningList({listOnJoining:lst.filter(e=>e != msg.userId)}))
        
        store.dispatch(SocketActions.putToJoiningList({
          listWaitingRoom: _.flatten(listWaitingRoom).filter(e=>e.userId != msg.userId)
        }))
      }

     if(_.isEmpty(isExist)){
        msg.role=msg.role.toLowerCase()
        list.push({fullName:msg.fullName,role:msg.role,userId:msg.userId})
        store.dispatch(SocketActions.addParticipant({
          listParticipant: _.flatten(list)
        }))
     }
  })
}


export const onParticipantJoinToWaitingList = (socketIo)=>{
  socketIo.on('sendRequestToHost', async(msg) => {
      console.log("SOOOOKKKEETTT sendRequestToHost>>>>", msg)
      console.log('Sessuion meeting >>',getSession(AppConfig.sessionMeeting));
      if(getSession(AppConfig.sessionMeeting).role === 'host'){
        const {listWaitingRoom} = store.getState().streaming
        let list = []
        list.push(msg)
        list.push(listWaitingRoom)
        store.dispatch(SocketActions.addParticipant({
          listWaitingRoom: _.flatten(list)
        }))
      }
  })
}

export const onNewWaitingList = (socketIo) =>{
  socketIo.on('newWaitingList', async(msg)=>{
    console.log("SOOOOKKKEETTT newWaitingList>>>>", msg)
    const listWaitingRoom=msg 
    store.dispatch(SocketActions.getListParticipant({listWaitingRoom}))
  })
}



export const onSuccessAdmitUser = (socketIo) =>{
    socketIo.on('succeessfullyAdmit', (msg) => {
      console.log("SOOOOKKKEETTT succeessfullyAdmit>>>>", msg)
      
    })
}

export const onSuccessRejectUser = (socketIo) =>{
    socketIo.on('successfullyReject', (msg) => {
      console.log("SOOOOKKKEETTT successfullyReject>>>>", msg)
       const {listParticipant, listWaitingRoom} = store.getState().streaming
        let list = []
        //pop from waitinglist
        list.push(listWaitingRoom)
        store.dispatch(SocketActions.kickParticipant({
          listWaitingRoom: _.flatten(list).filter(e=>e.userId != msg.userId)
        }))
    })
}
export const onGetWaitingList = (socketIo)=>{
    socketIo.on('newWaitingList',msg=>{
      console.log("SOOOOKKKEETTT newWaitingList>>>>", msg)
    })
}