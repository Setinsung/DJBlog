import React, { useEffect, useState } from 'react';
import UploadThing from './uploadThing';

interface Image {
  _id?: string;
  imgUrl?: string;
  link?: string;
  icon?: string;
  showAdd?: boolean;
  showReduce?: boolean;
}

const UploadImages = (props) => {
  const {
    value,
    onChange,
    max,
    showImg = true,
    showLink = true,
    showIcon = false,
    showAction = true,
  } = props;
  const initImgs: Array<Image> = [
    {
      _id: '',
      imgUrl: '',
      link: '',
      icon: '',
    },
  ];
  const [imgsArr, setImgsArr] = useState(() => {
    return value || initImgs;
  });

  useEffect(() => {
    if (!value) {
      setImgsArr(initImgs);
      return;
    }
    const length = value.length;
    value.map((item, idx) => {
      if (length < max) {
        item.showReduce = length !== 1;
        item.showAdd = length - 1 === idx;
      } else {
        item.showReduce = true;
        item.showAdd = false;
      }
    });
    setImgsArr(value);
  }, [value]);

  const onItemChange = (data) => {
    // console.log(data);
    // 修改对应field的值
    imgsArr.forEach((item, index) => {
      if (index === data.index) {
        item[data.field] = data.value;
      }
    });
    onChange(imgsArr);
  };

  const onAdd = () => {
    if (imgsArr.length < max) {
      imgsArr.push({
        uid: Date.now().toString(),
        imgUrl: '',
        link: '',
        icon: '',
      });
      onChange(imgsArr);
    }
  };
  const onRemove = (index) => {
    if (imgsArr.length === 1) return;
    imgsArr.splice(index, 1);
    onChange(imgsArr);
  };
  return (
    <>
      {imgsArr?.map((item, index) => {
        return (
          <UploadThing
            key={index}
            {...item}
            index={index}
            onChange={onItemChange}
            onAdd={onAdd}
            onRemove={onRemove}
            showImg={showImg}
            showLink={showLink}
            showIcon={showIcon}
            showAction={showAction}
          />
        );
      })}
    </>
  );
};

export default UploadImages;
