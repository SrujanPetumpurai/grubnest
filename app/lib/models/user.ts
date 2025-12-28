import mongoose from 'mongoose'
import { unique } from 'next/dist/build/utils';

let user_Schema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    address:{ 
      type:{
        type:String,
        enum:['Point'],
        default: 'Point',
        required:true
      },
      coordinates:{
      type: [Number],
      required: true
    },
      location:{type:String,required:false}
    }
})

user_Schema.index({ address: '2dsphere' })
export const Users = mongoose.models.Users || mongoose.model('Users', user_Schema);



const item_Schema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        cost: { type: Number, required: true, min: 0 },
        category: { type: String, required: true, trim: true },
        discount:{type:String,required:false},
        rating:{type:Number},
        measurement:{type:String,required:true}
});

export const Items = mongoose.models.Items || mongoose.model('Items',item_Schema);


const reviewSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Items', required: true },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'Users',requried:true},
    comment: { type: String, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
  });
  export const Reviews = mongoose.models.Reviews || mongoose.model('Reviews', reviewSchema);


  const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    items:[{
      itemId:{type:mongoose.Schema.Types.ObjectId,ref:'Items',required:true},
      quantity:{type:Number,required:true,default:0}
    }],
    createdAt: { type: Date, default: Date.now },
  });

  
  export const Cart = mongoose.models.Cart || mongoose.model('Cart',cartSchema)
  
  