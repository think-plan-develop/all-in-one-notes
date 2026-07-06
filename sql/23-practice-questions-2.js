window.notePageData = {
  "title": "SQL Practice Questions 2",
  "navLabel": "SQL Practice sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "SQL Practice Questions 2",
    "text": "Intermediate SQL practice questions using Customers, Orders, and Products tables with joins, grouping, window functions, and subqueries."
  },
  "nav": [
    { "label": "Tables", "href": "#tables" },
    { "label": "11. No Orders", "href": "#q11" },
    { "label": "12. Consecutive Days", "href": "#q12" },
    { "label": "13. Spend > 5000", "href": "#q13" },
    { "label": "14. Highest Avg Order", "href": "#q14" },
    { "label": "15. Every Category", "href": "#q15" },
    { "label": "16. Only Electronics", "href": "#q16" },
    { "label": "17. First Order", "href": "#q17" },
    { "label": "18. Latest Order", "href": "#q18" },
    { "label": "19. Same-Day Multiple Orders", "href": "#q19" },
    { "label": "20. Every Order > 1000", "href": "#q20" },
    { "label": "Summary", "href": "#summary" }
  ],
  "sections": [
    {
      "id": "tables",
      "type": "notes",
      "label": "Tables",
      "heading": "Sample Tables",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "These practice questions use the following sample data for Customers, Orders, and Products."
          ]
        },
        {
          "type": "table",
          "headers": ["customer_id", "customer_name", "city", "signup_date"],
          "rows": [
            [1, "Alice", "Delhi", "2024-01-10"],
            [2, "Bob", "Pune", "2024-02-01"],
            [3, "Charlie", "Delhi", "2024-03-15"],
            [4, "David", "Mumbai", "2024-04-10"],
            [5, "Eva", "Pune", "2024-05-20"]
          ]
        },
        {
          "type": "table",
          "headers": ["order_id", "customer_id", "order_date", "amount", "product_id"],
          "rows": [
            [101, 1, "2024-06-01", 1200, 1],
            [102, 2, "2024-06-02", 500, 2],
            [103, 1, "2024-06-03", 900, 3],
            [104, 3, "2024-06-03", 1500, 1],
            [105, 2, "2024-06-04", 800, 4],
            [106, 1, "2024-06-05", 600, 2],
            [107, 5, "2024-06-06", 3000, 5]
          ]
        },
        {
          "type": "table",
          "headers": ["product_id", "product_name", "category"],
          "rows": [
            [1, "Laptop", "Electronics"],
            [2, "Mouse", "Accessories"],
            [3, "Keyboard", "Accessories"],
            [4, "Monitor", "Electronics"],
            [5, "Mobile", "Electronics"]
          ]
        }
      ]
    },
    {
      "id": "q11",
      "type": "notes",
      "label": "11. Customers with No Orders",
      "heading": "11. Customers with No Orders ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find customers who have never placed any order."
          ]
        },
        {
          "type": "code",
          "filename": "11-no-orders.sql",
          "text": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM Customers AS c\nLEFT JOIN Orders AS o\n  ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;"
        }
      ]
    },
    {
      "id": "q12",
      "type": "notes",
      "label": "12. Consecutive Days",
      "heading": "12. Customers Ordering on Consecutive Days ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find customers who placed orders on consecutive days."
          ]
        },
        {
          "type": "code",
          "filename": "12-consecutive-days.sql",
          "text": "SELECT DISTINCT\n  c.customer_id,\n  c.customer_name\nFROM Customers AS c\nJOIN Orders AS o1\n  ON c.customer_id = o1.customer_id\nJOIN Orders AS o2\n  ON o1.customer_id = o2.customer_id\nWHERE o2.order_date = o1.order_date + INTERVAL '1 day';"
        }
      ]
    },
    {
      "id": "q13",
      "type": "notes",
      "label": "13. Spending More Than 5000",
      "heading": "13. Customers Spending More Than ₹5,000 ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find customers whose total spending is greater than ₹5,000."
          ]
        },
        {
          "type": "code",
          "filename": "13-total-spend.sql",
          "text": "SELECT\n  c.customer_id,\n  c.customer_name,\n  SUM(o.amount) AS total_spent\nFROM Customers AS c\nJOIN Orders AS o\n  ON c.customer_id = o.customer_id\nGROUP BY\n  c.customer_id,\n  c.customer_name\nHAVING SUM(o.amount) > 5000;"
        }
      ]
    },
    {
      "id": "q14",
      "type": "notes",
      "label": "14. Highest Avg Order Value",
      "heading": "14. Customer with Highest Average Order Value ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find the customer with the highest average order value."
          ]
        },
        {
          "type": "code",
          "filename": "14-highest-avg-order.sql",
          "text": "SELECT\n  c.customer_id,\n  c.customer_name,\n  AVG(o.amount) AS avg_order_value\nFROM Customers AS c\nJOIN Orders AS o\n  ON c.customer_id = o.customer_id\nGROUP BY\n  c.customer_id,\n  c.customer_name\nORDER BY avg_order_value DESC\nLIMIT 1;"
        }
      ]
    },
    {
      "id": "q15",
      "type": "notes",
      "label": "15. Every Category",
      "heading": "15. Customers Who Bought Every Category ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find customers who purchased products from every category present in Products."
          ]
        },
        {
          "type": "code",
          "filename": "15-every-category.sql",
          "text": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM Customers AS c\nJOIN Orders AS o\n  ON c.customer_id = o.customer_id\nJOIN Products AS p\n  ON o.product_id = p.product_id\nGROUP BY\n  c.customer_id,\n  c.customer_name\nHAVING COUNT(DISTINCT p.category) = (\n  SELECT COUNT(DISTINCT category)\n  FROM Products\n);"
        }
      ]
    },
    {
      "id": "q16",
      "type": "notes",
      "label": "16. Only Electronics",
      "heading": "16. Customers Buying Only Electronics ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find customers whose orders are only from the Electronics category."
          ]
        },
        {
          "type": "code",
          "filename": "16-only-electronics.sql",
          "text": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM Customers AS c\nJOIN Orders AS o\n  ON c.customer_id = o.customer_id\nJOIN Products AS p\n  ON o.product_id = p.product_id\nGROUP BY\n  c.customer_id,\n  c.customer_name\nHAVING COUNT(*) =\n  COUNT(CASE WHEN p.category = 'Electronics' THEN 1 END);"
        },
        {
          "type": "paragraph",
          "parts": [
            "Alternative using NOT EXISTS."
          ]
        },
        {
          "type": "code",
          "filename": "16-only-electronics-alt.sql",
          "text": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM Customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM Orders AS o\n  JOIN Products AS p\n    ON o.product_id = p.product_id\n  WHERE o.customer_id = c.customer_id\n    AND p.category <> 'Electronics'\n);"
        }
      ]
    },
    {
      "id": "q17",
      "type": "notes",
      "label": "17. First Order Per Customer",
      "heading": "17. First Order Per Customer ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Use ROW_NUMBER() to get the first order per customer."
          ]
        },
        {
          "type": "code",
          "filename": "17-first-order-per-customer.sql",
          "text": "SELECT\n  customer_id,\n  order_id,\n  order_date,\n  amount\nFROM (\n  SELECT\n    o.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY customer_id\n      ORDER BY order_date\n    ) AS rn\n  FROM Orders AS o\n) AS orders\nWHERE rn = 1;"
        }
      ]
    },
    {
      "id": "q18",
      "type": "notes",
      "label": "18. Latest Order Per Customer",
      "heading": "18. Latest Order Per Customer ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Use ROW_NUMBER() with DESC to get the latest order per customer."
          ]
        },
        {
          "type": "code",
          "filename": "18-latest-order-per-customer.sql",
          "text": "SELECT\n  customer_id,\n  order_id,\n  order_date,\n  amount\nFROM (\n  SELECT\n    o.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY customer_id\n      ORDER BY order_date DESC\n    ) AS rn\n  FROM Orders AS o\n) AS orders\nWHERE rn = 1;"
        }
      ]
    },
    {
      "id": "q19",
      "type": "notes",
      "label": "19. Same-Day Multiple Orders",
      "heading": "19. Customers with Multiple Orders on the Same Day ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find customers who placed more than one order on the same day."
          ]
        },
        {
          "type": "code",
          "filename": "19-same-day-multiple-orders.sql",
          "text": "SELECT\n  c.customer_name,\n  o.order_date,\n  COUNT(*) AS total_orders\nFROM Customers AS c\nJOIN Orders AS o\n  ON c.customer_id = o.customer_id\nGROUP BY\n  c.customer_name,\n  o.order_date\nHAVING COUNT(*) > 1;"
        }
      ]
    },
    {
      "id": "q20",
      "type": "notes",
      "label": "20. Every Order > 1000",
      "heading": "20. Customers Where Every Order is Greater Than ₹1,000 ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find customers whose every order amount is above ₹1,000."
          ]
        },
        {
          "type": "code",
          "filename": "20-all-orders-above-1000.sql",
          "text": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM Customers AS c\nJOIN Orders AS o\n  ON c.customer_id = o.customer_id\nGROUP BY\n  c.customer_id,\n  c.customer_name\nHAVING MIN(o.amount) > 1000;"
        },
        {
          "type": "paragraph",
          "parts": [
            "Alternative using NOT EXISTS."
          ]
        },
        {
          "type": "code",
          "filename": "20-all-orders-above-1000-alt.sql",
          "text": "SELECT\n  c.customer_id,\n  c.customer_name\nFROM Customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM Orders AS o\n  WHERE o.customer_id = c.customer_id\n    AND o.amount <= 1000\n);"
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
            "LEFT JOIN helps find rows with no matching records.",
            "ROW_NUMBER() is useful for first/last-row-per-group problems.",
            "GROUP BY with HAVING is used for aggregate conditions.",
            "NOT EXISTS is often a clean alternative for exclusion logic.",
            "DISTINCT and conditional aggregation help solve advanced filtering questions."
          ]
        }
      ]
    }
  ]
};
