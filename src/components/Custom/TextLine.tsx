import React from 'react'
import {Text} from 'react-native'

import {FONT_NAME} from '../../font/FONT_NAME'
import {COLOR} from '../../constants/COLOR'
import {getStyleByPropsFuncType, MarginTypes, PaddingTypes, useGetPropsMarginPaddingStyle} from '../../config/styleGenerator'

export type TextLinePropsType<T = React.ComponentPropsWithoutRef<typeof Text>> = T & {
  children?: string | React.ReactNode
  color?: string
  size?: number
  bold?: boolean
  tint?: boolean
  align?: ALIGN_TEXT
} & MarginTypes &
  PaddingTypes

export enum ALIGN_TEXT {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

const TextLine = (props: TextLinePropsType) => {
  const textStyle = getTextStyleByProp(props)

  return (
    <Text {...props} style={textStyle}>
      {props.children}
    </Text>
  )
}

const getTextStyleByProp: getStyleByPropsFuncType<TextLinePropsType> = (props) => {
  const {color = COLOR.WHITE, size = 17, align = ALIGN_TEXT.LEFT, bold = false, tint = false} = props

  const MarginPadding = useGetPropsMarginPaddingStyle(props)
  return [
    {
      color,
      fontSize: size,
      textAlign: align,
      fontFamily: bold ? FONT_NAME.BOLD : tint ? FONT_NAME.TINT : FONT_NAME.NORM,
    },
    MarginPadding,
    props.style,
  ]
}

export default React.memo(TextLine)
