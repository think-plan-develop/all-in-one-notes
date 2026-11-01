-- SQL PRACTICE DATABASE: employees, customers, products, orders, order_items
-- Compatible with PostgreSQL 12+
-- Run in pgAdmin Query Tool or psql.
-- This recreates the sql_practice schema each time; existing objects in it are dropped.

DROP SCHEMA IF EXISTS sql_practice CASCADE;
CREATE SCHEMA sql_practice;
SET search_path TO sql_practice;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL UNIQUE,
    city VARCHAR(50) NOT NULL
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(80) NOT NULL,
    email VARCHAR(120) UNIQUE,
    department_id INT,
    manager_id INT NULL,
    job_title VARCHAR(60) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    hire_date DATE NOT NULL,
    city VARCHAR(50) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(80) NOT NULL,
    email VARCHAR(120) UNIQUE,
    city VARCHAR(50) NOT NULL,
    signup_date DATE NOT NULL,
    customer_type VARCHAR(20) NOT NULL,
    referral_customer_id INT NULL,
    FOREIGN KEY (referral_customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    launch_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    sales_rep_id INT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    shipping_city VARCHAR(50) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (sales_rep_id) REFERENCES employees(employee_id)
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 12 departments
INSERT INTO departments VALUES
(1, 'Engineering', 'Hyderabad'),
(2, 'Sales', 'Bengaluru'),
(3, 'Human Resources', 'Hyderabad'),
(4, 'Finance', 'Mumbai'),
(5, 'Marketing', 'Pune'),
(6, 'Customer Support', 'Chennai'),
(7, 'Data Analytics', 'Bengaluru'),
(8, 'Operations', 'Hyderabad'),
(9, 'Product', 'Pune'),
(10, 'Legal', 'Mumbai'),
(11, 'Quality Assurance', 'Chennai'),
(12, 'IT Support', 'Hyderabad');

-- 20 employees; managers are inserted in ID order so self-referencing FK is valid.
INSERT INTO employees VALUES
(1, 'Aarav Sharma', 'aarav.sharma@example.com', 1, NULL, 'Engineering Manager', 125000, '2020-02-10', 'Hyderabad'),
(2, 'Priya Reddy', 'priya.reddy@example.com', 2, NULL, 'Sales Manager', 110000, '2020-06-15', 'Bengaluru'),
(3, 'Rahul Verma', 'rahul.verma@example.com', 3, NULL, 'HR Manager', 95000, '2019-11-04', 'Hyderabad'),
(4, 'Neha Iyer', 'neha.iyer@example.com', 4, NULL, 'Finance Manager', 115000, '2019-08-20', 'Mumbai'),
(5, 'Karan Mehta', 'karan.mehta@example.com', 1, 1, 'Senior Developer', 98000, '2021-01-18', 'Hyderabad'),
(6, 'Ananya Das', 'ananya.das@example.com', 1, 1, 'Developer', 78000, '2022-03-07', 'Hyderabad'),
(7, 'Vikram Rao', 'vikram.rao@example.com', 1, 5, 'Developer', 72000, '2023-07-12', 'Bengaluru'),
(8, 'Isha Kapoor', 'isha.kapoor@example.com', 2, 2, 'Sales Executive', 65000, '2021-09-01', 'Bengaluru'),
(9, 'Rohan Patel', 'rohan.patel@example.com', 2, 2, 'Sales Executive', 62000, '2022-05-16', 'Mumbai'),
(10, 'Meera Nair', 'meera.nair@example.com', 3, 3, 'HR Executive', 58000, '2022-10-03', 'Hyderabad'),
(11, 'Arjun Singh', 'arjun.singh@example.com', 4, 4, 'Accountant', 67000, '2021-12-13', 'Mumbai'),
(12, 'Sana Khan', 'sana.khan@example.com', 5, NULL, 'Marketing Manager', 100000, '2020-04-22', 'Pune'),
(13, 'Dev Malhotra', 'dev.malhotra@example.com', 5, 12, 'Marketing Executive', 61000, '2023-02-06', 'Pune'),
(14, 'Tara Joseph', 'tara.joseph@example.com', 6, NULL, 'Support Lead', 76000, '2021-06-28', 'Chennai'),
(15, 'Aditya Bose', 'aditya.bose@example.com', 6, 14, 'Support Executive', 48000, '2023-04-17', 'Chennai'),
(16, 'Pooja Kulkarni', 'pooja.kulkarni@example.com', 7, NULL, 'Data Analyst', 88000, '2022-01-10', 'Bengaluru'),
(17, 'Manav Gupta', 'manav.gupta@example.com', 8, NULL, 'Operations Manager', 92000, '2020-09-14', 'Hyderabad'),
(18, 'Zoya Ali', 'zoya.ali@example.com', 9, NULL, 'Product Manager', 105000, '2021-03-25', 'Pune'),
(19, 'Kabir Joshi', 'kabir.joshi@example.com', 11, NULL, 'QA Engineer', 70000, '2022-08-08', 'Chennai'),
(20, 'Nidhi Jain', 'nidhi.jain@example.com', 12, NULL, 'IT Support Engineer', 54000, '2023-11-20', 'Hyderabad');

-- 15 customers, including repeat cities and a referral hierarchy
INSERT INTO customers VALUES
(1, 'BlueSky Retail', 'contact@bluesky.example.com', 'Hyderabad', '2022-01-10', 'Business', NULL),
(2, 'GreenLeaf Stores', 'hello@greenleaf.example.com', 'Bengaluru', '2022-02-14', 'Business', NULL),
(3, 'Riya Enterprises', 'riya@riya.example.com', 'Mumbai', '2022-03-20', 'Business', 1),
(4, 'Amit Kumar', 'amit.kumar@example.com', 'Hyderabad', '2022-04-05', 'Individual', 1),
(5, 'Sneha Foods', 'orders@snehafoods.example.com', 'Pune', '2022-05-12', 'Business', 2),
(6, 'Oceanic Traders', 'sales@oceanic.example.com', 'Chennai', '2022-06-18', 'Business', 2),
(7, 'Rahul N', 'rahul.n@example.com', 'Bengaluru', '2022-07-22', 'Individual', 4),
(8, 'Metro Mart', 'contact@metromart.example.com', 'Hyderabad', '2022-08-09', 'Business', 3),
(9, 'Kavya Rao', 'kavya.rao@example.com', 'Pune', '2022-09-15', 'Individual', 5),
(10, 'Sunrise Supplies', 'info@sunrise.example.com', 'Mumbai', '2022-10-11', 'Business', 3),
(11, 'Peak Performance', 'team@peak.example.com', 'Chennai', '2023-01-07', 'Business', 6),
(12, 'Vivid Creations', 'orders@vivid.example.com', 'Bengaluru', '2023-03-16', 'Business', 7),
(13, 'Farhan Sheikh', 'farhan.s@example.com', 'Hyderabad', '2023-05-21', 'Individual', 4),
(14, 'Evergreen Office', 'admin@evergreen.example.com', 'Pune', '2023-08-30', 'Business', 9),
(15, 'Nova Digital', 'contact@nova.example.com', 'Mumbai', '2024-01-19', 'Business', 10);

-- 15 products
INSERT INTO products VALUES
(1, 'Laptop Pro 14', 'Electronics', 85000, 12, '2023-01-15', TRUE),
(2, 'Wireless Mouse', 'Accessories', 1200, 150, '2022-05-10', TRUE),
(3, 'Mechanical Keyboard', 'Accessories', 4500, 70, '2022-07-01', TRUE),
(4, 'USB-C Hub', 'Accessories', 2800, 45, '2023-02-12', TRUE),
(5, 'Monitor 27-inch', 'Electronics', 22000, 25, '2022-11-20', TRUE),
(6, 'Office Chair', 'Furniture', 9500, 18, '2021-09-05', TRUE),
(7, 'Standing Desk', 'Furniture', 26000, 8, '2023-04-18', TRUE),
(8, 'Webcam HD', 'Electronics', 3800, 60, '2022-02-28', TRUE),
(9, 'Headset Pro', 'Accessories', 6200, 35, '2023-06-14', TRUE),
(10, 'External SSD 1TB', 'Storage', 7800, 40, '2023-09-09', TRUE),
(11, 'Network Router', 'Networking', 5400, 22, '2022-12-12', TRUE),
(12, 'Printer', 'Electronics', 14500, 10, '2021-06-01', FALSE),
(13, 'Laptop Basic', 'Electronics', 52000, 16, '2022-03-17', TRUE),
(14, 'HDMI Cable', 'Accessories', 650, 200, '2021-01-25', TRUE),
(15, 'Backup Drive 2TB', 'Storage', 6900, 0, '2022-08-08', TRUE);

-- 20 orders
INSERT INTO orders VALUES
(1001, 1, 8, '2024-01-05', 'Delivered', 'Card', 'Hyderabad'),
(1002, 2, 9, '2024-01-08', 'Delivered', 'UPI', 'Bengaluru'),
(1003, 3, 8, '2024-01-15', 'Shipped', 'Bank Transfer', 'Mumbai'),
(1004, 4, 9, '2024-02-02', 'Cancelled', 'UPI', 'Hyderabad'),
(1005, 5, 8, '2024-02-10', 'Delivered', 'Card', 'Pune'),
(1006, 6, 9, '2024-02-14', 'Processing', 'Bank Transfer', 'Chennai'),
(1007, 7, 8, '2024-03-01', 'Delivered', 'UPI', 'Bengaluru'),
(1008, 8, 9, '2024-03-11', 'Delivered', 'Card', 'Hyderabad'),
(1009, 9, 8, '2024-03-19', 'Returned', 'UPI', 'Pune'),
(1010, 10, 9, '2024-04-04', 'Delivered', 'Card', 'Mumbai'),
(1011, 11, 8, '2024-04-17', 'Shipped', 'Bank Transfer', 'Chennai'),
(1012, 12, 9, '2024-05-02', 'Delivered', 'UPI', 'Bengaluru'),
(1013, 13, 8, '2024-05-20', 'Processing', 'Card', 'Hyderabad'),
(1014, 14, 9, '2024-06-06', 'Delivered', 'UPI', 'Pune'),
(1015, 15, 8, '2024-06-21', 'Delivered', 'Card', 'Mumbai'),
(1016, 1, 9, '2024-07-03', 'Delivered', 'UPI', 'Hyderabad'),
(1017, 2, 8, '2024-07-15', 'Cancelled', 'Card', 'Bengaluru'),
(1018, 3, 9, '2024-08-09', 'Delivered', 'Bank Transfer', 'Mumbai'),
(1019, 5, 8, '2024-08-23', 'Shipped', 'UPI', 'Pune'),
(1020, 8, 9, '2024-09-12', 'Delivered', 'Card', 'Hyderabad');

-- 30 order items; order totals can be calculated as quantity * unit_price * (1 - discount_percent / 100)
INSERT INTO order_items VALUES
(1, 1001, 1, 1, 85000, 5),
(2, 1001, 2, 2, 1200, 0),
(3, 1002, 5, 2, 22000, 10),
(4, 1002, 3, 1, 4500, 0),
(5, 1003, 10, 2, 7800, 5),
(6, 1003, 9, 1, 6200, 0),
(7, 1004, 13, 1, 52000, 0),
(8, 1005, 6, 4, 9500, 10),
(9, 1005, 14, 10, 650, 0),
(10, 1006, 11, 2, 5400, 0),
(11, 1006, 4, 3, 2800, 5),
(12, 1007, 2, 5, 1200, 0),
(13, 1007, 3, 2, 4500, 5),
(14, 1008, 1, 1, 85000, 0),
(15, 1008, 8, 2, 3800, 0),
(16, 1009, 7, 1, 26000, 10),
(17, 1010, 5, 3, 22000, 5),
(18, 1010, 9, 2, 6200, 0),
(19, 1011, 12, 1, 14500, 0),
(20, 1011, 14, 8, 650, 0),
(21, 1012, 10, 3, 7800, 10),
(22, 1012, 4, 2, 2800, 0),
(23, 1013, 13, 2, 52000, 5),
(24, 1014, 6, 2, 9500, 0),
(25, 1014, 2, 4, 1200, 0),
(26, 1015, 11, 1, 5400, 0),
(27, 1016, 3, 3, 4500, 10),
(28, 1017, 1, 1, 85000, 0),
(29, 1018, 8, 4, 3800, 5),
(30, 1019, 15, 1, 6900, 0),
(31, 1020, 5, 1, 22000, 0),
(32, 1020, 14, 6, 650, 0);

-- Verify row counts
SELECT 'departments' AS table_name, COUNT(*) AS row_count FROM departments
UNION ALL SELECT 'employees', COUNT(*) FROM employees
UNION ALL SELECT 'customers', COUNT(*) FROM customers
UNION ALL SELECT 'products', COUNT(*) FROM products
UNION ALL SELECT 'orders', COUNT(*) FROM orders
UNION ALL SELECT 'order_items', COUNT(*) FROM order_items;

-- STARTER PRACTICE QUERIES
-- Note: PostgreSQL supports WITH RECURSIVE and BOOLEAN values directly.
-- Uncomment and solve these one by one.

-- 1. DISTINCT: list unique customer cities.
-- SELECT DISTINCT city FROM customers ORDER BY city;

-- 2. JOIN: show each order with the customer name.
-- SELECT o.order_id, c.customer_name, o.order_date, o.status
-- FROM orders o JOIN customers c ON c.customer_id = o.customer_id;

-- 3. GROUP BY: count orders by status.
-- SELECT status, COUNT(*) AS order_count
-- FROM orders GROUP BY status;

-- 4. HAVING: find customers who placed more than one order.
-- SELECT customer_id, COUNT(*) AS order_count
-- FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;

-- 5. CTE: calculate order totals, including discounts.
-- WITH order_totals AS (
--   SELECT order_id,
--          SUM(quantity * unit_price * (1 - discount_percent / 100)) AS total
--   FROM order_items GROUP BY order_id
-- )
-- SELECT * FROM order_totals ORDER BY total DESC;

-- 6. Multiple CTEs: find customers whose total order value exceeds 50000.
-- WITH order_totals AS (
--   SELECT order_id, SUM(quantity * unit_price * (1 - discount_percent / 100)) AS total
--   FROM order_items GROUP BY order_id
-- ),
-- customer_totals AS (
--   SELECT o.customer_id, SUM(ot.total) AS total_spent
--   FROM orders o JOIN order_totals ot ON ot.order_id = o.order_id
--   WHERE o.status <> 'Cancelled'
--   GROUP BY o.customer_id
-- )
-- SELECT c.customer_name, ct.total_spent
-- FROM customer_totals ct JOIN customers c ON c.customer_id = ct.customer_id
-- WHERE ct.total_spent > 50000;

-- 7. Window function: rank employees by salary within each department.
-- SELECT employee_name, department_id, salary,
--        RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank
-- FROM employees;

-- 8. ROW_NUMBER: find each customer's most recent order.
-- WITH ranked_orders AS (
--   SELECT o.*,
--          ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC, order_id DESC) AS rn
--   FROM orders o
-- )
-- SELECT * FROM ranked_orders WHERE rn = 1;

-- 9. LAG: compare each order with the previous order for the same customer.
-- SELECT customer_id, order_id, order_date,
--        LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS previous_order_date
-- FROM orders;

-- 10. Recursive CTE: show employees and their reporting levels from manager employee_id = 1.
-- WITH RECURSIVE employee_tree AS (
--   SELECT employee_id, employee_name, manager_id, 0 AS level
--   FROM employees WHERE employee_id = 1
--   UNION ALL
--   SELECT e.employee_id, e.employee_name, e.manager_id, et.level + 1
--   FROM employees e JOIN employee_tree et ON e.manager_id = et.employee_id
-- )
-- SELECT * FROM employee_tree ORDER BY level, employee_id;
