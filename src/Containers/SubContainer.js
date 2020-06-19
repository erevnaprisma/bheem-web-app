import PropTypes from 'prop-types'
import React,{Suspense} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isLoggedIn, getSession } from '../Utils/Utils'
import AppConfig from '../Config/AppConfig'
import Header from  './Header'
import {isLogin} from '../Utils/Utils'
import ModalLogout from '../Components/Modal/Logout'

class SubContainer extends React.PureComponent {
  componentWillMount(){
    console.log("window===>>",window.location.pathname)
    //  if(window.location.pathname != '/join-meeting')
    //  {
    //   isLogin()
    //  }
  }  
  render () {
    console.log('render window.location ', window.location.pathname)
    const loc = window.location.pathname
    const { children } = this.props
    return (
      <div>
        <ModalLogout/>
        {children} 
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubContainer)
