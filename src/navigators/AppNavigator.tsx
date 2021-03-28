import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React,{useState} from 'react'

import TabsNavigator from './TabsNavigator'

import getScreenAnimation, {SCREEN_ANIMATION} from '../config/getScreenAnimation'
import useLoadResource from '../hook/load_config/useLoadResource'
import LoadingScreen from '../screen/LoadingScreen/LoadingScreen'
import {SCREEN_NAME} from '../constants/SCREEN_NAME'
import LoginScreen from '../screen/LoginScreen'
import {ScreenNameContext, navigationRef} from '../config/navigateRef'
const initialRouteName = SCREEN_NAME.LOAD_PAGE
const Stack = createStackNavigator()

const AppNavigator = () => {
  const {isLoaded, isAuth} = useLoadResource()
    const [screen, setScreen] = useState<string>(initialRouteName)

    return (
    <>
      <NavigationContainer
          onStateChange={() => {
              const currentRouteName = navigationRef.current?.getCurrentRoute()?.name || ''
              setScreen(currentRouteName)
          }}
          ref={navigationRef}>
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
