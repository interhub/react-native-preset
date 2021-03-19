import {useLayoutEffect, useState} from 'react'

import useCodePush from './useCodePush'
import useFontLoad from './useFontLoad'

import {useSelectorProp} from '../state/useSelectorProp'

/**
 * @hook important hook for initialize user store state from server
 */
export default () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const {token} = useSelectorProp('token')
  const isAuth = !!token

  const {syncCodePush} = useCodePush()
  const {loadFont} = useFontLoad()

  const loadAppResource = async () => {
    try {
      await syncCodePush()
      await loadFont()
    } catch (e) {
      console.warn(e, 'ERR LOAD RESOURCE AND HIDE SPLASH SCREEN')
    } finally {
      setIsLoaded(true)
    }
  }

  useLayoutEffect(() => {
    loadAppResource()
  }, [])

  return {
    isLoaded,
    isAuth,
  }
}
