import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import {getSession,formValidation} from '../../../../Utils/Utils'
import AppConfig from '../../../../Config/AppConfig'
import Loader from '../../../../Components/Loader'
import {connect} from 'react-redux'
import MeetingActions from '../../../../Containers/Management/MeetingHistory/redux'
import DataTable, { createTheme } from 'react-data-table-component';

class MeetingHistory extends Component {
    constructor(props)
    {
      super(props)
    }
    componentWillMount(){
        this.props.fetchMeeting()        
    }

    render() {
        const {isRequest,create} = this.props 
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
          // {
          //   name: 'Start Date',
          //   selector: 'startDate',
          //   sortable: true,
          // },
          // {
          //   name: 'End Date',
          //   selector: 'endDate',
          //   sortable: true,
          // }
        ]
        
          console.log('my meetings>>',this.props.meetings);
        return (
        <div className="modal fade" id="meeting-history" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Meeting History</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <i className="material-icons">clear</i>
                        </button>
                    </div>
                        <DataTable
                            style={{width:'100%'}}
                            responsive={true}
                            overflowY={true}
                            columns={column}
                            noHeader={true}
                            pagination={true}
                            subHeader={true}
                            data={this.props.meetings}
                        />
                        <div className="modal-body">
                            
                            {(this.props.isRequest && 
                                <center>
                                    <Loader className="mx-auto" color="#000"/>
                                    <p><strong>Fetching data</strong></p>
                                </center>
                            )}
                            <br/>
                            <br/>
                        </div>
                        
                        
                </div>
            </div>
        </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return{
      isRequest:state.meetinghistory.isRequesting,
      data:state.meetinghistory.data,
      meetings:state.meetinghistory.meetings
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
        fetchMeeting:data=>dispatch(MeetingActions.doFetchMeetingHistory(data))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(MeetingHistory)
