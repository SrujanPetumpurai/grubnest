"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../app/lib/db");
var user_js_1 = require("../app/lib/models/user.js");
var mongoose_1 = require("mongoose");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectToDB)()];
                case 1:
                    _a.sent();
                    console.log(mongoose_1.default.connection.name);
                    return [4 /*yield*/, user_js_1.Items.insertMany([
                            { name: "Tomatoes", image: "/tomatoes.png", cost: 60, category: "vegetable", discount: "10%", rating: 4.2, measurement: "1kg", isFeatured: true },
                            { name: "Spinach", image: "/spinach.png", cost: 40, category: "vegetable", rating: 4.5, measurement: "250g", isFeatured: false },
                            { name: "Salmon Fillet", image: "/salmon.png", cost: 650, category: "seafood", discount: "5%", rating: 4.8, measurement: "500g", isFeatured: true },
                            { name: "Prawns", image: "/prawns.jpg", cost: 500, category: "seafood", rating: 4.6, measurement: "500g", isFeatured: false },
                            { name: "Brown Eggs", image: "/eggs.png", cost: 120, category: "eggs", discount: "15%", rating: 4.3, measurement: "12 pcs", isFeatured: true },
                            { name: "Wheat Flour", image: "/flour.jpg", cost: 80, category: "baking", rating: 4.1, measurement: "1kg", isFeatured: false },
                            { name: "Baking Powder", image: "/Baking.png", cost: 50, category: "baking", rating: 4.0, measurement: "100g", isFeatured: false },
                            { name: "Cheddar Cheese", image: "/cheddar.png", cost: 250, category: "cheese", discount: "10%", rating: 4.7, measurement: "200g", isFeatured: true },
                            { name: "Apples", image: "/apples.png", cost: 180, category: "fresh fruit", rating: 4.4, measurement: "1kg", isFeatured: false },
                            { name: "Bananas", image: "/bananas.png", cost: 70, category: "fresh fruit", rating: 4.3, measurement: "1 dozen", isFeatured: false },
                            { name: "Chicken Breast", image: "/chicken.png", cost: 320, category: "meat", discount: "8%", rating: 4.6, measurement: "500g", isFeatured: true },
                            { name: "Mutton", image: "/mutton.png", cost: 600, category: "meat", rating: 4.5, measurement: "500g", isFeatured: false },
                            { name: "Whole Milk", image: "/milk2.png", cost: 65, category: "milk", discount: "5%", rating: 4.2, measurement: "1L", isFeatured: false },
                            { name: "Almond Milk", image: "/almondmilk.png", cost: 150, category: "milk", rating: 4.4, measurement: "1L", isFeatured: false },
                            { name: "Organic Honey", image: "/honey1.png", cost: 100, category: "honey", discount: "12%", rating: 4.8, measurement: "250g", isFeatured: true },
                            { name: "Red capsicum", image: "/capsicum", cost: 50, category: "vegetable", discount: "10%", rating: 4.5, measurement: "250g", isFeatured: false },
                            { name: "Fish", image: "/fish.jpg", cost: 50, category: "seafood", discount: "10%", rating: 4.5, measurement: "500g", isFeatured: false },
                            { name: "Orange", image: "/orange", cost: 50, category: "fresh fruit", discount: "10%", rating: 4.5, measurement: "1kg", isFeatured: false },
                            { name: "Eclair", image: "/eclair", cost: 50, category: "baking", discount: "10%", rating: 4.5, measurement: "6 pcs", isFeatured: false },
                            { name: "Raw minced meat", image: "/raw minced meat.png", cost: 50, category: "meat", discount: "10%", rating: 4.5, measurement: "500g", isFeatured: false }
                        ])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user_js_1.Stores.insertMany([
                            { name: "Grubnest Bengaluru Central", location: { type: "Point", coordinates: [77.5946, 12.9716] }, serviceRadiusKm: 12 },
                            { name: "Grubnest Hyderabad Hub", location: { type: "Point", coordinates: [78.4867, 17.3850] }, serviceRadiusKm: 15 },
                            { name: "Grubnest Chennai Central", location: { type: "Point", coordinates: [80.2707, 13.0827] }, serviceRadiusKm: 12 },
                            { name: "Grubnest Kochi Store", location: { type: "Point", coordinates: [76.2673, 9.9312] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Trivandrum Store", location: { type: "Point", coordinates: [76.9366, 8.5241] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Coimbatore Store", location: { type: "Point", coordinates: [76.9558, 11.0168] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Madurai Store", location: { type: "Point", coordinates: [78.1198, 9.9252] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Vizag Store", location: { type: "Point", coordinates: [83.2185, 17.6868] }, serviceRadiusKm: 12 },
                            { name: "Grubnest Vijayawada Store", location: { type: "Point", coordinates: [80.6480, 16.5062] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Tirupati Store", location: { type: "Point", coordinates: [79.4192, 13.6288] }, serviceRadiusKm: 8 },
                            { name: "Grubnest Bengaluru North", location: { type: "Point", coordinates: [77.5806, 13.0358] }, serviceRadiusKm: 12 },
                            { name: "Grubnest Bengaluru South", location: { type: "Point", coordinates: [77.5736, 12.9063] }, serviceRadiusKm: 12 },
                            { name: "Grubnest Hyderabad Secunderabad", location: { type: "Point", coordinates: [78.5000, 17.4399] }, serviceRadiusKm: 14 },
                            { name: "Grubnest Gachibowli", location: { type: "Point", coordinates: [78.3498, 17.4401] }, serviceRadiusKm: 12 },
                            { name: "Grubnest Chennai North", location: { type: "Point", coordinates: [80.2785, 13.1231] }, serviceRadiusKm: 12 },
                            { name: "Grubnest Chennai South", location: { type: "Point", coordinates: [80.2209, 12.9428] }, serviceRadiusKm: 12 },
                            { name: "Grubnest Coimbatore East", location: { type: "Point", coordinates: [76.9895, 11.0336] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Salem", location: { type: "Point", coordinates: [78.1460, 11.6643] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Trichy", location: { type: "Point", coordinates: [78.7047, 10.7905] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Tirunelveli", location: { type: "Point", coordinates: [77.7274, 8.7139] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Mangaluru", location: { type: "Point", coordinates: [74.8560, 12.9141] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Udupi", location: { type: "Point", coordinates: [74.7421, 13.3409] }, serviceRadiusKm: 8 },
                            { name: "Grubnest Mysuru", location: { type: "Point", coordinates: [76.6394, 12.2958] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Kozhikode", location: { type: "Point", coordinates: [75.7804, 11.2588] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Thrissur", location: { type: "Point", coordinates: [76.2144, 10.5276] }, serviceRadiusKm: 10 },
                            { name: "Grubnest Central India Store", location: { type: "Point", coordinates: [79.08886, 21.14663] }, serviceRadiusKm: 100 }
                        ])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, mongoose_1.default.connection.close()];
                case 4:
                    _a.sent();
                    console.log("Data inserted and connection closed");
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
main();
