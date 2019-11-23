import React from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import { storeStatusMap } from '@/pages/lmc_StoreList/components/Table';
import moment from 'moment';

const { Row, Col } = Grid;

export default injectIntl(props => {
  console.log(props.data);

  const {
    intl: { formatMessage }
  } = props;
  const dataSource = props.data;
  // 渲染详情信息的数据
  // const dataSource = {
  //   title: formatMessage({ id: 'app.profile.basic.task.value' }),
  //   shopName: formatMessage({ id: 'app.profile.basic.shop.value' }),
  //   amount: formatMessage({ id: 'app.profile.basic.amount.value' }),
  //   bounty: formatMessage({ id: 'app.profile.basic.reward.value' }),
  //   orderTime: formatMessage({ id: 'app.profile.basic.ordertime.value' }),
  //   deliveryTime: formatMessage({
  //     id: 'app.profile.basic.deliverytime.value'
  //   }),
  //   phone: formatMessage({ id: 'app.profile.basic.contact.value' }),
  //   address: formatMessage({ id: 'app.profile.basic.address.value' }),
  //   status: formatMessage({ id: 'app.profile.basic.status.value' }),
  //   remark: formatMessage({ id: 'app.profile.basic.note.value' }),
  //   pics: [
  //     require('./images/img4.jpg'),
  //     require('./images/img3.jpg'),
  //     require('./images/img2.jpg'),
  //     require('./images/img1.jpg')
  //   ]
  // };

  return (
    <IceContainer>
      <h2 className={styles.basicDetailTitle}>基础详情页</h2>

      <div className={styles.infoColumn}>
        <h5 className={styles.infoColumnTitle}>
          <FormattedMessage id="app.profile.basic.sub.title1" />
        </h5>
        <Row wrap className={styles.infoItems}>
          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>店铺名称 : </span>
            <span className={styles.infoItemValue}>{dataSource.name}</span>
          </Col>
          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>用户id：</span>
            <span className={styles.infoItemValue}> {dataSource.userid}</span>
          </Col>
          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>类型：</span>
            <span className={styles.infoItemValue}> {dataSource.type}</span>
          </Col>
          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>店铺网址：</span>
            <span className={styles.infoItemValue}>{dataSource.website}</span>
          </Col>
          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>旺旺号：</span>
            <span className={styles.infoItemValue}>{dataSource.wangwang}</span>
          </Col>
          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>状态 : </span>
            <span className={styles.infoItemValue}>
              {storeStatusMap[dataSource.status]}
            </span>
          </Col>

          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>创建时间 : </span>
            <span className={styles.infoItemValue}>
              {moment(dataSource.createdAt).format('YYYY-MM-DD hh:mm:ss')}
            </span>
          </Col>

          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>更新时间 : </span>
            <span className={styles.infoItemValue}>
              {moment(dataSource.updatedAt).format('YYYY-MM-DD hh:mm:ss')}
            </span>
          </Col>
        </Row>
      </div>
      <div className={styles.infoColumn}>
        <h5 className={styles.infoColumnTitle}>
          <FormattedMessage id="app.profile.basic.sub.title2" />
        </h5>
        <Row wrap className={styles.infoItems}>
          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>联系方式：</span>
            <span className={styles.infoItemValue}>
              {dataSource.contactPhone}
            </span>
          </Col>
          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>店铺地址 ：</span>
            <span className={styles.infoItemValue}>{dataSource.address}</span>
          </Col>

          <Col xxs="24" l="12" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>店铺截图：</span>
            {/* <span className={styles.infoItemValue}>{dataSource.remark}</span>
             */}
            <img
              style={styles.itemLogo}
              src={dataSource.storeScreenShotImage}
              alt="店铺截图"
            />
          </Col>
        </Row>
      </div>
    </IceContainer>
  );
});
