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

const ModalSubCategory = (props) => {
    const {onClose, scroll='paper', data} = props;
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

    const handleSubmitForm = (props) => {
        console.log('test', props)
    }

    const handleOpen = () => {
        if(data){
            formik.setFieldValue('name',data.name)
            formik.setFieldValue('code',data.code)
            formik.setFieldValue('is_active',data.is_active)

        }
        setIsOpen(!isOpen)
    }

    const handleClose = () => {
        formik.handleReset();
        setIsOpen(false)
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
                                            onChange={formik.handleChange}
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
