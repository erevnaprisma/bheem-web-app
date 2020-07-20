import React, { Component } from 'react'
import Helmet from 'react-helmet'
import AppConfig from '../../Config/AppConfig'
import {getSession} from '../../Utils/Utils'
import {connect} from 'react-redux'
import {Images,Colors} from '../../Themes'
import Loader from '../../Components/Loader'
import JoinActions from '../../Containers/JoinMeeting/redux'
import swal from 'sweetalert2'
import { stat } from 'fs'
import Header from '../../Containers/Header'
import Draggable from "react-draggable";
import ListParticipant from '../../Components/ConcalComponents/ListParticipant'
import StreamSocket from '../../Containers/SubContainer'
// iframe Integration
const VideoConference = ({ roomName,opt }) => {
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
      parentNode: document.getElementById(jitsiContainerId),
      userInfo:opt
    })
    setJitsi(_jitsi)
  }

  React.useEffect(() => {
    initialiseJitsi()
    return () => jitsi?.dispose?.()
  }, [])

  return <div id={jitsiContainerId} 
  style={{ height: window.innerHeight, width: window.innerWidth }} 
  />
}
// iframe Integration

class PageBheem extends Component {
  constructor(props)
  {
    super(props)
    this._allowed=this._allowed.bind(this)
    this._notAllowed=this._notAllowed.bind(this)
    this._listParticipant=this._listParticipant.bind(this)
    this.state={
      show:true,
      icon:'-'
    }
  }
  async componentWillMount()
  {
    const meetingId=this.props.match.params.room
    await this.props.checkIsExist({meetingId})
  const data={
    socketId:null,
    userId:getSession(AppConfig.sessionUserData).id||null,
    username:getSession(AppConfig.sessionUserData).nickname||'anonymous',
    meetingId: this.props.match.params.room
  }
    await StreamSocket._emitter("requestToJoin",data)
  }

  _listParticipant()
  {
    const arr=[4,3,4,3,43,3,33,33,3,3,3,3,4,4,4,4,3,4]
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
          
       </div>
        
        
       </div> */}
       
       <div  class="card overflow-auto" style={{overflow:'scroll',position:'absolute',maxHeight:`${this.state.show ? '30%' : '' }`,minWidth:'20%',minHeight:`${this.state.show ? '30%' : '' }`,background:'white',borderRadius:10,right:5,bottom:'20%'}}>
        {arr.map(r=>(
          <div style={{background:'#1c1c1c',marginTop:2,textAlign:'left',margin:5,color:'white'}}>
            <p>{r}</p> 
          </div>
        ))}
       </div>
     </Draggable>
    )
  }

  _notAllowed()
  {
    const meetingId=this.props.match.params.room
    const { topic,allowed,needPermission,isExist,isRequesting } = this.props
    return(
      <div>
        <Helmet>
          {!getSession(AppConfig.sessionMeeting) || getSession(AppConfig.sessionMeeting).meetingId != meetingId  &&  <title>{'On Post Join'}</title>}
          {getSession(AppConfig.sessionMeeting).needRequestToJoin && getSession(AppConfig.sessionMeeting).meetingId == meetingId && <title>{'Waiting room..'}</title>}
        </Helmet>
        <Header/>
        {(getSession(AppConfig.sessionMeeting).needRequestToJoin && getSession(AppConfig.sessionMeeting).meetingId == meetingId &&
          <div className="page-header" style={{background:'#fff' ,backgroundSize: 'cover', backgroundPosition: 'top center'}}>
            <div className="container">
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
            </div>
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
    const { topic,allowed,needPermission,isExist,isRequesting } = this.props
    const userData=getSession(AppConfig.sessionUserData)
    const opt={
         email:userData.email||'Anonymous@mail.com',
         displayName:userData.fullName||'anonymous'
       }
    return(
      <div>
        <Helmet>
          <title>{'Bheem Conference Call - '+topic}</title>
        </Helmet> 
          <div>
            {this._listParticipant()}
            <VideoConference style={{height:'100%',width:'100%'}} roomName={meetingId}  opt={opt}/>
          </div>
      </div>
    )
  }

  render () {
    const meeting=getSession(AppConfig.sessionMeeting)
    console.log("Session meeting>>",getSession(AppConfig.sessionMeeting))
    return (
      <div style={{background:`url(${Images.HomeIllus}) center`,backgroundSize:'contain'}}>
        {this.props.allowed||meeting.role == 'host' && this._allowed()}
        {!this.props.allowed && meeting.role != 'host'&& this._notAllowed()}
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
    listparticipant:state.streaming.listparticipant
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkIsExist:data => dispatch(JoinActions.checkIsexistMeeting(data)),
    // doReset:data => dispatch(SignUpActions.doSignUpReset(data))
  }
}
export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(PageBheem)
