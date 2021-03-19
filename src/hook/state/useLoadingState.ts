import {useDispatch} from 'react-redux'

import {useSelectorProp} from './useSelectorProp'

import {setLoadingAction} from '../../store/actions'

/**
@hook for change loading state for some screen to store
*/
export default () => {
  const {loading} = useSelectorProp('loading')
  const dispatch = useDispatch()
  const setLoading = (loading: boolean) => {
    dispatch(setLoadingAction(loading))
  }
  return {loading, setLoading}
}
