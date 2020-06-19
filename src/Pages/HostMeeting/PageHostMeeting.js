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
import './menu.css'

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
    const end_date=this.state.endless ? '' : new Date(this.state.e_date).getTime()
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
        {(!isRequesting&&
          <div id="main">
            <section id="contact" style={{marginTop:'5%',minWidth:window.innerWidth,minHeight:window.innerHeight}}>
              <div className="container mx-auto" style={{marginTop:'10%'}}>
                  <div className="mx-auto " style={{background:`rgba(82, 82, 82, 0.8)`,paddingTop:20,paddingBottom:20}}>
                    <div className="section-title mx-auto ">
                      <h3 style={{color:'white'}}>Host Meeting</h3>
                      {/* <span style={{color:'white'}}>for the future you can use your social media account</span> */}
                    </div>
                    <div className="row mt-1 mx-auto">
                      <div className="col-lg-8 mt-5 mt-lg-0 mx-auto" >
                        <form onSubmit={(e)=>this._onSubmitForm(e)}>
                          <div className="form-group">
                            <input type="text" className="InputText form-control mx-auto"  placeholder="Title of your meeting" ref="title_meeting" required/>
                            <div className="validate"/>
                          </div>
                          <center>
                            <div className="row" style={{marginLeft:20}}>
                                <input type="checkbox" onChange={e=>this.setState({endless:e.target.checked})}/>
                                &nbsp;&nbsp;
                                <p style={{color:Colors.primaryWhite}}>Use time range</p>
                            </div>
                            
                          </center>
                          <center>
                              <div className="row" style={{marginLeft:20}}>
                                  <input type="checkbox" onChange={e=>this.setState({ask:e.target.checked})}/>
                                  &nbsp;&nbsp;
                                  <p style={{color:Colors.primaryWhite}}>Participant ask to join</p>
                              </div>
                          </center>
                          {(!this.state.endless &&
                            <div>
                              <center>
                                    <label style={{color:Colors.primaryWhite}}>Start Time</label>
                                    &nbsp;&nbsp;
                                    <DateTimePicker
                                          className="dt-picker"
                                          onChange={s_date=>this.setState({s_date})}
                                          value={this.state.s_date}
                                        />
                              </center>
                           </div>
                          )}
                          {(this.state.endless &&
                            <div>
                                <br/>
                                <center>
                                  <label style={{color:Colors.primaryWhite}}>Start Time</label>
                                  &nbsp;&nbsp;
                                  <DateTimePicker
                                        className="dt-picker"
                                        onChange={s_date=>this.setState({ s_date})}
                                        value={this.state.s_date}
                                      />
                                  &nbsp;&nbsp;
                                  <br/>
                                  <br/>
                                  <label style={{color:Colors.primaryWhite}}>End Time</label>
                                  &nbsp;&nbsp;&nbsp;
                                  <DateTimePicker
                                      className="dt-picker"
                                      onChange={e_date=>this.setState({ e_date })}
                                      value={this.state.e_date}
                                    />
                                </center>
                            </div>
                          )}
                          <br/>
                          <br/>
                          {(!isRequesting &&
                          <div className="text-center">
                            <button type="submit" className="btn" required>Create meeting</button>
                          </div>
                          )}
                          {(isRequesting && <center>
                              <Loader className="mx-auto"/>
                            </center>)}
                          <br/>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          </div>
          )}
          {(isRequesting&&
           <div id="main" >
            <section id="contact" style={{borderRadius:'10%',marginTop:'5%',minWidth:window.innerWidth,minHeight:window.innerHeight}}>
              <div className="container mx-auto" style={{marginTop:'10%'}}>
                  <div className="mx-auto " style={{background:`rgba(82, 82, 82, 0.8)`,paddingTop:20,paddingBottom:20}}>
                    <div className="col">
                    <center> <Loader className="mx-auto"/>
                    <h1 style={{color:Colors.primaryWhite}}>Creating meeting...</h1>
                    </center>
                    
                    </div>
                  </div>
                </div>
              </section>
          </div> 
            )}  
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