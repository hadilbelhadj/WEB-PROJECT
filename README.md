# Research Management API

This is a Spring Boot RESTful API for managing users, roles, articles, domains, and contributions in a research application. It uses JWT-based authentication and MySQL as the database.

## 🔧 Tech Stack

- Java 17
- Spring Boot 3.2.2
- Spring Security
- JWT (JSON Web Tokens)
- MySQL
- Maven
- Lombok

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Soouheil/research-app.git
cd research-app
```

### 2. Database setup

Make sure you have MySQL running and create a database:

```sql
CREATE DATABASE researchapp;
```

Update `src/main/resources/application.properties`:

```
spring.datasource.url=jdbc:mysql://localhost:3306/researchapp?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

### 3. Build and run the app

```bash
./mvnw clean install
./mvnw spring-boot:run
```

App runs at: [http://localhost:8080](http://localhost:8080)

## 🔐 Authentication

Use `/auth/login` to authenticate and get a JWT token.

Request:
```json
POST /auth/login
{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

Include token in requests:
```
Authorization: Bearer <token>
```

## 📫 API Endpoints

### User
- `GET /api/users` - List users
- `POST /api/users` - Add user
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Article
- `GET /api/articles` - List articles
- `POST /api/articles` - Add article
- `GET /api/articles/{id}` - Get article by ID
- `PUT /api/articles/{id}` - Update article
- `DELETE /api/articles/{id}` - Delete article

## 📮 Postman Testing

- Use Postman to test the API.
- Authenticate first using `/auth/login` to get a JWT token.
- Set `Authorization` as `Bearer <your-token>` in headers for protected endpoints.

## ✅ Contributions

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

© 2025 Research App API - All rights reserved.
