"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getAllItems = void 0;
const Item_1 = __importDefault(require("../models/Item"));
const getAllItems = async () => {
    return await Item_1.default.find();
};
exports.getAllItems = getAllItems;
const getItemById = async (id) => {
    return await Item_1.default.findById(id);
};
exports.getItemById = getItemById;
const createItem = async (data) => {
    const newItem = new Item_1.default(data);
    return await newItem.save();
};
exports.createItem = createItem;
const updateItem = async (id, data) => {
    return await Item_1.default.findByIdAndUpdate(id, data, { new: true });
};
exports.updateItem = updateItem;
const deleteItem = async (id) => {
    return await Item_1.default.findByIdAndDelete(id);
};
exports.deleteItem = deleteItem;
