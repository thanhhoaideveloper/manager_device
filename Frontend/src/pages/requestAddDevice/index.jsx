import { Box, Chip, useTheme } from "@mui/material";
import Header from "../../components/Header";
import TableUI from "../../components/Table";
import { tokens } from "../../theme";
import { Check, Close } from "@mui/icons-material";

const RequestAddDevice = () =>{
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "index", headerName: "STT", flex: 1,  headerAlign: 'center',align: 'center' },
    { field: "name", headerName: "Người yêu cầu", flex: 1, headerAlign: 'center',align: 'center'},
    { field: "code", headerName: "Chi tiết yêu cầu", flex: 1, headerAlign: 'center',align: 'center', },
    { field: "date", headerName: "Ngày yêu cầu", flex: 1, headerAlign: 'center',align: 'center', },
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
              
          ]
      }
  ];

  return (
    <Box m="10px">
      <Header title="Yêu cầu" subtitle="Thêm thiết bị" />
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
              rows={[]}
              columns={columns}
          />
      </Box>
    </Box>
  );
}

export default RequestAddDevice;