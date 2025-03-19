import Item, { IItem } from "../models/Item";

export const getAllItems = async (): Promise<IItem[]> => {
    return await Item.find();
};

export const getItemById = async (id: string): Promise<IItem | null> => {
    return await Item.findById(id);
};

export const createItem = async (data: IItem): Promise<IItem> => {
    const newItem = new Item(data);
    return await newItem.save();
};

export const updateItem = async (id: string, data: Partial<IItem>): Promise<IItem | null> => {
    return await Item.findByIdAndUpdate(id, data, { new: true });
};

export const deleteItem = async (id: string): Promise<IItem | null> => {
    return await Item.findByIdAndDelete(id);
};