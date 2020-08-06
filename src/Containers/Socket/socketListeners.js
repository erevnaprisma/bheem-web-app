import Swal from 'sweetalert2'
//utils
import { isLoggedIn, getSession,setSession } from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
//socket
import io from 'socket.io-client'
import {store} from '../Container'
import _ from 'lodash' 
//sagas
import {doCreateMeeting} from '../../Containers/HostMeeting/sagas'
//actions
import SocketActions from '../../Containers/Streaming/redux'
import JoinActions from '../../Containers/JoinMeeting/redux'

const socketIo=io(AppConfig.socketUrl)


socketIo.on('requestToJoinHost', (msg) => {
  console.log("SOOOOKKKEETTT User joined>>>>",msg)
})

//host'S
//On user join to meeting
socketIo.on('sendRequestToHost', async (msg) => {
  console.log("SOOOOKKKEETTT User joined>>>>",msg)
  const {listParticipant,listWaitingRoom} = store.getState().streaming
  let list=[]
  list.push(msg)
  list.push(listWaitingRoom)
  store.dispatch(SocketActions.addParticipant({listWaitingRoom:_.flatten(list)}))
})

//on successfully join to meeting
socketIo.on('succeessfullyAdmit', (msg) => {
  console.log("SOOOOKKKEETTT admitted>>>>",msg)
  const {listParticipant,listWaitingRoom} = store.getState().streaming
  let list=[]
  //pop from waitinglist
  list.concat(listWaitingRoom)
  list.pop({userId:msg.userId})
  console.log("Waiting room>>>",list)
  store.dispatch(SocketActions.addParticipant({listWaitingRoom:_.flatten(list)})) 
  
  //push to participant list
  list.concat(listParticipant)
  list.push(msg)
  store.dispatch(SocketActions.addParticipant({listParticipant:_.flatten(list)})) 
})


//on successfully reject join
socketIo.on('successfullyReject', (msg) => {
  console.log("SOOOOKKKEETTT rejected>>>>",msg)
  const {listParticipant,listWaitingRoom} = store.getState().streaming
  let list=[]
  //pop from waitinglist
  list.concat(listWaitingRoom)
  list.pop({userId:msg.userId})
  store.dispatch(SocketActions.kickParticipant({listWaitingRoom:_.flatten(list)})) 
})





//participant's

// listening meeting need permission
socketIo.on('needPermission', async (msg) => {
  if(msg ==  "Waiting for host approval")
  {
    store.dispatch(JoinActions.joinMeetingDone({isNeedPermissionToJoin:true}))
  }
  else{
    const {meetingId} = await store.getState().joinmeeting
    await setSession({[AppConfig.sessionMeeting]: { meetingId,needRequestToJoin:false,role:'participant' }})
    console.log("ses meeting soket>>>>",getSession(AppConfig.sessionMeeting))
    // await window.location='/concal/'+meetingId
  } 
})

socketIo.on('userPermission', (msg) => {
  console.log("SOOOOKKKEETTT User permission soket>>",msg)
  const meetingId=store.getState().streaming.meetingId
  if(typeof msg == 'object') window.location='/concal/'+msg.meetingId
  else store.dispatch(JoinActions.joinMeetingDone({isNeedPermissionToJoin:false}))
})


// listening to meeting error
socketIo.on('meetingError', (msg) => {
  Swal.fire({
    title: 'Failed Join to Meeting',
    text: msg,
    icon: 'error',
    confirmButtonText: 'Ok',
    onClose:()=>store.dispatch(JoinActions.joinMeetingDone())
  }) 

  // if(getSession(AppConfig.sessionMeeting).role!="host")
  // {
  //   Swal.fire({
  //     title: 'Failed Join to Meeting',
  //     text: msg,
  //     icon: 'error',
  //     confirmButtonText: 'Ok',
  //     onClose:()=>store.dispatch(JoinActions.joinMeetingDone())
  //   }) 
  // }
})

socketIo.on('disconnect', () => {
  console.log("SOOOOKKKEETTT ta diskonek>>>",socketIo.disconnected);
});
socketIo.on('reconnecting', (e) => {
  console.log("SOOOOKKKEETTT rekonekting>>>",e);
});
socketIo.on('connect_error', (error) => {
  console.log("SOOOOKKKEETTT konek error>>>",error);
});
socketIo.on('error', (error) => {
  console.log("SOOOOKKKEETTT error>>",error)
});

export default socketIo