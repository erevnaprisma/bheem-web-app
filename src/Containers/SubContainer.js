import PropTypes from 'prop-types'
import React,{Suspense} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isLoggedIn, getSession } from '../Utils/Utils'
import AppConfig from '../Config/AppConfig'
import Header from  './Header'
import {isLogin} from '../Utils/Utils'
import ModalLogout from '../Components/Modal/Logout'
import Footer from '../Components/Footer'
import io from 'socket.io-client'
import _ from 'lodash'
import {Listeners} from './Socket/socketListeners'
//Actions
import JoinActions from '../Containers/JoinMeeting/redux'
import MeetingActions from '../Containers/Streaming/redux'
import Swal from 'sweetalert2'
//Actions


const socketIo=io(AppConfig.socketUrl)
class SubContainer extends React.PureComponent {
  constructor(props)
  {
    super(props)
    this._addUserlist=this._addUserlist.bind(this)
  }
  _exclude(pg)
  {
    if(window.location.pathname.split('/')[1] == '/concal' && !_.isEmpty(window.location.pathname.split('/')[2]))
    {
      return true
    }
    else
    {
      if(pg.includes(window.location.pathname)) return true
      else  return false
    }
  }
  _addUserlist(usr)
  {
    let listParticipant=this.props.listUser
    this.props.listUser({listParticipant})
  }
  
  
  async componentWillMount(){
    // console.log("subcontaioner>>>",_.isEmpty(window.location.pathname.split('/')[2]))
    const pg=['/','/home','/login','/waiting-room','/join-meeting','/signup','/concal/']
    console.log("Subcont>>",this._exclude(pg))
    // if(!this._exclude(pg))
    // {
    //   isLogin()
    //   if(window.location.pathname == '/manage-meeting') isLogin(true) 
    // }
    Listeners(socketIo,{
      addUserlist:(e)=>this._addUserlist(e)
    })
  } 
  static _emitter(eventName,data)
  {
    if(_.has(data,'socketId')) data.socketId = socketIo.id
    socketIo.emit(eventName,data)
  }

  render () {
    
    console.log('render window.location ', window.location.pathname)
    const pgFooter=['/','/home','/manage-meeting']
    const loc = window.location.pathname
    return (
      <div>
        <ModalLogout/>
        {this.props.children}
        {this._exclude(pgFooter) && <Footer/>}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    participants:state.streaming.listParticipant
  }
}
const mapDispatchToProps = dispatch => {
  return{
    // checkRoomisExist:data=>dispatch(JoinActions.checkIsexistMeeting(data))
    listUser:data=>dispatch(MeetingActions.doStreaming(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubContainer)
