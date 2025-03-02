# **User Authentication Service**

A microservice for handling user authentication in the **Workout App**. This service provides endpoints for user registration, login, and JWT-based authentication.

---

## **Features**

- **User Registration**:
  - Create a new user with a unique email and username.
  - Password hashing using bcrypt.

- **User Login**:
  - Authenticate users and generate JWT tokens.
  - Secure token storage and validation.

- **Protected Routes**:
  - Middleware to verify JWT tokens for protected routes.

---

## **Technologies Used**

- **Node.js** with **Express** for the API.
- **TypeORM** for database management.
- **PostgreSQL** for data storage.
- **JWT** for token-based authentication.
- **Bcrypt** for password hashing.

---

## **Setup and Installation**

### **Prerequisites**
- Node.js (v16 or higher)
- PostgreSQL

### **Steps**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Mario-k4/user-auth-fitness.git
   cd user-auth
   
2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    - Create a ```.env``` file in the root directory:
    ```bash
    DB_CONNECTION=postgres
    DB_HOST=localhost
    DB_USERNAME=username
    DB_PASSWORD=password
    DB_NAME=dbname
    DB_PORT=5432
    DB_SYNC=false
    DB_LOGGING=true
    DB_ENTITIES=src/entity/**/*.ts
    ```

4. **Set Up the Database**:

    - Start PostgreSQL and create a database named ```user_auth_fitness```.
    
    - Run migrations using TypeORM:

    ```bash
    npm run typeorm migration:run
    ```
5. **Run the Service**:

    ```bash
    npm run dev
    ```
6. **Access the Service**:

    - The service will be running at ```http://localhost:5432```.

## **API Endpoints**
### **Authentication**
- **Register a new user**:
- ```POST /auth/register``` 

  - Request Body:

  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  - Response:

  ```json
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
  ```
- **Log in an existing user**.
  - ```POST /auth/login```

  - Request Body:

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Get current user details**:
  - ```GET /auth/me```

  - Requires a valid JWT token in the ```Authorization``` header.
  - Response:
  ```json
    {
    "id": 1,
    "username": "john_doe",
    "email" : "john@example.com"
    }
   ```

## **Integration with Other Services**
This service is designed to work with the backend and frontend repositories:

  - The backend service will use this service to authenticate users before allowing access to protected routes.

  - The frontend will use this service to handle user registration, login, and token management.

## **Contributing**
Contributions are welcome! Here's how you can contribute:

  1. Fork the repository.
  2. Create a new branch:

  ```bash
  git checkout -b feature/your-feature-name
  ```
  3. Commit your changes:

  ```bash
  git commit -m "Add your feature"
  ```
  4. Push to the branch:
  
  ```bash
  git push origin feature/your-feature-name
```
  5. Open a pull request.


## **Contact**
If you have any questions or feedback, feel free to reach out:

Mario Cvetanoski - cvetanoski.mario92@gmail.com

GitHub: Mario-k4

