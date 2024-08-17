const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    prenom: String,
    email: String,
    password: String,
    address: {
        type:String,
        default:""},
    tel: {
        type:String,
        default:""},
    role:{
        type: Number,
        default:0,
    },

},{timestamps :true})

const FournisseurSchema = new mongoose.Schema({
    code: {
        type: Number,
    },
    libelle: String,
    address: String,
    tel: String,
    fax: String,
    email:String,
    status:{
        type: Number,
        default:0,
    },
    role:{
        type: Number,
        default:1,
    },
},{timestamps :true})

const ClientSchema = new mongoose.Schema({
    code: {
        type: Number,
    },
    libelle: String,
    address: String,
    tel: String,
    fax: String,
    user: UserSchema
},{timestamps :true})

const CategorySchema = new mongoose.Schema({
    code:{
        type:Number,
    },
    libelle: String,
    email:String,
    subnum:{type:Number, default:0},
    productnum:{type:Number, default:0},
})
const SubCategorySchema = new mongoose.Schema({
    code:{
        type:Number,
    },
    libelle:String,
    category:String,
    email:String,
    productnum:{type:Number, default:0},
})


const ProductSchema = new mongoose.Schema({
    code:Number,
    name: String,
    category: String,
    subcategory:String,
    price: Number,
    purchasePrice: Number,
    sellPrice: Number,
    tva:Number,
    description: String,
    quantity:String,
    images: [String],
    email: {
        type: String,
        required: true,
    },
    storeName:String
})

const CartSchema = new mongoose.Schema({
    code : Number,
    userEmail : {type: String},
    products: [
        {
            productId: {
                type:String,
            },
            productName : String,
            quantity: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
            },
            storeName:{
                type:String,
            }
        },
    ],
    totalPriceTTC : Number,
    totalPriceTHT : Number,
    totalPriceTVA : Number,
    totalQuantity : {
        type: Number,
        default: 1,
    },
    status: {type: String, default: "active"},
},
    { timestamps: true })


const OrderSchema = new mongoose.Schema({
    code : Number,
    userEmail : {type: String},
    shoppingCartId : String,
    orderDate : Date,
    deliveryDate :Date,
    name: String,
    tel: String,
    region: String,
    ville: String,
    address: String,
    paymentMethod: String,
    status : {type: String, default:"En Attente"}
})

const UserModel = mongoose.model("users", UserSchema)

const SupplierModel = mongoose.model("supplier",FournisseurSchema)

const ProductModel = mongoose.model("products", ProductSchema)

const CategoryModel = mongoose.model("categories", CategorySchema)

const SubCategoryModel = mongoose.model("subcategory", SubCategorySchema)

const CartModel = mongoose.model("shoppingCarts", CartSchema)

const OrderModel = mongoose.model("order",OrderSchema)

module.exports = { UserModel, ProductModel, SupplierModel, CategoryModel, SubCategoryModel, CartModel, OrderModel };