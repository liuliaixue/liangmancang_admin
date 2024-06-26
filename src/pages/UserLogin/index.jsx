import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Input, Checkbox, Grid, Form, Message } from '@alifd/next';
import { useRequest } from '@/utils/request';
import { userLogin, adminLogin } from '@/config/dataSource';
import styles from './index.module.scss';
import { setToken, setUser } from '@/utils/user';

const Icon = FoundationSymbol;
const { Row } = Grid;
const FormItem = Form.Item;

function UserLogin(props) {
  const { loading, request } = useRequest(adminLogin);
  const [value, setValue] = useState({
    username: '',
    password: '',
    checkbox: false
  });

  function formChange(formValue) {
    setValue(formValue);
  }

  function handleSubmit(values, errors) {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    handleLogin(values);
  }

  async function handleLogin(params) {
    try {
      const res = await request({
        data: params
      });
      // console.log('*******', res);
      setToken(res.response.data.token);
      setUser(res.response.data.user);
      Message.success('登录成功');
      props.history.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.userLogin}>
      <div className={styles.formContainer}>
        <Form value={value} onChange={formChange}>
          <FormItem required requiredMessage="必填" className={styles.formItem}>
            <Input
              innerBefore={
                <Icon type="person" size="small" className={styles.inputIcon} />
              }
              name="username"
              maxLength={20}
              placeholder="用户名"
            />
          </FormItem>
          <FormItem required requiredMessage="必填" className={styles.formItem}>
            <Input
              innerBefore={
                <Icon type="lock" size="small" className={styles.inputIcon} />
              }
              name="password"
              htmlType="password"
              placeholder="密码"
            />
          </FormItem>
          <FormItem>
            <Checkbox name="checkbox" className={styles.checkbox}>
              记住账号
            </Checkbox>
          </FormItem>
          <Row className={styles.formItem}>
            <Form.Submit
              type="primary"
              validate
              disabled={loading}
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              {loading ? '登录中...' : '登 录'}
            </Form.Submit>
            <p className={styles.account}>
              <span className={styles.tipsText} style={{ marginRight: '20px' }}>
                管理员登录：admin/admin
              </span>
              <span className={styles.tipsText}>用户登录：user/user</span>
            </p>
          </Row>

          {/* <Row className="tips">
            <Link to="/user/register" className={styles.tipsText}>
              立即注册
            </Link>
          </Row> */}
        </Form>
      </div>
    </div>
  );
}

export default UserLogin;
