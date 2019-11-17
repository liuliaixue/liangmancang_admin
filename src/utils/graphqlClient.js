const { GraphQLClient } = require('graphql-request');
import { getToken } from './user';
import { server } from '../config/dataSource';

const graphqlClient = async (query, variables) => {
  return new Promise((resolve, reject) => {
    const client = new GraphQLClient(`${server}/api/graphql`, {
      headers: { 'x-lmc-token': getToken() }
    });

    client
      .request(query, variables)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        resolve(e.response);
      });
  });
};

export default graphqlClient;
