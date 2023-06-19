import {Box} from "@mui/material";
import Header from "../../components/Header";

import Grid from '@mui/material/Unstable_Grid2';
import GridCard from '../../components/Layout/GridCard/Index';
import {useSelector} from "react-redux";
import userApi from '../../apis/userApi';
import React, {useEffect, useState} from "react";

const Dashboard = () => {
    var [totalUser, setTotalUser] = useState(0);
    useEffect(() => {
        const users = async () => {
            const data = await userApi.getListUser();
            return data;
        }
        setTotalUser(users.length);
    }, []);

    const devices = useSelector(state => state.deviceReducer.devices);
    const departments = useSelector(state => state.departmentReducer.departments);

    return (
        <Box sx={{margin: "10px"}}>
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
            <Box sx={{margin: "10px 0"}}>
                <Grid container spacing={2}>
                    <GridCard xs={3} title={'Tổng số người dùng'} content={totalUser}/>
                    <GridCard xs={3} title={'Tổng số thiết bị'} content={devices.length}/>
                    <GridCard xs={3} title={'Tổng số phòng ban'} content={departments.length}/>
                    <GridCard xs={3} title={'Tổng số yêu cầu thêm thiết bị'} content={'200'}/>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
