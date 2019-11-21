import React from 'react';
import { injectIntl } from 'react-intl';
import Exception from '@/components/Exception';
import 'braft-editor/dist/index.css';
// import React from 'react'
import BraftEditor from 'braft-editor';

import IceContainer from '@icedesign/container';
import { Input, Radio, Switch, Upload, Grid, Form, Message } from '@alifd/next';
import graphqlClient from '@/utils/graphqlClient';
import {
  admin_newNotice,
  notice,
  admin_updateNotice
} from '@/utils/graphql/notice';
import { uploadFileToken } from '@/utils/graphql/uploadFile';
import * as qiniu from 'qiniu-js';

const FormItem = Form.Item;
const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const formItemLayout = {
  labelCol: { xxs: 6, s: 3, l: 3 },
  wrapperCol: {}
};

const formatMessage = i => i.id;

export default class PageDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
    _id: '',
    title: '',
    type: '',
    content: ''
  };

  async componentDidMount() {
    // // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent();
    // // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    // this.setState({
    //   editorState: BraftEditor.createEditorState(htmlContent)
    // });

    // if (this.props.location.search.startWith('?_id=')) {
    //   const _id = this.props.location.search.slice(0, -4);
    //   console.log(_id);
    // }
    if (this.props.location.pathname === '/notice/editor/new') {
      this.setState({ _id: '' });
    } else if (this.props.location.search.startsWith('?_id=')) {
      const _id = this.props.location.search.slice(5);

      const res = await graphqlClient(notice, { _id });
      console.log({
        _id,
        type: res['notice'].type,
        title: res['notice'].title,
        content: res['notice'].content
      });
      this.setState({
        _id,
        type: res['notice'].type,
        title: res['notice'].title,
        editorState: BraftEditor.createEditorState(res['notice'].content)
      });
    }
  }
  async uploadFn(param) {
    const serverURL = 'http://upload-server';
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    console.log({ param });

    const filename = param.file.name;
    const res = await graphqlClient(uploadFileToken, { filename });
    console.log(res['uploadFileToken']);
    const { key, uploadToken } = res['uploadFileToken'];
    const observable = qiniu.upload(param.file, key, uploadToken, {}, {});
    const observer = {
      next(event) {
        // ...
        console.log('@next', event);
        param.progress((event.loaded / event.total) * 100);
      },
      error(err) {
        // ...
        console.log('@error', err);
        param.error({
          msg: 'unable to upload.'
        });
      },
      complete(res) {
        // ...
        console.log('@complete', res);
        param.success({
          url: res.url
        });
      }
    };
    const subscription = observable.subscribe(observer); // 上传开始

    return;
  }

  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <Form>
            <FormItem
              label={formatMessage({ id: '标题' })}
              {...formItemLayout}
              required
              requiredMessage={formatMessage({
                id: 'app.setting.website.message'
              })}
              format="url"
            >
              <Input
                size="large"
                placeholder="请输入标题"
                value={this.state.title}
                onChange={this.handleChangeTitle}
              />
            </FormItem>
            <FormItem
              label={formatMessage({ id: '公告' })}
              {...formItemLayout}
              required
              requiredMessage={formatMessage({
                id: 'app.setting.gender.message'
              })}
            >
              <RadioGroup
                name="type"
                onChange={this.handleChangeType}
                value={this.state.type || 'DEFAULT'}
              >
                <Radio value="DEFAULT">普通公告</Radio>
                <Radio value="URGENT">紧急公告</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              label={formatMessage({ id: '正文' })}
              {...formItemLayout}
              required
              requiredMessage={formatMessage({
                id: 'app.setting.website.message'
              })}
              format="url"
            >
              <BraftEditor
                className="my-editor"
                value={this.state.editorState}
                onChange={this.handleChange}
                placeholder="请输入正文内容"
                media={{ uploadFn: this.uploadFn }}
              />
            </FormItem>
            <Row style={{ marginTop: 20 }}>
              <Col offset="3">
                <Form.Submit
                  type="primary"
                  style={{ width: 100 }}
                  validate
                  onClick={this.handleSave}
                >
                  <>保存</>
                </Form.Submit>
              </Col>
            </Row>
          </Form>
        </IceContainer>
      </div>
    );
  }

  handleChange = editorState => {
    this.setState({ editorState });
  };
  handleChangeTitle = title => {
    this.setState({ title });
  };
  handleChangeType = type => {
    this.setState({ type: type });
  };
  handleSave = async event => {
    const title = this.state.title;
    const content = this.state.editorState.toHTML();
    const type = this.state.type;

    if (!this.state._id) {
      const saveNotice = await graphqlClient(admin_newNotice, {
        title,
        content,
        type
      });
      Message.success('保存成功');
    } else {
      const saveNotice = await graphqlClient(admin_updateNotice, {
        _id: this.state._id,
        title,
        content,
        type
      });
      Message.success('更改成功');
    }
  };
}

// const Forbidden = ({ intl }) => {
//   return (
//     // <Exception
//     //   statusCode="403"
//     //   image="https://img.alicdn.com/tfs/TB174TvGCzqK1RjSZPcXXbTepXa-260-260.png"
//     //   description={intl.formatMessage({ id: 'app.exception.description.403' })}
//     //   backText={intl.formatMessage({ id: 'app.exception.backtext' })}
//     // />
//     <>test editor</>
//   );
// };

// export default injectIntl(Forbidden);
