
import Swal from 'sweetalert2'
import { isLoggedIn, getSession } from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
export const Listeners = (socketIo,{addUserlist}=>{
    // if(window.location.pathname.split('/')[1] == '/concal')  
    // {
        var data=null
        socketIo.on('requestToJoinHost', (socket) => {
          console.log('socket=', socket)
          data = socket
          addUserlist(socket)
        })
        let userInfo
        socketIo.on('sendRequestToHost', (msg) => {
          console.log("Someone is join")
          // this._addUserlist()
        })
        
        // listening to meeting error
        socketIo.on('meetingError', (msg) => {
          if(getSession(AppConfig.sessionMeeting).role!="host")
          {
            Swal.fire({
              title: 'Failed Join to Meeting',
              text: msg,
              icon: 'error',
              confirmButtonText: 'Ok'
            }) 
          }
        })
        // listening meeting need permission
        socketIo.on('needPermission', (msg) => {
          console.log("Need permission soket>>",msg)
        })

        socketIo.on('userPermission', (msg) => {
          console.log("User permission soket>>",msg)
        })
    // }
}