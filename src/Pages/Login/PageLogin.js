import React, { Component,useEffect, PureComponent } from 'react'
import Helmet from 'react-helmet'
import Shimmer from "react-shimmer-effect";
import { connect } from 'react-redux'
import {getSession,formValidation,errorPopup} from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'ramda'
import _ from 'lodash'
import {Images,Colors} from '../../Themes'
// Components
import Header from '../../Containers/Header'
import Footer from '../../Containers/Footer'
import Loader from '../../Components/Loader'
import LoginAction from '../../Containers/Login/redux'


class PageLogin extends PureComponent {
  
  _onSubmitForm(e)
  {
    if (e) e.preventDefault()
    let errs=[]
    let email = formValidation(this.refs.email.value,"email",{email:true})
    let password = formValidation(this.refs.password.value,"password",{})
    if(email.err.length>0){ _.merge(errs,email.err) }
    if(errs.length>0){ errorPopup(errs)}
    else{ 
      email=email.value
      password=password.value
      this.props.doLogin({email,password,})
    }
  }
  componentDidMount()
  {
    this.props.doReset()
  }
  componentWillUnmount()
  {
    this.props.doReset()
  } 
  render() {  
    const {status,error,isRequesting} = this.props
    return (
       <div>
        <Header/>
        <Helmet>
          <title>Login</title>
        </Helmet>
          <div className="page-header" style={{backgroundImage: `url("${Images.LoginIllus}")`, backgroundSize: 'cover', backgroundPosition: 'top center'}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                  <div className="card card-login">
                    <form className="form" onSubmit={(e)=>this._onSubmitForm(e)}>
                      <div className="card-header card-header-primary text-center">
                        <h4 className="card-title">Login</h4>
                        {/* <div className="social-line">
                          <a href="#pablo" className="btn btn-just-icon btn-link">
                            <i className="fa fa-facebook-square" />
                          </a>
                          <a href="#pablo" className="btn btn-just-icon btn-link">
                            <i className="fa fa-twitter" />
                          </a>
                          <a href="#pablo" className="btn btn-just-icon btn-link">
                            <i className="fa fa-google-plus" />
                          </a>
                        </div> */}
                      </div>
                      <br/>
                      <div className="card-body">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">mail</i>
                            </span>
                          </div>
                          <input type="email" className="form-control" ref="email" placeholder="Email..." required/>
                        </div>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">lock_outline</i>
                            </span>
                          </div>
                          <input type="password" className="form-control" ref="password" placeholder="Password..." required/>
                        </div>
                      </div>
                      <br/>
                      <br/>
                      {(!isRequesting &&
                        <div className="footer text-center">
                          <button type="submit" className="btn btn-primary btn-link btn-wd btn-lg">Login</button>
                        </div>
                       )}
                      {(isRequesting &&
                        <center>
                            <Loader className="mx-auto" color="#000"/>
                            <p><strong>Logging In.....</strong></p>
                        </center>
                      )}
                      <center>
                      <p>Already have an account? <a href="/signup" className="btn-link"><strong>Signup</strong></a></p>
                      </center>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isRequesting: state.login.isRequesting,
    error :state.login.error,
    status: state.login.status
  }
}
const mapDispatchToProps = dispatch => {
  
  return {
    doLogin:data => dispatch(LoginAction.doLogin(data)),
    doReset:data => dispatch(LoginAction.doLoginReset(null))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(PageLogin))
)