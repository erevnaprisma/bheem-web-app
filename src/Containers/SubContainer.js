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
  state={
    isLoading:false
  }
  static propTypes = {
    onLogout: PropTypes.func
  }

  static defaultProps = {
    onLogout: () => {}
  }

  constructor (props) {
    super(props)
    this.state = { isLoggedIn: this.props.isLoggedIn }
    this.renderLoggedIn = this.renderLoggedIn.bind(this)
    this.renderUnLoggedIn = this.renderUnLoggedIn.bind(this)
  }
  componentWillMount()
  {
    const login=AppConfig.basePath+'/login'
    if(localStorage.getItem(AppConfig.sessionToken))
    {
      this.props.resetfetchProfile()
      window.location.replace(`${AppConfig.basePath}/`)
    }
  }
  renderLoggedIn (children) {
    return (
      <body style={{background:'black'}}>
        {/* {(isLoggedIn(this.props.isLoggedIn) === true) && <Header/>} */}
        {children}
      </body>
    )
  }
  componentDidMount()
  {
    if(localStorage.getItem(AppConfig.sessionToken))
    {
      const merchant_id=getSession('merchant_id')
      this.props.fetchProfile({merchant_id:getSession('merchant_id')})
      this.props.getRelated({merchant_id})
    }
  }
  renderUnLoggedIn (children) {

    return (
      <div> 
        <div style={{ minHeight: window.innerHeight - 200 }}>{children}</div>
      </div>
    )
  }

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
