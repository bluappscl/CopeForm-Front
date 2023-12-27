import { blue, green, indigo, orange, red } from "@mui/material/colors";

export const handleFormMove = (clickedButton, handleBack, handleNext, values) => {
    try {
        if (clickedButton === 'backButton') {
            handleBack(values);
        } else {
            handleNext(values);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error.message);
    }
};


export const getColorForEstado = (estadoId) => {
    switch (estadoId) {
        case 1:
            return orange[500];
        case 2:
            return indigo[500];
        case 3:
            return blue[500];
        case 4:
            return green[500];
        case 5:
            return red[500];
        default:
            return null; // Puedes devolver un color predeterminado o null según tu lógica
    }
};