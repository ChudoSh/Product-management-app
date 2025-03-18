# NodeTask - Product Management System

## Overview

NodeTask is a modern product management application built with Node.js that provides a RESTful API for managing products and users. The system uses a dual-database architecture with MySQL for primary data storage and MongoDB for optimized search capabilities.

### Key Features

- RESTful API for product and user management
- Dual database architecture (MySQL + MongoDB)
- JWT authentication and authorization
- Input validation and error handling
- Advanced search with filtering and pagination
- Dockerized deployment

## Architecture

NodeTask employs a dual-database architecture:

```
Client → Express → Router → Controller → Model → MySQL/MongoDB
```

- **MySQL**: Primary database for CRUD operations
- **MongoDB**: Optimized for text search functionality
- **Synchronization**: Products are automatically synced between databases

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- Git

### Quick Start

1. Clone the repository
2. Create `.env` file with required configurations
3. Run `docker-compose up --build`
4. Access at `http://localhost:5001`

### Environment Variables

```
PORT=5001
CORS_ORIGIN=http://localhost:5173
MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASSWORD=password
DATABASE_NAME=nodetask
TABLES_SQL=./database/dbSetup.sql
MONGODB_URI=mongodb://mongodb:27017
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

## API Reference

### User Endpoints

| Method | Endpoint             | Description       | Auth Required |
|--------|----------------------|-------------------|---------------|
| POST   | /api/users/register  | Register user     | No            |
| POST   | /api/users/login     | Login user        | No            |
| GET    | /api/users/profile   | Get user profile  | Yes           |

### Product Endpoints

| Method | Endpoint                | Description       | Auth Required |
|--------|-------------------------|-------------------|---------------|
| GET    | /api/products           | List products     | No            |
| GET    | /api/products/:id       | Get product by ID | No            |
| POST   | /api/products           | Create product    | Yes           |
| PUT    | /api/products/:id       | Update product    | Yes           |
| DELETE | /api/products/:id       | Delete product    | Yes           |
| GET    | /api/products?search=true&q=keyword | Search products | No |

### Example: Search Products

```http
GET /api/products?search=true&q=headphones&minPrice=100&maxPrice=300&sort=price_asc
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Noise-Cancelling Headphones",
      "description": "Premium over-ear headphones...",
      "price": 249.99,
      "created_at": "2023-06-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

## Database Structure

### MySQL Tables

```sql
-- Users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_NameDesc (name, description(255))
);
```

### MongoDB Collections

Products collection with text search indexes on name and description fields.

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Token Generation**: Created during registration/login
2. **Token Validation**: Via `authenticate` middleware
3. **Protected Routes**: Require valid JWT in Authorization header

JWT configuration is managed through environment variables:
- `JWT_SECRET`: Signing key
- `JWT_EXPIRES_IN`: Token lifetime (default: 24h)

## Error Handling

### Error Classes
- **AppError**: Base class with status code
- **ValidationError**: Input validation issues (400)
- **AuthenticationError**: Auth failures (401)
- **NotFoundError**: Resource not found (404)
- **DatabaseError**: DB operation failures (500)

### Standard Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Optional specific error details"]
}
```

Validation middleware functions ensure data integrity across all endpoints.

## Search Functionality

The `SearchService` class provides advanced product search using MongoDB:

- **Text Search**: Full-text search across product data
- **Price Filtering**: Set min/max price ranges
- **Sorting Options**: By price or date (asc/desc)
- **Pagination**: Configurable limits with metadata

Query parameters:
- `q`: Search term
- `minPrice`/`maxPrice`: Price range
- `sort`: Sorting option (price_asc, price_desc, date_asc, date_desc)
- `page`/`limit`: Pagination controls

## Project Structure

```
Backend/
├── config/                  # Configuration files
│   ├── auth.js              # JWT auth config
│   └── db/                  # Database setup
├── controllers/             # Request handlers
├── database/                # Schema definitions
├── middleware/              # Middleware functions
├── models/                  # Data models
├── routes/                  # API routes
├── services/                # Business logic
├── utils/                   # Utilities
├── dockerfile               # Docker config
└── server.js                # Entry point
```

## Development Notes

### Code Standards
- ES Modules syntax
- Class-based models with private fields (#)
- Async/await for async operations
- Consistent error handling with try/catch

### Adding Features
- Add route → Create controller → Add validation
- Models use static methods for DB operations
- Update DB schemas when necessary

## Deployment

Docker-based deployment:

```bash
# Start services
docker-compose up --build

# Background mode
docker-compose up -d

# Stop services
docker-compose down
```

## Troubleshooting

### Common Issues

1. **Database Connection**
   - Check credentials in .env file
   - Verify database services are running

2. **Authentication**
   - Ensure JWT_SECRET is properly set
   - Check Authorization header format

3. **Search Issues**
   - Verify MongoDB connection
   - Check text index configuration

---

*Documentation generated on March 18, 2025*
