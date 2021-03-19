import React from 'react'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider as ReduxProvider} from 'react-redux'
import codePush from 'react-native-code-push'
import {ApolloProvider} from '@apollo/client'

import setUpConfig from './src/config/setUpConfig'
import ProviderStatusBar from './src/components/Provider/ProviderStatusBar'
import AppNavigator from './src/navigators/AppNavigator'
import {persistor, store} from './src/store/store'
import ProviderRootKeyboard from './src/components/Provider/ProviderRootKeyboard'
import {COLOR} from './src/constants/COLOR'
import client from './src/graphql'

setUpConfig()

const App = () => {
  return (
    <ProviderRootKeyboard bg={COLOR.GRAY_DARK}>
      <ProviderStatusBar>
        <ReduxProvider store={store}>
          <ApolloProvider client={client}>
            <PersistGate loading={null} persistor={persistor}>
              <AppNavigator />
            </PersistGate>
          </ApolloProvider>
        </ReduxProvider>
      </ProviderStatusBar>
    </ProviderRootKeyboard>
  )
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.IMMEDIATE,
}
const codePushProvider = codePush(codePushOptions)(App)
codePush.notifyAppReady()
export default __DEV__ ? App : codePushProvider
