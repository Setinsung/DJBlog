import React, { useEffect } from 'react';
import { Breadcrumb, Card, Form, Grid, Input, Link, Switch } from '@arco-design/web-react';
import styles from './style/index.module.less';
import BlogTags from './blog-tags';
import Save from '../../components/Save';
import UploadImages from '../../components/UploadImages/index.';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;
const { TextArea } = Input;
const About = () => {
  const [form] = Form.useForm();
  const [RemainLength, setRemainLength] = React.useState(800);
  // 设置初始值
  useEffect(() => {
    form.setFieldsValue({
      tags: [
        { id: 1, name: 'vue' },
        { id: 2, name: 'react' },
        { id: 3, name: 'nodejs' },
        { id: 4, name: 'eggjs' },
      ],
      showResume: false,
      desc: '',
      /* imgs: [
        {
          uid: '1',
          imgUrl: 'http://up.deskcity.org/pic_source/2f/f4/42/2ff442798331f6cc6005098766304e39.jpg',
          link: '',
          icon: '',
        },
      ], */
    });
  }, []);
  const onRefresh = () => {};
  const onSave = async () => {
    // await form.validate();
    /* try {
      await form.validate();
    } catch (e) {
      if (e) {
        Message.error('标签为空');
        return;
      }
    } */
    await form.validate();
    const values = form.getFields();
    console.log(values);
  };

  const updateDesc = (value) => {
    setRemainLength(800 - value.length);
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
                  <TextArea rows={5} onChange={updateDesc} />
                </FormItem>
                <div className={styles['desc-tip']}>
                  还可以输入
                  <Link status="error">{RemainLength}</Link>
                  个字符
                </div>

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
      <Save time="2023-04-25 23:22:21" onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default About;
