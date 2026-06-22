window.notePageData = {
  "title": "PostgreSQL Interview Questions",
  "navLabel": "PostgreSQL sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "PostgreSQL Interview Questions",
    "text": "Top 25 most asked PostgreSQL interview questions covering core concepts, data types, joins, indexing, transactions, and performance optimization."
  },
  "nav": [
    { "label": "Basics", "href": "#basics" },
    { "label": "Data Types", "href": "#datatypes" },
    { "label": "Querying", "href": "#querying" },
    { "label": "Joins", "href": "#joins" },
    { "label": "Indexes", "href": "#indexes" },
    { "label": "Transactions", "href": "#transactions" },
    { "label": "Advanced", "href": "#advanced" }
  ],
  "sections": [
    {
      "id": "basics",
      "type": "interview-questions",
      "label": "Basics",
      "heading": "Basics",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "1. What is PostgreSQL?",
              "answer": "PostgreSQL is an open-source, object-relational database management system (ORDBMS) known for its standards compliance, extensibility, and advanced features. It supports complex queries, foreign keys, triggers, views, transactions, and MVCC. Unlike MySQL, it supports custom data types, operators, and functions, and is ACID-compliant by default."
            },
            {
              "question": "2. What is the difference between PostgreSQL and MySQL?",
              "answer": "PostgreSQL is object-relational and fully ACID-compliant, supports advanced data types (JSONB, arrays, hstore), uses MVCC for concurrency, and handles complex queries better. MySQL is purely relational, simpler and faster for read-heavy workloads, and more widely used in web apps. PostgreSQL is preferred for complex data, analytics, and strict data integrity; MySQL for simple, high-speed web applications."
            },
            {
              "question": "3. What is MVCC (Multi-Version Concurrency Control)?",
              "answer": "MVCC is PostgreSQL's mechanism to handle concurrent reads and writes without locking. Instead of locking rows on read, PostgreSQL maintains multiple versions of a row. Each transaction sees a snapshot of the database at the time it started. Readers don't block writers and writers don't block readers. Old versions are cleaned up by VACUUM."
            },
            {
              "question": "4. What is ACID?",
              "answer": "ACID is a set of properties that guarantee reliable database transactions:\n\nAtomicity — all operations in a transaction succeed or none are applied.\nConsistency — a transaction brings the DB from one valid state to another.\nIsolation — concurrent transactions execute as if they were sequential.\nDurability — once committed, changes are permanent even after a crash (via WAL)."
            }
          ]
        }
      ]
    },
    {
      "id": "datatypes",
      "type": "interview-questions",
      "label": "Data Types",
      "heading": "Data Types",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "7. What is the difference between CHAR, VARCHAR, and TEXT?",
              "answer": "CHAR(n) is fixed-length — always stores exactly n characters, padding with spaces. Useful for fixed-size codes like country codes.\nVARCHAR(n) is variable-length with a maximum of n characters. Good when you want to enforce a length limit.\nTEXT is variable-length with no limit. In PostgreSQL, TEXT and VARCHAR perform identically — TEXT is preferred for general string storage since there is no performance difference."
            },
            {
              "question": "8. What is the difference between SERIAL and UUID?",
              "answer": "SERIAL is an auto-incrementing integer (1, 2, 3...). It is simple, compact, and fast for joins but sequential — predictable and not safe for public-facing IDs.\nUUID (Universally Unique Identifier) is a 128-bit value (e.g. a4b1c2d3-...). It is globally unique, safe for distributed systems and public APIs, but larger (16 bytes vs 4 bytes) and slightly slower for indexing. Use SERIAL for internal IDs, UUID for distributed or exposed identifiers.",
              "code": "id SERIAL PRIMARY KEY;\nid UUID DEFAULT gen_random_uuid() PRIMARY KEY;"
            },
            {
              "question": "9. What is the difference between JSON and JSONB?",
              "answer": "JSON stores data as plain text, preserving whitespace and key order. It is faster to insert but slower to query since it re-parses on every read.\nJSONB stores data in a decomposed binary format. It is slightly slower to insert but much faster to query and supports indexing (GIN indexes). In practice, always prefer JSONB unless you need to preserve exact formatting or key order.",
              "code": "-- Index only works on JSONB\nCREATE INDEX idx_data ON orders USING GIN (data);"
            }
          ]
        }
      ]
    },
    {
      "id": "querying",
      "type": "interview-questions",
      "label": "Querying",
      "heading": "Querying",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "5. What is the difference between DELETE, TRUNCATE, and DROP?",
              "answer": "DELETE removes selected rows (or all rows if no WHERE) row-by-row. It is DML, fires triggers, and can be rolled back.\nTRUNCATE removes all rows at once by deallocating data pages. It is DDL, does not fire row-level triggers, resets SERIAL counters, and cannot be rolled back (in most DBs — PostgreSQL allows TRUNCATE inside a transaction).\nDROP removes the entire table including its structure, indexes, and constraints. Cannot be rolled back outside a transaction block.",
              "code": "DELETE FROM users WHERE active = false;\nTRUNCATE TABLE logs;\nDROP TABLE temp_data;"
            },
            {
              "question": "6. What is the difference between PRIMARY KEY and UNIQUE?",
              "answer": "PRIMARY KEY uniquely identifies each row, cannot be NULL, and only one can exist per table. It automatically creates a unique B-Tree index.\nUNIQUE enforces uniqueness on a column but allows one NULL value (since NULL ≠ NULL in SQL). A table can have multiple UNIQUE constraints. Both create indexes, but only the PRIMARY KEY is the authoritative row identifier.",
              "code": "id SERIAL PRIMARY KEY,\nemail VARCHAR(255) UNIQUE"
            },
            {
              "question": "10. What is the difference between WHERE and HAVING?",
              "answer": "WHERE filters individual rows before any grouping occurs. It cannot use aggregate functions (COUNT, SUM, AVG) since they have not been computed yet.\nHAVING filters groups after GROUP BY has been applied. It can use aggregate functions.\nRule: if the condition involves an aggregate → use HAVING. Otherwise → use WHERE.",
              "code": "SELECT dept_id, COUNT(*) AS emp_count\nFROM employees\nWHERE active = true\nGROUP BY dept_id\nHAVING COUNT(*) > 5;"
            },
            {
              "question": "11. What is the difference between IN and EXISTS?",
              "answer": "IN evaluates the full subquery result and then checks membership. It can be slow on large subquery results since the entire list is materialized.\nEXISTS checks if at least one row is returned by the subquery and short-circuits on the first match — making it faster for large datasets, especially with correlated subqueries.\nUse EXISTS when checking for the presence of related rows. Use IN when working with a small, fixed list of values.",
              "code": "-- EXISTS (preferred for large tables)\nSELECT * FROM users u\nWHERE EXISTS (\n  SELECT 1 FROM orders o WHERE o.user_id = u.id\n);"
            },
            {
              "question": "12. What is the difference between LIKE and ILIKE?",
              "answer": "LIKE performs case-sensitive pattern matching. 'Apple' LIKE 'apple' returns false.\nILIKE performs case-insensitive pattern matching. 'Apple' ILIKE 'apple' returns true.\nILIKE is PostgreSQL-specific. Both use % (any sequence) and _ (single character) wildcards. Note: neither uses a standard B-Tree index when the pattern starts with % — use a GIN/trigram index for full pattern search performance.",
              "code": "SELECT * FROM products WHERE name ILIKE '%phone%';"
            },
            {
              "question": "15. What is GROUP BY?",
              "answer": "GROUP BY collapses multiple rows that share the same value in specified columns into a single summary row. It is used with aggregate functions (COUNT, SUM, AVG, MIN, MAX) to compute per-group statistics. Every column in SELECT that is not inside an aggregate function must appear in GROUP BY.",
              "code": "SELECT dept_id, COUNT(*) AS total, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY dept_id\nORDER BY avg_salary DESC;"
            }
          ]
        }
      ]
    },
    {
      "id": "joins",
      "type": "interview-questions",
      "label": "Joins",
      "heading": "Joins",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "13. What is the difference between INNER JOIN and LEFT JOIN?",
              "answer": "INNER JOIN returns only rows where there is a match in both tables. Rows with no match on either side are excluded.\nLEFT JOIN (LEFT OUTER JOIN) returns all rows from the left table. For rows with no match in the right table, NULL is returned for right-side columns.\nUse LEFT JOIN when you want to keep all records from the left table regardless of whether a related record exists — e.g. all users, with or without orders.",
              "code": "-- All users with or without orders\nSELECT u.name, o.id AS order_id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;"
            },
            {
              "question": "14. What is a SELF JOIN?",
              "answer": "A SELF JOIN joins a table with itself using two aliases. It is used to compare rows within the same table or represent hierarchical relationships (e.g. employees and their managers stored in the same table).",
              "code": "SELECT e.name AS employee, m.name AS manager\nFROM employees e\nJOIN employees m ON e.manager_id = m.id;"
            }
          ]
        }
      ]
    },
    {
      "id": "indexes",
      "type": "interview-questions",
      "label": "Indexes",
      "heading": "Indexes",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "16. What is an Index?",
              "answer": "An index is a separate data structure that allows the database to find rows quickly without scanning the entire table. It works like a book's index — pointing directly to the location of the data. Indexes speed up SELECT and WHERE lookups but slow down INSERT, UPDATE, and DELETE since the index must also be updated. Always add indexes on columns used in WHERE, JOIN ON, and ORDER BY.",
              "code": "CREATE INDEX idx_email ON users(email);"
            },
            {
              "question": "17. What are the types of Indexes in PostgreSQL?",
              "answer": "B-Tree — default. Best for equality (=) and range (>, <, BETWEEN) queries on sortable data.\nHash — only for equality (=) checks. Faster than B-Tree for pure equality but not crash-safe before PG10.\nGIN (Generalized Inverted Index) — for multi-valued types: JSONB, arrays, full-text search. Supports containment and existence operators.\nGiST (Generalized Search Tree) — for geometric types, full-text search, and range types. Supports nearest-neighbor queries.\nBRIN (Block Range Index) — very small index for naturally ordered large tables (e.g. time-series). Trades accuracy for size.\nSP-GiST — for non-balanced structures like quad-trees and radix trees. Good for IP ranges and geometric data.",
              "code": "CREATE INDEX idx_tags ON posts USING GIN(tags);\nCREATE INDEX idx_location ON places USING GIST(coordinates);"
            },
            {
              "question": "18. What is a Composite Index?",
              "answer": "A composite index is an index on two or more columns. It is most effective when queries filter on those columns together, and the column order matters — the index is used when the query includes the leftmost column(s) (leftmost prefix rule). It can also serve ORDER BY if columns and sort directions match.",
              "code": "CREATE INDEX idx_dept_salary ON employees(dept_id, salary);\n-- Used by: WHERE dept_id = 5\n-- Used by: WHERE dept_id = 5 AND salary > 50000\n-- NOT used by: WHERE salary > 50000 alone"
            },
            {
              "question": "19. What is EXPLAIN ANALYZE?",
              "answer": "EXPLAIN shows the query plan the planner intends to use (estimated costs, rows, strategy). EXPLAIN ANALYZE actually executes the query and shows real execution time and row counts alongside estimates. Use it to identify slow operations like Seq Scan (full table scan) where an Index Scan should be used, or to spot incorrect row estimates that cause poor plan choices.",
              "code": "EXPLAIN ANALYZE\nSELECT * FROM orders WHERE user_id = 42;\n\n-- Look for:\n-- Seq Scan → missing index\n-- rows=1 actual rows=10000 → stale statistics, run ANALYZE"
            }
          ]
        }
      ]
    },
    {
      "id": "transactions",
      "type": "interview-questions",
      "label": "Transactions",
      "heading": "Transactions",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "20. What is a Transaction?",
              "answer": "A transaction is a sequence of SQL operations executed as a single unit of work. Either all operations succeed (COMMIT) or all are rolled back (ROLLBACK). Transactions ensure data integrity — e.g. a bank transfer must debit one account and credit another atomically, or neither should happen.",
              "code": "BEGIN;\n  UPDATE accounts SET balance = balance - 500 WHERE id = 1;\n  UPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;\n-- If anything fails: ROLLBACK;"
            },
            {
              "question": "21. What are Isolation Levels?",
              "answer": "Isolation levels control how much a transaction is affected by other concurrent transactions. PostgreSQL supports four levels:\n\nREAD UNCOMMITTED — not truly supported in PG; behaves as READ COMMITTED.\nREAD COMMITTED (default) — sees only committed data at the time of each statement. Prevents dirty reads.\nREPEATABLE READ — sees a snapshot from the start of the transaction. Prevents dirty and non-repeatable reads.\nSERIALIZABLE — full isolation; transactions appear to execute one at a time. Prevents all anomalies including phantom reads.",
              "code": "BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n  SELECT balance FROM accounts WHERE id = 1;\n  -- balance won't change even if another transaction commits\nCOMMIT;"
            }
          ]
        }
      ]
    },
    {
      "id": "advanced",
      "type": "interview-questions",
      "label": "Advanced",
      "heading": "Advanced Concepts",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "22. What is VACUUM?",
              "answer": "Because of MVCC, deleted or updated rows are not immediately removed — they leave dead tuples on disk. VACUUM reclaims storage by removing these dead tuples and updating visibility maps. VACUUM ANALYZE also refreshes planner statistics. AUTOVACUUM runs automatically in the background. VACUUM FULL rewrites the entire table to reclaim disk space but holds an exclusive lock — use rarely.",
              "code": "VACUUM users;           -- reclaim dead tuples\nVACUUM ANALYZE users;   -- reclaim + refresh statistics\nVACUUM FULL users;      -- full rewrite, reclaims disk (locks table)"
            },
            {
              "question": "23. What is a View vs Materialized View?",
              "answer": "A View is a stored SELECT query that acts as a virtual table. It has no data of its own — every time you query it, the underlying SQL runs. Always up to date but no performance benefit for expensive queries.\nA Materialized View stores the query result physically on disk. Queries against it are fast since no recomputation occurs. However, data can become stale — you must refresh it manually or on a schedule. Best for expensive aggregations that don't need real-time freshness.",
              "code": "-- View (always fresh)\nCREATE VIEW active_users AS\n  SELECT * FROM users WHERE active = true;\n\n-- Materialized View (cached result)\nCREATE MATERIALIZED VIEW monthly_revenue AS\n  SELECT DATE_TRUNC('month', created_at), SUM(amount)\n  FROM orders GROUP BY 1;\n\nREFRESH MATERIALIZED VIEW monthly_revenue;"
            },
            {
              "question": "24. What is a Trigger?",
              "answer": "A trigger is a function that automatically executes in response to a specified event (INSERT, UPDATE, DELETE, TRUNCATE) on a table. Triggers can run BEFORE or AFTER the event, and FOR EACH ROW or FOR EACH STATEMENT. Common uses: audit logging, enforcing complex business rules, auto-updating timestamps.",
              "code": "CREATE OR REPLACE FUNCTION set_updated_at()\nRETURNS TRIGGER AS $$\nBEGIN\n  NEW.updated_at = NOW();\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trg_updated_at\nBEFORE UPDATE ON users\nFOR EACH ROW EXECUTE FUNCTION set_updated_at();"
            },
            {
              "question": "25. What is WAL (Write-Ahead Logging)?",
              "answer": "WAL is PostgreSQL's mechanism for crash recovery and durability. Before any data change is written to the actual data files, it is first written to the WAL log (a sequential append-only file). On crash, PostgreSQL replays the WAL to restore the database to a consistent state. WAL also enables replication — standby servers stream and apply WAL records from the primary to stay in sync.",
              "code": "-- WAL files are stored in:\n-- $PGDATA/pg_wal/\n\n-- WAL level controls replication detail:\nwal_level = replica   -- enables streaming replication\nwal_level = logical   -- enables logical decoding / CDC"
            }
          ]
        }
      ]
    }
  ]
}