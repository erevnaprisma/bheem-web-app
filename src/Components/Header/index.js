import React, { Component } from 'react'
import {Images,Colors} from '../../Themes'
import './header.css'
export default class index extends Component {
    render() {
        return (
            <header id="header" className="fixed-top ">
                <div className="d-flex align-items-center" style={{marginLeft:'5%',marginRight:'5%'}}>
                    <h1 className="logo mr-auto"><a href="/">Bheem</a></h1>
                    <a href="index.html" class="logo mr-auto"><img src={Images.BheemLogo} alt="" class="img-fluid"/></a>
                    <nav className="nav-menu d-none d-lg-block mr-5">
                    <ul>
                        <li className="active"><a href="/">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#portfolio">Clients</a></li>
                        <li><a href="#team">Features</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>

                    </nav>
                    {/* button */}

                    {/* Mobile */}
                    <a href="#about" className="btnHostB btnHeader" id="header-host">Host</a>
                    <a href="#about" className="btnJoinB btnHeader" id="header-join">Join</a>
                    {/* Mobile */}

                    {/* Desktop */}
                    <a href="#about" className="btnHost btnHeader" id="header-host">Host a meeting</a>
                    <a href="#about" className="btnJoin btnHeader" id="header-host">Join a meeting</a>
                    {/* Desktop */}

                    {/* button */}
                    <div>
                        <a href="/Login" className="btnLoginheader btnHeader" id="btnLoginheader">Login</a>
                    </div>
                    {/* <div className="row profileSec" id="avatar-sec"> 
                        <strong className="avatarName" id="avatar-sec-name">DevidClrRantngS</strong>
                        <div>
                            <img className="avatar" src={Images.Avatar}/>
                        </div>                        
                    </div> */}
                    
                </div>
            </header>

        )
    }
}
