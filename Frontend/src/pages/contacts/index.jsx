import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// import in project
import Header from "../../components/Header";
import { mockDataContacts } from "../../data/mockData";
import { tokens } from "../../theme";

const Contact = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "zipCode", headerName: "Zipcode", flex: 1 },
    {
      field: "registrarId",
      headerName: "registrarId",
      flex: 1,
      hideable: false,
    },
  ];
  return (
    <Box m="10px">
      <Header title="CONTACTS" subtitle="Information contact" />
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
          columns={columns}
          rows={mockDataContacts}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default Contact;
