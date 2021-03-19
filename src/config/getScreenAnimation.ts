import {COLOR} from '../constants/COLOR'
import {CardStyleInterpolators, StackNavigationOptions, TransitionSpecs} from '@react-navigation/stack'
import getShadow from './getShadow'

/**
 animation types for react-navigation from https://reactnavigation.org/docs/stack-navigator/#transitionpresets
 */
export enum SCREEN_ANIMATION {
  ZOOM = 'ZOOM',
  LEFT = 'LEFT',
  TOP = 'TOP',
  NONE = 'NONE',
  FADE = 'FADE',
  MODAL = 'MODAL',
  OPACITY = 'OPACITY',
}

const ANIMATION = {
  [SCREEN_ANIMATION.ZOOM]: CardStyleInterpolators.forScaleFromCenterAndroid,
  [SCREEN_ANIMATION.LEFT]: CardStyleInterpolators.forHorizontalIOS,
  [SCREEN_ANIMATION.TOP]: CardStyleInterpolators.forVerticalIOS,
  [SCREEN_ANIMATION.NONE]: CardStyleInterpolators.forNoAnimation,
  [SCREEN_ANIMATION.FADE]: CardStyleInterpolators.forFadeFromBottomAndroid,
  [SCREEN_ANIMATION.MODAL]: CardStyleInterpolators.forModalPresentationIOS,
  [SCREEN_ANIMATION.OPACITY]: ({current: {progress}}: any) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
}

/**
 get some screen navigation animation config for navigation (by doc from https://reactnavigation.org/docs/stack-navigator/#animations )
 */
export default (animation = SCREEN_ANIMATION.NONE, swipe = true): StackNavigationOptions => ({
  headerShown: false,
  //@ts-ignore
  cardStyleInterpolator: ANIMATION[animation],
  gestureEnabled: swipe,
  gestureDirection: 'horizontal',
  animationTypeForReplace: 'push',
  gestureResponseDistance: {vertical: 0, horizontal: 20},
  cardStyle: {
    backgroundColor: COLOR.WHITE,
  },
})
