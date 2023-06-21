import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import userApi from "../../../apis/userApi";
import { useEffect } from "react";
import RoleConstant from "../../../constants/role";

const ModalPermission = (props) => {
    const {isOpen, onClose, user } = props;
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState('');

    const handleClose = () => {
        onClose();
    }

    const fetchListRole = async () => {
        if(user){
            let userRole = await userApi.getListPermission(user.id);
            userRole = userRole.Permissions.map(item => item.name);
            setRoles(userRole);   
            setRole(userRole.indexOf('ADMIN') ? 'ADMIN' : userRole[0]);
        }
    }

    const handleChange = (event) => {
        const role = event.target.value;
        setRole(role);
    }

    const handleSubmit = async () => {
        if(roles.length < 4){
            await userApi.updateRole({
                user_id: user.id,
                role: role
            })
        }
        onClose();
    }

    useEffect(() => {
        fetchListRole();
    },[])
    return (
        <Dialog
            open={isOpen}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle id="scroll-dialog-title">Quyền User</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Vai trò"
                        onChange={handleChange}
                    >
                        { Object.keys(RoleConstant).map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>{RoleConstant[item]}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color={'error'} onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color={'success'} onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};


export default ModalPermission;