window.notePageData = {
    "title": "SQL Operations — 01 SQL Reference",
    "navLabel": "SQL operations sections-01",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "SQL Operations",
        "text": "A practical reference covering database and table operations, constraints, CRUD commands, and the filtering operators used to query data in PostgreSQL — each with the exact syntax you'll actually write."
    },
    "nav": [
        { "label": "Database Operations",       "href": "#database-operations" },
        { "label": "Table Operations",           "href": "#table-operations" },
        { "label": "Types of Tables",            "href": "#table-types" },
        { "label": "Table Creation Methods",     "href": "#table-creation-methods" },
        { "label": "Alter Table Operations",     "href": "#alter-table-operations" },
        { "label": "Constraints",                "href": "#constraints" },
        { "label": "CRUD Operations",            "href": "#crud-operations" },
        { "label": "Filtering Data",             "href": "#filtering-data" }
    ],
    "sections": [
        {
            "id": "database-operations",
            "type": "terminology",
            "label": "1. Database Operations",
            "heading": "Database Operations",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "CREATE DATABASE",
                            "definition": "Creates a new, empty database on the server, ready to hold schemas, tables, and data."
                        },
                        {
                            "term": "ALTER DATABASE",
                            "definition": "Modifies properties of an existing database, such as renaming it, changing its owner, or updating connection limits."
                        },
                        {
                            "term": "DROP DATABASE",
                            "definition": "Permanently deletes a database and everything inside it — all tables, data, and schemas are unrecoverable once dropped."
                        }
                    ]
                },
                {
                    "type": "code",
                    "filename": "example.sql",
                    "text": "-- Create a new database\nCREATE DATABASE ecommerce;\n\n-- Rename an existing database\nALTER DATABASE ecommerce RENAME TO ecommerce_app;\n\n-- Change the owner of a database\nALTER DATABASE ecommerce_app OWNER TO app_user;\n\n-- Permanently delete a database (irreversible)\nDROP DATABASE ecommerce_app;"
                }
            ]
        },

        {
            "id": "table-operations",
            "type": "terminology",
            "label": "2. Table Operations",
            "heading": "Table Operations",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "CREATE TABLE",
                            "definition": "Defines a new table with its columns, data types, and constraints inside a database."
                        },
                        {
                            "term": "ALTER TABLE",
                            "definition": "Modifies an existing table's structure — adding, dropping, or changing columns and constraints — without losing existing data."
                        },
                        {
                            "term": "RENAME TABLE",
                            "definition": "Changes the name of an existing table, done in PostgreSQL through ALTER TABLE ... RENAME TO."
                        },
                        {
                            "term": "TRUNCATE TABLE",
                            "definition": "Instantly removes all rows from a table while keeping its structure intact. Faster than DELETE since it skips row-by-row logging, but cannot be filtered with a WHERE clause."
                        },
                        {
                            "term": "DROP TABLE",
                            "definition": "Permanently deletes a table along with its structure and all of its data."
                        }
                    ]
                },
                {
                    "type": "code",
                    "filename": "example.sql",
                    "text": "-- Create a new table\nCREATE TABLE products (\n    id    SERIAL PRIMARY KEY,\n    name  VARCHAR(150) NOT NULL,\n    price NUMERIC(10,2)\n);\n\n-- Add a new column\nALTER TABLE products ADD COLUMN in_stock BOOLEAN DEFAULT true;\n\n-- Rename the table\nALTER TABLE products RENAME TO product_catalog;\n\n-- Remove all rows but keep the table structure\nTRUNCATE TABLE product_catalog;\n\n-- Permanently delete the table\nDROP TABLE product_catalog;"
                }
            ]
        },

  

        {
            "id": "table-types",
            "type": "terminology",
            "label": "3. Types of Tables",
            "heading": "Types of Tables in PostgreSQL",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "1. Simple Table",
                            "definition": "A basic table with plain columns and no explicit constraints beyond data types. Used for quick prototyping or storing flat, independent data."
                        },
                        {
                            "term": "2. Primary Key Table",
                            "definition": "A table with a PRIMARY KEY constraint — one or more columns whose values uniquely identify every row. PostgreSQL automatically creates a unique index on the PK column(s)."
                        },
                        {
                            "term": "3. Foreign Key Table",
                            "definition": "A table that holds a FOREIGN KEY column referencing the PRIMARY KEY of another table, enforcing referential integrity between the two."
                        },
                        {
                            "term": "4. Self-Referencing Table",
                            "definition": "A table whose foreign key points back to its own primary key, used to model hierarchical or recursive relationships (e.g. employees and their managers)."
                        },
                        {
                            "term": "5. Junction Table (Many-to-Many)",
                            "definition": "A bridge table that resolves a many-to-many relationship by holding the primary keys of both related tables as foreign keys. Often has a composite primary key."
                        },
                        {
                            "term": "6. Lookup Table",
                            "definition": "A small reference table of fixed, predefined values (e.g. status codes, categories). Other tables reference it via a foreign key instead of repeating raw strings."
                        },
                        {
                            "term": "7. Transaction Table",
                            "definition": "A high-write table that records business events or financial movements (e.g. orders, payments). Typically append-only and indexed heavily for query performance."
                        },
                        {
                            "term": "8. Audit Table",
                            "definition": "A table that captures a history of changes (INSERT / UPDATE / DELETE) made to another table, usually populated by triggers. Preserves who changed what and when."
                        }
                    ]
                },
                {
                    "type": "code",
                    "filename": "table_types.sql",
                    "text": "-- 1. Simple Table\nCREATE TABLE notes (\n    id         SERIAL,\n    content    TEXT,\n    created_at TIMESTAMP\n);\n\n-- 2. Primary Key Table\nCREATE TABLE users (\n    id       SERIAL       PRIMARY KEY,\n    username VARCHAR(80)  NOT NULL UNIQUE,\n    email    VARCHAR(255) NOT NULL\n);\n\n-- 3. Foreign Key Table\nCREATE TABLE orders (\n    id         SERIAL PRIMARY KEY,\n    user_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    ordered_at TIMESTAMP DEFAULT NOW()\n);\n\n-- 4. Self-Referencing Table\nCREATE TABLE employees (\n    id         SERIAL PRIMARY KEY,\n    name       VARCHAR(120) NOT NULL,\n    manager_id INT REFERENCES employees(id)   -- points to itself\n);\n\n-- 5. Junction Table (Many-to-Many)\nCREATE TABLE student_courses (\n    student_id INT REFERENCES students(id) ON DELETE CASCADE,\n    course_id  INT REFERENCES courses(id)  ON DELETE CASCADE,\n    PRIMARY KEY (student_id, course_id)\n);\n\n-- 6. Lookup Table\nCREATE TABLE order_statuses (\n    id   SERIAL PRIMARY KEY,\n    name VARCHAR(50) NOT NULL UNIQUE   -- 'pending', 'shipped', 'delivered'\n);\n\n-- 7. Transaction Table\nCREATE TABLE payments (\n    id       SERIAL        PRIMARY KEY,\n    order_id INT           NOT NULL REFERENCES orders(id),\n    amount   NUMERIC(12,2) NOT NULL,\n    paid_at  TIMESTAMP     DEFAULT NOW(),\n    method   VARCHAR(30)   NOT NULL\n);\n\n-- 8. Audit Table\nCREATE TABLE users_audit (\n    audit_id   SERIAL PRIMARY KEY,\n    user_id    INT,\n    operation  CHAR(1)    NOT NULL,   -- 'I'nsert, 'U'pdate, 'D'elete\n    changed_at TIMESTAMP  DEFAULT NOW(),\n    changed_by VARCHAR(80),\n    old_data   JSONB,\n    new_data   JSONB\n);"
                }
            ]
        },

        {
            "id": "table-creation-methods",
            "type": "terminology",
            "label": "4. Table Creation Methods",
            "heading": "Table Creation Methods",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "CREATE TABLE",
                            "definition": "Standard syntax to define a new table from scratch with full control over columns, data types, and constraints."
                        },
                        {
                            "term": "CREATE TABLE IF NOT EXISTS",
                            "definition": "Same as CREATE TABLE but silently skips creation if a table with that name already exists — essential for idempotent migrations and deployment scripts."
                        },
                        {
                            "term": "CREATE TABLE LIKE",
                            "definition": "Copies the column definitions of an existing table into a new one. Use INCLUDING ALL to also copy defaults, indexes, and constraints. No data is copied."
                        },
                        {
                            "term": "CREATE TABLE AS SELECT",
                            "definition": "Creates a new table and immediately fills it with the result set of a SELECT query. Useful for snapshots, derived datasets, and temporary working tables."
                        }
                    ]
                },
                {
                    "type": "table",
                    "headers": ["Method", "Copies Structure", "Copies Data", "Safe if Exists", "Primary Use"],
                    "rows": [
                        ["CREATE TABLE",                   "Manual",  "—",   "No",  "Define new tables from scratch"],
                        ["CREATE TABLE IF NOT EXISTS",     "Manual",  "—",   "Yes", "Idempotent scripts & migrations"],
                        ["CREATE TABLE LIKE",              "Yes",     "No",  "No",  "Clone a table layout for staging / backup"],
                        ["CREATE TABLE AS SELECT",         "Auto",    "Yes", "No",  "Snapshots & derived datasets"]
                    ]
                },
                {
                    "type": "code",
                    "filename": "create_methods.sql",
                    "text": "-- 1. CREATE TABLE  (standard — full control)\nCREATE TABLE products (\n    id    SERIAL PRIMARY KEY,\n    name  VARCHAR(150) NOT NULL,\n    price NUMERIC(10,2)\n);\n\n-- 2. CREATE TABLE IF NOT EXISTS  (safe for re-runs)\nCREATE TABLE IF NOT EXISTS products (\n    id    SERIAL PRIMARY KEY,\n    name  VARCHAR(150) NOT NULL,\n    price NUMERIC(10,2)\n);\n\n-- 3. CREATE TABLE LIKE  (clone structure only, no data)\nCREATE TABLE products_backup\n    (LIKE products INCLUDING ALL);\n-- INCLUDING ALL copies: columns, defaults, constraints, indexes\n\n-- 4. CREATE TABLE AS SELECT  (structure + data from a query)\nCREATE TABLE expensive_products AS\nSELECT id, name, price\nFROM   products\nWHERE  price > 500;\n-- Note: constraints and indexes are NOT carried over"
                }
            ]
        },

              {
    "id": "alter-table-operations",
     "type": "terminology",
            "label": "5. Alter Table Operations",
            "heading": "Alter Table Operations",
             "blocks": [
    {
        "type": "code",
        "filename": "alter-table-columns.sql",
        "text": "-- Add Column\nALTER TABLE users ADD COLUMN age INT;\n\n-- Modify Column Data Type\nALTER TABLE users ALTER COLUMN age TYPE BIGINT;\n\n-- Rename Column\nALTER TABLE users RENAME COLUMN name TO full_name;\n\n-- Drop Column\nALTER TABLE users DROP COLUMN age;\n\n-- Add Default Value\nALTER TABLE users ALTER COLUMN status SET DEFAULT 'ACTIVE';\n\n-- Drop Default Value\nALTER TABLE users ALTER COLUMN status DROP DEFAULT;\n\n-- Set NOT NULL\nALTER TABLE users ALTER COLUMN email SET NOT NULL;\n\n-- Drop NOT NULL\nALTER TABLE users ALTER COLUMN email DROP NOT NULL;"
    },
    {
        "type": "code",
        "filename": "alter-table-constraints.sql",
        "text": "-- Add Primary Key\nALTER TABLE users ADD PRIMARY KEY (id);\n\n-- Drop Primary Key\nALTER TABLE users DROP CONSTRAINT users_pkey;\n\n-- Add Foreign Key\nALTER TABLE employees ADD CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id);\n\n-- Drop Foreign Key\nALTER TABLE employees DROP CONSTRAINT fk_department;\n\n-- Add Unique Constraint\nALTER TABLE users ADD CONSTRAINT unique_email UNIQUE(email);\n\n-- Drop Unique Constraint\nALTER TABLE users DROP CONSTRAINT unique_email;\n\n-- Add Check Constraint\nALTER TABLE users ADD CONSTRAINT chk_age CHECK(age >= 18);\n\n-- Drop Check Constraint\nALTER TABLE users DROP CONSTRAINT chk_age;"
    },
    {
        "type": "code",
        "filename": "alter-table-rename.sql",
        "text": "-- Rename Table\nALTER TABLE users RENAME TO customers;"
    }
]
         },

        {
            "id": "constraints",
            "type": "terminology",
            "label": "6. Constraints",
            "heading": "Constraints",
            "blocks": [
               {
    "type": "definitions",
    "items": [
        {
            "term": "PRIMARY KEY",
            "definition": "Uniquely identifies every row in a table. Combines NOT NULL and UNIQUE, and a table can have only one.",
            "code": "CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100)\n);"
        },
        {
            "term": "FOREIGN KEY",
            "definition": "Restricts a column's values to those existing in another table's primary key, enforcing a relationship between the two tables.",
            "code": "CREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    user_id INT REFERENCES users(id)\n);"
        },
        {
            "term": "UNIQUE",
            "definition": "Ensures every value in a column is different from all others in that column, though unlike a primary key it allows one NULL value.",
            "code": "CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) UNIQUE\n);"
        },
        {
            "term": "NOT NULL",
            "definition": "Forces a column to always have a value — NULL is never accepted for that column.",
            "code": "CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) NOT NULL\n);"
        },
        {
            "term": "CHECK",
            "definition": "Validates that a column's value satisfies a custom boolean condition before it can be inserted or updated.",
            "code": "CREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    price NUMERIC(10,2) CHECK (price > 0)\n);"
        },
        {
            "term": "DEFAULT",
            "definition": "Supplies an automatic value for a column when no value is explicitly provided on insert.",
            "code": "CREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    status VARCHAR(20) DEFAULT 'pending'\n);"
        }
    ]
},
{
    "type": "code",
    "filename": "constraints-combined.sql",
    "text": "-- Parent Table\nCREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Child Table Using All Major Constraints\nCREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    user_id INT NOT NULL REFERENCES users(id),\n    order_code VARCHAR(20) UNIQUE NOT NULL,\n    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),\n    status VARCHAR(20) DEFAULT 'pending',\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);"
}
            ]
        },

        {
            "id": "crud-operations",
            "type": "terminology",
            "label": "7. CRUD Operations",
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
    "code": "Most Common Production Usage\n-- =========================================\n\n-- Remove all rows\nTRUNCATE TABLE users;\n\n-- Remove all rows and reset SERIAL/IDENTITY\nTRUNCATE TABLE users RESTART IDENTITY;\n\n-- Remove all rows from related tables\nTRUNCATE TABLE users CASCADE;"
}
                    ]
                }
            ]
        },

        {
            "id": "filtering-data",
            "type": "terminology",
            "label": "8. Filtering Data",
            "heading": "Filtering Data",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
    {
        "term": "WHERE",
        "definition": "Filters rows so only those matching a given condition are returned, updated, or deleted.",
        "code": "-- Equality\nSELECT * FROM users WHERE status = 'Active';\n\n-- Comparison Operators\nSELECT * FROM employees WHERE salary > 50000;\nSELECT * FROM employees WHERE salary >= 50000;\nSELECT * FROM employees WHERE salary < 100000;\nSELECT * FROM employees WHERE salary <= 100000;\nSELECT * FROM employees WHERE salary <> 75000;"
    },
    {
        "term": "AND",
        "definition": "Combines multiple conditions in a WHERE clause so that all of them must be true.",
        "code": "-- All conditions must be true\nSELECT * FROM users\nWHERE status = 'Active'\nAND age >= 18\nAND country = 'India';"
    },
    {
        "term": "OR",
        "definition": "Combines multiple conditions in a WHERE clause so that at least one of them must be true.",
        "code": "-- Any condition can be true\nSELECT * FROM users\nWHERE status = 'Active'\nOR status = 'Pending';"
    },
    {
        "term": "NOT",
        "definition": "Negates a condition, returning rows where the condition is false.",
        "code": "-- Negate a condition\nSELECT * FROM users\nWHERE NOT status = 'Inactive';\n\n-- NOT IN\nSELECT * FROM users\nWHERE status NOT IN ('Blocked', 'Deleted');"
    },
    {
        "term": "IN",
        "definition": "Checks whether a column's value matches any value in a given list, avoiding multiple OR conditions.",
        "code": "-- Match from a list\nSELECT * FROM users\nWHERE status IN ('Active', 'Pending', 'Blocked');\n\n-- IN with Subquery\nSELECT * FROM orders\nWHERE user_id IN (\n    SELECT id\n    FROM users\n    WHERE status = 'Active'\n);"
    },
    {
        "term": "BETWEEN",
        "definition": "Checks whether a column's value falls within an inclusive range of two values.",
        "code": "-- Numeric Range\nSELECT * FROM employees\nWHERE salary BETWEEN 50000 AND 100000;\n\n-- Date Range\nSELECT * FROM orders\nWHERE order_date BETWEEN '2025-01-01' AND '2025-12-31';"
    },
    {
        "term": "LIKE",
        "definition": "Matches a column's text against a pattern using % and _, case-sensitive by default.",
        "code": "-- Starts With\nSELECT * FROM users\nWHERE name LIKE 'Shiv%';\n\n-- Ends With\nSELECT * FROM users\nWHERE name LIKE '%Singh';\n\n-- Contains\nSELECT * FROM users\nWHERE name LIKE '%iva%';\n\n-- Single Character\nSELECT * FROM users\nWHERE name LIKE 'A_';"
    },
    {
        "term": "ILIKE",
        "definition": "A PostgreSQL-specific case-insensitive version of LIKE.",
        "code": "-- Case-Insensitive Search\nSELECT * FROM users\nWHERE name ILIKE 'shiv%';\n\nSELECT * FROM users\nWHERE email ILIKE '%gmail.com';"
    },
    {
        "term": "ANY",
        "definition": "Compares a value against a set of values and returns true if at least one comparison succeeds.",
        "code": "-- ANY with Array\nSELECT * FROM employees\nWHERE department_id = ANY (ARRAY[1,2,3]);\n\n-- ANY with Subquery\nSELECT * FROM employees\nWHERE department_id = ANY (\n    SELECT id\n    FROM departments\n    WHERE location = 'Hyderabad'\n);"
    },
    {
        "term": "IS NULL",
        "definition": "Returns rows where a column contains a NULL value.",
        "code": "-- Find rows with NULL values\nSELECT *\nFROM users\nWHERE deleted_at IS NULL;"
    },
    {
        "term": "IS NOT NULL",
        "definition": "Returns rows where a column contains a non-NULL value.",
        "code": "-- Find rows with non-NULL values\nSELECT *\nFROM users\nWHERE deleted_at IS NOT NULL;"
    },
    {
        "term": "NOT IN",
        "definition": "Excludes rows whose value matches any value in a specified list.",
        "code": "-- Exclude values from a list\nSELECT *\nFROM users\nWHERE status NOT IN ('Blocked', 'Deleted');"
    },
    {
        "term": "BETWEEN",
        "definition": "Filters values within an inclusive range.",
        "code": "-- Numeric Range\nSELECT *\nFROM employees\nWHERE salary BETWEEN 50000 AND 100000;\n\n-- Date Range\nSELECT *\nFROM orders\nWHERE order_date BETWEEN '2025-01-01' AND '2025-12-31';"
    },
    {
        "term": "SOME",
        "definition": "Alias of ANY. Returns true if a comparison matches at least one value from a set.",
        "code": "-- SOME behaves exactly like ANY\nSELECT *\nFROM employees\nWHERE department_id = SOME (ARRAY[1,2,3]);"
    },
    {
        "term": "ALL",
        "definition": "Returns true only if the comparison is true for every value in the set.",
        "code": "-- Salary greater than all intern salaries\nSELECT *\nFROM employees\nWHERE salary > ALL (\n    SELECT salary\n    FROM interns\n);"
    },
    {
        "term": "Array Filtering",
        "definition": "PostgreSQL-specific operators used to query array columns.",
        "code": "-- Contains (@>)\nSELECT *\nFROM users\nWHERE roles @> ARRAY['admin'];\n\n-- Contained By (<@)\nSELECT *\nFROM users\nWHERE ARRAY['admin'] <@ roles;\n\n-- Overlap (&&)\nSELECT *\nFROM users\nWHERE roles && ARRAY['admin','manager'];\n\n-- ANY with Array\nSELECT *\nFROM users\nWHERE 'admin' = ANY(roles);"
    },
    {
    "term": "JSON Filtering",
    "definition": "PostgreSQL JSONB operators allow filtering data stored inside JSON documents. The examples below use a products table containing a metadata JSONB column and a users table containing a profile JSONB column.",
    "code": "-- Sample Table Data\n-- products\n-- +----+----------+-------------------------------------------------------------+\n-- | id | name     | metadata                                                    |\n-- +----+----------+-------------------------------------------------------------+\n-- | 1  | Laptop   | {\"status\":\"active\",\"price\":50000,\"discount\":10}       |\n-- | 2  | Mobile   | {\"status\":\"inactive\",\"price\":15000,\"offer\":true}     |\n-- | 3  | Monitor  | {\"status\":\"active\",\"price\":12000,\"discount\":15}      |\n-- +----+----------+-------------------------------------------------------------+\n--\n-- users\n-- +----+--------+-------------------------------------------------------------+\n-- | id | name   | profile                                                     |\n-- +----+--------+-------------------------------------------------------------+\n-- | 1  | Shivam | {\"address\":{\"city\":\"Hyderabad\",\"country\":\"India\"}} |\n-- | 2  | Rahul  | {\"address\":{\"city\":\"Delhi\",\"country\":\"India\"}}     |\n-- +----+--------+-------------------------------------------------------------+\n\n-- Access JSON Property (->>)\nSELECT *\nFROM products\nWHERE metadata->>'status' = 'active';\n\n-- Numeric Comparison\nSELECT *\nFROM products\nWHERE (metadata->>'price')::NUMERIC > 1000;\n\n-- Nested JSON Access\nSELECT *\nFROM users\nWHERE profile->'address'->>'city' = 'Hyderabad';\n\n-- Check if Key Exists (?)\nSELECT *\nFROM products\nWHERE metadata ? 'discount';\n\n-- Check if Any Key Exists (?|)\nSELECT *\nFROM products\nWHERE metadata ?| ARRAY['discount', 'offer'];\n\n-- Check if All Keys Exist (?&)\nSELECT *\nFROM products\nWHERE metadata ?& ARRAY['discount', 'status'];\n\n-- JSON Contains Object (@>)\nSELECT *\nFROM products\nWHERE metadata @> '{\"status\":\"active\"}';"
}
]
                }
            ]
        }
    ]
};