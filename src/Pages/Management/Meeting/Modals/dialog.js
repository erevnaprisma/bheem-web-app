import React, { Component } from 'react'
import _ from 'lodash'
import Loader from '../../../../Components/Loader'
import {getSession,formatDate} from '../../../../Utils/Utils'
import AppConfig from '../../../../Config/AppConfig'
import DateTimePicker from 'react-datetime-picker';

export default class dialog extends Component {
    constructor(props)
    {
        super(props)
        this._alert=this._alert.bind(this)   
        this._from=this._form.bind(this)
        this._onSubmitForm=this._onSubmitForm.bind(this)
        this.state={
            s_date:null,
            e_date:null,
            ask: false
          }
    }
   async _onSubmitForm(e)
    {
        if (e) e.preventDefault()
        const title = this.refs.title_meeting.value
        const start_date=await new Date(this.state.s_date).getTime()
        const end_date=await new Date(this.state.e_date).getTime()
        const permission=this.state.ask ?'Yes' : 'No'
        const meetingId=this.props.dataForm.id
        console.log("Submitted>>>",{title,start_date,end_date,permission,meetingId})
        this.props.cb({title,start_date,end_date,permission,meetingId})
    }
   _form()
    {
        console.log("Data form>>>",this.props.dataForm)
        console.log("Data form is>>>",_.has(this.props.dataForm,'startDate'))
        console.log("Data form state>>>",this.state)
        
        let d_start=null
        let d_end=null
        if(this.state.s_date && this.state.e_date)
        {
            d_start =new Date(this.state.s_date) 
            d_end =new Date(this.state.e_date)
        } 
        else{
            if(_.has(this.props,'dataForm'))
            {
                d_start=this.props.dataForm.startDate   
                d_end=this.props.dataForm.endDate
            }
            else{
                d_start=new Date()
                d_end=new Date()
            }
        }

        return(
            <div className="modal fade" id="modal-action" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Meeting</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="material-icons">clear</i>
                            </button>
                        </div>
                        <form onSubmit={(e)=>this._onSubmitForm(e)}>
                            <div className="modal-body">
                                <div style={{width:'100%'}}>
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Meeting Topic</label>
                                        <input type="text" className="form-control" style={{textAlign:'center'}} defaultValue={this.props.dataForm.topic} required ref="title_meeting"/>
                                    </div>
                                </div>
                                <div className="ml-5">

                                    <div className="form-check">
                                        <label className="form-check-label">
                                        {this.props.dataForm.permission == "Yes" && <input className="form-check-input" type="checkbox" defaultValue defaultChecked  onChange={e=>this.setState({ask:e.target.checked})} />}
                                        
                                        {this.props.dataForm.permission == "No" && <input className="form-check-input" type="checkbox"  onChange={e=>this.setState({ask:e.target.checked})}/>} 
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
                                            value={d_start}
                                        />
                                        <br/>
                                        <br/>
                                        <label>End Time</label>
                                        <br/>
                                        <DateTimePicker
                                            className="dt-picker"
                                            onChange={e_date=>this.setState({ e_date })}
                                            value={d_end}
                                        />
                                        </center>
                                    </div>
                                
                                <br/>
                                <br/>
                            </div>
                            {(!this.props.isRequest &&
                                <div className="modal-footer">
                                     <button className="btn btn-primary btn-round">
                                            {/* <i clasName="material-icons">{this.props.iconBtn}</i> */}
                                            {/* <i className="material-icons">{this.props.iconBtn}</i> */}
                                            {this.props.textBtn}
                                        </button>
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
    _alert()
    {
        console.log(">>>>form")
        return (
            <div className="modal fade" id="modal-action" tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-primary"><b>{this.props.textHeader}</b></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="material-icons">clear</i>
                            </button>
                        </div>
                        {/* <p>{this.props.msg}</p> */}
                        <div dangerouslySetInnerHTML={{ __html:this.props.msg}}/>
                        <div className="modal-footer">
                            <strong>{this.props.isRequest}</strong>
                            {(_.has(this.props,'do') || !this.props.isRequest &&
                                <button className="btn btn-primary btn-round" onClick={this.props.cb}>
                                    {/* <i clasName="material-icons">{this.props.iconBtn}</i> */}
                                    {this.props.textBtn}
                                </button>
                            )}
                            {(this.props.isRequest &&
                               <center>
                                    <Loader className="mx-auto" color="#000"/>
                                    <p><strong>{this.props.isRequestText}</strong></p>
                                </center> 
                            )}
                            &nbsp;
                            <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
    render() {
        return(
            <div>
                {this.props.type == 'form' && this._form()}
                {this.props.type == 'alert' && this._alert()}
            </div>
        )
    }
}
