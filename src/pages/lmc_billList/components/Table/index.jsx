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
import { admin_billList, admin_checkBill } from '@/utils/graphql/bill';
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

    const res = await graphqlClient(admin_billList, {
      skip: (currentPage - 1) * 10,
      limit: 10
    });
    setData(res['admin_billList'].list);
    setLoading(false);
  }

  async function handlePaginationChange(currentPage) {
    await setCurrent(currentPage);
    fetchData(currentPage);
  }

  function handleFilterChange() {
    // fetchData();
  }

  function handleDetail(record) {}
  async function handleBillStatusCheck(record) {
    Dialog.confirm({
      title: '提示',
      content: '确认通过吗',
      onOk: async () => {
        const res = await graphqlClient(admin_checkBill, { _id: record._id });
        console.log(res['admin_checkBill']);

        fetchData(current);
      }
    });
  }

  function renderOper(value, index, record) {
    return record.amount && record.status == 'DEFAULT' ? (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={() => handleBillStatusCheck(record)}
        >
          通过
        </Button>
      </div>
    ) : (
      <div></div>
    );
  }
  function renderInfo(v, i, r) {
    return r.type == 'DEFAULT'
      ? r.fromUser + ',' + r.fromBank + ',' + r.fromCard
      : '';
  }

  return (
    <div className={styles.container}>
      <IceContainer>
        <FilterTag onChange={handleFilterChange} />
        <FilterForm onChange={handleFilterChange} />
      </IceContainer>
      <IceContainer>
        <Table loading={isLoading} dataSource={data} hasBorder={false}>
          <Table.Column title="用户" dataIndex="userid" />
          <Table.Column
            title="创建时间"
            dataIndex="createdAt"
            cell={(value, index, record) =>
              moment(record.createdAt).format('YYYY-MM-DD')
            }
          />
          <Table.Column
            title="总金额"
            dataIndex="total"
            cell={(v, i, record) => `${record.amount / 100} 元`}
          />
          <Table.Column
            title="余额"
            dataIndex="remained"
            cell={(v, i, record) => `${record.amount / 100} 元`}
          />
          <Table.Column
            title="冻结"
            dataIndex="freeze"
            cell={(v, i, record) => `${record.amount / 100} 元`}
          />
          <Table.Column
            title="已提现"
            dataIndex="withdraw"
            cell={(v, i, record) => `${record.amount / 100} 元`}
          />
          <Table.Column title="操作" dataIndex="type" />
          <Table.Column
            title="金额"
            dataIndex="amount"
            cell={(v, i, record) => `${record.amount / 100} 元`}
          />
          <Table.Column title="充值信息" cell={renderInfo} />

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
