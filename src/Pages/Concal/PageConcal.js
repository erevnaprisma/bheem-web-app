import React, { Component } from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {Images,Colors} from '../../Themes'
import VideoStream from './VideoStream'
import Draggable from 'react-draggable';
import Div100vh from 'react-div-100vh'
import { element } from 'prop-types';
import Sidebar from "react-sidebar";
import './buttonConcal.css'
import _ from 'lodash'
import Swal from 'sweetalert2'
import AppConfig from '../../Config/AppConfig'
import { data } from '../../Redux/HomeRedux'
import JoinActions from '../../Containers/JoinMeeting/redux'
// import {useParams} from 'react-router-dom'

class PageConcal extends React.PureComponent {
     constructor(props)
    {
        super(props)
        this._waitingRoom = this._waitingRoom.bind(this)
        this._concal = this._concal.bind(this)
        this.state={
            isConcal:false
        }
    }
    componentWillMount()
    {
       const meetingId=this.props.match.params.room
       this.props.isMeetingExist({meetingId})
        // console.log("params>>>",this.props.match.params.room)
        // if(_.isEmpty(this.props.match.params.room))
        // {
        //     Swal.fire({
        //         title: 'No meeting',
        //         text: 'Sorry you don\'t have a meeting',
        //         icon: 'error',
        //         confirmButtonText: 'Ok',
        //         onClose:()=>window.location="/login"
        //       })
        // }
    }
    componentDidMount()
    {

    }
    _waitingRoom()
    {
        return(
            <div className="wrapper fullScreen" style={{whiteSpace:'nowrap',background:Colors.primaryGray,width:'100%',overflow:'scroll'}}>         
                <button className="concalButton" style={{marginLeft:'50%',marginTop:'20%'}} onClick={()=>this.setState({isConcal:true})}>Launch in web</button>
            </div>
            
           )
    }
    _concal()
    {
        return(
            <div className="wrapper fullScreen" style={{whiteSpace:'nowrap',background:Colors.primaryGray,width:'100%',overflow:'scroll'}}>         
                <iframe id="concal-room-video" className="wrapper fullScreen" 
                src={AppConfig.concalUrl+this.props.match.params.room}
                />
            </div>
        )   
    }
    render() {
        return(
        <div>
            <Helmet>
                <title>Bheem meeting</title>
            </Helmet>
            {this.state.isConcal && this._concal()}
            {!this.state.isConcal && this._waitingRoom()}
        </div>
        )
    }
}
export default connect(
    state=>{
       return null
    },
    dispatch=>{
        return{
            isMeetingExist:data=>dispatch(JoinActions.checkIsexistMeeting(data))
        }
    }
)(PageConcal)