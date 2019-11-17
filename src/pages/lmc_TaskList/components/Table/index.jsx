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
import {
  admin_taskList,
  task,
  admin_updateTaskStatusChecked
} from '@/utils/graphql/task';

export default function GoodsTable(props) {
  const [current, setCurrent] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(current);
  }, []);

  async function fetchData(currentPage) {
    await setLoading(true);

    const res = await graphqlClient(admin_taskList, {
      skip: (currentPage - 1) * 10,
      limit: 10
    });
    setData(res['admin_taskList'].list);
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
    props.history.push(`/task/detail?_id=${record._id}`);
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
      <IceContainer>
        <FilterTag onChange={handleFilterChange} />
        <FilterForm onChange={handleFilterChange} />
      </IceContainer>
      <IceContainer>
        <Table loading={isLoading} dataSource={data} hasBorder={false}>
          <Table.Column title="userid" dataIndex="userid" />
          <Table.Column title="storeid" dataIndex="storeid" />
          <Table.Column title="platform" dataIndex="platform" />
          <Table.Column
            title="创建时间"
            dataIndex="createdAt"
            cell={(value, index, record) =>
              moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss')
            }
          />
          <Table.Column title="goodsName" dataIndex="goodsName" />
          <Table.Column title="status" dataIndex="status" />
          <Table.Column
            title="startTime"
            dataIndex="startTime"
            cell={(value, index, record) =>
              moment(record.startTime).format('YYYY-MM-DD')
            }
          />
          <Table.Column
            title="endTime"
            dataIndex="endTime"
            cell={(value, index, record) =>
              moment(record.endTime).format('YYYY-MM-DD')
            }
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
