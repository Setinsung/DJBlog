import React, { useEffect } from 'react';
import { Breadcrumb, Card, Form, Grid, Button, Message } from '@arco-design/web-react';
import styles from './style/index.module.less';
import BlogTags from './blog-tags';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;
/* const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}; */
const About = () => {
  const [form] = Form.useForm();
  // 设置初始值
  useEffect(() => {
    form.setFieldsValue({
      tags: [
        { id: 1, name: 'vue' },
        { id: 2, name: 'react' },
      ],
    });
  }, []);

  const submit = async () => {
    // await form.validate();
    try {
      await form.validate();
    } catch (e) {
      if (e) {
        Message.error('标签为空');
        return;
      }
    }
    const values = form.getFields();
    console.log(values);
  };
  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>关于管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card hoverable>
        <Form form={form} layout="vertical">
          <Row>
            <Col span={12}>
              <FormItem
                label="标签云:(1-20个)"
                field="tags"
                rules={[{ required: true, message: '请添加标签' }]}
              >
                <BlogTags max={20} />
              </FormItem>
            </Col>
            <Col span={12}>
              <Button onClick={submit}>获取标签</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default About;
