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
import moment from "moment/moment";


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
    { field: "index", headerName: "Index", flex: 1 },
      { field: "name", headerName: "name", flex: 1 },
    { field: "code", headerName: "code", flex: 1 },
    { field: "config", headerName: "config", flex: 1 },
    { field: "price", headerName: "price", flex: 1 },
      { field: "createdAt", headerName: "createdAt", flex: 1,
          renderCell: (params) => {
              return (
                  <Typography>
                      {
                          moment(params.row.createdAt).format('DD/MM/YYYY')
                      }
                  </Typography>
              );
          },
      },
      { field: "updatedAt", headerName: "UpdatedAt", flex: 1,
          renderCell: (params) => {
              return (
                  <Typography>
                      {
                          moment(params.row.updatedAt).format('DD/MM/YYYY')
                      }
                  </Typography>
              );
          },
      },
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
              rows={devices}
              columns={columns}
          />
      </Box>
    </Box>
  );
};

export default Devices;
