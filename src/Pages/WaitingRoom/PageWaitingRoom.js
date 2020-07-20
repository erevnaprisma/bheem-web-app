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
//Actions
import SignUpActions from '../../Containers/Signup/redux'
import io from 'socket.io-client'
import AppConfig from '../../Config/AppConfig';

class PageSignUp extends PureComponent {
  componentDidMount()
  {
      const socketIo=io(AppConfig.socketUrl)
      console.log("id soket>>> ",socketIo)
      socketIo.on('userAllow',e=>
        alert("Success Join data>>>\n",e)
      )  
  }
  render() {
    const {status,errors,isRequesting} = this.props
    return (
      <div style={{background:`url(${Images.HomeIllus}) center`,backgroundSize:'contain'}}>
      <Header/>
      <Helmet><title>Waiting Room</title></Helmet>
      {/* <div className="page-header" style={{backgroundImage:`url("${Images.SignUpIllus}")`, backgroundSize: 'cover', backgroundPosition: 'top center'}}> */}
        <div className="page-header" style={{background:'#fff' ,backgroundSize: 'cover', backgroundPosition: 'top center'}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                  <div className="card card-login" style={{background:Colors.primaryRed}}>    
                    <center>
                        <Loader className="mx-auto" color="#fff"/>
                        <p style={{color:'#fff'}}><b>Joining the room..</b></p>
                        <p style={{color:'#fff'}}>Waiting for host to accept your request</p>
                    </center>
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