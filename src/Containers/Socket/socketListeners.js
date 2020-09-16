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
import {onGetAdmitStatus,onGetIsNeedPermission} from './clientListeners'
import {onParticipantJoinToParticipantList,onParticipantJoinToWaitingList,onNewWaitingList,onGetWaitingList,onSuccessAdmitUser,onSuccessRejectUser} from './hostListeners'
import {onMeetingEnd,onReceiveMeetingList,onMeetingError,onDisconnect,onConnectError,onReconnecting,onError} from './allRoleListeners'

const socketIo = io(AppConfig.socketUrl)

onGetAdmitStatus(socketIo)
onGetIsNeedPermission(socketIo)

onParticipantJoinToWaitingList(socketIo)
onParticipantJoinToParticipantList(socketIo)
onGetAdmitStatus(socketIo)
onGetIsNeedPermission(socketIo)


onReceiveMeetingList(socketIo)

onNewWaitingList(socketIo)
onGetWaitingList(socketIo)
onSuccessAdmitUser(socketIo)
onSuccessRejectUser(socketIo)

onMeetingEnd(socketIo)
onMeetingError(socketIo)
onDisconnect(socketIo)
onConnectError(socketIo)
onReconnecting(socketIo)
onError(socketIo)



export default socketIo