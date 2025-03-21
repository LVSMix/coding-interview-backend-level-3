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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItem = exports.getItems = void 0;
const itemService = __importStar(require("../services/item-service"));
const joi_1 = __importDefault(require("joi"));
const itemSchema = joi_1.default.object({
    name: joi_1.default.string().required().empty().messages({
        "string.base": `"name" should be a string`,
        "string.empty": `"name" is not empty`,
        "any.required": `"name" is required`,
    }),
    price: joi_1.default.number().required().positive().empty().messages({
        "number.base": `Field "price" is a number`,
        "number.empty": `Field "price" is not empty`,
        "number.positive": `Field "price" cannot be negative`,
        "any.required": `Field "price" is required`,
    }),
});
const getItems = async (req, res) => {
    try {
        const items = await itemService.getAllItems();
        console.log("Ítems obtenidos:", items);
        return res.response(items).code(200);
    }
    catch (error) {
        return res.response({ message: "Error obteniendo items", error }).code(500);
    }
};
exports.getItems = getItems;
const getItem = async (req, res) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        if (!item)
            return res.response({ message: "Item no encontrado" }).code(404);
        return res.response(item);
    }
    catch (error) {
        return res.response({ message: "Error obteniendo el item", error }).code(500);
    }
};
exports.getItem = getItem;
const createItem = async (req, res) => {
    try {
        const { error, value } = itemSchema.validate(req.payload);
        if (error) {
            const errors = error.details.map(detail => {
                var _a;
                return ({
                    field: (_a = detail.context) === null || _a === void 0 ? void 0 : _a.key, // Campo que falló
                    message: detail.message, // Mensaje de error personalizado
                });
            });
            return res.response({ errors }).code(400);
        }
        console.log("Payload recibido:", value);
        const newItem = await itemService.createItem(value);
        console.log("Ítem creado:", newItem);
        return res.response(newItem).code(201);
    }
    catch (error) {
        return res.response({ message: "Error creando item", error }).code(500);
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    try {
        const { error, value } = itemSchema.validate(req.payload);
        if (error) {
            const errors = error.details.map(detail => {
                var _a;
                return ({
                    field: (_a = detail.context) === null || _a === void 0 ? void 0 : _a.key, // Campo que falló
                    message: detail.message, // Mensaje de error personalizado
                });
            });
            return res.response({ errors }).code(400);
        }
        const _a = value, { _id } = _a, updateData = __rest(_a, ["_id"]);
        const updatedItem = await itemService.updateItem(req.params.id, updateData);
        if (!updatedItem)
            return res.response({ message: "Item no encontrado" }).code(404);
        return res.response(updatedItem).code(200);
    }
    catch (error) {
        return res.response({ message: "Error actualizando item", error }).code(500);
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const deletedItem = await itemService.deleteItem(req.params.id);
        if (!deletedItem)
            return res.response({ message: "Item no encontrado" }).code(404);
        return res.response({ message: "Item eliminado correctamente" }).code(204);
    }
    catch (error) {
        return res.response({ message: "Error eliminando item", error }).code(500);
    }
};
exports.deleteItem = deleteItem;
