import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Form, Grid, Input, Link, Switch, Message } from '@arco-design/web-react';
import styles from './style/index.module.less';
import Save from '../../../components/Save';
import UploadImages from '../../../components/UploadImages';
import { queryHome, addHome, updateHome } from '../../../api/site/home';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;
const { TextArea } = Input;

const Home = () => {
  const [form] = Form.useForm();
  const [RemainLength, setRemainLength] = React.useState(800);
  const [showTip, setShowTip] = useState(false);
  const [time, setTime] = useState();

  const updateDesc = (value) => {
    setRemainLength(800 - value.length);
  };

  const loadData = async (isRefresh) => {
    const res = await queryHome();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    if (!data) return;
    form.setFieldsValue({
      ...data,
      archiveBgImg: [
        {
          imgUrl: data.archiveBgImg,
        },
      ],
      categoriesBgImg: [
        {
          imgUrl: data.categoriesBgImg,
        },
      ],
      categoriesDetailBgImg: [
        {
          imgUrl: data.categoriesDetailBgImg,
        },
      ],
      tagsBgImg: [
        {
          imgUrl: data.tagsBgImg,
        },
      ],
      tagsDetailBgImg: [
        {
          imgUrl: data.tagsDetailBgImg,
        },
      ],
      aboutBgImg: [
        {
          imgUrl: data.aboutBgImg,
        },
      ],
    });
    updateDesc(data.introduction);
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
    const postData = {
      ...values,
      archiveBgImg: values.archiveBgImg[0].imgUrl,
      categoriesBgImg: values.categoriesBgImg[0].imgUrl,
      categoriesDetailBgImg: values.categoriesDetailBgImg[0].imgUrl,
      tagsBgImg: values.tagsBgImg[0].imgUrl,
      tagsDetailBgImg: values.tagsDetailBgImg[0].imgUrl,
      aboutBgImg: values.aboutBgImg[0].imgUrl,
    };
    // console.log('postData', postData);
    const func = values._id ? updateHome : addHome;
    const res = await func(postData);
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
          <Breadcrumb.Item>首页配置</Breadcrumb.Item>
        </Breadcrumb>
        <Card hoverable>
          <Form form={form} layout="vertical">
            <Row>
              <Col span={4}>
                <FormItem
                  label="归档背景图片"
                  field="archiveBgImg"
                  rules={[{ required: true, message: '请添加归档背景图片' }]}
                >
                  <UploadImages showLink={false} showAction={false} />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem
                  label="分类背景图片"
                  field="categoriesBgImg"
                  rules={[{ required: true, message: '请添加分类背景图片' }]}
                >
                  <UploadImages showLink={false} showAction={false} />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem
                  label="分类详情背景图片"
                  field="categoriesDetailBgImg"
                  rules={[{ required: true, message: '请添加分类详情背景图片' }]}
                >
                  <UploadImages showLink={false} showAction={false} />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem
                  label="标签背景图片"
                  field="tagsBgImg"
                  rules={[{ required: true, message: '请添加标签背景图片' }]}
                >
                  <UploadImages showLink={false} showAction={false} />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem
                  label="标签详情背景图片"
                  field="tagsDetailBgImg"
                  rules={[{ required: true, message: '请添加标签详情背景图片' }]}
                >
                  <UploadImages showLink={false} showAction={false} />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem
                  label="关于背景图片"
                  field="aboutBgImg"
                  rules={[{ required: true, message: '请添加关于背景图片' }]}
                >
                  <UploadImages showLink={false} showAction={false} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  label="简介"
                  field="introduction"
                  rules={[
                    { required: true, message: '请输入简介' },
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
              </Col>
            </Row>

            <FormItem
              label="简介特效"
              field="effects"
              defaultValue={false}
              triggerPropName="checked"
            >
              <Switch checkedText="开启" uncheckedText="关闭" />
            </FormItem>
          </Form>
        </Card>
      </div>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default Home;
