# Cash Control API

## Overview
The Cash Control API is a RESTful API designed to manage cash counting and control operations. It includes user authentication, cash counting functionality, and result review capabilities. This API is built using Node.js and Express, and it follows best practices for structuring and documenting the code.

## Features
- User authentication (registration and login)
- Cash counting functionality
- Review and update cash count results
- Swagger documentation for API endpoints

## Technologies Used
- Node.js
- Express
- MongoDB (or any other database of your choice)
- JWT for authentication
- Bcrypt for password hashing
- Swagger for API documentation

## Project Structure
```
cash-control-api
├── src
│   ├── app.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── cashController.js
│   │   └── reviewController.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── cashRoutes.js
│   │   └── reviewRoutes.js
│   ├── models
│   │   ├── user.js
│   │   ├── cashCount.js
│   │   └── review.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── docs
│   │   └── swagger.yaml
│   └── utils
│       └── index.js
├── package.json
├── .env
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd cash-control-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables (e.g., database connection string, JWT secret).
5. Start the application:
   ```
   npm start
   ```

## API Documentation
The API endpoints are documented using Swagger. You can access the documentation by navigating to `/api-docs` after starting the server.

## Endpoints
- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login an existing user

- **Cash Counting**
  - `POST /api/cash/count` - Count cash
  - `GET /api/cash/count` - Retrieve cash count result

- **Review**
  - `POST /api/review` - Review cash count
  - `PUT /api/review` - Update cash count

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.