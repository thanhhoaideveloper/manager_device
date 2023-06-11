import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Outlet />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
