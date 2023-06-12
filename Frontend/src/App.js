import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// import in project
import Topbar from "./pages/global/Topbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Sidebar from "./pages/global/Sidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import Users from "./pages/users";
import Devices from "./pages/devices";
import Categories from "./pages/categories";

function App() {
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
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="/categories" element={<Categories />} />
                {/* <Route path="/contact" element={<Contact />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/form" element={<Profile />} />
                <Route path="/calendar" element={<Calendar />} /> */}
              </Routes>
            </main>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
