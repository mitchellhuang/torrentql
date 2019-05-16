import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import cookie from 'cookie';

export default function initApollo() {
  const httpLink = new HttpLink({
    uri: '/graphql',
  });
  const authLink = setContext((_, { headers }) => {
    const { token } = cookie.parse(document.cookie);
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: token ? `bearer ${token}` : '',
        },
      };
    }
    return { headers };
  });
  return new ApolloClient({
    connectToDevTools: process.browser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
