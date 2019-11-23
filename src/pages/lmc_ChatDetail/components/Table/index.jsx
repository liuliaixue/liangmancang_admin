import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import IceContainer from '@icedesign/container';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import styles from './index.module.scss';
import moment from 'moment';

export default function GoodsTable(props) {
  function renderImage(src) {
    return <img src={src} />;
  }
  return (
    <div className={styles.container}>
      <IceContainer>
        <Table dataSource={props.data} hasBorder={true}>
          <Table.Column title="user" dataIndex="userid" />
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
