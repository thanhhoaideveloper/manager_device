import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// import in project
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

const Invoice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "cost",
      headerName: "Cose",
      flex: 1,
      renderCell: (param) => (
        <Typography color={colors.greenAccent[500]}>
          ${param.row.cost}
        </Typography>
      ),
    },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <Box m="10px">
      <Header title="INVOICE BANLENCE" subtitle="List of invoice balance" />
      <Box
        sx={{
          height: "75vh",
          marginTop: "10px",
        }}
      >
        <DataGrid rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoice;
