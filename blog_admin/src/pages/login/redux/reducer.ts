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
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      state.userInfo = userInfo;
      return state;
    }
    default:
      return state;
  }
}
