import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import ResponsiveContainer from '../Containers/ResponsiveContainer'
import { pageList } from '../Utils/Pages'

import {  getSession } from '../Utils/Utils'
import AppConfig from '../Config/AppConfig'
const basePath = AppConfig.basePath
const loginPath = basePath + '/login'

class App extends Component {
  constructor (props) {
    super(props)
    this.checkLogin(window.location.pathname)
    this.unlisten = this.props.history.listen((location, action) => {
      this.checkLogin(window.location.pathname)
    })
  }

  checkLogin (pathName) {
    // console.log('checkLogin statussssss')
    console.log(pathName,"pathnem",this.props);
    
    if (loginPath === pathName) {
      console.log('path = ' + pathName + '|no need check status')
    } else {
      console.log('path = ' + pathName + '|need check status')
      // this.props.checkLogedStatus({})
    }
  }

  componentWillUnmount () {
    this.unlisten()
  }


  render () {
    return <div>{this.props.children}</div>
  }
}

const AppContainer = withRouter(App)
class NavigationRouter extends Component {
_routeList(pageList)
{
  let rt=[]
  pageList.map(r =>(
    r.exact ?
    rt.push(<Route key={r.path} exact path={`${basePath}${r.path}`} component={r.component}/>)
    :
    rt.push(<Route key={r.path} path={`${basePath}${r.path}`} component={r.component}/>) 
  ))
  return rt
}
  render () {
    return (
      <Router>
        <AppContainer>
          <ResponsiveContainer>
            {this._routeList(pageList)}
          </ResponsiveContainer>
        </AppContainer>
      </Router>
    )
  }
}
export default NavigationRouter
