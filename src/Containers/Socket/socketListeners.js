import Swal from 'sweetalert2'
//utils
import {isLoggedIn, getSession, setSession} from '../../Utils/Utils'
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

const socketIo = io(AppConfig.socketUrl)


socketIo.on('requestToJoinHost', (msg) => {
  console.log("SOOOOKKKEETTT User joined>>>>", msg)
})

/////////////////HOST///////////////// On user join to meeting
socketIo.on('sendRequestToHost', async(msg) => {
  console.log("SOOOOKKKEETTT User joined>>>>", msg)
  console.log('API bheem !>>>>>',window.apiBheem)
  const {listParticipant, listWaitingRoom} = store.getState().streaming
  let list = []
  list.push(msg)
  list.push(listWaitingRoom)
  store.dispatch(SocketActions.addParticipant({
    listWaitingRoom: _.flatten(list)
  }))
})

//On first entermeeting
socketIo.on('meetingList',msg=>{
  console.log("SOOOOKKKEETTT listmeeting>>>>", msg) 
})

//On end meeting
socketIo.on('endMeeting',msg=>{
  console.log("SOOOOKKKEETTT end meeting>>>>", msg)  
})

//on successfully join to meeting
socketIo.on('succeessfullyAdmit', (msg) => {
  console.log("SOOOOKKKEETTT admitted>>>>", msg)
  const {listParticipant, listWaitingRoom} = store.getState().streaming
  let lstWaiting = []
  //pop from waitinglist
  lstWaiting.push(listWaitingRoom)
  
  store.dispatch(SocketActions.addParticipant({
    listWaitingRoom: _.flatten(lstWaiting).filter(e=>e.userId != msg.userId)
  }))

  let lstParticipant = []
  //push to participant list
  lstParticipant.push(listParticipant)
  lstParticipant.push(msg)
  store.dispatch(SocketActions.addParticipant({
    listParticipant: _.flatten(lstParticipant)
  }))
})

//on successfully reject join
socketIo.on('successfullyReject', (msg) => {
  console.log("SOOOOKKKEETTT rejected>>>>", msg)
  const {listParticipant, listWaitingRoom} = store.getState().streaming
  let list = []
  //pop from waitinglist
  list.push(listWaitingRoom)
  store.dispatch(SocketActions.kickParticipant({
    listWaitingRoom: _.flatten(list).filter(e=>e.userId != msg.userId)
  }))
})

/////////////////CLIENT///////////////
// Step 1 Join | listening meeting need permission
socketIo.on('needPermission', async(msg) => {
  console.log('API bheem !>>>>>',window.apiBheem)
  console.log("SOOOOKKKEETTT needpermission>>>>", msg)
  if (msg == "Waiting for host approval") {
    store.dispatch(JoinActions.joinMeetingDone({isNeedPermissionToJoin: true}))
  } else {
    const {meetingId} = await store.getState().joinmeeting
    await setSession({
      [AppConfig.sessionMeeting]: {
        meetingId,
        needRequestToJoin: false,
        role: 'participant'
      }
    })
    // window.location = '/concal/' + meetingId
  }
})
//Step 2 Join | listening meeting on accept
socketIo.on('userPermission', async(msg) => {
  console.log("SOOOOKKKEETTT User permission soket>>", msg)
  const meetingId = store.getState().streaming.meetingId
  if (msg === 'REJECT') {
    await store.dispatch(JoinActions.joinMeetingDone({isNeedPermissionToJoin: false}))
    await Swal.fire({
      title: 'Failed to Join Meeting',
      text: 'Sorry your request to join has been rejected by host',
      icon: 'error',
      confirmButtonText: 'Ok',
    })
  } 
  else
  {
    const userData = getSession(AppConfig.sessionUserData)
    await setSession({
      [AppConfig.sessionMeeting]: {
        meetingId: msg.meetingId,
        role: msg.role
      }
    })
    window.location = '/concal/' + msg.meetingId
  } 
})

// listening to meeting error
socketIo.on('meetingError', (msg) => {
  Swal.fire({
    title: 'Failed Join to Meeting',
    text: msg,
    icon: 'error',
    confirmButtonText: 'Ok',
    onClose: () => store.dispatch(JoinActions.joinMeetingDone())
  })
})

//native listener
socketIo.on('disconnect', () => {
  console.log("SOOOOKKKEETTT ta diskonek>>>", socketIo.disconnected);
});
socketIo.on('reconnecting', (e) => {
  console.log("SOOOOKKKEETTT rekonekting>>>", e);
});
socketIo.on('connect_error', (error) => {
  console.log("SOOOOKKKEETTT konek error>>>", error);
});
socketIo.on('error', (error) => {
  console.log("SOOOOKKKEETTT error>>", error)
});

export default socketIo