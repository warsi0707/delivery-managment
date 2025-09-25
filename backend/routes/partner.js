const express = require('express')
const { Order } = require('../DB/schema')
const { authChecker } = require('../Middleware/authChecker')
const partnerRoute = express.Router()

partnerRoute.get("/orders", authChecker, async (req, res) => {
    try {
        const orders = await Order.find({ assignTo: req.user.id }).populate('assignBy assignTo', 'username email role')
      
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "Orders not found" })
        }
        res.status(200).json({ orders })
    }catch(error){
        res.status(404).json({ error: "Orders not found" })
    }
})

partnerRoute.put("/update-order/:id", authChecker, async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
        const order = await Order.findByIdAndUpdate(id, { status: status })
        if (!order) {
            return res.status(404).json({ error: "Order not found" })
        }
        res.status(200).json({
            order: order,
            message: "Order updated successfully"
        })
    }catch(error){
        res.status(404).json({ error: "Order not found" })
    }
})

module.exports = {
    partnerRoute
}