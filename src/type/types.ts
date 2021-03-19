import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'

import {SCREEN_NAME} from '../constants/SCREEN_NAME'

/**
 Screen params navigaton types by doc from https://reactnavigation.org/docs/typescript/
 */
type SCREEN_PARAMS_ALL = {
  [SCREEN_NAME.LOAD_SCREEN]: undefined
  [SCREEN_NAME.LOGIN_SCREEN]: undefined
  [SCREEN_NAME.TABS_SCREEN]: undefined
}

/**
 NAV type for use in useNavigation hook to every screen
 */
export type NAV_TYPE = StackNavigationProp<SCREEN_PARAMS_ALL, SCREEN_NAME>

/**
 ROUTE type for use in useRoute hook to every navigate screen
 */
export type ROUTE_TYPE<T extends SCREEN_NAME> = RouteProp<SCREEN_PARAMS_ALL, T>

/**
 Redux full initial state type
 */
export type StateType = {
  token: string
  loading: boolean
  error: string
}

export type ChallengeType = {
  type: 'global' | 'personal'
  id: string
  title: string
  goal: number
  goalUnits: string
  bonusPoints: number
  media: {full_url: string}[]
  endDate: Date
  startDate: Date
  pivot: {progress: number}
}
