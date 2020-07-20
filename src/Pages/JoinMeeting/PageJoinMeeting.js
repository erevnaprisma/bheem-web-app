import React, { Component,useEffect, PureComponent } from 'react'
import Helmet from 'react-helmet'
import Shimmer from "react-shimmer-effect";
import { connect } from 'react-redux'
import {getSession} from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'ramda'
import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'
import {Images,Colors} from '../../Themes'
// Components
import Header from '../../Containers/Header'
import Footer from '../../Containers/Footer'
import Loader from '../../Components/Loader'
import Swal from 'sweetalert2'
import DateTimePicker from 'react-datetime-picker';
//Actions
import JoinMeetingActions from '../../Containers/JoinMeeting/redux'
import io from 'socket.io-client'
const socketIo=io(AppConfig.socketUrl)

class JoinMeeting extends PureComponent {
  constructor(props)
  {
    super(props)
    this._onSubmitForm=this._onSubmitForm.bind(this)
    this._onJoin=this._onJoin.bind(this)
    this._waitingRoom=this._waitingRoom.bind(this)
    this.state={
      s_date:new Date(),
      e_date:new Date(),
      endless:false,
      isLogin:getSession(AppConfig.loginFlag)||false
    }
  }
  static  _emit()
  {
    const userId=getSession(AppConfig.sessionUserData).id
    const nickname=getSession(AppConfig.sessionUserData).nickname
    console.log("isi yang dikirim",{userId,socketId:socketIo.id})
    socketIo.emit('requestToJoinUser',{userId,socketId:socketIo.id})    
  }
  _onSubmitForm(e)
  {
    if (e) e.preventDefault()
    const isLogin=this.state.isLogin
    const meetingId = this.refs.meeting_id.value
    if(isLogin)
    {
      this.props.doJoinMeeting({meetingId})
    }
    else
    {
      const name = this.refs.u_name.value
      this.props.doJoinMeeting({meetingId,name})
    }

  }
  componentDidMount()
  {
    socketIo.on('userAllow',e=>
      alert("Success Join data>>>\n",e)
    )  
    this.props.doReset()
  }
  componentWillUnmount()
  {
    this.props.doReset()
  } 
  onChange = date => console.log("datetime>>>",date)
  componentWillMount()
  {
    if(getSession(AppConfig.sessionMeeting))
    {
      window.location='/'
    } 
  }
  _waitingRoom()
  {
    const userId=getSession(AppConfig.sessionUserData).id
    const nickname=getSession(AppConfig.sessionUserData).nickname    
    return (
      <div className="page-header" style={{backgroundImage: `url("${Images.JoinIllus}")`, backgroundSize: 'cover', backgroundPosition: 'top center'}}>
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
      </div>
    )
  }
  _onJoin()
  {
    const {isLogin} = this.state
    const {isRequesting,errors,status,title,host,createdBy,startDate,endDate,createdAt,meetingId} = this.props
    return(
      <div className="page-header" style={{backgroundImage: `url("${Images.JoinIllus}")`, backgroundSize: 'cover', backgroundPosition: 'top center'}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                  <div className="card card-login" >
                    <form className="form" onSubmit={(e)=>this._onSubmitForm(e)} style={{minHeight:0,paddingBottom:20}}>
                      <div className="card-header card-header-primary text-center">
                        <h4 className="card-title">Join Meeting</h4>
                      </div>
                      <br/>
                      {(!isLogin &&
                        <div className="card-body " style={{margin:0,padding:0}}>
                          <div className="input-group mt-9">
                            <input type="text" className="form-control" placeholder="Meeting ID" ref="meeting_id" required style={{textAlign:'center', marginLeft:10,marginRight:10}}/>
                          </div>
                          <div className="input-group mt-9">
                            <input type="text" className="form-control" placeholder="Your name" ref="u_name" required style={{textAlign:'center', marginLeft:10,marginRight:10}}/>
                          </div>
                        </div>
                      )}
                      {(isLogin &&
                        <div className="card-body " style={{margin:0,padding:0}}>
                          <div className="input-group mt-9">
                            <input type="text" className="form-control" placeholder="Meeting ID" ref="meeting_id" required style={{textAlign:'center', marginLeft:10,marginRight:10}}/>
                          </div>
                        </div>
                      )}
                      <div className="footer text-center mt-5">
                      <button type="submit" className="btn btn-primary btn-link btn-wd btn-lg">Join Meeting</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
  }
  render() {
    const {isLogin} = this.state
    const {isRequesting,errors,status,title,host,createdBy,startDate,endDate,createdAt,meetingId} = this.props
    return (
      <div>
      <Header/>
      <Helmet><title>Join Meeting</title></Helmet>
      {status == 200 && this._waitingRoom() }
      {status != 200 && this._onJoin() }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isRequesting: state.joinmeeting.isRequesting,
    errors :state.joinmeeting.errors,
    status: state.joinmeeting.status
  }
}
const mapDispatchToProps = dispatch => {
  return {
    doJoinMeeting:data => dispatch(JoinMeetingActions.joinMeeting(data)),
    doReset:data => dispatch(JoinMeetingActions.joinMeetingReset(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(JoinMeeting))
)