import React, { useState, useEffect } from 'react';
import { Tag, Input, Message } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { TweenOneGroup } from 'rc-tween-one';
import { randomColor } from '../../utils/color';
import styles from './style/index.module.less';

const BlogTags = (props) => {
  const [tags, setTags] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // 用于存储随机颜色，使添加和删除不改变颜色
  const [colorlist, setColorlist] = useState([]);

  useEffect(() => {
    setTags(props.value || []);
  }, [props.value === undefined]);

  useEffect(() => {
    if (!tags || tags.length === 0 || colorlist.length) return;
    const colorArr = new Array(tags.length).fill(null).map(() => randomColor());
    setColorlist(colorArr);
  }, [tags]);

  function addTag() {
    // 每次添加前，先判断是否有重复的tag
    const isRepeat = tags.some((tag) => tag.name === inputValue);
    if (isRepeat) {
      Message.info('标签不能重复');
      return;
    }
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
    const tagIndex = tags.findIndex((tag) => tag.id === id);
    tags.splice(tagIndex, 1);
    colorlist.splice(tagIndex, 1);
    setTags([...tags]);
    // 每次删除tag的同时，先根据id找到tag在colorlist中的位置，再删除colorlist中的颜色
    setColorlist([...colorlist]);
    props.onChange && props.onChange([...tags]);
  }

  const handleAdd = () => {
    if (!tags || tags.length === 0) {
      setShowInput(true);
      return;
    }
    if (tags.length >= props.max) {
      Message.info(`标签个数不能超过${props.max}个`);
      return;
    }
    setShowInput(true);
  };

  const tagChild = tags?.map((tag, index) => {
    const tagElem = (
      <Tag
        // key={tag.id}
        color={colorlist[index]}
        closable
        onClose={() => removeTag(tag.id)}
        className={styles['tag-item']}
      >
        {tag.name}
      </Tag>
    );
    return (
      <div className={styles['tag-list']} key={tag.id}>
        {tagElem}
      </div>
    );
  });

  return (
    <div>
      <TweenOneGroup
        enter={{
          scale: 0.7,
          opacity: 0,
          type: 'from',
          duration: 200,
        }}
        leave={{ opacity: 0, width: 0.5, scale: 0.5, duration: 400 }}
      >
        {tagChild}

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
      </TweenOneGroup>
    </div>
  );
};

export default BlogTags;
