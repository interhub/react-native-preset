import React, {MutableRefObject} from 'react'
import {Keyboard} from 'react-native'
import {Modalize} from 'react-native-modalize'
import {COLOR} from '../../constants/COLOR'

interface ModalizeCustomProps extends React.ComponentPropsWithoutRef<typeof Modalize> {
	ref: MutableRefObject<Modalize | null>
}

const ModalizeCustom = React.forwardRef<Modalize, ModalizeCustomProps>((props, ref) => {
	return (
		<Modalize
			openAnimationConfig={{timing: {duration: 500}}}
			closeAnimationConfig={{timing: {duration: 500}}}
			adjustToContentHeight
			{...props}
			onOpen={() => {
				Keyboard.dismiss()
				if (props.onOpen) {
					props.onOpen()
				}
			}}
			modalStyle={[{backgroundColor: COLOR.WHITE}, props.modalStyle]}
			ref={ref}
		/>
	)
})

export default ModalizeCustom
