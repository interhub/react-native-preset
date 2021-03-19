import React from 'react'
import {ScrollView} from 'react-native'

import SIZE from '../../constants/SIZE'
import INSERTS from '../../constants/INSERTS'
import {getStyleByPropsFuncType, PaddingTypes, useGetPropsMarginPaddingStyle} from '../../config/styleGenerator'

type ScrollViewContainerProps<T = React.ComponentPropsWithoutRef<typeof ScrollView>> = T & {
  children: React.ReactNode
  fullPage?: boolean
} & PaddingTypes

const ScrollViewContainer = (props: ScrollViewContainerProps) => {
  const style = getStyleByProps(props)

  return <ScrollView contentContainerStyle={style} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} {...props} />
}

const getStyleByProps: getStyleByPropsFuncType<ScrollViewContainerProps> = (props) => {
  const {fullPage = false} = props
  const MarginPadding = useGetPropsMarginPaddingStyle(props)
  return [MarginPadding, fullPage && {minHeight: SIZE.height}, props.style]
}

export default ScrollViewContainer
