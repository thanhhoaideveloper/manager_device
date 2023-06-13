import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from '@mui/icons-material/Group';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';

const menu = [
  { title: "Dashboard", path: "/", icon: <DashboardIcon />, role : 0 },
  { title: "Người Dùng", path: "/users", icon: <GroupIcon />, role : 1 },
  { title: "Phòng Ban", path: "/departments", icon: <CameraIndoorIcon />, role : 0 },
  { title: "Thiết Bị", path: "/devices", icon: <DeviceHubIcon />, role : 0 },
  { title: "Loại Thiết Bị", path: "/categories", icon: <OnDeviceTrainingIcon />, role : 0 },
];

export default menu;
