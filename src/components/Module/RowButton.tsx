import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FullContainer from "../View/FullContainer";

import {Entypo} from '@expo/vector-icons';
import TextLine from "../Custom/TextLine";
import {COLOR} from "../../constants/COLOR";
import {BTN_SIZE} from "../Custom/ButtonCustom";

interface RowButtonProps {
    title: string
    onPress: () => void
    bg?: string
    textColor?: string
}

const ROW_HEIGHT = BTN_SIZE

const RowButton = (props: RowButtonProps) => {
    const {title = '', onPress, bg = '#ececec', textColor = COLOR.BLACK} = props
    return (
        <TouchableOpacity onPress={onPress}>
            <FullContainer bg={bg} row centerHorisintal ph={10} flex={0} style={styles.container}>
                <FullContainer flex={10}>
                    <TextLine color={textColor} numberOfLines={1}>{title}</TextLine>
                </FullContainer>
                <FullContainer flex={1}>
                    <Entypo name="chevron-small-right" size={25} color={textColor}/>
                </FullContainer>
            </FullContainer>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        justifyContent: 'space-between',
        height: ROW_HEIGHT,
        width: '100%'
    },
});

export default RowButton
