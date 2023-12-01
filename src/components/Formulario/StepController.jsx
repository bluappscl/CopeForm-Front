import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "../../context/FormContext";
import { Formik } from "formik";



export default function StepController() {

    const { activeStep, stepsLength, handleButtonClick } = useFormContext();
  

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                    <Button
                    name="backButton"
                    type="submit" sx={{ mt: 3, ml: 1 }}
                    onClick={() => handleButtonClick('backButton')}
                    >
                        Atras
                    </Button>   
                )}

                <Button
                    variant="contained"
                    name="nextButton" 
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                    onClick={() => handleButtonClick('nextButton')}
                >
                    {activeStep === stepsLength - 1 ? 'Enviar' : 'Continuar '}
                </Button>
            </Box>
        </>
    );
};