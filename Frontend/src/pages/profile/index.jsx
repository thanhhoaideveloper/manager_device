import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

// import in project
import Header from "../../components/Header";

const Profile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleSubmit = (values) => {
    console.log(values);
  };

  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
  };

  const userSchema = yup.object().shape({
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    email: yup.string().required("This field is required"),
    contact: yup.string().required("This field is required"),
    address1: yup.string().required("This field is required"),
    address2: yup.string().required("This field is required"),
  });

  return (
    <Box m="10px">
      <Header title="Hồ sơ cá nhân" subtitle="Quản lý hồ sơ" />
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmiting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={!!touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={!!touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={!!touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={!!touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="10px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default Profile;
