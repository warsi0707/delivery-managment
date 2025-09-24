const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    role: {type: String, enum: ['ADMIN', 'PARTNER'], default: 'PARTNER'},
    createdAt: {type: Date, default:Date.now}
})
const orderSchema = new mongoose.Schema({
    title: {type: String},
    pickupLocation: {type: String},
    dropLocation: {type: String},
    staus: {type: String, enum: ['PENDING','ASSIGNED', 'DELIVERED'], default: 'PENDING'},
    assignTo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignBy: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cretedAt : {
        type: Date,
        default: Date.now
    }
})

const  User = mongoose.model('User', userSchema)
const Order = mongoose.model("Order", orderSchema)

module.exports = {
    User,
    Order
}