// import in project
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { mockDataTeam } from "../../data/mockData";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SecurityIcon from "@mui/icons-material/Security";

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser } from '../../store/reducer/user'

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  console.log(users);
  useEffect(() => {

  }, [])

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "access",
      headerName: "Access",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              backgroundColor: colors.greenAccent[600],
              borderRadius: "5px",
            }}
            display="flex"
            justifyContent="center"
            alignContent="center"
            padding="5px"
            width="100px"
          >
            {params.row.access === "user" && <PersonIcon />}
            {params.row.access === "admin" && <AdminPanelSettingsIcon />}
            {params.row.access === "manager" && <SecurityIcon />}
            <Typography>
              {params.row.access === "user" && "User"}
              {params.row.access === "admin" && "Admin"}
              {params.row.access === "manager" && "Manager"}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="10px">
      <Header title="Users" subtitle="Manager Users" />
      <Box 
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid 
          rows={mockDataTeam} 
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          ></DataGrid>
      </Box>
    </Box>
  );
};

export default Users;
