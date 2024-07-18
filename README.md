# Full-Stack (MERN) Chatbot with Backend Focus (07/2024)
 
 _(Will soon be deployed)_

This project was developed as part of the backend module final project in the Full Stack Web Development course at DCI. It is a Fullstack (MERN) chat bot application with a focus on the backend. This README file explains the setup and features of the project in detail.

**Note:** The chatbot functionality is powered by **ChatGPT** for natural language processing.

## Table of Contents
- Features
- Installation
- Technologies Used
- Screenshots

## Features

### Registration
- **Trimming:** Remove whitespace from both ends of this input.
- **Validation:** Ensure input meets required formats and rules.
- **Google reCAPTCHA:** Prevent automated registrations.
- **Hashing:** Securely store user passwords.
- **Confirmation Email:** Send a confirmation mail about the registration.

### Login
- **Hashing Check:** Validate password by comparing hashes.
- **Authentication with JWT:** Use JSON Web Tokens for user sessions.
- **Access Token:** Store access token in cookies upon login.

### Chat GPT API Integration
- **Input Limitations:** Enforce maximum input length.
- **Spam Prevention:** Disable input until a response is received.
- **Empty Input Check:** Ensure input is not empty.
- **Sanitization:** Trim input and sanitize HTML on the server.
- **Response Limitation:** Use hidden prompt to restrict response to under 5 words.
- **Traffic Reduction:** Limit response tokens with `max tokens`.
- **Message Limit:** Disable input after 5 messages per user in the database.

### Database Relations
- **Conversation-User Relationship:** Establish a one-to-many relationship between users and conversations using parent reference.

### User Management
- **Edit User:** Allow users to update their email addresses.
- **Delete User:** Enable users to delete their accounts and associated conversations.

### Logout
- **Token Removal:** Delete access token from cookies on logout.

## Installation

### Prerequisites
- Node.js
- MongoDB
- npm (Node Package Manager)

### Steps
1. Clone the repository (SSH):
    ```sh
    git clone git@github.com:barisbalcimusic/backendFinalProject.git
    cd backendFinalProject
    ```

2. Install dependencies for the backend:
    ```sh
    cd backend
    npm install
    ```

3. Install dependencies for the frontend:
    ```sh
    cd ../frontend
    npm install
    ```

4. Create a `.env` file in the `server` directory and add the following variables:
    ```env
    PORT=your_port
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    APP_PASSWORD=your_app_password_for_gmail
    EMAIL_USER=your_email@example.com
    CAPTCHA_SECRET=your_google_recaptcha_secret
    API_KEY=your_openai_apikey
    ```

5. Start the development server:
    ```sh
    cd ../backend
    npm start
    ```
    
## Technologies Used
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js
- AI Integration: OpenAI API
- Database: MongoDB, Mongoose
- Authentication: JWT, bcrypt
- Email: Nodemailer
- Security: Google reCAPTCHA, sanitize-html

## Screenshots
![Home](https://github.com/barisbalcimusic/backendFinalProject/blob/main/screenshots/Screenshot%20from%202024-07-18%2010-14-56.png)
![Register](https://github.com/barisbalcimusic/backendFinalProject/blob/main/screenshots/Screenshot%20from%202024-07-18%2010-15-46.png)
![Login](https://github.com/barisbalcimusic/backendFinalProject/blob/main/screenshots/Screenshot%20from%202024-07-18%2010-15-14.png)
![Chat](https://github.com/barisbalcimusic/backendFinalProject/blob/main/screenshots/Screenshot%20from%202024-07-18%2010-17-45.png)
![Settings](https://github.com/barisbalcimusic/backendFinalProject/blob/main/screenshots/Screenshot%20from%202024-07-18%2010-18-00.png)


