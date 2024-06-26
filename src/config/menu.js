// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: 'feedback',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message'
  },
  {
    name: 'help',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu'
  }
];

let asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'home2',
    children: [
      {
        name: 'monitor',
        path: '/dashboard/monitor'
      }
    ]
  },
  {
    name: 'chart',
    path: '/chart',
    icon: 'chart',
    children: [
      {
        name: 'basic',
        path: '/chart/basic'
      },
      {
        name: 'general',
        path: '/chart/general'
      }
    ]
  },
  {
    name: '表格页',
    path: '/table',
    icon: 'cascades',
    children: [
      {
        name: 'basic',
        path: '/table/basic'
        // authority: 'admin',
      },
      {
        name: 'general',
        path: '/table/general'
        // authority: 'user',
      }
    ]
  },
  {
    name: '列表页',
    path: '/list',
    icon: 'menu',
    children: [
      {
        name: 'basic',
        path: '/list/basic'
      },
      {
        name: 'general',
        path: '/list/general'
      }
    ]
  },
  {
    name: 'profile',
    path: '/profile',
    icon: 'content',
    children: [
      {
        name: 'basic',
        path: '/profile/basic'
      },
      {
        name: 'terms',
        path: '/profile/general'
      }
    ]
  },
  {
    name: 'result',
    path: '/result',
    icon: 'question',
    children: [
      {
        name: 'success',
        path: '/result/success'
      },
      {
        name: 'fail',
        path: '/result/fail'
      }
    ]
  },
  {
    name: 'account',
    path: '/account',
    icon: 'yonghu',
    children: [
      {
        name: 'setting',
        path: '/account/setting'
      }
    ]
  },
  {
    name: 'exception',
    path: '/exception',
    icon: 'notice',
    children: [
      {
        name: '204',
        path: '/exception/204'
      },
      {
        name: '403',
        path: '/exception/403'
      },
      {
        name: '404',
        path: '/exception/404'
      },
      {
        name: '500',
        path: '/exception/500'
      }
    ]
  },
  {
    name: 'notice',
    path: '/notice',
    icon: 'notice',
    children: [
      {
        name: 'list',
        path: '/notice/list'
      }
    ]
  },
  {
    name: 'store',
    path: '/store',
    icon: 'shop',
    children: [
      {
        name: 'list',
        path: '/store/list'
      }
    ]
  },
  {
    name: 'bill',
    path: '/bill',
    icon: 'rmb',
    children: [
      {
        name: 'list',
        path: '/bill/list'
      }
    ]
  },
  {
    name: 'chat',
    path: '/chat',
    icon: 'message',
    children: [
      {
        name: 'chat-list',
        path: '/chat/list'
      }
    ]
  },
  {
    name: 'task',
    path: '/task',
    icon: 'task',
    children: [
      {
        name: 'list',
        path: '/task/list'
      }
    ]
  }
];
asideMenuConfig = asideMenuConfig.slice(8);

export { headerMenuConfig, asideMenuConfig };
