import React, { useEffect, useRef, useState } from 'react';
import {
  Breadcrumb,
  Card,
  Form,
  Grid,
  Input,
  Switch,
  Message,
  Select,
  InputNumber,
} from '@arco-design/web-react';
import Editor from 'for-editor';
import styles from './style/index.module.less';
import Save from '../../components/Save';
import UploadImages from '../../components/UploadImages/index.';
import { queryAbout, addAbout, updateAbout } from '../../api/about';
import { getList as getCategoriesList } from '../../api/categories';
import { getList as getTagsList } from '../../api/tags';
import { upload } from '../../api/common';

const Row = Grid.Row;
const Col = Grid.Col;
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
};
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const formItemLayout2 = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const Edit = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [tagsArr, setTagsArr] = useState([]);

  const editorRef = useRef(null);

  const loadData = async (isRefresh?: boolean) => {
    const res: any = await queryAbout();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    if (!data) return;
    form.setFieldsValue(data);
    setTime(data.updateTime);
  };
  const getTags = async () => {
    const res: any = await getTagsList({
      page: 1,
      pageSize: 9999,
    });
    const list = res.list?.map((item) => {
      item.key = item._id;
      item.value = item.name;
      return item;
    });
    setTagsArr(list);
  };
  const getCategories = async () => {
    const res: any = await getCategoriesList({
      page: 1,
      pageSize: 9999,
    });
    const list = res.list?.map((item) => {
      item.key = item._id;
      item.value = item.name;
      return item;
    });
    setCategoriesArr(list);
  };
  useEffect(() => {
    // loadData();
    getTags();
    getCategories();
  }, []);

  const onRefresh = () => {
    loadData(true);
  };
  const onSave = async () => {
    await form.validate();
    const values = form.getFields();
    values.imgs = values.imgs?.map((item) => {
      return {
        _id: item._id,
        imgUrl: item.imgUrl,
        link: item.link,
      };
    });
    // console.log(values);
    const func = values.id ? updateAbout : addAbout;
    const res: any = await func(values);
    if (res.data) {
      Message.success(res.msg);
      loadData();
    } else {
      Message.error('保存失败，请重试');
    }
  };

  const addImg = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    // const res = await upload(formData);
    const res = [
      {
        hash: 'FgOETQ8j4Zpygl6WWpZQ_75N20Sf',
        key: '3a4e66a577cde9b8e8c5550dc51aaaba.png',
        url: 'http://img.nevergiveupt.top/3a4e66a577cde9b8e8c5550dc51aaaba.png',
      },
    ];
    if (res) {
      editorRef.current.$img2Url(file.name, res[0].url);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>编辑文章</Breadcrumb.Item>
        </Breadcrumb>
        <Card hoverable>
          <Form
            {...layout}
            form={form}
            initialValues={{
              isCollect: false,
              isReward: false,
              isComment: true,
              isLike: true,
              views: 1,
              like: 1,
              collect: 0,
            }}
          >
            <Form.Item
              label="文章标题"
              field="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" />
            </Form.Item>
            <Form.Item
              label="文章简介"
              field="introduction"
              rules={[
                { required: true, message: '请输入文章简介' },
                {
                  minLength: 10,
                  message: '至少10个字符',
                },
                {
                  maxLength: 500,
                  message: '不能超过500个字符',
                },
              ]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="文章封面"
                  field="cover"
                  rules={[{ required: true, message: '请添加文章封面' }]}
                  {...formItemLayout}
                >
                  <UploadImages showAction={false} showLink={false} />
                </Form.Item>

                <Form.Item
                  field="categories"
                  label="选择分类"
                  {...formItemLayout}
                  rules={[{ required: true, message: '请给文章选个分类' }]}
                >
                  <Select placeholder="请给文章选择分类">
                    {categoriesArr.map((item) => (
                      <Select.Option key={item.key} value={item.key}>
                        {item.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  field="tags"
                  label="选择标签"
                  {...formItemLayout}
                  rules={[{ required: true, message: '请给文章选择标签' }]}
                >
                  <Select mode="multiple" placeholder="请给文章选择标签">
                    {tagsArr.map((item) => (
                      <Select.Option key={item._id} value={item.value}>
                        {item.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Row>
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout2}
                      label="评论"
                      field="isComment"
                      triggerPropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="点赞"
                      field="isLike"
                      triggerPropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="收藏"
                      field="isCollect"
                      triggerPropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="打赏"
                      field="isReward"
                      triggerPropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item {...formItemLayout2} label="查看数量" field="views">
                      <InputNumber />
                    </Form.Item>
                    <Form.Item {...formItemLayout2} label="点赞数量" field="like">
                      <InputNumber />
                    </Form.Item>
                    <Form.Item {...formItemLayout2} label="收藏数量" field="collect">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Form.Item
              wrapperCol={{ span: 24 }}
              field="content"
              rules={[{ required: true, message: '请撰写文章' }]}
            >
              <Editor
                ref={(el) => (editorRef.current = el)}
                addImg={(file) => addImg(file)}
                placeholder="请撰写文章"
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default Edit;
