import React from 'react';
import { Breadcrumb, Card, Tabs } from '@arco-design/web-react';
import styles from './style/index.module.less';
import PersonProfile from './person-profile';

const TabPane = Tabs.TabPane;

const HeaderFooter = () => {
  return (
    <>
      <div className={styles.container}>
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>侧栏配置</Breadcrumb.Item>
        </Breadcrumb>
        <Card hoverable>
          <Tabs defaultActiveTab="0">
            <TabPane key="0" title="个人简介">
              <PersonProfile />
            </TabPane>
            <TabPane key="1" title="广告设置">
              <div>1</div>
            </TabPane>
            <TabPane key="2" title="推荐设置">
              <div>1</div>
            </TabPane>
          </Tabs>
        </Card>
        {/* <Card style={{ marginTop: 20 }} hoverable title="页脚配置">
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
          </Card> */}
      </div>
    </>
  );
};

export default HeaderFooter;
