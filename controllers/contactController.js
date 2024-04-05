const asynchHandler = require("express-async-handler")
const Contact = require("../models/contactModel")


//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asynchHandler(async (req, res) => {

    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})

//@desc Create New contacts
//@route POST /api/contacts
//@access private
const createContact = asynchHandler(async (req, res) => {
    console.log("The request body is:", req.body)
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id //From validateTokenHandler
    })
    res.status(201).json(contact)
})

//@desc Get contact
//@route Get /api/contacts/:id
//@access private
const getContact = asynchHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asynchHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User do not have permission to update other user contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asynchHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User do not have permission to delete other user contacts")
    }

    //await Contact.deleteOne()
    await Contact.deleteOne({ _id: req.params.id })

    res.status(200).json(contact)
})


module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}