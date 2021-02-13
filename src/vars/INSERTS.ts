import { initialWindowMetrics } from 'react-native-safe-area-context'

export default initialWindowMetrics?.insets || { bottom: 0, left: 0, right: 0, top: 0 } 