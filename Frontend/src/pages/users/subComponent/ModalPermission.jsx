import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import userApi from "../../../apis/userApi";
import { useEffect } from "react";

const ModalPermission = (props) => {
    const {isOpen, onClose, user } = props;
    const [listPermission, setListPermission] = useState([]);
    const PermissionConstant = {
        GET_LIST_USER: "Lấy danh sách người dùng",
        GET_ONE_USER: "Lấy một người dùng",
        GET_ONE_USER_HAS_PERMISSION: "Lấy một người dùng có kèm quyền tương ứng",
        ADD_USER: "Thêm người dùng",
        UPDATE_USER: "Cập nhật dữ liệu người dùng",
        DELETE_USER: "Xóa người dùng",
    
        GET_LIST_DEVICE: "Lấy tất cả thiết bị",
        GET_ONE_DEVICE: "Lấy một thiết bị",
        ADD_DEVICE: "Tạo một thiết bị",
        UPDATE_DEVICE: "Cập nhật dữ liệu thiết bị",
        DELETE_DEVICE: "Xóa thiết bị",
    
        GET_LIST_CATEGORY: "Lấy danh sách loại thiết bị",
        GET_ONE_CATEGORY: "Lấy một loại thiết bị",
        ADD_CATEGORY: "Thêm loại thiết bị",
        UPDATE_CATEGORY: "Cập nhật loại thiết bị",
        DELETE_CATEGORY: "Xóa loại thiết bị",
    
        GET_LIST_DEPARTMENT: "Lấy danh sách phòng ban",
        GET_ONE_DEPARTMENT: "Lấy dữ iệu một phòng ban",
        ADD_DEPARTMENT: "Thêm phòng ban",
        UPDATE_DEPARTMENT: "Cập nhật phòng ban",
        DELETE_DEPARTMENT: "Xóa phòng ban",
        GET_LIST_DEVICE_DEPARTMENT: "Lấy danh sách thiết bị của phòng ban",
        ADD_DEVICE_TO_DEPARTMENT: "Thêm thiết bị vào phòng ban",
        REMOVE_DEVICE_TO_DEPARTMENT: "Xóa thiết bị ra khỏi phòng ban",
    
        GET_LIST_PERMISSION: "Lấy danh sách quyền truy cập",
        ADD_PERMISSION: "Thêm quyền cho người dùng",
        DELETE_PERMISSION: "Xóa quyền người dùng",
        UPDATE_PERMISSION: "Cập nhật quyền người dùng",
    };
    
    const handleClose = () => {
        onClose();
    }

    const fetchListPermission = async () => {
        if(user){
            const userPermission = await userApi.getListPermission(user.id);
            console.log(userPermission);
        }
    }

    useEffect(() => {
        fetchListPermission();
    },[user])

    return (
        <Dialog
            open={isOpen}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            // fullScreen = {fullScreen}
            maxWidth={'lg'}
            fullWidth={true}
        >
            <DialogTitle id="scroll-dialog-title">Quyền User</DialogTitle>
            <DialogContent>
               
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color={'error'} onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color={'success'}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};


export default ModalPermission;