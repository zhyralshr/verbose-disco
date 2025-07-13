// database/models/ShopItem.js
const mongoose = require('mongoose');

const ShopItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        unique: true
    },
    itemType: {
        type: String,
        enum: ['LEVEL_IMAGE', 'BACKGROUND_IMAGE', 'ROLE', 'OTHER'], // أنواع العناصر
        required: true
    },
    imageUrl: { // رابط الصورة للعناصر المرئية
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: 'A cool item from the OneCraftBot shop!'
    },
    addedBy: { // معرف المستخدم الذي أضاف العنصر
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ShopItem', ShopItemSchema);
