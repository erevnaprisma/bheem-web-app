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

/////////////////CLIENT///////////////
// Step 1 Join | listening meeting need permission
export const onGetIsNeedPermission = (socketIo)=>{
    socketIo.on('needPermission', async(msg) => {
      console.log("SOOOOKKKEETTT needpermission>>>>", msg)
      // console.log('session meeting>>>>>>',getSession(AppConfig.sessionMeeting));
      // console.log('session user>>>>>>',getSession(AppConfig.sessionUserData));
      // if anonymous || not, need permission
      if(msg.message == "Waiting for host approval"){
        store.dispatch(JoinActions.joinMeetingDone({isNeedPermissionToJoin: true}))
        await setSession({
          [AppConfig.sessionMeeting]: {
            title:msg.meetingTitle,
            userId:getSession(AppConfig.sessionUserData).id||msg.userId, //get from session or socket
          }
        })
      }
      //auth/not, doesn't need permission
      else {
        console.log('doesn\'t need permission');
        const {meetingId} = await store.getState().joinmeeting
        await setSession({
          [AppConfig.sessionMeeting]: {
            title:msg.title,
            userId:getSession(AppConfig.userData).id||msg.userId, //get from session or socket
            fullName:getSession(AppConfig.userData).fullName||getSession(AppConfig.sessionMeeting).fullName,
            meetingId,
            role: 'participant'
          }
        })  
        window.location = '/concal/' + meetingId
      }
    })
}
  //Step 2 Join | listening meeting on accept || or doens't need permission
export const onGetAdmitStatus = (socketIo) =>{
    socketIo.on('userPermission', async(msg) => {
      console.log("SOOOOKKKEETTT userPermission>>>>", msg)
      const meetingData=getSession(AppConfig.sessionMeeting)

      if(meetingData.userId === msg.userId){ 
          const meetingData=getSession(AppConfig.sessionMeeting) 
          // returend data {userId,fullName,meetingId,needRequestToJoin,role}
          const meetingId = store.getState().streaming.meetingId
      
          if (msg.message === 'REJECT') {
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
            const meetingData=getSession(AppConfig.sessionMeeting) 
            const userData = getSession(AppConfig.sessionUserData)
            await setSession({
              [AppConfig.sessionMeeting]: {
                userId:userData.id||msg.userId,
                fullName:userData.fullName||meetingData.fullName,
                meetingId: msg.meetingId,
                role: msg.role
              }
            })
            window.location = '/concal/' + msg.meetingId
          }
      }
      else if(msg.message === 'ADMIT'){
        console.log('ON ADMITTT????');
        if(_.isEmpty(getSession(AppConfig.sessionMeeting).meetingId)){
          await store.dispatch(JoinActions.joinMeetingDone({isNeedPermissionToJoin: false}))
          await setSession({
            [AppConfig.sessionMeeting]: {
              title:msg.meetingTitle,
              userId:getSession(AppConfig.sessionUserData).id||msg.userId, //get from session or 
              role:'participant',
              meetingId:msg.meetingId
            }
          }) 
          window.location = '/concal/' + msg.meetingId
        }
      } 
    })
      
}