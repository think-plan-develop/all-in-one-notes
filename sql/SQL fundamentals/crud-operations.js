window.notePageData = {
    "title": "06. SQL Operations — CRUD Operations",
    "navLabel": "CRUD Operations",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "06. SQL Operations — CRUD Operations",
        "text": "Create, read, update and delete data in PostgreSQL: INSERT, SELECT, UPDATE, DELETE, plus TRUNCATE."
    },
    "nav": [
        {
            "label": "CRUD Operations",
            "href": "#crud-operations"
        }
    ],
    "sections": [
        {
            "id": "crud-operations",
            "type": "terminology",
            "label": "CRUD Operations",
            "heading": "CRUD Operations",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "INSERT",
                            "definition": "Adds one or more new rows of data into a table. PostgreSQL supports inserting explicit values, copying data from queries, returning inserted rows, and conflict handling through UPSERT operations.",
                            "code": "-- 1. Single Row Insert\nINSERT INTO users (name, email)\nVALUES ('John', 'john@example.com');\n\n-- 2. Multiple Row Insert\nINSERT INTO users (name, email)\nVALUES\n('Alice', 'alice@example.com'),\n('Bob', 'bob@example.com');\n\n-- 3. Insert Specific Columns\nINSERT INTO users (name)\nVALUES ('Shivam');\n\n-- 4. Insert From SELECT\nINSERT INTO active_users (id, name, email)\nSELECT id, name, email\nFROM users\nWHERE status = 'Active';\n\n-- 5. Insert With RETURNING\nINSERT INTO users (name, email)\nVALUES ('Tom', 'tom@example.com')\nRETURNING *;\n\n-- 6. Upsert (ON CONFLICT)\nINSERT INTO users (id, name, email)\nVALUES (1, 'Shivam', 'shivam@example.com')\nON CONFLICT (id)\nDO UPDATE SET\n    name = EXCLUDED.name,\n    email = EXCLUDED.email;\n\n-- 7. Insert Default Values\nINSERT INTO users DEFAULT VALUES;"
                        },
                        {
                            "term": "SELECT",
                            "definition": "Retrieves data from one or more tables. PostgreSQL supports filtering, sorting, grouping, joining, aggregation, subqueries, CTEs, window functions, and set operations.",
                            "code": "-- Basic SELECT: Retrieve all or specific columns\nSELECT * FROM users;\nSELECT id, name, email FROM users;\n\n-- WHERE: Filter rows\nSELECT * FROM users WHERE status = 'Active';\n\n-- ORDER BY: Sort rows\nSELECT * FROM users ORDER BY created_at DESC;\n\n-- LIMIT/OFFSET: Pagination\nSELECT * FROM users LIMIT 10 OFFSET 20;\n\n-- DISTINCT: Remove duplicate values\nSELECT DISTINCT department FROM employees;\n\n-- Aggregate Functions: Perform calculations\nSELECT COUNT(*), AVG(salary), MAX(salary), MIN(salary), SUM(salary)\nFROM employees;\n\n-- GROUP BY: Group rows\nSELECT department, COUNT(*)\nFROM employees\nGROUP BY department;\n\n-- HAVING: Filter grouped data\nSELECT department, COUNT(*)\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 5;\n\n-- CASE: Conditional logic\nSELECT name,\n       CASE\n           WHEN salary >= 100000 THEN 'High'\n           WHEN salary >= 50000 THEN 'Medium'\n           ELSE 'Low'\n       END AS category\nFROM employees;\n\n-- JOINS: Combine related tables\nSELECT u.name, o.order_code\nFROM users u\nJOIN orders o ON u.id = o.user_id;\n\n-- Subquery: Query inside a query\nSELECT *\nFROM employees\nWHERE salary > (\n    SELECT AVG(salary)\n    FROM employees\n);\n\n-- CTE (WITH): Temporary result set\nWITH high_salary AS (\n    SELECT *\n    FROM employees\n    WHERE salary > 100000\n)\nSELECT * FROM high_salary;\n\n-- Window Function: Ranking without grouping\nSELECT name,\n       salary,\n       RANK() OVER (ORDER BY salary DESC)\nFROM employees;\n\n-- Set Operation: Combine query results\nSELECT email FROM customers\nUNION\nSELECT email FROM suppliers;"
                        },
                        {
                            "term": "UPDATE",
                            "definition": "Modifies existing rows in a table. Updates can target a single column, multiple columns, rows matching specific conditions, or values derived from other tables.",
                            "code": "-- 1. Single Column Update\nUPDATE users\nSET name = 'Shivam'\nWHERE id = 1;\n\n-- 2. Multiple Column Update\nUPDATE users\nSET\n    name = 'Shivam Singh',\n    email = 'shivam@example.com',\n    status = 'Active'\nWHERE id = 1;\n\n-- 3. Conditional Update Using CASE\nUPDATE employees\nSET salary =\n    CASE\n        WHEN department = 'IT' THEN salary + 10000\n        WHEN department = 'HR' THEN salary + 5000\n        ELSE salary\n    END;\n\n-- 4. Update Using Another Table (JOIN Update)\nUPDATE employees e\nSET department_name = d.department_name\nFROM departments d\nWHERE e.department_id = d.id;"
                        },
                        {
                            "term": "DELETE",
                            "definition": "Removes existing rows from a table. PostgreSQL supports deleting specific rows, deleting based on related tables, subqueries, returning deleted data, and removing all rows from a table.",
                            "code": "-- 1. Single Row Delete\nDELETE FROM users\nWHERE id = 1;\n\n-- 2. Multiple Row Delete\nDELETE FROM orders\nWHERE status = 'cancelled';\n\n-- 3. Conditional Delete\nDELETE FROM users\nWHERE created_at < '2025-01-01';\n\n-- 4. Delete Using Subquery\nDELETE FROM orders\nWHERE user_id IN (\n    SELECT id\n    FROM users\n    WHERE status = 'Inactive'\n);\n\n-- 5. Delete Using JOIN (USING)\nDELETE FROM orders o\nUSING users u\nWHERE o.user_id = u.id\nAND u.status = 'Inactive';\n\n-- 6. Delete With RETURNING\nDELETE FROM users\nWHERE id = 5\nRETURNING *;\n\n-- 7. Delete All Rows\nDELETE FROM users;"
                        },
                        {
                            "term": "TRUNCATE",
                            "definition": "Quickly removes all rows from one or more tables while preserving the table structure. It is faster than DELETE because it does not scan individual rows. PostgreSQL also supports restarting identity sequences and cascading truncation to related tables.",
                            "code": "-- Remove all rows\nTRUNCATE TABLE users;\n\n-- Remove all rows and reset SERIAL/IDENTITY\nTRUNCATE TABLE users RESTART IDENTITY;\n\n-- Remove all rows from related tables\nTRUNCATE TABLE users CASCADE;"
                        }
                    ]
                }
            ]
        }
    ]
};
