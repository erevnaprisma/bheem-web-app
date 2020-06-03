import React, { Component,useEffect, PureComponent } from 'react'
import Helmet from 'react-helmet'
import moment from 'moment'
import Shimmer from "react-shimmer-effect";
import { connect } from 'react-redux'
import {getSession} from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import Mainstreaming from './VideoStream'
import { isEmpty } from 'ramda'
import _ from 'lodash'
// Components
import Header from '../../Containers/Header'
import Footer from '../../Containers/Footer'
import About from '../../Containers/Sections/About'
import Services from '../../Containers/Sections/Services'
import Pricing from '../../Containers/Sections/Pricing'
import Team from '../../Containers/Sections/Team'
import Hero from '../../Containers/Sections/Hero'
// Components
// import HorizontalScroll from 'react-scroll-horizontal'


export default class PageHome extends PureComponent {

  
  render() {  
   
    return (
     <div className="navbar-header visible-xs">
      <Header/>
      <Hero/>
        <div id="main">
          <About/>
          <Team/>
          <Services/>
          <Pricing/>
        </div>
      <Footer/>
     </div>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
  
//   return {
//   }
// }
// const mapDispatchToProps = dispatch => {
  
//   return {
    
//   }
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(
//   injectIntl(withRouter(PageHome))
// )