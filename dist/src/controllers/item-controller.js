"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = exports.getItems = void 0;
const itemService = __importStar(require("../services/item-service"));
const getItems = async (req, res) => {
    try {
        const items = await itemService.getAllItems();
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo items", error });
    }
};
exports.getItems = getItems;
const getItem = async (req, res) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        if (!item)
            return res.status(404).json({ message: "Item no encontrado" });
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo el item", error });
    }
};
exports.getItem = getItem;
const createItem = async (req, res) => {
    try {
        const newItem = await itemService.createItem(req.body);
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).json({ message: "Error creando item", error });
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    try {
        const updatedItem = await itemService.updateItem(req.params.id, req.body);
        if (!updatedItem)
            return res.status(404).json({ message: "Item no encontrado" });
        res.json(updatedItem);
    }
    catch (error) {
        res.status(500).json({ message: "Error actualizando item", error });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const deletedItem = await itemService.deleteItem(req.params.id);
        if (!deletedItem)
            return res.status(404).json({ message: "Item no encontrado" });
        res.json({ message: "Item eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: "Error eliminando item", error });
    }
};
exports.deleteItem = deleteItem;
