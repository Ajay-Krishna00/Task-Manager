# Task Manager

## Overview
The **Task Manager** is a full-stack web application that allows users to efficiently manage their tasks. It includes authentication, task organization, and a user-friendly UI for a seamless experience.

## Features
- **User Authentication** (Login & Signup)
- **Task Management** (Add, Edit, Delete, Mark as Completed)
- **Task Organization** (DashBoard, Today, Upcoming, Due, Completed, AllTasks Sections)
- **Supabase Integration for Backend Database**
- **Modern UI with React & Styled Components**
- **Responsive Design**
- **Added dark mode**

## Tech Stack
### **Frontend:**
- React.js 
- Chakra-UI & Styled Components
- React Router for navigation

### **Backend:**
- Node.js & Express.js
- Supabase (Database & Authentication)
- Middleware for Authentication

## Folder Structure

```
task-manager/
│── backend/               # Backend code (Node.js + Express)
│   ├── middleware/        # Middleware functions (Authentication)
│   ├── routes/            # API routes (Auth, Tasks, Image Upload)
│   ├── utils/             # Utility functions (Supabase Client)
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   ├── server.js          # Main server file
│
│── src/                   # Frontend code (React.js)
│   ├── components/        # React Components
│   │   ├── Dashboard.jsx  # Main dashboard UI
│   │   ├── Login.jsx      # Login page
│   │   ├── TaskManager.jsx# Task management UI
│   ├── utils/             # Helper functions (API calls, Auth)
│   ├── App.jsx            # Main App file
│   ├── main.jsx           # Entry point
│   ├── style/             # Styling files
│
│── dist/                  # Build files (for deployment)
│── public/                # Static assets
│── package.json           # Frontend dependencies
│── vite.config.js         # Vite configuration
│── README.md              # Project documentation
```

## Installation & Setup
### **1. Clone the Repository**
```sh
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

### **2. Install Dependencies**
#### **Frontend:**
```sh
cd task-manager
npm install  # or yarn install
```
#### **Backend:**
```sh
cd backend
npm install  # or yarn install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the `backend/` directory with the following variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=5000
```

### **4. Start the Application**
#### **Run Backend**
```sh
cd backend
npm start  # or node server.js
```
#### **Run Frontend**
```sh
cd task-manager
npm run dev  # Starts Vite server
```

## Deployment
To deploy the backend, use **Render, Railway, or Vercel (serverless functions)**.
To deploy the frontend, use **Vercel or Netlify**.

## Future Enhancements
- Implement notifications for task reminders
- Enhance UI animations
- Image Upload for Profile Pictures

## Contributing
Feel free to fork this project and submit pull requests.

## License
This project is licensed under the MIT License.

