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
import Footer from '../Components/Footer'

class SubContainer extends React.PureComponent {
  _exclude(pg)
  {
    if(pg.includes(window.location.pathname)) return true
    else  return false
  }
  componentWillMount(){
    const pg=['/','/home','/login','/waiting-room','/join-meeting','/signup']
     if(!this._exclude(pg))
     {
      isLogin()
      if(window.location.pathname == '/manage-meeting') isLogin(true) 
     }
  }  
  render () {
    console.log('render window.location ', window.location.pathname)
    const pg=['/','/home','/manage-meeting']
    const loc = window.location.pathname
    const { children } = this.props
    return (
      <div>
        <ModalLogout/>
        {children}
        {this._exclude(pg) && <Footer/>}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}
const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubContainer)
