import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import {getSession,formValidation} from '../../../../Utils/Utils'
import AppConfig from '../../../../Config/AppConfig'
import Loader from '../../../../Components/Loader'
import {connect} from 'react-redux'
import ChangePasswordActions from '../../../../Containers/ChangePassword/redux'

class ChangePassword extends Component {
    constructor(props)
    {
      super(props)
      this._onSubmitForm=this._onSubmitForm.bind(this)
      this.state={
        ask: false
      }
    }
    _onSubmitForm(e)
    {
        if (e) e.preventDefault()
        const oldPassword=(this.refs.oldPassword.value).trim()
        const newPassword=(this.refs.newPassword.value).trim()
        const confNewPassword=(this.refs.confirmNewPassword.value).trim()
        if(newPassword === confNewPassword){
            this.props.change({newPassword,oldPassword})
        }
    }
    componentWillMount(){
        this.props.reset()
    }
    render() {
        const {isRequest,create} = this.props 
        return (
        <div className="modal fade" id="change-my-password" tabIndex={-1} role="dialog">
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
                                    <label className="bmd-label-floating">Old Password</label>
                                    <input type="password" className="form-control" style={{textAlign:'center'}} required ref="oldPassword"/> 
                                </div>
                            </div>
                            <div></div>
                            <div style={{width:'100%'}}>
                                <div className="form-group">
                                    <label className="bmd-label-floating">New Password</label>
                                    <input type="password" className="form-control" style={{textAlign:'center'}} required ref="newPassword"/>
                                </div>
                            </div>
                            <div></div>
                            <div style={{width:'100%'}}>
                                <div className="form-group">
                                    <label className="bmd-label-floating">Confirm New Password</label>
                                    <input type="password" className="form-control" style={{textAlign:'center'}} required ref="confirmNewPassword"/>
                                </div>
                            </div>
                            <div></div>
                            <br/>
                            <br/>
                        </div>
                        {(!isRequest &&
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-link btn-danger ">Change Password</button>
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
      isRequest:state.changepassword.isRequesting
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
        change:data=>dispatch(ChangePasswordActions.doChangePassword(data)),
        reset:data=>dispatch(ChangePasswordActions.doResetChangePassword())
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword)
