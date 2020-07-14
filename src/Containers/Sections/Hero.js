import React, { Component } from 'react'
import { Images } from '../../Themes'
import {getSession} from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
import _ from  'lodash'
import Lottie from 'react-lottie'
import * as dataAnim from './assets/animasi-jempol.json'

export default class Hero extends Component {
    state={
        stopanim:false,
        autoplay:false
    }
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: false, 
            animationData: dataAnim.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            },
            segments:[0,77]
          };
        const userData=getSession(AppConfig.sessionUserData)

        return (
            // <div className="page-header header-filter" data-parallax="true" style={{backgroundImage: `url("${Images.HomeIllus}")`}}>
            <div className="page-header" data-parallax="true" style={{backgroundImage: `url("${Images.HomeIllus}")`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8" style={{background:'rgba(240, 52, 52, 1)',padding:30,borderRadius:30}}>
                           <div className="row" style={{marginLeft:5}}>
                            <div>
                                    <strong><h1 style={{padding:0,margin:0}}><b>Bheem</b></h1></strong>
                                    <h2 style={{padding:0,margin:0}}>Connect us all</h2>
                            </div>
                           <div id="container" onMouseOverCapture={()=>setTimeout(()=>this.setState({autoplay:true}),5)}>
                            <Lottie
                                style={{margin:0}}
                                options={defaultOptions}
                                isStopped={this.state.stopanim}
                                playSegments={{segments: [0, 50]}}
                                width={150}
                                heigth={150}
                                />
                           </div>
                           </div>
                            <h4>Every landing page needs a small description after the big bold title, that's why we added this text here. Add here all the information that can make you or your product create the first impression.</h4>
                            <br />
                            <a href="/sign-up" target="_blank" className="btn btn-danger btn-raised btn-lg" style={{background:'#fff',color:'rgba(240, 52, 52, 1)',boxShadow:"1px 3px 1px #9E9E9E"}}>
                                <i className="fa fa-play" /> Get started
                            </a>
                        </div>
                    </div>
                </div>
             </div>
        )
    }
}
 