import React from 'react'
import { connect } from 'react-redux'
import SignupPageComponent from '../../Components/Signup/SignupPageComponent'
import {isLoggedIn} from '../../Utils/Utils'
import LoginActions, {LoginSelectors} from '../Login/redux'
import SignUpActions from './redux'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const TheComponent = props => {
  if (isLoggedIn(props.isLoggedIn) !== true) { return <SignupPageComponent {...props} /> } else window.open(`${basePath}/`, '_self')
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    errors:state.signup.errors,
    status:state.signup.status,
    isRequest:state.signup.isRequesting,
    isResult:state.signup.isResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit: data => dispatch(SignUpActions.signupSubmit(data)),
   reset: data => dispatch(SignUpActions.signupFormReset())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TheComponent)
