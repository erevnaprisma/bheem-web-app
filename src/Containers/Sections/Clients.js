import React, { Component } from 'react'
import {Images} from '../../Themes'

export default class Clients extends Component {
    render() {
        const clients=[Images.UnivPrisma,Images.SKP]
        return (
           <section id="clients" className="clients">
                <div className="container" data-aos="zoom-in">
                    <div className="row">
                        {(clients.map((r)=>
                            <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                                <img src={r} className="img-fluid" alt />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}
