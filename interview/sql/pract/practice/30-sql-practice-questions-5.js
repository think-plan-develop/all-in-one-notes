window.notePageData = {
  "title": "30. SQL Practice Questions 5 - Revenue, Dates and Aggregation",
  "navLabel": "SQL Practice 5 sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "30. SQL Practice Questions 5 - Revenue, Dates and Aggregation",
    "text": "10 solved SQL interview practice questions with complete sample data, simple explanations, and expected results. Questions 41-50 cover monthly reports, running totals, growth, percentages, rolling averages, date ranges, weighted averages, and product combinations."
  },
  "nav": [
    {
      "label": "Tables & Setup",
      "href": "#tables"
    },
    {
      "label": "41. Monthly Revenue",
      "href": "#q41"
    },
    {
      "label": "42. Running Revenue",
      "href": "#q42"
    },
    {
      "label": "43. Monthly Growth",
      "href": "#q43"
    },
    {
      "label": "44. Revenue Share",
      "href": "#q44"
    },
    {
      "label": "45. Status Pivot and Rate",
      "href": "#q45"
    },
    {
      "label": "46. 7-Day Moving Average",
      "href": "#q46"
    },
    {
      "label": "47. 30-Day Date Range",
      "href": "#q47"
    },
    {
      "label": "48. Weighted Average",
      "href": "#q48"
    },
    {
      "label": "49. A and B but Not C",
      "href": "#q49"
    },
    {
      "label": "50. Product Pairs",
      "href": "#q50"
    },
    {
      "label": "Summary",
      "href": "#summary"
    }
  ],
  "sections": [
    {
      "id": "tables",
      "type": "notes",
      "label": "Tables & Setup",
      "heading": "Sample Tables and Runnable Setup",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "SQL dialect: PostgreSQL. Each set is independent. Run the complete setup once in a practice database; in a later session, run only the SET search_path statement before answering questions. All questions start from the original sample data."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Five stars = first revision priority; four stars = next priority; three stars = stretch practice. Stars are study priorities, not measured interview-frequency statistics. Try writing each query before reading its answer."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Questions 41-50 cover monthly reports, running totals, growth, percentages, rolling averages, date ranges, weighted averages, and product combinations."
          ]
        },
        {
          "type": "code",
          "filename": "set-5-setup.sql",
          "text": "CREATE SCHEMA sql_practice_5;\nSET search_path TO sql_practice_5;\n\nCREATE TABLE Customers (\ncustomer_id INT PRIMARY KEY,\ncustomer_name VARCHAR(40) NOT NULL\n);\n\nINSERT INTO Customers (customer_id, customer_name) VALUES\n(1, 'Asha'),\n(2, 'Rohan'),\n(3, 'Meera'),\n(4, 'Kabir');\n\nCREATE TABLE Orders (\norder_id INT PRIMARY KEY,\ncustomer_id INT NOT NULL REFERENCES Customers(customer_id),\norder_date DATE NOT NULL,\namount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),\nstatus VARCHAR(12) NOT NULL CHECK (status IN ('completed', 'cancelled', 'pending'))\n);\n\nINSERT INTO Orders (order_id, customer_id, order_date, amount, status) VALUES\n(101, 1, '2024-01-01', 100, 'completed'),\n(102, 2, '2024-01-01', 200, 'completed'),\n(103, 1, '2024-01-03', 150, 'completed'),\n(104, 3, '2024-01-04', 120, 'cancelled'),\n(105, 2, '2024-01-07', 350, 'completed'),\n(106, 1, '2024-01-08', 200, 'completed'),\n(107, 3, '2024-01-10', 50, 'pending'),\n(108, 1, '2024-02-10', 400, 'cancelled'),\n(109, 1, '2024-03-01', 500, 'completed'),\n(110, 2, '2024-03-15', 100, 'completed'),\n(111, 3, '2024-03-31', 300, 'completed'),\n(112, 2, '2024-04-01', 900, 'completed');\n\nCREATE TABLE OrderItems (\norder_id INT NOT NULL REFERENCES Orders(order_id),\nproduct_id INT NOT NULL,\nquantity INT NOT NULL CHECK (quantity > 0),\nunit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),\nPRIMARY KEY (order_id, product_id)\n);\n\nINSERT INTO OrderItems (order_id, product_id, quantity, unit_price) VALUES\n(101, 1, 1, 60),\n(101, 2, 1, 40),\n(102, 1, 2, 80),\n(102, 2, 1, 40),\n(103, 1, 1, 100),\n(103, 2, 1, 50),\n(104, 3, 1, 120),\n(105, 1, 3, 100),\n(105, 2, 1, 50),\n(106, 2, 4, 50),\n(107, 3, 1, 50),\n(108, 3, 4, 100),\n(109, 1, 4, 100),\n(109, 2, 2, 50),\n(110, 3, 1, 100),\n(111, 2, 6, 50),\n(112, 1, 9, 100);"
        },
        {
          "type": "paragraph",
          "parts": [
            "Customers"
          ]
        },
        {
          "type": "table",
          "headers": [
            "customer_id",
            "customer_name"
          ],
          "rows": [
            [
              1,
              "Asha"
            ],
            [
              2,
              "Rohan"
            ],
            [
              3,
              "Meera"
            ],
            [
              4,
              "Kabir"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Orders"
          ]
        },
        {
          "type": "table",
          "headers": [
            "order_id",
            "customer_id",
            "order_date",
            "amount",
            "status"
          ],
          "rows": [
            [
              101,
              1,
              "2024-01-01",
              100,
              "completed"
            ],
            [
              102,
              2,
              "2024-01-01",
              200,
              "completed"
            ],
            [
              103,
              1,
              "2024-01-03",
              150,
              "completed"
            ],
            [
              104,
              3,
              "2024-01-04",
              120,
              "cancelled"
            ],
            [
              105,
              2,
              "2024-01-07",
              350,
              "completed"
            ],
            [
              106,
              1,
              "2024-01-08",
              200,
              "completed"
            ],
            [
              107,
              3,
              "2024-01-10",
              50,
              "pending"
            ],
            [
              108,
              1,
              "2024-02-10",
              400,
              "cancelled"
            ],
            [
              109,
              1,
              "2024-03-01",
              500,
              "completed"
            ],
            [
              110,
              2,
              "2024-03-15",
              100,
              "completed"
            ],
            [
              111,
              3,
              "2024-03-31",
              300,
              "completed"
            ],
            [
              112,
              2,
              "2024-04-01",
              900,
              "completed"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "OrderItems"
          ]
        },
        {
          "type": "table",
          "headers": [
            "order_id",
            "product_id",
            "quantity",
            "unit_price"
          ],
          "rows": [
            [
              101,
              1,
              1,
              60
            ],
            [
              101,
              2,
              1,
              40
            ],
            [
              102,
              1,
              2,
              80
            ],
            [
              102,
              2,
              1,
              40
            ],
            [
              103,
              1,
              1,
              100
            ],
            [
              103,
              2,
              1,
              50
            ],
            [
              104,
              3,
              1,
              120
            ],
            [
              105,
              1,
              3,
              100
            ],
            [
              105,
              2,
              1,
              50
            ],
            [
              106,
              2,
              4,
              50
            ],
            [
              107,
              3,
              1,
              50
            ],
            [
              108,
              3,
              4,
              100
            ],
            [
              109,
              1,
              4,
              100
            ],
            [
              109,
              2,
              2,
              50
            ],
            [
              110,
              3,
              1,
              100
            ],
            [
              111,
              2,
              6,
              50
            ],
            [
              112,
              1,
              9,
              100
            ]
          ]
        }
      ]
    },
    {
      "id": "q41",
      "type": "notes",
      "label": "41. Monthly completed revenue and order count",
      "heading": "41. Monthly completed revenue and order count ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "For each month with completed orders, return the month, number of completed orders, and completed revenue. Exclude cancelled and pending orders."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "41-answer.sql",
          "text": "SELECT DATE_TRUNC('month', order_date)::date AS month,\n       COUNT(*) AS completed_orders,\n       SUM(amount) AS revenue\nFROM Orders\nWHERE status = 'completed'\nGROUP BY DATE_TRUNC('month', order_date)::date\nORDER BY month;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Filter the valid orders first, then group dates by their year and month."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: DATE_TRUNC()",
            "Concepts Tested: SUM()",
            "Concepts Tested: COUNT()",
            "Concepts Tested: GROUP BY"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Grouping only by EXTRACT(MONTH ...) mixes January from different years."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "month",
            "completed_orders",
            "revenue"
          ],
          "rows": [
            [
              "2024-01-01",
              5,
              "1000.00"
            ],
            [
              "2024-03-01",
              3,
              "900.00"
            ],
            [
              "2024-04-01",
              1,
              "900.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q42",
      "type": "notes",
      "label": "42. Running total of daily revenue",
      "heading": "42. Running total of daily revenue ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "For each date with completed sales, return daily revenue and cumulative revenue up to that date. This report lists sales dates only."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "42-answer.sql",
          "text": "WITH daily AS (\n  SELECT order_date, SUM(amount) AS daily_revenue\n  FROM Orders\n  WHERE status = 'completed'\n  GROUP BY order_date\n)\nSELECT order_date, daily_revenue,\n       SUM(daily_revenue) OVER (\n         ORDER BY order_date\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS running_revenue\nFROM daily\nORDER BY order_date;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: First reduce orders to one row per date. Then add all daily values from the first date through the current date."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: CTE",
            "Concepts Tested: SUM() OVER",
            "Concepts Tested: Explicit window frame"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Aggregating to daily rows before applying the window avoids duplicate report dates."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "order_date",
            "daily_revenue",
            "running_revenue"
          ],
          "rows": [
            [
              "2024-01-01",
              "300.00",
              "300.00"
            ],
            [
              "2024-01-03",
              "150.00",
              "450.00"
            ],
            [
              "2024-01-07",
              "350.00",
              "800.00"
            ],
            [
              "2024-01-08",
              "200.00",
              "1000.00"
            ],
            [
              "2024-03-01",
              "500.00",
              "1500.00"
            ],
            [
              "2024-03-15",
              "100.00",
              "1600.00"
            ],
            [
              "2024-03-31",
              "300.00",
              "1900.00"
            ],
            [
              "2024-04-01",
              "900.00",
              "2800.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q43",
      "type": "notes",
      "label": "43. Month-over-month revenue growth with empty months",
      "heading": "43. Month-over-month revenue growth with empty months ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Report January through April 2024, including months with zero completed revenue. Show previous calendar-month revenue and percentage growth. Return NULL growth when the previous month is missing or has zero revenue."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "43-answer.sql",
          "text": "WITH months AS (\n  SELECT d::date AS month\n  FROM GENERATE_SERIES(\n    TIMESTAMP '2024-01-01', TIMESTAMP '2024-04-01', INTERVAL '1 month'\n  ) AS g(d)\n), sales AS (\n  SELECT DATE_TRUNC('month', order_date)::date AS month,\n         SUM(amount) AS revenue\n  FROM Orders\n  WHERE status = 'completed'\n  GROUP BY DATE_TRUNC('month', order_date)::date\n), monthly AS (\n  SELECT m.month, COALESCE(s.revenue, 0) AS revenue\n  FROM months m LEFT JOIN sales s ON s.month = m.month\n), previous AS (\n  SELECT month, revenue,\n         LAG(revenue) OVER (ORDER BY month) AS previous_revenue\n  FROM monthly\n)\nSELECT month, revenue, previous_revenue,\n       ROUND(100.0 * (revenue - previous_revenue)\n             / NULLIF(previous_revenue, 0), 2) AS growth_percent\nFROM previous\nORDER BY month;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Build a calendar so LAG really means the previous calendar month. Fill missing sales with zero, then divide the revenue change by the previous revenue."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: GENERATE_SERIES()",
            "Concepts Tested: LAG()",
            "Concepts Tested: LEFT JOIN",
            "Concepts Tested: NULLIF()"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Without February in the input, LAG could compare March directly with January. Growth from zero has no finite percentage."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "month",
            "revenue",
            "previous_revenue",
            "growth_percent"
          ],
          "rows": [
            [
              "2024-01-01",
              "1000.00",
              null,
              null
            ],
            [
              "2024-02-01",
              "0",
              "1000.00",
              "-100.00"
            ],
            [
              "2024-03-01",
              "900.00",
              "0",
              null
            ],
            [
              "2024-04-01",
              "900.00",
              "900.00",
              "0.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q44",
      "type": "notes",
      "label": "44. Customer percentage of completed revenue",
      "heading": "44. Customer percentage of completed revenue ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Show every customer, their total completed spending, and their percentage of all completed revenue. Include customers with no completed spending as zero. If company revenue is zero, return NULL percentages."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "44-answer.sql",
          "text": "WITH totals AS (\n  SELECT c.customer_id, c.customer_name,\n         COALESCE(SUM(o.amount), 0) AS spending\n  FROM Customers c\n  LEFT JOIN Orders o\n    ON o.customer_id = c.customer_id AND o.status = 'completed'\n  GROUP BY c.customer_id, c.customer_name\n)\nSELECT customer_id, customer_name, spending,\n       ROUND(100.0 * spending / NULLIF(SUM(spending) OVER (), 0), 2)\n         AS revenue_percent\nFROM totals\nORDER BY customer_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Calculate one spending value per customer. SUM(spending) OVER () repeats the company total on every row, allowing each share to be calculated."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Window aggregate",
            "Concepts Tested: Percentage",
            "Concepts Tested: COALESCE()",
            "Concepts Tested: NULLIF()"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Keep the completed-status filter inside ON so customers without completed orders survive."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "customer_id",
            "customer_name",
            "spending",
            "revenue_percent"
          ],
          "rows": [
            [
              1,
              "Asha",
              "950.00",
              "33.93"
            ],
            [
              2,
              "Rohan",
              "1550.00",
              "55.36"
            ],
            [
              3,
              "Meera",
              "300.00",
              "10.71"
            ],
            [
              4,
              "Kabir",
              "0",
              "0.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q45",
      "type": "notes",
      "label": "45. Monthly order-status counts and cancellation rate",
      "heading": "45. Monthly order-status counts and cancellation rate ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "For every month containing any order, show completed, cancelled, and pending counts in separate columns, plus cancellation percentage. The denominator is all orders in that month."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "45-answer.sql",
          "text": "SELECT DATE_TRUNC('month', order_date)::date AS month,\n       COUNT(*) AS total_orders,\n       COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed,\n       COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled,\n       COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending,\n       ROUND(100.0 * COUNT(CASE WHEN status = 'cancelled' THEN 1 END)\n             / COUNT(*), 2) AS cancellation_percent\nFROM Orders\nGROUP BY DATE_TRUNC('month', order_date)::date\nORDER BY month;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Conditional counts turn status rows into report columns. Divide cancelled orders by the total count from the same month."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Conditional aggregation",
            "Concepts Tested: CASE",
            "Concepts Tested: Percentage denominator"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Filtering to cancelled orders in WHERE would make the cancellation rate 100%."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "month",
            "total_orders",
            "completed",
            "cancelled",
            "pending",
            "cancellation_percent"
          ],
          "rows": [
            [
              "2024-01-01",
              7,
              5,
              1,
              1,
              "14.29"
            ],
            [
              "2024-02-01",
              1,
              0,
              1,
              0,
              "100.00"
            ],
            [
              "2024-03-01",
              3,
              3,
              0,
              0,
              "0.00"
            ],
            [
              "2024-04-01",
              1,
              1,
              0,
              0,
              "0.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q46",
      "type": "notes",
      "label": "46. Seven-calendar-day moving average",
      "heading": "46. Seven-calendar-day moving average ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "For January 7-10, 2024, show completed revenue for each day and average daily revenue over that day plus the previous six calendar days. Days with no completed orders contribute zero. Round the average to two decimals."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "46-answer.sql",
          "text": "WITH calendar AS (\n  SELECT d::date AS day\n  FROM GENERATE_SERIES(\n    TIMESTAMP '2024-01-01', TIMESTAMP '2024-01-10', INTERVAL '1 day'\n  ) AS g(d)\n), daily AS (\n  SELECT c.day, COALESCE(SUM(o.amount), 0) AS revenue\n  FROM calendar c\n  LEFT JOIN Orders o\n    ON o.order_date = c.day AND o.status = 'completed'\n  GROUP BY c.day\n), rolling AS (\n  SELECT day, revenue,\n         ROUND(AVG(revenue) OVER (\n           ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n         ), 2) AS seven_day_average\n  FROM daily\n)\nSELECT day, revenue, seven_day_average\nFROM rolling\nWHERE day >= DATE '2024-01-07'\nORDER BY day;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Create one row for every calendar day, including zeros. A seven-row window now means seven days. Filter the final display only after calculating the rolling average."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: GENERATE_SERIES()",
            "Concepts Tested: AVG() OVER",
            "Concepts Tested: ROWS BETWEEN",
            "Concepts Tested: Missing dates"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Applying the January 7 filter before the window would remove the six earlier days needed for that first average."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "day",
            "revenue",
            "seven_day_average"
          ],
          "rows": [
            [
              "2024-01-07",
              "350.00",
              "114.29"
            ],
            [
              "2024-01-08",
              "200.00",
              "100.00"
            ],
            [
              "2024-01-09",
              "0",
              "100.00"
            ],
            [
              "2024-01-10",
              "0",
              "78.57"
            ]
          ]
        }
      ]
    },
    {
      "id": "q47",
      "type": "notes",
      "label": "47. Spending in the previous 30 complete days",
      "heading": "47. Spending in the previous 30 complete days ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "As of April 1, 2024, report each customer's completed-order count and spending during the previous 30 complete days: March 2 inclusive to April 1 exclusive. Include customers with zero orders."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "47-answer.sql",
          "text": "SELECT c.customer_id, c.customer_name,\n       COUNT(o.order_id) AS completed_orders,\n       COALESCE(SUM(o.amount), 0) AS spending\nFROM Customers c\nLEFT JOIN Orders o\n  ON o.customer_id = c.customer_id\n AND o.status = 'completed'\n AND o.order_date >= DATE '2024-04-01' - INTERVAL '30 days'\n AND o.order_date < DATE '2024-04-01'\nGROUP BY c.customer_id, c.customer_name\nORDER BY c.customer_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Use a lower-inclusive, upper-exclusive interval. The predicates are in ON to retain customers with no qualifying order."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Date arithmetic",
            "Concepts Tested: Half-open interval",
            "Concepts Tested: LEFT JOIN"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Thirty days is not always one calendar month. A fixed reference date makes the practice output reproducible."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "customer_id",
            "customer_name",
            "completed_orders",
            "spending"
          ],
          "rows": [
            [
              1,
              "Asha",
              0,
              "0"
            ],
            [
              2,
              "Rohan",
              1,
              "100.00"
            ],
            [
              3,
              "Meera",
              1,
              "300.00"
            ],
            [
              4,
              "Kabir",
              0,
              "0"
            ]
          ]
        }
      ]
    },
    {
      "id": "q48",
      "type": "notes",
      "label": "48. Weighted average selling price per product",
      "heading": "48. Weighted average selling price per product ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "For each product sold in completed orders, show total units and average selling price per unit, rounded to two decimals. Use quantity as the weight."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "48-answer.sql",
          "text": "SELECT i.product_id, SUM(i.quantity) AS units_sold,\n       ROUND(SUM(i.quantity * i.unit_price)\n             / NULLIF(SUM(i.quantity), 0), 2) AS average_unit_price\nFROM OrderItems i\nJOIN Orders o ON o.order_id = i.order_id\nWHERE o.status = 'completed'\nGROUP BY i.product_id\nORDER BY i.product_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Total product revenue divided by total quantity gives the actual average price per unit. A line with more units contributes more weight."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Weighted average",
            "Concepts Tested: SUM(quantity * price)",
            "Concepts Tested: JOIN"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: AVG(unit_price) would treat a one-unit line and a nine-unit line equally."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "product_id",
            "units_sold",
            "average_unit_price"
          ],
          "rows": [
            [
              1,
              20,
              "96.00"
            ],
            [
              2,
              16,
              "48.75"
            ],
            [
              3,
              1,
              "100.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q49",
      "type": "notes",
      "label": "49. Bought products 1 and 2, but never product 3",
      "heading": "49. Bought products 1 and 2, but never product 3 ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find customers who bought product 1 and product 2 but never product 3. Purchases may be in different orders. Only completed orders count."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "49-answer.sql",
          "text": "SELECT c.customer_id, c.customer_name\nFROM Customers c\nJOIN Orders o ON o.customer_id = c.customer_id\nJOIN OrderItems i ON i.order_id = o.order_id\nWHERE o.status = 'completed'\nGROUP BY c.customer_id, c.customer_name\nHAVING COUNT(CASE WHEN i.product_id = 1 THEN 1 END) > 0\n   AND COUNT(CASE WHEN i.product_id = 2 THEN 1 END) > 0\n   AND COUNT(CASE WHEN i.product_id = 3 THEN 1 END) = 0\nORDER BY c.customer_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Group all completed purchases for each customer, then check that the first two products are present and the third is absent."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: HAVING",
            "Concepts Tested: Conditional aggregation",
            "Concepts Tested: Multiple JOINs"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Do not filter product 3 out in WHERE; then you could no longer detect customers who bought it."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "customer_id",
            "customer_name"
          ],
          "rows": [
            [
              1,
              "Asha"
            ]
          ]
        }
      ]
    },
    {
      "id": "q50",
      "type": "notes",
      "label": "50. Products frequently purchased together",
      "heading": "50. Products frequently purchased together ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Return each unordered product pair bought together in at least two different completed orders. Count orders, not units, and show each pair only once."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "50-answer.sql",
          "text": "SELECT a.product_id AS product_a, b.product_id AS product_b,\n       COUNT(DISTINCT a.order_id) AS orders_together\nFROM OrderItems a\nJOIN OrderItems b\n  ON b.order_id = a.order_id AND a.product_id < b.product_id\nJOIN Orders o ON o.order_id = a.order_id\nWHERE o.status = 'completed'\nGROUP BY a.product_id, b.product_id\nHAVING COUNT(DISTINCT a.order_id) >= 2\nORDER BY orders_together DESC, product_a, product_b;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Join each order item to other items in the same order. The smaller-ID condition prevents both self-pairs and reversed copies of the same pair."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Self join",
            "Concepts Tested: COUNT(DISTINCT)",
            "Concepts Tested: Pair deduplication"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: product_a < product_b gives a single representation for each unordered pair."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "product_a",
            "product_b",
            "orders_together"
          ],
          "rows": [
            [
              1,
              2,
              5
            ]
          ]
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
            "Agree on order status and the denominator before calculating revenue or rates.",
            "Use a calendar when missing days or months must appear as zero.",
            "Calculate a window before filtering out rows it needs for history.",
            "A running total starts at the first row; a moving average uses a bounded frame.",
            "Weighted average price = total item revenue / total units."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Topic references: questions and sample data in this set were written for this collection."
          ]
        },
        {
          "type": "list",
          "items": [
            "LeetCode SQL 50: https://leetcode.com/studyplan/top-sql-50/",
            "HackerRank SQL practice categories: https://www.hackerrank.com/domains/sql",
            "PostgreSQL window functions: https://www.postgresql.org/docs/current/functions-window.html",
            "PostgreSQL series functions: https://www.postgresql.org/docs/current/functions-srf.html"
          ]
        }
      ]
    }
  ]
};
