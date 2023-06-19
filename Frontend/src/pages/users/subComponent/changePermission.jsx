import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from "@mui/material";
import { useCallback } from "react";
import { useState } from "react";
import deviceApi from "../../../apis/deviceApi";
import { useEffect } from "react";
import { tokens } from "../../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import departmentApi from "../../../apis/departmentApi";

const ModalAddDevice = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {isOpen, data, onClose, despartmentId } = props;
    const [device, setDevice] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
    });

    const fetchDevice = useCallback(async () => {
        const dataDevice = await deviceApi.getListDevice();
        setDevice(dataDevice);
    }, [])

    const handleClose = () => {
        onClose();
    }

    const handleChangeSelection = async (items) => {
        const inputs = {
            despartment_id: despartmentId,
            device_id: items
        };

        await departmentApi.addDevice(inputs);
        fetchDevice();
    }

    useEffect(() => {
        fetchDevice();
    }, [fetchDevice])

    const columns = [
        { field: "id", headerName: "ID", flex: 1,  headerAlign: 'center',align: 'center' },
        { field: "name", headerName: "Tên thiết bị", flex: 1, headerAlign: 'center',align: 'center',},
        { field: "code", headerName: "Code", flex: 1, headerAlign: 'center',align: 'center', },
        { field: "config", headerName: "Cấu hình", flex: 1, headerAlign: 'center',align: 'center', },
    ];

    return (
        <Dialog
            open={isOpen}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            // fullScreen = {fullScreen}
            maxWidth={'lg'}
            fullWidth={true}
        >
            <DialogTitle id="scroll-dialog-title">{data ? 'Sửa' : 'Thêm'}</DialogTitle>
            <DialogContent>
                <Box
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
                    checkboxSelection 
                    disableRowSelectionOnClick
                    columns={columns}
                    rows={device}
                    style={{ height: '400px' }} // Đặt chiều cao tối thiểu
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onSelectionModelChange={(item) => handleChangeSelection(item)}
                />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color={'error'} onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color={'success'}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};


export default ModalAddDevice;