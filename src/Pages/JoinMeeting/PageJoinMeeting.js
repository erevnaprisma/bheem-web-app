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
import JoinMeetingActions from '../../Containers/JoinMeeting/redux'



class HostMeeting extends PureComponent {
  constructor(props)
  {
    super(props)
    this._onSubmitForm=this._onSubmitForm.bind(this)
    this.state={
      s_date:new Date(),
      e_date:new Date(),
      endless:false
    }
  }

  _onSubmitForm(e)
  {
    if (e) e.preventDefault()
    const meetingId = this.refs.meeting_id.value
    this.props.doJoinMeeting({meetingId})
  }
  componentDidMount()
  {
    this.props.doReset()
  }
  componentWillUnmount()
  {
    this.props.doReset()
  } 
  onChange = date => console.log("datetime>>>",date)

  render() {
    const {isRequesting,errors,status,title,host,createdBy,startDate,endDate,createdAt,meetingId} = this.props
    return (
      <div style={{background:`linear-gradient(to right bottom, #bdc3c7, #2c3e50)`,backgroundSize:'contain'}}>
      <Header/>
      <Helmet><title>Join Meeting</title></Helmet>
        {(!isRequesting&&
          <div id="main">
            <section id="contact" style={{marginTop:'5%',minWidth:window.innerWidth,minHeight:window.innerHeight}}>
              <div className="container mx-auto" style={{marginTop:'10%'}}>
                  <div className="mx-auto " style={{background:`rgba(82, 82, 82, 0.8)`,paddingTop:20,paddingBottom:20}}>
                    <div className="section-title mx-auto ">
                      <h3 style={{color:'white'}}>Join Meeting</h3>
                      {/* <span style={{color:'white'}}>for the future you can use your social media account</span> */}
                    </div>
                    <div className="row mt-1 mx-auto">
                      <div className="col-lg-8 mt-5 mt-lg-0 mx-auto" >
                        <form onSubmit={(e)=>this._onSubmitForm(e)}>
                          <div className="form-group">
                            <input type="text" className="InputText form-control mx-auto"  placeholder="Meeting Id" ref="meeting_id" required style={{textAlign:'center'}}/>
                            <div className="validate"/>
                          </div>
                          <br/>
                          <br/>
                          {(!isRequesting &&
                          <div className="text-center">
                            <button type="submit" className="btn" required style={{marginLeft:0}}>Join</button>
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
  injectIntl(withRouter(HostMeeting))
)