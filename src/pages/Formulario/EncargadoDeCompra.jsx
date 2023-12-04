import * as React from 'react';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import BasicSelect from '../../components/Select';
import { useFormContext } from '../../context/FormContext';
import StepController from '../../components/Formulario/StepController';
import { useFormik } from 'formik';
import { handleFormMove } from '../../utils/formUtils';
import FormikSelect from '../../components/FormikSelect';

export default function EncargadoDeCompra() {

    const { handleNext, formEncargadoDeCompra, handleBack, clickedButton } = useFormContext();

    const tipoEncargado = [
        { value: 1, label: 'sector predominante 1' },
        { value: 2, label: 'sector predominante 2' },
        { value: 3, label: 'sector predominante 3' },
      ];
      

    const validationSchema = Yup.object({
        tipoEncargado: Yup.string().required('Campo requerido'),
        rut: Yup.string().required('Campo requerido'),
        fullname: Yup.string().required('Campo requerido'),
        phone: Yup.string().required('Campo requerido'),
        mail: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
    });

    const formik = useFormik({
        initialValues: {
            tipoEncargado: '',
            rut: '',
            fullname: '',
            phone: 'a',
            mail: 'a',
            ...formEncargadoDeCompra,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            handleFormMove(clickedButton, handleBack, handleNext, values)
        },
    });

    return (
        <React.Fragment>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h6" gutterBottom>
                    Encargado de Compra
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <FormikSelect
                            label="Tipo de Encargado"
                            name="tipoEncargado"
                            value={formik.values.tipoEncargado}
                            onChange={(e) => formik.setFieldValue("tipoEncargado", e.target.value)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tipoEncargado && Boolean(formik.errors.tipoEncargado)}
                            options={tipoEncargado}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="rut"
                            name="rut"
                            label="Rut"
                            fullWidth
                            variant="standard"
                            {...formik.getFieldProps('rut')}
                            error={formik.touched.rut && Boolean(formik.errors.rut)}
                            helperText={formik.touched.rut && formik.errors.rut}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="fullname"
                            name="fullname"
                            label="Nombre Completo"
                            fullWidth
                            variant="standard"
                            {...formik.getFieldProps('fullname')}
                            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                            helperText={formik.touched.fullname && formik.errors.fullname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Numero Telefónico"
                            fullWidth
                            variant="standard"
                            {...formik.getFieldProps('phone')}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="mail"
                            name="mail"
                            label="Correo Electrónico"
                            fullWidth
                            variant="standard"
                            {...formik.getFieldProps('mail')}
                            error={formik.touched.mail && Boolean(formik.errors.mail)}
                            helperText={formik.touched.mail && formik.errors.mail}
                        />
                    </Grid>
                </Grid>

                <StepController />
            </form>
        </React.Fragment >
    );
}
