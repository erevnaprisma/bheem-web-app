import PropTypes from 'prop-types'
import React,{Suspense} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isLoggedIn, getSession } from '../Utils/Utils'
import AppConfig from '../Config/AppConfig'
import Header from  './Header'

// import Lottie from 'react-lottie'
// import * as Anim from '../Components/Loader/Loader_asset/Loader-merah.json'
class SubContainer extends React.PureComponent {
  
  render () {
    console.log('render window.location ', window.location.pathname)
    const loc = window.location.pathname
    const { children } = this.props
    return (
      <div>
        {/* {window.location.pathname != '/conference-call' && <Header/>} */}
        {children} 
      </div>
    )
    // if (loc.startsWith(AppConfig.basePath + '/login-force')) 
    // {
    //   return this.renderUnLoggedIn(children)
    // }
    // if ((isLoggedIn(this.props.isLoggedIn) === true)) return this.renderLoggedIn(children)
    // else return this.renderUnLoggedIn(children)
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
