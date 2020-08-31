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



export const onParticipantJoin = (socketIo)=>{
    socketIo.on('sendRequestToHost', async(msg) => {
        console.log("SOOOOKKKEETTT User joined>>>>", msg)
        const {listParticipant, listWaitingRoom} = store.getState().streaming
        let list = []
        list.push(msg)
        list.push(listWaitingRoom)
        store.dispatch(SocketActions.addParticipant({
          listWaitingRoom: _.flatten(list)
        }))
      })
}


export const onSuccessAdmitUser = (socketIo) =>{
    socketIo.on('succeessfullyAdmit', (msg) => {
        console.log("SOOOOKKKEETTT admitted>>>>", msg)
        const {listParticipant, listWaitingRoom, listOnJoining} = store.getState().streaming
        //pop from joining list
        let list=[]
        store.dispatch(SocketActions.putToJoiningList({
            listOnJoining: _.flatten(list.filter(r=> r != msg.userId ))
        }))

        let lstWaiting = []        
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
}

export const onSuccessRejectUser = (socketIo) =>{
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
}
export const onGetWaitingList = (socketIo)=>{
    socketIo.on('newWaitingList',msg=>{
        console.log("SOOOOKKKEETTT waitinglist>>>>", msg)
        if(isValuePropertyExist({obj:getSession(AppConfig.sessionMeeting),propName:'role',type:'valueOnly',value:'host'})){
        console.log("DISPATCH waitinglist>>>>")
        const listWaitingRoom=msg
        store.dispatch(SocketActions.getListParticipant({listWaitingRoom}))
        }
    })
}