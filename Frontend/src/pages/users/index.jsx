// import in project
import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { GridActionsCellItem } from "@mui/x-data-grid";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser } from '../../store/reducer/user'
import { Delete, Security, Update } from "@mui/icons-material";
import TableUI from '../../components/Table/index'
import { useState } from "react";
import ModalSubUser from "./subComponent";
import ModalPermission from "./subComponent/ModalPermission";
import userApi from "../../apis/userApi";
import RoleUi from "./subComponent/RoleUi";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const users = useSelector(state => state.userReducer.users);
  const currentUser = useSelector(state => state.authReducer.currentUser);

  //modal
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalPermission, setOpenModalPermission] = useState(false);
  const [userSelection, setUserSelection] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const handleUpdate = async (data) => {
    setDataUpdate(data);
    setIsOpen(true);
  }

  const handleOnClose = async () => {
    setIsOpen(false);
    setOpenModalPermission(false);
    dispatch(fetchUser());
  }

  const handleShowPermission = async (data) => {
    setUserSelection(data);
    setOpenModalPermission(true);
  }

  const handleDelete = async (id) => {
    await userApi.deleteUser(id);
    dispatch(fetchUser())
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access",
      headerName: "Access",
      flex: 2,
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
            width="200px"
          >
           <RoleUi userId={params.id} />
          </Box>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
        headerName: "Actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
            icon={<Update />}
            label="Cập nhật"
            // disabled={ _checkPermission('UPDATE_USER', currentUser.Permissions)} 
            onClick={() => handleUpdate(params.row)}
            showInMenu
        />,
        <GridActionsCellItem
            icon={<Delete />}
            label="Xóa"
            // disabled={ _checkPermission('DELETE_USER', currentUser.Permissions)} 
            onClick={() => handleDelete(params.row.id)}
            showInMenu
        />,
        <GridActionsCellItem
            icon={<Security />}
            label="Quyền"
            // disabled={ _checkPermission('DELETE_USER', currentUser.Permissions)} 
            // onClick={duplicateUser(params.id)}
            onClick={() => handleShowPermission(params.row)}
            showInMenu
        />,
      ]
    }
  ];

  return (
    <Box m="10px">
      <Header title="Users" subtitle="Manager Users" />
        <Button sx={{backgroundColor: colors.greenAccent[600], margin: '10px 5px'}} onClick={()=>setIsOpen(true)} variant="contained">Tạo mới</Button>
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
          <TableUI
              rows={users}
              columns={columns}
          />
          <ModalSubUser isOpen={isOpen} data={dataUpdate} onClose={handleOnClose}/>
          <ModalPermission isOpen={isOpenModalPermission} user={userSelection} onClose={handleOnClose}/>
      </Box>
    </Box>
  );
};

export default Users;
