import React, {useState} from "react";
import { Button, TextField, FormControlLabel, Switch, Grid, Tooltip, Dialog, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {Delete, Edit} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../../store/reducer/user";
import { isAdmin } from "../../../utils";


const ModalSubUser = (props) => {
    const currentUser = useSelector(state => state.authReducer.currentUser);

    const {onClose, scroll='paper', data} = props;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues : {
            email : '',
            name : '',
            password : '',
            is_admin : 1,
        },
        validationSchema : Yup.object({
            name: Yup.string().required("vui lòng nhập name").max(255, "Name must be at most 255 characters"),
            email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
            password: !data && Yup.string()
                .required('Vui lòng nhập mật khẩu')
                .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'
                ),
        }),
        onSubmit : (values) =>{
            if(data){
                handleChangeForm(values);
            }else{
                handleSubmitForm(values);
            }
        }
    })

    const handleSubmitForm = async (props) => {
        await dispatch(createUser(props));
        setIsOpen(false);
    }

    const handleChangeForm = async (props) => {
        await dispatch(updateUser({id: data.id, formData: props}));
        setIsOpen(false);
    }

    const handleOpen = () => {
        if(data){
            formik.setFieldValue('name',data.name)
            formik.setFieldValue('email',data.email)
            formik.setFieldValue('password',data.password)
            formik.setFieldValue('is_admin',data.is_admin)

        }
        setIsOpen(!isOpen)
    }

    const handleClose = () => {
        formik.handleReset();
        setIsOpen(false)
    }

    const handleSwicth = (e) => {
        formik.setFieldValue('is_admin',formik.values.is_admin == 1 ? 0 : 1);
    }

    return (
        <>
            <Tooltip  title="Thêm" placement={'bottom'}>
                <>
                    {
                        !data ? <Button  variant="text" color={'success'} onClick={handleOpen}><AddCircleOutlineOutlinedIcon/></Button> :
                            <>
                                <Button
                                    variant="text"
                                    color={'warning'}
                                    onClick={handleOpen}
                                ><Edit/></Button>
                                <Button  variant="text" color={'error'}><Delete/></Button>
                            </>
                    }
                </>

            </Tooltip>

            <Dialog
                open={isOpen}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                // fullScreen = {fullScreen}
                maxWidth = {'sm'}
                fullWidth = {false}
            >

                <DialogTitle id="scroll-dialog-title">{data ? 'Sửa' : 'Thêm'}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Box
                        component="form"
                        // noValidate
                        autoComplete="off"
                        sx={{
                            '& .MuiTextField-root, .MuiFormControl-root': { width: '100%' },
                            // width: 800
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    fullWidth
                                    value = {formik.values.name}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.name && formik.errors.name)}
                                    helperText={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="email"
                                    fullWidth
                                    disabled={ data ? true : false}
                                    value = {formik.values.email}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {!data && (
                                    <TextField
                                        name="password"
                                        label="password"
                                        fullWidth
                                        disabled={ data ? true : false}
                                        value = {formik.values.password}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.password && formik.errors.password)}
                                        helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="is_admin"
                                            checked={formik.values.is_admin === 1 ? true: false}
                                            onChange={handleSwicth}
                                            color="primary"
                                        />
                                    }
                                    label="Is Admin"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    { isAdmin(currentUser) && (
                        <>
                        <Button variant="contained" color={'error'} onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color={'success'} onClick={formik.handleSubmit}>Save</Button>
                        </>
                    )}
                    
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalSubUser;
