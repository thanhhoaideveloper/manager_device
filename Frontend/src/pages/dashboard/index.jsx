import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import Header from "../../components/Header";

import Grid from '@mui/material/Unstable_Grid2';
import GridCard from '../../components/Layout/GridCard/Index';
import userApi from '../../apis/userApi';
import deviceApi from '../../apis/deviceApi';
import departmentApi from '../../apis/departmentApi';

const Dashboard = () => {
    var [totalUser, setTotalUser] = useState(0);
    var [totalDevice, setTotalDevice] = useState(0);
    var [totalDepartment, setTotalDepartment] = useState(0);

    const loadTotal = async () => {
        const users = await userApi.getListUser();
        const devices = await deviceApi.getListDevice();
        const departments = await departmentApi.getListDepartment();
        setTotalUser(users.length);
        setTotalDevice(devices.length);
        setTotalDepartment(departments.length);
    }

    useEffect(() => {
        loadTotal();
    }, []);

    return (
        <Box sx={{margin: "10px"}}>
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
            <Box sx={{margin: "10px 0"}}>
                <Grid container spacing={2}>
                    <GridCard xs={3} title={'Tổng số người dùng'} content={totalUser}/>
                    <GridCard xs={3} title={'Tổng số thiết bị'} content={totalDevice}/>
                    <GridCard xs={3} title={'Tổng số phòng ban'} content={totalDepartment}/>
                    <GridCard xs={3} title={'Tổng số yêu cầu thêm thiết bị'} content={'200'}/>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
