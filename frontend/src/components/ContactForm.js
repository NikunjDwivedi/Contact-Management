import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';

const ContactForm = ({ onSubmit, editingContact, onUpdate }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    if (editingContact) {
      setContact({
        firstName: editingContact.firstName,
        lastName: editingContact.lastName,
        email: editingContact.email,
        phone: editingContact.phone,
        company: editingContact.company,
        jobTitle: editingContact.jobTitle,
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContact) {
      onUpdate(editingContact._id, contact);
    } else {
      onSubmit(contact);
    }
    setContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {['firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle'].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                variant="outlined"
                fullWidth
                value={contact[field]}
                onChange={handleChange}
                name={field}
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactForm;
