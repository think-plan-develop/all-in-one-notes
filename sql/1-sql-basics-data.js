window.notePageData = 
  {
  "title": "SQL & Database Fundamentals",
  "navLabel": "SQL Sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "SQL & Database Fundamentals",
    "text": "A complete guide to Database Fundamentals, Relational Concepts, Keys, Constraints, Data Types, Relationships, Joins, Normalization, and SQL Language Categories — everything you need to master SQL from the ground up."
  },
  "nav": [
    {
      "label": "1. Database Fundamentals",
      "href": "#db-fundamentals",
      "children": [
        { "label": "What is Data",            "href": "#db-fundamentals" },
        { "label": "What is Database",        "href": "#db-fundamentals" },
        { "label": "File System vs Database", "href": "#db-fundamentals" },
        { "label": "DBMS",                    "href": "#db-fundamentals" },
        { "label": "RDBMS",                   "href": "#db-fundamentals" }
      ]
    },
    {
      "label": "2. Relational Database Concepts",
      "href": "#relational-db",
      "children": [
        { "label": "Table",          "href": "#relational-db" },
        { "label": "Row",            "href": "#relational-db" },
        { "label": "Column",         "href": "#relational-db" },
        { "label": "Schema",         "href": "#relational-db" },
        { "label": "Data Integrity", "href": "#relational-db" }
      ]
    },
    {
      "label": "3. Keys",
      "href": "#keys",
      "children": [
        { "label": "Primary Key",   "href": "#keys" },
        { "label": "Foreign Key",   "href": "#keys" },
        { "label": "Candidate Key", "href": "#keys" },
        { "label": "Alternate Key", "href": "#keys" },
        { "label": "Composite Key", "href": "#keys" },
        { "label": "Unique Key",    "href": "#keys" }
      ]
    },
    {
      "label": "4. Constraints",
      "href": "#constraints",
      "children": [
        { "label": "NOT NULL",     "href": "#constraints" },
        { "label": "UNIQUE",       "href": "#constraints" },
        { "label": "PRIMARY KEY",  "href": "#constraints" },
        { "label": "FOREIGN KEY",  "href": "#constraints" },
        { "label": "CHECK",        "href": "#constraints" },
        { "label": "DEFAULT",      "href": "#constraints" }
      ]
    },
    {
      "label": "5. Data Types",
      "href": "#data-types",
      "children": [
        { "label": "Numeric", "href": "#data-types" },
        { "label": "String",  "href": "#data-types" },
        { "label": "Boolean", "href": "#data-types" },
        { "label": "Date",    "href": "#data-types" },
        { "label": "Time",    "href": "#data-types" },
        { "label": "UUID",    "href": "#data-types" },
        { "label": "ARRAY",   "href": "#data-types" },
        { "label": "JSON",    "href": "#data-types" },
        { "label": "JSONB",   "href": "#data-types" }
      ]
    },
    {
      "label": "6. Relationships & Joins",
      "href": "#relationships",
      "children": [
        { "label": "One-to-One",     "href": "#relationships" },
        { "label": "One-to-Many",    "href": "#relationships" },
        { "label": "Many-to-Many",   "href": "#relationships" },
        { "label": "Junction Tables","href": "#relationships" },
        { "label": "INNER JOIN",     "href": "#relationships" },
        { "label": "LEFT JOIN",      "href": "#relationships" },
        { "label": "RIGHT JOIN",     "href": "#relationships" },
        { "label": "FULL OUTER JOIN","href": "#relationships" }
      ]
    },
    {
      "label": "7. Normalization",
      "href": "#normalization",
      "children": [
        { "label": "1NF",            "href": "#normalization" },
        { "label": "2NF",            "href": "#normalization" },
        { "label": "3NF",            "href": "#normalization" },
        { "label": "BCNF",           "href": "#normalization" },
        { "label": "Denormalization","href": "#normalization" }
      ]
    },
    {
      "label": "8. SQL Language Categories",
      "href": "#sql-categories",
      "children": [
        { "label": "DDL", "href": "#sql-categories" },
        { "label": "DML", "href": "#sql-categories" },
        { "label": "DQL", "href": "#sql-categories" },
        { "label": "DCL", "href": "#sql-categories" },
        { "label": "TCL", "href": "#sql-categories" }
      ]
    },
    { "label": "Best Practices",      "href": "#best-practices" },
    { "label": "Q&A",                 "href": "#qa" },
    { "label": "Interview Questions", "href": "#interview" },
    { "label": "Common Mistakes",     "href": "#common-mistakes" },
    { "label": "Summary",             "href": "#summary" }
  ],
  "sections": [

    {
      "id": "notes",
      "type": "notes",
      "label": "Notes",
      "heading": "Key Concepts at a Glance",
      "blocks": [
        {
          "type": "list",
          "items": [
            "A Database is an organized collection of structured data stored electronically.",
            "DBMS (Database Management System) is the software that manages databases.",
            "RDBMS stores data in tables with rows and columns and supports SQL.",
            "A Primary Key uniquely identifies each row in a table — cannot be NULL or duplicate.",
            "A Foreign Key links one table to the Primary Key of another table.",
            "Constraints enforce rules on data — NOT NULL, UNIQUE, CHECK, DEFAULT, FOREIGN KEY.",
            "Relationships: One-to-One, One-to-Many, Many-to-Many (via junction table).",
            "Joins reassemble related data at query time — INNER, LEFT, RIGHT, FULL OUTER.",
            "Normalization eliminates redundancy — 1NF, 2NF, 3NF, BCNF.",
            "SQL categories: DDL (structure), DML (data), DQL (query), DCL (permissions), TCL (transactions).",
            "Data Integrity = accuracy + consistency of data throughout its lifecycle."
          ]
        }
      ]
    },

    {
      "id": "db-fundamentals",
      "type": "terminology",
      "label": "Database Fundamentals",
      "heading": "1. Database Fundamentals",
      "blocks": [
        {
          "type": "definitions",
          "items": [
            {
              "term": "What is Data?",
              "definition": "Data is raw, unprocessed facts and figures without any context. Example: 25, 'Shivam', 'Delhi'. On its own it has no meaning. When organized and given context it becomes information. Example: Name=Shivam, Age=25, City=Delhi."
            },
            {
              "term": "What is a Database?",
              "definition": "A database is an organized, structured collection of related data stored electronically so it can be easily accessed, managed, and updated. Example: A school database stores student records, courses, and grades all in one place."
            },
            {
              "term": "File System vs Database",
              "definition": "A File System stores data in flat files (CSV, TXT) with no relationships, no query language, no concurrent access control, and high data redundancy. A Database provides structured storage, relationships between data, SQL queries, transactions, security, and concurrency control. Databases solve problems that file systems cannot — duplicate data, no integrity rules, no multi-user access."
            },
            {
              "term": "DBMS — Database Management System",
              "definition": "DBMS is software that acts as an interface between the user and the database. It handles data storage, retrieval, security, backup, and concurrency. Examples: MySQL, PostgreSQL, Oracle, SQLite, MongoDB. It allows users to define, create, maintain, and control access to the database without knowing the internal storage details."
            },
            {
              "term": "RDBMS — Relational Database Management System",
              "definition": "RDBMS is a type of DBMS based on the relational model by Edgar F. Codd (1970). Data is stored in tables (relations) with rows and columns. Tables are related to each other via keys. It supports SQL (Structured Query Language). Examples: PostgreSQL, MySQL, Oracle, SQL Server, SQLite."
            }
          ]
        },
        {
          "type": "table",
          "headers": ["Feature", "File System", "DBMS / RDBMS"],
          "rows": [
            ["Data Storage",    "Flat files (CSV, TXT)",     "Structured tables"],
            ["Data Redundancy", "High — data repeated",      "Minimal — normalized"],
            ["Data Integrity",  "No enforcement",             "Constraints enforced"],
            ["Query Language",  "None",                       "SQL"],
            ["Relationships",   "Not supported",              "Foreign Keys, Joins"],
            ["Multi-user",      "No concurrency control",     "Transactions + Locking"],
            ["Security",        "OS-level only",              "User roles, permissions"],
            ["Examples",        "CSV, JSON files",            "MySQL, PostgreSQL, Oracle"]
          ]
        }
      ]
    },

    {
      "id": "relational-db",
      "type": "terminology",
      "label": "Relational Database Concepts",
      "heading": "2. Relational Database Concepts",
      "blocks": [
        {
          "type": "definitions",
          "items": [
            {
              "term": "Table (Relation)",
              "definition": "A table is the fundamental storage unit in a relational database. It organizes data into rows and columns. Each table represents one entity — like users, products, or orders. Example: A 'users' table has columns: id, name, email, age."
            },
            {
              "term": "Row (Tuple / Record)",
              "definition": "A row is a single horizontal record in a table. Each row represents one instance of the entity. Example: In the 'users' table, one row is { id:1, name:'Shivam', email:'shivam@example.com', age:25 }. A table with 1000 users has 1000 rows."
            },
            {
              "term": "Column (Attribute / Field)",
              "definition": "A column is a vertical structure that holds values of a specific attribute for all rows. Each column has a name, data type, and optional constraints. Example: The 'email' column in 'users' stores email addresses and has a UNIQUE constraint."
            },
            {
              "term": "Schema",
              "definition": "A schema is the blueprint or structure of a database — it defines which tables exist, what columns each table has, their data types, constraints, and relationships. Think of it as the design/architecture of the database before any data is inserted. Changing a schema (adding columns, renaming tables) is a schema migration."
            },
            {
              "term": "Data Integrity",
              "definition": "Data integrity means the accuracy, consistency, and reliability of data throughout its lifecycle. There are four types: Entity Integrity (each row is uniquely identified by a Primary Key), Referential Integrity (Foreign Keys point to valid rows), Domain Integrity (values match the defined data type and constraints), and User-Defined Integrity (custom business rules via CHECK constraints)."
            }
          ]
        },
        {
          "type": "code",
          "filename": "relational-concepts.sql",
          "text": "-- TABLE: structure with columns and types\nCREATE TABLE users (\n  id         SERIAL       PRIMARY KEY,   -- column: unique row id\n  first_name VARCHAR(50)  NOT NULL,      -- column: text, required\n  email      VARCHAR(100) UNIQUE,        -- column: unique email\n  age        INT          CHECK(age > 0) -- column: positive number\n);\n\n-- ROW: one record inserted\nINSERT INTO users (first_name, email, age)\nVALUES ('Shivam', 'shivam@example.com', 25);\n\n-- each row is one user:\n-- id=1, first_name='Shivam', email='shivam@example.com', age=25\n\n-- SCHEMA: view table structure\n\\d users        -- PostgreSQL\nDESCRIBE users; -- MySQL"
        }
      ]
    },

    {
      "id": "keys",
      "type": "terminology",
      "label": "Keys",
      "heading": "3. Keys in RDBMS",
      "blocks": [
        {
          "type": "definitions",
          "items": [
            {
              "term": "Primary Key (PK)",
              "definition": "A Primary Key uniquely identifies each row in a table. Rules: must be UNIQUE, must NOT be NULL, each table can have only ONE Primary Key. It can be a single column or a combination of columns (composite). Example: id column in users table. Best practice: use SERIAL / AUTO_INCREMENT or UUID as primary keys."
            },
            {
              "term": "Foreign Key (FK)",
              "definition": "A Foreign Key is a column in one table that references the Primary Key of another table. It creates a relationship between tables and enforces Referential Integrity — you cannot insert a Foreign Key value that does not exist in the referenced table. Example: orders.user_id references users.id. If user_id=99 does not exist in users, the insert fails."
            },
            {
              "term": "Candidate Key",
              "definition": "A Candidate Key is any column (or set of columns) that could qualify as a Primary Key — it is unique and NOT NULL. A table can have multiple candidate keys. The DBA chooses one as the Primary Key; the rest become Alternate Keys. Example: In users table, both 'id' and 'email' are candidate keys since both are unique and NOT NULL."
            },
            {
              "term": "Alternate Key",
              "definition": "An Alternate Key is a Candidate Key that was NOT chosen as the Primary Key. It is still unique and NOT NULL — often enforced with a UNIQUE constraint. Example: If 'id' is the Primary Key, then 'email' is an Alternate Key."
            },
            {
              "term": "Composite Key",
              "definition": "A Composite Key is a Primary Key (or any key) made up of TWO or more columns together. No single column is unique on its own — only the combination is unique. Example: In an enrollment table, (student_id, course_id) together form the Composite Primary Key — one student can enroll in many courses, one course can have many students, but each (student, course) pair is unique."
            },
            {
              "term": "Unique Key",
              "definition": "A Unique Key enforces uniqueness on a column like a Primary Key, but it ALLOWS NULL values (one or more, depending on the database). A table can have MULTIPLE unique keys unlike Primary Key. Example: phone_number and email in users table can both have UNIQUE constraints. Implemented with: UNIQUE(column_name)."
            }
          ]
        },
        {
          "type": "code",
          "filename": "keys.sql",
          "text": "-- PRIMARY KEY — single column\nCREATE TABLE users (\n  id    SERIAL PRIMARY KEY,     -- PK: unique + not null + auto\n  email VARCHAR(100) UNIQUE,   -- Alternate Key / Unique Key\n  phone VARCHAR(15)  UNIQUE    -- another Unique Key\n);\n\n-- FOREIGN KEY — links orders to users\nCREATE TABLE orders (\n  id         SERIAL PRIMARY KEY,\n  user_id    INT NOT NULL,\n  total      DECIMAL(10,2),\n  FOREIGN KEY (user_id) REFERENCES users(id)\n    ON DELETE CASCADE    -- delete orders when user is deleted\n    ON UPDATE CASCADE    -- update FK when PK changes\n);\n\n-- COMPOSITE PRIMARY KEY — (student_id + course_id) together\nCREATE TABLE enrollments (\n  student_id INT NOT NULL,\n  course_id  INT NOT NULL,\n  enrolled_at DATE,\n  PRIMARY KEY (student_id, course_id),  -- composite PK\n  FOREIGN KEY (student_id) REFERENCES students(id),\n  FOREIGN KEY (course_id)  REFERENCES courses(id)\n);\n\n-- CANDIDATE KEYS: id, email, phone — all could be PK\n-- PRIMARY KEY: id (chosen)\n-- ALTERNATE KEYS: email, phone (not chosen but unique)"
        },
        {
          "type": "table",
          "headers": ["Key Type", "Unique?", "NULL Allowed?", "Count per Table", "Example"],
          "rows": [
            ["Primary Key",   "Yes", "No",  "Only 1",    "id"],
            ["Foreign Key",   "No",  "Yes", "Many",      "user_id → users.id"],
            ["Candidate Key", "Yes", "No",  "Many",      "id, email, phone"],
            ["Alternate Key", "Yes", "No",  "Many",      "email (if id is PK)"],
            ["Composite Key", "Yes", "No",  "1 (as PK)", "(student_id, course_id)"],
            ["Unique Key",    "Yes", "Yes", "Many",      "email with UNIQUE"]
          ]
        }
      ]
    },

    {
      "id": "constraints",
      "type": "terminology",
      "label": "Constraints",
      "heading": "4. Constraints",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Constraints are rules enforced on table columns to maintain ",
            { "code": "data integrity" },
            ". They are defined at CREATE TABLE time or added later with ALTER TABLE. If a constraint is violated, the database rejects the operation with an error."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "NOT NULL",
              "definition": "Ensures a column cannot store a NULL value — it must always have a value. Use for required fields. Example: name VARCHAR(50) NOT NULL — every user must have a name. Without NOT NULL, a column accepts NULL by default."
            },
            {
              "term": "UNIQUE",
              "definition": "Ensures all values in a column (or combination of columns) are distinct — no duplicates allowed. Allows NULL unless combined with NOT NULL. A table can have multiple UNIQUE constraints. Example: email VARCHAR(100) UNIQUE ensures no two users share the same email."
            },
            {
              "term": "PRIMARY KEY",
              "definition": "Combines NOT NULL + UNIQUE into one constraint. Uniquely identifies each row. Only one PRIMARY KEY per table. Automatically creates an index on the column for faster lookups. Example: id SERIAL PRIMARY KEY."
            },
            {
              "term": "FOREIGN KEY",
              "definition": "Ensures a value in one table's column exists as a Primary Key in another table — enforcing Referential Integrity. Prevents orphan records. Options: ON DELETE CASCADE (auto-delete child rows), ON DELETE SET NULL (set FK to null), ON DELETE RESTRICT (block deletion if child rows exist)."
            },
            {
              "term": "CHECK",
              "definition": "Defines a boolean condition that every row's value must satisfy. If the condition is false, the insert/update is rejected. Example: age INT CHECK(age >= 0 AND age <= 150) prevents invalid ages. CHECK constraints can reference multiple columns: CHECK(end_date > start_date)."
            },
            {
              "term": "DEFAULT",
              "definition": "Specifies a default value for a column when no value is provided during INSERT. Does not prevent NULL unless combined with NOT NULL. Example: is_active BOOLEAN DEFAULT true means new users are active by default. created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP auto-sets insert time."
            }
          ]
        },
        {
          "type": "code",
          "filename": "constraints.sql",
          "text": "CREATE TABLE employees (\n\n  -- PRIMARY KEY = UNIQUE + NOT NULL, auto-increment\n  id          SERIAL          PRIMARY KEY,\n\n  -- NOT NULL: name is required\n  first_name  VARCHAR(50)     NOT NULL,\n  last_name   VARCHAR(50)     NOT NULL,\n\n  -- UNIQUE: no two employees share same email\n  email       VARCHAR(100)    NOT NULL UNIQUE,\n\n  -- CHECK: salary must be a positive number\n  salary      DECIMAL(10,2)   CHECK(salary > 0),\n\n  -- CHECK: age between 18 and 65\n  age         INT             CHECK(age BETWEEN 18 AND 65),\n\n  -- DEFAULT: new employees are active by default\n  is_active   BOOLEAN         DEFAULT true,\n\n  -- DEFAULT: auto-set timestamp on insert\n  created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,\n\n  -- FOREIGN KEY: must reference a valid department\n  dept_id     INT,\n  FOREIGN KEY (dept_id) REFERENCES departments(id)\n    ON DELETE SET NULL   -- if dept deleted, set dept_id to null\n    ON UPDATE CASCADE    -- if dept id changes, update here too\n\n);\n\n-- ADD CONSTRAINT after table creation\nALTER TABLE employees\n  ADD CONSTRAINT chk_salary CHECK(salary BETWEEN 10000 AND 500000);\n\n-- DROP CONSTRAINT\nALTER TABLE employees\n  DROP CONSTRAINT chk_salary;"
        }
      ]
    },

    {
      "id": "data-types",
      "type": "terminology",
      "label": "Data Types",
      "heading": "5. SQL Data Types",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Every column in a SQL table must have a declared data type. The type determines what values are allowed, how much storage is used, and what operations can be performed. Data types vary slightly between databases — examples below use ",
            { "code": "PostgreSQL" },
            " syntax."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "Numeric Types",
              "definition": "INT / INTEGER: whole numbers (-2B to +2B). BIGINT: large whole numbers. SMALLINT: small whole numbers. DECIMAL(p,s) / NUMERIC(p,s): exact precision decimals — use for money. p = total digits, s = digits after decimal point. FLOAT / REAL: approximate floating-point — avoid for money due to rounding errors. SERIAL / BIGSERIAL: auto-incrementing integers, commonly used for primary keys."
            },
            {
              "term": "String / Text Types",
              "definition": "VARCHAR(n): variable-length string up to n characters — most common for names, emails. CHAR(n): fixed-length string, padded with spaces if shorter — used for fixed codes like country codes. TEXT: unlimited length string — use for long descriptions, content, JSON blobs. VARCHAR is preferred over CHAR for most use cases."
            },
            {
              "term": "Boolean",
              "definition": "BOOLEAN: stores true, false, or NULL. In PostgreSQL, accepts: true/false, 't'/'f', 'yes'/'no', 1/0. Used for flags, toggles, status fields. Example: is_active BOOLEAN DEFAULT true, is_verified BOOLEAN NOT NULL."
            },
            {
              "term": "Date and Time Types",
              "definition": "DATE: stores only the date (YYYY-MM-DD). TIME: stores only the time (HH:MM:SS). TIMESTAMP: stores both date and time without timezone. TIMESTAMPTZ (TIMESTAMP WITH TIME ZONE): stores date+time with timezone — recommended for production apps. INTERVAL: stores a duration like '3 days', '2 hours 30 minutes'."
            },
            {
              "term": "UUID",
              "definition": "UUID (Universally Unique Identifier): 128-bit value that is globally unique — format: 550e8400-e29b-41d4-a716-446655440000. Used as Primary Keys in distributed systems where auto-increment IDs could conflict across databases or servers. PostgreSQL: UUID type, generate with gen_random_uuid() or uuid_generate_v4()."
            },
            {
              "term": "ARRAY",
              "definition": "PostgreSQL supports ARRAY types — a column that stores an ordered list of values of any type. Example: tags TEXT[] stores multiple tags per row. skills INT[] stores multiple skill IDs. Query with ANY(): WHERE 'Node.js' = ANY(skills). Less portable than normalized tables but useful for simple lists."
            },
            {
              "term": "JSON",
              "definition": "JSON type stores JSON text as-is — no validation, no indexing of inner keys. Useful when you need to preserve exact JSON including whitespace. Less efficient than JSONB for querying. Example: metadata JSON stores arbitrary key-value data."
            },
            {
              "term": "JSONB",
              "definition": "JSONB (JSON Binary) stores JSON in a decomposed binary format. Supports indexing on any key inside the JSON using GIN indexes. Faster for reads and queries, slightly slower on write. Most real applications use JSONB over JSON. Example: preferences JSONB allows queries like WHERE preferences->>'theme' = 'dark'."
            }
          ]
        },
        {
          "type": "code",
          "filename": "data-types.sql",
          "text": "CREATE TABLE products (\n\n  -- UUID primary key (distributed-safe)\n  id            UUID            DEFAULT gen_random_uuid() PRIMARY KEY,\n\n  -- VARCHAR: variable text up to 100 chars\n  name          VARCHAR(100)    NOT NULL,\n\n  -- TEXT: unlimited length description\n  description   TEXT,\n\n  -- NUMERIC: exact decimal for money (10 digits, 2 decimal)\n  price         NUMERIC(10, 2)  NOT NULL CHECK(price >= 0),\n\n  -- INT: whole number\n  stock         INT             DEFAULT 0 CHECK(stock >= 0),\n\n  -- BOOLEAN: flag\n  is_active     BOOLEAN         DEFAULT true,\n\n  -- ARRAY: multiple tags stored in one column\n  tags          TEXT[],\n\n  -- JSONB: flexible key-value metadata with indexing\n  metadata      JSONB,\n\n  -- DATE: only date part\n  launch_date   DATE,\n\n  -- TIMESTAMPTZ: date + time + timezone (recommended)\n  created_at    TIMESTAMPTZ     DEFAULT NOW(),\n  updated_at    TIMESTAMPTZ     DEFAULT NOW()\n\n);\n\n-- Insert with ARRAY and JSONB\nINSERT INTO products (name, price, tags, metadata)\nVALUES (\n  'Laptop',\n  79999.99,\n  ARRAY['electronics', 'computers'],    -- ARRAY literal\n  '{\"brand\":\"Dell\",\"warranty\":\"2yr\"}'::JSONB  -- JSONB cast\n);\n\n-- Query ARRAY\nSELECT * FROM products\nWHERE 'electronics' = ANY(tags);\n\n-- Query JSONB\nSELECT * FROM products\nWHERE metadata->>'brand' = 'Dell';\n\n-- JSONB GIN index for fast key queries\nCREATE INDEX idx_products_metadata ON products USING GIN (metadata);"
        },
        {
          "type": "table",
          "headers": ["Category", "Type", "Storage", "Use Case"],
          "rows": [
            ["Numeric",    "SERIAL",       "4 bytes",  "Auto-increment PK"],
            ["Numeric",    "INT",          "4 bytes",  "Counts, IDs"],
            ["Numeric",    "BIGINT",       "8 bytes",  "Large counters"],
            ["Numeric",    "NUMERIC(p,s)", "Variable", "Money, exact decimals"],
            ["Numeric",    "FLOAT",        "8 bytes",  "Approximate decimals"],
            ["String",     "VARCHAR(n)",   "Variable", "Names, emails"],
            ["String",     "CHAR(n)",      "Fixed",    "Country codes, fixed IDs"],
            ["String",     "TEXT",         "Variable", "Long content, descriptions"],
            ["Boolean",    "BOOLEAN",      "1 byte",   "Flags, toggles"],
            ["Date/Time",  "DATE",         "4 bytes",  "Birthdays, launch dates"],
            ["Date/Time",  "TIMESTAMP",    "8 bytes",  "Event timestamps"],
            ["Date/Time",  "TIMESTAMPTZ",  "8 bytes",  "Production timestamps"],
            ["Special",    "UUID",         "16 bytes", "Distributed PKs"],
            ["Special",    "TEXT[]",       "Variable", "Tags, skills arrays"],
            ["Special",    "JSON",         "Variable", "Raw JSON storage"],
            ["Special",    "JSONB",        "Variable", "Indexed JSON queries"]
          ]
        }
      ]
    },

    {
      "id": "relationships",
      "type": "terminology",
      "label": "Relationships & Joins",
      "heading": "6. Relationships & Joins",
      "blocks": [
        {
          "type": "definitions",
          "items": [
            {
              "term": "One-to-One (1:1)",
              "definition": "Each row in Table A is related to exactly ONE row in Table B, and vice versa. Implemented by placing a UNIQUE FOREIGN KEY in one of the tables. Example: Each user has exactly one profile. users.id is referenced by profiles.user_id with a UNIQUE constraint. Use case: splitting a large table into base and extended info for performance."
            },
            {
              "term": "One-to-Many (1:N)",
              "definition": "One row in Table A can relate to MANY rows in Table B, but each row in Table B relates to only ONE row in Table A. The most common relationship type. Implemented by a FOREIGN KEY in the 'many' side table. Example: One user can have many orders. orders.user_id references users.id. One department has many employees."
            },
            {
              "term": "Many-to-Many (M:N)",
              "definition": "Many rows in Table A can relate to many rows in Table B. Cannot be implemented directly — requires a Junction Table (bridge table) in between. The junction table has two Foreign Keys — one to each side. Example: Students and Courses — one student takes many courses, one course has many students. Junction table: enrollments(student_id, course_id)."
            },
            {
              "term": "Junction Table (Bridge / Pivot Table)",
              "definition": "A junction table implements Many-to-Many relationships. It contains (at minimum) two Foreign Keys pointing to the two related tables. The combination of both FKs forms the Composite Primary Key. It can also carry additional data about the relationship itself. Example: enrollments(student_id, course_id, enrolled_at, grade) — the enrolled_at and grade describe the relationship, not just which student and course."
            }
          ]
        },
        {
          "type": "code",
          "filename": "relationships.sql",
          "text": "-- ── ONE-TO-ONE: user has one profile ─────────────────\nCREATE TABLE users (\n  id    SERIAL PRIMARY KEY,\n  name  VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE profiles (\n  id         SERIAL PRIMARY KEY,\n  user_id    INT UNIQUE NOT NULL,     -- UNIQUE = one-to-one\n  bio        TEXT,\n  avatar_url TEXT,\n  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n);\n\n\n-- ── ONE-TO-MANY: one user has many orders ─────────────\nCREATE TABLE orders (\n  id         SERIAL PRIMARY KEY,\n  user_id    INT NOT NULL,            -- FK without UNIQUE = many side\n  total      NUMERIC(10,2),\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT\n);\n-- user_id has NO unique constraint → one user can have many orders\n\n\n-- ── MANY-TO-MANY: students ↔ courses ──────────────────\nCREATE TABLE students (\n  id   SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE courses (\n  id    SERIAL PRIMARY KEY,\n  title VARCHAR(200) NOT NULL\n);\n\n-- JUNCTION TABLE: holds the relationship + extra data\nCREATE TABLE enrollments (\n  student_id  INT  NOT NULL,\n  course_id   INT  NOT NULL,\n  enrolled_at DATE DEFAULT CURRENT_DATE,\n  grade       CHAR(2),\n  PRIMARY KEY (student_id, course_id),  -- composite PK\n  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,\n  FOREIGN KEY (course_id)  REFERENCES courses(id)  ON DELETE CASCADE\n);\n\n-- Query: all courses for student 1\nSELECT c.title, e.grade\nFROM   enrollments e\nJOIN   courses c ON c.id = e.course_id\nWHERE  e.student_id = 1;"
        },
        {
          "type": "table",
          "headers": ["Relationship", "Implementation", "FK Location", "Example"],
          "rows": [
            ["One-to-One",   "UNIQUE FK in child table",    "profiles.user_id UNIQUE", "user → profile"],
            ["One-to-Many",  "FK in 'many' side table",     "orders.user_id",          "user → orders"],
            ["Many-to-Many", "Junction table with 2 FKs",   "enrollments(student_id, course_id)", "students ↔ courses"]
          ]
        },
        {
          "type": "paragraph",
          "text": "Once data is split across related tables, JOINs are the mechanism that reassembles it at query time. A JOIN combines rows from two or more tables based on a related column — usually a foreign key matching a primary key."
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "INNER JOIN",
              "definition": "Returns only rows that have a match in BOTH tables. If a user has no orders, that user disappears from the result entirely. The most restrictive join — and the default meaning of plain JOIN in most databases."
            },
            {
              "term": "LEFT JOIN (LEFT OUTER JOIN)",
              "definition": "Returns ALL rows from the left table, plus matching rows from the right table. If there's no match, the right table's columns are filled with NULL. Example: every user appears, even users with zero orders, with order columns as NULL for them."
            },
            {
              "term": "RIGHT JOIN (RIGHT OUTER JOIN)",
              "definition": "The mirror of LEFT JOIN — returns ALL rows from the right table, plus matching rows from the left table, with NULLs where there's no match. Less commonly used than LEFT JOIN since you can usually flip the table order instead."
            },
            {
              "term": "FULL OUTER JOIN",
              "definition": "Returns every row from BOTH tables — matched rows are combined, and unmatched rows from either side appear with NULL in the columns from the other table. Useful for finding mismatches between two datasets, like users with no orders AND orders with no valid user."
            }
          ]
        },
        {
          "type": "diagram",
          "text": "INNER JOIN              LEFT JOIN              FULL OUTER JOIN\n  ┌───┐ ┌───┐             ┌───┐ ┌───┐              ┌───┐ ┌───┐\n  │ A │ │ B │             │ A │ │ B │              │ A │ │ B │\n  │  ┌─┼─┐   │             │███┼─┐   │              │███┼███│\n  │  │█│ │   │             │███│ │   │              │███│███│\n  │  └─┼─┘   │             │███┼─┘   │              │███┼███│\n  └───┘ └───┘             └───┘ └───┘              └───┘ └───┘\n  only matching        all of A, matched B       everything, both sides\n\nRIGHT JOIN\n  ┌───┐ ┌───┐\n  │ A │ │ B │\n  │   ┌─┼███│\n  │   │ │███│\n  │   └─┼███│\n  └───┘ └───┘\n  matched A, all of B"
        },
        {
          "type": "code",
          "filename": "joins.sql",
          "text": "-- INNER JOIN: only users who have placed an order\nSELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id;\n\n-- LEFT JOIN: every user, NULL total if no order exists\nSELECT u.name, o.total\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id;\n\n-- RIGHT JOIN: every order, even if (hypothetically) user_id is orphaned\nSELECT u.name, o.total\nFROM users u\nRIGHT JOIN orders o ON o.user_id = u.id;\n\n-- FULL OUTER JOIN: every user AND every order, matched or not\nSELECT u.name, o.total\nFROM users u\nFULL OUTER JOIN orders o ON o.user_id = u.id;\n\n-- Find users with NO orders (anti-join pattern using LEFT JOIN)\nSELECT u.name\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE o.id IS NULL;"
        },
        {
          "type": "table",
          "headers": ["Join Type", "Returns", "Unmatched Side Result", "Common Use"],
          "rows": [
            ["INNER JOIN",      "Only matching rows in both tables",       "Excluded entirely",        "Orders that definitely have a valid user"],
            ["LEFT JOIN",       "All of left table + matches from right",  "NULL on right side",       "Every user, with or without orders"],
            ["RIGHT JOIN",      "All of right table + matches from left",  "NULL on left side",        "Rarely used — usually flip to LEFT JOIN"],
            ["FULL OUTER JOIN", "All rows from both tables",               "NULL on whichever side lacks a match", "Finding orphaned or mismatched data"]
          ]
        },
        {
          "type": "text-box",
          "variant": "tip",
          "title": "Why Joins Matter After Normalization",
          "text": "Normalization splits data into separate tables to remove redundancy — but that means a complete order can no longer be read from a single table. JOINs are the mechanism that reassembles related rows back together at query time, trading a small amount of CPU cost for the data integrity normalization bought you."
        }
      ]
    },


    {
  "id": "normalization",
  "type": "terminology",
  "label": "Normalization",
  "heading": "7. Normalization",
  "blocks": [
    {
      "type": "paragraph",
      "parts": [
        "Normalization organizes a database to reduce ",
        { "code": "data redundancy" },
        " and improve ",
        { "code": "data integrity" },
        " through a series of rules called Normal Forms."
      ]
    },
    {
      "type": "definitions",
      "items": [
        {
          "term": "1NF — First Normal Form",
          "definition": "Each cell must hold one atomic value. No lists in a single column. Each row must be unique (Primary Key). VIOLATION: skills = 'Node.js, React'. FIX: one row per skill in a separate skills table."
        },
        {
          "term": "2NF — Second Normal Form",
          "definition": "Must be in 1NF. Every non-key column must depend on the WHOLE composite key — no partial dependencies. VIOLATION: enrollments(student_id, course_id, student_name) — student_name depends only on student_id. FIX: move student_name to students table."
        },
        {
          "term": "3NF — Third Normal Form",
          "definition": "Must be in 2NF. No non-key column should depend on another non-key column — no transitive dependencies. VIOLATION: employees(id, dept_id, dept_name) — dept_name depends on dept_id, not id. FIX: move dept_name to departments table."
        },
        {
          "term": "BCNF — Boyce-Codd Normal Form",
          "definition": "Must be in 3NF. For every dependency X → Y, X must be a superkey. Stricter than 3NF but rare in practice — most 3NF tables already satisfy it."
        },
        {
          "term": "Denormalization",
          "definition": "Deliberate introduction of redundancy for READ performance — reduces expensive JOINs. EXAMPLE: store total_order_amount on orders instead of computing from order_items. Always normalize first, then denormalize only where needed."
        }
      ]
    },
    {
      "type": "diagram",
      "text": "Stage 0 — Unnormalized\n┌──────────┬──────────┬────────────────┐\n│ order_id │ customer │ products       │\n│ 1        │ Aman     │ Keyboard,Mouse │ ← violates 1NF\n└──────────┴──────────┴────────────────┘\n         ↓ split into one row per product\nStage 1 — 1NF\n┌──────────┬──────────┬──────────┐\n│ order_id │ customer │ product  │\n│ 1        │ Aman     │ Keyboard │ ← customer repeats (partial dep)\n│ 1        │ Aman     │ Mouse    │\n└──────────┴──────────┴──────────┘\n         ↓ move customer to own table\nStage 2 — 2NF\n  order_items            customers\n┌──────────┬──────────┐  ┌────┬──────┐\n│ order_id │ product  │  │ id │ name │\n│ 1        │ Keyboard │  │ 1  │ Aman │\n│ 1        │ Mouse    │  └────┴──────┘\n└──────────┴──────────┘\n         ↓ move product details to own table\nStage 3 — 3NF\n  order_items           products         customers\n┌──────────┬────────┐  ┌─────┬──────────┐  ┌────┬──────┐\n│ order_id │ prd_id │  │ id  │ name     │  │ id │ name │\n│ 1        │ 101    │  │ 101 │ Keyboard │  │ 1  │ Aman │\n│ 1        │ 102    │  │ 102 │ Mouse    │  └────┴──────┘\n└──────────┴────────┘  └─────┴──────────┘"
    },
    {
      "type": "code",
      "filename": "normalization.sql",
      "text": "-- BEFORE: everything in one bad table\nCREATE TABLE bad_orders (\n  order_id  INT,\n  customer  VARCHAR(100),\n  skills    TEXT,            -- '\"Node.js, React\"' not atomic (1NF)\n  dept_name VARCHAR(100)     -- transitive via dept_id (3NF)\n);\n\n-- 1NF: atomic values + primary key\nCREATE TABLE customers (\n  id    SERIAL PRIMARY KEY,\n  name  VARCHAR(100) NOT NULL,\n  email VARCHAR(100) UNIQUE NOT NULL\n);\n\n-- 2NF: no partial dependency\nCREATE TABLE customer_skills (\n  customer_id INT NOT NULL,\n  skill       VARCHAR(50) NOT NULL,\n  PRIMARY KEY (customer_id, skill),\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);\n\n-- 3NF: no transitive dependency\nCREATE TABLE departments (\n  id   SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);\nCREATE TABLE employees (\n  id      SERIAL PRIMARY KEY,\n  name    VARCHAR(100) NOT NULL,\n  dept_id INT REFERENCES departments(id)\n);\n\n-- Denormalization: store computed value for read speed\nCREATE TABLE orders (\n  id           SERIAL PRIMARY KEY,\n  customer_id  INT REFERENCES customers(id),\n  item_count   INT  -- redundant but skips a COUNT() join\n);"
    },
    {
      "type": "table",
      "headers": ["Normal Form", "Requirement", "Eliminates", "Example Fix"],
      "rows": [
        ["1NF",   "Atomic values + PK",                      "Multi-valued cells",           "skills column → skills table"],
        ["2NF",   "1NF + no partial dependencies",           "Partial composite key deps",   "student_name → students table"],
        ["3NF",   "2NF + no transitive dependencies",        "Non-key depends on non-key",   "dept_name → departments table"],
        ["BCNF",  "3NF + every determinant is a superkey",   "Remaining 3NF anomalies",      "Rare — 3NF usually covers it"],
        ["Denorm","Intentional redundancy for performance",  "Expensive JOINs at read time", "item_count stored on orders"]
      ]
    }
  ]
},
    {
      "id": "sql-categories",
      "type": "terminology",
      "label": "SQL Language Categories",
      "heading": "8. SQL Language Categories",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "SQL commands are grouped into five categories based on what they operate on. ",
            { "code": "DDL" },
            " defines structure, ",
            { "code": "DML" },
            " modifies data, ",
            { "code": "DQL" },
            " queries data, ",
            { "code": "DCL" },
            " controls permissions, and ",
            { "code": "TCL" },
            " manages transactions."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "DDL — Data Definition Language",
              "definition": "DDL commands define and modify the DATABASE STRUCTURE — tables, indexes, schemas, views. Changes are auto-committed (cannot be rolled back in most databases). Commands: CREATE (create table/index/view), ALTER (add/drop/modify columns), DROP (delete table/database permanently), TRUNCATE (delete all rows and reset structure — faster than DELETE), RENAME (rename a table or column)."
            },
            {
              "term": "DML — Data Manipulation Language",
              "definition": "DML commands manipulate DATA inside tables — inserting, updating, and deleting rows. Changes can be rolled back using transactions. Commands: INSERT (add new rows), UPDATE (modify existing rows), DELETE (remove rows with a condition — can be rolled back, unlike TRUNCATE). DML is what you use most in application code."
            },
            {
              "term": "DQL — Data Query Language",
              "definition": "DQL is used to retrieve/read data from tables. Some consider it part of DML, but it is often listed separately. Commands: SELECT (with FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT, JOIN). SELECT is the most used SQL command — it never modifies data, only reads it."
            },
            {
              "term": "DCL — Data Control Language",
              "definition": "DCL controls USER PERMISSIONS and access rights to database objects. Commands: GRANT (give a user permission to perform an action on a table/database), REVOKE (remove a previously granted permission). Example: GRANT SELECT, INSERT ON users TO app_user; — gives the app_user role read and insert access to users table."
            },
            {
              "term": "TCL — Transaction Control Language",
              "definition": "TCL manages TRANSACTIONS — groups of SQL operations that must all succeed or all fail together (ACID). Commands: BEGIN / START TRANSACTION (start a transaction block), COMMIT (save all changes permanently), ROLLBACK (undo all changes since BEGIN), SAVEPOINT (mark a point to partially roll back to), RELEASE SAVEPOINT, ROLLBACK TO SAVEPOINT."
            }
          ]
        },
        {
          "type": "code",
          "filename": "sql-categories.sql",
          "text": "-- ── DDL — Data Definition Language ──────────────────────\n-- CREATE: define new table structure\nCREATE TABLE products (\n  id    SERIAL PRIMARY KEY,\n  name  VARCHAR(100) NOT NULL,\n  price NUMERIC(10,2)\n);\n\n-- ALTER: add a new column\nALTER TABLE products ADD COLUMN stock INT DEFAULT 0;\n\n-- ALTER: change column type\nALTER TABLE products ALTER COLUMN price TYPE DECIMAL(12,2);\n\n-- TRUNCATE: delete all rows, reset structure (cannot rollback)\nTRUNCATE TABLE products RESTART IDENTITY;\n\n-- DROP: permanently delete the table\nDROP TABLE IF EXISTS products;\n\n\n-- ── DML — Data Manipulation Language ─────────────────────\n-- INSERT: add new rows\nINSERT INTO products (name, price, stock)\nVALUES ('Laptop', 79999.99, 50),\n       ('Phone',  24999.99, 200);\n\n-- UPDATE: modify existing rows\nUPDATE products\nSET    price = 72999.99, stock = stock - 1\nWHERE  id = 1;\n\n-- DELETE: remove rows (can be rolled back)\nDELETE FROM products\nWHERE stock = 0;\n\n\n-- ── DQL — Data Query Language ────────────────────────────\nSELECT id, name, price\nFROM   products\nWHERE  price < 50000\nORDER  BY price DESC\nLIMIT  10;\n\n\n-- ── DCL — Data Control Language ──────────────────────────\n-- GRANT: give read + write to app user\nGRANT SELECT, INSERT, UPDATE ON products TO app_user;\n\n-- REVOKE: remove delete permission\nREVOKE DELETE ON products FROM app_user;\n\n\n-- ── TCL — Transaction Control Language ───────────────────\nBEGIN;  -- start transaction\n\n  UPDATE accounts SET balance = balance - 1000 WHERE id = 1;\n  UPDATE accounts SET balance = balance + 1000 WHERE id = 2;\n\n  SAVEPOINT transfer_done;  -- save point mid-transaction\n\n  -- something went wrong\n  ROLLBACK TO SAVEPOINT transfer_done;  -- partial rollback\n\nCOMMIT;  -- save permanently\n-- or: ROLLBACK;  -- undo everything since BEGIN"
        },
        {
          "type": "table",
          "headers": ["Category", "Full Name", "Commands", "Rollback?", "Operates On"],
          "rows": [
            ["DDL", "Data Definition Language",    "CREATE, ALTER, DROP, TRUNCATE, RENAME", "No (auto-commit)",  "Database structure"],
            ["DML", "Data Manipulation Language",  "INSERT, UPDATE, DELETE",                "Yes",               "Table rows / data"],
            ["DQL", "Data Query Language",         "SELECT",                                "N/A (read-only)",   "Table rows / data"],
            ["DCL", "Data Control Language",       "GRANT, REVOKE",                         "No",                "User permissions"],
            ["TCL", "Transaction Control Language","BEGIN, COMMIT, ROLLBACK, SAVEPOINT",    "Yes (that's the point)", "Transaction blocks"]
          ]
        }
      ]
    },

    {
      "id": "diagram",
      "type": "diagram",
      "label": "Diagram",
      "heading": "Relational Database Architecture",
      "blocks": [
        {
          "type": "diagram",
          "text": "┌─────────────────────────────────────────────────────┐\n│                    DATABASE                         │\n│                                                     │\n│  ┌──────────────┐        ┌──────────────────────┐  │\n│  │   USERS      │        │      ORDERS          │  │\n│  │──────────────│        │──────────────────────│  │\n│  │ id (PK)      │◄───────│ id (PK)              │  │\n│  │ name         │  1:N   │ user_id (FK) ────────│  │\n│  │ email UNIQUE │        │ total                │  │\n│  └──────────────┘        └──────────────────────┘  │\n│          │                          │               │\n│          │ 1:1                      │ 1:N           │\n│          ▼                          ▼               │\n│  ┌──────────────┐        ┌──────────────────────┐  │\n│  │   PROFILES   │        │    ORDER_ITEMS       │  │\n│  │──────────────│        │──────────────────────│  │\n│  │ id (PK)      │        │ id (PK)              │  │\n│  │ user_id UNIQ │        │ order_id (FK)        │  │\n│  │ bio          │        │ product_id (FK)──────│──┼─►PRODUCTS\n│  └──────────────┘        └──────────────────────┘  │\n└─────────────────────────────────────────────────────┘\n\nSQL Query Flow:\nApp Code → SQL Query → DBMS → Storage Engine → Data"
        }
      ]
    },

    {
      "id": "comparison",
      "type": "comparison",
      "label": "Comparison",
      "heading": "DBMS vs RDBMS vs NoSQL",
      "blocks": [
        {
          "type": "table",
          "headers": ["Feature", "DBMS", "RDBMS", "NoSQL"],
          "rows": [
            ["Data Model",   "Hierarchical/Network",  "Tables (Relations)",   "Document/Key-Value/Graph"],
            ["Schema",       "Fixed",                 "Fixed (strict)",       "Flexible (dynamic)"],
            ["Query",        "Proprietary",           "SQL",                  "Database-specific API"],
            ["Relationships","Manual",                "FK + JOIN (built-in)", "Embedded or manual"],
            ["ACID",         "Partial",               "Full ACID",            "Partial (BASE model)"],
            ["Scaling",      "Vertical",              "Vertical",             "Horizontal"],
            ["Examples",     "IMS, IDMS",             "PostgreSQL, MySQL",    "MongoDB, Redis, Cassandra"],
            ["Best For",     "Legacy systems",        "Structured, relational data", "Flexible, high-scale apps"]
          ]
        }
      ]
    },

    {
      "id": "boxes",
      "type": "highlight-box",
      "label": "Highlight Box",
      "heading": "Key Rules to Remember",
      "blocks": [
        {
          "type": "text-box",
          "variant": "remember",
          "title": "Remember",
          "text": "PRIMARY KEY = UNIQUE + NOT NULL. UNIQUE alone allows NULL. A table can have ONE Primary Key but MANY Unique Keys. Foreign Key enforces Referential Integrity — child row cannot exist without a parent row."
        },
        {
          "type": "text-box",
          "variant": "short-answer",
          "title": "Short Answer",
          "text": "DDL=structure, DML=data changes, DQL=SELECT, DCL=permissions, TCL=transactions. Normalization: 1NF=atomic, 2NF=no partial deps, 3NF=no transitive deps, BCNF=every determinant is superkey. Joins: INNER=only matches, LEFT=all left + matches, FULL OUTER=everything."
        },
        {
          "type": "text-box",
          "variant": "warning",
          "title": "Warning",
          "text": "TRUNCATE and DROP are DDL — they auto-commit and CANNOT be rolled back in most databases. DELETE is DML and CAN be rolled back. Never confuse them in production scripts."
        },
        {
          "type": "text-box",
          "variant": "tip",
          "title": "Tip",
          "text": "Use TIMESTAMPTZ (timestamp with timezone) instead of plain TIMESTAMP in production. Use NUMERIC(10,2) instead of FLOAT for monetary values to avoid floating-point rounding errors. Use UUID as PK in distributed systems."
        },
        {
          "type": "text-box",
          "variant": "note",
          "title": "Note",
          "text": "Many-to-Many relationships ALWAYS need a junction table. You cannot implement M:N with just two tables and foreign keys. The junction table's Composite Primary Key = FK1 + FK2."
        },
        {
          "type": "text-box",
          "variant": "interview",
          "title": "Interview",
          "text": "What is the difference between DELETE and TRUNCATE? DELETE removes rows one by one, can use WHERE, fires triggers, and can be rolled back (DML). TRUNCATE removes ALL rows at once, cannot use WHERE, does not fire row-level triggers, and cannot be rolled back (DDL — auto-commits)."
        }
      ]
    },

    {
      "id": "checklist",
      "type": "checklist",
      "label": "Checklist",
      "heading": "Database Design Checklist",
      "blocks": [
        {
          "type": "checklist",
          "items": [
            "Define a Primary Key for every table",
            "Use FOREIGN KEY constraints for all relationships",
            "Add NOT NULL to all required fields",
            "Add UNIQUE constraints where values must be distinct",
            "Add CHECK constraints for domain validation (age, price > 0)",
            "Add DEFAULT values for optional fields",
            "Normalize to at least 3NF before adding data",
            "Choose correct data types (NUMERIC not FLOAT for money)",
            "Use TIMESTAMPTZ for all timestamps in production",
            "Create indexes on frequently queried columns",
            "Use UUID as PK for distributed systems",
            "Define ON DELETE / ON UPDATE behavior for all Foreign Keys"
          ]
        }
      ]
    },

    {
      "id": "table-section",
      "type": "table-section",
      "label": "Table Section",
      "heading": "SQL Commands Quick Reference",
      "blocks": [
        {
          "type": "table",
          "headers": ["Command", "Category", "Purpose", "Rollback?"],
          "rows": [
            ["CREATE TABLE",   "DDL", "Create new table with columns and constraints", "No"],
            ["ALTER TABLE",    "DDL", "Add/drop/modify columns or constraints",        "No"],
            ["DROP TABLE",     "DDL", "Permanently delete a table",                    "No"],
            ["TRUNCATE",       "DDL", "Delete all rows and reset sequences",           "No"],
            ["INSERT INTO",    "DML", "Add one or more rows",                         "Yes"],
            ["UPDATE",         "DML", "Modify existing rows",                         "Yes"],
            ["DELETE",         "DML", "Remove rows matching a condition",             "Yes"],
            ["SELECT",         "DQL", "Query and retrieve data",                      "N/A"],
            ["GRANT",          "DCL", "Give permissions to a user/role",              "No"],
            ["REVOKE",         "DCL", "Remove permissions from a user/role",          "No"],
            ["BEGIN",          "TCL", "Start a transaction block",                    "—"],
            ["COMMIT",         "TCL", "Save all changes in current transaction",      "—"],
            ["ROLLBACK",       "TCL", "Undo all changes since last BEGIN",            "—"],
            ["SAVEPOINT",      "TCL", "Create a named restore point mid-transaction", "—"]
          ]
        }
      ]
    },

    {
      "id": "accordion",
      "type": "accordion",
      "label": "Accordion",
      "heading": "Deep Dive Questions",
      "blocks": [
        {
          "type": "accordion",
          "items": [
            {
              "title": "Why can't a Primary Key have NULL values?",
              "text": "A Primary Key's job is to UNIQUELY IDENTIFY each row. If two rows both have NULL as their PK, you cannot distinguish between them — NULL means 'unknown' and unknown != unknown in SQL. Therefore, Primary Keys enforce both UNIQUE and NOT NULL. If you try to insert a NULL Primary Key, the database throws a constraint violation error."
            },
            {
              "title": "What is the difference between 2NF and 3NF?",
              "text": "2NF eliminates PARTIAL DEPENDENCIES — a non-key column must depend on the ENTIRE composite primary key, not just part of it. 3NF eliminates TRANSITIVE DEPENDENCIES — a non-key column must depend DIRECTLY on the primary key, not on another non-key column. 2NF only matters for composite keys. 3NF matters for all tables. Example: dept_name depending on dept_id (which depends on employee_id) is a transitive dependency — 3NF violation."
            },
            {
              "title": "When should you use JSONB vs a normalized table?",
              "text": "Use JSONB when: the data structure varies greatly per row (different attributes per product type), you need to store user-defined metadata that cannot be predicted at schema design time, or you're storing external API responses. Use normalized tables when: the structure is known and consistent, you need to query individual fields frequently, you need foreign key relationships on those fields, or performance of queries on that data is critical. JSONB queries are slower than column queries unless you add GIN indexes."
            },
            {
              "title": "What is the difference between CHAR and VARCHAR?",
              "text": "CHAR(n) is a FIXED-LENGTH string — it always uses exactly n bytes, padding with spaces if the value is shorter. Reading is slightly faster because the database knows the exact position of each value. VARCHAR(n) is VARIABLE-LENGTH — it only uses as much space as the actual data plus a small length header. Much more space-efficient for strings of varying length. Use CHAR only for truly fixed-length values like country codes ('US', 'IN') or status codes. Use VARCHAR for everything else."
            },
            {
              "title": "What is referential integrity and how is it enforced?",
              "text": "Referential integrity ensures that a Foreign Key value always points to an existing Primary Key in the referenced table. You cannot insert a child row with a FK that has no matching parent row. When the parent row is deleted or updated, the database must handle it: ON DELETE CASCADE (delete child rows too), ON DELETE SET NULL (set FK to null), ON DELETE RESTRICT (block parent deletion if children exist), ON DELETE NO ACTION (similar to RESTRICT, checked at end of transaction). Always choose the ON DELETE behavior explicitly based on business requirements."
            },
            {
              "title": "Why use LEFT JOIN instead of INNER JOIN to find unmatched rows?",
              "text": "LEFT JOIN keeps every row from the left table even when there's no match on the right, filling unmatched columns with NULL. By adding WHERE right_table.id IS NULL after a LEFT JOIN, you isolate exactly the left-table rows that had no match at all — this is the standard 'anti-join' pattern for finding users with no orders, products never sold, or any orphaned-on-one-side scenario. INNER JOIN can never produce this result because it discards unmatched rows entirely before you'd have a chance to filter them."
            }
          ]
        }
      ]
    },

    {
      "id": "quote",
      "type": "quote",
      "label": "Quote",
      "heading": "Database Design Philosophy",
      "blocks": [
        {
          "type": "quote",
          "text": "Normalize until it hurts, denormalize until it works.",
          "source": "Database Design Best Practice"
        }
      ]
    },

    {
      "id": "best-practices",
      "type": "best-practices",
      "label": "Best Practices",
      "heading": "Database Design Best Practices",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Always define a Primary Key — never create a table without one.",
            "Use SERIAL or UUID for primary keys — never use email or name as PK.",
            "Use NUMERIC(p,s) not FLOAT for all monetary values to avoid rounding errors.",
            "Use TIMESTAMPTZ (with timezone) for all timestamp columns in production.",
            "Always declare ON DELETE and ON UPDATE behavior for every Foreign Key constraint.",
            "Normalize to 3NF first, then denormalize only where performance profiling proves it is needed.",
            "Use NOT NULL on all columns that should always have a value — do not rely on application code.",
            "Name tables in singular form (user, not users) or plural consistently — pick one and stick to it.",
            "Use snake_case for all column and table names (first_name, not firstName or FirstName).",
            "Add indexes on Foreign Key columns and any column used in WHERE, JOIN, or ORDER BY clauses.",
            "Always wrap multi-step operations in a BEGIN/COMMIT transaction to ensure atomicity.",
            "Use CHECK constraints for domain validation — price > 0, age BETWEEN 0 AND 150.",
            "Prefer LEFT JOIN over RIGHT JOIN for readability — flip the table order instead of using RIGHT JOIN."
          ]
        }
      ]
    },

    {
      "id": "common-mistakes",
      "type": "common-mistakes",
      "label": "Common Mistakes",
      "heading": "Common Database Mistakes",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Using FLOAT for monetary values — floating-point rounding causes 99.99 to become 99.98999999.",
            "Using email or phone as Primary Key — if it changes, all foreign key references break.",
            "Forgetting ON DELETE behavior on Foreign Keys — leads to orphan rows or blocked deletes.",
            "Storing comma-separated values in one column — violates 1NF, makes querying impossible.",
            "Not defining indexes on Foreign Key columns — JOIN queries scan the full table.",
            "Using TRUNCATE when you meant DELETE — TRUNCATE cannot be rolled back in most databases.",
            "Skipping normalization — leads to update anomalies where changing one piece of data requires updating hundreds of rows.",
            "Using CHAR for variable-length strings — wastes storage for short values padded with spaces.",
            "Not using transactions for multi-step operations — partial failures leave data in inconsistent state.",
            "Storing passwords in plain text instead of hashed format — critical security violation.",
            "Using TIMESTAMP without timezone — causes bugs when servers are in different timezones.",
            "Using INNER JOIN when LEFT JOIN was needed — silently drops rows with no match, hiding missing data."
          ]
        }
      ]
    },

    {
      "id": "interview",
      "type": "interview-questions",
      "label": "Interview Questions",
      "heading": "SQL Interview Questions",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "What is the difference between Primary Key and Unique Key?",
              "answer": "Primary Key is UNIQUE + NOT NULL, only ONE per table, automatically creates a clustered index. Unique Key enforces uniqueness but ALLOWS NULL values, a table can have MULTIPLE Unique Keys, creates a non-clustered index. Example: 'id' is PK, 'email' and 'phone' can both be Unique Keys."
            },
            {
              "question": "What is the difference between DELETE and TRUNCATE?",
              "answer": "DELETE is DML — removes rows one by one matching a WHERE condition, fires row-level triggers, can be rolled back inside a transaction. TRUNCATE is DDL — removes ALL rows at once, cannot use WHERE, does not fire row-level triggers, auto-commits and CANNOT be rolled back in most databases. TRUNCATE is faster for clearing all rows, DELETE is safer and flexible."
            },
            {
              "question": "What is referential integrity?",
              "answer": "Referential integrity ensures that a Foreign Key value in one table always points to an existing Primary Key value in the referenced table. You cannot insert a child row with a FK that has no matching parent. When the parent is deleted, options are: CASCADE (delete children), SET NULL (nullify FK), RESTRICT (block deletion). It prevents orphan records and data inconsistency."
            },
            {
              "question": "Explain 1NF, 2NF, and 3NF in simple terms.",
              "answer": "1NF: Atomic values — no multiple values in one cell, each row is unique. 2NF: 1NF + no partial dependencies — for composite PKs, every non-key column must depend on the FULL PK, not part of it. 3NF: 2NF + no transitive dependencies — no non-key column should depend on another non-key column. Simple rule: 'Every non-key attribute must depend on the key, the whole key, and nothing but the key.'"
            },
            {
              "question": "What is the difference between DDL and DML?",
              "answer": "DDL (Data Definition Language) defines database structure — CREATE, ALTER, DROP, TRUNCATE. DDL commands auto-commit and cannot be rolled back. DML (Data Manipulation Language) manipulates data inside tables — INSERT, UPDATE, DELETE. DML changes can be rolled back using transactions. A simple rule: DDL changes the SHAPE of the database, DML changes the DATA inside it."
            },
            {
              "question": "What is a Composite Key and when would you use it?",
              "answer": "A Composite Key is a Primary Key made of two or more columns — no single column is unique alone, but the combination is unique. Use it for junction/bridge tables in Many-to-Many relationships. Example: enrollments(student_id, course_id) — one student can enroll in many courses, one course has many students, but each (student, course) pair is unique. The Composite PK ensures no duplicate enrollments."
            },
            {
              "question": "What is the difference between CHAR and VARCHAR?",
              "answer": "CHAR(n) is fixed-length — always occupies exactly n bytes, padded with spaces for shorter values. Fast for fixed-size data but wastes space for variable-length values. VARCHAR(n) is variable-length — uses only as much space as the actual data plus a small overhead. More space-efficient for variable strings. Use CHAR for fixed codes like country codes ('US', 'IN'), use VARCHAR for everything else like names and emails."
            },
            {
              "question": "What is the difference between INNER JOIN and LEFT JOIN?",
              "answer": "INNER JOIN returns only rows that have a match in both tables — unmatched rows on either side are excluded entirely. LEFT JOIN returns all rows from the left table regardless of a match, filling unmatched right-side columns with NULL. Use INNER JOIN when you only care about complete pairs (e.g. valid orders with a valid user); use LEFT JOIN when you need every row from one side even if related data is missing (e.g. every user, with or without orders)."
            },
            {
              "question": "[Medium] What are update anomalies and how does normalization fix them?",
              "answer": "Update anomalies are inconsistencies that arise when data is duplicated across rows. There are three types: Update Anomaly (changing dept_name in one row but not others leaves inconsistent data), Insert Anomaly (cannot add a department until there is an employee in it), Delete Anomaly (deleting the last employee in a department loses department data). Normalization fixes this by storing each piece of data in exactly one place — dept_name lives in the departments table and nowhere else."
            },
            {
              "question": "[Medium] Why is FLOAT a bad choice for storing monetary values?",
              "answer": "FLOAT is an IEEE 754 floating-point type — it stores approximations, not exact values. Floating-point arithmetic has inherent rounding errors. Example: 0.1 + 0.2 in binary floating point = 0.30000000000000004, not 0.3. For money, 99.99 might be stored as 99.98999999999999 causing incorrect totals and display values. Always use NUMERIC(10,2) or DECIMAL(10,2) which stores exact decimal values with no rounding errors."
            },
            {
              "question": "[Medium] Explain the difference between ON DELETE CASCADE vs ON DELETE SET NULL vs ON DELETE RESTRICT.",
              "answer": "ON DELETE CASCADE: when the parent row is deleted, all child rows referencing it are automatically deleted too. Use for dependent data like order items when an order is deleted. ON DELETE SET NULL: when the parent is deleted, the FK column in child rows is set to NULL. Use when children can exist without a parent. Requires FK column to allow NULL. ON DELETE RESTRICT: blocks deletion of the parent row if any child rows reference it. The most conservative option — forces explicit cleanup before deleting. Default behavior in most databases."
            },
            {
              "question": "[Advanced] What is BCNF and how does it differ from 3NF?",
              "answer": "3NF requires that every non-key attribute depends only on the primary key. BCNF is stricter — it requires that for EVERY functional dependency X → Y, X must be a SUPERKEY (a key that uniquely identifies the row). 3NF allows some functional dependencies from non-superkey attributes if Y is part of a candidate key. BCNF eliminates this exception. In practice, most well-designed 3NF tables already satisfy BCNF. BCNF violations only occur in tables with overlapping candidate keys — rare in typical application databases."
            },
            {
              "question": "[Advanced] What is the difference between SAVEPOINT and ROLLBACK?",
              "answer": "ROLLBACK undoes ALL changes made since the last BEGIN/START TRANSACTION — the entire transaction is cancelled. SAVEPOINT creates a named intermediate point within a transaction. ROLLBACK TO SAVEPOINT name undoes changes only back to that savepoint — earlier changes in the same transaction are preserved. This allows partial rollbacks. Use case: a complex operation with multiple steps where early steps succeeded but a later step fails — you can rollback to a savepoint without losing the earlier successful work."
            },
            {
              "question": "[Advanced] How do you find rows in Table A that have no matching row in Table B using SQL?",
              "answer": "Use a LEFT JOIN from A to B, then filter WHERE b.id IS NULL — this is the standard anti-join pattern. SELECT a.* FROM a LEFT JOIN b ON b.a_id = a.id WHERE b.id IS NULL. This returns every row from A that had no match in B at all. An alternative is a NOT EXISTS subquery, which performs similarly or better in most modern query planners: SELECT a.* FROM a WHERE NOT EXISTS (SELECT 1 FROM b WHERE b.a_id = a.id). Avoid NOT IN with a subquery if the subquery can return NULL — it silently returns zero rows due to NULL comparison semantics."
            }
          ]
        }
      ]
    },

    {
      "id": "qa",
      "type": "qa-section",
      "label": "Q&A Section",
      "heading": "Frequently Asked Questions",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "Can a table have no Primary Key?",
              "answer": "Technically yes — SQL does not force you to define a PK. But it is a serious design mistake. Without a PK, you cannot uniquely identify rows, cannot create Foreign Key references from other tables, queries become inefficient, and duplicate rows can accumulate undetected. Always define a Primary Key on every table."
            },
            {
              "question": "Can a Foreign Key reference a non-Primary Key column?",
              "answer": "Yes — a Foreign Key can reference any column with a UNIQUE constraint, not just the Primary Key. The referenced column must be unique so the FK value points to exactly one row. In practice, FKs almost always reference the Primary Key, but referencing a UNIQUE column is valid SQL."
            },
            {
              "question": "What is the difference between WHERE and HAVING?",
              "answer": "WHERE filters rows BEFORE aggregation — it applies to individual rows. HAVING filters groups AFTER aggregation — it applies to the result of GROUP BY. Example: WHERE age > 18 filters rows before grouping. HAVING COUNT(*) > 5 filters groups that have more than 5 members. You cannot use aggregate functions (COUNT, SUM, AVG) in WHERE — use HAVING instead."
            },
            {
              "question": "Is NULL equal to NULL in SQL?",
              "answer": "No. NULL means 'unknown' and in SQL, unknown != unknown. NULL = NULL evaluates to UNKNOWN, not TRUE. To check for NULL, you must use IS NULL or IS NOT NULL — never = NULL. This is a frequent source of bugs: WHERE deleted_at = NULL returns no rows. The correct query is WHERE deleted_at IS NULL."
            },
            {
              "question": "What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?",
              "answer": "INNER JOIN returns only rows that have matching values in BOTH tables. LEFT JOIN returns ALL rows from the left table and matching rows from the right — unmatched right side columns are NULL. RIGHT JOIN is the opposite. FULL OUTER JOIN returns ALL rows from both tables — unmatched sides are NULL. For most application queries, LEFT JOIN and INNER JOIN cover 90% of use cases."
            },
            {
              "question": "[Medium] When should you use a UUID Primary Key instead of SERIAL/AUTO_INCREMENT?",
              "answer": "Use UUID when: you have a distributed system where multiple servers generate IDs independently (no central counter), you need to generate the ID in application code before the database insert (for optimistic concurrency), you want to expose IDs in URLs without revealing record count or insertion order, or you're merging data from multiple databases. Downside of UUID: larger storage (16 bytes vs 4/8 bytes), slightly slower index performance due to random ordering, harder to read/debug. Use SERIAL for simple single-server applications."
            },
            {
              "question": "[Medium] What is denormalization and when is it appropriate?",
              "answer": "Denormalization deliberately introduces redundancy by storing computed or duplicated data to avoid expensive JOIN queries at read time. It trades write complexity and storage for read performance. Appropriate when: read performance is critical and JOIN queries are too slow even with indexes, in analytics/reporting databases where data is rarely updated, when you need to pre-compute aggregates like total_order_amount, or in CQRS architectures where the read model is separate from the write model. Never denormalize prematurely — profile first, denormalize only where measured improvement is needed."
            },
            {
              "question": "[Medium] What happens when you violate a CHECK constraint?",
              "answer": "The database rejects the INSERT or UPDATE operation and returns a constraint violation error. The row is not written to the table. In a transaction, the violation causes that specific statement to fail — you can catch the error and ROLLBACK the entire transaction or just retry the statement. CHECK constraint violations should be caught in application code and returned as validation errors to the user. Example error: 'violates check constraint chk_age' when inserting age = -5."
            },
            {
              "question": "[Advanced] What are the ACID properties of a database transaction?",
              "answer": "ACID stands for: Atomicity — a transaction is all-or-nothing. If any step fails, all steps are rolled back. Consistency — a transaction brings the database from one valid state to another, all constraints remain satisfied. Isolation — concurrent transactions do not see each other's intermediate state (depending on isolation level). Durability — once a transaction is committed, the data is permanently saved even if the system crashes immediately after. TCL commands BEGIN, COMMIT, ROLLBACK are what enforce these properties in SQL."
            },
            {
              "question": "[Advanced] What is the difference between a schema and a database?",
              "answer": "A database is the top-level container — it is the actual file(s) on disk holding all data. A schema is a namespace WITHIN a database that groups related tables, views, functions, and indexes. In PostgreSQL, one database can have multiple schemas (default schema is 'public'). In MySQL, 'schema' and 'database' are used interchangeably. In enterprise systems, schemas are used to separate concerns — e.g., schema 'sales' contains sales tables, schema 'inventory' contains inventory tables, all within the same database server."
            },
            {
              "question": "[Advanced] Why does a JOIN need an index to perform well, and what happens without one?",
              "answer": "Without an index on the join column, the database must scan every row of one table for each row of the other (a nested loop with full scans) — this is O(n × m) and becomes extremely slow as tables grow. With an index on the foreign key column, the database can look up matching rows in roughly O(log n) time per row, turning the join into a fast index lookup or merge join. This is why best practice is to always index foreign key columns, even though PostgreSQL does not do this automatically when you create a FOREIGN KEY constraint."
            }
          ]
        }
      ]
    },

    {
      "id": "summary",
      "type": "summary",
      "label": "Summary / Key Takeaways",
      "heading": "Quick Revision",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Data = raw facts. Database = organized collection of related data. DBMS = software managing it.",
            "RDBMS stores data in tables (relations) — rows = records, columns = attributes.",
            "Schema = blueprint of the database structure. Data Integrity = accuracy + consistency.",
            "Primary Key = UNIQUE + NOT NULL. Foreign Key = link to another table's PK.",
            "Candidate Key = any column that could be PK. Alternate Key = candidate not chosen as PK.",
            "Composite Key = PK made of 2+ columns. Unique Key = unique but allows NULL.",
            "Constraints: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT.",
            "Data Types: use NUMERIC for money, TIMESTAMPTZ for timestamps, UUID for distributed PKs, JSONB for flexible JSON data.",
            "Relationships: 1:1 (UNIQUE FK), 1:N (FK), M:N (junction table with composite PK).",
            "Joins reassemble split data: INNER = only matches, LEFT = all left + matches, FULL OUTER = everything from both sides.",
            "1NF = atomic values. 2NF = no partial deps. 3NF = no transitive deps. BCNF = every determinant is superkey.",
            "Denormalization deliberately re-merges data later to skip JOINs and speed up reads — normalize first, denormalize only when proven necessary.",
            "DDL = structure (CREATE ALTER DROP). DML = data (INSERT UPDATE DELETE). DQL = SELECT.",
            "DCL = permissions (GRANT REVOKE). TCL = transactions (BEGIN COMMIT ROLLBACK SAVEPOINT).",
            "TRUNCATE = DDL, cannot rollback. DELETE = DML, can rollback. Never confuse them.",
            "Normalize first to 3NF. Denormalize only where performance profiling proves it is needed."
          ]
        }
      ]
    }

  ]
};