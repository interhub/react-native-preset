import {StyleProp, ViewStyle} from 'react-native'

export type getStyleByPropsFuncType<T extends {style?: StyleProp<any>}> = (props: T) => T['style']

export type MarginTypes = {
  mv?: number
  mh?: number
  m?: number
  mt?: number | 'auto'
}
type ResultMarginTypes = Pick<ViewStyle, 'margin' | 'marginHorizontal' | 'marginVertical' | 'marginTop'>

export type PaddingTypes = {
  pt?: number
  pb?: number
  ph?: number
  pv?: number
}
type ResultPaddingTypes = Pick<ViewStyle, 'paddingTop' | 'paddingBottom' | 'paddingHorizontal' | 'paddingVertical'>

export const useGetPropsMarginPaddingStyle = <T extends MarginTypes & PaddingTypes>(props: T): ResultMarginTypes & ResultPaddingTypes => {
  const {
    mv,
    m,
    mh,
    mt,

    pb,
    ph,
    pt,
    pv,
  } = props
  return {
    margin: m,
    marginVertical: mv,
    marginTop: mt,
    marginHorizontal: mh,

    paddingHorizontal: ph,
    paddingBottom: pb,
    paddingTop: pt,
    paddingVertical: pv,
  }
}
