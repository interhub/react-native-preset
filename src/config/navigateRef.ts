import {NavigationContainerRef} from '@react-navigation/native'
import React from 'react'

/**
navigation ref for change navigation state without navigation context and without react components
*/
export const navigationRef = React.createRef<NavigationContainerRef>()

export const ScreenNameContext = React.createContext<string>('')
