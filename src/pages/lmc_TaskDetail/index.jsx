import React, { useState, useEffect } from 'react';

import BasicDetailInfo from './components/BasicDetailInfo';

import CollapseCard from './components/CollapseCard';

import DetailTable from './components/DetailTable';

import graphqlClient from '@/utils/graphqlClient';
// import { chat, admin_messageFeedback } from '@/utils/graphql/chat';
import { Button, Input, Message } from '@alifd/next';

import { task, admin_updateTaskStatusChecked } from '@/utils/graphql/task';

export default function Profile(props) {
  const [data, setData] = useState({});

  async function fetchData() {
    const _id = props.location.search.slice(5);
    if (!_id) {
      alert('no chat found');
      props.history.push('/task/list');
    }
    const res = await graphqlClient(task, { _id: _id });
    await setData(res['task']);
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function handleClickTaskCheck() {
    const res = await graphqlClient(admin_updateTaskStatusChecked, {
      _id: props.location.search.slice(5)
    });
    await setData(res['admin_updateTaskStatus']);
    Message.success('保存成功');
  }

  return (
    <div className="profile-page">
      <pre> {JSON.stringify(data, null, 2)}</pre>
      {data.status === 'DEFAULT' && (
        <Button type="primary" disabled>
          编辑中
        </Button>
      )}
      {data.status === 'CONFIRMED' && (
        <Button type="primary" onClick={handleClickTaskCheck}>
          通过
        </Button>
      )}
      {data.status === 'CHECKED' && (
        <Button type="primary" disabled>
          已审核通过
        </Button>
      )}
      {data.status === 'AUTO_CHECKED' && (
        <Button type="primary" disabled>
          已通过审核
        </Button>
      )}
      &nbsp;&nbsp;
    </div>
  );
}
