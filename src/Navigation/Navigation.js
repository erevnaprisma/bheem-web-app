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
    this.unlisten = this.props.history.listen((location, action) => {
      this.checkLogin(window.location.pathname)
    })
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
