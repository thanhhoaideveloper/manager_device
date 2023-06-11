// import in project
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser } from '../../store/reducer/user'
import { Delete, Edit } from "@mui/icons-material";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const users = useSelector(state => state.userReducer.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
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
            {!params.row.is_admin && <PersonIcon />}
            {params.row.is_admin && <AdminPanelSettingsIcon />}
            <Typography>
              {!params.row.is_admin && "User"}
              {params.row.is_admin && "Admin"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem 
          icon = {<Edit />}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem 
          icon={<Delete />}
          label="Delete"
          // onClick={}
          showInMenu
        />
      ]
    }
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
          rows={users} 
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
