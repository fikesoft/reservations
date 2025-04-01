import { checkSchema } from "express-validator";

export const eventSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Name is required",
        },
    },
    img: {
        notEmpty: {
            errorMessage: "Image URL is required",
        },
        isURL: {
            errorMessage: "Image must be a valid URL",
        },
    },
    "location.country": {
        notEmpty: {
            errorMessage: "Country is required",
        },
    },
    "location.city": {
        notEmpty: {
            errorMessage: "City is required",
        },
    },
    "location.street": {
        notEmpty: {
            errorMessage: "Street is required",
        },
    },
    price: {
        isNumeric: {
            errorMessage: "Price must be a number",
        },
    },
    category: {
        notEmpty: {
            errorMessage: "Category is required",
        },
    },
    classTicket: {
        isArray: {
            options: { min: 1 },
            errorMessage: "At least one ticket type is required",
        },
        custom: {
            options: (value) => {
                // Loop through classTicket and check if the type is valid
                const validTypes = ["Normal", "Premium", "All Inclusive"];
                for (let ticket of value) {
                    if (!validTypes.includes(ticket.type)) {
                        throw new Error(`Invalid class ticket name: ${ticket.type} should be one of this Normal, Premium, All Inclusive `);
                    }
                }
                return true;
            },
        },
    },
    description: {
        notEmpty: {
            errorMessage: "Description is required",  
        },
        isLength: {
            options: { max: 200, min: 50 },
            errorMessage: "Description must be at most 200 characters long and minimum 50"
        }
    },
});

export default eventSchema;
