# Contact Management Application

## Project Description

The Contact Management App is a full-stack web application designed to help users manage their contacts efficiently. The application allows users to add, view, and store contact information such as name, email, phone number, company, and job title.

### Technologies Used:
- **Frontend**: ReactJS with Material-UI for the user interface.
- **Backend**: Node.js with Express for the API and MongoDB as the database.
- **Database**: MongoDB (cloud-based, MongoDB Atlas).

## Features:
- **Add Contact**: Users can add new contacts with details like name, email, phone number, etc.
- **View Contacts**: A table displays all the stored contacts in the database.
- **Backend API**: RESTful API for managing contacts (CRUD operations).

---

## Setup Instructions

### Prerequisites:
- **Node.js** and **npm** (Node Package Manager) installed.
- **MongoDB Atlas Account** (for the cloud database).
- **React Development Tools** (for frontend development).

### Steps to Run the Project Locally:

1. **Clone the Repository**: Clone this repository to your local machine using Git:

    ```bash
    git clone https://github.com/NikunjDwivedi/Contact-Management.git
    cd contact-management
    ```

2. **Install Dependencies**:
    - **Backend**: Navigate to the `backend` directory and install the required packages:

    ```bash
    cd backend
    npm install
    ```

    - **Frontend**: Navigate to the `frontend` directory and install the React dependencies:

    ```bash
    cd ../frontend
    npm install
    ```
    
3. **Build the React App**:
    - In the `frontend` directory, run:

    ```bash
    npm run build
    ```

    This will generate the optimized production build.

4. **Start the Server**:
    - Navigate to the `backend` directory and run the server:

    ```bash
    cd ../backend
    node server.js
    ```

    The backend should now be running on `http://localhost:5000`.

5. **Run the Frontend**:
    - In the `frontend` directory, start the React development server:

    ```bash
    npm start
    ```

    The frontend will be accessible at `http://localhost:3000`.

---

## Database Schema

### Contact Schema:

The MongoDB schema for storing contact information is defined as follows:

```js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
```

## Major Technical Decisions

1. **React for Frontend**:
    - I used React because of its flexibility, component-based structure, and the vast ecosystem of libraries available, such as Material-UI for styling.
    - React's `useState` and `useEffect` hooks were used for managing state and side effects respectively.

2. **Node.js with Express for Backend**:
    - Express was chosen because it simplifies the process of building RESTful APIs with minimal setup.
    - The API uses `cors` for handling cross-origin requests, allowing communication between the frontend and backend.

3. **MongoDB for Database**:
    - MongoDB was chosen because of its flexible schema design, which is perfect for storing dynamic contact information. MongoDB Atlas was used for cloud hosting.

4. **Environment Variables**:
    - Sensitive information like the MongoDB connection string is stored in environment variables for security, using a `.env` file.

---


## Challenges and Solutions

### Challenge 1: **Serving React Build with Express**

- The first challenge was ensuring that the React app was properly served with Express once built. I had to configure the `express.static` middleware to point to the correct build folder.

**Solution**:

- I made sure the build folder from the React app was copied to the `backend/client` directory and configured Express to serve it correctly:

```js
app.use(express.static(path.join(__dirname, 'client/build')));
```

### Challenge 2: **MongoDB Connection Issues**

- Initially, I faced issues with connecting to MongoDB Atlas due to incorrect configuration of the connection URI.

**Solution**:

- I reviewed the MongoDB connection string format and ensured the URI was correct. I also ensured the database name in the URI matched the one in MongoDB Atlas.

### Challenge 3: **Handling CORS**

- CORS errors occurred while trying to fetch data from the backend in the frontend.

**Solution**:

- I installed and used the `cors` middleware in the Express app to handle CORS headers and allow requests from the frontend:

```js
const cors = require('cors');
app.use(cors());
```
---

## Conclusion

This app is a simple but powerful way to manage contact information. By combining React for the frontend and Node.js/Express for the backend, it provides a clean, scalable solution. MongoDB Atlas offers a robust and flexible database solution, and deploying the app to Render makes the deployment process seamless.

