import * as SplashScreen from 'expo-splash-screen'
import { useLayoutEffect, useState } from 'react'
import waitSleep from '../../config/waitSleep'
import useCodePush from './useCodePush'
import useFontLoad from './useFontLoad'
import useUpdateInfo from './useUpdateInfo'



/**
 * @hook important hook for initialize user store state from server
 */
export default () => {
	const [isLoaded, setIsLoaded] = useState(false)

	const { syncCodePush } = useCodePush()
	const { loadFont } = useFontLoad()
	const { updateTableInfo } = useUpdateInfo()

	const startUpdateCycle = async () => {
		await waitSleep()
		await updateTableInfo()
		startUpdateCycle()
	}

	const loadAppResource = async () => {
		try {
			await syncCodePush()
			loadFont()
		} catch (e) {
			console.warn(e, 'ERR LOAD RESOURCE AND SPASH')
		} finally {
			await updateTableInfo()
			setIsLoaded(true)
			startUpdateCycle()
		}
	}

	useLayoutEffect(() => {
		loadAppResource()
	}, [])

	return {
		isLoaded,
	}
}
