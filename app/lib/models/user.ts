import mongoose from 'mongoose'

let user_Schema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    surname:{type:String,required:true},
    phNumber:{type:Number},
    address:{
      houseNo:{
        type:String
      },street:{
        type:String
      },landmark:{
        type:String
      },city:{
        type:String
      },
      state:{
        type:String
      },
      zipcode:{
        type:Number
      },
      deliveryInstruction:{
        type:String
      }
    },
    location:{ 
      type:{
        type:String,
        enum:['Point'],
      },
      coordinates:{
      type: [Number],
    }
    }
})

user_Schema.index({ location: '2dsphere' },{sparse:true})
export const Users = mongoose.models.Users || mongoose.model('Users', user_Schema);



const item_Schema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        cost: { type: Number, required: true, min: 0 },
        category: { type: String, required: true, trim: true },
        discount:{type:String,required:false},
        rating:{type:Number},
        measurement:{type:String,required:true},
        isFeatured:{type:Boolean,required:true}
});

export const Items = mongoose.models.Items || mongoose.model('Items',item_Schema);
item_Schema.index({ isFeatured: 1 });


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


const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },

  items: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Items',
      required: true
    },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true } 
  }],

  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ['created','authorized','failed','captured',],
    default: 'created'
  },
  
  paymentId: { type: String },

  deliveryAddress: {
    type: String,
    required: true
  },
  orderId:{
    type:String,
    required:true
  },
  createdAt: { type: Date, default: Date.now }
});

export const Orders = mongoose.models.Orders || mongoose.model('Orders', orderSchema);

const storeSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  location:{
    type:{
      type:String,
      enum:['Point'],
      require:true
    },
    coordinates:{
      type:[Number],
      required:true
    }
  },
  serviceRadiusKm:{
    type:Number,
    default:10,
    required:true
  }

})

export const Stores = mongoose.models.Stores || mongoose.model('Stores',storeSchema)
storeSchema.index({locatioN:'2dsphere'})