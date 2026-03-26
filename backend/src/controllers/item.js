import Item from '../models/item.js';


// CREATE item
export const createItem = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create item', error: err.message });
    }
};


// GET all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch items', error: err.message });
    }
};



// UPDATE item
export const updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update item', error: err.message });
    }
};

// DELETE item
export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete item', error: err.message });
    }
};
