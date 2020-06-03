import React, { Component } from 'react'
// import Navigation from '../Navigation/SwaggerNavigation'
import Navigation from '../Navigation/Navigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import {AppSelectors} from '../Redux/AppRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { IntlProvider } from 'react-intl'
import AppConfig from '../Config/AppConfig'
import enTranslationMessages from '../Translations/en.json'
import idTranslationMessages from '../Translations/id.json'

const basePath = AppConfig.basePath


export const appLocales = ['en', 'id']

export const DEFAULT_LOCALE = 'en'

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}

export const translationMessages = {
  en: enTranslationMessages,
  id: idTranslationMessages
}

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }
  
  
  render (xmessages) {
    let lang = this.props.lang || 'id'
    let messages = {}
    if (translationMessages.hasOwnProperty(lang)) {
      messages = translationMessages[lang]
    }
    return (
      <IntlProvider locale={lang} messages={messages}>
        <Navigation />
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    lang: AppSelectors.lang(state.app)
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer)
