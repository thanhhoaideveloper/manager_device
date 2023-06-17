// import in project
import {Box, Chip, useTheme} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableUI from '../../components/Table/index'
import ModalSubDevices from "./subComponent";
import {fetchDevice} from "../../store/reducer/device";
import { Check, Close } from "@mui/icons-material";


const Devices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const devices = useSelector(state => state.deviceReducer.devices);
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDevice())
    }, [dispatch])

  const columns = [
    { field: "index", headerName: "STT", flex: 1,  headerAlign: 'center',align: 'center' },
    { field: "name", headerName: "Tên thiết bị", flex: 1, headerAlign: 'center',align: 'center',},
    { field: "code", headerName: "Code", flex: 1, headerAlign: 'center',align: 'center', },
    { field: "config", headerName: "Cấu hình", flex: 1, headerAlign: 'center',align: 'center', },
    { field: "price", headerName: "Giá", flex: 1, headerAlign: 'center',align: 'center', },
      {
          field: "is_active",
          headerName: "Trạng thái",
          flex: 1,
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => {
                return (
                  <Chip 
                    icon={params.row.is_active ? <Check /> : <Close />}
                    size="medium" 
                    label={params.row.is_active ? 'Hoạt động' : 'Không hoạt động'} 
                    color={params.row.is_active ? 'success' : 'error'} 
                />
              );
          },
      },
      {
          field: 'actions',
          type: 'actions',
          headerName: "Hành động",
          width: 120,
          headerAlign: 'center',
          align: 'center',
          getActions: (params) => [
              <ModalSubDevices
                  data = {params.row  }
                  dispatch = {dispatch}
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
          <ModalSubDevices
              dispatch = {dispatch}
              colors={colors}
          />
          <TableUI
              rows={devices}
              columns={columns}
          />
      </Box>
    </Box>
  );
};

export default Devices;
