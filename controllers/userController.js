const asynchHandler=require("express-async-handler")

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asynchHandler(async (req, res) => {
    res.json({ message: "Register the user" })
})

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asynchHandler(async (req, res) => {
    res.json({ message: "Login user" })
})

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asynchHandler(async (req, res) => {
    res.json({ message: "Current user infomation" })
})

module.exports = { registerUser, loginUser, currentUser }