import React from 'react'
import TouchableScale from 'react-native-touchable-scale'

import TextLine, {ALIGN_TEXT} from '../Custom/TextLine'
import {COLOR} from '../../constants/COLOR'

const LinkTextLine = ({title, onPress}: {title: string; onPress: () => void}) => {
  return (
    <TouchableScale friction={10} tension={10} onPress={onPress}>
      <TextLine color={COLOR.GRAY_LIGHT} size={15} style={{marginVertical: 20, textDecorationLine: 'underline'}} align={ALIGN_TEXT.CENTER}>
        {title}
      </TextLine>
    </TouchableScale>
  )
}

export default LinkTextLine
