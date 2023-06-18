import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from '@mui/icons-material/Group';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import { QueuePlayNext, SettingsAccessibility } from "@mui/icons-material";

const menu = [
  { active: 'dashboard', title: "Dashboard", path: "/", icon: <DashboardIcon />, role : 0 },
  { active: 'users', title: "Người Dùng", path: "/users", icon: <GroupIcon />, role : 1 },
  { active: 'despartments', title: "Phòng Ban", path: "/departments", icon: <CameraIndoorIcon />, role : 0 },
  { active: 'devices', title: "Thiết Bị", path: "/devices", icon: <DeviceHubIcon />, role : 0 },
  { active: 'categorys', title: "Loại Thiết Bị", path: "/categories", icon: <OnDeviceTrainingIcon />, role : 0 },
  { active: 'request-add-device', title: "Yêu cầu thêm thiết bị", path: "/request-add-device", icon: <QueuePlayNext />, role : 0 },
  { active: 'maintenance-device', title: "Bảo trì thiết bị", path: "/maintenance-device", icon: <SettingsAccessibility />, role : 0 },
];

export default menu;
