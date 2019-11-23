import React from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import moment from 'moment';

const { Row, Col } = Grid;

export default injectIntl(props => {
  const dataSource = props.dataSource;

  return (
    <IceContainer>
      <h2 className={styles.basicDetailTitle}>
        <FormattedMessage id="app.profile.basic.title" />
      </h2>

      <div className={styles.infoColumn}>
        <h5 className={styles.infoColumnTitle}>
          <FormattedMessage id="app.profile.basic.sub.title1" />
        </h5>
        <Row wrap className={styles.infoItems}>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>开始时间：</span>
            <span className={styles.infoItemValue}>
              {moment(dataSource.startTime).format('YYYY-MM-DD')}
            </span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>结束时间：</span>
            <span className={styles.infoItemValue}>
              {moment(dataSource.endTime).format('YYYY-MM-DD')}
            </span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>放出单数：</span>
            <span className={styles.infoItemValue}>
              {dataSource.orderQuantity}
            </span>
          </Col>

          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>平台：</span>
            <span className={styles.infoItemValue}>{dataSource.platform}</span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>类型：</span>
            <span className={styles.infoItemValue}>{dataSource.type}</span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>商品名：</span>
            <span className={styles.infoItemValue}>{dataSource.goodsName}</span>
          </Col>

          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>价格：</span>
            <span className={styles.infoItemValue}>
              ¥ {dataSource.goodsPrice / 100}
            </span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>展示价格：</span>
            <span className={styles.infoItemValue}>
              ¥ {dataSource.goodsPriceShowed / 100}
            </span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>规格: </span>
            <span className={styles.infoItemValue}>
              {dataSource.goodsSpecification}
            </span>
          </Col>

          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>是否包邮: </span>
            <span className={styles.infoItemValue}>
              {dataSource.isFreeShipping ? ' 包邮' : ' 不包邮'}
            </span>
          </Col>

          <Col xxs="24" l="24" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>商品链接：</span>
            <span className={styles.infoItemValue}>{dataSource.goodsLink}</span>
          </Col>
          <Col xxs="24" l="24" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>商品图片：</span>
            <span className={styles.infoItemValue}>
              {dataSource.goodsImage}
            </span>
          </Col>
        </Row>
      </div>
      <div className={styles.infoColumn}>
        <h5 className={styles.infoColumnTitle}>筛选商品</h5>
        <Row wrap className={styles.infoItems}>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>排序：</span>
            <span className={styles.infoItemValue}>
              {dataSource.search_sort}
            </span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>收货数量：</span>
            <span className={styles.infoItemValue}>
              {dataSource.search_ReceiverNum}
            </span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>价格区间：</span>
            <span className={styles.infoItemValue}>
              {dataSource.search_price_from / 100} -{' '}
              {dataSource.search_price_to / 100}
            </span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>发货地：</span>
            <span className={styles.infoItemValue}>
              {dataSource.search_where}
            </span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>关键字：</span>
            <span className={styles.infoItemValue}>
              {dataSource.search_keyword}
            </span>
          </Col>
        </Row>
      </div>

      <div className={styles.infoColumn}>
        <h5 className={styles.infoColumnTitle}>增值服务</h5>
        <Row wrap className={styles.infoItems}>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>加赏佣金：</span>
            <span className={styles.infoItemValue}>
              ¥ {dataSource.extraCommission / 100}
            </span>
          </Col>
          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>附加要求：</span>
            <span className={styles.infoItemValue}>
              {dataSource.extraImages}
            </span>
          </Col>

          <Col xxs="24" l="8" className={styles.infoItem}>
            <span className={styles.infoItemLabel}>备注说明：</span>
            <span className={styles.infoItemValue}>{dataSource.intro}</span>
          </Col>
        </Row>
      </div>
    </IceContainer>
  );
});
