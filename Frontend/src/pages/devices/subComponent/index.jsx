import React, {useEffect, useState} from "react";
import { Button, TextField, FormControlLabel, Switch, Grid, Tooltip, Dialog, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Delete, Edit} from "@mui/icons-material";
import Selection from '../../../components/Selection/index'
import {create, fetchDevice, update, deleteApi} from "../../../store/reducer/device";
import categoryApi from "../../../apis/categoryApi";
import { getMapListSelect } from "../../../utils";

const test = [
    {key : 1, name : 'duc'},
    {key : 2, name : 'duc2'},
    {key : 3, name : 'duc3'},
]
const ModalSubDevices = (props) => {
    const {scroll='paper', data, dispatch, colors} = props;
    const checkFormUpdate = data ? true : false;
    const [isOpen, setIsOpen] = useState(false)
    const [categories, setCategories] = useState([]);
    const formik = useFormik({
        initialValues : {
            code : '',
            name : '',
            price : '',
            config : '',
            // parent_id : '',
            // user_id : '',
            category_id : '',
            is_active : false,
        },
        validationSchema : Yup.object({
            code: Yup.string().required("Không để trống trường!!!").max(255, "Code must be at most 255 characters"),
            name: Yup.string().required("Không để trống trường!!!").max(255, "Name must be at most 255 characters"),
            price: Yup.number().required("Không để trống trường!!!"),
            config: Yup.string().required("Không để trống trường!!!").max(255, "Name must be at most 255 characters"),
            // user_id: Yup.string().required("Không để trống trường!!!"),
            // parent_id: Yup.string().required("Không để trống trường!!!"),
            category_id: Yup.string().required("Không để trống trường!!!"),
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
        dispatch(fetchDevice())
        handleClose()// load lạo table
    }

    const handleOpen = () => {
        if(data){
            formik.setFieldValue('name',data.name)
            formik.setFieldValue('code',data.code)
            formik.setFieldValue('price',data.price)
            formik.setFieldValue('parent_id',data.parent_id)
            formik.setFieldValue('user_id',data.user_id)
            formik.setFieldValue('category_id',data.category_id)
            formik.setFieldValue('config',data.config)
            formik.setFieldValue('is_active',data.is_active)
        }
        setIsOpen(!isOpen)
    }

    const handleClose = () => {
        formik.handleReset();
        setIsOpen(false)
    }

    const handleDelete = async () => {
        if(checkFormUpdate){
            await dispatch(deleteApi ({id : data.id}));
        }
        dispatch(fetchDevice())
    }

    const handleSwicth = (e) => {
        formik.setFieldValue('is_active',!formik.values.is_active)
    }

    const fetchDataSelect = async () => {
        const categoryList = await categoryApi.getListCategories();
        setCategories(categoryList);
    }

    useEffect(()=>{
        fetchDataSelect();
    }, [])
    
    return (
        <>
            <Tooltip  title="Thêm" placement={'bottom'}>
               <>
                   {
                       !data ? <Button onClick={handleOpen} sx={{backgroundColor: colors.greenAccent[600], margin: '10px 5px'}} variant="contained">Tạo mới</Button> :
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
                                    required={true}
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
                                    required={true}
                                    value = {formik.values.code}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.code && formik.errors.code)}
                                    helperText={formik.errors.code && formik.touched.code ? formik.errors.code : null}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="price"
                                    label="Price"
                                    fullWidth
                                    required={true}
                                    value = {formik.values.price}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.price && formik.errors.price)}
                                    helperText={formik.errors.price && formik.touched.price ? formik.errors.price : null}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="config"
                                    label="Config"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    required={true}
                                    value = {formik.values.config}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.config && formik.errors.config)}
                                    helperText={formik.errors.config && formik.touched.config ? formik.errors.config : null}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                               <Selection
                                   name = 'user_id'
                                   label = {'Users'}
                                   required={true}
                                   values = {formik.values.user_id}
                                   data = {test}
                                   handleChange = {(e) => {
                                      formik.setFieldValue('user_id',e.target.value)}}
                                   error = {!!(formik.touched.user_id && formik.errors.user_id)}
                                   helperText={formik.errors.user_id && formik.touched.user_id ? formik.errors.user_id : null}
                               />
                            </Grid> */}
                            {/* <Grid item xs={12}>
                               <Selection
                                   name = 'parent_id'
                                   label = {'Parent'}
                                   required={true}
                                   values = {formik.values.parent_id}
                                   data = {test}
                                   handleChange = {(e) => {
                                      formik.setFieldValue('parent_id',e.target.value)}}
                                   error = {!!(formik.touched.parent_id && formik.errors.parent_id)}
                                   helperText={formik.errors.parent_id && formik.touched.parent_id ? formik.errors.parent_id : null}
                               />
                            </Grid> */}
                            <Grid item xs={12}>
                               <Selection
                                   name = 'category_id'
                                   label = {'Category'}
                                   required={true}
                                   values = {formik.values.category_id}
                                   data = {getMapListSelect(categories)}
                                   handleChange = {(e) => {
                                      formik.setFieldValue('category_id',e.target.value)}}
                                   error = {!!(formik.touched.category_id && formik.errors.category_id)}
                                   helperText={formik.errors.category_id && formik.touched.category_id ? formik.errors.category_id : null}
                               />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="is_active"
                                            checked={formik.values.is_active == 1 ? true : false}
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

export default ModalSubDevices;
