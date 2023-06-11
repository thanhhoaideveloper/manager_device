import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import Topbar from "../pages/global/Topbar";
import Sidebar from "../pages/global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function MainLayout() {
    const [theme, colorMode] = useMode();
    
    return (
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
