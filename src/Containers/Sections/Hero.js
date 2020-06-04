import React, { Component } from 'react'
import { Images } from '../../Themes'
import {getSession} from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
import _ from  'lodash'

export default class Hero extends Component {
    render() {
        const userData=getSession(AppConfig.sessionUserData)
        return (
            <section id="hero" style={{background:`url(${Images.People}) center`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                {(_.isEmpty(userData)&&!_.has(userData,'userId') && 
                    <div className="hero-container">
                        <h3><strong>Bheem</strong></h3>
                        <h1>Video Conference</h1>
                        <h2>Conects us all</h2>
                        <h2 style={{marginBottom:2}}>Create your new own account</h2>
                        <br/>
                        <a href="/signup" className="btn-get-started scrollto">Get Started</a>
                        <br/>
                        <h2 style={{marginBottom:2}}>or</h2>
                        <h2>Already have an account <a href="/Login"><strong>Login</strong></a></h2>
                    </div>
                )}
                {(!_.isEmpty(userData)&&_.has(userData,'userId') && 
                    <div className="hero-container">
                        <h3><strong>Bheem</strong></h3>
                        <h1>WELCOME {userData.firstName}</h1>
                        <br/>
                        <div className="row">
                            <a href="/concal" className="btn-get-started scrollto">Host meeting</a>
                            {'\u00A0\u00A0'}
                            <a href="/" className="btn-get-started scrollto">Host meeting</a>
                        </div>
                        <br/>
                    </div>
                )}
            </section>

        )
    }
}
 