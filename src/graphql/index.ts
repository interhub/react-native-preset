import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

import {store} from '../store/store'
import {LOCATION} from '../constants/LOCATION'

const httpLink = createHttpLink({
  uri: LOCATION.GQL_ENDPOINT,
})

const authLink = setContext((_, {headers}) => {
  const {token} = store.getState()
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
