import React, { Component } from 'react'
import Helmet from 'react-helmet'
import AppConfig from '../../Config/AppConfig'
import {getSession} from '../../Utils/Utils'
import {connect} from 'react-redux'
import {Images,Colors} from '../../Themes'
import Loader from '../../Components/Loader'
import JoinActions from '../../Containers/JoinMeeting/redux'
import StreamingActions, { setApi } from '../../Containers/Streaming/redux'

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import './video-stream.css'
import swal from 'sweetalert2'
import { stat } from 'fs'
import Header from '../../Containers/Header'
import Draggable from "react-draggable";
import ListParticipant from '../../Components/ConcalComponents/ListParticipant'
import socketIo from '../../Containers/Socket/socketListeners'
import {BheemVidStreamComponent,do_mute_specific,do_mute_everyone,toogle_lobby} from './BheemVidStreamComponent'

class PageBheem extends Component {
  constructor(props)
  {
    super(props)
    this._allowed=this._allowed.bind(this)
    this._notAllowed=this._notAllowed.bind(this)
    this._listParticipant=this._listParticipant.bind(this)
    this._admitParticipant=this._admitParticipant.bind(this) 
    this._rejectParticipant=this._rejectParticipant.bind(this) 
    this._handleSidebarUserList=this._handleSidebarUserList.bind(this)
    this.state={
      isShowSidebar:true,
      listParticipantContainerId:'list-users-joined',
      videoStreamerContainerId:'bheem-video-container'
    }
  }

  //Host functions
  _admitParticipant(userId,socketId)
  {
    const userData=getSession(AppConfig.sessionUserData)
    const meetingId=this.props.match.params.room
    socketIo.emit('admitUserToJoinHost', { meetingId, userId: userId, hostId:userData.id, socketId: socketId })
  } 
  _rejectParticipant(userId,socketId)
  {
    const userData=getSession(AppConfig.sessionUserData)
    const meetingId=this.props.match.params.room
    socketIo.emit('rejectUserToJoinHost', {socketId,meetingId, userId, hostId:userData.id })
  }  
  //Host functions

  _listParticipant()
  {
    const waitingRoom=[
                  {userId:'34234234234',username:'ungke aloringatu pangaribuan',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                  {userId:'34234234234',username:'ungke',socketId:'342342342334'},
                ]
    const participants=[
      {userId:'34234234234',fullName:'ungke aloringatu pangaribuan',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
      {userId:'34234234234',fullName:'ungke',socketId:'342342342334'},
    ]
    
    console.log("Bhm list Waiting rooom comp>>>",waitingRoom)
    console.log("Bhm list participant comp>>>",participants)
    return(
      // <Draggable>
          <div className="bheem-list" style={{background:'white'}} id={this.state.listParticipantContainerId}>
                  <div className="main-header-list">Participants ({waitingRoom.length+participants.length})</div>
                  <div>
                      <label className="mt-2 head-list-participant">Waiting room({waitingRoom.length})</label>
                        <ul className="container-list-waiting-room" >
                          {waitingRoom.length>0 && waitingRoom.map((r,i)=>(
                            <li key={i}>
                                <div className="container-userinfo-wrapper">
                                  <div style={{alignSelf:'center',width:20,height:20,borderRadius:'100%',background:'black'}}/>
                                  <span>{r.username}</span> 
                                </div>
                                <div className="container-button-wrapper">
                                  <button className="" onClick={()=>this._admitParticipant(r.userId,r.socketId)}>Admit</button>
                                  &nbsp;
                                  <button onClick={()=>this._rejectParticipant(r.userId,r.socketId)}>Reject</button>
                                </div>
                            </li>
                          ))}
                        </ul>
                  </div>
                  {participants.length>0 &&
                    <div>
                        <label className="mt-2 head-list-participant">List participant room({participants.length})</label>
                          <ul className="container-list-joined">
                            {participants.map((r,i)=>(
                                <li  key={i}>
                                  <div className="container-userinfo-wrapper">
                                    <div style={{alignSelf:'center',width:20,height:20,borderRadius:'100%',background:'black'}}/>
                                    <span>{r.fullName}</span> 
                                  </div>
                                  <div className="container-button-wrapper">
                                    <button className="" onClick={()=>this._admitParticipant(r.userId,r.socketId)}>Mute</button>
                                    &nbsp;
                                    <button>Put to waiting room</button>
                                  </div>
                                </li>
                            ))}
                          </ul>
                    </div>
                  }
          </div>
      //</Draggable> 
    )
  }

  _notAllowed(){
    const meetingId=this.props.match.params.room
    const { topic,allowed,needPermission,isExist,isRequesting,meetingData } = this.props
    
    return(
      <div>
        <Helmet>
          <title>{'Bheem meeting'}</title>
        </Helmet>
        <Header/>
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
                  <div className="col-lg-10 col-md-2 ml-auto mr-auto">
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
    const { topic,allowed,needPermission,isExist,isRequesting,meetingData } = this.props
    const userData=getSession(AppConfig.sessionUserData)
    const opt={
                 containerId:this.state.videoStreamerContainerId,
                 className:'bheem-video-stream',
                 isMuteVideo:this.state.jVideo,
                 isMuteAudio:this.state.jAudio,
                 roomName:'Coba',
                 roomId:meetingId,
                 userInfo:{
                  id:userData.id||navigator.userAgent,
                  email:userData.email||'Anonymous@mail.com',
                  displayName:userData.fullName||'anonymous'
                 }
              }
    
    return(
      <div>
        <Helmet>
          <title>{'Bheem Conference Call'}</title>
        </Helmet> 
          <div className="row" style={{margin:0,padding:0}}>
            <BheemVidStreamComponent style={{height:'100%',width:'100%'}}  opt={opt}/>
            {this._listParticipant()}
          </div>
      </div>
    )
  }

  _handleSidebarUserList()
  {
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

  async componentWillMount()
  {
    this.props.doReset()
    const meetingId=this.props.match.params.room
    await this.props.checkIsExist({meetingId})
  }
  componentDidMount()
  {
    //open sidebar
    let mainSize="80vw"
    let sidebarSize="20vw"
    document.getElementById(this.state.videoStreamerContainerId).style.width = mainSize;
    document.getElementById(this.state.listParticipantContainerId).style.width = sidebarSize;
    document.getElementById(this.state.listParticipantContainerId).style.display = 'inline-block';

    const meetingId=this.props.match.params.room
    if(getSession(AppConfig.sessionMeeting) && getSession(AppConfig.sessionMeeting).role == "host") 
    {
      socketIo.emit('createMeeting', {meetingId})
    }
  }

  render () {
    const meeting=getSession(AppConfig.sessionMeeting)
    let ApiStreaming=null
    console.log("api streaming>>>>",this.state.apiBheem)
    console.log("Session meeting>>",getSession(AppConfig.sessionMeeting))
    return (
      <div style={{background:`url(${Images.HomeIllus}) center`,backgroundSize:'contain'}}>
        <button style={{position:'absolute'}} onClick={()=> this._handleSidebarUserList()}>toogle audio</button> 
        {meeting&& this._allowed()}
        {!meeting&& this._notAllowed()}
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isRequesting: state.joinmeeting.isRequesting,
    errors:state.joinmeeting.errors,
    status: state.joinmeeting.status,
    isExist: state.joinmeeting.isExist,
    needPermission:state.streaming.needPermission,
    allowed:state.streaming.allowed,
    listparticipant:state.streaming.listParticipant,
    listWaitingRoom:state.streaming.listWaitingRoom,
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
