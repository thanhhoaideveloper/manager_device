import Users from "../pages/users";
import MainLayout from "../layouts/MainLayout";

const MainRoute = {
    path: "/users",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <Users />
        }
    ]
}

export default MainRoute;