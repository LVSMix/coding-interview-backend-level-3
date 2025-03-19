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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = exports.getItems = void 0;
const itemService = __importStar(require("../services/item-service"));
const Item_1 = __importDefault(require("../models/Item"));
const getItems = async (req, res) => {
    try {
        const items = await itemService.getAllItems();
        res.response(items).code(200);
    }
    catch (error) {
        res.response({ message: "Error obteniendo items", error }).code(500);
    }
};
exports.getItems = getItems;
const getItem = async (req, res) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        if (!item)
            return res.response({ message: "Item no encontrado" }).code(404);
        res.response(item);
    }
    catch (error) {
        res.response({ message: "Error obteniendo el item", error }).code(500);
    }
};
exports.getItem = getItem;
const createItem = async (req, res) => {
    try {
        const newItem = await itemService.createItem(new Item_1.default(req.payload));
        res.response(newItem).code(201);
    }
    catch (error) {
        res.response({ message: "Error creando item", error }).code(500);
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    try {
        const updatedItem = await itemService.updateItem(req.params.id, new Item_1.default(req.payload));
        if (!updatedItem)
            return res.response({ message: "Item no encontrado" }).code(404);
        res.response(updatedItem).code(200);
    }
    catch (error) {
        res.response({ message: "Error actualizando item", error }).code(500);
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const deletedItem = await itemService.deleteItem(req.params.id);
        if (!deletedItem)
            return res.response({ message: "Item no encontrado" }).code(404);
        res.response({ message: "Item eliminado correctamente" }).code(200);
    }
    catch (error) {
        res.response({ message: "Error eliminando item", error }).code(500);
    }
};
exports.deleteItem = deleteItem;
