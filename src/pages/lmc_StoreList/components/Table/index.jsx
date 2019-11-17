import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import IceContainer from '@icedesign/container';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import styles from './index.module.scss';
import graphqlClient from '@/utils/graphqlClient';
import moment from 'moment';
import { admin_storeList, store } from '@/utils/graphql/store';
// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function GoodsTable(props) {
  const [current, setCurrent] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(current);
  }, []);

  async function fetchData(currentPage) {
    await setLoading(true);

    const res = await graphqlClient(admin_storeList, {
      skip: (currentPage - 1) * 10,
      limit: 10
    });
    setData(res['admin_storeList'].list);
    setLoading(false);
  }

  async function handlePaginationChange(currentPage) {
    await setCurrent(currentPage);
    fetchData(currentPage);
  }

  function handleFilterChange() {
    // fetchData();
  }

  async function handleDisable(record) {
    Dialog.confirm({
      title: '提示',
      content: '确认冻结吗',
      onOk: async () => {
        alert('还没有实现哦...');
        fetchData(10);
      }
    });
  }

  function handleDetail(record) {
    props.history.push(`/store/detail?_id=${record._id}`);
  }

  function renderOper(value, index, record) {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={() => handleDetail(record)}
        >
          <FormattedMessage id="app.btn.detail" />
        </Button>
        <Button type="normal" warning onClick={() => handleDisable(record)}>
          冻结
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <IceContainer>
        <FilterTag onChange={handleFilterChange} />
        <FilterForm onChange={handleFilterChange} />
      </IceContainer>
      <IceContainer>
        <Table loading={isLoading} dataSource={data} hasBorder={false}>
          <Table.Column title="店铺" dataIndex="name" />
          <Table.Column
            title="创建时间"
            dataIndex="createdAt"
            cell={(value, index, record) =>
              moment(record.createdAt).format('YYYY-MM-DD')
            }
          />
          <Table.Column title="快照" dataIndex="storeScreenShotImage" />
          <Table.Column title="店铺网址" dataIndex="website" />
          <Table.Column title="旺旺号" dataIndex="wangwang" />
          <Table.Column title="联系方式" dataIndex="contactPhone" />
          <Table.Column title="联系人地址" dataIndex="address" />
          <Table.Column title="状态" dataIndex="status" />
          <Table.Column
            title="操作"
            width={200}
            dataIndex="oper"
            cell={renderOper}
          />
        </Table>
        <Pagination
          className={styles.pagination}
          current={current}
          onChange={handlePaginationChange}
        />
      </IceContainer>
    </div>
  );
}
