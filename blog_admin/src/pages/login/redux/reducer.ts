import { LOGIN } from './actionTypes';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
};

export interface UserLoginState {
  userInfo?: {
    name: string;
    avatar: string;
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const userInfo = {
        ...action.payload,
        avatar:
          'https://cdn.cdnjson.com/tvax3.sinaimg.cn//large/0072Vf1pgy1fodqp01lzvj31kw0zkb29.jpg',
        name: action.payload.userName,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      state.userInfo = userInfo;
      return state;
    }
    default:
      return state;
  }
}
