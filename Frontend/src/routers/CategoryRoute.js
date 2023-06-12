import Categories from "../pages/categories";
import MainLayout from "../layouts/MainLayout";

const MainRoute = {
    path: "/categories",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <Categories />
        }
    ]
}

export default MainRoute;