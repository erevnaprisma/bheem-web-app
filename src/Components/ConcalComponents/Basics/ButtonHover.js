import React, { Component } from 'react'

export default class ButtonHover extends Component {
    
    state={
        btnClr:this.props.btnColor,
        iconClr:this.props.iconColor,
    }

    render() {
        return (
            // <button style={{padding:5,backgroundColor:'white'}} >
            //     <i className="bx bx-sign-out" color={Colors.primaryRed}/>
            // </button>
            <button style={[{width:this.props.width||'100%',height:this.props.height||'100%',marginRight:this.props.mgR||0,marginRight:this.props.mgL||0,padding:this.props.btnPadding,backgroundColor:this.state.btnClr}],this.props.otherStyle} onMouseOver={()=>this.setState({btnClr:this.props.iconColor,iconClr:this.props.btnColor})} onMouseLeave={()=>this.setState({iconClr:this.props.iconColor,btnClr:this.props.btnColor})}>
                <i className={`bx ${this.props.iconClass}`} color={this.state.iconClr}/>
            </button>
        )
    }
}
