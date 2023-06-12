import Devices from "../pages/devices";
import MainLayout from "../layouts/MainLayout";

const MainRoute = {
    path: "/devices",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <Devices />
        }
    ]
}

export default MainRoute;