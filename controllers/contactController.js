const asyncHanldler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route Get /api/contacts
//@access private

const getContacts = asyncHanldler(async (req, res) => {
  const contacts = await Contact.find({
    user_id: req.user.id
  });
  res.status(200).json(contacts);
});

//@desc Createc new contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHanldler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are Mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});

//@desc get contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHanldler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

//@desc Update contacts
//@route PUT /api/contacts
//@access private

const updateContact = asyncHanldler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Cannot Found");
  }
  if(contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesnt have permission to update other users contacts");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts
//@access pulic

const deleteContact = asyncHanldler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact) {
    res.status(404);
    throw new Error("Contact not found")
  }
  if(contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesnt have permission to update other users contacts");
  }
  await Contact.deleteOne({
    _id: req.params.id
  });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact,
};
