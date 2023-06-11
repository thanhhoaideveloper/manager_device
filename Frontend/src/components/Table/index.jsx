import React from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";


const TableUI = (props) => {
    const {columns = [], rows = []} = props;
    const hasData = rows.length > 0;
    const minHeight = hasData ? undefined : 0;
    console.log('hasData',hasData)

    return(
        <DataGrid
            columns={columns}
            rows={rows}
            style={{ height: '400px', minHeight }} // Đặt chiều cao tối thiểu
            components={{
                Toolbar: GridToolbar,
            }}
        />
    )
}
export default TableUI;