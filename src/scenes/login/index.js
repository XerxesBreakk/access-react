import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {  useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const LOGIN_URL = "/auth/jwt/create";
const USER_INFO_URL ='/auth/users/me/';

const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Error Server-side
  const [errMsg, setErrMsg] = useState("");

  //Auth Context
  const {auth,login_success,login_fail,user_load_success}=useAuth();
  
  //Navigate config
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dash';
  
  //Axios Private
  const axiosPrivate=useAxiosPrivate();

  //Formik Validation
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(LOGIN_URL, values, {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        });
        login_success(response.data);
      } catch (error) {
        if (!error.response) {
          setErrMsg("Servidor fuera de linea.");
        } else if (
          error.response?.status === 400 ||
          error.response?.status === 401
        ) {
          setErrMsg(error.response.data.detail);
        } else {
          setErrMsg("Login Fallido.");
        }
        login_fail();
      }  
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Debe tener mas de 5 caracteres.")
        .max(20, "Debe tener menos de 20 caracteres.")
        .required("Obligatorio"),
      password: Yup.string()
        .min(5, "Debe tener mas de 5 caracteres.")
        .max(20, "Debe tener menos de 20 caracteres.")
        .required("Obligatorio"),
    }),
  });

  return (
    <Box display="flex" justifyContent="center" m="10px">
      <Paper
        elevation={3}
        style={{ padding: "10px", background: colors.primary[400] }}
      >
        <Header title="Login" subtitle="Ingrese sus datos de acceso" />

        {errMsg ? <Alert severity="error"> {errMsg} </Alert> : null}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          my={"10px"}
          autoComplete="off"
        >
          <TextField
            fullWidth
            onChange={formik.handleChange}
            helperText={formik.touched.username && formik.errors.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: "5px" }}
            id="username"
            name="username"
            label="Usuario"
            variant="standard"
          />
          <TextField
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ marginBottom: "10px" }}
            id="password"
            name="password"
            type="password"
            label="Contraseña"
            variant="standard"
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ background: colors.blueAccent[400] }}
          >
            Iniciar sesion
          </Button>
        </Box>
      </Paper>
      <div>
        {auth}
      </div>
    </Box>
  );
};

export default Index;
