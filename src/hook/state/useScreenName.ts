import {useContext} from 'react'

import {ScreenNameContext} from '../../config/navigateRef'

const useScreenName = () => {
  const screen = useContext(ScreenNameContext)
  return {screen}
}
export default useScreenName
