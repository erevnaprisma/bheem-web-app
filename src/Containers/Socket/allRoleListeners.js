import Swal from 'sweetalert2'
//utils
import {isLoggedIn, removeSpecificSession,getSession, setSession,isValuePropertyExist} from '../../Utils/Utils'
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

export const muteUnmuteHandlerAll=  (socketIo) =>{
  socketIo.on('participantMuteAndVideoHandler', msg=>{
      console.log("SOOOOKKKEETTT participantMuteAndVideoHandler>>>>", msg)
      if(msg.message === 'mute'){
        store.dispatch(SocketActions.doToggleAudio({toogleVideo:true}))
      }else if(msg.message === 'unmute'){
        store.dispatch(SocketActions.doToggleAudio({toogleVideo:false}))
      }else if(msg.message === 'off video'){
        store.dispatch(SocketActions.doToggleVideo({toogleVideo:false})) 
      }else if(msg.message === 'on video'){
        store.dispatch(SocketActions.doToggleVideo({toogleVideo:true})) 
      }
  })
}

//On participant left
export const onUserLeeft = (socketIo) =>{
  socketIo.on('successfullyRemovedUser', (msg) => {
    console.log("SOOOOKKKEETTT participantMuteAndVideoHandler>>>>", msg)
    const {listParticipant} = store.getState().streaming
    let list = [...listParticipant]

    store.dispatch(SocketActions.removeFromJoiningList({listParticipant:list.filter(e=> e.userId)}))  
  }) 
}

//On first entermeeting
export const checkMeetingLockStatus=  (socketIo) =>{
  socketIo.on('meetingStatus',async msg=>{
      console.log("SOOOOKKKEETTT meetingHasCreated>>>>", msg)
      // await store.dispatch(SocketActions.doLockMeeting({isLock}))
      // Swal.fire(msg.message)
  })
}

//get meeting list
export const onReceiveMeetingList=  (socketIo) =>{
    socketIo.on('meetingList',async msg=>{
        console.log("SOOOOKKKEETTT meetingList>>>>", msg)
        const listParticipant= msg.meetingList 
        await store.dispatch(SocketActions.getListParticipant({listParticipant}))
    })
}
//On end meeting
export const onMeetingEnd =  (socketIo) =>{
    socketIo.on('endMeeting',async (msg)=>{
        console.log("SOOOOKKKEETTT endMeeting>>>>", msg)
        await removeSpecificSession(AppConfig.sessionMeeting)
        window.location.reload();
        Swal.fire({
          text: 'Meeting has been ended by host',
          confirmButtonText: 'Ok',
          onClose: () => window.location="/"
        }) 
    })
}
  // listening to meeting error
export const onMeetingError = (socketIo) =>{
  socketIo.on('meetingError', (msg) => {
      Swal.fire({
        title: 'Something Error',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Ok',
        onClose: () => store.dispatch(JoinActions.joinMeetingDone())
      })
    })
}
  
export const onDisconnect= (socketIo) =>{
  socketIo.on('disconnect', () => {
    console.log("SOOOOKKKEETTT disconnect>>>", socketIo.disconnected);
  });
}
export const onReconnecting = (socketIo) =>{
  socketIo.on('reconnecting', (e) => {
    console.log("SOOOOKKKEETTT reconnecting>>>", e);
  });
}
export const onConnectError = (socketIo) =>{
  socketIo.on('connect_error', (error) => {
    console.log("SOOOOKKKEETTT connect_error>>>", error);
  });
}
export const onError = (socketIo) =>{
  socketIo.on('error', (error) => {
    console.log("SOOOOKKKEETTT error>>", error)
  });
}