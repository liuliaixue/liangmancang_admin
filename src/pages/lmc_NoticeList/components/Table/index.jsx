import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import IceContainer from '@icedesign/container';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import styles from './index.module.scss';
import graphqlClient from '@/utils/graphqlClient';
import { noticeList, admin_removeNotice } from '@/utils/graphql/notice';
import moment from 'moment';

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function GoodsTable(props) {
  const [current, setCurrent] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let limit = 10;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(currentPage = 1) {
    await setLoading(true);

    const res = await graphqlClient(noticeList, {
      skip: (currentPage - 1) * limit,
      limit
    });
    setData(res['noticeList'].list);
    setLoading(false);
  }

  async function handlePaginationChange(currentPage) {
    await setCurrent(currentPage);
    fetchData(currentPage);
  }

  function handleFilterChange() {
    fetchData();
  }

  async function handleDelete(record) {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: async () => {
        const res = await graphqlClient(admin_removeNotice, {
          _id: record._id
        });

        fetchData(current);
      }
    });
  }

  function handleDetail(record) {
    // Dialog.confirm({
    //   title: '提示',
    //   content: '暂不支持查看详情'
    // });
    props.history.push(`/notice/editor?_id=${record._id}`);
  }
  function handleNew() {
    props.history.push('/notice/editor/new');
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
        <Button type="normal" warning onClick={() => handleDelete(record)}>
          <FormattedMessage id="app.btn.delete" />
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <IceContainer>
        <Button type="primary" style={{ float: 'right' }} onClick={handleNew}>
          新建公告
        </Button>
      </IceContainer>

      {/* <IceContainer>
        <FilterTag onChange={handleFilterChange} />
        <FilterForm onChange={handleFilterChange} />
      </IceContainer> */}
      <IceContainer>
        <Table loading={isLoading} dataSource={data} hasBorder={false}>
          <Table.Column title="标题" dataIndex="title" />
          <Table.Column
            title="更新时间"
            dataIndex="updatedAt"
            cell={value => moment(value).format('YYYY-MM-DD HH:mm:ss')}
          />
          <Table.Column
            title="内容"
            dataIndex="content"
            cell={value => value.slice(0, 60)}
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
