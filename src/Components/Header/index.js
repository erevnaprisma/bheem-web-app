import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Images,Colors} from '../../Themes'
import AppConfig from '../../Config/AppConfig'
import jwtDecode from 'jwt-decode'
import {getSession} from '../../Utils/Utils'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import LoginAction from '../../Containers/Login/redux'
import Loader from '../../Components/Loader'
import images from '../../Themes/Images'



class index extends Component {
    _get(){
        const filter=['/','/login','/signup','/host-meeting','/join-meeting']
        if(_.find(filter,function(o){ return o == window.location.pathname.toString().toLowerCase();}))
        {
            return true
        }
       return false
     }
    _Logout()
    {
      this.props.doLogout()
    }
    render() {
        const userData=getSession(AppConfig.sessionUserData)
        const meetingSesssion=getSession(AppConfig.sessionMeeting)
        const nav=!this._get() ? 'navbar navbar-inverse navbar-expand-lg bg-dark' : 'navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg'
        console.log("bheem all session>>>",window.localStorage.getItem(AppConfig.sessionData))
        console.log("bheem userdata session>>>",userData)
        console.log("bheem login flag>>>",getSession(AppConfig.loginFlag))
        console.log("bheem sion>>>",meetingSesssion)
        return (
            <nav className='navbar navbar-inverse navbar-expand-lg bg-dark' id="sectionsNav" style={{padding:0, marginBottom:0}}>
                <div className="container">
                    <div className="navbar-translate">
                        <a className="navbar-brand mb-3" href="/">
                            <div className="logo-image">
                                <img src={Images.LogoPutih} className="navbar-brand" />
                            </div>
                        </a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="sr-only">Toggle navigation</span>
                             <div>
                              <span className="navbar-toggler-icon" />
                              <span className="navbar-toggler-icon" />
                              <span className="navbar-toggler-icon" />
                            </div>
                            {/* {(_.isEmpty(userData) &&

                            )}
                            {(!_.isEmpty(userData)&&_.has(userData,'id') &&
                            <div className="pr-gambar2 profile-photo-small" style={{width:50}}>
                               <img src={Images.Avatar} alt="Circle Image" className="rounded-circle img-fluid" />
                            </div>)} */}
                        </button>
                    </div>
                    
                    <div className="collapse navbar-collapse">

                        <ul className="navbar-nav ml-auto">
                        {(!_.isEmpty(userData)&&_.has(userData,'id') && 
                          <li className="pr-gambar3 dropdown nav-item">
                                <div className="dropdown-toggle snav-link" data-toggle="dropdown">
                                  <a href="#" className="dropdown-item">Me ({userData.firstName})</a>
                                </div>
                                <div className="dropdown-menu dropdown-menu-right">
                                    {/* <h6 className="dropdown-header">Dropdown header</h6> */}
                                    <a href="#" className="dropdown-item">Me ({userData.firstName})</a>
                                      <a href="/manage-meeting" className="dropdown-item">My meetings</a>
                                      <a href="#" className="dropdown-item">Settings</a>
                                      <a  className="dropdown-item" data-toggle="modal"  data-target="#modal-logout">Logout</a>
                                </div>
                            </li>
                        )}
                        {/* {(!this._get() && */}
                            <li className="nav-item">
                                <a className="nav-link" href="/" target="_parent">
                                <i className="material-icons">home</i>
                                  <strong>Home</strong>
                                </a>
                            </li> 
                        {/* )} */}
                            {/* {(!meetingSesssion&& */}
                              <li className="nav-item">
                                <a className="nav-link" href="/host-meeting" target="_parent">
                                  <strong>Host Meeting</strong>
                                </a>
                              </li>
                            {/* )} */}

                            {/* {(!meetingSesssion&& */}
                              <li className="nav-item">
                                  <a className="nav-link" href="/join-meeting" target="_parent">
                                    <strong>Join Meeting</strong>
                                  </a>
                              </li>
                            {/* )} */}

                            {(_.isEmpty(userData) && !_.has(userData,'id') &&
                            <li className="nav-item">
                                <a className="nav-link" href="/login" target="_parent">
                                  <strong>Login</strong>
                                </a>
                            </li> 
                            )}
                            {(_.isEmpty(userData) && !_.has(userData,'id') &&
                            <li className="nav-item">
                                <a className="btn btn-rose btn-raised btn-round" href="/signup" target="_parent">
                                  <strong>Get started</strong>
                                </a>
                            </li>
                            )}
                            {(!_.isEmpty(userData)&&_.has(userData,'id') && 
                            <div>
                                <li className="pr-gambar dropdown nav-item">
                                <div className=" profile-photo dropdown-toggle nav-link" data-toggle="dropdown">
                                      <div className="profile-photo-small">
                                      <img src={Images.Avatar} alt="Circle Image" className="rounded-circle img-fluid" />
                                      </div>
                                  </div>
                                  <div className="dropdown-menu dropdown-menu-right">
                                      {/* <h6 className="dropdown-header">Dropdown header</h6> */}
                                      <a href="/me/profile" className="dropdown-item">Me ({userData.firstName})</a>
                                      <a href="/me/manage-meeting" className="dropdown-item">My meetings</a>
                                      <a href="/me/meeting-settings" className="dropdown-item">Meeting settings</a>
                                      <a href="#" className="dropdown-item">Settings</a>
                                      <a  className="dropdown-item" data-toggle="modal"  data-target="#modal-logout">Logout</a>
                                  </div>
                              </li>
                            </div>
                            )}

                        </ul>
                    </div>
                </div>
                </nav>

        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      isRequesting: state.login.isRequesting,
    //   error :state.login.error,
    //   status: state.login.status
    }
  }
  const mapDispatchToProps = dispatch => {
    
    return {
      doLogout:data => dispatch(LoginAction.doLogout(data)),
    //   doReset:data => dispatch(LoginAction.doLoginReset(null))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    injectIntl(withRouter(index))
  )