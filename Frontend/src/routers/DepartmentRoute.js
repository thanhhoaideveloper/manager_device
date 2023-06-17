import Departments from "../pages/departments";
import MainLayout from "../layouts/MainLayout";
import DespartmentDetail from "../pages/departments/subComponent/detail";

const MainRoute = {
    path: "/departments",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <Departments />
        },
        {
            path: ":id",
            element: <DespartmentDetail />
        }
    ]
}

export default MainRoute;