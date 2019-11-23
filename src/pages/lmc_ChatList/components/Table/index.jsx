import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import IceContainer from '@icedesign/container';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import styles from './index.module.scss';
import graphqlClient from '@/utils/graphqlClient';
import moment from 'moment';
// import { admin_storeList, store } from '@/utils/graphql/store';
import { admin_chatList } from '@/utils/graphql/chat';

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

    const res = await graphqlClient(admin_chatList, {
      skip: (currentPage - 1) * 10,
      limit: 10
    });
    setData(res['admin_chatList'].list);
    setLoading(false);
  }

  async function handlePaginationChange(currentPage) {
    await setCurrent(currentPage);
    fetchData(currentPage);
  }

  function handleFilterChange() {
    // fetchData();
  }

  function handleDetail(record) {
    props.history.push(`/chat/detail?_chatroom=${record.list[0].chatroom}`);
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
          {record.total}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* <IceContainer>
        <FilterTag onChange={handleFilterChange} />
        <FilterForm onChange={handleFilterChange} />
      </IceContainer> */}
      <IceContainer>
        <Table loading={isLoading} dataSource={data} hasBorder={false}>
          <Table.Column
            title="user"
            dataIndex="userid"
            cell={(v, i, record) => record.list[0].userid}
          />
          <Table.Column
            title="创建时间"
            dataIndex="createdAt"
            cell={(value, index, record) =>
              moment(record.list[0].createdAt).format('YYYY-MM-DD')
            }
          />
          <Table.Column
            title="taskid"
            cell={(v, i, record) => record.list[0].taskid}
          />
          <Table.Column
            title="content"
            dataIndex="content"
            cell={(v, i, record) => record.list[0].content}
          />
          <Table.Column
            title="image"
            dataIndex="image"
            cell={(v, i, record) => record.list[0].image}
          />
          <Table.Column
            title="phone"
            dataIndex="phone"
            cell={(v, i, record) => record.list[0].handlePaginationChange}
          />
          <Table.Column
            title="type"
            dataIndex="type"
            cell={(v, i, record) => record.list[0].type}
          />

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
