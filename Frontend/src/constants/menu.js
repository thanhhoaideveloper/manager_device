import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from '@mui/icons-material/Group';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import { QueuePlayNext, SettingsAccessibility } from "@mui/icons-material";

const menu = [
  { title: "Dashboard", path: "/", icon: <DashboardIcon />, role : ['ADMIN','DEVICE_MANAGEMENT', 'DEPARTMENT_MANAGEMENT', 'USER'], active: 'dashboard' },
  { title: "Người Dùng", path: "/users", icon: <GroupIcon />, role : ['ADMIN'], active: 'users' },
  { title: "Phòng Ban", path: "/departments", icon: <CameraIndoorIcon />, role : ['ADMIN', 'DEPARTMENT_MANAGEMENT'], active: 'departments' },
  { title: "Thiết Bị", path: "/devices", icon: <DeviceHubIcon />, role : ['ADMIN', 'DEVICE_MANAGEMENT'], active: 'devices' },
  { title: "Loại Thiết Bị", path: "/categories", icon: <OnDeviceTrainingIcon />, role : ['ADMIN', 'DEVICE_MANAGEMENT'], active: 'categories' },
  { title: "Yêu cầu thêm thiết bị", path: "/request-add-device", icon: <QueuePlayNext />, role : ['ADMIN', 'DEVICE_MANAGEMENT'] , active: 'request-add-device'},
  { title: "Bảo trì thiết bị", path: "/maintenance-device", icon: <SettingsAccessibility />, role : ['DEVICE_MANAGEMENT'] , active: 'maintenance-device'},
];

export default menu;
