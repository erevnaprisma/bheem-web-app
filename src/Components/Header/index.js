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



class index extends Component {
    _get(){
        const filter=['/login','/signup','/host-meeting','/join-meeting']
        if(_.find(filter,function(o){ return o == window.location.pathname.toString().toLowerCase();}))
        {
            return true
        }
       return false
     }
    componentWillMount()
    {
       const isExist=this._get()

        if(!isExist) require('./header.css')
        else require('./header-light.css')
    }
    _Logout()
    {
        this.props.doLogout()
    }
    render() {
        const userData=getSession(AppConfig.sessionUserData)
        console.log("userdata session>>>",userData)
        // const token=jwtDecode(getSession(AppConfig.sessionToken))
        // const now=new Date()
        // const ml=now.getMilliseconds()
        // console.log("Token",token)
        // console.log("Now date",new Date())
        // console.log("Exp date",new Date(new Date().getTime()+jwtDecode(token).exp*1000))
    
        return (
            <header id="header" className="header-style fixed-top">
                
                <div className="d-flex align-items-center" style={{marginLeft:'5%',marginRight:'5%'}}>
                    <a href="/" className="logo mr-auto"><img src={Images.LogoPutih} alt="" className="img-fluid"/></a>
                    {(window.location.pathname == '/home' || window.location.pathname == '/'&&  
                        <nav className="nav-menu d-none d-lg-block mr-5">
                            <ul>
                                <li className="active"><a href="/">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#portfolio">Clients</a></li>
                                <li><a href="#team">Features</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </nav>
                    )}
                    {(this._get(window.location.pathname) &&  
                        <nav className="nav-menu d-none d-lg-block mr-5">
                            <ul>
                                <li className="active"><a href="/">Home</a></li>
                            </ul>
                        </nav>
                    )}
                    {/* button */}

                    {/* Mobile */}
                    <a href="/host-meeting" className="btnHostB btnHeader" id="header-host">Host</a>
                    <a href="/join-meeting" className="btnJoinB btnHeader" id="header-join">Join</a>
                    {/* Mobile */}

                    {/* Desktop */}
                    <a href="/host-meeting" className="btnHost btnHeader" id="header-host">Host a meeting</a>
                    <a href="/join-meeting" className="btnJoin btnHeader" id="header-host">Join a meeting</a>
                    {/* Desktop */}

                    {/* button */}
                    {(_.isEmpty(userData) && !_.has(userData,'id') &&
                        <div>
                            <a href="/Login" className="btnLoginheader btnHeader" id="btnLoginheader">Login</a>
                        </div>
                    )}
                   {/* {(!_.isEmpty(userData)&&_.has(userData,'userId') && 
                    <div className="row profileSec" id="avatar-sec"> 
                        <strong className="avatarName" id="avatar-sec-name">{userData.firstName}</strong>
                            <div>
                                <img className="avatar" src={userData.profilePicture||Images.Avatar}/>
                            </div>                        
                        </div>
                   )} */}
                   {(!_.isEmpty(userData)&&_.has(userData,'id') && 
                        <div className="dd-header">
                                <button className="dd-header-btn">
                                    <div className="row" id="avatar-sec"> 
                                        <strong className="avatarName" id="avatar-sec-name">{userData.firstName}</strong>
                                        <div>
                                            <img className="avatar df-avatar" src={userData.profilePicture||Images.Avatar}/>
                                        </div>                        
                                    </div>

                                </button>
                                <div className="dd-content">
                                    <a href="" className="row dd-content-header">
                                        {/* <img className="avatar" src={userData.profilePicture||Images.Avatar}/>&nbsp;&nbsp;&nbsp;{`  Hii . `}<strong>{userData.nickName||userData.firstName}</strong> */}
                                        <strong>{'Hii!! '+userData.firstName+' click here to go to your profile'}</strong>
                                    </a>
                                    <a href="#">Setting&nbsp;&nbsp;<span className="fas fa-cog"/></a>
                                    <a  data-toggle="modal" data-target="#modal-logout">Logout &nbsp;&nbsp;<span className="fas fa-sign-out-alt" /></a>
                                </div>
                        </div>
                        
                   )}
                </div>
            </header>

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