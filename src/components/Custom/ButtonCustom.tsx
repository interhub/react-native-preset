import React from 'react'
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from 'react-native'
import getShadow from '../../config/getShadow'
import {getStyleByPropsFuncType} from '../../type/types'
import {COLOR} from '../../constants/COLOR'
import TextLine, {TextLinePropsType} from './TextLine'
import {MarginTypes, useGetPropsMarginPaddingStyle} from "../../config/styleGenerator";
import SIZE from "../../constants/SIZE";

export const BTN_SIZE = 40 + SIZE.height * 0.03

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
    const containerStyle = getContainerStyle(props)

    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={!disabled ? onPress : () => null} style={style} {...props}>
                {!loading && (
                    <TextLine numberOfLines={1} color={COLOR.WHITE} {...textProps}>
                        {children}
                    </TextLine>
                )}
                {loading && <ActivityIndicator color={COLOR.WHITE}/>}
            </TouchableOpacity>
        </View>
    )
}

const getStyleByProps: getStyleByPropsFuncType<ButtonCustomPropsType> = (props) => {
    const {bg = COLOR.PRIMARY, shadow = 0.5} = props
    const {marginVertical} = useGetPropsMarginPaddingStyle(props)
    return [styles.btnBox, {backgroundColor: bg, marginVertical, ...getShadow(shadow)}]
}
const getContainerStyle: getStyleByPropsFuncType<ButtonCustomPropsType> = (props) => {
    const {marginHorizontal, margin, marginTop} = useGetPropsMarginPaddingStyle(props)
    //dont replace its costil
    return {paddingHorizontal: marginHorizontal, margin, marginTop}
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
