import React, { Component,useEffect, PureComponent } from 'react'
import Helmet from 'react-helmet'
import Shimmer from "react-shimmer-effect";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'ramda'
import _ from 'lodash'
import {Images,Colors} from '../../Themes'
// Components
import Header from '../../Containers/Header'
import Footer from '../../Containers/Footer'
import Loader from '../../Components/Loader'


class Page404 extends PureComponent {
  render() {  
    return (
       <div>
        <Header/>
        <Helmet>
          <title>404 page not found</title>
        </Helmet>
          <div className="page-header" style={{backgroundImage: `url("${Images.LoginIllus}")`, backgroundSize: 'cover', backgroundPosition: 'top center'}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                  <div className="card card-login">
                    <form className="form" onSubmit={(e)=>this._onSubmitForm(e)}>
                      <div className="card-header card-header-primary text-center">
                        <h4 className="card-title">404 Page Not Found</h4>
                      </div>
                      <br/>
                      <div className="card-body">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">home</i>
                            </span>
                          </div>
                          <input type="password" className="form-control" ref="password" placeholder="Password..." required/>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
    )
  }
}

export default Page404