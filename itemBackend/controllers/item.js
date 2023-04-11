import Item from "../models/item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItembyId = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const item = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndRemove(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItemsbyCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const items = await Item.find({ category: category });
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getItemsbySeller = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const items = await Item.find({ sellerId: sellerId });
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
