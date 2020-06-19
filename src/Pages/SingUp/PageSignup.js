import React, { Component,useEffect, PureComponent } from 'react'
import Helmet from 'react-helmet'
import Shimmer from "react-shimmer-effect";
import { connect } from 'react-redux'
import {getSession} from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'ramda'
import _ from 'lodash'
import {Images,Colors} from '../../Themes'
// Components
import Header from '../../Containers/Header'
import Footer from '../../Containers/Footer'
import Loader from '../../Components/Loader'
import Swal from 'sweetalert2'

import './menu.css'
// Components
// import HorizontalScroll from 'react-scroll-horizontal'

//Actions
import SignUpActions from '../../Containers/Signup/redux'


class PageSignUp extends PureComponent {
  constructor(props)
  {
    super(props)
    this._onSubmitForm=this._onSubmitForm.bind(this)
  }
  _onSubmitForm(e)
  {
    if (e) e.preventDefault()
    const email = this.refs.email.value
    const first_name = this.refs.first_name.value
    const last_name = this.refs.last_name.value
    this.props.doSignup({email,first_name,last_name})
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
    const {status,errors,isRequesting} = this.props
    return (
      <div style={{background:`url(${Images.HomeIllus}) center`,backgroundSize:'contain'}}>
      <Header/>
      <Helmet>Signup</Helmet>
        <div id="main">
            <section id="contact" style={{minWidth:window.innerWidth,minHeight:window.innerHeight}}>
              <div className="container mx-auto" style={{marginTop:'10%'}}>
                <div className="mx-auto " style={{background:`rgba(82, 82, 82, 0.8)`,paddingTop:20,paddingBottom:20}}>
                  <div className="section-title mx-auto ">
                    <h3 style={{color:'white'}}>SignUp</h3>
                    {/* <span style={{color:'white'}}>for the future you can use your social media account</span> */}
                  </div>
                  <div className="row mt-1 mx-auto">
                    <div className="col-lg-8 mt-5 mt-lg-0 mx-auto" >
                      <form onSubmit={(e)=>this._onSubmitForm(e)}>
                        <div className="form-group">
                          <input type="text" className="InputText form-control mx-auto" name="First name" placeholder="First name" ref="first_name" required/>
                          <div className="validate"/>
                        </div>
                        <div className="form-group">
                          <input type="text" className="InputText form-control mx-auto" name="Last name" placeholder="Last name" ref="last_name" required/>
                          <div className="validate"/>
                        </div>
                        <div className="form-group">
                          <input type="email" className="InputText form-control mx-auto" name="Email" placeholder="Email" ref="email" required />
                          <div className="validate" />
                        </div>
                        <br/>
                        <div className="text-center">
                          {!isRequesting && <button type="submit" className="btn" required>Signup</button>}
                          {(isRequesting && <center>
                            <Loader className="mx-auto"/>
                          </center>)}
                        </div>
                        <br/>
                        <center>
                          <span style={{color:Colors.primaryWhite}}>Already have an account?</span> <a href="/Login" style={{color:'red'}}> <strong style={{color:'white'}}>Login</strong></a>
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
    isRequesting: state.signUp.isRequesting,
    errors :state.signUp.errors,
    status: state.signUp.status
  }
}
const mapDispatchToProps = dispatch => {
  return {
    doSignup:data => dispatch(SignUpActions.doSignUp(data)),
    doReset:data => dispatch(SignUpActions.doSignUpReset(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(PageSignUp))
)