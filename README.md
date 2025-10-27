# TeamPulse – Real-Time Employee Performance Tracker

TeamPulse is a full-stack MERN application designed for tracking employee performance. It allows managers to add, view, edit, and delete employee records, and monitor performance metrics through a modern, responsive dashboard.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Recharts, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **HTTP Client:** Axios

## Project Structure

```
/
├── client/         # React Frontend
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── ...
├── server/         # Node.js/Express Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── README.md
```

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas cloud instance)

### 1. Backend Setup

First, navigate to the server directory and install the required dependencies.

```bash
cd server
npm install
```

Next, you need to create a `.env` file in the `/server` directory. You can copy the example file:

```bash
cp .env.example .env
```

Now, open the `.env` file and add your MongoDB connection URI and a port number.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

### 2. Frontend Setup

The frontend uses an `importmap` in `index.html` to load dependencies from a CDN, so no `npm install` is required for the client.

## Running the Application

You will need two separate terminals to run the backend and frontend servers concurrently.

### 1. Run the Backend Server

In your first terminal, from the `/server` directory, run:

```bash
# This will start the server with nodemon, which automatically restarts on file changes.
npm run server
```

The backend API will be running at `http://localhost:5000`.

### 2. Run the Frontend Client

To run the frontend, you'll need a simple live server. If you have VS Code, the "Live Server" extension is a great option.

1.  Open the project's root folder in VS Code.
2.  Right-click on the `client/index.html` file.
3.  Select "Open with Live Server".

This will open the application in your browser, and it will be connected to your backend API.

