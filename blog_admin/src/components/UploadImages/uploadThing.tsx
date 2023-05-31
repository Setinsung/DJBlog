import React, { useEffect, useState } from 'react';
import { Button, Upload, Input, Modal, Form, Spin, Message } from '@arco-design/web-react';
import { IconDelete, IconEdit, IconPlus } from '@arco-design/web-react/icon';
import styles from './style/uploadThing.module.less';
import { imagesType } from '../../utils/constants';
import { upload } from '../../api/common';

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
    imgUrl,
    link,
    icon,
  } = props;
  const [imageUrl, setImageUrl] = useState<string>(imgUrl || '');
  // styles['upload-box']
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setImageUrl(imgUrl);
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
  // 定义上传前的钩子
  const beforeUpload = async (file) => {
    const isImage = imagesType.includes(file.type);
    if (!isImage) {
      return Message.warning('只能上传jpg, png, jpeg, gif格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return Message.warning('图片大小不能超过2MB!');
    }
    setLoading(true);
    setImageUrl('');
    const formData = new FormData();
    formData.append('file', file);
    const res = await upload(formData);
    // const res = [
    //   {
    //     hash: 'FmQ4J4',
    //     key: 'tree.png',
    //     url: 'http://up.deskcity.org/pic_source/2f/f4/42/2ff442798331f6cc6005098766304e39.jpg',
    //   },
    // ];
    if (res) {
      setImageUrl(res[0].url);
      onChange({
        index,
        field: 'imgUrl',
        value: res[0].url,
      });
      setLoading(false);
    }
    return false;
  };

  const uploadButton = (
    <div className="arco-upload-trigger-picture">
      <div className="arco-upload-trigger-picture-text">{loading ? <Spin /> : <IconPlus />}</div>
    </div>
  );

  return (
    <div className={styles['upload-item']}>
      {showImg && (
        <div className={styles['upload-wrapper']}>
          <Upload
            showUploadList={false}
            name="file"
            listType="picture-card"
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <div className="arco-upload-list-item-picture custom-upload-avatar">
                <img src={imageUrl} />
                <div className="arco-upload-list-item-picture-mask">
                  <IconEdit />
                </div>
              </div>
            ) : (
              uploadButton
            )}
            {/* <div className={cs}>
              {file && file.url ? (
                
              ) : (
                <div className="arco-upload-trigger-picture">
                  <div className="arco-upload-trigger-picture-text">
                    <IconPlus />
                  </div>
                </div>
              )}
            </div> */}
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
