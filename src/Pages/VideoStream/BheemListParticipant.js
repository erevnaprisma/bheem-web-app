import React, { Component } from 'react'
import AppConfig from '../../Config/AppConfig'
import {getSession,updateSpecificSesssion,isValuePropertyExist} from '../../Utils/Utils'
import {connect} from 'react-redux'

import Loader from '../../Components/Loader'
import StreamingActions from '../../Containers/Streaming/redux'
import _ from 'lodash'
import {Images} from '../../Themes/index'
import {Image} from '../../Themes'

import swal from 'sweetalert2'

import Draggable from "react-draggable"

import socketIo from '../../Containers/Socket/socketListeners'

import {do_mute_my_audio,BheemVidStreamComponent,do_mute_specific,do_mute_everyone,toogle_lobby} from './BheemVidStreamComponent'



class BheemListParticipant extends Component {
    constructor(props){
        super(props)
        this._admitParticipant=this._admitParticipant.bind(this) 
        this._rejectParticipant=this._rejectParticipant.bind(this) 
        // this._handleSidebarUserList=this._handleSidebarUserList.bind(this)
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
        const meetingId=this.props.meetingId
        let joining=[]
        joining.push(data.userId)
        joining.push(this.props.listJoining)
        this.props.putToJoinList({listOnJoining:_.flatten(joining.filter(e=> e != null))})
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
        const meetingId=this.props.meetingId
        if(_.has(data,'status')|| data.status == 'Anonymous'){
        socketIo.emit('rejectUserToJoinHost', {status:'Anonymous',socketId:data.socketId,meetingId, userId:data.userId, hostId:userData.userId})
        }
        else{
        socketIo.emit('rejectUserToJoinHost', {socketId:data.socketId,meetingId, userId:data.userId, hostId:getSession(AppConfig.sessionData).id}) 
        }
    }  
    _do_end_meeting(){
        console.log('do end meeting');
        const meetingId=this.props.meetingId
        socketIo.emit('hostEndMeeting',{meetingId})
    }
    _doMuteUnmuteVideo(data){
        const meetingId=this.props.meetingId
        socketIo.emit('hostMuteAndVideoHandler', {meetingId,code:'off participant video',userId:data.userId})  
    }

    _doMuteUnmuteAudio(data){
        const meetingId=this.props.meetingId
        socketIo.emit('hostMuteAndVideoHandler', {meetingId,code:'mute participant',userId:data.userId})
    }

    _doLockMeeting(){
        const meetingId=this.props.meetingId
        socketIo.emit('meetingHasCreated', {meetingId})
    }
    _searchParticipant(query,list){
        var regex_qry=query.toLowerCase();
        var regex = new RegExp(regex_qry)
        var listSearch = list.filter(e=>{
        console.log('match>>> ', e.fullName, " >> ",e.fullName.match(regex));
        return e.fullName.toLowerCase().match(regex)
        })
        this.props.doSearch({listSearch})
    }
  

    componentWillMount(){
       
    }

    render() {
            const waitingRoom=this.props.listWaitingRoom||[]
            const participants=_.isEmpty(this.props.listSearch) ? _.sortBy(this.props.listParticipant,['role']) : _.sortBy(this.props.listSearch,['role'],'userId')
            const joiningList=this.props.listJoining||[]
            
            console.log('participants before>>>',this.props.listParticipant);
            const listJoinedDropdownMenu=[
                                                {name:'Rename',funct:()=>do_mute_everyone(),me:true},
                                                {name:'Put to waiting room',funct:()=>do_mute_everyone(),},
                                                {name:'Mute video',funct:(e)=>this._doMuteUnmuteVideo(e),}
                                        ]
            const footerDropdownSettings=[
                                            {name:'Lock meeting',funct:()=>this._doLockMeeting(),},
                                            {name:'Change meeting topic',funct:()=>do_mute_everyone(),},
                                            {name:'End meeting',funct:(e)=>this._do_end_meeting(e),}
                                        ]
            console.log('participants list>>',participants);                                 
            let myMeetingData=getSession(AppConfig.sessionMeeting) //get meeting data
            
            return(
            // <Draggable>
                <div className="bheem-list" style={{background:'white'}} id={this.state.listParticipantContainerId}>
                    <div className="main-header-list">
                        <div className="sub-main-header-list">
                            Participants ({myMeetingData.role==='host' ? waitingRoom.length+participants.length : participants.length}) &nbsp;{this.props.isLock ? 'Locked' : '' } 
                            
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
                                        {(!joiningList.includes(r.userId) &&
                                        <div className="container-button-wrapper">
                                            <button className="" onClick={()=>this._admitParticipant(r)}>Admit</button>&nbsp;
                                            <button onClick={()=>this._rejectParticipant(r)}>Reject</button>
                                        </div>
                                        )}
                                        
                                        {(joiningList.includes(r.userId) &&
                                        <div className="container-button-wrapper">
                                            <b><p>Joining...</p></b>
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
                                            <button className="" onClick={()=>this._doMuteUnmuteAudio(r)}>Mute</button>
                                            &nbsp;
                                        {/* <button>Put to waiting room</button> */}
                                        {/* <button>More</button> */}
                                        <div className="btn-group dd-menu-bheem" style={{zIndex:100}}>
                                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                More
                                                </button>
                                                <div className="dropdown-menu">
                                                {listJoinedDropdownMenu.map((s,j)=>(
                                                    <span className="dropdown-item" onClick={()=>s.funct(r)} key={j}>{s.name}</span>
                                                ))}
                                                </div>
                                        </div>
                                        </div>
                                        <div className="menu-status">
                                        <div style={{flex:1}}></div>
                                        {(r.userId == myMeetingData.userId &&
                                            <div>
                                                <span className="material-icons">{this.props.isVideo ? 'videocam' : 'videocam_off'}</span> 
                                                <span className="material-icons">{this.props.isAudio  ? 'volume_mute' : 'volume_off'}</span>  
                                            </div>
                                        )}
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
      isLock:state.streaming.isLock,
      isAudio:state.streaming.tooggleAudio,
      isVideo:state.streaming.tooggleVideo,
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
      doReset:data => dispatch(StreamingActions.resetStreaming(data)),
    }
  }
  export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BheemListParticipant)