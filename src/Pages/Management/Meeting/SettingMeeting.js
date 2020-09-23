import React, { Component } from 'react'

export default class SettingMeeting extends Component {
  
  render() {
    const isActivePage = this.props.active
        return (
            <div className={`section section-basic tab-pane ${isActivePage}`} id="meeting-settings">
                    
              <strong>Basic meeting settings</strong>
              <hr/>
                <div className="row">
                  
                  <div className="row" style={{marginLeft:20}}>
                  Default join meeting with audio
                    <div className="togglebutton">
                      <label>
                        <input type="checkbox" defaultChecked />
                        <span className="toggle" />
                      </label>
                    </div>
                  </div> 
                  <div className="row" style={{marginLeft:20}}>
                  Default enable webcam when join
                    <div className="togglebutton">
                      <label>
                        <input type="checkbox" defaultChecked />
                        <span className="toggle" />
                      </label>
                    </div>
                  </div> 
                  {/* <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="title">
                      <h3>Checkboxes</h3>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" defaultValue />
                        Unchecked
                        <span className="form-check-sign">
                          <span className="check" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" defaultValue defaultChecked />
                        Checked
                        <span className="form-check-sign">
                          <span className="check" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check disabled">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" defaultValue disabled />
                        Disabled unchecked
                        <span className="form-check-sign">
                          <span className="check" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check disabled">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" defaultValue disabled defaultChecked />
                        Disabled checked
                        <span className="form-check-sign">
                          <span className="check" />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="title">
                      <h3>Radio Buttons</h3>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" />
                        Radio is off
                        <span className="circle">
                          <span className="check" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" defaultChecked />
                        Radio is on
                        <span className="circle">
                          <span className="check" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check disabled">
                      <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios11" defaultValue="option1" disabled />
                        Disabled radio is off
                        <span className="circle">
                          <span className="check" />
                        </span>
                      </label>
                    </div>
                    <div className="form-check disabled">
                      <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="exampleRadio1" id="exampleRadios21" defaultValue="option2" defaultChecked disabled />
                        Disabled radio is on
                        <span className="circle">
                          <span className="check" />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <div className="title">
                      <h3>Toggle Buttons</h3>
                    </div>
                    <div className="togglebutton">
                      <label>
                        <input type="checkbox" defaultChecked />
                        <span className="toggle" />
                        Toggle is on
                      </label>
                    </div>
                    <div className="togglebutton">
                      <label>
                        <input type="checkbox" />
                        <span className="toggle" />
                        Toggle is off
                      </label>
                    </div>
                  </div> */}
                </div>
          </div> 

        )
    }
}
