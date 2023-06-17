import { Box, Button, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import departmentApi from "../../../apis/departmentApi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import ModalAddDevice from "./modalAddDevice";

const DespartmentDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [despartment, setDespartment] = useState(null);
    const [device, setDevice] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
    });
    const [isOpen, setIsOpen] = useState(false);

    const fetchDespartment = useCallback(async() => {
        const data = await departmentApi.getOne(id);
        setDespartment(data);
    },[id])

    const fetchDeviceOfDespartment = useCallback(async () => {
        const data = await departmentApi.getDevice(id);
        setDevice(data?.Devices || [])
    }, [id])

    const handleOpen = () =>{
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        fetchDespartment();
        fetchDeviceOfDespartment();
    }, [fetchDeviceOfDespartment, fetchDespartment])

    const columns = [
        { field: "id", headerName: "ID", flex: 1,  headerAlign: 'center',align: 'center' },
        { field: "name", headerName: "Tên thiết bị", flex: 1, headerAlign: 'center',align: 'center',},
        { field: "code", headerName: "Code", flex: 1, headerAlign: 'center',align: 'center', },
        { field: "config", headerName: "Cấu hình", flex: 1, headerAlign: 'center',align: 'center', },
        {
            field: 'actions',
            type: 'actions',
            headerName: "Hành động",
            width: 120,
            headerAlign: 'center',
            align: 'center',
            getActions: (params) => [
                
            ]
        }
    ];
    return (
        <Box m="10px">
        <Header title={despartment?.name} subtitle={`Code: ${despartment?.code}`} />
        <Button sx={{backgroundColor: colors.greenAccent[600], margin: '10px 5px'}} onClick={handleOpen} variant="contained">Thêm thiết bị</Button>
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
                    disableRowSelectionOnClick
                    columns={columns}
                    rows={device}
                    style={{ height: '400px' }} // Đặt chiều cao tối thiểu
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                />
            </Box>
        <ModalAddDevice isOpen={isOpen} onClose={handleClose} despartmentId ={id}/>
        </Box>
    )
}

export default DespartmentDetail;