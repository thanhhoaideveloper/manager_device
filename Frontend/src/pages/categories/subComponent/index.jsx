import React, {useState} from "react";
import { Modal, Button, TextField, FormControlLabel, Switch, Grid, Tooltip, Dialog, Box } from "@mui/material";
import { Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {GridActionsCellItem} from "@mui/x-data-grid";
import {Delete, Edit} from "@mui/icons-material";
import authApi from "../../../apis/authApi";

import {create, fetchCategory,update, deleteApi} from '../../../store/reducer/category'
import {login} from "../../../store/reducer/auth";

const ModalSubCategory = (props) => {
    const {onClose, scroll='paper', data, dispatch} = props;
    const checkFormUpdate = data ? true : false;
    const [isOpen, setIsOpen] = useState(false)
    const formik = useFormik({
        initialValues : {
            code : '',
            name : '',
            is_active : false,
        },
        validationSchema : Yup.object({
            code: Yup.string().required("Required").max(255, "Code must be at most 255 characters"),
            name: Yup.string().required("Required").max(255, "Name must be at most 255 characters"),
        }),
        onSubmit : (values) =>{
            handleSubmitForm(values);
        }
    })

    const handleSubmitForm = async (props) => {
        if(checkFormUpdate){
            await dispatch(update({...props, id : data.id}));
        }
        else{
            await dispatch(create({...props}));
        }
        dispatch(fetchCategory()) // load lạo table
    }

    const handleDelete = async () => {
        if(checkFormUpdate){
            await dispatch(deleteApi ({id : data.id}));
        }
        dispatch(fetchCategory())
    }

    const handleOpen = () => {
        if(data){
            formik.setFieldValue('name',data.name)
            formik.setFieldValue('code',data.code)
            formik.setFieldValue('is_active',data.is_active === 1 ? true : false)

        }
        setIsOpen(!isOpen)
    }

    const handleClose = () => {
        formik.handleReset();
        setIsOpen(false)
    }

    const handleSwicth = (e) => {
        formik.setFieldValue('is_active',!formik.values.is_active)
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
                              <Button  variant="text" color={'error'} onClick = {handleDelete}><Delete/></Button>
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
                                    name="code"
                                    label="Code"
                                    fullWidth
                                    value = {formik.values.code}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.code && formik.errors.code)}
                                    helperText={formik.errors.code && formik.touched.code ? formik.errors.code : null}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="is_active"
                                            checked={formik.values.is_active}
                                            onChange={(e) => handleSwicth(e)}
                                            color="primary"
                                        />
                                    }
                                    label="Is Active"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color={'error'} onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color={'success'} onClick={formik.handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalSubCategory;
