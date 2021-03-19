import React, {useEffect} from 'react'
import {ImageSourcePropType} from 'react-native'
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'

const ICON_SIZE_DEFAULT = 35

interface PropsIcon {
  source: ImageSourcePropType
  color?: string
  active?: boolean
  size?: number | string
}

const AnimateIcon = (props: PropsIcon) => {
  const {source, color, active, size = ICON_SIZE_DEFAULT} = props
  const {animStyle} = useAnimateIconStyle(active)

  return (
    <Animated.Image
      fadeDuration={0}
      resizeMode="contain"
      style={[
        {
          height: size,
          width: size,
          tintColor: color,
        },
        animStyle,
      ]}
      source={source}
    />
  )
}

const useAnimateIconStyle = (active?: boolean) => {
  const state_size = {
    active: 1,
    disable: 0.85,
  }
  const getActiveState = () => (active ? state_size.active : state_size.disable)
  const scale = useSharedValue(getActiveState())

  useEffect(() => {
    scale.value = withSpring(getActiveState())
  }, [active])

  const animStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }))

  return {animStyle}
}

export default React.memo(AnimateIcon)
