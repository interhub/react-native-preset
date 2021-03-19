import React from 'react'
import FullContainer from '../View/FullContainer'
import {COLOR} from '../../constants/COLOR'
import TextLine from '../Custom/TextLine'
import AnimateIcon from '../Icon/AnimateIcon'

interface BonusValueDisplayProps {
  dark: boolean
}

const BonusValueDisplay = ({dark}: BonusValueDisplayProps) => {
  //TODO USE SELECTOR STATE BONUS VALUE
  const BONUS_VALUE = 750
  const textColor = dark ? COLOR.BLACK : COLOR.WHITE

  return (
    <FullContainer flex={0} style={{minHeight: 70}}>
      <TextLine color={textColor} size={15}>
        Баланс бонусов
      </TextLine>
      <FullContainer flex={0} row centerHorisintal mv={-10}>
        <AnimateIcon size={30} active source={require('../../img/icon/bonus/bonus_icon.png')} />
        <TextLine mh={10} color={textColor} size={40} bold>
          {BONUS_VALUE}
        </TextLine>
      </FullContainer>
    </FullContainer>
  )
}

export default BonusValueDisplay
