import React, { Component } from 'react'
import Helmet from 'react-helmet'
import AppConfig from '../../Config/AppConfig'
import {getSession,updateSpecificSesssion,isValuePropertyExist} from '../../Utils/Utils'
import {connect} from 'react-redux'
import {Images,Colors} from '../../Themes'
import Loader from '../../Components/Loader'
import JoinActions from '../../Containers/JoinMeeting/redux'
import StreamingActions, { setApi } from '../../Containers/Streaming/redux'
import _ from 'lodash'

import {Image} from '../../Themes'
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
  constructor(props){
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
  _admitParticipant(data){
    const userData=getSession(AppConfig.sessionUserData)
    const meetingId=this.props.match.params.room
    console.log('data>>>',data);
    if(data.status == 'Anonymous'){
      socketIo.emit('admitUserToJoinHost', { status:'Anonymous',meetingId, userId: data.userId, hostId:userData.id, socketId: data.socketId,username:data.username })
    }
    else{
      socketIo.emit('admitUserToJoinHost', { meetingId, userId: data.userId, hostId:userData.id, socketId: data.socketId, username:data.username})
    }
  } 

  _rejectParticipant(data){
    console.log('reject dataa>>>',data);
    const userData=getSession(AppConfig.sessionMeeting)
    const meetingId=this.props.match.params.room
    if(_.has(data,'status')|| data.status == 'Anonymous'){
      socketIo.emit('rejectUserToJoinHost', {status:'Anonymous',socketId:data.socketId,meetingId, userId:data.userId, hostId:userData.userId})
    }
    else{
      socketIo.emit('rejectUserToJoinHost', {socketId:data.socketId,meetingId, userId:data.userId, hostId:getSession(AppConfig.sessionData).id}) 
    }
  }  

  //Host functions
  _listParticipant()
  {
    const waitingRoom=this.props.listWaitingRoom||[]
    const participants=this.props.listParticipant||[]
    
    // console.log("Bhm list Waiting rooom comp>>>",waitingRoom)
    // console.log("Bhm list participant comp>>>",participants)
    let myMeetingData=getSession(AppConfig.sessionMeeting) //get meeting data
    
    return(
      // <Draggable>
          <div className="bheem-list" style={{background:'white'}} id={this.state.listParticipantContainerId}>
                  <div className="main-header-list">Participants ({waitingRoom.length+participants.length})</div>
                  
                  {getSession(AppConfig.sessionMeeting).role == 'host' &&
                    <div>
                        <label className="mt-2 head-list-participant">Waiting room({waitingRoom.length})</label>
                          <ul className="container-list-waiting-room" >
                            {waitingRoom.length>0 && waitingRoom.map((r,i)=>(
                              <li key={i} className="row">
                                {console.log('data user>>>>',r)}
                                  <div className="container-userinfo-wrapper">
                                    <img style={{alignSelf:'center',width:20,height:20,borderRadius:'100%',background:'black'}} src={Images.Avatar}/>
                                    <span>{r.username}</span> 
                                  </div>
                                  <div className="container-button-wrapper">
                                    <button className="" onClick={()=>this._admitParticipant(r)}>Admit</button>
                                    &nbsp;
                                    <button onClick={()=>this._rejectParticipant(r)}>Reject</button>
                                  </div>
                              </li>
                            ))}
                          </ul>
                    </div>
                  }
                  {participants.length>0 &&
                    <div className="wrapper-list-participant">
                        <label className="mt-2 head-list-participant">List participant room({participants.length})</label>
                        <ul className="container-list-joined ">
                          {participants.map((r,i)=>(
                              <li  key={i} className="row">
                                <div className="container-userinfo-wrapper">
                                  <img style={{alignSelf:'center',width:20,height:20,borderRadius:'100%',background:'black'}} src={Images.Avatar}/>
                                  <span>{r.fullName}</span> 
                                </div>
                                <div className="container-button-wrapper">
                                  {r.userId == myMeetingData.userId && r.role == 'Host' ? `(Me - Host)` : ''}
                                  {r.userId == myMeetingData.userId && r.role != 'Host' ? `(Me)` : ''}
                                  {r.userId != myMeetingData.userId && r.role == 'Host' ? `(Host)` : ''}
                                  &nbsp; 
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
    const { topic,allowed,needPermission,isExist,isRequesting} = this.props
    const meetingData=getSession(AppConfig.sessionMeeting)
    const userData=getSession(AppConfig.sessionUserData)
    const opt={
                 containerId:this.state.videoStreamerContainerId,
                 className:'bheem-video-stream',
                 roomName:getSession(AppConfig.sessionMeeting).title||'Bheeem meeting conference',
                 roomId:meetingId,
                 userInfo:{
                  id:userData.id||meetingData.userId,
                  email:userData.email||'Anonymous@mail.com',
                  displayName:userData.fullName||meetingData.fullName
                 },
                 configOverwrite: { startWithAudioMuted: true,startWithVideoMuted:false },
              }
  //  console.log('Meeting session>>>>', getSession(AppConfig.sessionMeeting));           
  //  console.log('api data>>>',{containerId:this.state.videoStreamerContainerId,className:'bheem-video-stream',roomName:getSession(AppConfig.sessionMeeting).title,roomId:meetingId,
  //   userInfo:{
  //    id:userData.id||'34234234234',
  //    email:userData.email||'Anonymous@mail.com',
  //    displayName:userData.fullName||'anonymous'
  //  }}); 
   
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
    const meetingData=await getSession(AppConfig.sessionMeeting)
    const meetingId=this.props.match.params.room
    // Get all user list on first join meeting
    socketIo.emit("afterUserJoinMeeting",{fullName:meetingData.fullName,userId:meetingData.id,meetingId:meetingId})
    this.props.doReset()
    await this.props.checkIsExist({meetingId})
  }

  componentDidMount()
  {
    
    // console.log('Is property exist>>>>>>>',isValuePropertyExist({obj:getSession(AppConfig.sessionUserData),propName:'id',type:'valueOnly',value:'5f3115316bd81c1958a19914'}));
    console.log('Content session meeting>>>',getSession(AppConfig.sessionMeeting));
    //open sidebar
    let mainSize="80vw"
    let sidebarSize="20vw"
    if(document.getElementById(this.state.videoStreamerContainerId) && document.getElementById(this.state.listParticipantContainerId)){
      document.getElementById(this.state.videoStreamerContainerId).style.width = mainSize;
      document.getElementById(this.state.listParticipantContainerId).style.width = sidebarSize;
      document.getElementById(this.state.listParticipantContainerId).style.display = 'flex';
    }

    const meetingId=this.props.match.params.room
    if(getSession(AppConfig.sessionMeeting) && getSession(AppConfig.sessionMeeting).role == "host") {
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
    isRequesting: state.joinmeeting.isRequesting,
    errors:state.joinmeeting.errors,
    status: state.joinmeeting.status,
    isExist: state.joinmeeting.isExist,
    needPermission:state.streaming.needPermission,
    allowed:state.streaming.allowed,
    listParticipant:state.streaming.listParticipant,
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
