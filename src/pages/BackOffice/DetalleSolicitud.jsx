import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Container, CssBaseline, Paper, Toolbar, Typography } from "@mui/material";
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

export default function DetalleSolicitud() {

    const {id} = useParams();
    const [form, setForm] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/forms/${id}`)
            .then((response) => {
                const formData = response.data;
                setForm(formData);
            })
            .catch((error) => {
                console.error("Error fetching form data:", error);
            });
    }, []);

    const elevation = 2;

    return (
        <React.Fragment>
            <CssBaseline />
            {form && (
                <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 8 }}>

                    <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                        <Solicitante formData={form} />
                    </Paper>

                    <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                        <EstructuraProductiva formData={form} />
                    </Paper>

                    <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                        <PersonaJuridica formData={form} />
                    </Paper>

                    <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                        <EncargadoDeCompra formData={form}/>
                    </Paper>

                    <Paper elevation={elevation} sx={{ my: 4, p: 5 }}>
                        <ArchivosLinks />
                    </Paper>
                    <Copyright />
                </Container>
            )}
        </React.Fragment>
    )
}
