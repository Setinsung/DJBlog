import React, { useState } from 'react';
import { Breadcrumb, Card, Tabs } from '@arco-design/web-react';
import styles from './style/index.module.less';
import PersonProfile from './person-profile';
import AdSettings from './ad-settings';
import RecSettings from './rec-settings';

const TabPane = Tabs.TabPane;

const Right = () => {
  const [key, setKey] = useState('0');
  const onTabChange = (key) => {
    setKey(key);
  };
  return (
    <>
      <div className={styles.container}>
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>侧栏配置</Breadcrumb.Item>
        </Breadcrumb>
        <Card hoverable>
          <Tabs activeTab={key} onChange={onTabChange}>
            <TabPane key="0" title="个人简介">
              {key === '0' && <PersonProfile />}
            </TabPane>
            <TabPane key="1" title="广告设置">
              {key === '1' && <AdSettings />}
            </TabPane>
            <TabPane key="2" title="推荐设置">
              {key === '2' && <RecSettings />}
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default Right;
