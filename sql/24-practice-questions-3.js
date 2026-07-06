window.notePageData = {
  "title": "SQL Practice Questions 3",
  "navLabel": "SQL Practice sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "SQL Practice Questions 3",
    "text": "Advanced SQL practice questions using Departments, Employees, Customers, Products, and Orders tables with joins, grouping, window functions, subqueries, and relational division."
  },
  "nav": [
    { "label": "Data", "href": "#data" },
    { "label": "1. Best-selling Product", "href": "#q1" },
    { "label": "2. Highest Revenue Product", "href": "#q2" },
    { "label": "3. Products Never Sold", "href": "#q3" },
    { "label": "4. Top-selling per Category", "href": "#q4" },
    { "label": "5. Second Highest Order per Customer", "href": "#q5" },
    { "label": "6. Salary > All in Dept", "href": "#q6" },
    { "label": "7. Every Product Purchased", "href": "#q7" },
    { "label": "8. Every Customer Bought Product", "href": "#q8" },
    { "label": "9. Second Highest Avg Salary", "href": "#q9" },
    { "label": "10. Top-selling Product per Month", "href": "#q10" },
    { "label": "Summary", "href": "#summary" }
  ],
  "sections": [
    {
      "id": "data",
      "type": "notes",
      "label": "Data",
      "heading": "Sample Data",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "The following sample data is used for the practice questions below."
          ]
        },
        {
          "type": "code",
          "filename": "sample-data.sql",
          "text": "-- Departments\nINSERT INTO Departments VALUES\n(1, 'IT'),\n(2, 'HR'),\n(3, 'Sales'),\n(4, 'Finance'),\n(5, 'Marketing');\n\n-- Employees\nINSERT INTO Employees VALUES\n(101, 'Amit', 1, 201, 70000, '2022-01-10'),\n(102, 'Rahul', 1, 201, 85000, '2021-05-15'),\n(103, 'Neha', 2, 202, 60000, '2023-02-01'),\n(104, 'Priya', 3, 203, 90000, '2020-10-18'),\n(105, 'Ravi', 1, 201, 70000, '2024-01-01'),\n(106, 'Karan', 2, 202, 95000, '2019-06-20'),\n(107, 'Pooja', 4, 204, 75000, '2022-08-11'),\n(201, 'Raj', 1, NULL, 120000, '2018-03-10'),\n(202, 'Sunil', 2, NULL, 130000, '2017-07-15'),\n(203, 'Meena', 3, NULL, 125000, '2016-11-25');\n\n-- Customers\nINSERT INTO Customers VALUES\n(1, 'Alice', 'Delhi'),\n(2, 'Bob', 'Pune'),\n(3, 'Charlie', 'Mumbai'),\n(4, 'David', 'Hyderabad'),\n(5, 'Eva', 'Delhi'),\n(6, 'Frank', 'Bangalore'),\n(7, 'Grace', 'Chennai'),\n(8, 'Harry', 'Kolkata'),\n(9, 'Isha', 'Jaipur'),\n(10, 'Jack', 'Pune');\n\n-- Products\nINSERT INTO Products VALUES\n(1, 'Laptop', 'Electronics', 50000),\n(2, 'Mouse', 'Accessories', 500),\n(3, 'Keyboard', 'Accessories', 1200),\n(4, 'Monitor', 'Electronics', 15000),\n(5, 'Mobile', 'Electronics', 30000),\n(6, 'Headphones', 'Accessories', 2500),\n(7, 'Printer', 'Electronics', 12000),\n(8, 'Webcam', 'Accessories', 3000),\n(9, 'Tablet', 'Electronics', 25000),\n(10, 'Speaker', 'Accessories', 4000);\n\n-- Orders\nINSERT INTO Orders VALUES\n(101, 1, 1, '2024-06-01', 50000),\n(102, 2, 2, '2024-06-01', 500),\n(103, 1, 3, '2024-06-02', 1200),\n(104, 3, 1, '2024-06-03', 50000),\n(105, 2, 4, '2024-06-03', 15000),\n(106, 1, 2, '2024-06-04', 500),\n(107, 5, 5, '2024-06-05', 30000),\n(108, 5, 1, '2024-06-06', 50000),\n(109, 2, 2, '2024-06-06', 500),\n(110, 6, 6, '2024-06-07', 2500),\n(111, 6, 8, '2024-06-08', 3000),\n(112, 7, 3, '2024-06-09', 1200),\n(113, 7, 10, '2024-06-10', 4000),\n(114, 8, 4, '2024-06-11', 15000),\n(115, 8, 9, '2024-06-12', 25000),\n(116, 9, 5, '2024-06-13', 30000),\n(117, 9, 7, '2024-06-14', 12000),\n(118, 1, 6, '2024-06-15', 2500),\n(119, 3, 2, '2024-06-16', 500),\n(120, 5, 8, '2024-06-17', 3000);"
        }
      ]
    },
    {
      "id": "q1",
      "type": "notes",
      "label": "1. Best-selling Product",
      "heading": "1. Best-selling Product ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Product with the maximum number of orders."
          ]
        },
        {
          "type": "code",
          "filename": "01-best-selling-product.sql",
          "text": "-- Concept: JOIN, GROUP BY, COUNT(), ORDER BY\nSELECT\n  p.product_id,\n  p.product_name,\n  COUNT(o.order_id) AS total_orders\nFROM Products AS p\nJOIN Orders AS o\n  ON p.product_id = o.product_id\nGROUP BY\n  p.product_id,\n  p.product_name\nORDER BY total_orders DESC\nLIMIT 1;"
        }
      ]
    },
    {
      "id": "q2",
      "type": "notes",
      "label": "2. Highest Revenue Product",
      "heading": "2. Highest Revenue Product ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find the product with the highest total revenue."
          ]
        },
        {
          "type": "code",
          "filename": "02-highest-revenue-product.sql",
          "text": "-- Concept: SUM(), GROUP BY\nSELECT\n  p.product_id,\n  p.product_name,\n  SUM(o.amount) AS total_revenue\nFROM Products AS p\nJOIN Orders AS o\n  ON p.product_id = o.product_id\nGROUP BY\n  p.product_id,\n  p.product_name\nORDER BY total_revenue DESC\nLIMIT 1;"
        }
      ]
    },
    {
      "id": "q3",
      "type": "notes",
      "label": "3. Products Never Sold",
      "heading": "3. Products Never Sold ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find products that have never appeared in any order."
          ]
        },
        {
          "type": "code",
          "filename": "03-products-never-sold.sql",
          "text": "-- Concept: LEFT JOIN, NOT EXISTS\nSELECT\n  p.product_id,\n  p.product_name\nFROM Products AS p\nLEFT JOIN Orders AS o\n  ON p.product_id = o.product_id\nWHERE o.order_id IS NULL;"
        },
        {
          "type": "paragraph",
          "parts": [
            "Alternative using NOT EXISTS."
          ]
        },
        {
          "type": "code",
          "filename": "03-products-never-sold-alt.sql",
          "text": "-- Concept: NOT EXISTS\nSELECT\n  p.product_id,\n  p.product_name\nFROM Products AS p\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM Orders AS o\n  WHERE o.product_id = p.product_id\n);"
        }
      ]
    },
    {
      "id": "q4",
      "type": "notes",
      "label": "4. Top-selling Product per Category",
      "heading": "4. Top-selling Product per Category ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find the best-selling product in each category."
          ]
        },
        {
          "type": "code",
          "filename": "04-top-selling-product-per-category.sql",
          "text": "-- Concept: DENSE_RANK(), PARTITION BY\nSELECT\n  category,\n  product_name,\n  total_orders\nFROM (\n  SELECT\n    p.category,\n    p.product_name,\n    COUNT(o.order_id) AS total_orders,\n    DENSE_RANK() OVER (\n      PARTITION BY p.category\n      ORDER BY COUNT(o.order_id) DESC\n    ) AS rnk\n  FROM Products AS p\n  JOIN Orders AS o\n    ON p.product_id = o.product_id\n  GROUP BY\n    p.category,\n    p.product_name\n) AS ranked\nWHERE rnk = 1;"
        }
      ]
    },
    {
      "id": "q5",
      "type": "notes",
      "label": "5. Second Highest Order per Customer",
      "heading": "5. Second Highest Order per Customer ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Get the second-highest value order for each customer."
          ]
        },
        {
          "type": "code",
          "filename": "05-second-highest-order-per-customer.sql",
          "text": "-- Concept: Window Function\nSELECT\n  customer_id,\n  order_id,\n  amount\nFROM (\n  SELECT\n    o.*,\n    DENSE_RANK() OVER (\n      PARTITION BY customer_id\n      ORDER BY amount DESC\n    ) AS rnk\n  FROM Orders AS o\n) AS ranked\nWHERE rnk = 2;"
        }
      ]
    },
    {
      "id": "q6",
      "type": "notes",
      "label": "6. Salary > All in Department",
      "heading": "6. Find Employees Whose Salary Is Greater Than All Employees in a Department ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Example compares against HR (dept_id = 2)."
          ]
        },
        {
          "type": "code",
          "filename": "06-salary-greater-than-all-in-department.sql",
          "text": "-- Concept: Subquery, ALL\nSELECT\n  e.emp_id,\n  e.emp_name,\n  e.salary\nFROM Employees AS e\nWHERE e.salary > ALL (\n  SELECT h.salary\n  FROM Employees AS h\n  WHERE h.dept_id = 2\n);"
        },
        {
          "type": "paragraph",
          "parts": [
            "Dynamic version: highest-paid employee in every department."
          ]
        },
        {
          "type": "code",
          "filename": "06-highest-paid-in-every-department.sql",
          "text": "-- Concept: Subquery, MAX()\nSELECT\n  e.emp_name,\n  e.salary,\n  e.dept_id\nFROM Employees AS e\nWHERE e.salary > (\n  SELECT MAX(d.salary)\n  FROM Employees AS d\n  WHERE d.dept_id <> e.dept_id\n);"
        }
      ]
    },
    {
      "id": "q7",
      "type": "notes",
      "label": "7. Customers Who Purchased Every Product",
      "heading": "7. Find Customers Who Purchased Every Product ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "This is a classic relational division problem using double NOT EXISTS."
          ]
        },
        {
          "type": "code",
          "filename": "07-customers-who-purchased-every-product.sql",
          "text": "-- Concept: Double NOT EXISTS (Relational Division)\nSELECT\n  c.customer_id,\n  c.customer_name\nFROM Customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM Products AS p\n  WHERE NOT EXISTS (\n    SELECT 1\n    FROM Orders AS o\n    WHERE o.customer_id = c.customer_id\n      AND o.product_id = p.product_id\n  )\n);"
        }
      ]
    },
    {
      "id": "q8",
      "type": "notes",
      "label": "8. Products Purchased by Every Customer",
      "heading": "8. Find Products Purchased by Every Customer ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Another relational division query, this time from the Products side."
          ]
        },
        {
          "type": "code",
          "filename": "08-products-purchased-by-every-customer.sql",
          "text": "-- Concept: Double NOT EXISTS\nSELECT\n  p.product_id,\n  p.product_name\nFROM Products AS p\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM Customers AS c\n  WHERE NOT EXISTS (\n    SELECT 1\n    FROM Orders AS o\n    WHERE o.customer_id = c.customer_id\n      AND o.product_id = p.product_id\n  )\n);"
        }
      ]
    },
    {
      "id": "q9",
      "type": "notes",
      "label": "9. Departments with the Second Highest Average Salary",
      "heading": "9. Find Departments with the Second Highest Average Salary ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Use a CTE to compute average salary per department and rank the results."
          ]
        },
        {
          "type": "code",
          "filename": "09-second-highest-average-salary.sql",
          "text": "-- Concept: CTE + Window Function\nWITH DepartmentSalary AS (\n  SELECT\n    dept_id,\n    AVG(salary) AS avg_salary\n  FROM Employees\n  GROUP BY dept_id\n)\nSELECT\n  dept_id,\n  avg_salary\nFROM (\n  SELECT\n    ds.*,\n    DENSE_RANK() OVER (\n      ORDER BY avg_salary DESC\n    ) AS rnk\n  FROM DepartmentSalary AS ds\n) AS ranked\nWHERE rnk = 2;"
        }
      ]
    },
    {
      "id": "q10",
      "type": "notes",
      "label": "10. Top-selling Product Each Month",
      "heading": "10. Find the Top-selling Product Each Month ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find the leading product by order count for each month."
          ]
        },
        {
          "type": "code",
          "filename": "10-top-selling-product-each-month.sql",
          "text": "-- Concept: DATE_TRUNC(), DENSE_RANK(), Window Function\nSELECT\n  month,\n  product_name,\n  total_orders\nFROM (\n  SELECT\n    DATE_TRUNC('month', o.order_date) AS month,\n    p.product_name,\n    COUNT(*) AS total_orders,\n    DENSE_RANK() OVER (\n      PARTITION BY DATE_TRUNC('month', o.order_date)\n      ORDER BY COUNT(*) DESC\n    ) AS rnk\n  FROM Orders AS o\n  JOIN Products AS p\n    ON o.product_id = p.product_id\n  GROUP BY\n    DATE_TRUNC('month', o.order_date),\n    p.product_name\n) AS ranked\nWHERE rnk = 1\nORDER BY month;"
        }
      ]
    },
    {
      "id": "summary",
      "type": "summary",
      "label": "Summary",
      "heading": "Quick Revision",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Use JOINs and GROUP BY for sales and revenue analysis.",
            "Use LEFT JOIN or NOT EXISTS to find missing relationships.",
            "Use window functions such as DENSE_RANK() and PARTITION BY for ranking per group.",
            "Use double NOT EXISTS for relational division problems.",
            "Use CTEs for multi-step analytical queries."
          ]
        }
      ]
    }
  ]
};
