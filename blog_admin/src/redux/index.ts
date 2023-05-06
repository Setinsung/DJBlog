import { combineReducers } from 'redux';
import global, { GlobalState } from './global';
import searchTable, { SearchTableState } from '../pages/search-table/redux/reducer';
import categories, { CategoriesState } from '../pages/categories/redux/reducer';
import tags, { TagsState } from '../pages/tags/redux/reducer';
import login, { UserLoginState } from '../pages/login/redux/reducer';
import user, { UserState } from '../pages/user/redux/reducer';
import comment, { CommentState } from '../pages/comment/redux/reducer';
import recommend, { RecommendState } from '../pages/site/right/redux/reducer';

export interface ReducerState {
  global: GlobalState;
  searchTable: SearchTableState;
  login: UserLoginState;
  categories: CategoriesState;
  tags: TagsState;
  user: UserState;
  comment: CommentState;
  recommend: RecommendState;
}

export default combineReducers({
  global,
  searchTable,
  login,
  categories,
  tags,
  user,
  comment,
  recommend,
});
