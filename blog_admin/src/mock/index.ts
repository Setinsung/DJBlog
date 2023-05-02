import Mock from 'mockjs';

import './user';
import './message-box';
import '../pages/search-table/mock';
import '../pages/categories/mock';
import '../pages/tags/mock';
import '../pages/about/mock';
import '../pages/user/mock';
import '../pages/comment/mock';

Mock.setup({
  timeout: '200-600',
});
