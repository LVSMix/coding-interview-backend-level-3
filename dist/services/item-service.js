"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getAllItems = void 0;
const Item_1 = __importDefault(require("../models/Item"));
const getAllItems = async () => {
    const items = (await Item_1.default.find()).map(item => item.toJSON());
    return items;
};
exports.getAllItems = getAllItems;
const getItemById = async (id) => {
    var _a;
    const item = (_a = (await Item_1.default.findOne({ id: id }))) === null || _a === void 0 ? void 0 : _a.toJSON();
    return item || null;
};
exports.getItemById = getItemById;
const createItem = async (data) => {
    const newItem = new Item_1.default(data);
    return (await newItem.save()).toJSON();
};
exports.createItem = createItem;
const updateItem = async (id, data) => {
    const itemUpdated = await Item_1.default.findOneAndUpdate({ id: id }, data, { new: true });
    if (!itemUpdated)
        return null;
    return itemUpdated.toJSON();
};
exports.updateItem = updateItem;
const deleteItem = async (id) => {
    const itemDeleted = await Item_1.default.findOneAndDelete({ id: id });
    if (!itemDeleted)
        return null;
    return itemDeleted.toJSON();
};
exports.deleteItem = deleteItem;
