import { validationResult } from "express-validator";

export const validationSchema = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next();
}