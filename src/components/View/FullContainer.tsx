import React from 'react'
import {StyleSheet, View} from 'react-native'
import {getStyleByPropsFuncType} from '../../type/types'
import {COLOR} from '../../constants/COLOR'
import {MarginTypes, PaddingTypes, useGetPropsMarginPaddingStyle} from '../../config/styleGenerator'

type FullContainerProps<T = React.ComponentPropsWithoutRef<typeof View>> = T & {
  children?: React.ReactNode
  centerVertical?: boolean
  centerHorisintal?: boolean
  bg?: string
  flex?: number
  row?: boolean
} & PaddingTypes &
  MarginTypes

const FullContainer = (props: FullContainerProps) => {
  const style = getStyleByProps(props)
  return <View {...props} style={style} />
}

const getStyleByProps: getStyleByPropsFuncType<FullContainerProps> = (props) => {
  const {centerVertical, centerHorisintal, bg = COLOR.NONE, flex = 1, row = false} = props
  const marginPadding = useGetPropsMarginPaddingStyle(props)
  return [
    centerVertical && {justifyContent: 'center'},
    centerHorisintal && {alignItems: 'center'},
    row && {flexDirection: 'row'},
    {backgroundColor: bg},
    marginPadding,
    styles.container,
    {flex},
    props.style,
  ]
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default FullContainer
