import React, { useState, useEffect } from 'react';
import { Tag, Input, Message } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { randomColor } from '../../utils/color';
import styles from './style/index.module.less';

const BlogTags = (props) => {
  const [tags, setTags] = useState(props.value || []);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // 用于存储随机颜色，使添加和删除不改变颜色
  const [colorlist, setColorlist] = useState([]);

  useEffect(() => {
    setTags(props.value);
  }, [props.value]);

  useEffect(() => {
    if (!tags || tags.length === 0 || colorlist.length) return;
    const colorArr = new Array(tags.length).fill(null).map(() => randomColor());
    setColorlist(colorArr);
  }, [tags]);

  function addTag() {
    if (inputValue) {
      const newId = tags.length ? tags[tags.length - 1].id + 1 : 1;
      tags.push({ id: newId, name: inputValue });
      setTags(tags);
      // 每次添加，同时把随机颜色放入colorlist
      setColorlist([...colorlist, randomColor()]);
      setInputValue('');
      props.onChange && props.onChange(tags);
    }
    setShowInput(false);
  }

  function removeTag(id) {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
    props.onChange && props.onChange(newTags);
  }

  const handleAdd = () => {
    if (tags && tags.length !== 0) {
      if (tags.length < props.max) {
        setShowInput(true);
      } else {
        Message.info(`标签个数不能超过${props.max}个`);
      }
    } else {
      setShowInput(true);
    }
  };

  return (
    <div>
      {tags?.map((tag, index) => {
        return (
          <Tag
            key={tag.id}
            color={colorlist[index]}
            closable
            onClose={() => removeTag(tag.id)}
            className={styles.tagslist}
          >
            {tag.name}
          </Tag>
        );
      })}
      {showInput ? (
        <Input
          autoFocus
          size="mini"
          value={inputValue}
          style={{ width: 84 }}
          onPressEnter={addTag}
          onBlur={addTag}
          onChange={setInputValue}
        />
      ) : (
        <Tag
          icon={<IconPlus />}
          style={{
            backgroundColor: 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer',
          }}
          onClick={handleAdd}
        >
          添加
        </Tag>
      )}
    </div>
  );
};

export default BlogTags;
