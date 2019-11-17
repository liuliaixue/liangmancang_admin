import React, { useState, useEffect } from 'react';

import BasicDetailInfo from './components/BasicDetailInfo';

import CollapseCard from './components/CollapseCard';

import DetailTable from './components/DetailTable';

import graphqlClient from '@/utils/graphqlClient';
import { chat, admin_messageFeedback } from '@/utils/graphql/chat';
import { Button, Input, Message } from '@alifd/next';

export default function Profile(props) {
  const [storeData, setStoreData] = useState({ list: [] });
  const [message, setMessage] = useState('');

  async function fetchData() {
    const _id = props.location.search.slice(11);
    if (!_id) {
      alert('no chat found');
      props.history.push('/chat/list');
    }
    const res = await graphqlClient(chat, { chatroom: _id });
    await setStoreData(res['chat']);
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function handleNewMessage() {
    const res = await graphqlClient(admin_messageFeedback, {
      chatroom: props.location.search.slice(11),
      content: message
    });
    // await setStoreData(res['newMessage']);
    Message.success('保存成功');
    await fetchData();
  }
  async function handleMessageChange(msg) {
    console.log(msg);
    await setMessage(msg);
  }

  return (
    <div className="profile-page">
      {/* <BasicDetailInfo /> */}
      {/* <CollapseCard /> */}
      {/* <DetailTable /> */}
      <pre> {JSON.stringify(storeData, null, 2)}</pre>
      <Input onChange={handleMessageChange} value={message} />
      <Button type="primary" onClick={handleNewMessage}>
        enter
      </Button>
      &nbsp;&nbsp;
    </div>
  );
}
