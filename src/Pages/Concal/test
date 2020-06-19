import React, { Component } from 'react'
import Helmet from 'react-helmet'
import {Images,Colors} from '../../Themes'
import VideoStream from './VideoStream'
import Draggable from 'react-draggable';
import Div100vh from 'react-div-100vh'
import { element } from 'prop-types';
import Sidebar from "react-sidebar";
import './buttonConcal.css'

export default class PageConcal extends React.PureComponent {
constructor(props) {
    super(props);
    this.state = {
        sidebarOpen: false,
        layout:'default'
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this._defaultLayout= this._defaultLayout.bind(this)
    this._gridLayout= this._gridLayout.bind(this)
    }
    
    onSetSidebarOpen() {
    if(this.state.sidebarOpen == false)this.setState({ sidebarOpen: true});
    else this.setState({ sidebarOpen: false});
    }

    getMembers()
    {
        const arr=[1,23,23,23,2,23,3,2,22,2,3,3,3,4,2,4,3,4,2,3,2,3,4,3]
        const ab=(arr.map((r,i)=>(
        
           <div>
                <hr/>
                <div key={i} className="row" style={{marginLeft:20}}>
                    <img src={Images.BheemLogo} style={{width:'10%',height:'10%',borderRadius:'100%'}} />
                    <h2>Alo</h2>
                </div>
           </div>
        ))
        )
        return ab
    }
    _gridLayout()
    {
        const arr=['alo','ungke','utu','usi','ucup','usep','ungko','ucep','usmad','usop','alo','ungke','utu','usi','ucup','usep','ungko','ucep','usmad','usop','usop','alo','ungke','utu','usi','ucup','usep','ungko','ucep','usmad','usop','usop','alo','ungke','utu','usi','ucup','usep','ungko','ucep','usmad','usop']
        let col=3
        let temp=[]
        let ab=[]
        arr.map((r,i)=>{
        temp.push(r)
          if((i+1) % col == 0)
          {
            ab.push(
                <div className="row flex-row flex-nowrap">
                {temp.map((s,j)=>(
                    <VideoStream
                        isGrid
                        data={s}
                        style={{padding:0,flexGrow:1}}
                        cls="col-4 p-0 m-2"
                        width={'100%'}
                        heigth={'100%'}
                    /> 
                        
                ))}
                </div>
            )
            temp=[]
          }
          //sisa
          else if((i+1)==arr.length)
          {
            console.log("Sisa i => "+(i+1))
            ab.push(
                <div className="row flex-row flex-nowrap">
                    {temp.map((s,j)=>(
                        <VideoStream
                            isGrid
                            data={s}
                            style={{padding:0,flexGrow:1}}
                            cls="col-4 p-0 m-2"
                            width={'100%'}
                            heigth={'100%'}
                        /> 
                            
                    ))}
                </div>
            )
            console.log("Sisa data>>",ab) 
          }
          
        })
        return ab
    }
    _defaultLayout()
    {
        return(
            <div>
                <div className="vertical-center" style={{zIndex:1,width:'100%'}}>
                    <VideoStream
                    style={{left:0,bottom:0,marginLeft:20,zIndex:300,top:10,position:'absolute'}}
                    width="20%"
                    heigth="20%"
                    />
                    <VideoStream
                    style={{maxHeight:window.innerHeight}}
                    width="100%"
                    heigth="100%"
                    />
                </div>
            </div>
        )
    }
    render() {
        console.log("layout===>",this.state.layout)
            return (
                <div className="wrapper fullScreen" style={{whiteSpace:'nowrap',background:Colors.primaryGray,width:'100%',overflow:'scroll'}}>  
                   {/* Header */}
                    <div className="ocapComp" style={{height:'5%',width:'100%',top:0,position:'fixed',zIndex:400}}>
                        <div style={{float:'right',background:Colors.primaryWhite}}>
                            <span  class="iconButton fas fa-th-large" data-toggle="tooltip" data-placement="top" title="Grid layout" onClick={()=>this.setState({layout:'grid'})}/>
                            <span  class="iconButton fas fa-square" data-toggle="tooltip" data-placement="top" title="Single layou(default)t" onClick={()=>this.setState({layout:'default'})}/> 
                            {/* <span  class="iconButton fas fa-square" data-toggle="tooltip" data-placement="top" title="Single layout"/>    */}
                            {/* <button onClick={() => this.onSetSidebarOpen()}>
                            Open sidebar
                            </button> */}
                        </div>
                    </div>
                {/* Header */}

                {/* Sidebar */}
                <Sidebar
                    sidebar={(
                        <div>
                           <div style={{position:'fixed',background:'white'}}>
                             <center><span class="iconSizeResponsive iconButton fas fa-users" data-toggle="tooltip" data-placement="top" title="Manage participant"  onClick={() => this.onSetSidebarOpen()}/>   </center>
                           </div>
                           <div>
                            {this.getMembers()}
                           </div>
                        </div>
                    )}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { background: "white",zIndex:500,position:'fixed'}}}
                    pullRight={true}>
                
                </Sidebar>
                {/* Sidebar */}
                  {this.state.layout ==='default' && this._defaultLayout()}
                  {this.state.layout ==='grid' && (
                      <div className="flex-row ">
                          {this._gridLayout()}
                      </div>

                  )}
                  {/* Footer */}
                  <div className="footerConcal" style={{alignContent:'center',display:'block',background:'rgba(0, 0, 0,0.7)',width:'100%',height:'8%',bottom:0,position:'fixed',zIndex:400}}>
                    
                        <div className="container">
                                <div style={{color:'white',}} className="row flex-row justify-content-center">
                                    <div className="iconButton flex-column">
                                       <center>
                                       <i className="iconSizeResponsive fas fa-users"  data-toggle="tooltip" data-placement="top" title="Manage participant"  onClick={() => this.onSetSidebarOpen()}/>   
                                        <p >Manage participant</p>
                                       </center>
                                    </div>
                                    <div className="iconButton flex-column" >
                                        <center>
                                            <i className="iconSizeResponsive fas fa-share-square" data-toggle="tooltip" data-placement="top" title="Share Screen"  onClick={() => this.onSetSidebarOpen()}/>   
                                            <p >Share screen</p>
                                        </center>
                                    </div>
                                    <div className="iconButton flex-column" >
                                        <center>
                                            <i className="iconSizeResponsive fas fa-external-link-alt" data-toggle="tooltip" data-placement="top" title="Share Screen"  onClick={() => this.onSetSidebarOpen()}/>   
                                            <p >Generate Invitation</p>
                                        </center>
                                    </div>
                                    <div className="iconButton flex-column" >
                                        <center>
                                            <i className="iconSizeResponsive fas fa-arrow-left" data-toggle="tooltip" data-placement="top" title="Share Screen"  onClick={() => this.onSetSidebarOpen()}/>   
                                            <p>Leave Meeting</p>
                                        </center>
                                    </div>
                                </div>
                        </div>
                    </div>
                {/* Footer */}
                </div>
             
            )
        }
    }
