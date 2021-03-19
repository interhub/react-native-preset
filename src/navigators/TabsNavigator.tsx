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
import ProfileTab from '../screen/TabsScreen/ProfileTab/ProfileTab'
import OrderTab from '../screen/TabsScreen/OrderTab/OrderTab'
import InfoTab from '../screen/TabsScreen/InfoTab/InfoTab'

const Tab = createBottomTabNavigator()

const TAB_ICON_SIZE = 28

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
      }}
      initialRouteName={TABS_NAME.PROFILE_TAB}
      sceneContainerStyle={{backgroundColor: COLOR.PRIMARY}}
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
      lazy={false}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        tabStyle: styles.tabStyle,
      }}
    >
      <Tab.Screen name={TABS_NAME.PROFILE_TAB} component={ProfileTab} />
      <Tab.Screen name={TABS_NAME.ORDER_TAB} component={OrderTab} />
      <Tab.Screen name={TABS_NAME.INFO_TAB} component={InfoTab} />
    </Tab.Navigator>
  )
}

const TAB_INFO = [
  {source: require('../img/icon/navigation/1.png'), key: 0, screen: TABS_NAME.PROFILE_TAB},
  {source: require('../img/icon/navigation/2.png'), key: 1, screen: TABS_NAME.ORDER_TAB},
  {source: require('../img/icon/navigation/3.png'), key: 2, screen: TABS_NAME.INFO_TAB},
]

const BottomTabBar = ({state, tabStyle}: BottomTabBarProps) => {
  return (
    <View style={[tabStyle]}>
      <TabItem info={TAB_INFO[0]} state={state} />
      <TabItem info={TAB_INFO[1]} state={state} />
      <TabItem info={TAB_INFO[2]} state={state} />
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
  const ACTIVE_COLOR = COLOR.WHITE
  const INACTIVE_COLOR = COLOR.GRAY_DARK
  const ICON_COLOR = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR

  return (
    <View
      style={{
        paddingBottom: bottom + TAB_PADDING,
        paddingTop: TAB_PADDING,
      }}
    >
      <TouchableScale onPress={onTabPress}>
        <AnimateIcon size={TAB_ICON_SIZE} active={isFocused} color={ICON_COLOR} source={props.info.source} />
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
    backgroundColor: COLOR.PRIMARY,
    justifyContent: 'space-around',
    padding: 5,
    ...getShadow(2),
  },
})

export default TabsNavigator
