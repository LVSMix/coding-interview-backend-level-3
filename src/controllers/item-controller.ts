import { Request, ResponseToolkit } from "@hapi/hapi";
import * as itemService from "../services/item-service";
import Joi from "joi";


const itemSchema = Joi.object({
    name: Joi.string().required().empty().messages({
        "string.base": `"name" should be a string`,
        "string.empty": `"name" is not empty`,
        "any.required": `"name" is required`,
    }),
    price: Joi.number().required().positive().empty().messages({
        "number.base": `Field "price" is a number`,
        "number.empty": `Field "price" is not empty`,
        "number.positive": `Field "price" cannot be negative`,
        "any.required": `Field "price" is required`,
    }),
});

export const getItems = async (req: Request, res: ResponseToolkit) => {
    try {
        const items = await itemService.getAllItems();
        console.log("Ítems obtenidos:", items);
        return res.response(items).code(200);
    } catch (error) {
        return res.response({ message: "Error obteniendo items", error }).code(500);
    }
};

export const getItem = async (req: Request, res: ResponseToolkit) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        if (!item) return res.response({ message: "Item no encontrado" }).code(404);
        return res.response(item);
    } catch (error) {
        return res.response({ message: "Error obteniendo el item", error }).code(500);
    }
};

export const createItem = async (req: Request, res: ResponseToolkit) => {
    try {
        const { error, value } = itemSchema.validate(req.payload);
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.context?.key, // Campo que falló
                message: detail.message,   // Mensaje de error personalizado
            }));
            return res.response({ errors }).code(400);
        }
        console.log("Payload recibido:", value);
        const newItem = await itemService.createItem(value);
        console.log("Ítem creado:", newItem);
        return res.response(newItem).code(201);
    } catch (error) {
        return res.response({ message: "Error creando item", error }).code(500);
    }
};

export const updateItem = async (req: Request, res: ResponseToolkit) => {
    try {
        const { error, value } = itemSchema.validate(req.payload);
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.context?.key, // Campo que falló
                message: detail.message,   // Mensaje de error personalizado
            }));
            return res.response({ errors }).code(400);
        }
        const { _id, ...updateData } = value as any;
        const updatedItem = await itemService.updateItem(req.params.id, updateData);
        if (!updatedItem) return res.response({ message: "Item no encontrado" }).code(404);
        return res.response(updatedItem).code(200);
    } catch (error) {
        return res.response({ message: "Error actualizando item", error }).code(500);
    }
};

export const deleteItem = async (req: Request, res: ResponseToolkit) => {
    try {
        const deletedItem = await itemService.deleteItem(req.params.id);
        if (!deletedItem) return res.response({ message: "Item no encontrado" }).code(404);
        return res.response({ message: "Item eliminado correctamente" }).code(204);
    } catch (error) {
        return res.response({ message: "Error eliminando item", error }).code(500);
    }
};
