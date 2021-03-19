import {useEffect} from 'react'
import {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated'

/**
 animate zoom image Animated hook from native react native
 */
const useAnimateImageZoom = () => {
  const pos_state = {start: 0.8, end: 1}
  const duration = 10000
  const animate = useSharedValue(pos_state.start)
  useEffect(() => {
    animate.value = withRepeat(withSequence(withTiming(pos_state.end, {duration}), withTiming(pos_state.start, {duration})), -1)
  }, [])
  const imgStyle = useAnimatedStyle(() => ({
    transform: [{scale: animate.value}],
  }))
  return {
    imgStyle,
  }
}
export default useAnimateImageZoom
