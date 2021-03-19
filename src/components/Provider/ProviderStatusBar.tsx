import React from 'react'
import {StatusBar} from 'react-native'

import {COLOR} from '../../constants/COLOR'
import FullContainer from '../View/FullContainer'

interface ProviderStatusBarProps {
  children: React.ReactNode
}

const ProviderStatusBar = ({children}: ProviderStatusBarProps) => {
  return (
    <FullContainer>
      {children}
      <StatusBar animated translucent barStyle={'light-content'} backgroundColor={COLOR.NONE} />
    </FullContainer>
  )
}

export default ProviderStatusBar
