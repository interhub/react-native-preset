import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import AnimateIcon from '../components/Icon/AnimateIcon'
import getShadow from '../config/getShadow'
import {COLOR} from '../constants/COLOR'
import {TABS_NAME} from '../constants/SCREEN_NAME'
import AboutScreen from '../screen/TabsScreen/AboutScreen'
import ChallengeListScreen from '../screen/TabsScreen/ChallengeListScreen'
import TextLine, {ALIGN_TEXT} from '../components/Custom/TextLine'

const Tab = createBottomTabNavigator()

const TAB_ICON_SIZE = 50

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
      }}
      initialRouteName={TABS_NAME.CHALLENGES_TAB}
      sceneContainerStyle={{backgroundColor: COLOR.BLACK_DARK}}
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
      lazy={false}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        tabStyle: styles.tabStyle,
      }}
    >
      <Tab.Screen name={TABS_NAME.ABOUT_TAB} component={AboutScreen} />
      <Tab.Screen name={TABS_NAME.CHALLENGES_TAB} component={ChallengeListScreen} />
    </Tab.Navigator>
  )
}

const TAB_INFO = [
  {source: require('../img/icon/1.png'), key: 0, screen: TABS_NAME.ABOUT_TAB, title: 'О приложении'},
  {source: require('../img/icon/2.png'), key: 1, screen: TABS_NAME.CHALLENGES_TAB, title: 'Челленджи'},
]

const BottomTabBar = ({state, tabStyle}: BottomTabBarProps) => {
  return (
    <View style={[tabStyle]}>
      <TabItem info={TAB_INFO[0]} state={state} />
      <TabItem info={TAB_INFO[1]} state={state} />
    </View>
  )
}

interface TabItemProps {
  state: BottomTabBarProps['state']
  info: typeof TAB_INFO[0]
}

const TabItem = (props: TabItemProps) => {
  const {bottom} = useSafeAreaInsets()
  const TAB_PADDING = 15
  const {onTabPress, isFocused} = useOnPressTabByIndex(props)
  const ACTIVE_COLOR = COLOR.PRIMARY
  const INACTIVE_COLOR = COLOR.GRAY_DARK
  const ICON_COLOR = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR

  return (
    <View
      style={{
        paddingBottom: bottom + TAB_PADDING,
      }}
    >
      <TouchableScale friction={10} tension={10} style={{alignItems: 'center'}} onPress={onTabPress}>
        <AnimateIcon size={TAB_ICON_SIZE} active={isFocused} color={ICON_COLOR} source={props.info.source} />
        <TextLine color={ICON_COLOR} size={15} align={ALIGN_TEXT.CENTER}>
          {props.info.title}
        </TextLine>
      </TouchableScale>
    </View>
  )
}

const useOnPressTabByIndex = (props: TabItemProps) => {
  const {info, state} = props
  const isFocused = state.index === info.key
  const navigation = useNavigation()
  const onTabPress = () => {
    navigation.navigate(props.info.screen)
  }
  return {onTabPress, isFocused}
}

const styles = StyleSheet.create({
  tabStyle: {
    flexDirection: 'row',
    backgroundColor: COLOR.BLACK_LIGHT,
    justifyContent: 'space-around',
    padding: 5,
    ...getShadow(2),
  },
})

export default TabsNavigator
