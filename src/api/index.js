import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh/'
});

export function query(data) {
  return client.query(data);
};