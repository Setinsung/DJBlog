import { Typography } from '@arco-design/web-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../redux';
import useLocale from '../../utils/useLocale';
import styles from './style/index.module.less';

export default function Welcome() {
  const locale = useLocale();
  const userInfo: {
    name?: string;
    avatar?: string;
  } = useSelector((state: ReducerState) => state.login.userInfo) || {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {locale['welcome.title.welcome']}
        </Typography.Title>
        <Typography.Text type="secondary">{userInfo.name}</Typography.Text>
      </div>
    </div>
  );
}
