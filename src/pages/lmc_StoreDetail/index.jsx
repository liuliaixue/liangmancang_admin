import React, { useState, useEffect } from 'react';

import BasicDetailInfo from './components/BasicDetailInfo';

import CollapseCard from './components/CollapseCard';

import DetailTable from './components/DetailTable';

import graphqlClient from '@/utils/graphqlClient';
import { store, admin_updateStoreStatusOK } from '@/utils/graphql/store';
import { Button } from '@alifd/next';
import { Message } from '@alifd/next';

export default function Profile(props) {
  const [storeData, setStoreData] = useState({ _id: '' });

  async function fetchData() {
    const _id = props.location.search.slice(5);
    if (!_id) {
      alert('no store found');
      props.history.push('/store/list');
    }
    const res = await graphqlClient(store, { _id });
    await setStoreData(res['store']);
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function handleClickStoreCheck() {
    const res = await graphqlClient(admin_updateStoreStatusOK, {
      _id: storeData._id
    });
    await setStoreData(res['admin_updateStoreStatus']);
    Message.success('保存成功');
  }
  async function handleClickStoreReject() {
    Message.success('未实现');
  }

  return (
    <div className="profile-page">
      <BasicDetailInfo data={storeData} />
      {/* <CollapseCard />
      <DetailTable /> */}
      {/* <pre> {JSON.stringify(storeData, null, 2)}</pre> */}
      {storeData.status === 'DEFAULT' || storeData.status === 'BAD' ? (
        <>
          <Button type="primary" onClick={handleClickStoreCheck}>
            通过
          </Button>
          <Button
            type="default"
            onClick={handleClickStoreReject}
            style={{ marginLeft: '15px' }}
          >
            不通过
          </Button>
        </>
      ) : (
        <Button type="primary" disabled>
          已通过审核
        </Button>
      )}
      &nbsp;&nbsp;
    </div>
  );
}
