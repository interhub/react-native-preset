import React from 'react'
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native'

import TextLine, {TextLinePropsType} from './TextLine'

import getShadow from '../../config/getShadow'
import {COLOR} from '../../constants/COLOR'
import {getStyleByPropsFuncType, MarginTypes} from '../../config/styleGenerator'

export const BTN_SIZE = 55

type ButtonCustomPropsType<T = React.ComponentPropsWithoutRef<typeof TouchableOpacity>> = T & {
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
  textProps?: TextLinePropsType
  children: string
  bg?: string
  shadow?: number
} & MarginTypes

const ButtonCustom = (props: ButtonCustomPropsType) => {
  const {disabled, onPress, children, textProps = {}, loading} = props

  const style = getStyleByProps(props)
  const isAccessPress = !disabled && !loading

  return (
    <TouchableOpacity onPress={isAccessPress ? onPress : () => null} {...props} style={style}>
      {!loading && (
        <TextLine numberOfLines={1} color={COLOR.BLACK_LIGHT} {...textProps}>
          {children}
        </TextLine>
      )}
      {loading && <ActivityIndicator color={COLOR.BLACK_LIGHT} />}
    </TouchableOpacity>
  )
}

const getStyleByProps: getStyleByPropsFuncType<ButtonCustomPropsType> = (props) => {
  const {bg = COLOR.PRIMARY, shadow = 0.5} = props
  return [styles.btnBox, {backgroundColor: bg, ...getShadow(shadow)}, props.style]
}

const styles = StyleSheet.create({
  btnBox: {
    width: '100%',
    height: BTN_SIZE,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default React.memo(ButtonCustom)
