import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from '../../../Components/Loader'
import _ from 'lodash'
import { prop } from 'ramda'
import MeetingActions from '../../../Containers/Management/SceduleMeeting/redux'
import {getSession,formatDate} from '../../../Utils/Utils'
import AppConfig from '../../../Config/AppConfig'
import ModalChangePassword from './Modals/ChangePassword'

class ManageMeeting extends Component {
  constructor(props)
  {
    super(props)
  }

  render() {
    const {data,fetchMeetings,cancelMeeting,startMeeting,editMeeting,isDoing} = this.props
      return (
      <div className={`section section-basic tab-pane ${this.props.active}`} id="account-settings" style={{padding:0}}>
        <ModalChangePassword/>
          <div className="row ">
            <button className="col-3 col-1 btn btn-block btn-primary" data-toggle="modal" data-target="#change-my-password">
              Change Password
            <div className="ripple-container"></div></button>
          </div>
          {/* <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="title">
                    <h3>Checkboxes</h3>
                  </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" defaultValue />
                    Unchecked
                    <span className="form-check-sign">
                      <span className="check" />
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" defaultValue defaultChecked />
                    Checked
                    <span className="form-check-sign">
                      <span className="check" />
                    </span>
                  </label>
                </div>
                <div className="form-check disabled">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" defaultValue disabled />
                    Disabled unchecked
                    <span className="form-check-sign">
                      <span className="check" />
                    </span>
                  </label>
                </div>
                <div className="form-check disabled">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" defaultValue disabled defaultChecked />
                  Disabled checked
                  <span className="form-check-sign">
                    <span className="check" />
                  </span>
                </label>
              </div>
            </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="title">
              <h3>Radio Buttons</h3>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" />
                Radio is off
                <span className="circle">
                  <span className="check" />
                </span>
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" defaultChecked />
                Radio is on
                <span className="circle">
                  <span className="check" />
                </span>
              </label>
            </div>
            <div className="form-check disabled">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios11" defaultValue="option1" disabled />
                Disabled radio is off
                <span className="circle">
                  <span className="check" />
                </span>
              </label>
            </div>
            <div className="form-check disabled">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="exampleRadio1" id="exampleRadios21" defaultValue="option2" defaultChecked disabled />
                Disabled radio is on
                <span className="circle">
                  <span className="check" />
                </span>
              </label>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="title">
              <h3>Toggle Buttons</h3>
            </div>
            <div className="togglebutton">
              <label>
                <input type="checkbox" defaultChecked />
                <span className="toggle" />
                Toggle is on
              </label>
            </div>
            <div className="togglebutton">
              <label>
                <input type="checkbox" />
                <span className="toggle" />
                Toggle is off
              </label>
            </div>
          </div> */}

            <br/>
            <br/>
            <br/>
        </div>
  
      )
  }
}
const mapStateToProps = (state, ownProps) => {
  return{
    isRequest:state.schedulemeetings.isRequesting,
    isDoing:state.schedulemeetings.isDoing,
    data:state.schedulemeetings.meetings
  }
}
const mapDispatchToProps = dispatch => {
  return{
    cancelMeeting:data=>dispatch(MeetingActions.cancelScheduleMeeting(data)),
    startMeeting:data=>dispatch(MeetingActions.startScheduleMeeting(data)),
    editMeeting:data=>dispatch(MeetingActions.editScheduleMeeting(data)),
    fetchMeetings:data=>dispatch(MeetingActions.getListMeeting(data))
  }
}
export default connect(
mapStateToProps,mapDispatchToProps
)(ManageMeeting)