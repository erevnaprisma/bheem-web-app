import React, { Component,useEffect, PureComponent } from 'react'
import Helmet from 'react-helmet'
import Shimmer from "react-shimmer-effect";
import { connect } from 'react-redux'
import {getSession} from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'ramda'
import _ from 'lodash'
import {Images,Colors} from '../../Themes'
// Components
import Header from '../../Containers/Header'
import Footer from '../../Containers/Footer'
import './menu.css'
// Components
// import HorizontalScroll from 'react-scroll-horizontal'


class PageLogin extends PureComponent {

  
  render() {  
   
    return (
       <div>
      <Header/>
        <div id="main">
        <section id="contact" style={{minWidth:window.innerWidth,minHeight:window.innerHeight,background:Colors.primaryGray}}>
            <div class="container mx-auto" style={{marginTop:'10%'}}>
                <div className="mx-auto ">
                  <div className="section-title mx-auto ">
                    <h3 style={{color:'white'}}>Login</h3>
                    <span style={{color:'white'}}>for the future you can use your social media account</span>
                  </div>
                  <div className="row mt-1 mx-auto">
                    <div className="col-lg-8 mt-5 mt-lg-0 mx-auto">
                      <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                        
                        <div className="form-group">
                          <input type="email" className="form-control mx-auto" name="Email" placeholder="Email" ref="email" required />
                          <div className="validate" />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control mx-auto" name="Password" placeholder="password" ref="password" required/>
                          <div className="validate" />
                        </div>
                        <br/>
                        <div className="text-center"><button type="submit" className="btn">Login</button></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </div>
       </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  
  return {
  }
}
const mapDispatchToProps = dispatch => {
  
  return null
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(PageLogin))
)