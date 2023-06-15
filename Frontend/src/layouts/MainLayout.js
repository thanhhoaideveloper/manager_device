import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import Topbar from "../pages/global/Topbar";
import Sidebar from "../pages/global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MainLayout() {
    const [theme, colorMode] = useMode();
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login');
        }
    }, [isAuthenticated, navigate])
    
    return (
        isAuthenticated && 
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProSidebarProvider>
                    <div className="app">
                        <Sidebar />
                        <main className="content">
                            <Topbar />
                            <Outlet />
                        </main>
                    </div>
                </ProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
