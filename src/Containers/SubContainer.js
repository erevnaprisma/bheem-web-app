import PropTypes from 'prop-types'
import React,{Suspense} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isLoggedIn, getSession,removeSpecificSession} from '../Utils/Utils'
import AppConfig from '../Config/AppConfig'
import Header from  './Header'
import {isLogin} from '../Utils/Utils'
import ModalLogout from '../Components/Modal/Logout'
import Footer from '../Components/Footer'
import _ from 'lodash'
//Actions
import JoinActions from '../Containers/JoinMeeting/redux'
import MeetingActions from '../Containers/Streaming/redux'
import Swal from 'sweetalert2'
//Actions

class SubContainer extends React.PureComponent {
  constructor(props){
    super(props)
  }
  // exclusion
  _excludePages(pg,footer){
      if(footer){
        if(pg.includes(window.location.pathname)) return true
        else  return false
      }
      else{
        if(window.location.pathname.split('/')[1] == 'concal' && !_.isEmpty(window.location.pathname.split('/')[2])){
          
          return true
        }
        else{
          console.log('Pagess else');
          if(pg.includes(window.location.pathname)) return true
          else  return false
        }
      }
  }
  async componentWillMount(){
      let pg=['/','/home','/login','/waiting-room','/join-meeting','/signup'] //List pages that can be entered without login
      if(!this._excludePages(pg)){
        isLogin(true)
      } 
      pg=[]
      if(!this._excludePages(pg))
      {
        await removeSpecificSession(AppConfig.sessionMeeting)
      }
  }
  async componentDidMount(){
    var prevLocalStorage=getSession(AppConfig.sessionUserData)
    window.addEventListener('storage',()=>{
      if(!_.isEmpty(prevLocalStorage)&&_.isEmpty(getSession(AppConfig.sessionUserData))){
        window.location="/"
      }
    })
    if(prevLocalStorage)
    {
      isLogin()
    }
  }
  render (){
    //Pages using footer
    const pgFooter=['/','/home','me/manage-meeting','me/profile','me/manage-settings']
    const loc = window.location.pathname
    return (
      <div>
        <ModalLogout/>
        {this.props.children}
        {this._excludePages(pgFooter,true) && <Footer/>}
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
