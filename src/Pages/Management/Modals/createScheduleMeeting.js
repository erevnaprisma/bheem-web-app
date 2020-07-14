import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import {getSession,formValidation} from '../../../Utils/Utils'
import AppConfig from '../../../Config/AppConfig'
import Loader from '../../../Components/Loader'
import {connect} from 'react-redux'
import MeetingActions from '../../../Containers/Management/SceduleMeeting/redux'
import {} from '../../../Utils/Utils'

class createMeeting extends Component {
    constructor(props)
    {
      super(props)
      this._onSubmitForm=this._onSubmitForm.bind(this)
      this.state={
        s_date:new Date(),
        e_date:new Date(),
        ask: false
      }
    }
    _onSubmitForm(e)
    {
        if (e) e.preventDefault()
        const title = this.refs.title_meeting.value
        const created_by=getSession(AppConfig.sessionUserData).id
        const start_date=new Date(this.state.s_date).getTime()
        const end_date=new Date(this.state.e_date).getTime()
        const host=created_by
        const permissionTojoin=this.state.ask ?'Yes' : 'No'
        this.props.create({title,created_by,start_date,end_date,host,permissionTojoin})
    }
    render() {
        const {isRequest,create} = this.props 
        return (
        <div className="modal fade" id="create-meeting" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create New Meeting</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <i className="material-icons">clear</i>
                        </button>
                    </div>
                    <form onSubmit={(e)=>this._onSubmitForm(e)}>
                        <div className="modal-body">
                            <div style={{width:'100%'}}>
                                <div className="form-group">
                                    <label className="bmd-label-floating">Meeting Topic</label>
                                    <input type="text" className="form-control" style={{textAlign:'center'}} required ref="title_meeting"/>
                                </div>
                            </div>
                        

                            <div className="ml-5">
                                {/* <div className="form-check">
                                    <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox"  onChange={e=>this.setState({endless:e.target.checked})}/>
                                    Use end date
                                    <span className="form-check-sign">
                                        <span className="check" />
                                    </span>
                                    </label>
                                </div> */}
                                <div className="form-check">
                                    <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox"  onChange={e=>this.setState({ask:e.target.checked})}/>
                                    Participant ask to join
                                    <span className="form-check-sign">
                                        <span className="check" />
                                    </span>
                                    </label>
                                </div>
                            </div>
                                <div>
                                <br/>
                                <br/>
                                    <center>
                                    <label>Start Time</label>
                                    <br/>
                                    <DateTimePicker
                                            className="dt-picker"
                                            onChange={s_date=>this.setState({ s_date})}
                                            value={this.state.s_date}
                                    />
                                    <br/>
                                    <br/>
                                    <label>End Time</label>
                                    <br/>
                                    <DateTimePicker
                                        className="dt-picker"
                                        onChange={e_date=>this.setState({ e_date })}
                                        value={this.state.e_date}
                                    />
                                    </center>
                                </div>
                            
                            <br/>
                            <br/>
                        </div>
                        {(!isRequest &&
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-link btn-danger ">Schedule Metting</button>
                                &nbsp;
                                <button type="button" className="btn btn-link" data-dismiss="modal">Close</button>
                            </div>
                        )}
                        {(this.props.isRequest && 
                            <center>
                                <Loader className="mx-auto" color="#000"/>
                                <p><strong>Fetching data</strong></p>
                            </center>
                        )}
                    </form>
                </div>
            </div>
        </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return{
      isRequest:state.schedulemeetings.isRequesting,
      data:state.schedulemeetings.data
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
        create:data=>dispatch(MeetingActions.createScheduleMeeting(data))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(createMeeting)
