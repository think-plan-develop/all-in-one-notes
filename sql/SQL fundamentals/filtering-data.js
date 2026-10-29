window.notePageData = {
    "title": "06. SQL Operations — Filtering Data",
    "navLabel": "Filtering Data",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "06. SQL Operations — Filtering Data",
        "text": "Operators for narrowing query results in PostgreSQL: WHERE, AND, OR, IN, BETWEEN, LIKE, IS NULL and more."
    },
    "nav": [
        {
            "label": "Filtering Data",
            "href": "#filtering-data"
        }
    ],
    "sections": [
        {
            "id": "filtering-data",
            "type": "terminology",
            "label": "Filtering Data",
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
                            "definition": "PostgreSQL JSONB operators allow filtering data stored inside JSON documents. The examples use a products table with a metadata JSONB column and a users table with a profile JSONB column.",
                            "code": "-- Sample data\n-- products: (1, Laptop,  {\"status\":\"active\",\"price\":50000,\"discount\":10})\n--           (2, Mobile,  {\"status\":\"inactive\",\"price\":15000,\"offer\":true})\n--           (3, Monitor, {\"status\":\"active\",\"price\":12000,\"discount\":15})\n-- users:    (1, Shivam, {\"address\":{\"city\":\"Hyderabad\",\"country\":\"India\"}})\n--           (2, Rahul,  {\"address\":{\"city\":\"Delhi\",\"country\":\"India\"}})\n\n-- Access JSON Property (->>)\nSELECT * FROM products\nWHERE metadata->>'status' = 'active';\n\n-- Numeric Comparison\nSELECT * FROM products\nWHERE (metadata->>'price')::NUMERIC > 1000;\n\n-- Nested JSON Access\nSELECT * FROM users\nWHERE profile->'address'->>'city' = 'Hyderabad';\n\n-- Check if Key Exists (?)\nSELECT * FROM products\nWHERE metadata ? 'discount';\n\n-- Check if Any Key Exists (?|)\nSELECT * FROM products\nWHERE metadata ?| ARRAY['discount', 'offer'];\n\n-- Check if All Keys Exist (?&)\nSELECT * FROM products\nWHERE metadata ?& ARRAY['discount', 'status'];\n\n-- JSON Contains Object (@>)\nSELECT * FROM products\nWHERE metadata @> '{\"status\":\"active\"}';"
                        }
                    ]
                }
            ]
        }
    ]
};
