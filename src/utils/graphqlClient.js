const { GraphQLClient } = require('graphql-request');
import { getToken } from './user';
import { server } from '../config/dataSource';

import { Message } from '@alifd/next';

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
        console.log('graphqlClient error');
        Message.show({
          type: 'error',
          title: '请求错误',
          content: e.response.errors[0].message
        });
        reject(e.response);
      });
  });
};

export default graphqlClient;
