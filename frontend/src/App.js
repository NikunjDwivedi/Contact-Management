import React, { useState, useEffect } from 'react';
import ContactsTable from './components/ContactsTable';
import ContactForm from './components/ContactForm';
import axios from 'axios';

const BASE_URL = "http://localhost:5000";
const API_URL = `${BASE_URL}/contacts`;


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  // Fetch contacts from the API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("Fetched contacts:", response.data);
        setContacts(response.data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };    

    fetchContacts();
  }, []);

  // // Add a new contact
  // const addContact = async (contact) => {
  //   console.log("Adding contact:", contact);
  //   try {
  //     console.log("Contact to add:", contact);
  //     const response = await fetch(API_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(contact),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Failed to add contact: ${response.statusText}`);
  //     }
  //     const data = await response.json();
  //     console.log("Response from backend after adding:", data);
  
  //     // Append the new contact to the existing contacts
  //   setContacts((prevContacts) => [...prevContacts, data]);      
  //   } catch (error) {
  //     console.error("Error adding contact:", error);
  //   }
  // };  

  
const addContact = async (newContact) => {
  try {
    const response = await axios.post('http://localhost:5000/contacts', newContact);
    console.log("Response from backend after adding:", response.data);

    // Extract the contact from the response and append it to the state
    setContacts((prevContacts) => [...prevContacts, response.data.contact]);
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

  // Update an existing contact
  const updateContact = async (id, updatedContact) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContact),
      });

      const data = await response.json();
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === id ? data.contact : contact
        )
      );
      setEditingContact(null);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div>
      <h1>Contact Management</h1>
      <ContactForm
        onSubmit={addContact}
        editingContact={editingContact}
        onUpdate={updateContact}
      />
      <ContactsTable
        contacts={contacts}
        onEdit={(contact) => setEditingContact(contact)}
        onDelete={deleteContact}
      />
    </div>
  );
};

export default App;