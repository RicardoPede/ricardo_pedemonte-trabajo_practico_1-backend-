import { checkSchema } from 'express-validator';

export const commentValidation = checkSchema({
    contenido:{
        notEmpty: {
            errorMessage: "Debe incluir un mensaje"
        }
    },
})

