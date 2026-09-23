# ShopSphere

ShopSphere is a production-style e-commerce application built using a
microservices-based backend architecture and a modern frontend.

## Project Status

**Current Phase:** Week 1 — Backend Foundation

**Current Feature Branch:** `feature/product-api`

---

## 1. Project Structure

```text
ShopSphere/
│
├── backend/
│   └── product-service/
│
├── frontend/
│
├── docs/
│   ├── architecture.md
│   ├── api-design.md
│   └── database-design.md
│
├── .gitignore
└── README.md
```

---

## 2. Architecture

The project follows a microservices-oriented architecture.

```text
Frontend
   |
   v
API Gateway
   |
   +------------------+
   |                  |
   v                  v
User Service     Product Service
                      |
                      v
                   MySQL
```

Additional services such as Order, Payment and Inventory will be introduced
in later development stages.

---

## 3. Backend

### Product Service

The Product Service is responsible for product-related operations.

Current responsibilities:

- Create product
- Get all products
- Get product by ID
- Update product
- Delete product

### Technologies

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- REST APIs

---

## 4. Product API

Base path:

```text
/api
```

Available endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| POST | `/api/products` | Create product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

Detailed API contracts are available in:

`docs/api-design.md`

---

## 5. Database

Database:

```text
shop_sphere
```

Current table:

```text
products
```

Database documentation:

`docs/database-design.md`

---

## 6. Documentation

| Document | Purpose |
|---|---|
| `docs/architecture.md` | System architecture |
| `docs/api-design.md` | REST API contracts |
| `docs/database-design.md` | Database structure and design |

---

## 7. Development Workflow

Feature development is performed using feature branches.

Example:

```text
main
  |
  +-- feature/product-api
```

Changes are developed, tested and pushed to the relevant feature branch before
being merged into `main`.

---

## 8. Git Workflow

```bash
git switch feature/product-api

git pull

# Make changes

git add .

git commit -m "feat: description"

git push
```

---

## 9. Future Scope

The following components will be implemented in later stages:

- User Service
- Authentication and JWT
- Category Service
- Order Service
- Cart
- Payment Service
- Inventory
- API Gateway
- Redis
- Kafka
- Docker
- Kubernetes
- AWS deployment

---

## 10. Current Development Branch

```text
feature/product-api
```

All current Product Service development should be committed and pushed to this
feature branch.