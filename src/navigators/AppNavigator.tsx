import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import TabsNavigator from './TabsNavigator'

import getScreenAnimation, {SCREEN_ANIMATION} from '../config/getScreenAnimation'
import navigateRef from '../config/navigateRef'
import useLoadResource from '../hook/load_config/useLoadResource'
import LoadingScreen from '../screen/LoadingScreen/LoadingScreen'
import {SCREEN_NAME} from '../constants/SCREEN_NAME'
import LoginScreen from '../screen/LoginScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
  const {isLoaded, isAuth} = useLoadResource()
  return (
    <>
      <NavigationContainer ref={navigateRef}>
        <Stack.Navigator detachInactiveScreens={false} headerMode={'screen'} initialRouteName={SCREEN_NAME.LOAD_SCREEN}>
          {!isLoaded && <Stack.Screen options={{...getScreenAnimation(SCREEN_ANIMATION.TOP)}} name={SCREEN_NAME.LOAD_SCREEN} component={LoadingScreen} />}
          {!isAuth && (
            <>
              <Stack.Screen options={{...getScreenAnimation(SCREEN_ANIMATION.FADE)}} name={SCREEN_NAME.LOGIN_SCREEN} component={LoginScreen} />
            </>
          )}
          {isLoaded && (
            <>
              <Stack.Screen options={{...getScreenAnimation(SCREEN_ANIMATION.LEFT)}} name={SCREEN_NAME.TABS_SCREEN} component={TabsNavigator} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default AppNavigator
