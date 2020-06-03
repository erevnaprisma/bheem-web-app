import React, { Component } from 'react'

export default class Clients extends Component {
    render() {
        return (
           <section id="clients" className="clients">
                <div className="container" data-aos="zoom-in">
                    <div className="row">
                    <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <img src="assets/img/clients/client-1.png" className="img-fluid" alt />
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <img src="assets/img/clients/client-2.png" className="img-fluid" alt />
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <img src="assets/img/clients/client-3.png" className="img-fluid" alt />
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <img src="assets/img/clients/client-4.png" className="img-fluid" alt />
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <img src="assets/img/clients/client-5.png" className="img-fluid" alt />
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center">
                        <img src="assets/img/clients/client-6.png" className="img-fluid" alt />
                    </div>
                    </div>
                </div>
            </section>
        )
    }
}
