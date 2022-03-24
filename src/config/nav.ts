import {
  DashboardOutlined,
  TeamOutlined,
  HomeOutlined,
  CarryOutOutlined,
  TagOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  ThunderboltOutlined,
  BlockOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { PROPERTY_PREFIX_PATH } from "./api";

const dashBoardNavTree = [
  {
    key: "administration",
    path: `${PROPERTY_PREFIX_PATH}/dashboard`,
    title: "Dashboard",
    icon: CarryOutOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "dashboard",
        path: `${PROPERTY_PREFIX_PATH}/dashboard`,
        title: "Dashboard",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "admins",
        path: `${PROPERTY_PREFIX_PATH}/admins`,
        title: "Administrators",
        icon: AppstoreAddOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "news",
        path: `${PROPERTY_PREFIX_PATH}/properties`,
        title: "Properties",
        icon: HomeOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "categories",
        path: `${PROPERTY_PREFIX_PATH}/categories`,
        title: "Categories",
        icon: TagOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "services",
        path: `${PROPERTY_PREFIX_PATH}/services`,
        title: "Services",
        icon: ThunderboltOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "workers",
        path: `${PROPERTY_PREFIX_PATH}/workers`,
        title: "Workers",
        icon: TeamOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "plans",
        path: `${PROPERTY_PREFIX_PATH}/plans`,
        title: "Plans",
        icon: BlockOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "subscriptions",
        path: `${PROPERTY_PREFIX_PATH}/subscriptions`,
        title: "Subscriptions",
        icon: CreditCardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "settings",
        path: `${PROPERTY_PREFIX_PATH}/settings`,
        title: "Settings",
        icon: SettingOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
