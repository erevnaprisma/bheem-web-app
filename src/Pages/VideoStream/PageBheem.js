import React, { Component } from 'react'
import Helmet from 'react-helmet'
import AppConfig from '../../Config/AppConfig'
import {getSession,updateSpecificSesssion,isValuePropertyExist} from '../../Utils/Utils'
import {connect} from 'react-redux'
import {Images,Colors} from '../../Themes'
import Loader from '../../Components/Loader'
import JoinActions from '../../Containers/JoinMeeting/redux'
import StreamingActions from '../../Containers/Streaming/redux'

import _ from 'lodash'

import {Image} from '../../Themes'

import ListParticipant from './BheemListParticipant'
import {BheemVidStreamComponent} from './BheemVidStreamComponent'

import './video-stream.css'
import socketIo from '../../Containers/Socket/socketListeners'

import BheemListParticipant from './BheemListParticipant'

class PageBheem extends Component {
  constructor(props){
    super(props)
    this._allowed=this._allowed.bind(this)
    this._notAllowed=this._notAllowed.bind(this)
    this.state={
      isShowSidebar:true,
      listParticipantContainerId:'list-users-joined',
      videoStreamerContainerId:'bheem-video-container'
    }
  }


  _handleSidebarUserList(){
        if(document.getElementById(this.state.videoStreamerContainerId) && document.getElementById(this.state.listParticipantContainerId)){
          let mainSize="100vw"
          let sidebarSize=""
          if(!this.state.isShowSidebar){
              this.setState({isShowSidebar:true})
              document.getElementById(this.state.videoStreamerContainerId).style.width = mainSize;
              document.getElementById(this.state.listParticipantContainerId).style.width = sidebarSize;
          }
          else{
              this.setState({isShowSidebar:false})
              mainSize="80vw"
              sidebarSize="20vw"
              document.getElementById(this.state.videoStreamerContainerId).style.width = mainSize;
              document.getElementById(this.state.listParticipantContainerId).style.width = sidebarSize;
          }
        }
  }

  _notAllowed(){
    const meetingId=this.props.match.params.room
    const { topic,allowed,needPermission,isExist,isRequesting,meetingData } = this.props
    return(
      <div>
        <Helmet>
          <title>{'Bheem meeting'}</title>
        </Helmet>
        {(getSession(AppConfig.sessionMeeting).needRequestToJoin && getSession(AppConfig.sessionMeeting).meetingId == meetingId &&
          <div className="page-header" style={{background:'#fff' ,backgroundSize: 'cover', backgroundPosition: 'top center'}}>
            {/* <div className="container"> */}
              <div className="row">
                <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                  <div className="card card-login" style={{background:Colors.primaryRed}}>    
                    <center>
                        <Loader className="mx-auto" color="#fff"/>
                        <p style={{color:'#fff'}}><b>Joining the room..</b></p>
                        <p style={{color:'#fff'}}>Waiting for host to accept your request</p>
                    </center>
                  </div>
                </div>
              </div>
            {/* </div> */}
          </div>
        )}
        {(!getSession(AppConfig.sessionMeeting) && getSession(AppConfig.sessionMeeting).meetingId != meetingId &&
          <div>
            <div className="page-header" style={{background:'#fff' ,backgroundSize: 'cover', backgroundPosition: 'top center'}}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 ml-auto mr-auto">
                    <div className="card">    
                      <center>
                          <h2></h2>
                          <img src={Images.LogoMerah} width='30%'/>
                          <br/>
                          <br/>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          </div>
        )}
      </div>
    )
  }
 
  _allowed(){
    const meetingId=this.props.match.params.room
    const { topic,allowed,needPermission,isExist,isRequesting} = this.props
    const meetingData=getSession(AppConfig.sessionMeeting)
    const userData=getSession(AppConfig.sessionUserData)
    //init join meeting 
    const opt={
                 containerId:this.state.videoStreamerContainerId,
                 className:'bheem-video-stream',
                 roomName:getSession(AppConfig.sessionMeeting).title||'Bheeem meeting conference',
                 roomId:meetingId,
                 configOverwrite: { 
                   startWithAudioMuted: !_.isNull(meetingData.isAudio)?meetingData.isAudio:true,
                   startWithVideoMuted: !_.isNull(meetingData.isVideo)?meetingData.isVideo:true
                  },
                 userInfo:{
                  id:userData.id||meetingData.userId,
                  email:userData.email||'Anonymous@mail.com',
                  displayName:userData.fullName||meetingData.fullName
                 }
              }

    console.log('obj. bheem api >> ',opt);
    return(
      <div>
        <Helmet>
          <title>{'Bheem Conference Call'}</title>
        </Helmet> 
          <div className="row" style={{margin:0,padding:0}}>
            <button style={{position:'absolute',zIndex:1000}} onClick={()=>this._handleSidebarUserList()}>Toogle Sidebar</button>
            <BheemVidStreamComponent style={{height:'100%',width:'100%'}}  opt={opt}/>
            <BheemListParticipant meetingId={meetingId}/>
          </div>
      </div>
    )
  }

  async componentWillMount(){
    const meetingData=await getSession(AppConfig.sessionMeeting)
    const meetingId=this.props.match.params.room
    // Get all user list on first join meeting
    socketIo.emit("afterUserJoinMeeting",{fullName:meetingData.fullName,userId:meetingData.userId,meetingId:meetingId})
    this.props.doReset()
    await this.props.checkIsExist({meetingId})
  }

  componentDidMount()
  {
    let mainSize="80vw"
    let sidebarSize="20vw"
    if(document.getElementById(this.state.videoStreamerContainerId) && document.getElementById(this.state.listParticipantContainerId)){
    document.getElementById(this.state.videoStreamerContainerId).style.width = mainSize;
    document.getElementById(this.state.listParticipantContainerId).style.width = sidebarSize;
    document.getElementById(this.state.listParticipantContainerId).style.display = 'flex';
    }
    const meetingId=this.props.match.params.room
    if(getSession(AppConfig.sessionMeeting).role == "host") {
      socketIo.emit('createMeeting', {meetingId})
    }
  }

  render () {
    const meeting=getSession(AppConfig.sessionMeeting)
    return (
      <div style={{background:`url(${Images.HomeIllus}) center`,backgroundSize:'contain'}}>
        {meeting&& this._allowed()}
        {!meeting&& this._notAllowed()}
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isExist: state.joinmeeting.isExist,
    needPermission:state.streaming.needPermission,
    allowed:state.streaming.allowed,
    isLock:state.streaming.isLock,
    meetingData:state.streaming.meetingData
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkIsExist:data => dispatch(JoinActions.checkIsexistMeeting(data)),
    doReset:data => dispatch(StreamingActions.resetStreaming(data)),
  }
}
export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(PageBheem)
