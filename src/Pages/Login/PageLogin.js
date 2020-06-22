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
import './menu.css'
// Components
// import HorizontalScroll from 'react-scroll-horizontal'


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
       <div style={{background:`url(${Images.HomeIllus}) center`,backgroundSize:'contain'}}>
      <Header/>
      <Helmet>Login</Helmet>
        <div id="main">
        <section id="contact" style={{marginTop:30,minWidth:window.innerWidth,minHeight:window.innerHeight}}>
            <div class="container mx-auto" style={{marginTop:'10%'}}>
                <div className="mx-auto" style={{background:`rgba(82, 82, 82, 0.8)`,paddingTop:20,paddingBottom:20}}>
                  <div className="section-title mx-auto ">
                    <h3 style={{color:'white'}}>Login</h3>
                    <span style={{color:'white'}}>In our future features. you can use your social media account</span>
                  </div>
                  <div className="row mt-1 mx-auto">
                    <div className="col-lg-8 mt-5 mt-lg-0 mx-auto">
                      <form onSubmit={(e)=>this._onSubmitForm(e)}>
                        
                        <div className="form-group">
                          <input type="email" className="InputText form-control mx-auto" name="Email" placeholder="Email" ref="email" required />
                          <div className="validate" />
                        </div>
                        <div className="form-group">
                          <input type="password" className="InputText form-control mx-auto" name="Password" placeholder="Password" ref="password" required/>
                          <div className="validate"/>
                        </div>
                        <br/>
                        <div className="text-center">
                          {!isRequesting && <button type="submit" className="btn" required>Login</button>}
                          {(isRequesting && <center>
                            <Loader className="mx-auto"/>
                          </center>)}
                        </div>
                        <br/>
                        <center>
                          <span style={{color:Colors.primaryWhite}}>Or if you don't have acoount?</span> <a href="/signup" style={{color:'red'}}> <strong style={{color:'white'}}>Sign Up</strong></a>
                        </center>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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