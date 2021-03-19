import {MaterialCommunityIcons} from '@expo/vector-icons'
import React, {useState} from 'react'
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native'
import {isEqual} from '../../config/isEqual'
import {COLOR} from '../../constants/COLOR'

interface ImageHocProps extends React.ComponentPropsWithoutRef<typeof Image> {
  exist?: boolean
}

const ImageHoc = ({exist = true, ...props}: ImageHocProps) => {
  const [isLoad, setIsLoad] = useState(false)
  const onLoadStart = () => setIsLoad(true)
  const onLoadEnd = () => setIsLoad(false)
  return (
    <>
      {isLoad && exist && <ActivityIndicator style={styles.iconBox} color={COLOR.GREEN} />}
      {!exist && (
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name="image" size={45} color={COLOR.GREEN} />
        </View>
      )}
      {exist && isLoad && <Image {...props} onLoadStart={onLoadStart} onLoadEnd={onLoadEnd} onError={onLoadEnd} />}
    </>
  )
}

const styles = StyleSheet.create({
  iconBox: {
    zIndex: 2000,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
})

export default React.memo(ImageHoc, (prev, next) => {
  return isEqual(prev.source, next.source)
})
