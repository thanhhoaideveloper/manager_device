// import in project
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { mockDataTeam } from "../../data/mockData";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SecurityIcon from "@mui/icons-material/Security";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser } from '../../store/reducer/user'
import TableUI from '../../components/Table/index'
import ModalSubCategory from "../categories/subComponent";
import ModalSubDevices from "./subComponent";
import {fetchDevice} from "../../store/reducer/device";


const Devices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const devices = useSelector(state => state.deviceReducer.devices);
  const dispatch = useDispatch();
  console.log(devices);
    useEffect(() => {
        dispatch(fetchDevice())
    }, [])

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
      {
          field: 'actions',
          type: 'actions',
          headerName: "Actions",
          width: 120,
          getActions: (params) => [
              <ModalSubCategory
                  data = {params.row  }
              />
          ]
      }
  ];

  return (
    <Box m="10px">
      <Header title="Devices" subtitle="" />
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
          <ModalSubDevices/>
          <TableUI
              rows={mockDataTeam}
              columns={columns}
          />
      </Box>
    </Box>
  );
};

export default Devices;
