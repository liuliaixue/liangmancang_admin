import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import IceContainer from '@icedesign/container';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import styles from './index.module.scss';
import moment from 'moment';
import { getUser } from '@/utils/user';

export default function GoodsTable(props) {
  function renderImage(src) {
    return src && <img src={src} />;
  }
  function renderUser(v, i, record) {
    const currentUser = getUser();
    return currentUser._id === record.userid ? '我' : record.userid;
  }
  return (
    <div className={styles.container}>
      <IceContainer>
        <Table dataSource={props.data} hasBorder={true}>
          <Table.Column title="user" dataIndex="userid" cell={renderUser} />
          <Table.Column title="phone" dataIndex="phone" />
          <Table.Column title="content" dataIndex="content" />
          <Table.Column
            title="createdAt"
            dataIndex="createdAt"
            cell={v => moment(v).format('YYYY-MM-DD hh:mm:ss')}
          />

          <Table.Column
            title="image"
            dataIndex="image"
            cell={v => renderImage(v)}
          />
        </Table>
      </IceContainer>
    </div>
  );
}
