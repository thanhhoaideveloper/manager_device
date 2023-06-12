import { useRoutes } from 'react-router-dom';

import MainRoute from './MainRoute';
import AuthRoute from './AuthRoute';
import CategoryRoute from './CategoryRoute';
import UsersRoute from './UsersRoute';

export default function ThemeRoutes(){
    return useRoutes([MainRoute, AuthRoute, CategoryRoute,UsersRoute])
}