import React, { Component,useEffect, PureComponent } from 'react'
import Helmet from 'react-helmet'
import Shimmer from "react-shimmer-effect";
import { connect } from 'react-redux'
import {getSession,formValidation, isLogin} from '../../Utils/Utils'
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
import MeetingActions from '../../Containers/Management/SceduleMeeting/redux'

//Menu
import Manage from './ManageMeeting'
import Setting from './SettingMeeting'

//Modals
import CreateMeeting from './Modals/createScheduleMeeting'


class PageManageMeeting extends PureComponent {
  constructor(props)
  {
    super(props)
  }
  componentWillMount()
  {
    isLogin()
  }
  _selected(nav)
  {
    const param=this.props.match.params.opt
    if(param == nav)
    {
        return 'nav-link active'
    }
    else
    {
        return 'nav-link' 
    }
  }
  render() {
    const {fetchMeetings} = this.props
    fetchMeetings()
    // console.log("paramss>>>>>",this.props.match.params.opt)

    return (
      <div>
        <Helmet><title>Manage Meeting</title></Helmet>
        <Header/>
        <CreateMeeting/>
        <br/>
        <br/>
        <br/>
        <div className="main-raised">
            {/* Tabs with icons on Card */}
            <div className="card card-nav-tabs">
              <div className="card-header card-header-primary">
                {/* colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" */}
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      <li className="nav-item" onClick={()=>fetchMeetings()}>
                        <a className={this._selected('manage-meeting')} href="#manage-meeting" data-toggle="tab">
                          <i className="material-icons">dashboard</i>
                          Manage Schedule Meeting
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className={this._selected('meeting-setting')} href="#setting-meeting" data-toggle="tab">
                          <i className="material-icons">build</i>
                         Meeting Settings
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* content */}
              <div className="card-body ">
                <div className="tab-content text-center">
                  <Manage/>
                  <Setting/>
                </div>
              </div>
              {/* content */}
            </div>
            
            {/* End Tabs with icons on Card */}
          </div>

          
          
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return null
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMeetings:data=>dispatch(MeetingActions.getListMeeting(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(PageManageMeeting))
)