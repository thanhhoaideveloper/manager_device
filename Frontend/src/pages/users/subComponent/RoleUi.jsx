import { useEffect, useState } from "react";
import RoleConstant from "../../../constants/role"
import userApi from "../../../apis/userApi";
import { isEmptyArray } from "formik";
import { Typography } from "@mui/material";
import { AdminPanelSettings, Person } from "@mui/icons-material";

const RoleUi = (props) => {
    const { userId } = props;
    const [roles, setRoles] = useState([]);
    const roleConstant = RoleConstant;

    const fetchRole = async () =>{
        const listRole = await userApi.getListPermission(userId);
        setRoles(listRole.Permissions);
    }

    const isAdmin = roles.filter(item => {
        if(item.name === "ADMIN") return true;
    })
    useEffect(() => {
        fetchRole();
    }, [])
    return (
        <>
            {!isEmptyArray(isAdmin) ? (
                <>
                    <AdminPanelSettings />
                    <Typography>
                        Admin
                    </Typography>
                </>
            ) : roles.map(item => {
                return (
                    <>
                        <Person />
                        <Typography>
                            {RoleConstant[item.name]}
                        </Typography>
                    </>
                )
            })}
        </>
    )
}

export default RoleUi;