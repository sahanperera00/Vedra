import Item from "../models/item.js";

//get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get item by id
export const getItembyId = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create item
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

//update item
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

//delete item
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndRemove(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get items by category
export const getItemsbyCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const items = await Item.find({ category: category });
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get items by seller
export const getItemsbySeller = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const items = await Item.find({ sellerId: sellerId });
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get items by name
export const addReview = async (req, res) => {
  const review = req.body;
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    item.star.reviewers.push(review);
    item.star.total += review.rate;
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
