import {Entypo} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {COLOR} from '../../constants/COLOR'
import TextLine from '../Custom/TextLine'

export const HeaderBackIcons = (props: {color?: string}) => {
  const {color = COLOR.BLACK} = props
  const {goBack} = useNavigation()

  return (
    <TouchableOpacity onPress={goBack}>
      <Entypo name="chevron-left" size={32} color={color} />
    </TouchableOpacity>
  )
}

export default React.memo(HeaderBackIcons)
