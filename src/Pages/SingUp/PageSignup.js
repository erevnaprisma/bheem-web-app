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
import Swal from 'sweetalert2'

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
    let errs=[]
    let email = formValidation(this.refs.email.value,"email",{email:true})
    let first_name = formValidation(this.refs.first_name.value,"first name",{min_length:2})
    let last_name = formValidation(this.refs.last_name.value,"last name",{min_length:2})
    
    if(email.err.length>0){ errs.push(email.err) }
    if(first_name.err.length>0){ errs.push(first_name.err) }
    if(last_name.err.length>0){ errs.push(last_name.err) }
    
    if(errs.length>0){ 
      errorPopup(errs)}
    else{ 
      email=email.value
      first_name=first_name.value
      last_name=last_name.value
      this.props.doSignup({email,first_name,last_name})
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
    const {status,errors,isRequesting} = this.props
    return (
      <div style={{background:`url(${Images.HomeIllus}) center`,backgroundSize:'contain'}}>
      <Header/>
      <Helmet>Signup</Helmet>
      <div className="page-header" style={{backgroundImage:`url("${Images.SignUpIllus}")`, backgroundSize: 'cover', backgroundPosition: 'top center'}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                  <div className="card card-login">
                    <form className="form" onSubmit={(e)=>this._onSubmitForm(e)}>
                      <div className="card-header card-header-primary text-center">
                        <h4 className="card-title">Signup</h4>
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
                      <div className="card-body">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">emoji_emotions</i>
                            </span>
                          </div>
                          <input type="text" className="form-control" placeholder="First Name..." ref="first_name" required/>
                        </div>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">mood</i>
                            </span>
                          </div>
                          <input type="text" className="form-control" placeholder="Last Name..." ref="last_name" required/>
                        </div>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">mail</i>
                            </span>
                          </div>
                          <input type="email" className="form-control" placeholder="Email..." ref="email" required/>
                        </div>
                      </div>
                      {(!isRequesting &&
                        <div className="footer text-center">
                          <button type="submit" className="btn btn-primary btn-link btn-wd btn-lg" required>Signup</button>
                        </div>
                       )}
                      {(isRequesting &&
                        <center>
                            <Loader className="mx-auto" color="#000"/>
                            <p><strong>Registering.....</strong></p>
                        </center>
                      )}
                      <center>
                      <p>Already have an account? <a href="/login" className="btn-link"><strong>Login</strong></a></p>
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