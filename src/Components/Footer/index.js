import React, { Component } from 'react'

export default class index extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <nav className="float-left">
                    <ul>
                        <li>
                            <a href="#">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Pricing and Plans
                            </a>
                        </li>
                    </ul>
                    </nav>
                    <div className="copyright float-right">
                    Powered by &nbsp;
                    <a href="https://www.erevnaraya.co.id/" target="_blank">PT. Erevna Raya Teknologi</a>
                    </div>
                </div>
            </footer>

        )
    }
}
