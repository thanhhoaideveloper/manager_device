import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import Header from "../../components/Header";

import Grid from '@mui/material/Unstable_Grid2';
import GridCard from '../../components/Layout/GridCard/Index';
import userApi from '../../apis/userApi';
import deviceApi from '../../apis/deviceApi';
import departmentApi from '../../apis/departmentApi';
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../store/reducer/user";
import {fetchDevice} from "../../store/reducer/device";
import {fetchDepartment} from "../../store/reducer/department";
const Dashboard = () => {
    const users = useSelector(state => state.userReducer.users);
    const devices = useSelector(state => state.deviceReducer.devices);
    const departments = useSelector(state => state.departmentReducer.departments);

    const [totalUser, setTotalUser] = useState(0);
    const [totalDevice, setTotalDevice] = useState(0);
    const [totalDepartment, setTotalDepartment] = useState(0);
    const loadTotal = async () => {
        const users = await userApi.getListUser();
        const devices = await deviceApi.getListDevice();
        const departments = await departmentApi.getListDepartment();

        setTotalUser(users.length);
        setTotalDevice(devices.length);
        setTotalDepartment(departments.length);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser())
        dispatch(fetchDevice())
        dispatch(fetchDepartment())
    }, []);

    return (
        <Box sx={{margin: "10px"}}>
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
            <Box sx={{margin: "10px 0"}}>
                <Grid container spacing={2}>
                    <GridCard xs={6} title="Tổng số người dùng" content={users.length} />
                    <GridCard xs={6} title="Tổng số thiết bị" content={devices.length}/>
                    <GridCard xs={6} title="Tổng số phòng ban" content={departments.length}/>
                    <GridCard xs={6} title="Tổng số yêu cầu thêm thiết bị" content={'200'}/>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
