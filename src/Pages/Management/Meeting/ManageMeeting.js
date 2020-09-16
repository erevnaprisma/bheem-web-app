import React, { Component } from 'react'
import {connect} from 'react-redux'
import Table from './Table'
import Loader from '../../../Components/Loader'
import _ from 'lodash'
import Modal from './Modals/dialog'
import MeetingActions from '../../../Containers/Management/SceduleMeeting/redux'
import {getSession,formatDate} from '../../../Utils/Utils'
import AppConfig from '../../../Config/AppConfig'

class ManageMeeting extends Component {
  constructor(props)
  {
    super(props)
    this._preprocessData=this._preprocessData.bind(this)
    this.state={
      dataFrom:{},
      iconBtn:'',
      textBtn:'',
      textHeader:'',
      textProcess:'',
      title:'',
      msg:'',
      cb:null,
      type:''
    }
  }

  _CopyToClipboard() {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById('invitation-cp'));
      range.select().createTextRange();
      document.execCommand("copy");
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById('invitation-cp'));
      window.getSelection().addRange(range);
      document.execCommand("copy");
      alert("Invitation copied")
    }
  }
  _preprocessData(dat)
  {
    let arr =[]
    _.filter(_.orderBy(dat,['createdAt'],['desc']),(o)=>{
    arr.push({id:o.id,start:o.startDate,end:o.endDate,createdAt:formatDate(o.createdAt),endDate:formatDate(o.endDate),startDate:formatDate(o.startDate),host:o.host,title:o.title,needPermisionToJoin:o.needPermisionToJoin})
    })
    return arr
  }
  _generateInvitation(topic,meetingId,start,end)
  {
    const userData=getSession(AppConfig.sessionUserData)
    const invitation="<div id='invitation-cp'><br><br><p style='text-align:left;margin-left:10%;margin-right:10%'><b>You are invited by "+userData.firstName+" "+userData.lastName
                    +"</b></p> <h5 style='text-align:left;margin-left:10%;margin-right:10%'><small>Meeting topic:</small><br><center> <b> \""+topic+"\"</b><center></h5>"
                    +"<p>From <b>"+formatDate(start)+"</b> to <b> "+formatDate(end)+"</b><p>"
                    +"<p style='text-align:left;margin-left:10%;margin-right:10%'>"+AppConfig.invitationlUrl+meetingId+"</p></div>"
    return invitation
  }
  componentDidMount()
  {
    this.props.fetchMeetings()
  }
  render() {
    const {data,cancelMeeting,startMeeting,editMeeting,isDoing} = this.props
    
    //init table columns 
    const column=[{
        name: 'Meeting ID',
        selector: 'id',
        sortable: true,
      },
      {
        name: 'Topic',
        selector: 'title',
        sortable: true,
      },
      {
        name: 'Created at',
        selector: 'createdAt',
        sortable: true,
      },
      {
        name: 'Start Date',
        selector: 'startDate',
        sortable: true,
      },
      {
        name: 'End Date',
        selector: 'endDate',
        sortable: true,
      },
      {
        cell: (e) =><div className="row">
                      <button className="btn btn-primary btn-fab btn-round btn" data-toggle="tooltip" data-placement="top" title="Start meeting" data-container="body" data-toggle="modal" data-target="#modal-action" onClick={()=>this.setState({textBtn:'Start meeting',iconBtn:'play_arrow',msg:'<br><br>Are you sure to start meeting?<br><br>',cb:()=>startMeeting({meetingId:e.id,do:true}),textHeader:'Start Meeting',type:'alert'})}>
                        <i className="material-icons">play_arrow</i>
                      </button>
                      <button className="btn btn-primary btn-fab btn-round btn" data-toggle="tooltip" data-placement="top" title="Edit meeting" data-container="body" data-toggle="modal" data-target="#modal-action" onClick={()=>this.setState({
                        textBtn:'Edit meeting',
                        iconBtn:'create',
                        msg:'Edit meeting',
                        cb:({title,start_date,end_date,permission,meetingId})=>editMeeting({title,start_date,end_date,permission,meetingId}),
                        textHeader:'Edit meeting',
                        type:'form',
                        dataForm:{endDate:new Date(e.endDate),startDate:new Date(e.startDate),topic:e.title,permission:e.needPermisionToJoin,id:e.id}})}>
                        <i className="material-icons">create</i>
                      </button>
                        <button className="btn btn-primary btn-fab btn-round btn" data-toggle="tooltip" data-placement="top" title="Generate invitation" data-container="body" data-toggle="modal" data-target="#modal-action" onClick={()=>this.setState({textBtn:'Copy invitation',iconBtn:'content_copy',msg:this._generateInvitation(e.title,e.id,e.startDate,e.endDate),cb:()=>this._CopyToClipboard(),textHeader:'Invitation',type:'alert'})}>
                        <i className="material-icons">local_post_office</i>
                      </button>
                      <button className="btn btn-primary btn-fab btn-round btn" data-toggle="tooltip" data-placement="top" title="Cancel meeting" data-container="body" data-toggle="modal" data-target="#modal-action" onClick={()=>this.setState({textBtn:'Cancel meeting',iconBtn:'clear',msg:`<br><br>Are you sure cancel the meeting id: <b>${e.id}</b> ?<br><br>`,cb:()=>cancelMeeting({meetingId:e.id,do:true}),textHeader:'Cancel meeting',type:'alert'})}>
                        <i className="material-icons">clear</i>
                      </button>
                    </div>
      }]
      //init table columns 

      return (
      <div className="section section-basic tab-pane active" id="manage-meeting" style={{padding:0}}>
            <Modal 
            dataForm={this.state.dataForm}
            cb={this.state.cb} 
            msg={this.state.msg} 
            iconBtn={this.state.iconBtn} 
            textBtn={this.state.textBtn}
            isRequest={isDoing}
            isRequestText={this.state.textProcess}
            textHeader={this.state.textHeader}
            type={this.state.type}/>

            <ul className="nav nav-pills nav-pills-icons" role="tablist">
              
              <li className="nav-item " style={{cursor:'pointer'}}>
                <a className="nav-link "  data-toggle="modal" data-target="#create-meeting">
                  <i className="material-icons">queue</i>
                  New meeting
                </a>
              </li>
            </ul>
            {!this.props.isRequest && <Table column={column} data={this._preprocessData(data)}/>}
            {(this.props.isRequest && 
              <center>
                <Loader className="mx-auto" color="#000"/>
                <p><strong>Fetching data</strong></p>
              </center>
            )}
            <br/>
            <br/>
            <br/>
        </div>
  
      )
  }
}
const mapStateToProps = (state, ownProps) => {
  return{
    isRequest:state.schedulemeetings.isRequesting,
    isDoing:state.schedulemeetings.isDoing,
    data:state.schedulemeetings.meetings
  }
}
const mapDispatchToProps = dispatch => {
  return{
    cancelMeeting:data=>dispatch(MeetingActions.cancelScheduleMeeting(data)),
    startMeeting:data=>dispatch(MeetingActions.startScheduleMeeting(data)),
    editMeeting:data=>dispatch(MeetingActions.editScheduleMeeting(data)),
    fetchMeetings:data=>dispatch(MeetingActions.getListMeeting(data))
  }
}
export default connect(
mapStateToProps,mapDispatchToProps
)(ManageMeeting)