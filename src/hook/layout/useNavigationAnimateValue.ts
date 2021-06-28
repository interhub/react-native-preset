import {Animated} from 'react-native'
import {useCardAnimation} from '@react-navigation/stack'

type animateNavConfigType = { startOpen: number, endOpen: number, extra?: Animated.ExtrapolateType }

/**
 get animation context from react navigation animation and use it from animated interpolate low
 */
const useNavigationAnimateValue = ({startOpen, endOpen, extra}: animateNavConfigType) => {
    const {current: {progress}} = useCardAnimation()
    return progress.interpolate({inputRange: [0, 1], outputRange: [startOpen, endOpen], extrapolate: extra})
}
export default useNavigationAnimateValue
