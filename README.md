Flight Service API
This project is a backend service for managing flight bookings, built using Node.js, Express, and Sequelize ORM. The API provides various endpoints to create, retrieve, and manage flights and bookings.

Features
- Create and manage flights.
- Book and manage seat availability.
- Update or cancel flight bookings.
- Transactions to ensure seat updates are consistent.

Technologies Used
- Node.js: Server-side runtime.
- Express: Web framework for handling HTTP requests.
- Sequelize: ORM for database interactions.
- MySQL: Relational database for storing flight and booking information.

API Endpoints
- POST /api/v1/flights: Create a new flight.
- GET /api/v1/flights: Retrieve all available flights.
- GET /api/v1/flights/:id: Retrieve details of a specific flight.
- PATCH /api/v1/flights/:id/seats: Update seat availability for a flight.
- POST /api/v1/bookings: Create a new booking.
