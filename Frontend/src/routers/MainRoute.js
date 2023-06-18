import Dashboard from "../pages/dashboard";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/profile";
import RequestAddDevice from "../pages/requestAddDevice";
import MaintenceDevice from "../pages/MaintenceDevice";

const MainRoute = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <Dashboard />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/request-add-device",
            element: <RequestAddDevice />
        },
        {
            path: "/maintenance-device",
            element: <MaintenceDevice />
        }
    ]
}

export default MainRoute;