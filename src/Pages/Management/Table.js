import React, { Component } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';

// createTheme('solarized', {
//     text: {
//       primary: '#268bd2',
//       secondary: '#2aa198',
//     },
//     background: {
//       default: '#002b36',
//     },
//     context: {
//       background: '#cb4b16',
//       text: '#FFFFFF',
//     },
//     divider: {
//       default: '#073642',
//     },
//     action: {
//       button: 'rgba(0,0,0,.54)',
//       hover: 'rgba(0,0,0,.08)',
//       disabled: 'rgba(0,0,0,.12)',
//     },
//   });
export default class Table extends Component {
    render() {
        
        return (
            <DataTable
            style={{width:'100%'}}
            // title="Arnold Movies"
            responsive={true}
            overflowY={true}
            columns={this.props.column}
            sor
            noHeader={true}
            pagination={true}
            subHeader={true}
            data={this.props.data}
            // theme="solarized"
          />
        )
    }
}
