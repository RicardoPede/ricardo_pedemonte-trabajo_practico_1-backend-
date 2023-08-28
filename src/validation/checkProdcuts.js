import { checkSchema } from 'express-validator';

export const prodcutValidation = checkSchema({
    nombre:{
        notEmpty: {
            errorMessage: "Debe incluir un nombre del producto"
        }
    },
    descripcion:{
        notEmpty: {
            errorMessage: "Debe incluir una descripción"
        }
    },
    precio:{
        notEmpty: {
            errorMessage: "Debe incluir el precio del producto"
        }
    }
})

