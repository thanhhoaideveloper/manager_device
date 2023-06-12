// import in project
import {Box, Button, Typography, useTheme, Chip} from "@mui/material";
import Header from "../../components/Header";
import { mockDataTeam } from "../../data/mockData";
import { tokens } from "../../theme";
import {DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SecurityIcon from "@mui/icons-material/Security";
import { fetchCategory } from '../../store/reducer/category'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import TableUI from '../../components/Table/index'
import {Delete, Edit} from "@mui/icons-material";
import ModalSubCategory from "./subComponent";


const Categories = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const categories = useSelector(state => state.categoryReducer.categoryApi);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategory())
    }, [dispatch])


    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "code", headerName: "Code", flex: 1 },
        {
            field: "is_active",
            headerName: "Active",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Chip size="small"  label={params.row.is_active ? 'active' : 'no active'} color={params.row.is_active ? 'success' : 'error'} />
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
                <ModalSubCategory
                    data = {params.row  }
                />
            ]
        }
    ];

    return (
        <Box m="10px">
            <Header title="Categories" subtitle="" />
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
                <ModalSubCategory/>
                <TableUI
                    rows={categories}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default Categories;
