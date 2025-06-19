# Node.js CRUD API with MSSQL

A simple yet robust CRUD (Create, Read, Update, Delete) API built with Node.js, Express.js, and Microsoft SQL Server.

## Features

- Complete CRUD operations for Users
- Input validation using Joi
- Proper error handling and status codes
- Environment-based configuration
- Database connection pooling
- Automatic table creation
- Clean project structure
- CORS support

<!--## Project Structure

```
project-root/
├── config/
│   └── database.js          # Database configuration and connection
├── controllers/
│   └── userController.js    # Request handlers for user operations
├── routes/
│   └── userRoutes.js        # API route definitions
├── models/
│   └── User.js              # Database operations for User entity
├── utils/
│   └── validation.js        # Input validation schemas
├── middleware/
│   └── errorHandler.js      # Global error handling middleware
├── app.js                   # Application entry point
├── package.json            # Project dependencies and scripts
├── .env                    # Environment variables
└── README.md              # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- Microsoft SQL Server
- npm or yarn

## Installation

1. Clone or create the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your database configuration:
   ```env
   DB_SERVER=localhost
   DB_PORT=1433
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_ENCRYPT=true
   DB_TRUST_CERT=true
   PORT=3000
   NODE_ENV=development
   ```

4. Make sure your MSSQL server is running and accessible

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint      | Description           |
|--------|---------------|-----------------------|
| POST   | /users        | Create a new user     |
| GET    | /users        | Get all users         |
| GET    | /users/:id    | Get user by ID        |
| PUT    | /users/:id    | Update user by ID     |
| DELETE | /users/:id    | Delete user by ID     |

### Request/Response Examples

#### Create User
```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

#### Get All Users
```bash
GET /api/users
```

#### Get User by ID
```bash
GET /api/users/1
```

#### Update User
```bash
PUT /api/users/1
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

#### Delete User
```bash
DELETE /api/users/1
```

## Database Schema

The API automatically creates a `Users` table with the following structure:

```sql
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME2 DEFAULT GETDATE()
)
```

## Error Handling

The API includes comprehensive error handling for:
- Validation errors (400)
- Duplicate email addresses (409)
- User not found (404)
- Database connection issues (503)
- Server errors (500)

## Validation Rules

- **Name**: Required, 2-100 characters
- **Email**: Required, valid email format, maximum 255 characters, must be unique

## Health Check

Visit `http://localhost:3000/health` to check if the server is running.

## Environment Variables

- `DB_SERVER`: MSSQL server address
- `DB_PORT`: MSSQL server port (default: 1433)
- `DB_NAME`: Database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_ENCRYPT`: Enable encryption (true/false)
- `DB_TRUST_CERT`: Trust server certificate (true/false)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## License

MIT
