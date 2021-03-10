import {useSelector} from 'react-redux'
import {StateType} from '../../type/types'

/**
 get store state params by string name (selector)
 */
export const useSelectorProp = <T extends keyof StateType>(prop: T) => {
	const result = useSelector<StateType, StateType[T]>((state) => (state[prop]))
	return {[prop]: result} as { [x in T]: StateType[T] }
}

