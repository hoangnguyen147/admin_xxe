// material icon
import AddIcon from '@mui/icons-material/Add';
import ShopIcon from '@mui/icons-material/Shop';
import ViewListIcon from '@mui/icons-material/ViewList';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShareIcon from '@mui/icons-material/Share';
import PersonIcon from '@mui/icons-material/Person';

// configs
import { PATH_NAME, DRAWER_MENU_LABEL } from 'configs';

export const navBarCommon = [
  {
    subheader: 'Application',
    items: [
      {
        title: 'Dashboard',
        href: PATH_NAME.DASHBOARD,
        icon: DashboardIcon,
        label: DRAWER_MENU_LABEL.DASHBOARD,
      },
    ],
  },
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Post',
        icon: ShopIcon,
        href: PATH_NAME.POST,
        label: DRAWER_MENU_LABEL.POST,
        items: [
          {
            title: 'Add Post',
            icon: AddIcon,
            href: PATH_NAME.POST_ADD,
            label: DRAWER_MENU_LABEL.POST_ADD,
          },
          {
            title: 'List Post',
            icon: ViewListIcon,
            href: PATH_NAME.POST_LIST,
            label: DRAWER_MENU_LABEL.POST_LIST,
          },
        ],
      },
      // {
      //   title: 'Sharing',
      //   icon: ShareIcon,
      //   href: PATH_NAME.SHARING,
      //   label: DRAWER_MENU_LABEL.SHARING,
      //   items: [
      //     {
      //       title: 'Add Post',
      //       icon: AddIcon,
      //       href: PATH_NAME.SHARING_ADD,
      //       label: DRAWER_MENU_LABEL.SHARING_ADD,
      //     },
      //     {
      //       title: 'List Post',
      //       icon: ViewListIcon,
      //       href: PATH_NAME.SHARING_LIST,
      //       label: DRAWER_MENU_LABEL.SHARING_LIST,
      //     },
      //   ],
      // },
      {
        title: 'Users',
        icon: PersonIcon,
        href: PATH_NAME.USER,
        label: DRAWER_MENU_LABEL.USER,
        items: [
          {
            title: 'Add User',
            icon: AddIcon,
            href: PATH_NAME.USER_ADD,
            label: DRAWER_MENU_LABEL.USER_ADD,
          },
          {
            title: 'List User',
            icon: ViewListIcon,
            href: PATH_NAME.USER_LIST,
            label: DRAWER_MENU_LABEL.USER_LIST,
          },
        ],
      },
    ],
  },
];
