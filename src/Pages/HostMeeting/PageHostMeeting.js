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
import HostMeetingActions from '../../Containers/HostMeeting/redux'



class HostMeeting extends PureComponent {
  constructor(props)
  {
    super(props)
    this._onSubmitForm=this._onSubmitForm.bind(this)
    this.state={
      s_date:new Date(),
      e_date:new Date(),
      ask: false,
      endless:false
    }
  }

  _onSubmitForm(e)
  {
    if (e) e.preventDefault()
    const title = this.refs.title_meeting.value
    const created_by=getSession(AppConfig.sessionUserData).id
    const start_date=new Date(this.state.s_date).getTime()
    const end_date=this.state.endless ? new Date(this.state.e_date).getTime() : ''
    const host=created_by
    const permissionTojoin=this.state.ask ?'Yes' : 'No'
    // console.log("data>>>>",{title,host,created_by,start_date,end_date})
    this.props.doHostMeeting({title,host,created_by,start_date,end_date,permissionTojoin})
  }
  componentDidMount()
  {
    this.props.doReset()
  }
  componentWillUnmount()
  {
    this.props.doReset()
  } 
  componentWillMount()
  {
    if(getSession(AppConfig.sessionMeeting))
    {
      window.location='/'
    }

    if(_.isEmpty(getSession(AppConfig.sessionUserData)))
    {
      Swal.fire({
        title: 'Not logged',
        text: 'You have to login to your account to use this feature',
        icon: 'error',
        confirmButtonText: 'Ok',
        onClose:()=>window.location="/login"
      })
    }
  }
  onChange = date => console.log("datetime>>>",date)

  render() {
    const {isRequesting,errors,status,title,host,createdBy,startDate,endDate,createdAt,meetingId} = this.props
    
    return (
      <div style={{background:`linear-gradient(to right bottom, #bdc3c7, #2c3e50)`,backgroundSize:'contain'}}>
      <Header/>
      <Helmet><title>Host a meeting</title></Helmet>
      <div className="page-header" style={{backgroundImage: `url("${Images.HostIllus}")`, backgroundSize: 'cover', backgroundPosition: 'top center'}}>
            <div className="container">
              {(!isRequesting&&
                <div className="row">
                  <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                    <div className="card card-login" >
                      <form className="form" onSubmit={(e)=>this._onSubmitForm(e)} style={{minHeight:0,paddingBottom:20}}>
                        <div className="card-header card-header-primary text-center">
                          <h4 className="card-title">Host Meeting</h4>
                        </div>
                        <br/>
                        <div className="card-body " style={{margin:0,padding:0}}>
                          <div className="input-group mt-9">
                            <input type="text" className="form-control" placeholder="Your meeting topic..." style={{textAlign:'center', marginLeft:10,marginRight:10}} ref="title_meeting" required/>
                          </div>
                        </div>
                        
                            <div className="ml-5">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox"  onChange={e=>this.setState({endless:e.target.checked})}/>
                                    Use time range
                                    <span className="form-check-sign">
                                      <span className="check" />
                                    </span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox"  onChange={e=>this.setState({ask:e.target.checked})} checked/>
                                    Participant ask to join
                                    <span className="form-check-sign">
                                      <span className="check" />
                                    </span>
                                  </label>
                                </div>
                            </div>
                            
                          {(this.state.endless &&
                            <div>
                              <br/><br/>
                                <center>
                                  <label>Start Time</label>
                                  <br/>
                                  <DateTimePicker
                                        className="dt-picker"
                                        onChange={s_date=>this.setState({ s_date})}
                                        value={this.state.s_date}
                                      />
                                  <br/>
                                  <br/>
                                  <label>End Time</label>
                                  <br/>
                                  <DateTimePicker
                                      className="dt-picker"
                                      onChange={e_date=>this.setState({ e_date })}
                                      value={this.state.e_date}
                                    />
                                </center>
                            </div>
                          )}
                        <div className="footer text-center mt-5">
                          <button type="submit" className="btn btn-primary btn-link btn-wd btn-lg">Host meeting</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )} 
            </div>
          </div> 
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isRequesting: state.createmeeting.isRequesting,
    errors :state.createmeeting.errors,
    status: state.createmeeting.status,
    title:state.createmeeting.title,
    host:state.createmeeting.host,
    createdBy:state.createmeeting.createdBy,
    startDate:state.createmeeting.startDate,
    endDate:state.createmeeting.endDate,
    createdAt:state.createmeeting.createdAt,
    meetingId:state.createmeeting.meetingId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    doHostMeeting:data => dispatch(HostMeetingActions.createMeeting(data)),
    doReset:data => dispatch(HostMeetingActions.createMeetingReset(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(HostMeeting))
)