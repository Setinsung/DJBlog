import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Form, Grid, Input, Link, Switch, Message } from '@arco-design/web-react';
import styles from './style/index.module.less';
import BlogTags from './blog-tags';
import Save from '../../components/Save';
import UploadImages from '../../components/UploadImages';
import { queryAbout, addAbout, updateAbout } from '../../api/about';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;
const { TextArea } = Input;

const About = () => {
  const [form] = Form.useForm();
  const [RemainLength, setRemainLength] = React.useState(800);
  const [showTip, setShowTip] = useState(false);
  const [time, setTime] = useState();

  const updateDesc = (value) => {
    setRemainLength(800 - value.length);
  };

  const loadData = async (isRefresh) => {
    const res = await queryAbout();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    if (!data) return;
    data.tags = data.tags?.map((item, index) => {
      return {
        id: index,
        name: item,
      };
    });
    form.setFieldsValue(data);
    updateDesc(data.desc);
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
    values.imgs = values.imgs?.map((item) => {
      return {
        imgUrl: item.imgUrl,
        link: item.link,
      };
    });
    values.tags = values.tags?.map((item) => {
      return item.name;
    });
    const func = values._id ? updateAbout : addAbout;
    const res = await func(values);
    if (res.data) {
      Message.success(res.msg);
      loadData();
    } else {
      Message.error('保存失败，请重试');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>关于管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card hoverable>
          <Form form={form} layout="vertical">
            <Row>
              <Col span={10}>
                <FormItem
                  label="标签云:(1-20个)"
                  field="tags"
                  rules={[{ required: true, message: '请添加标签' }]}
                >
                  <BlogTags max={20} />
                </FormItem>

                <FormItem
                  label="详细介绍"
                  field="desc"
                  rules={[
                    { required: true, message: '请输入详细介绍' },
                    { maxLength: 800, message: '最多输入800个字符' },
                  ]}
                >
                  <TextArea
                    onFocus={() => setShowTip(true)}
                    onBlur={() => setShowTip(false)}
                    rows={5}
                    onChange={updateDesc}
                  />
                </FormItem>
                {showTip && (
                  <div className={styles['desc-tip']}>
                    还可以输入
                    <Link status="error">{RemainLength}</Link>
                    个字符
                  </div>
                )}

                <FormItem label="个人简历" field="showResume" triggerPropName="checked">
                  <Switch />
                </FormItem>
              </Col>
              <Col span={12} offset={2}>
                <FormItem
                  label="介绍图片:(1-3张)"
                  field="imgs"
                  rules={[{ required: true, message: '请添加介绍图片' }]}
                >
                  <UploadImages max={3} />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default About;
