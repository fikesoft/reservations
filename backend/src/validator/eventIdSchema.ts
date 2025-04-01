import { checkSchema } from "express-validator";

export const  eventIdSchema = checkSchema({
    _id: {
        in: ["params"], // Ensure it checks the URL parameter
        notEmpty: {
            errorMessage: "Event ID is required",
        },
        isMongoId: {
            errorMessage: "Invalid Event ID format",
        },
    },
})
export default eventIdSchema;