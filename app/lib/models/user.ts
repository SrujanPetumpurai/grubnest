import mongoose from 'mongoose'

let user_Schema = new mongoose.Schema({
    email:{type:String,requried:true},
    password:{type:String,required:true},
    name:{type:String,required:true}
})

export const Users = mongoose.models.Users || mongoose.model('Users', user_Schema);

    const item_Schema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        cost: { type: Number, required: true, min: 0 },
        type: { type: String, required: true, trim: true }
    });

export const Items = mongoose.models.Items || mongoose.model('Items',item_Schema);

const reviewSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Items', required: true },
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
    totalPrice: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  });

  cartSchema.pre('save', async function (next) {
    await this.populate('items.itemId'); 
    this.totalPrice = this.items.reduce((acc, item) => {
       const populatedItem = item.itemId as any;
       const itemCost = populatedItem?.cost || 0;
      return acc + itemCost * item.quantity;
    }, 0);
    next();
  });


  export const Cart = mongoose.models.Cart || mongoose.model('Cart',cartSchema)
  
  