import React, {MutableRefObject} from 'react'
import {StyleSheet, TextInput, View} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'
import {FONT_NAME} from '../../font/FONT_NAME'
import {getStyleByPropsFuncType} from '../../type/types'
import {COLOR} from '../../constants/COLOR'
import DividerCustom from './DividerCustom'
import TextLine from './TextLine'
import {MarginTypes, useGetPropsMarginPaddingStyle} from '../../config/styleGenerator'

type TextInputCustomProps<T = React.ComponentPropsWithoutRef<typeof TextInput>> = T & {
  label?: string
  placeholder?: string
  mask?: string
  refs?: MutableRefObject<(TextInputMask & TextInput) | null>
} & MarginTypes

const TextInputCustom = (props: TextInputCustomProps) => {
  const {label = '', mask = '', placeholder = '', refs} = props

  const input_props = {
    maxLength: mask?.length || 500,
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
        {!mask && <TextInput {...input_props} />}
        {!!mask && (
          <TextInputMask
            {...input_props}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: mask,
            }}
          />
        )}
      </View>
      <DividerCustom />
    </View>
  )
}

const getContainerStyle: getStyleByPropsFuncType<TextInputCustomProps> = (props) => {
  const marginPadding = useGetPropsMarginPaddingStyle(props)

  return [styles.container, marginPadding]
}

const styles = StyleSheet.create({
  container: {},
  inputBox: {},
  input: {
    fontFamily: FONT_NAME.BOLD,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 0,
    paddingLeft: 5,
    bottom: 0,
    color: COLOR.BLACK,
  },
})

export default TextInputCustom
