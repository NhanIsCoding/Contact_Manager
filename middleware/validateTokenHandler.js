const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async (req, res, next) => {
    let token
    let authHeader = req.headers.authorization || req.headers.Authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1] //Get the accessToken
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error("User is not authorized")
            }
            req.user = decoded.user //Add req.user property
            next() // Call next to pass control to the next middleware
        })
    } else {
        res.status(401)
        throw new Error("User is not authorized or token is missing");
    }
})

module.exports = validateToken
