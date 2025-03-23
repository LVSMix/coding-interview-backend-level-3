import Item, { IItem } from "../models/Item";

export const getAllItems = async (): Promise<IItem[]> => {
    const items = (await Item.find()).map(item => item.toJSON());
    return items;
};

export const getItemById = async (id: string): Promise<IItem | null> => {
    const item = (await Item.findOne({ id: id }))?.toJSON();
    return item || null;
};

export const createItem = async (data: IItem): Promise<IItem> => {
    const { id, ...itemData } = data; // Exclude the `id` field
    const newItem = new Item(itemData);
    return (await newItem.save()).toJSON();
};

export const updateItem = async (id: string, data: Partial<IItem>): Promise<IItem | null> => {
    const itemUpdated = await Item.findOneAndUpdate({ id: id }, data, { new: true });
    if (!itemUpdated) return null;
    return itemUpdated.toJSON();
};

export const deleteItem = async (id: string): Promise<IItem | null> => {
    const itemDeleted = await Item.findOneAndDelete({ id: id });
    if (!itemDeleted) return null;
    return itemDeleted.toJSON();
};