window.notePageData = {
  "title": "SQL Summary",
  "navLabel": "SQL summary",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "SQL Summary",
    "text": "A quick-reference guide covering core SQL and PostgreSQL concepts such as databases, keys, constraints, normalization, joins, indexes, transactions, views, and CTEs."
  },
  "nav": [
    { "label": "Basics", "href": "#basics" },
    { "label": "Keys", "href": "#keys" },
    { "label": "Constraints", "href": "#constraints" },
    { "label": "Normalization", "href": "#normalization" },
    { "label": "Joins", "href": "#joins" },
    { "label": "Indexes", "href": "#indexes" },
    { "label": "Transactions", "href": "#transactions" },
    { "label": "Views & CTEs", "href": "#views-ctes" }
  ],
  "sections": [
    {
      "id": "basics",
      "type": "notes",
      "label": "Basics",
      "heading": "SQL Basics",
      "blocks": [
        {
          "type": "list",
          "items": [
            "SQL stands for Structured Query Language.",
            "PostgreSQL is an open-source Object-Relational Database Management System (ORDBMS).",
            "PostgreSQL follows the ACID properties.",
            "PostgreSQL is highly compliant with the SQL standard.",
            "A database is a collection of related data.",
            "A schema logically organizes database objects (tables, views, functions, etc.).",
            "A table stores data in rows and columns.",
            "A row (tuple) represents a single record.",
            "A column (attribute) represents a property of the data.",
            "Every table should have a Primary Key for unique identification."
          ]
        }
      ]
    },
    {
      "id": "keys",
      "type": "notes",
      "label": "Keys",
      "heading": "Keys in SQL",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Primary Key uniquely identifies each row.",
            "Primary Key cannot contain NULL values.",
            "A table can have only one Primary Key.",
            "A Unique Key allows only unique values but accepts one NULL in PostgreSQL.",
            "Foreign Key maintains referential integrity.",
            "Composite Key consists of multiple columns.",
            "Candidate Keys are columns that can become the Primary Key.",
            "Alternate Keys are candidate keys not chosen as the Primary Key.",
            "Surrogate Keys are system-generated IDs (SERIAL, IDENTITY, UUID).",
            "Natural Keys come from business data (Email, Aadhaar, etc.)."
          ]
        }
      ]
    },
    {
      "id": "constraints",
      "type": "notes",
      "label": "Constraints",
      "heading": "Constraints",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Constraints enforce data integrity.",
            "NOT NULL prevents NULL values.",
            "UNIQUE prevents duplicate values.",
            "CHECK validates data using conditions.",
            "DEFAULT assigns a value if none is provided.",
            "FOREIGN KEY ensures parent-child relationships.",
            "PRIMARY KEY = UNIQUE + NOT NULL."
          ]
        }
      ]
    },
    {
      "id": "normalization",
      "type": "notes",
      "label": "Normalization",
      "heading": "Normalization",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Normalization reduces data redundancy.",
            "First Normal Form (1NF): No repeating groups; atomic values only.",
            "Second Normal Form (2NF): Remove partial dependency.",
            "Third Normal Form (3NF): Remove transitive dependency.",
            "BCNF is a stronger version of 3NF.",
            "Denormalization improves read performance by reducing joins."
          ]
        }
      ]
    },
    {
      "id": "joins",
      "type": "notes",
      "label": "Joins",
      "heading": "Joins",
      "blocks": [
        {
          "type": "list",
          "items": [
            "INNER JOIN returns matching rows only.",
            "LEFT JOIN returns all left rows and matching right rows.",
            "RIGHT JOIN returns all right rows and matching left rows.",
            "FULL OUTER JOIN returns all matching and non-matching rows.",
            "CROSS JOIN returns the Cartesian product.",
            "SELF JOIN joins a table with itself."
          ]
        }
      ]
    },
    {
      "id": "indexes",
      "type": "notes",
      "label": "Indexes",
      "heading": "Indexes",
      "blocks": [
        {
          "type": "list",
          "items": [
            "An index speeds up data retrieval.",
            "Indexes slow down INSERT, UPDATE, and DELETE operations.",
            "PostgreSQL uses B-tree as the default index type.",
            "PostgreSQL also supports Hash, GIN, GiST, BRIN, and SP-GiST indexes.",
            "Create indexes on columns frequently used in WHERE, JOIN, ORDER BY, and GROUP BY."
          ]
        }
      ]
    },
    {
      "id": "transactions",
      "type": "notes",
      "label": "Transactions",
      "heading": "Transactions",
      "blocks": [
        {
          "type": "list",
          "items": [
            "A transaction is a sequence of SQL statements executed as a single unit.",
            "BEGIN, COMMIT, and ROLLBACK control transactions.",
            "ACID stands for Atomicity, Consistency, Isolation, Durability.",
            "PostgreSQL uses MVCC (Multi-Version Concurrency Control) to allow readers and writers to work concurrently without blocking each other in most cases."
          ]
        }
      ]
    },
    {
      "id": "views-ctes",
      "type": "notes",
      "label": "Views & CTEs",
      "heading": "Views and CTEs",
      "blocks": [
        {
          "type": "list",
          "items": [
            "A View is a virtual table based on a SQL query; it stores the query, not the data (except for materialized views).",
            "A CTE (WITH) improves query readability, and PostgreSQL supports recursive CTEs for hierarchical data."
          ]
        }
      ]
    }
  ]
};
