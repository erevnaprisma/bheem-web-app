import React, { Component } from 'react'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
import RootContainer from './RootContainer'
import createStore from '../Redux'
// import ReduxPersist from '../Config/ReduxPersist'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://localhost:8280/graphql'
})

// create our store
export const { store } = createStore()

/**
 * Provides an entry point into our application.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 */
class Container extends Component {
  render () {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <RootContainer/>
        </ApolloProvider>
      </Provider>
    )
  }
}

export default Container
