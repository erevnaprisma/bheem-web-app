import PropTypes from 'prop-types'
import React from 'react'
import SubContainer from './SubContainer'

const ResponsiveContainer = ({ children, appname }) => {
  return (<SubContainer>{children}</SubContainer>)
}


export default ResponsiveContainer
