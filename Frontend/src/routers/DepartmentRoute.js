import Departments from "../pages/departments";
import MainLayout from "../layouts/MainLayout";

const MainRoute = {
    path: "/departments",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <Departments />
        }
    ]
}

export default MainRoute;