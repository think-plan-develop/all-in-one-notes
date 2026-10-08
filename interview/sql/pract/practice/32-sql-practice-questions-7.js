window.notePageData = {
  "title": "32. SQL Practice Questions 7 - Payments, Joins and Backend Scenarios",
  "navLabel": "SQL Practice 7 sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "32. SQL Practice Questions 7 - Payments, Joins and Backend Scenarios",
    "text": "10 solved SQL interview practice questions with complete sample data, simple explanations, and expected results. Questions 61-70 cover payment checks, aggregation before joins, reconciliation, retries, pagination, interval overlap, missing IDs, and recursive hierarchies. All timestamps represent UTC wall-clock values."
  },
  "nav": [
    {
      "label": "Tables & Setup",
      "href": "#tables"
    },
    {
      "label": "61. Paid but Unpaid",
      "href": "#q61"
    },
    {
      "label": "62. Avoid Join Double Counting",
      "href": "#q62"
    },
    {
      "label": "63. FULL JOIN Reconciliation",
      "href": "#q63"
    },
    {
      "label": "64. Duplicate Charges",
      "href": "#q64"
    },
    {
      "label": "65. Latest Attempt Status",
      "href": "#q65"
    },
    {
      "label": "66. Successful Retries",
      "href": "#q66"
    },
    {
      "label": "67. Keyset Pagination",
      "href": "#q67"
    },
    {
      "label": "68. Overlapping Intervals",
      "href": "#q68"
    },
    {
      "label": "69. Missing IDs",
      "href": "#q69"
    },
    {
      "label": "70. Recursive Hierarchy",
      "href": "#q70"
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
            "Questions 61-70 cover payment checks, aggregation before joins, reconciliation, retries, pagination, interval overlap, missing IDs, and recursive hierarchies. All timestamps represent UTC wall-clock values."
          ]
        },
        {
          "type": "code",
          "filename": "set-7-setup.sql",
          "text": "CREATE SCHEMA sql_practice_7;\nSET search_path TO sql_practice_7;\n\nCREATE TABLE Orders (\norder_id INT PRIMARY KEY,\ncustomer_id INT NOT NULL,\namount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),\nstatus VARCHAR(10) NOT NULL CHECK (status IN ('paid', 'pending'))\n);\n\nINSERT INTO Orders (order_id, customer_id, amount, status) VALUES\n(101, 1, 100, 'paid'),\n(102, 2, 200, 'paid'),\n(104, 3, 300, 'paid'),\n(105, 4, 400, 'pending');\n\nCREATE TABLE Payments (\npayment_id INT PRIMARY KEY,\norder_id INT NOT NULL REFERENCES Orders(order_id),\npaid_at TIMESTAMP NOT NULL,\namount NUMERIC(12,2) NOT NULL CHECK (amount > 0),\nstatus VARCHAR(10) NOT NULL CHECK (status IN ('success', 'failed', 'pending'))\n);\n\nINSERT INTO Payments (payment_id, order_id, paid_at, amount, status) VALUES\n(1, 101, '2024-01-01 09:00:00', 100, 'failed'),\n(2, 101, '2024-01-01 09:05:00', 100, 'success'),\n(3, 101, '2024-01-01 09:06:00', 100, 'success'),\n(4, 102, '2024-01-02 10:00:00', 200, 'success'),\n(5, 102, '2024-01-02 10:00:00', 200, 'failed'),\n(6, 104, '2024-01-03 11:00:00', 300, 'failed'),\n(7, 105, '2024-01-04 12:00:00', 400, 'pending');\n\nCREATE TABLE Refunds (\nrefund_id INT PRIMARY KEY,\norder_id INT NOT NULL REFERENCES Orders(order_id),\namount NUMERIC(12,2) NOT NULL CHECK (amount > 0),\nstatus VARCHAR(10) NOT NULL CHECK (status IN ('success', 'pending'))\n);\n\nINSERT INTO Refunds (refund_id, order_id, amount, status) VALUES\n(1, 101, 60, 'success'),\n(2, 101, 40, 'success'),\n(3, 102, 20, 'pending');\n\nCREATE TABLE GatewayPayments (\npayment_id INT PRIMARY KEY,\namount NUMERIC(12,2) NOT NULL,\nstatus VARCHAR(10) NOT NULL CHECK (status IN ('success', 'failed', 'pending'))\n);\n\nINSERT INTO GatewayPayments (payment_id, amount, status) VALUES\n(1, 100, 'failed'),\n(2, 100, 'success'),\n(3, 100, 'success'),\n(4, 190, 'success'),\n(5, 200, 'failed'),\n(7, 400, 'success'),\n(8, 250, 'success');\n\nCREATE TABLE Bookings (\nbooking_id INT PRIMARY KEY,\nroom_id INT NOT NULL,\nstarts_at TIMESTAMP NOT NULL,\nends_at TIMESTAMP NOT NULL,\nCHECK (ends_at > starts_at)\n);\n\nINSERT INTO Bookings (booking_id, room_id, starts_at, ends_at) VALUES\n(1, 1, '2024-01-01 09:00:00', '2024-01-01 10:00:00'),\n(2, 1, '2024-01-01 09:30:00', '2024-01-01 10:30:00'),\n(3, 1, '2024-01-01 10:30:00', '2024-01-01 11:00:00'),\n(4, 2, '2024-01-01 09:30:00', '2024-01-01 10:30:00');\n\nCREATE TABLE Employees (\nemp_id INT PRIMARY KEY,\nemp_name VARCHAR(40) NOT NULL,\nmanager_id INT REFERENCES Employees(emp_id)\n);\n\nINSERT INTO Employees (emp_id, emp_name, manager_id) VALUES\n(1, 'Director', NULL),\n(2, 'Engineering Lead', 1),\n(3, 'Operations Lead', 1),\n(4, 'Developer A', 2),\n(5, 'Developer B', 2),\n(6, 'Support Engineer', 3),\n(7, 'Intern', 4);"
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
            "amount",
            "status"
          ],
          "rows": [
            [
              101,
              1,
              100,
              "paid"
            ],
            [
              102,
              2,
              200,
              "paid"
            ],
            [
              104,
              3,
              300,
              "paid"
            ],
            [
              105,
              4,
              400,
              "pending"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Payments"
          ]
        },
        {
          "type": "table",
          "headers": [
            "payment_id",
            "order_id",
            "paid_at",
            "amount",
            "status"
          ],
          "rows": [
            [
              1,
              101,
              "2024-01-01 09:00:00",
              100,
              "failed"
            ],
            [
              2,
              101,
              "2024-01-01 09:05:00",
              100,
              "success"
            ],
            [
              3,
              101,
              "2024-01-01 09:06:00",
              100,
              "success"
            ],
            [
              4,
              102,
              "2024-01-02 10:00:00",
              200,
              "success"
            ],
            [
              5,
              102,
              "2024-01-02 10:00:00",
              200,
              "failed"
            ],
            [
              6,
              104,
              "2024-01-03 11:00:00",
              300,
              "failed"
            ],
            [
              7,
              105,
              "2024-01-04 12:00:00",
              400,
              "pending"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Refunds"
          ]
        },
        {
          "type": "table",
          "headers": [
            "refund_id",
            "order_id",
            "amount",
            "status"
          ],
          "rows": [
            [
              1,
              101,
              60,
              "success"
            ],
            [
              2,
              101,
              40,
              "success"
            ],
            [
              3,
              102,
              20,
              "pending"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "GatewayPayments"
          ]
        },
        {
          "type": "table",
          "headers": [
            "payment_id",
            "amount",
            "status"
          ],
          "rows": [
            [
              1,
              100,
              "failed"
            ],
            [
              2,
              100,
              "success"
            ],
            [
              3,
              100,
              "success"
            ],
            [
              4,
              190,
              "success"
            ],
            [
              5,
              200,
              "failed"
            ],
            [
              7,
              400,
              "success"
            ],
            [
              8,
              250,
              "success"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Bookings"
          ]
        },
        {
          "type": "table",
          "headers": [
            "booking_id",
            "room_id",
            "starts_at",
            "ends_at"
          ],
          "rows": [
            [
              1,
              1,
              "2024-01-01 09:00:00",
              "2024-01-01 10:00:00"
            ],
            [
              2,
              1,
              "2024-01-01 09:30:00",
              "2024-01-01 10:30:00"
            ],
            [
              3,
              1,
              "2024-01-01 10:30:00",
              "2024-01-01 11:00:00"
            ],
            [
              4,
              2,
              "2024-01-01 09:30:00",
              "2024-01-01 10:30:00"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Employees"
          ]
        },
        {
          "type": "table",
          "headers": [
            "emp_id",
            "emp_name",
            "manager_id"
          ],
          "rows": [
            [
              1,
              "Director",
              null
            ],
            [
              2,
              "Engineering Lead",
              1
            ],
            [
              3,
              "Operations Lead",
              1
            ],
            [
              4,
              "Developer A",
              2
            ],
            [
              5,
              "Developer B",
              2
            ],
            [
              6,
              "Support Engineer",
              3
            ],
            [
              7,
              "Intern",
              4
            ]
          ]
        }
      ]
    },
    {
      "id": "q61",
      "type": "notes",
      "label": "61. Paid orders without a successful payment",
      "heading": "61. Paid orders without a successful payment ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find orders marked paid that have no successful payment attempt. Failed or pending attempts do not count as successful payments."
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
          "filename": "61-answer.sql",
          "text": "SELECT o.order_id, o.amount\nFROM Orders o\nWHERE o.status = 'paid'\n  AND NOT EXISTS (\n    SELECT 1 FROM Payments p\n    WHERE p.order_id = o.order_id AND p.status = 'success'\n  )\nORDER BY o.order_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Start with paid orders, then exclude every order for which a successful payment exists."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: NOT EXISTS",
            "Concepts Tested: Status filtering",
            "Concepts Tested: Data consistency"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Joining only failed payments can produce a false alarm for an order that also has a successful retry."
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
            "order_id",
            "amount"
          ],
          "rows": [
            [
              104,
              "300.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q62",
      "type": "notes",
      "label": "62. Payment and refund totals without double counting",
      "heading": "62. Payment and refund totals without double counting ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "For every order, return successful payment total, successful refund total, and net collected amount. Include orders with no successful payment or refund. Each order can have multiple rows in both child tables."
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
          "filename": "62-answer.sql",
          "text": "WITH paid AS (\n  SELECT order_id, SUM(amount) AS total_paid\n  FROM Payments WHERE status = 'success'\n  GROUP BY order_id\n), refunded AS (\n  SELECT order_id, SUM(amount) AS total_refunded\n  FROM Refunds WHERE status = 'success'\n  GROUP BY order_id\n)\nSELECT o.order_id, o.amount AS order_amount,\n       COALESCE(p.total_paid, 0) AS total_paid,\n       COALESCE(r.total_refunded, 0) AS total_refunded,\n       COALESCE(p.total_paid, 0) - COALESCE(r.total_refunded, 0)\n         AS net_collected\nFROM Orders o\nLEFT JOIN paid p ON p.order_id = o.order_id\nLEFT JOIN refunded r ON r.order_id = o.order_id\nORDER BY o.order_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Aggregate each child table to one row per order before joining. Two payments and two refunds otherwise create four joined rows and inflate both sums."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Pre-aggregation",
            "Concepts Tested: CTE",
            "Concepts Tested: Multiple LEFT JOINs",
            "Concepts Tested: COALESCE()"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: SUM(DISTINCT amount) is not a valid general fix: separate legitimate payments can have the same amount."
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
            "order_id",
            "order_amount",
            "total_paid",
            "total_refunded",
            "net_collected"
          ],
          "rows": [
            [
              101,
              "100.00",
              "200.00",
              "100.00",
              "100.00"
            ],
            [
              102,
              "200.00",
              "200.00",
              "0",
              "200.00"
            ],
            [
              104,
              "300.00",
              "0",
              "0",
              "0"
            ],
            [
              105,
              "400.00",
              "0",
              "0",
              "0"
            ]
          ]
        }
      ]
    },
    {
      "id": "q63",
      "type": "notes",
      "label": "63. Reconcile local payments with gateway records",
      "heading": "63. Reconcile local payments with gateway records ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Match local Payments and GatewayPayments by payment_id. Return IDs missing on either side, plus matched IDs whose amount or status differs. Show both versions."
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
          "filename": "63-answer.sql",
          "text": "SELECT COALESCE(p.payment_id, g.payment_id) AS payment_id,\n       p.amount AS local_amount, g.amount AS gateway_amount,\n       p.status AS local_status, g.status AS gateway_status,\n       CASE\n         WHEN p.payment_id IS NULL THEN 'Missing locally'\n         WHEN g.payment_id IS NULL THEN 'Missing at gateway'\n         ELSE 'Amount or status mismatch'\n       END AS issue\nFROM Payments p\nFULL OUTER JOIN GatewayPayments g ON g.payment_id = p.payment_id\nWHERE p.payment_id IS NULL OR g.payment_id IS NULL\n   OR p.amount IS DISTINCT FROM g.amount\n   OR p.status IS DISTINCT FROM g.status\nORDER BY payment_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: FULL OUTER JOIN preserves unmatched rows from both systems. IS DISTINCT FROM provides a NULL-safe comparison of matched values."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: FULL OUTER JOIN",
            "Concepts Tested: IS DISTINCT FROM",
            "Concepts Tested: CASE",
            "Concepts Tested: Reconciliation"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: An INNER JOIN would hide payments missing from either system."
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
            "payment_id",
            "local_amount",
            "gateway_amount",
            "local_status",
            "gateway_status",
            "issue"
          ],
          "rows": [
            [
              4,
              "200.00",
              "190.00",
              "success",
              "success",
              "Amount or status mismatch"
            ],
            [
              6,
              "300.00",
              null,
              "failed",
              null,
              "Missing at gateway"
            ],
            [
              7,
              "400.00",
              "400.00",
              "pending",
              "success",
              "Amount or status mismatch"
            ],
            [
              8,
              null,
              "250.00",
              null,
              "success",
              "Missing locally"
            ]
          ]
        }
      ]
    },
    {
      "id": "q64",
      "type": "notes",
      "label": "64. Flag possible duplicate successful charges",
      "heading": "64. Flag possible duplicate successful charges ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "For this exercise, multiple successful payments with the same order_id and amount are duplicate-charge candidates. Return each candidate group, its payment count, and total charged. This rule flags candidates for review; it does not prove that a payment is invalid."
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
          "filename": "64-answer.sql",
          "text": "SELECT order_id, amount, COUNT(*) AS successful_charge_count,\n       SUM(amount) AS total_charged\nFROM Payments\nWHERE status = 'success'\nGROUP BY order_id, amount\nHAVING COUNT(*) > 1\nORDER BY order_id, amount;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Ignore failed attempts and group successful charges by the business fields that define a candidate duplicate."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: GROUP BY",
            "Concepts Tested: HAVING",
            "Concepts Tested: Duplicate business keys"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Real duplicate detection should use the payment contract and idempotency key; equal amounts can also be legitimate instalments."
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
            "order_id",
            "amount",
            "successful_charge_count",
            "total_charged"
          ],
          "rows": [
            [
              101,
              "100.00",
              2,
              "200.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q65",
      "type": "notes",
      "label": "65. Status of the latest payment attempt",
      "heading": "65. Status of the latest payment attempt ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Return each order with its latest payment attempt and status. Later paid_at wins; if timestamps tie, larger payment_id wins. Preserve orders without any attempt."
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
          "filename": "65-answer.sql",
          "text": "WITH ranked AS (\n  SELECT p.*, ROW_NUMBER() OVER (\n    PARTITION BY order_id ORDER BY paid_at DESC, payment_id DESC\n  ) AS rn\n  FROM Payments p\n)\nSELECT o.order_id, p.payment_id, p.paid_at, p.status AS latest_status\nFROM Orders o\nLEFT JOIN ranked p ON p.order_id = o.order_id AND p.rn = 1\nORDER BY o.order_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Rank all attempts per order, then join only rank 1. The payment ID makes same-time attempts deterministic."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: ROW_NUMBER()",
            "Concepts Tested: Deterministic ordering",
            "Concepts Tested: LEFT JOIN"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Filter to successful attempts before ranking only if asked for the latest successful attempt. This question asks for the latest attempt of any status."
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
            "order_id",
            "payment_id",
            "paid_at",
            "latest_status"
          ],
          "rows": [
            [
              101,
              3,
              "2024-01-01 09:06:00",
              "success"
            ],
            [
              102,
              5,
              "2024-01-02 10:00:00",
              "failed"
            ],
            [
              104,
              6,
              "2024-01-03 11:00:00",
              "failed"
            ],
            [
              105,
              7,
              "2024-01-04 12:00:00",
              "pending"
            ]
          ]
        }
      ]
    },
    {
      "id": "q66",
      "type": "notes",
      "label": "66. Successful retries after an earlier failure",
      "heading": "66. Successful retries after an earlier failure ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find orders whose first successful payment was preceded by at least one failed payment. Order attempts by paid_at, then payment_id. Return the first successful payment for each qualifying order."
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
          "filename": "66-answer.sql",
          "text": "WITH first_success AS (\n  SELECT p.*, ROW_NUMBER() OVER (\n    PARTITION BY order_id ORDER BY paid_at, payment_id\n  ) AS rn\n  FROM Payments p\n  WHERE status = 'success'\n)\nSELECT s.order_id, s.payment_id, s.paid_at\nFROM first_success s\nWHERE s.rn = 1 AND EXISTS (\n  SELECT 1 FROM Payments f\n  WHERE f.order_id = s.order_id AND f.status = 'failed'\n    AND (f.paid_at, f.payment_id) < (s.paid_at, s.payment_id)\n)\nORDER BY s.order_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: First identify the earliest successful attempt. Then check for an earlier failure using the same timestamp-and-ID ordering."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: ROW_NUMBER()",
            "Concepts Tested: EXISTS",
            "Concepts Tested: Row-value comparison"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: An order with a failure only after its first success is not a successful-retry case."
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
            "order_id",
            "payment_id",
            "paid_at"
          ],
          "rows": [
            [
              101,
              2,
              "2024-01-01 09:05:00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q67",
      "type": "notes",
      "label": "67. Cursor pagination with duplicate timestamps",
      "heading": "67. Cursor pagination with duplicate timestamps ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "List payments newest first, three at a time. The last item on the previous page has paid_at = 2024-01-02 10:00:00 and payment_id = 5. Return the next three rows after that cursor."
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
          "filename": "67-answer.sql",
          "text": "SELECT payment_id, order_id, paid_at, amount, status\nFROM Payments\nWHERE (paid_at, payment_id) < (TIMESTAMP '2024-01-02 10:00:00', 5)\nORDER BY paid_at DESC, payment_id DESC\nLIMIT 3;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: The pair comparison selects rows strictly after the last seen row in descending order. payment_id breaks timestamp ties so payment 4 is not skipped."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Keyset pagination",
            "Concepts Tested: Composite cursor",
            "Concepts Tested: ORDER BY",
            "Concepts Tested: LIMIT"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: A supporting index is (paid_at DESC, payment_id DESC). Keyset pagination avoids scanning a growing OFFSET, but it does not itself create a fixed snapshot across requests."
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
            "payment_id",
            "order_id",
            "paid_at",
            "amount",
            "status"
          ],
          "rows": [
            [
              4,
              102,
              "2024-01-02 10:00:00",
              "200.00",
              "success"
            ],
            [
              3,
              101,
              "2024-01-01 09:06:00",
              "100.00",
              "success"
            ],
            [
              2,
              101,
              "2024-01-01 09:05:00",
              "100.00",
              "success"
            ]
          ]
        }
      ]
    },
    {
      "id": "q68",
      "type": "notes",
      "label": "68. Find overlapping room bookings",
      "heading": "68. Find overlapping room bookings ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find pairs of bookings that overlap in the same room. Intervals include the start and exclude the end, so one booking ending exactly when another starts does not overlap. Show each pair once."
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
          "filename": "68-answer.sql",
          "text": "SELECT a.room_id, a.booking_id AS booking_a, b.booking_id AS booking_b\nFROM Bookings a\nJOIN Bookings b\n  ON a.room_id = b.room_id\n AND a.booking_id < b.booking_id\n AND a.starts_at < b.ends_at\n AND b.starts_at < a.ends_at\nORDER BY a.room_id, booking_a, booking_b;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Two intervals overlap when each one starts before the other ends. The ID comparison removes self-matches and mirrored pairs."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Self join",
            "Concepts Tested: Interval overlap",
            "Concepts Tested: Strict inequalities"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Use strict < comparisons for these half-open intervals. Using <= would count touching endpoints as a conflict."
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
            "room_id",
            "booking_a",
            "booking_b"
          ],
          "rows": [
            [
              1,
              1,
              2
            ]
          ]
        }
      ]
    },
    {
      "id": "q69",
      "type": "notes",
      "label": "69. Find missing order numbers in a range",
      "heading": "69. Find missing order numbers in a range ⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "List missing integer order IDs between the smallest and largest existing order_id, inclusive. Report gaps only; an ID gap does not by itself prove that data was deleted."
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
          "filename": "69-answer.sql",
          "text": "WITH bounds AS (\n  SELECT MIN(order_id) AS first_id, MAX(order_id) AS last_id\n  FROM Orders\n)\nSELECT expected.order_id AS missing_order_id\nFROM bounds b\nCROSS JOIN LATERAL GENERATE_SERIES(b.first_id, b.last_id)\n  AS expected(order_id)\nLEFT JOIN Orders o ON o.order_id = expected.order_id\nWHERE o.order_id IS NULL\nORDER BY missing_order_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Generate every expected integer in the observed range, then keep numbers that fail to match an existing order."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: GENERATE_SERIES()",
            "Concepts Tested: LATERAL",
            "Concepts Tested: Anti join"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Generated IDs can legitimately have gaps after rollbacks or failed inserts. Avoid expanding an enormous numeric range in a real query."
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
            "missing_order_id"
          ],
          "rows": [
            [
              103
            ]
          ]
        }
      ]
    },
    {
      "id": "q70",
      "type": "notes",
      "label": "70. All direct and indirect reports of a manager",
      "heading": "70. All direct and indirect reports of a manager ⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find every employee reporting directly or indirectly to manager emp_id = 1. Exclude that manager. Return depth, where direct reports have depth 1. Include a path so cycles can be rejected."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Hard"
          ]
        },
        {
          "type": "code",
          "filename": "70-answer.sql",
          "text": "WITH RECURSIVE reports AS (\n  SELECT emp_id, emp_name, manager_id, 1 AS depth,\n         ARRAY[1, emp_id] AS path\n  FROM Employees\n  WHERE manager_id = 1 AND emp_id <> 1\n\n  UNION ALL\n\n  SELECT e.emp_id, e.emp_name, e.manager_id, r.depth + 1,\n         r.path || e.emp_id\n  FROM Employees e\n  JOIN reports r ON e.manager_id = r.emp_id\n  WHERE NOT (e.emp_id = ANY(r.path))\n)\nSELECT emp_id, emp_name, manager_id, depth, path\nFROM reports\nORDER BY depth, emp_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: The anchor query finds direct reports. The recursive query repeatedly finds reports of those employees. The path prevents revisiting an employee already in the same chain."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: WITH RECURSIVE",
            "Concepts Tested: Anchor and recursive member",
            "Concepts Tested: Hierarchy",
            "Concepts Tested: Cycle guard"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: An ordinary self join reaches a fixed number of levels; recursion can follow an unknown hierarchy depth."
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
            "emp_id",
            "emp_name",
            "manager_id",
            "depth",
            "path"
          ],
          "rows": [
            [
              2,
              "Engineering Lead",
              1,
              1,
              "{1,2}"
            ],
            [
              3,
              "Operations Lead",
              1,
              1,
              "{1,3}"
            ],
            [
              4,
              "Developer A",
              2,
              2,
              "{1,2,4}"
            ],
            [
              5,
              "Developer B",
              2,
              2,
              "{1,2,5}"
            ],
            [
              6,
              "Support Engineer",
              3,
              2,
              "{1,3,6}"
            ],
            [
              7,
              "Intern",
              4,
              3,
              "{1,2,4,7}"
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
            "When two child tables both have many rows per parent, aggregate each before joining.",
            "FULL OUTER JOIN is useful when missing rows from either side matter.",
            "Latest attempt and latest successful attempt are different questions.",
            "Use a unique tie-breaker in ranking and cursor ordering.",
            "Define interval boundaries; use a cycle guard in recursive hierarchy queries."
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
            "HackerRank SQL practice categories: https://www.hackerrank.com/domains/sql",
            "PostgreSQL table expressions: https://www.postgresql.org/docs/current/queries-table-expressions.html",
            "PostgreSQL row comparisons: https://www.postgresql.org/docs/current/functions-comparisons.html",
            "PostgreSQL recursive queries: https://www.postgresql.org/docs/current/queries-with.html"
          ]
        }
      ]
    }
  ]
};
