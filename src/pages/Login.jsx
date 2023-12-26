import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Copyright from '../components/Copyright';
import axiosInstance from '../../axiosInstance';
import { useSignIn } from 'react-auth-kit';
import { useState } from 'react';

export default function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      correo: '',
      contrasena: '',
    },
    validationSchema: Yup.object({
      correo: Yup.string().email('Correo con formato invalido').required('Required'),
      contrasena: Yup.string().required('Se requiere contraseña'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post('/login', values);
        if (response.status === 200) {
          const { token } = response.data
          signIn({
            token,
            expiresIn: 3600,
            tokenType: 'Bearer',
          });
          navigate("/")
        }
      } catch (error) {
        setError('Credenciales Incorrectas');
      }

    },
  });

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Email Address"
              name="correo"
              autoComplete="correo"
              autoFocus
              value={formik.values.correo}
              onChange={formik.handleChange}
              error={formik.touched.correo && Boolean(formik.errors.correo)}
              helperText={formik.touched.correo && formik.errors.correo}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contrasena"
              label="Password"
              type="contrasena"
              id="contrasena"
              autoComplete="current-contrasena"
              value={formik.values.contrasena}
              onChange={formik.handleChange}
              error={formik.touched.contrasena && Boolean(formik.errors.contrasena)}
              helperText={formik.touched.contrasena && formik.errors.contrasena}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container>
              <Grid item xs>
                <Link to="/b" variant="body2">
                  Forgot contrasena?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <br />
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}