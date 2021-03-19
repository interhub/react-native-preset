import React, {MutableRefObject} from 'react'
import {StyleSheet, TextInput, View} from 'react-native'

import TextLine from './TextLine'

import {FONT_NAME} from '../../font/FONT_NAME'
import {COLOR} from '../../constants/COLOR'
import {getStyleByPropsFuncType, MarginTypes, useGetPropsMarginPaddingStyle} from '../../config/styleGenerator'
import FullContainer from '../View/FullContainer'

type TextInputCustomProps<T = React.ComponentPropsWithoutRef<typeof TextInput>> = T & {
  label?: string
  placeholder?: string
  refs?: MutableRefObject<TextInput | null>
} & MarginTypes

const TextInputCustom = (props: TextInputCustomProps) => {
  const {label = '', refs} = props

  const input_props = {
    style: styles.input,
    ref: refs,
    ...props,
  }

  const containerStyle = getContainerStyle(props)

  return (
    <View style={containerStyle}>
      {/* BLOCK LABEL */}
      <TextLine color={COLOR.GRAY_DARK} mh={5} size={14}>
        {label}
      </TextLine>
      {/* BLOCK INPUT */}
      <View style={styles.inputBox}>
        <FullContainer style={[styles.fill]} />
        <TextInput placeholderTextColor={COLOR.GRAY_DARK} maxLength={500} {...input_props} />
      </View>
    </View>
  )
}

const getContainerStyle: getStyleByPropsFuncType<TextInputCustomProps> = (props) => {
  const MarginPadding = useGetPropsMarginPaddingStyle(props)
  return [styles.container, MarginPadding]
}

const styles = StyleSheet.create({
  container: {},
  inputBox: {
    height: 55,
    justifyContent: 'center',
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLOR.GRAY_DARK,
    opacity: 0.2,
    borderRadius: 15,
  },
  input: {
    fontFamily: FONT_NAME.NORM,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 0,
    paddingLeft: 5,
    bottom: 0,
    color: COLOR.GRAY_LIGHT,
  },
})

export default TextInputCustom
