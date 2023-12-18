import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Container, CssBaseline, Paper, Toolbar, Typography } from "@mui/material";
import EstructuraProductiva from "../Formulario/EstructuraProductiva";
import Solicitante from "../Formulario/Solicitante";
import Copyright from "../../components/Copyright";
import React from "react";
import PersonaJuridica from "../Formulario/PersonaJuridica";
import EncargadoDeCompra from "../Formulario/EncargadoDeCompra";
import Archivos from "../Formulario/Archivos";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArchivosLinks from "./ArchivosLinks";
import { useFormContext } from "../../context/FormContext";

export default function BackOffice() {

    const elevation = 2;
    const formData = {
        rut: "21.023.920-0",
        razonSocial: "GTY",
        telefono: "981255666",
        mail: "jsanchez@gty.cl",
        region: "MAULE",
        comuna: "PICHIDEGUA",
        calle: "General del Canto",
        numeroDeCalle: "50",
        giro: "Frutales",
        isEncargadoDeCompra: true,
        cupo: 123,
        estructuras: [
            {
                comuna: '1',
                especies: [
                    { id: 1, nombre: 'Especie 1', cantidad: '1231' },
                    { id: 2, nombre: 'Especie 2', cantidad: '12342' },
                ],
                principalesSocios: 'asdas',
                rol: 'XX-XX',
                sectorPredominante: '2',
                tenenciaPredios: '3',
            },
        ],
        personas: [
            {
                participation: "80%",
                phone: "981255666",
                rut: "17.107.990-K",
            },
            {
                participation: "20%",
                phone: "912345678",
                rut: "11111111-1",
            },
        ],
        encargadoCompra: [{
            tipoEncargado: 1,
            rut: "2312",
            fullname: "3213",
            phone: "912345678",
            mail: "gaston.cath14@gmail.com"
        }]
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 8 }}>

                <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                    <Solicitante formData={formData} />
                </Paper>

                <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                    <EstructuraProductiva formData={formData} />
                </Paper>

                <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                    <PersonaJuridica formData={formData} />
                </Paper>

                {formData.encargadoCompra && formData.encargadoCompra.length > 0 ? (
                    <Paper elevation={elevation} sx={{ mt: 4, p: 5 }}>
                        <EncargadoDeCompra formData={formData} />
                    </Paper>
                ) : null}

                <Paper elevation={elevation} sx={{ my: 4, p: 5 }}>
                    <ArchivosLinks />
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    )
}
