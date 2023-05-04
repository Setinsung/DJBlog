import React from 'react';
import {
  IconGift,
  IconStorage,
  IconTags,
  IconQuestionCircle,
  IconUser,
  IconMessage,
  IconSettings,
  IconHome,
  IconStar,
} from '@arco-design/web-react/icon';

export const defaultRoute = 'welcome';

export const routes = [
  {
    name: 'menu.welcome',
    key: 'welcome',
    icon: <IconGift />,
    componentPath: 'welcome',
  },
  /* {
    name: 'menu.list',
    key: 'list',
    icon: <IconList />,
    children: [
      {
        name: 'menu.list.searchTable',
        key: 'list/search-table',
        componentPath: 'search-table',
      },
    ],
  }, */
  {
    name: 'menu.categories',
    key: 'categories',
    icon: <IconStorage />,
    componentPath: 'categories',
  },
  {
    name: 'menu.tags',
    key: 'tags',
    icon: <IconTags />,
    componentPath: 'tags',
  },
  {
    name: 'menu.about',
    key: 'about',
    icon: <IconQuestionCircle />,
    componentPath: 'about',
  },
  {
    name: 'menu.user',
    key: 'user',
    icon: <IconUser />,
    componentPath: 'user',
  },
  {
    name: 'menu.comment',
    key: 'comment',
    icon: <IconMessage />,
    componentPath: 'comment',
  },
  {
    name: 'menu.site',
    key: 'site',
    icon: <IconSettings />,
    children: [
      {
        name: 'menu.site.home',
        key: 'home',
        icon: <IconHome />,
        componentPath: 'site/home',
      },
      {
        name: 'menu.site.headerFooter',
        key: 'hf',
        icon: <IconStar />,
        componentPath: 'site/headerFooter',
      },
    ],
  },
];
