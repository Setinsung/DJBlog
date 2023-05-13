import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Card,
  Form,
  Grid,
  Input,
  Switch,
  Message,
  Radio,
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import Save from '../../../components/Save';
import UploadImages from '../../../components/UploadImages';
import { queryHeaderFooter, addHeaderFooter, updateHeaderFooter } from '../../../api/site/hf';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;
const RadioGroup = Radio.Group;

const HeaderFooter = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();
  const [type, setType] = useState(0);

  const loadData = async (isRefresh) => {
    const res = await queryHeaderFooter();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    if (!data) {
      form.setFieldsValue({
        header: {
          openSearch: false,
          login: false,
          register: false,
        },
      });
      return;
    }
    if (data.header.logo) {
      setType(1);
      form.setFieldsValue({
        type: 1,
        ...data,
        logo: [
          {
            imgUrl: data.header.logo,
          },
        ],
      });
    } else {
      // console.log('---+++++', data);
      setType(2);
      form.setFieldsValue({ ...data, type: 2 });
    }
    setTime(data.updateTime);
  };
  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    loadData(true);
  };
  const onSave = async () => {
    await form.validate();
    const values = form.getFields();
    // console.log(values);
    const postData = values;
    if (type === 1) {
      postData.header.logo = postData.header.logo[0].imgUrl;
    }

    // console.log('postData', postData);
    const func = values._id ? updateHeaderFooter : addHeaderFooter;
    const res = await func(postData);
    if (res.data) {
      Message.success(res.msg);
      loadData();
    } else {
      Message.error('保存失败，请重试');
    }
  };

  const onRadioChange = (value) => {
    setType(value);
  };

  return (
    <>
      <div className={styles.container}>
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>页头页脚配置</Breadcrumb.Item>
        </Breadcrumb>
        <Form form={form}>
          <Card hoverable title="页头配置">
            <Row>
              <Col span={12}>
                <FormItem
                  label="是否开启搜索"
                  field="header.openSearch"
                  triggerPropName="checked"
                  rules={[{ required: true, message: '请选择是否开启搜索' }]}
                >
                  <Switch checkedText="开启" uncheckedText="关闭" />
                </FormItem>
                <FormItem
                  label="是否开启登录"
                  field="header.login"
                  triggerPropName="checked"
                  rules={[{ required: true, message: '请选择是否开启登录' }]}
                >
                  <Switch checkedText="开启" uncheckedText="关闭" />
                </FormItem>
                <FormItem
                  label="是否开启注册"
                  field="header.register"
                  triggerPropName="checked"
                  rules={[{ required: true, message: '请选择是否开启注册' }]}
                >
                  <Switch checkedText="开启" uncheckedText="关闭" />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="Logo"
                  field="type"
                  rules={[{ required: true, message: '请添加Logo图片' }]}
                >
                  <RadioGroup onChange={onRadioChange}>
                    <Radio value={1}>图片</Radio>
                    <Radio value={2}>文本</Radio>
                  </RadioGroup>
                </FormItem>
                {type === 1 && (
                  <FormItem
                    label="选择图片"
                    field="header.logo"
                    rules={[{ required: true, message: '请添加Logo图片' }]}
                  >
                    <UploadImages showLink={false} showAction={false} />
                  </FormItem>
                )}
                {type === 2 && (
                  <FormItem
                    label="文本"
                    field="header.title"
                    rules={[
                      { required: true, message: '请输入简介' },
                      { maxLength: 20, message: '最多输入20个字符' },
                    ]}
                  >
                    <Input placeholder="请输入文本" />
                  </FormItem>
                )}
              </Col>
            </Row>
          </Card>
          <Card style={{ marginTop: 20 }} hoverable title="页脚配置">
            <FormItem
              labelCol={{ span: 2 }}
              label="CopyRight"
              field="footer.copyright"
              rules={[{ required: true, message: '请输入copyright' }]}
            >
              <Input placeholder="请输入文本" />
            </FormItem>
            <FormItem labelCol={{ span: 2 }} label="额外信息" field="footer.extra">
              <Input placeholder="请输入额外信息" />
            </FormItem>
          </Card>
        </Form>
      </div>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default HeaderFooter;
