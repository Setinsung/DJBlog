import React from 'react';
import { Breadcrumb, Card, Tabs } from '@arco-design/web-react';
import styles from './style/index.module.less';
import PersonProfile from './person-profile';
import AdSettings from './ad-settings';
import RecSettings from './rec-settings';

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
              <AdSettings />
            </TabPane>
            <TabPane key="2" title="推荐设置">
              <RecSettings />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default HeaderFooter;
