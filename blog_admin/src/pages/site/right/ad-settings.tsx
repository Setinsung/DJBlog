import { Form, Grid, Select, Message } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import UploadImages from '../../../components/UploadImages';
import Save from '../../../components/Save';
import { queryAd, addAd, updateAd } from '../../../api/site/right';
import { showPositions } from '../../../utils/constants';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;

const AdSettings = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();

  const loadData = async (isRefresh?: boolean) => {
    const res = await queryAd();
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
    postData.imgs = postData.imgs.map((item) => {
      return {
        imgUrl: item.imgUrl,
        link: item.link,
      };
    });
    // console.log('postData', postData);
    const func = values._id ? updateAd : addAd;
    const res: any = await func(postData);
    if (res.data) {
      Message.success(res.msg);
      loadData();
    } else {
      Message.error('保存失败，请重试');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Form form={form}>
        <Row>
          <Col span={10}>
            <Form.Item
              label="广告图片(1-3张)"
              layout="vertical"
              field="imgs"
              rules={[{ required: true, message: '请添加广告图片' }]}
            >
              <UploadImages max={3} />
            </Form.Item>
          </Col>
          <Col span={10} offset={4}>
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
        </Row>
      </Form>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
    </>
  );
};

export default AdSettings;
