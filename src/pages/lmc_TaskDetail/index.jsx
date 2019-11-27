import React, { useState, useEffect } from 'react';

import BasicDetailInfo from './components/BasicDetailInfo';
import DetailTable from './components/DetailTable';

import graphqlClient from '@/utils/graphqlClient';
import { Button, Input, Message } from '@alifd/next';

import {
  task,
  admin_updateTaskStatusChecked,
  admin_updateTaskStatusBAD
} from '@/utils/graphql/task';
import EditRejectDialog from '../lmc_StoreDetail/components/EditRejectDialog';

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
  async function rejectWithMessage(message) {
    console.log({ rejectWithMessageStask: message });

    const res = await graphqlClient(admin_updateTaskStatusBAD, {
      _id: data._id,
      message
    });
    await setData(res['admin_updateTaskStatus']);
    Message.success('保存成功');
  }

  return (
    <div className="profile-page">
      {/* <pre> {JSON.stringify(data, null, 2)}</pre> */}
      <BasicDetailInfo dataSource={data} />
      <DetailTable dataSource={data.orders} />
      <div style={{ margin: '20px' }}>
        {data.status === 'DEFAULT' && (
          <Button type="primary" disabled>
            编辑中
          </Button>
        )}
        {data.status === 'CONFIRMED' && (
          <>
            <Button
              type="primary"
              onClick={handleClickTaskCheck}
              style={{ marginRight: '15px' }}
            >
              通过
            </Button>
            <EditRejectDialog
              record={data}
              // getFormValues={getFormValues}
              rejectWithMessage={rejectWithMessage}
            />
          </>
        )}
        {data.status === 'BAD' && (
          <Button type="primary" disabled>
            未通过
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
    </div>
  );
}
