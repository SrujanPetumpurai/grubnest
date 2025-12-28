import { connectToDB } from "../app/lib/db";
import { Items } from '../app/lib/models/user.js'
import mongoose from "mongoose";
async function main(){
   await connectToDB();
   console.log(mongoose.connection.name)
   await Items.insertMany( [
{ name: "Tomatoes", image: "/tomatoes.png", cost: 60, category: "vegetable", discount: "10%", rating: 4.2, measurement: "1kg" },
{ name: "Spinach", image: "/spinach.png", cost: 40, category: "vegetable", rating: 4.5, measurement: "250g" },
{ name: "Salmon Fillet", image: "/salmon.png", cost: 650, category: "seafood", discount: "5%", rating: 4.8, measurement: "500g" },
{ name: "Prawns", image: "/prawns.jpg", cost: 500, category: "seafood", rating: 4.6, measurement: "500g" },
{ name: "Brown Eggs", image: "/eggs.png", cost: 120, category: "eggs", discount: "15%", rating: 4.3, measurement: "12 pcs" },
{ name: "Wheat Flour", image: "/flour.jpg", cost: 80, category: "baking", rating: 4.1, measurement: "1kg" },
{ name: "Baking Powder", image: "/Baking.png", cost: 50, category: "baking", rating: 4.0, measurement: "100g" },
{ name: "Cheddar Cheese", image: "/cheddar.png", cost: 250, category: "cheese", discount: "10%", rating: 4.7, measurement: "200g" },
{ name: "Apples", image: "/apples.png", cost: 180, category: "fresh fruit", rating: 4.4, measurement: "1kg" },
{ name: "Bananas", image: "/bananas.png", cost: 70, category: "fresh fruit", rating: 4.3, measurement: "1 dozen" },
{ name: "Chicken Breast", image: "/chicken.png", cost: 320, category: "meat", discount: "8%", rating: 4.6, measurement: "500g" },
{ name: "Mutton", image: "/mutton.png", cost: 600, category: "meat", rating: 4.5, measurement: "500g" },
{ name: "Whole Milk", image: "/milk2.png", cost: 65, category: "milk", discount: "5%", rating: 4.2, measurement: "1L" },
{ name: "Almond Milk", image: "/almondmilk.png", cost: 150, category: "milk", rating: 4.4, measurement: "1L" },
{ name: "Organic Honey", image: "/honey1.png", cost: 100, category: "honey", discount: "12%", rating: 4.8, measurement: "250g" },
{ name: "Red capsicum", image: "/capsicum", cost: 50, category: "vegetable", discount: "10%", rating: 4.5, measurement: "250g" },
{ name: "Fish", image: "/fish.jpg", cost: 50, category: "seafood", discount: "10%", rating: 4.5, measurement: "500g" },
{ name: "Orange", image: "/orange", cost: 50, category: "fresh fruit", discount: "10%", rating: 4.5, measurement: "1kg" },
{ name: "Eclair", image: "/eclair", cost: 50, category: "baking", discount: "10%", rating: 4.5, measurement: "6 pcs" },
{ name: "Raw minced meat", image: "/raw minced meat.png", cost: 50, category: "meat", discount: "10%", rating: 4.5, measurement: "500g" },

])
    await mongoose.connection.close();
    console.log("Data inserted and connection closed");
    process.exit(0);
}

main();