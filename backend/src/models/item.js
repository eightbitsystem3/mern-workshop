import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
