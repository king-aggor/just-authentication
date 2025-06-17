# Just Authentication API

A simple, secure authentication API built with Node.js, TypeScript, and Express. This API provides user registration and login functionality with JWT token-based authentication, password hashing, and data validation.

## 🚀 Features

- **User Registration**: Secure signup with email and optional username
- **User Login**: Login with email/username and password
- **JWT Authentication**: Token-based authentication with 1-day expiration
- **Password Security**: Bcrypt hashing with salt rounds
- **Data Validation**: Comprehensive input validation for all endpoints
- **Redis Storage**: In-memory data storage using Redis mock
- **TypeScript**: Full TypeScript support with strict type checking
- **CORS Enabled**: Cross-origin resource sharing support
- **Error Handling**: Custom error handling with appropriate HTTP status codes
- **Logging**: Request logging with Morgan middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/king-aggor/just-authentication.git
   cd just-authentication
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PORT=3035
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on port 3035 (or the port specified in your `.env` file).

## 📚 API Endpoints

### Base URL

```
http://localhost:3035/api/auth
```

### 1. User Registration

**POST** `/signup`

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "userName": "johndoe", // optional
  "password": "password123"
}
```

**Response (201 Created):**

```json
{
  "message": "Sign up successfull",
  "userData": {
    "email": "user@example.com",
    "userName": "johndoe",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules:**

- Email and password are required
- Email must be in valid format
- Password must be at least 6 characters
- Username is optional but must be a string if provided
- Email must be unique
- Username must be unique (if provided)

### 2. User Login

**POST** `/login`

Authenticate an existing user.

**Request Body:**

```json
{
  "email": "user@example.com", // or use userName
  "userName": "johndoe", // or use email
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "message": "Login successfull",
  "userData": {
    "username": "johndoe",
    "email": "user@example.com"
  },
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation Rules:**

- Either email or username is required
- Password is required
- Password must be at least 6 characters
- User must exist in the system
- Password must match the stored hash

## 🔧 Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Validation errors
- **401 Unauthorized**: Wrong password
- **404 Not Found**: User does not exist
- **409 Conflict**: Email or username already exists
- **500 Internal Server Error**: Server-side errors

**Error Response Format:**

```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

## 🏗️ Project Structure

```
just-authentication/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Entry point and server launcher
│   ├── middlewares/
│   │   └── validation.ts      # Input validation
│   ├── routes/
│   │   └── authentication.ts  # Route definitions
│   ├── services/
│   │   └── authentication.ts  # Business logic
│   ├── utils/
│   │   ├── bcrypt.ts          # Password hashing utilities
│   │   ├── jwt.ts             # JWT token utilities
│   │   └── error.ts           # Custom error class
│   └── types/                 # TypeScript type definitions
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 Security Features

- **Password Hashing**: Bcrypt with 10 salt rounds
- **JWT Tokens**: Secure token generation with HS256 algorithm
- **Input Validation**: Comprehensive validation for all inputs
- **CORS Protection**: Configurable cross-origin settings
- **Error Sanitization**: Safe error messages without exposing internals

## 🛠️ Development

### Available Scripts

- `npm run dev`: Start development server with nodemon
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Start production server
- `npm test`: Run tests (not implemented yet)

## 📦 Dependencies

### Production Dependencies

- `express`: Web framework
- `bcrypt`: Password hashing
- `jsonwebtoken`: JWT token handling
- `redis-mock`: In-memory data storage
- `cors`: Cross-origin resource sharing
- `morgan`: HTTP request logging
- `dotenv`: Environment variable management

### Development Dependencies

- `typescript`: TypeScript compiler
- `@types/*`: TypeScript type definitions
- `nodemon`: Development server with auto-restart
- `ts-node`: TypeScript execution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Emmanuel Agggor**

- GitHub: [@king-aggor](https://github.com/king-aggor)

## 🐛 Issues

If you find any bugs or have feature requests, please open an issue on the [GitHub repository](https://github.com/king-aggor/just-authentication/issues).

---

**Note**: This API uses Redis mock for data storage, which means data is stored in memory and will be lost when the server restarts. For production use, consider implementing a persistent database like PostgreSQL, MongoDB, or a real Redis instance.
