import { Box, useTheme, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import {
  Sidebar as SidabarLibary,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import ReorderIcon from "@mui/icons-material/Reorder";

// import in project
import { tokens } from "../../theme";
import userImage from "../../assets/user.png";
import { Link } from "react-router-dom";
import menu from "../../constants/menu";
import {getLocalStorage} from "../../utils";


const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapse, setIsCollapse] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar } = useProSidebar();
  const userData = getLocalStorage('currentUser');
  const roleMenu = menu.filter((data) => userData.is_admin >= data.role)

  const handleCollapse = () => {
    collapseSidebar();
    setIsCollapse((prev) => {
      return !prev;
    });
  };

  const Item = ({ path, title, icon, selected, setSelected }) => {
    return (
      <MenuItem
        routerLink={<Link to={path} />}
        active={selected === title}
        icon={icon}
        style={{ color: colors.grey[100] }}
        onClick={() => setSelected(title)}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        ".ps-menuitem-root :hover": {
          color: "#868dfb !important",
        },
        ".ps-menuitem-root.ps-active": {
          color: "#868dfb !important",
        },
        ".ps-menuitem-root .ps-menu-button": {
          backgroundColor: "transparent !important",
        },
        ".ps-menuitem-root.ps-active .ps-menu-button": {
          color: "#868dfb !important",
        },
      }}
    >
      <SidabarLibary
        rootStyles={{
          border: "none",
        }}
      >
        <Menu>
          {/* Title and Collapse */}
          {!isCollapse ? (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignContent="center"
                sx={{ margin: "10px 10px 20px 10px" }}
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={handleCollapse}>
                  <ReorderIcon />
                </IconButton>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignContent="center"
                sx={{
                  "& img": {
                    width: "70px",
                    cursor: "pointer",
                  },
                }}
              >
                <img src={userImage} alt="user" />
              </Box>
              <Box display="flex" justifyContent="center" alignContent="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                >
                  Hoai
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignContent="center">
                <Typography variant="h5" color={colors.grey[100]}>
                  Developer
                </Typography>
              </Box>
            </>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              sx={{ margin: "10px 5px 20px 5px" }}
            >
              <IconButton onClick={handleCollapse}>
                <ReorderIcon />
              </IconButton>
            </Box>
          )}
          {/* MenuItem */}
          {roleMenu.map((item, index) => {
            return (
              <Item
                key={index}
                title={item.title}
                path={item.path}
                icon={item.icon}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
        </Menu>
      </SidabarLibary>
    </Box>
  );
};

export default Sidebar;
