import React, { Component } from 'react'
import {WaveTopBottomLoading } from 'react-loadingg'
import {Colors} from '../../Themes'

export default class index extends Component {
    render() {
        return (
            <div>
                <WaveTopBottomLoading
                    color={this.props.color||Colors.primaryWhite}
                    size={this.props.size||'default'}
                    style={this.props.style||{}}
                />
            </div>
        )
    }
}
