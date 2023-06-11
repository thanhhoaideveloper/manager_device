import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from '@mui/icons-material/Group';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';

const menu = [
  { title: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { title: "Người Dùng", path: "/users", icon: <GroupIcon /> },
  { title: "Phòng Ban", path: "/users", icon: <CameraIndoorIcon /> },
  { title: "Thiết Bị", path: "/devices", icon: <DeviceHubIcon /> },
  { title: "Loại Thiết Bị", path: "/users", icon: <OnDeviceTrainingIcon /> },
  // {
  //   title: "Constacts Informations",
  //   path: "/contact",
  //   icon: <ContactsIcon />,
  // },
  // { title: "Invoice Balance", path: "/invoice", icon: <ReceiptIcon /> },
  // { title: "Profile Form", path: "/form", icon: <PortraitIcon /> },
  // { title: "Calendar", path: "/calendar", icon: <InsertInvitationIcon /> },
  // { title: "Bar Chart", path: "/bar-chart", icon: <BarChartIcon /> },
  // { title: "Pie Chart", path: "/pie-chart", icon: <PieChartIcon /> },
  // { title: "Line Chart", path: "/line-chart", icon: <ShowChartIcon /> },
  // {
  //   title: "Geography Chart",
  //   path: "/geograpgy-chart",
  //   icon: <AnalyticsIcon />,
  // },
];

export default menu;
