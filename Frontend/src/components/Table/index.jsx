import React from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";


const TableUI = (props) => {
    const {columns = [], rows = []} = props;
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });


    return(
        <DataGrid
            columns={columns}
            rows={rows}
            style={{ height: '400px' }} // Đặt chiều cao tối thiểu
            components={{
                Toolbar: GridToolbar,
            }}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
        />
    )
}
export default TableUI;