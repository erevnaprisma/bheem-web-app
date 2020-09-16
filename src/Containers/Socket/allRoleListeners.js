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

//On first entermeeting
export const checkMeetingLockStatus=  (socketIo) =>{
  socketIo.on('meetingStatus',async msg=>{
      console.log("SOOOOKKKEETTT meetingHasCreated>>>>", msg)
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
export const onMeetingEnd = (socketIo) =>{
    socketIo.on('endMeeting',msg=>{
        console.log("SOOOOKKKEETTT endMeeting>>>>", msg)  
    })
}
  // listening to meeting error
export const onMeetingError = (socketIo) =>{
  socketIo.on('meetingError', (msg) => {
      Swal.fire({
        title: 'Failed Join to Meeting',
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