const jwt = require('jsonwebtoken')


function authChecker(req, res, next){
    try{
        const token = req.headers.token
    if(!token){
        return res.status(401).json({error: "Unauthorized"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({error: "Unauthorized"})
    }
    req.user = decoded
    next()
    }catch(error){
        res.status(401).json({error: "Unauthorized"})
    }
}

module.exports = {
    authChecker
}