import React, { Component,useEffect, PureComponent } from 'react'
import Helmet from 'react-helmet'
import moment from 'moment'
import Shimmer from "react-shimmer-effect";
import { connect } from 'react-redux'
import {getSession} from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'ramda'
import _ from 'lodash'
// Components
import Header from '../../Containers/Header'

import Hero from '../../Containers/Sections/Hero'
// Sections
import PnPOverview from './Sections/PlansPricingOverview'
import Soket from '../../Containers/Socket/socketListeners'

export default class PageHome extends PureComponent {
  render() {  
    console.log("soket>>>>",Soket)
    return (
     <div className="navbar-header visible-xs">
       <Helmet>
         <title>Bheem | Connect us all</title>
       </Helmet>
      <Header/>
      <Hero/>
        <div className="main main-raised">
            <div className="container">
              <PnPOverview/>
            </div>
          </div>
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