import React from 'react'
import {StyleSheet, ViewProps} from 'react-native'
import FullContainer from './FullContainer'
import {COLOR} from '../../constants/COLOR'

interface GrayRoundBoxProps {
  children: React.ReactNode
  style?: ViewProps['style']
}

const GrayRoundBox = ({children, style}: GrayRoundBoxProps) => {
  return (
    <FullContainer bg={COLOR.GRAY_LIGHT + '77'} flex={0} style={[styles.container, style]}>
      {children}
    </FullContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
  },
})

export default GrayRoundBox
