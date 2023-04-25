import React from 'react';
import { Button, Card, Link } from '@arco-design/web-react';
import { IconBackward, IconClockCircle, IconRefresh, IconSave } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import HISTORY from '../../history';

const Save = (props) => {
  const { time, showBack, onRefresh, onSave } = props;
  const saveTime = time ? `上次操作时间：${time}` : '暂无操作记录';

  const goBack = () => {
    HISTORY.goBack();
  };

  return (
    <Card className={styles['save-card']}>
      <div className={styles['save-content']}>
        <Link icon={<IconClockCircle />}>{saveTime}</Link>
        <div className={styles['button-group']}>
          {showBack && (
            <Button onClick={goBack} type="dashed" icon={<IconBackward />}>
              返回
            </Button>
          )}
          {onRefresh && (
            <Button onClick={onRefresh} type="outline" icon={<IconRefresh />}>
              刷新
            </Button>
          )}
          {onSave && (
            <Button onClick={onSave} type="primary" icon={<IconSave />}>
              保存
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Save;
