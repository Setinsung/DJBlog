import React, { useEffect, useState } from 'react';
import { Button, Progress, Upload, Input, Modal, Form } from '@arco-design/web-react';
import { IconDelete, IconEdit, IconPlus } from '@arco-design/web-react/icon';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import styles from './style/uploadThing.module.less';

const FormItem = Form.Item;

const UploadThing = (props) => {
  const {
    onChange,
    onRemove,
    onAdd,
    index = 0,
    showImg,
    showLink,
    showIcon,
    showAction,
    showAdd = true,
    showReduce = false,
    uid,
    imgUrl,
    link,
    icon,
  } = props;
  const [file, setFile] = useState<UploadItem>({
    uid,
    url: imgUrl,
  });
  const cs = `arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''} ${
    styles['upload-box']
  }`;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const onOk = async () => {
    await form.validate();
    const values = form.getFields();
    onChange({
      index,
      field: 'imgUrl',
      value: values.imgUrl,
    });
    onCancel();
  };

  useEffect(() => {
    setFile({
      uid,
      url: imgUrl,
    });
    form.setFieldsValue({ imgUrl });
  }, [imgUrl]);

  const handleChangeLink = (value) => {
    onChange({
      index,
      field: 'link',
      value,
    });
  };
  const handleChangeIcon = (value) => {
    onChange({
      index,
      field: 'icon',
      value,
    });
  };

  return (
    <div className={styles['upload-item']}>
      {showImg && (
        <div className={styles['upload-wrapper']}>
          <Upload
            action="/"
            fileList={file ? [file] : []}
            showUploadList={false}
            onChange={(_, currentFile) => {
              setFile({
                ...currentFile,
                url: URL.createObjectURL(currentFile.originFile),
              });
            }}
            onProgress={(currentFile) => {
              setFile(currentFile);
            }}
          >
            <div className={cs}>
              {file && file.url ? (
                <div className="arco-upload-list-item-picture custom-upload-avatar">
                  <img src={file.url} />
                  <div className="arco-upload-list-item-picture-mask">
                    <IconEdit />
                  </div>
                  {file.status === 'uploading' && file.percent < 100 && (
                    <Progress
                      percent={file.percent}
                      type="circle"
                      size="mini"
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="arco-upload-trigger-picture">
                  <div className="arco-upload-trigger-picture-text">
                    <IconPlus />
                  </div>
                </div>
              )}
            </div>
          </Upload>
          <Button
            type="primary"
            className={styles['btn-input-link']}
            onClick={() => setVisible(true)}
          >
            输入链接
          </Button>
        </div>
      )}

      <div className={styles['input-group']}>
        {showLink && (
          <Input
            onChange={handleChangeLink}
            value={link}
            className={styles['input-one']}
            addBefore="链接: "
          />
        )}
        {showIcon && (
          <Input
            onChange={handleChangeIcon}
            value={icon}
            className={styles['input-one']}
            addBefore="图标: "
          />
        )}
      </div>
      {showAction && (
        <div className={styles['action-group']}>
          {showReduce && (
            <Button
              status="danger"
              icon={<IconDelete />}
              shape="circle"
              className={styles['btn-action']}
              onClick={() => onRemove(index)}
            />
          )}
          {showAdd && (
            <Button
              status="success"
              icon={<IconPlus />}
              shape="circle"
              className={styles['btn-action']}
              onClick={onAdd}
            />
          )}
        </div>
      )}

      <Modal
        title={<div style={{ textAlign: 'left' }}>添加图片链接</div>}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form form={form}>
          <FormItem
            label="图片链接"
            field="imgUrl"
            rules={[{ required: true, message: '请输入图片链接' }]}
          >
            <Input placeholder="请输入图片链接" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadThing;
