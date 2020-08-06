import React, { Component } from 'react'
import Helmet from 'react-helmet'
import AppConfig from '../../Config/AppConfig'
import {getSession} from '../../Utils/Utils'
import {connect} from 'react-redux'
import {Images,Colors} from '../../Themes'
import Loader from '../../Components/Loader'
import JoinActions from '../../Containers/JoinMeeting/redux'
import StreamingActions from '../../Containers/Streaming/redux'

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

import swal from 'sweetalert2'
import { stat } from 'fs'
import Header from '../../Containers/Header'
import Draggable from "react-draggable";
import ListParticipant from '../../Components/ConcalComponents/ListParticipant'
import socketIo from '../../Containers/Socket/socketListeners'
  // iframe Integration
  const VideoConference = ({ roomName,opt,id }) => {
    const [jitsi, setJitsi] = React.useState(0)
    const jitsiContainerId = 'jitsi-container-id'
    const loadBheemScript = () => {
      let resolveLoadBheemScriptPromise = null
      const loadBheemScriptPromise = new Promise(resolve => {
        resolveLoadBheemScriptPromise = resolve
      })
      const script = document.createElement('script')
      script.src = 'https://bheem.erevnaraya.com/external_api.js';
      script.async = true
      script.onload = () => resolveLoadBheemScriptPromise(true)
      document.body.appendChild(script)
      return loadBheemScriptPromise
    }
    const initialiseJitsi = async () => {
      if (!window.JitsiMeetExternalAPI) {
        await loadBheemScript()
      }
      const _jitsi = new window.JitsiMeetExternalAPI('bheem.erevnaraya.com', {
        roomName,
        id,
        parentNode: document.getElementById(jitsiContainerId),
        userInfo:opt
      })
      setJitsi(_jitsi)
    }

    React.useEffect(() => {
      initialiseJitsi()
      return () => jitsi?.dispose?.()
    }, [])

    return <div className="page-header" id={jitsiContainerId}/>
  }
  // iframe Integration

class PageBheem extends Component {
  constructor(props)
  {
    super(props)
    this._allowed=this._allowed.bind(this)
    this._notAllowed=this._notAllowed.bind(this)
    this._listParticipant=this._listParticipant.bind(this)
    this._admitParticipant=this._admitParticipant.bind(this) 
    this._rejectParticipant=this._rejectParticipant.bind(this) 
    this.state={
      show:true,
      icon:'-',
      jAudio:null,
      jVideo:null
    }
  }
  //Host functions
  _admitParticipant(userId,socketId)
  {
    const userData=getSession(AppConfig.sessionUserData)
    const meetingId=this.props.match.params.room
    socketIo.emit('admitUserToJoinHost', { meetingId, userId: userId, hostId:userData.id, socketId: socketId })
  } 
  _rejectParticipant(userId)
  {
    const userData=getSession(AppConfig.sessionUserData)
    const meetingId=this.props.match.params.room
    socketIo.emit('rejectUserToJoinHost', { meetingId, userId: userId, hostId:userData.id })
  }  
  //Host functions



  async componentWillMount()
  {
    this.props.doReset()
    const meetingId=this.props.match.params.room
    await this.props.checkIsExist({meetingId})
  }
  componentDidMount()
  {
    const meetingId=this.props.match.params.room
    if(getSession(AppConfig.sessionMeeting) && getSession(AppConfig.sessionMeeting).role == "host") 
    {
      socketIo.emit('createMeeting', {meetingId})
    }
  }
  _listParticipant()
  {
    const waitingRoom=this.props.listWaitingRoom
    const participants=this.props.listparticipant
    console.log("list> participant>>>",typeof participants)
    // socket.emit('admitUserToJoinHost', { meetingId: userInfo.meetingId, userId: userInfo.userId, hostId, socketId: userInfo.socketId })
    return(
     <Draggable>
       {/* <div style={{position:'absolute',right:5,bottom:'20%'}}>
          <div style={{overflow:'hidden',background:Colors.primaryGray,color:'white'}}>
              <p style={{color:'white',float:'right',marginRight:5,cursor:'pointer'}}>
                <b onClick={()=>{
                  if(this.state.show) this.setState({show:false,icon:'+'})
                  else this.setState({show:true,icon:'-'})
                }}>{this.state.icon}</b>
              </p>
              <p style={{margin:5,float:'left',color:'white'}}>List Participant</p>
              <hr/>
          </div> 
       </div> */}
       
          <div style={{overflow:'scroll',position:'absolute',maxHeight:`${this.state.show ? '30%' : '' }`,minWidth:'20%',minHeight:`${this.state.show ? '30%' : '' }`,background:'white',borderRadius:10,right:5,bottom:'20%'}}>
            <label className="ml-1 mt-3">Waiting room</label>
            <hr/>
            {waitingRoom.length>0 && waitingRoom.map((r,i)=>(
              <div style={{background:'#1c1c1c',marginTop:2,textAlign:'left',margin:5,color:'white',width:'100%'}} key={i}>
                <div className="row" style={{float:'right'}}>
                    <button className="" onClick={()=>this._admitParticipant(r.userId,r.socketId)}>Admit</button>
                    &nbsp;
                    <button onClick={()=>this._rejectParticipant(r.userId)}>Reject</button>
                </div>
                <p>{r.username}</p> 
              </div>
            ))}
            <label className="ml-1 mt-3">List participant room</label>
            <hr/>
            {participants.map((r,i)=>(
              <div style={{background:'#1c1c1c',marginTop:2,textAlign:'left',margin:5,color:'white',width:'100%'}} key={i}>
                <div className="row" style={{float:'right'}}>
                    <button className="" onClick={()=>this._admitParticipant(r.userId,r.socketId)}>Mute</button>
                    &nbsp;
                    <button>Put to waiting room</button>
                </div>
                <p>{r.fullName}</p> 
              </div>
            ))}
          </div>
     </Draggable>
    )
  }

  _notAllowed()
  {
    const meetingId=this.props.match.params.room
    const { topic,allowed,needPermission,isExist,isRequesting,meetingData } = this.props
    
    return(
      <div>
        <Helmet>
          <title>{'Bheem meeting'}</title>
          {/* {!getSession(AppConfig.sessionMeeting) || getSession(AppConfig.sessionMeeting).meetingId != meetingId  &&  <title>{'On Post Join'}</title>}
          {getSession(AppConfig.sessionMeeting).needRequestToJoin && getSession(AppConfig.sessionMeeting).meetingId == meetingId && <title>{'Waiting room..'}</title>} */}
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
  _allowed()
  {
    const meetingId=this.props.match.params.room
    const { topic,allowed,needPermission,isExist,isRequesting,meetingData } = this.props
    const userData=getSession(AppConfig.sessionUserData)
    const opt={
         id:userData.id||navigator.userAgent,
         email:userData.email||'Anonymous@mail.com',
         displayName:userData.fullName||'anonymous'
       }
    return(
      <div>
        <Helmet>
          <title>{'Bheem Conference Call'}</title>
        </Helmet> 
          <div>
            <VideoConference style={{height:'100%',width:'100%'}} roomName={'cobaa'}   opt={opt}/>
            {this._listParticipant()}
          </div>
      </div>
    )
  }

  render () {
    const meeting=getSession(AppConfig.sessionMeeting)
    console.log("Session meeting>>",getSession(AppConfig.sessionMeeting))
    return (
      <div style={{background:`url(${Images.HomeIllus}) center`,backgroundSize:'contain'}}>
        {meeting&& this._allowed()}
        {!meeting&& this._notAllowed()}
        {/* {this.props.allowed||meeting.role == 'host' && this._allowed()}
        {!this.props.allowed && meeting.role!= 'host'&& this._notAllowed()}
        {!!meeting&& this._notAllowed()} */}
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
