const express = require('express')
const { User, Order } = require('../DB/schema')
const { authChecker } = require('../Middleware/authChecker')
const adminRoute = express.Router()

adminRoute.post("/create-order", authChecker, async (req, res) => {
    const { title, pickupLocation, dropLocation, assignTo,status } = req.body
    try {
        if (!title || !pickupLocation || !dropLocation || !assignTo) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const admin = await User.findById(req.user.id)
        
        if(admin.role !== 'ADMIN'){
            return res.status(400).json({ error: "You are not authorized to create an order" })
        }
        const findParter = await User.findOne({ username: assignTo })
       
        if (!findParter) {
            return res.status(400).json({ error: "Partner not found" })
        }
        const newOrder = await Order.create({
            title,
            pickupLocation,
            dropLocation,
            assignTo: findParter._id,
            assignBy: req.user.id,
            staus: status
        })
        res.status(200).json({ message: "Order created successfully" })
        // const order = await Order.create({title, pickupLocation, dropLocation,assignTo: findParter._id})
        // res.status(200).json({order})
    } catch (error) {
        res.status(404).json({ error: "Order not created" })
    }

})
adminRoute.get("/orders", authChecker, async (req, res) => {
    try {
        const orders = await Order.find({ assignBy: req.user.id }).populate('assignBy assignTo')
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                error: "Orders not found",
                orders: []
            })
        }
        res.status(200).json({ orders })
    } catch (error) {
        res.status(404).json({ error: "Orders not found" })
    }
})

adminRoute.put("/update-order/:id", authChecker, async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
        const order = await Order.findByIdAndUpdate(id, { staus: status }, { new: true })
        if (!order) {
            return res.status(404).json({ error: "Order not found" })
        }
        res.status(200).json({
            order: order,
            message: "Order updated successfully"
        })
    } catch (error) {
        res.status(404).json({ error: "Order not updated" })
    }
})

adminRoute.get("/orders/:id", authChecker, async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findById(id).populate('assignTo', 'username email role')
        if (!order) {
            return res.status(404).json({ error: "Order not found" })
        }
        res.status(200).json({ order })
    } catch (error) {
        res.status(404).json({ error: "Order not found" })
    }
})

adminRoute.delete("/delete-order/:id", authChecker, async (req, res) => {
    const { id } = req.params
    try{
        const order = await Order.findByIdAndDelete(id)
    if (!order) {
        return res.status(404).json({ error: "Order not found" })
    }
    res.status(200).json({ message: "Order deleted successfully" })
    }catch(error){
        res.status(404).json({ error: "Order not deleted" })
    }
})

adminRoute.get("/partners", authChecker, async (req, res) => {
    try {
        const partners = await User.find({ role: 'PARTNER' }).select('username')
    if (!partners || partners.length === 0) {
        return res.status(404).json({ error: "Partners not found" })
    }
    res.status(200).json({ partners })
    }catch(error){
        res.status(404).json({ error: "Partners not found" })
    }
})
adminRoute.get("/order/:id", authChecker, async(req, res)=>{
    const {id} = req.params;
    try{
        const order = await Order.findById(id).populate('assignBy assignTo', 'username email role')
        if(!order && order.length ==0){
            return res.status(404).json({
                error: "Order not found",
                order: []
            })
        }
        res.json({
            order: order
        })
    }catch(error){
        res.status(404).json({
            error: error
        })
    }
})



module.exports = {
    adminRoute
}