import React from 'react'
import {ScrollView, useWindowDimensions} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {getStyleByPropsFuncType, PaddingTypes} from '../../type/types'
import SIZE from '../../constants/SIZE'
import INSERTS from "../../constants/INSERTS";
import {useGetPropsMarginPaddingStyle} from "../../config/styleGenerator";

type ScrollViewContainerProps<T = React.ComponentPropsWithoutRef<typeof ScrollView>> = T & {
    children: React.ReactNode
    fullPage?: boolean
} & PaddingTypes

const ScrollViewContainer = (props: ScrollViewContainerProps) => {
    const style = getStyleByProps(props)

    return (
        <ScrollView
            contentContainerStyle={style}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            {...props}
        />
    )
}

const getStyleByProps: getStyleByPropsFuncType<ScrollViewContainerProps> = (props) => {
    const {fullPage = false} = props
    const marginPadding = useGetPropsMarginPaddingStyle(props)
    return [
        marginPadding,
        fullPage && {minHeight: SIZE.height - INSERTS.bottom},
        props.style,
    ]
}

export default ScrollViewContainer
