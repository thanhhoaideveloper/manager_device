import { useRoutes } from 'react-router-dom';

import MainRoute from './MainRoute';
import AuthRoute from './AuthRoute';

export default function ThemeRoutes(){
    return useRoutes([MainRoute, AuthRoute])
}