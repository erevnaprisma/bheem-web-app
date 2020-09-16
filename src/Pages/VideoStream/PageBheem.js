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
    this._searchParticipant=this._searchParticipant.bind(this)
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
    this.props.putToJoinList(data.userId)
    if(data.status == 'Anonymous'){
      console.log('emit admit anonymous>>>', { status:'Anonymous',meetingId, userId: data.userId, hostId:userData.id, socketId: data.socketId,username:data.username });
      socketIo.emit('admitUserToJoinHost', { status:'Anonymous',meetingId, userId: data.userId, hostId:userData.id, socketId: data.socketId,username:data.username })
    }
    else{
      console.log('emit admit logged>>>', { meetingId, userId: data.userId, hostId:userData.id, socketId: data.socketId, username:data.username});
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

  _searchParticipant(query,list){
    var regex_qry=query.toLowerCase();
    var regex = new RegExp(regex_qry)
    var listSearch = list.filter(e=>{
      console.log('match>>> ', e.fullName, " >> ",e.fullName.match(regex));
      return e.fullName.toLowerCase().match(regex)
    })
    console.log('List search>>>',listSearch);
    this.props.doSearch({listSearch})
  }

  //Host functions
  _listParticipant()
  {
    const waitingRoom=this.props.listWaitingRoom||[]
    const participants=_.isEmpty(this.props.listSearch) ? _.sortBy(this.props.listParticipant,['role']) : _.sortBy(this.props.listSearch,['role'])
    const joiningList=this.props.listOnJoining||[]
    const listJoinedDropdownMenu=[
                                        {name:'Rename',funct:()=>do_mute_everyone(),me:true},
                                        {name:'Put to waiting room',funct:()=>do_mute_everyone(),},
                                        {name:'Mute video',funct:()=>do_mute_everyone(),}
                                  ]
    const footerDropdownSettings=[
                                      {name:'Lock meeting',funct:()=>do_mute_everyone(),},
                                      {name:'Change meeting topic',funct:()=>do_mute_everyone(),},
                                      {name:'End meeting',funct:()=>do_mute_everyone(),}
                                  ]
    // console.log("Bhm list Waiting rooom comp>>>",waitingRoom)
    // console.log("Bhm list participant comp>>>",participants)
    let myMeetingData=getSession(AppConfig.sessionMeeting) //get meeting data
    
    return(
      // <Draggable>
          <div className="bheem-list" style={{background:'white'}} id={this.state.listParticipantContainerId}>
                  <div className="main-header-list">
                    <div className="sub-main-header-list">
                       Participants ({myMeetingData.role==='host' ? waitingRoom.length+participants.length : participants.length})
                        <span className="material-icons">lock</span>
                        <span className="material-icons">lock_open</span>
                    </div>
                  </div>
                  {getSession(AppConfig.sessionMeeting).role == 'host' && !_.isEmpty(waitingRoom) &&
                    <div>
                        <label className="mt-2 head-list-participant">Waiting room({waitingRoom.length})</label>
                          <ul className="container-list-waiting-room" >
                            {waitingRoom.length>0 && waitingRoom.map((r,i)=>(
                              <li key={i} className="row">
                                  <div className="container-userinfo-wrapper">
                                    <img style={{alignSelf:'center',width:20,height:20,borderRadius:'100%',background:'black'}} src={Images.Avatar}/>
                                    <span>{r.username}</span> 
                                  </div>
                                    {(!joiningList.includes(r.usserId) &&
                                      <div className="container-button-wrapper">
                                        <button className="" onClick={()=>this._admitParticipant(r)}>Admit</button>&nbsp;
                                        <button onClick={()=>this._rejectParticipant(r)}>Reject</button>
                                      </div>
                                    )}
                                    
                                    {console.log('Joining Status>>>',joiningList.includes(r.usserId))}
                                    {(joiningList.includes(r.usserId) &&
                                      <div className="container-button-wrapper">
                                        {joiningList.includes(r.usserId) && 'Joining...'}
                                      </div>
                                    )}
                              </li>
                            ))}
                          </ul>
                    </div>
                  }
                  {participants.length>0 &&
                    <div className="wrapper-list-participant">
                        <label className="mt-2 head-list-participant mb-2">List participant in room({participants.length})</label>
                        <div style={{display:'flex',flexDirection:'row'}} className="ml-2 mr-2">
                          <input style={{width:'100%',borderRadius:20,fontSize:12,padding:3}} id="bheem-search-participant" placeholder="Search participant...." onChange={e=>this._searchParticipant(e.target.value,this.props.listParticipant)}/>
                          <i className="material-icons" style={{cursor:'pointer',position:'absolute',right:'1%',marginTop:'0.2%'}} onClick={()=>{
                            var search=document.getElementById("bheem-search-participant") 
                            search.value=''
                            this.props.doSearch({listSearch:[]})
                          }}>clear</i>
                        </div>
                        
                        <ul className="container-list-joined ">
                          {participants.map((r,i)=>(
                              <li  key={i} className="row">
                                <div className="container-userinfo-wrapper">
                                  <img style={{alignSelf:'center',width:20,height:20,borderRadius:'100%',background:'black'}} src={Images.Avatar}/>
                                  <span>{r.fullName}</span> 
                                  {r.userId == myMeetingData.userId && r.role == 'Host' ? `(Me - Host)` : ''}
                                  {r.userId == myMeetingData.userId && r.role != 'Host' ? `(Me)` : ''}
                                  {r.userId != myMeetingData.userId && r.role == 'Host' ? `(Host)` : ''}
                                </div>
                                <div className="container-menu-wrapper">
                                    <div className="menu-button">
                                      <div style={{flex:1}}></div>
                                        &nbsp; 
                                        <button className="" onClick={()=>this._admitParticipant(r.userId,r.socketId)}>Mute</button>
                                        &nbsp;
                                      {/* <button>Put to waiting room</button> */}
                                      {/* <button>More</button> */}
                                      <div className="btn-group dd-menu-bheem" style={{zIndex:100}}>
                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                              More
                                            </button>
                                            <div className="dropdown-menu">
                                              {listJoinedDropdownMenu.map((s,j)=>(
                                                  <span className="dropdown-item" onClick={s.funct} key={j}>{s.name}</span>
                                              ))}
                                            </div>
                                      </div>
                                    </div>
                                    <div className="menu-status">
                                      <div style={{flex:1}}></div>
                                      <span className="material-icons">videocam</span>
                                      <span className="material-icons">volume_mute</span>
                                    </div>
                                </div>
                              </li>
                          ))}
                        </ul>
                    </div>
                  }
                  {(myMeetingData.role === 'host'&&
                    <div className="bheem-setting-section">
                          <div style={{flex:1}}>
                            <button type="button" className="btn btn-primary" onClick={()=>do_mute_everyone()}>Mute all</button>
                          </div>
                          <div className="dropdown show flex-end ">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons">more_vert</i> More
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                              {footerDropdownSettings.map((r,i)=>(
                                  <span className="dropdown-item" onClick={r.funct} key={i} style={{cursor:'pointer'}}>{r.name}</span>
                              ))}
                            </div>
                        </div>
                    </div>
                  )}
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
                 userInfo:{
                  id:userData.id||meetingData.userId,
                  email:userData.email||'Anonymous@mail.com',
                  displayName:userData.fullName||meetingData.fullName
                 },
                 configOverwrite: { startWithAudioMuted: true,startWithVideoMuted:false },
              }
    return(
      <div>
        <Helmet>
          <title>{'Bheem Conference Call'}</title>
        </Helmet> 
          <div className="row" style={{margin:0,padding:0}}>
            <button style={{position:'absolute',zIndex:1000}} onClick={()=>this._handleSidebarUserList()}>Toogle Sidebar</button>
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
    socketIo.emit("afterUserJoinMeeting",{fullName:meetingData.fullName,userId:meetingData.userId,meetingId:meetingId})
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
    isRequesting: state.joinmeeting.isRequesting,
    errors:state.joinmeeting.errors,
    status: state.joinmeeting.status,
    isExist: state.joinmeeting.isExist,
    needPermission:state.streaming.needPermission,
    allowed:state.streaming.allowed,
    listSearch:state.streaming.listSearch,
    listParticipant:state.streaming.listParticipant,
    listWaitingRoom:state.streaming.listWaitingRoom,
    listJoining:state.streaming.listOnJoining,
    meetingData:state.streaming.meetingData
  }
}
const mapDispatchToProps = dispatch => {
  return {
    doSearch:data => dispatch(StreamingActions.doSearch(data)),
    putToJoinList:data => dispatch(StreamingActions.putToJoiningList(data)),
    checkIsExist:data => dispatch(JoinActions.checkIsexistMeeting(data)),
    doReset:data => dispatch(StreamingActions.resetStreaming(data)),
  }
}
export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(PageBheem)
