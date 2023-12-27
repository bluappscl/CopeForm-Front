import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Chip, Container, CssBaseline, Paper, Toolbar, Typography } from "@mui/material";
import EstructuraProductiva from "../Formulario/EstructuraProductiva";
import Solicitante from "../Formulario/Solicitante";
import Copyright from "../../components/Copyright";
import React, { useState } from "react";
import PersonaJuridica from "../Formulario/PersonaJuridica";
import EncargadoDeCompra from "../Formulario/EncargadoDeCompra";
import Archivos from "../Formulario/Archivos";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArchivosLinks from "./ArchivosLinks";
import { useFormContext } from "../../context/FormContext";
import { useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { blue, green, lightBlue, red } from "@mui/material/colors";
import { getColorForEstado } from "../../utils/formUtils";

export default function DetalleSolicitud() {

    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [filesUrls, setFilesUrls] = useState(null);

    const formatDate = (date) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };

        return new Date(date).toLocaleDateString('es-ES', options);
    }

    useEffect(() => {
        axiosInstance.get(`/forms/${id}`)
            .then((response) => {
                const formData = response.data;
                setFilesUrls(formData.filesUrl)
                setForm(formData.form);
            })
            .catch((error) => {
                console.error("Error fetching form data:", error);
            });
    }, []);

    const handleUpdateForm = (formId, estado) => {
        // Check if the estado is equal to 2 before making the update
        axiosInstance.put(`/forms/updateStateOfForm`, { formId: formId, estado: estado })
            .then((response) => {
                const data = response.data;
            })
            .catch((error) => {
                console.error(error);
                // Handle error if necessary
            });
    };

    const handleRevisarClick = () => {
        Swal.fire({
            title: 'Revisar Solicitud',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Rechazar',
            cancelButtonText: 'Aprobar',
            confirmButtonColor: red[800],
            cancelButtonColor: green[800],
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Aceptar (Aprobar)
                Swal.fire({
                    title: 'Confirmar Rechazo',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: lightBlue[600],
                    reverseButtons: true,
                }).then((confirmResult) => {
                    if (confirmResult.isConfirmed) {
                        handleUpdateForm(form.id, 5)
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Rechazar
                Swal.fire({
                    title: 'Confirmar Aprobación',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: lightBlue[600],
                    reverseButtons: true,
                }).then((confirmResult) => {
                    if (confirmResult.isConfirmed) {
                        handleUpdateForm(form.id, 4)
                    }
                });
            }
        });
    };

    const elevation = 2;

    return (
        <React.Fragment>
            <CssBaseline />
            {form && (
                <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 8 }}>
                    <Box sx={{ display: 'flex', gap: 6 }}>
                        <Typography variant="h5">Solicitud {form.id}</Typography>
                        <Typography variant="h5">Creado el {formatDate(form.creadoEl)}</Typography>
                        <Chip
                            label={form.estado.nombre}
                            sx={{
                                backgroundColor: getColorForEstado(form.estadoId) || '', // Puedes establecer un color predeterminado aquí
                                color: 'white',
                                width: '100px',
                            }}
                        />

                    </Box>
                    <Paper elevation={elevation} sx={{ mt: 1, p: 5 }}>
                        <Solicitante formData={form} />
                    </Paper>

                    <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                        <EstructuraProductiva formData={form} />
                    </Paper>

                    <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                        <PersonaJuridica formData={form} />
                    </Paper>

                    <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                        <EncargadoDeCompra formData={form} />
                    </Paper>

                    <Paper elevation={elevation} sx={{ my: 4, p: 5 }}>
                        <ArchivosLinks archivos={filesUrls} />
                    </Paper>
                    {form.estadoId === 3 && (
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            onClick={handleRevisarClick}
                        // sx={{}}
                        >
                            Revisar
                        </Button>
                    )}
                    <Copyright />
                </Container>
            )}
        </React.Fragment>
    )
}
