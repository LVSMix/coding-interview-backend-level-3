import { Request, ResponseToolkit } from "@hapi/hapi";
import * as itemService from "../services/item-service";
import Item from "../models/Item";

export const getItems = async (req: Request, res: ResponseToolkit) => {
    try {
        const items = await itemService.getAllItems();
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
        const newItem = await itemService.createItem(new Item(req.payload));
        return res.response(newItem).code(201);
    } catch (error) {
        return res.response({ message: "Error creando item", error }).code(500);
    }
};

export const updateItem = async (req: Request, res: ResponseToolkit) => {
    try {
        const { _id, ...updateData } = req.payload as any;
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
        return res.response({ message: "Item eliminado correctamente" }).code(200);
    } catch (error) {
        return res.response({ message: "Error eliminando item", error }).code(500);
    }
};
