import React from 'react';
import IceContainer from '@icedesign/container';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import { Table, Pagination, Button, Dialog } from '@alifd/next';

const orderTypeMap = {
  DEFAULT: '普通任务',
  WORD_COMMENT: '文字好评',
  PICTURE_COMMENT: '图片好评'
};
export default function DetailTable(props) {
  return (
    <div className="detail-table">
      <IceContainer title="订单详情">
        <Table dataSource={props.dataSource} hasBorder={true}>
          <Table.Column title="type" dataIndex="type" />
          <Table.Column title="购买次数" dataIndex="buyTimes" />
          <Table.Column title="浏览次数" dataIndex="browseTimes" />
          <Table.Column title="收藏次数" dataIndex="collectTimes" />
          <Table.Column title="收藏类型" dataIndex="collect" />
          <Table.Column title="文字好评" dataIndex="comment" />
          <Table.Column title="图片好评" dataIndex="pictures" cell={v => ''} />
          <Table.Column title="备注" dataIndex="remark" />
        </Table>
      </IceContainer>
    </div>
  );
}
