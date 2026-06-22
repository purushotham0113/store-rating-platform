# Store Rating Platform

A full-stack web application for rating and reviewing stores. Users can browse stores, submit ratings and reviews, and view aggregated store ratings.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- ⭐ **Store Ratings**: View and submit ratings for stores
- 📝 **User Reviews**: Leave detailed reviews with text and star ratings
- 🔍 **Store Search**: Browse and search stores
- 📊 **Rating Analytics**: View aggregated ratings and review statistics
- 👤 **User Profiles**: Manage user accounts and review history
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **React** - UI library
- **JavaScript/ES6+** - Programming language
- **CSS/HTML** - Styling and markup

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (or your preferred database)

### Tools & Deployment
- **npm** - Package manager
- **Git** - Version control

## Project Structure

```
store-rating-platform/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   └── App.js           # Main App component
│   └── package.json
├── backend/                  # Node.js/Express backend
│   ├── routes/              # API routes
│   ├── models/              # Database models
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   └── server.js            # Server entry point
├── package.json             # Root dependencies
└── README.md               # This file
```

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (if using MongoDB, or your database setup)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/purushotham0113/store-rating-platform.git
   cd store-rating-platform
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Setup environment variables**
   
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/store-rating-platform
   NODE_ENV=development
   ```

   Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **In a new terminal, start the frontend**
   ```bash
   cd frontend
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Stores
- `GET /stores` - Get all stores
- `GET /stores/:id` - Get store details
- `POST /stores` - Create a new store (admin)
- `PUT /stores/:id` - Update store (admin)
- `DELETE /stores/:id` - Delete store (admin)

#### Ratings & Reviews
- `GET /stores/:id/reviews` - Get reviews for a store
- `POST /stores/:id/reviews` - Submit a review
- `PUT /reviews/:id` - Update a review
- `DELETE /reviews/:id` - Delete a review

#### Users (if applicable)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile

## Usage

1. **Browse Stores**: Navigate to the home page to see a list of available stores
2. **View Store Details**: Click on a store to see its details, average rating, and reviews
3. **Submit a Review**: Click "Write a Review" and fill in your rating and comments
4. **View Your Reviews**: Access your profile to see all reviews you've submitted

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Questions or Issues?** Feel free to open an issue on GitHub or contact the maintainers.
