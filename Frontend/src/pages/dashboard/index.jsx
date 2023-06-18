import {Box, useTheme} from "@mui/material";
import Header from "../../components/Header";
import {tokens} from "../../theme";

import Grid from '@mui/material/Unstable_Grid2';
import GridCard from '../../components/Layout/GridCard/Index';
import {useSelector} from "react-redux";

const Dashboard = () => {
    const users = useSelector(state => state.userReducer.users);
    const devices = useSelector(state => state.deviceReducer.devices);
    const departments = useSelector(state => state.departmentReducer.departments);

    return (
        <Box sx={{margin: "10px"}}>
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
            <Box sx={{margin: "10px 0"}}>
                <Grid container spacing={2}>
                    <GridCard xs={3} title={'Tổng số người dùng'} content={users.length}/>
                    <GridCard xs={3} title={'Tổng số thiết bị'} content={devices.length}/>
                    <GridCard xs={3} title={'Tổng số phòng ban'} content={departments.length}/>
                    <GridCard xs={3} title={'Tổng số yêu cầu thêm thiết bị'} content={'200'}/>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
