# ShopSphere Database Design

## 1. Database

Database Name:
`shop_sphere`

---

## 2. Product Table

Table Name:
`products`

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| product_id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique product ID |
| product_name | VARCHAR(100) | NOT NULL | Product name |
| product_price | DECIMAL(10,2) | NOT NULL | Product price |
| product_stock | INT | NOT NULL | Available stock quantity |
| product_category | BIGINT | NOT NULL | Product category ID |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'ACTIVE' | Product status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

---

## 3. Product Status

Possible values:

- ACTIVE
- INACTIVE
- OUT_OF_STOCK

## 4. Future Tables

The following tables will be added in later development stages:

- users
- categories
- orders
- order_items
- payments
- inventory

## 5. Database Relationship

### Product → Category

Each product belongs to a category.

```text
Category
   |
   └── Products
```

---

## Corrected complete `database-design.md`

Is version ko use karo:

````markdown
# ShopSphere Database Design

## 1. Database

Database Name:

`shop_sphere`

---

## 2. Product Table

Table Name:

`products`

| Column | Data Type | Constraints | Description |
|---|---|---|---|
| product_id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique product ID |
| product_name | VARCHAR(100) | NOT NULL | Product name |
| product_price | DECIMAL(10,2) | NOT NULL | Product price |
| product_stock | INT | NOT NULL | Available stock quantity |
| product_category | BIGINT | NOT NULL | Product category ID |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'ACTIVE' | Product status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

---

## 3. Product Status

Possible values:

- ACTIVE
- INACTIVE
- OUT_OF_STOCK

---

## 4. Future Tables

The following tables will be added in later development stages:

- users
- categories
- orders
- order_items
- payments
- inventory

---

## 5. Database Relationship

### Product → Category

Each product belongs to a category.

```text
Category
   |
   └── Products
```

---

## 6. Database Design Principles

- Primary keys use BIGINT.
- Product price uses DECIMAL(10,2).
- Product stock is stored as an integer quantity.
- Created and updated timestamps are maintained.
- Product status is used to represent the current product state.
- Category relationships will be implemented when the category table is introduced.

---

## 7. Initial Product Table SQL

```sql
CREATE TABLE products (
    product_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    product_stock INT NOT NULL,
    product_category BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```