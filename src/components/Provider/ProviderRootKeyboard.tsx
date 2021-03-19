import React from 'react'
import {KeyboardAvoidingView} from 'react-native'

import {COLOR} from '../../constants/COLOR'
import IS_IOS from '../../constants/IS_IOS'

interface ProviderKeyboardBarProps {
  children: React.ReactNode
  bg: COLOR
}

const ProviderRootKeyboard = ({children, bg}: ProviderKeyboardBarProps) => {
  return (
    <KeyboardAvoidingView pointerEvents={'box-none'} style={[{flex: 1, backgroundColor: bg}]} behavior={IS_IOS ? 'padding' : undefined}>
      {children}
    </KeyboardAvoidingView>
  )
}

export default ProviderRootKeyboard
