import { Input, Form, Grid, Select, Message } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import UploadImages from '../../../components/UploadImages';
import Save from '../../../components/Save';
import { queryIntroduction, addIntroduction, updateIntroduction } from '../../../api/site/right';
import { getList } from '../../../api/tags';
import { showPositions } from '../../../utils/constants';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;

const PersonProfile = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();
  const [tagsArr, setTagsArr] = useState([]);

  const loadData = async (isRefresh?: boolean) => {
    const res = await queryIntroduction();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    form.setFieldsValue(data);
    setTime(data?.updateTime);
  };
  const onRefresh = () => {
    loadData(true);
  };
  const onSave = async () => {
    await form.validate();
    const values = form.getFields();
    // console.log(values);
    const postData = values;
    postData.friendLink = postData.friendLink.map((item) => {
      return {
        icon: item.icon,
        link: item.link,
      };
    });
    // console.log('postData', postData);
    const func = values._id ? updateIntroduction : addIntroduction;
    const res: any = await func(postData);
    if (res.data) {
      Message.success(res.msg);
      loadData();
    } else {
      Message.error('保存失败，请重试');
    }
  };
  const getTags = async () => {
    const res: any = await getList({
      page: 1,
      pageSize: 9999,
    });
    setTagsArr(res.data.list?.map((item) => item.name) || []);
  };

  useEffect(() => {
    loadData();
    getTags();
  }, []);

  return (
    <>
      <Form form={form}>
        <Row>
          <Col span={10}>
            <FormItem
              label="昵称"
              field="nickName"
              rules={[
                { required: true, message: '请输入昵称' },
                {
                  minLength: 2,
                  message: '至少2个字符',
                },
                {
                  maxLength: 20,
                  message: '最多20个字符',
                },
              ]}
            >
              <Input placeholder="请输入昵称" />
            </FormItem>

            <FormItem label="简介" field="desc" rules={[{ required: true, message: '请输入简介' }]}>
              <Input placeholder="请输入简介" />
            </FormItem>

            <FormItem label="标签" field="tags" rules={[{ required: true, message: '请选择标签' }]}>
              <Select mode="multiple" placeholder="请选择标签">
                {tagsArr.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>

            <FormItem
              label="展示位置"
              field="showPosition"
              rules={[{ required: true, message: '请选择展示位置' }]}
            >
              <Select mode="multiple" placeholder="请选择展示位置">
                {showPositions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>

          <Col span={10} offset={4}>
            <Form.Item
              label="友链(1-4个)"
              layout="vertical"
              field="friendLink"
              rules={[{ required: true, message: '请添加友情链接' }]}
            >
              <UploadImages max={4} showImg={false} showIcon />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default PersonProfile;
