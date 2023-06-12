import Dashboard from "../pages/dashboard";
import MainLayout from "../layouts/MainLayout";

const MainRoute = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <Dashboard />
        }
    ]
}

export default MainRoute;