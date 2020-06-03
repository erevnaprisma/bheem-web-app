import React, { Component } from 'react'
import { Images } from '../../Themes'

export default class Hero extends Component {
    render() {
        return (
            <section id="hero" style={{background:`url(${Images.People}) center`,}}>
                <div className="hero-container">
                    <h3><strong>Bheem</strong></h3>
                    <h1>Video Conference</h1>
                    <h2>Conects us all</h2>
                    <a href="#about" className="btn-get-started scrollto">Get Started</a>
                    <br/>
                    <h2 style={{marginBottom:2}}>Create your new own account</h2>
                    <h2 style={{marginBottom:2}}>or</h2>
                    <h2>Already have an account <a href="/Login"><strong>Login</strong></a></h2>
                </div>
            </section>

        )
    }
}
 