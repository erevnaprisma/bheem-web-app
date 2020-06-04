import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Images,Colors} from '../../Themes'
import AppConfig from '../../Config/AppConfig'
import {getSession} from '../../Utils/Utils'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

class index extends Component {
    _get(){
        const filter=['/login','/signup']

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
    render() {
        const userData=getSession(AppConfig.sessionUserData)
        console.log("userdata session>>>",userData)

        return (
            <header id="header" className="header-style fixed-top">
                <div className="d-flex align-items-center" style={{marginLeft:'5%',marginRight:'5%'}}>
                    <h1 className="logo "><a href="/">Bheem</a></h1>
                    <a href="index.html" className="logo mr-auto"><img src={Images.BheemLogo} alt="" className="img-fluid"/></a>
                    <nav className="nav-menu d-none d-lg-block mr-5">
                    <ul>
                        <li className="active"><a href="/">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#portfolio">Clients</a></li>
                        <li><a href="#team">Features</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>

                    </nav>
                    {/* button */}

                    {/* Mobile */}
                    <a href="#about" className="btnHostB btnHeader" id="header-host">Host</a>
                    <a href="/concal" className="btnJoinB btnHeader" id="header-join">Join</a>
                    {/* Mobile */}

                    {/* Desktop */}
                    <a href="#about" className="btnHost btnHeader" id="header-host">Host a meeting</a>
                    <a href="/concal" className="btnJoin btnHeader" id="header-host">Join a meeting</a>
                    {/* Desktop */}

                    {/* button */}
                    {(_.isEmpty(userData) && !_.has(userData,'userId') &&
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
                   {(!_.isEmpty(userData)&&_.has(userData,'userId') && 
                        <div class="dd-header">
                                <button class="dd-header-btn">
                                    <div className="row" id="avatar-sec"> 
                                        <strong className="avatarName" id="avatar-sec-name">{userData.firstName}</strong>
                                        <div>
                                            <img className="avatar df-avatar" src={userData.profilePicture||Images.Avatar}/>
                                        </div>                        
                                    </div>

                                </button>
                                <div class="dd-content">
                                    <a className="row dd-content-header">
                                    <img className="avatar" src={userData.profilePicture||Images.Avatar}/>&nbsp;&nbsp;&nbsp;{`  Hii . `}<strong>{userData.nickName||userData.firstName}</strong>
                                    </a>
                                    <a href="#">Setting&nbsp;&nbsp;<span className="fas fa-cog"/></a>
                                    <a href="#">Logout &nbsp;&nbsp;<span className="fas fa-sign-out-alt"/></a>
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
    //   isRequesting: state.login.isRequesting,
    //   error :state.login.error,
    //   status: state.login.status
    }
  }
  const mapDispatchToProps = dispatch => {
    
    return {
    //   doLogin:data => dispatch(LoginAction.doLogin(data)),
    //   doReset:data => dispatch(LoginAction.doLoginReset(null))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    injectIntl(withRouter(index))
  )