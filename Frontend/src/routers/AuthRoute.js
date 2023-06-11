import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login";

const AuthRoute = {
    path: '',
    element: <AuthLayout />,
    children: [
        {
            path: "/login",
            element: <Login />
        }
    ]
}

export default AuthRoute;