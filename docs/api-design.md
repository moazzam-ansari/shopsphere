# ShopSphere API Design

## 1. Overview

ShopSphere uses REST APIs for communication between the frontend and backend services.

The Product Service is responsible for product-related operations such as creating, viewing, updating and deleting products.

The API design is defined before implementation so that the frontend can integrate using the agreed request and response structures.

---

## 2. Base URL

```text
/api
```

---

# 3. Product APIs

## 3.1 Get All Products

### Endpoint

```http
GET /api/products
```

### Description

Returns a list of all available products.

### Response — 200 OK

```json
[
  {
    "productId": 1,
    "productName": "Wireless Headphones",
    "productPrice": 2499.00,
    "productStock": 25,
    "productCategory": 1,
    "status": "ACTIVE"
  }
]
```

---

## 3.2 Get Product By ID

### Endpoint

```http
GET /api/products/{id}
```

### Example

```http
GET /api/products/1
```

### Response — 200 OK

```json
{
  "productId": 1,
  "productName": "Wireless Headphones",
  "productPrice": 2499.00,
  "productStock": 25,
  "productCategory": 1,
  "status": "ACTIVE"
}
```

### Response — 404 Not Found 

```json
{
  "message": "Product not found"
}
```

---

## 3.3 Create Product

### Endpoint

```http
POST /api/products
```

### Request Body

```json
{
  "productName": "Wireless Headphones",
  "productPrice": 2499.00,
  "productStock": 25,
  "productCategory": 1
}
```

### Response — 201 Created

```json
{
  "productId": 1,
  "productName": "Wireless Headphones",
  "productPrice": 2499.00,
  "productStock": 25,
  "productCategory": 1,
  "status": "ACTIVE"
}
```

---

## 3.4 Update Product

### Endpoint

```http
PUT /api/products/{id}
```

### Example

```http
PUT /api/products/1
```

### Request Body

```json
{
  "productName": "Wireless Bluetooth Headphones",
  "productPrice": 2799.00,
  "productStock": 30,
  "productCategory": 1
}
```

### Response — 200 OK

```json
{
  "productId": 1,
  "productName": "Wireless Bluetooth Headphones",
  "productPrice": 2799.00,
  "productStock": 30,
  "productCategory": 1,
  "status": "ACTIVE"
}
```

---

## 3.5 Delete Product

### Endpoint

```http
DELETE /api/products/{id}
```

### Example

```http
DELETE /api/products/1
```

### Response — 204 No Content

No response body.

### Response — 404 Not Found

```json
{
  "message": "Product not found"
}
```

---

# 4. Product Fields

| Field | Type | Description |
|---|---|---|
| productId | Long | Unique product identifier |
| productName | String | Name of the product |
| productPrice | BigDecimal | Price of the product |
| productStock | Integer | Available stock |
| productCategory | Long | Category identifier |
| status | String | Product status |

---

# 5. Product Status

Currently supported statuses:

```text
ACTIVE
INACTIVE
OUT_OF_STOCK
```

---

# 6. Common HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 204 | Resource deleted successfully |
| 400 | Invalid request |
| 404 | Resource not found |
| 500 | Internal server error |

---

# 7. Future APIs

The following APIs will be added in later development stages:

- Category APIs
- Cart APIs
- Order APIs
- Payment APIs
- Inventory APIs

---

# 8. API Design Rules

- RESTful endpoint naming will be used.
- JSON will be used for request and response bodies.
- HTTP status codes will represent operation results.
- Validation will be applied to incoming requests.
- API field names must remain consistent between backend and frontend.
- Breaking changes to API contracts must be discussed before implementation.


---

# 9. Authentication APIs

Authentication APIs are responsible for user login and authentication.

## 9.1 User Login

### Endpoint

```http
POST /api/auth/login
```

### Request Body
```json
{
  "email": "user@example.com",
  "password": "Password@123"
}
```

### Response — 200 OK
```json
{
  "userId": 1,
  "email": "user@example.com",
  "role": "CUSTOMER",
  "token": "jwt-token"
}
```

### Response — 401 Unauthorized
```json
{
  "status": 401,
  "message": "Invalid email or password"
}
```

---

# 10. User APIs

User APIs are responsible for user-related operations.

## 10.1 Get User By ID

### Endpoint

```http
GET /api/users/{id}
```

### Example
```http
GET /api/users/1
```

### Response — 200 OK
```json
{
  "userId": 1,
  "firstName": "Mohd",
  "lastName": "Ansari",
  "email": "user@example.com",
  "role": "CUSTOMER"
}
```

### Response — 404 Not Found
```json
{
  "status": 404,
  "message": "User not found"
}
```
