import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLOR} from "../../constants/COLOR";
import TextLine, {ALIGN_TEXT} from "../Custom/TextLine";
import FullContainer from "../View/FullContainer";
import {HeaderBackIcons} from "../Icon/BackIcon";

const HEADER_SIZE = 60

interface HeaderScreenProps {
    title?: string
    back?: boolean
}

const HeaderScreen = (props: HeaderScreenProps) => {
    const {back = false, title = ''} = props
    return (
        <FullContainer flex={0} row centerHorisintal style={styles.container}>
            <FullContainer>
                {back && <HeaderBackIcons/>}
            </FullContainer>
            <FullContainer flex={3}>
                <TextLine align={ALIGN_TEXT.CENTER} size={18}>{title}</TextLine>
            </FullContainer>
            <FullContainer/>
        </FullContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: HEADER_SIZE,
        minHeight: HEADER_SIZE,
    },
});

export default HeaderScreen
