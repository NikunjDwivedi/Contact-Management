const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();


router.post('/', async (req, res) => {
  console.log("Request Body:", req.body); // Log request body
  try {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const newContact = new Contact({ firstName, lastName, email, phone, company, jobTitle });
    await newContact.save();
    console.log("New Contact Saved:", newContact); // Log saved contact

    res.status(201).json({ message: 'Contact added successfully', contact: newContact });
  } catch (error) {
    console.error("Error adding contact:", error); // Log error details
    res.status(500).json({ message: 'Error adding contact', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'firstName';

    const contacts = await Contact.find()
      .sort({ [sortBy]: 1 }) // Sort by field in ascending order
      .skip((page - 1) * limit) // Skip for pagination
      .limit(limit); // Limit for pagination

    const total = await Contact.countDocuments(); // Total number of contacts

    res.status(200).json({ contacts, total, page });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

module.exports = router;