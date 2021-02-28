import * as Linking from 'expo-linking'
import Message from '../config/Message'

/**
open links in browser or deep linked links
*/
export default (url: string) => {
	if (!url)
		return Message('Пустая ссылка')
	if (!Linking.canOpenURL(url))
		return Message('Не получается открыть ссылку')
	Linking.openURL(url)
}
