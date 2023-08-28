import { checkSchema } from 'express-validator';
import Users from '../models/modelsUsers.js';

export const userValidation = checkSchema({
    nombre:{
        notEmpty: {
            errorMessage: "Debe incluir un nombre de usuario"
        }
    },
    correoElectronico:{
        notEmpty: {
            errorMessage: "Debe incluir un email"
        },
        isEmail: {
            errorMessage: "No es un email válido"
        },
        custom:{
            options: async (value, { req }) => {
                const userId = req.params.id;
                
                return await Users.findOne( { where: { correoElectronico: value }}).then(
                    (user) => {
                        if (user?.id != userId ){
                            throw new Error(
                                "Correo electrónico ya utilizado para otro Usuario"
                            )
                        }
                    }
                )
            }
        }
    },
    password:{
        notEmpty: {
            errorMessage: "Ingrese contraseña"
        }
    }
})

