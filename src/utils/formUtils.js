
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