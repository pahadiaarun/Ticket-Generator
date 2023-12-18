# Ticket Generator App

This is a full-stack application that allows users to generate and download movie tickets with a unique booking ID. The application consists of a Node.js backend for ticket generation and a React.js frontend for user interaction.

## Features
**Backend (Node.js):**
- Accepts movie details via a POST request.
- Generates a unique booking ID with a specific format.
- Creates a ticket image incorporating movie details and the booking ID.
- Sends the ticket image back to the frontend for download.

**Frontend (React.js):**
- Provides a user-friendly form to enter movie details.
- Makes a POST request to the backend to generate the ticket.
- Displays the generated ticket with a unique booking ID.
- Allows users to download the generated ticket.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ticket-generator-app.git
   cd ticket-generator-app
   ```

2. Install dependencies:

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Usage

1. Start the backend server:

   ```bash
   # Inside the backend directory
   node index.js
   ```

   The backend server will run on `http://localhost:5000`.

2. Start the frontend application:

   ```bash
   # Inside the frontend directory
   npm start
   ```

   The React development server will run on `http://localhost:3000`.

3. Open your browser and go to `http://localhost:3000` to access the application.
