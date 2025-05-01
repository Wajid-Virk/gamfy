# Gamfy - Game Discovery Platform

A full-stack MERN application for discovering and exploring video games. Built with MongoDB, Express.js, React.js, and Node.js.

## Features

- Game search and filtering
- Light & dark mode
- User authentication with JWT
- Personalized dashboard
- Global state management with Redux Toolkit
- Infinite scrolling
- Responsive design
- Performance optimized

## Tech Stack

- Frontend: React.js, Redux Toolkit
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Styling: Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

## Environment Setup

1. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

2. Create a `.env` file in the frontend directory with:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

This will start both the frontend and backend servers concurrently.

## Project Structure

```
gamfy/
├── frontend/          # React frontend
├── backend/           # Node.js backend
└── package.json       # Root package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 