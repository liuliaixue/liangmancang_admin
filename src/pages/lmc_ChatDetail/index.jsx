import React, { useState, useEffect } from 'react';

import BasicDetailInfo from './components/BasicDetailInfo';
import CollapseCard from './components/CollapseCard';
import DetailTable from './components/DetailTable';
import Table from './components/Table';

import graphqlClient from '@/utils/graphqlClient';
import { chat, admin_messageFeedback } from '@/utils/graphql/chat';
import { Button, Input, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import moment from 'moment';

const { Row, Col } = Grid;
import styles from './index.module.scss';

import { setToken, getUser } from '@/utils/user';
const currentUser = getUser();

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
    setMessage('');
    // await setStoreData(res['newMessage']);
    Message.success('保存成功');
    await fetchData();
  }
  async function handleMessageChange(msg) {
    console.log(msg);
    await setMessage(msg);
  }

  function renderMessage(msg, index) {
    return <></>;
  }

  // return (
  //   <>
  //     <Col xxs="24" l="12" className={styles.infoItem}>
  //       {currentUser._id === msg.userid ? (
  //         <span className={styles.infoItemLabel}>
  //           我 {moment(msg.createdAt).format('YYYY-MM-DD hh:mm:ss')}
  //         </span>
  //       ) : (
  //         <>
  //           <span className={styles.infoItemLabel}>
  //             user-{msg.userid}({msg.phone}){' '}
  //             {moment(msg.createdAt).format('YYYY-MM-DD hh:mm:ss')}
  //           </span>
  //         </>
  //       )}

  //       <div
  //         className={styles.infoItemValue}
  //         style={{ margin: '5px 0 5px 35px' }}
  //       >
  //         {msg.content}
  //         {msg.image && (
  //           <div>
  //             <img src={msg.image} />
  //           </div>
  //         )}
  //       </div>
  //     </Col>
  //   </>
  // );

  return (
    <div className="profile-page">
      <IceContainer>
        <Table data={storeData.list} />
        <Input onChange={handleMessageChange} value={message} />
        <Button type="primary" onClick={handleNewMessage}>
          enter
        </Button>
        &nbsp;&nbsp;
      </IceContainer>
    </div>
  );
}
