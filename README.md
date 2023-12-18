# Ticket Generator App

This is a full-stack application that allows users to generate and download movie tickets with a unique booking ID. The application consists of a Node.js backend for ticket generation and a React.js frontend for user interaction.

## Features
**Backend (Node.js):**
-Accepts movie details via a POST request.
-Generates a unique booking ID with a specific format.
-Creates a ticket image incorporating movie details and the booking ID.
-Sends the ticket image back to the frontend for download.

**Frontend (React.js):**
-Provides a user-friendly form to enter movie details.
-Makes a POST request to the backend to generate the ticket.
-Displays the generated ticket with a unique booking ID.
-Allows users to download the generated ticket.
