import { Form, Input, Button, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';

import styles from './style/index.module.less';
import history from '../../history';
import useLocale from '../../utils/useLocale';
import { login as adminLogin } from '../../api/login';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const [form] = Form.useForm();
  // 这里使用useLocale()获取当前语言，此时local是一个对象，包含了当前语言的所有翻译
  const local = useLocale();

  function afterLoginSuccess(params) {
    // 记录登录状态
    localStorage.setItem('token', params.token);
    // 跳转首页
    window.location.href = history.createHref({
      pathname: '/',
    });
  }

  async function login(params) {
    setErrorMessage('');
    setLoading(true);
    try {
      const res: any = await adminLogin(params);
      if (res.data) {
        if (res.code === 0) {
          afterLoginSuccess(res.data);
        }
      } else {
        setErrorMessage(res.msg);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
    /* 
    // 官方推荐使用form.validate()
    try {
      await form.validate();
      const values = await form.getFields();
      console.log(values);
    } catch (error) {} */
  }

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>博客后台管理系统</div>
      <div className={styles['login-form-sub-title']}>登录 博客后台管理系统</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        <Form.Item
          field="userName"
          rules={[
            { required: true, message: local['login.p_userName'] },
            {
              match: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/,
              message: local['login.p_userName_pattern'],
            },
          ]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={local['login.p_userName']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[
            { required: true, message: local['login.p_password'] },
            {
              match: /^[A-Za-z0-9_]{6,20}$/,
              message: local['login.p_password_pattern'],
            },
          ]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={local['login.p_password']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          {/* <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              记住密码
            </Checkbox>
            <Link>忘记密码？</Link>
          </div> */}
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {local['login.login']}
          </Button>
          {/* <Button type="text" long className={styles['login-form-register-btn']}>
            注册账号
          </Button> */}
        </Space>
      </Form>
    </div>
  );
}
