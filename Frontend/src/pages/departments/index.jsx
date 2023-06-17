// import in project
import {Box, Chip, Typography, useTheme} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableUI from '../../components/Table/index'
import ModalSubDepartment from "./subComponent";
import {fetchDepartment} from "../../store/reducer/department";
import moment from "moment/moment";
import { Check, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const Departments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const departments = useSelector(state => state.departmentReducer.departments);
  const navigator = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchDepartment())
  }, [dispatch])

  const handleClickDetail = (id) => {
    navigator(`/departments/${id}`)
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "code", headerName: "Code", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "device_count", headerName: "Số lượng thiết bị", flex: 1 },
      {
          field: "is_active",
          headerName: "Active",
          flex: 1,
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
              <ModalSubDepartment
                  data = {params.row  }
                  onClickDetail = {handleClickDetail}
              />
          ]
      }
  ];

  return (
    <Box m="10px">
      <Header title="Phòng Ban" subtitle="" />
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
          <ModalSubDepartment/>
          <TableUI
              rows={departments}
              columns={columns}
          />
      </Box>
    </Box>
  );
};

export default Departments;
