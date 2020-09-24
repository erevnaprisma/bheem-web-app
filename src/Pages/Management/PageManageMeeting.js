import React, { Component,useEffect, PureComponent } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Header from '../../Containers/Header'
import {getSession,formValidation, isLogin} from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'
import {Images,Colors} from '../../Themes'

// Components
import Loader from '../../Components/Loader'
import Swal from 'sweetalert2'
import DateTimePicker from 'react-datetime-picker';

//Actions
import MeetingActions from '../../Containers/Management/SceduleMeeting/redux'

//Menu
import ManageScheduleMeeting from './Meeting/ManageMeeting'
import MeetingSetting from './Meeting/SettingMeeting'
import AccountSetting from './Account/AccountSetting'
import ProfileSetting from './Profile/ProfileSetting'
//Modals
import ModalMeetingHistory from './Meeting/Modals/meetingHistory'
import ModalCreateMeeting from './Meeting/Modals/createScheduleMeeting'
import ModalChangePassword from './Account/Modals/ChangePassword' 
import { title } from 'process'


class PageManageMeeting extends PureComponent {
  constructor(props){
    super(props)
    this._onClickLink=this._onClickLink.bind(this)
    this._generateTitle=this._generateTitle.bind(this)
    this.state={
      activePage:this.props.match.params.page
    }
  }
  _generateTitle(list){
    var title=null
    const param=this.props.match.params.page
    list.map((r,i)=>{
      if(r.path==param){
        title=( <title>{r.name}</title>)
      }
    }) 
    return title   
  }
  _isInclude(listPages,path){
    const list=listPages.filter(e=> e.name === path)
    if(list.length > 0) return true
    return false
  }
  _onClickLink(path){
    this.props.history.replace({pathname:path})
  }
  render(){
    const {fetchMeetings} = this.props
    const param=this.props.match.params.page
    const listPages=[
      {name:'My Meetings',path:'manage-meeting',icon:'dashboard',comp:e=><ManageScheduleMeeting key={e} active={param === 'manage-meeting' ? 'nav-link active show' : 'nav-link'}/>},
      {name:'Metting Settings',path:'meeting-settings',icon:'build',comp:e=><MeetingSetting key={e} active={param === 'meeting-settings' ? 'nav-link active show' : 'nav-link'}/>},
      {name:'Account Settings',path:'account-settings',icon:'account_box',comp:e=><AccountSetting key={e} active={param === 'account-settings' ? 'nav-link active show' : 'nav-link'}/>},
      {name:'Profile Settings',path:'profile-settings',icon:'face',comp:e=><ProfileSetting key={e} active={param === 'profile-settings' ? 'nav-link active show' : 'nav-link'}/>},
    ]
    // if(param == null) window.location='/'
    // if(this._isInclude(listPages,param)) window.location='/'
    return (
      <div>
        <Helmet>
           {this._generateTitle(listPages)}
        </Helmet>
        <Header/>
        {/* Modals */}
        <ModalMeetingHistory/>
        <ModalCreateMeeting/>
        <ModalChangePassword/>
        {/* Modals */}
        <br/>
        <br/>
        <br/>
        <div className="main-raised">
            <div className="card card-nav-tabs">
              <div className="card-header card-header-primary">
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <ul className="nav nav-tabs" data-tabs="tabs">
                      {listPages.map((r,i)=>(
                        <li className="nav-item" key={i}>
                          <a className={ param === r.path ? 'nav-link active' : 'nav-link' } href={'#'+r.path} data-toggle="tab" onClick={()=>this._onClickLink(r.path)}>
                          <i className="material-icons">{r.icon}</i>
                          {r.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* content */}
              <div className="card-body ">
                <div className="tab-content text-center">
                  {listPages.map((r,i)=>(
                      r.comp(i)
                    ))
                  }
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
  return {}
}
const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(PageManageMeeting))
)