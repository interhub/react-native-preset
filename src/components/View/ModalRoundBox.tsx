import React, {useRef} from 'react'
import {Animated, Modal, StyleSheet} from 'react-native'
import FullContainer from './FullContainer'
import {COLOR} from '../../constants/COLOR'
import SIZE from '../../constants/SIZE'
import getShadow from '../../config/getShadow'
import {useSafeAreaFrame} from 'react-native-safe-area-context'

interface ModalRoundBoxProps {
  visible: boolean
  hide: () => void
  children: React.ReactNode
}

const ModalRoundBox = (props: ModalRoundBoxProps) => {
  const {visible, hide = () => alert('none'), children} = props
  const {height: VISIBLE_HEIGHT} = useSafeAreaFrame()

  return (
    <Modal statusBarTranslucent animated onRequestClose={hide} transparent animationType={'fade'} visible={visible}>
      <ModalDimissFill onBgPress={hide} />
      <FullContainer style={{maxHeight: VISIBLE_HEIGHT}} centerVertical ph={40} pointerEvents={'box-none'}>
        <ModalContentWhiteBox>{children}</ModalContentWhiteBox>
      </FullContainer>
    </Modal>
  )
}

const ModalDimissFill = ({onBgPress}: {onBgPress: () => void}) => {
  return <FullContainer onTouchStart={onBgPress} style={[StyleSheet.absoluteFillObject]} bg={'rgba(0,0,0,0.7)'}></FullContainer>
}

const ModalContentWhiteBox = ({children}: {children: React.ReactNode}) => {
  const {boxStyle} = useAnimateWhiteBox()
  return (
    <Animated.View style={[boxStyle]}>
      <FullContainer flex={0} bg={COLOR.WHITE} ph={15} pv={20} style={[{borderRadius: 20}, getShadow(2)]}>
        {children}
      </FullContainer>
    </Animated.View>
  )
}

const useAnimateWhiteBox = () => {
  const pos_state = {
    start: SIZE.height,
    end: 0,
  }
  const translateY = useRef(new Animated.Value(pos_state.start)).current
  const boxStyle = {
    transform: [{translateY}],
  }
  React.useEffect(() => {
    Animated.spring(translateY, {toValue: pos_state.end, useNativeDriver: true}).start()
  }, [])

  return {boxStyle}
}

export default ModalRoundBox
