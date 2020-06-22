import React, { Component } from 'react'
import Loader from '../Loader'
import {connect} from 'react-redux'
import LogoutAction from '../../Containers/Login/redux'
import {Colors} from '../../Themes'

class Logout extends Component {
    componentWillMount()
    {
        this.props.doReset()
    }
    render() {
        console.log("isRequesting>>",this.props.isRequesting)
        return (
           <div className="modal fade" id="modal-logout" tabIndex={1000} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            {(this.props.isRequesting &&
                <center style={{marginTop:'50%'}}>
                <Loader className="col"/>
                <p style={{textAlign:'center',color:Colors.primaryWhite}}>Logging out..</p>
                </center>
            )}
            
            {(!this.props.isRequesting &&
                <div className="modal-dialog modal-dialog-centered" role="document">
                    
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Logout</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure to logout? 
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" style={{background:Colors.primaryGray,color:Colors.primaryWhite}}  data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-secondary" style={{background:Colors.primaryGray,color:Colors.primaryWhite}}  onClick={()=>this.props.doLogout()}>Ok</button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      isRequesting: state.login.isRequesting
    }
  }
  const mapDispatchToProps = dispatch => {
    
    return {
      doLogout:data => dispatch(LogoutAction.doLogout(data)),
      doReset:data => dispatch(LogoutAction.doLoginReset(null))
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Logout)