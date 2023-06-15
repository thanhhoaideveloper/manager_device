import React from "react";
import { Button, TextField, FormControlLabel, Switch, Grid, Dialog, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../../../store/reducer/user";


const ModalSubUser = (props) => {
    const {isOpen, onClose, scroll='paper', data} = props;
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues : {
            email : data?.email,
            name : data?.name,
            password : data?.password,
            is_admin : data?.is_admin,
        },
        enableReinitialize: true,
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
        onClose();
    }

    const handleChangeForm = async (props) => {
        await dispatch(updateUser({id: data.id, formData: props}));
        onClose();
    }

    const handleClose = () => {
        formik.handleReset();
        onClose();
    }

    const handleSwicth = (e) => {
        formik.setFieldValue('is_admin',formik.values.is_admin === 1 ? 0 : 1);
    }

    return (
        <>
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
                                            checked={formik.values.is_admin === 1 ? true : false}
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
                    <>
                    <Button variant="contained" color={'error'} onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color={'success'} onClick={formik.handleSubmit}>Save</Button>
                    </>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalSubUser;
