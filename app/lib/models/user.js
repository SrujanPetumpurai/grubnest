"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.Reviews = exports.Items = exports.Users = void 0;
var mongoose_1 = require("mongoose");
var user_Schema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});
exports.Users = mongoose_1.default.models.Users || mongoose_1.default.model('Users', user_Schema);
var item_Schema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    cost: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    discount: { type: String, required: false },
    rating: { type: Number },
    measurement: { type: String, required: true }
});
exports.Items = mongoose_1.default.models.Items || mongoose_1.default.model('Items', item_Schema);
var reviewSchema = new mongoose_1.default.Schema({
    itemId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Items', required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Users', requried: true },
    comment: { type: String, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});
exports.Reviews = mongoose_1.default.models.Reviews || mongoose_1.default.model('Reviews', reviewSchema);
var cartSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Users', required: true },
    items: [{
            itemId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Items', required: true },
            quantity: { type: Number, required: true, default: 0 }
        }],
    createdAt: { type: Date, default: Date.now },
});
exports.Cart = mongoose_1.default.models.Cart || mongoose_1.default.model('Cart', cartSchema);
