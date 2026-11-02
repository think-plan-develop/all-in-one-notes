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
                            "definition": "Filters rows so only those matching a condition are returned, updated, or deleted. It runs before GROUP BY and aggregation, so it filters individual rows (use HAVING to filter groups). With UPDATE, only matching rows are changed; with DELETE, only matching rows are removed. Without WHERE, every row is affected.",
                            "code": "-- Equality\nSELECT * FROM users WHERE status = 'Active';\n\n-- WHERE filters rows BEFORE grouping\nSELECT department_id, COUNT(*)\nFROM employees\nWHERE salary > 50000\nGROUP BY department_id;\n\n-- WHERE with UPDATE (only matching rows change)\nUPDATE employees\nSET salary = salary * 1.10\nWHERE department_id = 2;\n\n-- WHERE with DELETE (only matching rows are removed)\nDELETE FROM users\nWHERE status = 'Deleted';\n\n-- Without WHERE, ALL rows are affected\n-- UPDATE employees SET salary = 0;   -- dangerous!"
                        },
                        {
                            "term": "Comparison Operators",
                            "definition": "Compare a column to a value. = matches an exact value. <> and != both mean 'not equal' (PostgreSQL supports both; <> is the SQL standard and != is converted to <>). >, <, >=, <= work on numbers, dates, and other comparable types. Any comparison with NULL returns NULL (not true), so use IS NULL instead of = NULL.",
                            "code": "SELECT * FROM employees WHERE salary = 75000;   -- equal\nSELECT * FROM employees WHERE salary <> 75000;  -- not equal (standard)\nSELECT * FROM employees WHERE salary != 75000;  -- not equal (same result)\nSELECT * FROM employees WHERE salary > 50000;   -- greater than\nSELECT * FROM employees WHERE salary >= 50000;  -- greater than or equal\nSELECT * FROM employees WHERE salary < 100000;  -- less than\nSELECT * FROM employees WHERE salary <= 100000; -- less than or equal\n\n-- Dates are comparable too\nSELECT * FROM orders WHERE order_date >= '2025-01-01';\n\n-- NULL is never equal to anything\nSELECT * FROM users WHERE deleted_at = NULL;    -- returns no rows\nSELECT * FROM users WHERE deleted_at IS NULL;   -- correct"
                        },
                        {
                            "term": "AND",
                            "definition": "Combines conditions so that ALL of them must be true for a row to be returned. If any single condition is false (or NULL), the row is excluded.",
                            "code": "-- All conditions must be true\nSELECT * FROM users\nWHERE status = 'Active'\nAND age >= 18\nAND country = 'India';"
                        },
                        {
                            "term": "OR",
                            "definition": "Combines conditions so that AT LEAST ONE must be true. A row is returned if any condition is true.",
                            "code": "-- Any condition can be true\nSELECT * FROM users\nWHERE status = 'Active'\nOR status = 'Pending';"
                        },
                        {
                            "term": "NOT",
                            "definition": "Reverses (negates) a condition: true becomes false and false becomes true. NULL stays NULL, so rows with NULL are still excluded. NOT can be used with IN, BETWEEN, LIKE, ILIKE, and EXISTS.",
                            "code": "-- Negate a condition\nSELECT * FROM users\nWHERE NOT status = 'Inactive';\n\n-- NOT with other operators\nSELECT * FROM users WHERE status NOT IN ('Blocked', 'Deleted');\nSELECT * FROM employees WHERE salary NOT BETWEEN 50000 AND 80000;\nSELECT * FROM users WHERE name NOT LIKE 'A%';"
                        },
                        {
                            "term": "Operator Precedence & Parentheses",
                            "definition": "When AND and OR are mixed in one query, PostgreSQL evaluates NOT first, then AND, then OR. Because AND binds tighter than OR, a query can return different rows than you intended. Parentheses () override the default order and make the intent explicit, so always use them when combining AND with OR.",
                            "code": "-- Evaluated as: dept = 1  OR  (dept = 2 AND salary > 70000)\nSELECT *\nFROM employees\nWHERE department_id = 1\n   OR (department_id = 2 AND salary > 70000);\n\n-- Without parentheses: AND is evaluated first\nSELECT * FROM employees\nWHERE department_id = 1 OR department_id = 2 AND salary > 70000;\n\n-- With parentheses: the OR is evaluated first (different result!)\nSELECT * FROM employees\nWHERE (department_id = 1 OR department_id = 2)\n  AND salary > 70000;\n\n-- Order: NOT > AND > OR\nSELECT * FROM users\nWHERE NOT status = 'Blocked' AND age >= 18 OR country = 'India';"
                        },
                        {
                            "term": "IN",
                            "definition": "Checks whether a column's value matches any value in a list. It is a cleaner alternative to multiple OR conditions on the same column. The list can be literal values or the result of a subquery. NULL is never matched by IN, even if the list contains NULL, because NULL = NULL is not true.",
                            "code": "-- Match from a list\nSELECT * FROM users\nWHERE status IN ('Active', 'Pending', 'Blocked');\n\n-- Equivalent using OR (more verbose)\nSELECT * FROM users\nWHERE status = 'Active' OR status = 'Pending' OR status = 'Blocked';\n\n-- IN with Subquery\nSELECT * FROM orders\nWHERE user_id IN (\n    SELECT id\n    FROM users\n    WHERE status = 'Active'\n);\n\n-- NULL is not matched by IN\nSELECT * FROM users WHERE status IN ('Active', NULL);  -- only 'Active' rows"
                        },
                        {
                            "term": "NOT IN",
                            "definition": "Excludes rows whose value matches any value in a list. Be careful with NULL: if the list or subquery contains even one NULL, NOT IN returns no rows, because the comparison becomes NULL (unknown) instead of true. Use NOT EXISTS, or filter NULLs out of the subquery, to get safe behavior.",
                            "code": "-- Exclude values from a list\nSELECT *\nFROM users\nWHERE status NOT IN ('Blocked', 'Deleted');\n\n-- Unexpected result: the list contains NULL, so NO rows are returned\nSELECT * FROM users\nWHERE status NOT IN ('Blocked', NULL);\n\n-- Same problem when a subquery returns NULL\nSELECT * FROM users\nWHERE id NOT IN (SELECT user_id FROM orders);  -- breaks if any user_id is NULL\n\n-- Fix 1: remove NULLs from the subquery\nSELECT * FROM users\nWHERE id NOT IN (SELECT user_id FROM orders WHERE user_id IS NOT NULL);\n\n-- Fix 2: NOT EXISTS (NULL-safe; covered later under subqueries)\nSELECT * FROM users u\nWHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);"
                        },
                        {
                            "term": "BETWEEN",
                            "definition": "Checks whether a value falls within a range. BETWEEN is inclusive: both the lower and upper boundaries are included. It works on numbers, dates, and timestamps, and is equivalent to >= lower AND <= upper. The lower value must come first. NOT BETWEEN returns values outside the range, and BETWEEN can be combined with AND/OR like any other condition.",
                            "code": "-- Numeric Range\nSELECT * FROM employees\nWHERE salary BETWEEN 50000 AND 100000;\n\n-- Date Range\nSELECT * FROM orders\nWHERE order_date BETWEEN '2025-01-01' AND '2025-12-31';\n\n-- Equivalent to\nSELECT * FROM employees\nWHERE salary >= 50000 AND salary <= 100000;\n\n-- NOT BETWEEN (outside the range)\nSELECT * FROM employees\nWHERE salary NOT BETWEEN 50000 AND 100000;\n\n-- BETWEEN combined with other conditions\nSELECT * FROM employees\nWHERE salary BETWEEN 50000 AND 80000\n  AND department_id = 2;\n\n-- Wrong order returns nothing\nSELECT * FROM employees WHERE salary BETWEEN 100000 AND 50000;  -- no rows"
                        },
                        {
                            "term": "Inclusive vs Exclusive Range",
                            "definition": "BETWEEN includes both boundaries. If you need to exclude one or both ends, use comparison operators instead. This matters most with decimals and timestamps: a date such as '2025-12-31' is treated as midnight (00:00:00), so BETWEEN would miss rows later that day. For timestamp columns, use an inclusive lower bound and an exclusive upper bound set to the next day.",
                            "code": "-- Inclusive: includes 50000 and 80000\nWHERE salary BETWEEN 50000 AND 80000;\n\n-- Exclusive of both boundaries\nWHERE salary > 50000 AND salary < 80000;\n\n-- Half-open range: includes 50000, excludes 80000\nWHERE salary >= 50000 AND salary < 80000;\n\n-- Decimals: boundary values are included exactly\nWHERE price BETWEEN 9.99 AND 19.99;\n\n-- Timestamp trap: misses rows after 2025-12-31 00:00:00\nWHERE created_at BETWEEN '2025-01-01' AND '2025-12-31';\n\n-- Correct: include the entire final day\nWHERE created_at >= '2025-01-01'\n  AND created_at <  '2026-01-01';"
                        },
                        {
                            "term": "LIKE",
                            "definition": "Matches text against a pattern using wildcards. In PostgreSQL, LIKE is case-sensitive. A pattern with no wildcard behaves like equality. NOT LIKE excludes matching rows, and LIKE can be combined with AND/OR and other filters.",
                            "code": "-- Starts With\nSELECT * FROM users\nWHERE name LIKE 'Shiv%';\n\n-- Ends With\nSELECT * FROM users\nWHERE name LIKE '%Singh';\n\n-- Contains\nSELECT * FROM users\nWHERE name LIKE '%iva%';\n\n-- Single Character\nSELECT * FROM users\nWHERE name LIKE 'A_';\n\n-- NOT LIKE\nSELECT * FROM users\nWHERE email NOT LIKE '%@gmail.com';\n\n-- Case sensitivity: these are different\nSELECT * FROM users WHERE name LIKE 'shiv%';  -- does NOT match 'Shivam'\nSELECT * FROM users WHERE name LIKE 'Shiv%';  -- matches 'Shivam'\n\n-- Combined with other filters\nSELECT * FROM users\nWHERE name LIKE 'S%' AND status = 'Active';"
                        },
                        {
                            "term": "Wildcard Characters",
                            "definition": "LIKE uses two wildcards. % matches zero or more characters (any length, including none). _ matches exactly one character. They can be combined and placed anywhere in the pattern. To search for a literal % or _, escape it with the ESCAPE clause.",
                            "code": "-- % : zero or more characters\nWHERE name LIKE 'A%';     -- 'A', 'Amit', 'Aarav'\n\n-- _ : exactly one character\nWHERE name LIKE 'A_';     -- 'Al' (not 'A' or 'Amit')\nWHERE code LIKE 'EMP_01'; -- 'EMPA01', 'EMPB01'\n\n-- Exact length: use multiple underscores\nWHERE code LIKE '____';   -- exactly 4 characters\n\n-- ESCAPE: search for literal % and _\nWHERE discount LIKE '10\\%';                  -- default escape character is \\\nWHERE discount LIKE '10!%' ESCAPE '!';       -- custom escape character\nWHERE username LIKE '%\\_admin';              -- literal underscore"
                        },
                        {
                            "term": "Pattern Matching Combinations",
                            "definition": "Wildcards can be combined to express more precise patterns: starts and ends with specific characters, a specific character at a given position, an exact number of characters, or several alternative patterns joined with OR.",
                            "code": "-- Starts AND ends with specific characters\nWHERE name LIKE 'S%h';\n\n-- Specific character at a particular position (2nd letter is 'a')\nWHERE name LIKE '_a%';\n\n-- Exact number of characters, starting with 'A' (5 total)\nWHERE name LIKE 'A____';\n\n-- Specific position AND length (3rd character is 'x', 5 chars total)\nWHERE code LIKE '__x__';\n\n-- Multiple possible patterns using OR\nWHERE name LIKE 'A%' OR name LIKE 'S%';\n\n-- Exclude several patterns\nWHERE email NOT LIKE '%@test.com' AND email NOT LIKE '%@example.com';"
                        },
                        {
                            "term": "ILIKE",
                            "definition": "A PostgreSQL-specific, case-insensitive version of LIKE. It supports the same wildcards (% and _), and works for starts-with, ends-with, and contains searches. NOT ILIKE excludes matches, and it can be combined with AND/OR. ILIKE is not standard SQL, so it is not portable to other databases (use LOWER(column) LIKE LOWER(pattern) for portable code).",
                            "code": "-- Case-Insensitive Search\nSELECT * FROM users\nWHERE name ILIKE 'shiv%';\n\nSELECT * FROM users\nWHERE email ILIKE '%gmail.com';\n\n-- Contains\nSELECT * FROM products\nWHERE name ILIKE '%pro%';      -- matches 'Pro', 'PRO', 'Laptop Pro'\n\n-- NOT ILIKE\nSELECT * FROM users\nWHERE email NOT ILIKE '%@test.com';\n\n-- Combined with AND / OR\nSELECT * FROM users\nWHERE (name ILIKE 'a%' OR name ILIKE 's%')\n  AND status = 'Active';\n\n-- LIKE vs ILIKE\nSELECT * FROM products WHERE name LIKE  '%pro%';  -- case-sensitive\nSELECT * FROM products WHERE name ILIKE '%pro%';  -- case-insensitive\n\n-- Portable alternative (works in most databases)\nSELECT * FROM products WHERE LOWER(name) LIKE '%pro%';"
                        },
                        {
                            "term": "ANY",
                            "definition": "Compares a value against a collection (an array or a subquery result) and returns true if at least one comparison is true. It works with any comparison operator (=, <>, >, <, >=, <=). = ANY behaves like IN, but ANY can also use other operators. NULL behavior: if a match is found the result is true; if there is no match but the collection contains NULL, the result is NULL (not false).",
                            "code": "-- ANY with Array (equal to any value, like IN)\nSELECT * FROM employees\nWHERE department_id = ANY (ARRAY[1,2,3]);\n\n-- ANY with Subquery\nSELECT * FROM employees\nWHERE department_id = ANY (\n    SELECT id\n    FROM departments\n    WHERE location = 'Hyderabad'\n);\n\n-- Equal to any value\nWHERE salary = ANY (ARRAY[30000, 50000, 70000]);\n\n-- Greater than ANY value (greater than the smallest = > 30000)\nWHERE salary > ANY (ARRAY[30000, 50000, 70000]);\n\n-- Less than ANY value (less than the largest = < 70000)\nWHERE salary < ANY (ARRAY[30000, 50000, 70000]);\n\n-- ANY vs IN: these are equivalent\nWHERE department_id IN (1,2,3);\nWHERE department_id = ANY (ARRAY[1,2,3]);"
                        },
                        {
                            "term": "SOME",
                            "definition": "An alias of ANY with identical behavior: it returns true if a comparison matches at least one value. It supports comparison operators and works with arrays and subqueries. Use ANY in most code since it is more common in PostgreSQL; use SOME only if you prefer the wording.",
                            "code": "-- SOME behaves exactly like ANY\nSELECT *\nFROM employees\nWHERE department_id = SOME (ARRAY[1,2,3]);\n\n-- With a comparison operator and subquery\nSELECT * FROM employees\nWHERE salary > SOME (SELECT salary FROM interns);\n\n-- These two are identical\nWHERE salary > ANY  (ARRAY[30000, 50000]);\nWHERE salary > SOME (ARRAY[30000, 50000]);"
                        },
                        {
                            "term": "ALL",
                            "definition": "Compares a value against every value in a collection and returns true only if the comparison is true for ALL of them. It works with arrays, subqueries, and any comparison operator. Difference from ANY: ANY needs at least one true comparison, ALL needs every comparison to be true. NULL behavior: if any comparison is false the result is false; otherwise, if any value is NULL the result is NULL (row excluded). Over an empty set, ALL is true.",
                            "code": "-- Salary greater than all intern salaries\nSELECT *\nFROM employees\nWHERE salary > ALL (\n    SELECT salary\n    FROM interns\n);\n\n-- ALL with Array: greater than every value (greater than the max = > 70000)\nWHERE salary > ALL (ARRAY[30000, 50000, 70000]);\n\n-- Less than every value (less than the min = < 30000)\nWHERE salary < ALL (ARRAY[30000, 50000, 70000]);\n\n-- Not equal to every value (same as NOT IN)\nWHERE department_id <> ALL (ARRAY[1,2,3]);\n\n-- ANY vs ALL\nWHERE salary > ANY (ARRAY[30000, 50000, 70000]);  -- > 30000\nWHERE salary > ALL (ARRAY[30000, 50000, 70000]);  -- > 70000\n\n-- NULL pitfall: one NULL makes the whole condition unknown\nWHERE salary > ALL (ARRAY[30000, NULL]);  -- no rows returned"
                        },
                        {
                            "term": "IS NULL",
                            "definition": "Returns rows where a column contains a NULL value. NULL means 'unknown or missing', so it cannot be tested with = or <>; always use IS NULL.",
                            "code": "-- Find rows with NULL values\nSELECT *\nFROM users\nWHERE deleted_at IS NULL;"
                        },
                        {
                            "term": "IS NOT NULL",
                            "definition": "Returns rows where a column contains a non-NULL value.",
                            "code": "-- Find rows with non-NULL values\nSELECT *\nFROM users\nWHERE deleted_at IS NOT NULL;"
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