window.notePageData = {
    "title": "SQL Operations — 02 SQL Reference",
    "navLabel": "SQL operations sections-02",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "SQL Operations — 02",
        "text": "A practical reference covering sorting, result limiting, pagination, aggregate functions, grouping, string functions, date functions, and mathematical functions in PostgreSQL — each with real-world syntax and examples you'll actually use."
    },
    "nav": [
        { "label": "Sorting",               "href": "#sorting" },
        { "label": "Limiting Results",      "href": "#limiting-results" },
        { "label": "Aggregate Functions",   "href": "#aggregate-functions" },
        { "label": "Grouping",              "href": "#grouping" },
        { "label": "String Functions",      "href": "#string-functions" },
        { "label": "Date Functions",        "href": "#date-functions" },
        { "label": "Math Functions",        "href": "#math-functions" }
    ],
    "sections": [

        {
            "id": "sorting",
            "type": "terminology",
            "label": "6. Sorting",
            "heading": "Sorting",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "ORDER BY ASC",
                            "definition": "Sorts the result set in ascending order (smallest to largest, A to Z, oldest to newest). ASC is the default direction — omitting it produces the same result.",
                            "filename": "order_by_asc.sql",
                            "code": "-- Sort by a single column (ascending — default)\nSELECT id, name, salary\nFROM employees\nORDER BY salary ASC;\n\n-- Sort alphabetically A → Z\nSELECT id, name\nFROM users\nORDER BY name ASC;\n\n-- Sort by date oldest → newest\nSELECT id, order_code, created_at\nFROM orders\nORDER BY created_at ASC;\n\n-- Sort by multiple columns\nSELECT id, department, salary\nFROM employees\nORDER BY department ASC, salary ASC;"
                        },
                        {
                            "term": "ORDER BY DESC",
                            "definition": "Sorts the result set in descending order (largest to smallest, Z to A, newest to oldest). Useful for leaderboards, latest records, and top-N queries.",
                            "filename": "order_by_desc.sql",
                            "code": "-- Sort by salary highest → lowest\nSELECT id, name, salary\nFROM employees\nORDER BY salary DESC;\n\n-- Sort alphabetically Z → A\nSELECT id, name\nFROM users\nORDER BY name DESC;\n\n-- Sort by date newest → oldest\nSELECT id, order_code, created_at\nFROM orders\nORDER BY created_at DESC;\n\n-- Mixed direction: department A→Z, salary high→low within each dept\nSELECT id, department, salary\nFROM employees\nORDER BY department ASC, salary DESC;\n\n-- NULLS LAST / NULLS FIRST: control where NULLs appear\nSELECT id, name, deleted_at\nFROM users\nORDER BY deleted_at DESC NULLS LAST;"
                        }
                    ]
                }
            ]
        },

        {
            "id": "limiting-results",
            "type": "terminology",
            "label": "7. Limiting Results",
            "heading": "Limiting Results",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "LIMIT",
                            "definition": "Restricts the number of rows returned by a query. Always pair it with ORDER BY to get a deterministic result set.",
                            "filename": "limit.sql",
                            "code": "-- Return only the first 10 rows\nSELECT id, name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 10;\n\n-- Top 5 most recent orders\nSELECT id, order_code, created_at\nFROM orders\nORDER BY created_at DESC\nLIMIT 5;\n\n-- Single most expensive product\nSELECT id, name, price\nFROM products\nORDER BY price DESC\nLIMIT 1;"
                        },
                        {
                            "term": "OFFSET",
                            "definition": "Skips a specified number of rows before returning results. Used together with LIMIT to implement pagination — skip the rows already shown on previous pages.",
                            "filename": "offset.sql",
                            "code": "-- Skip the first 10 rows, return the next 10\nSELECT id, name\nFROM users\nORDER BY id ASC\nLIMIT 10 OFFSET 10;\n\n-- Skip 20 rows (rows already shown on pages 1 and 2)\nSELECT id, name\nFROM users\nORDER BY id ASC\nLIMIT 10 OFFSET 20;"
                        },
                        {
                            "term": "Pagination Queries",
                            "definition": "Pagination splits a large result set into pages. The formula is: OFFSET = (page_number - 1) × page_size. Always include ORDER BY so row order is stable across requests.",
                            "filename": "pagination.sql",
                            "code": "-- Formula:  OFFSET = (page - 1) * page_size\n--\n-- Page 1  →  LIMIT 10 OFFSET 0\n-- Page 2  →  LIMIT 10 OFFSET 10\n-- Page 3  →  LIMIT 10 OFFSET 20\n\n-- Page 1\nSELECT id, name, email\nFROM users\nORDER BY id ASC\nLIMIT 10 OFFSET 0;\n\n-- Page 2\nSELECT id, name, email\nFROM users\nORDER BY id ASC\nLIMIT 10 OFFSET 10;\n\n-- Page 3\nSELECT id, name, email\nFROM users\nORDER BY id ASC\nLIMIT 10 OFFSET 20;\n\n-- Dynamic pagination (replace :page and :size with real values)\nSELECT id, name, email\nFROM users\nORDER BY id ASC\nLIMIT :size OFFSET ((:page - 1) * :size);\n\n-- Count total records for the page indicator\nSELECT COUNT(*) AS total FROM users;"
                        }
                    ]
                }
            ]
        },

        {
            "id": "aggregate-functions",
            "type": "terminology",
            "label": "8. Aggregate Functions",
            "heading": "Aggregate Functions",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "COUNT",
                            "definition": "Returns the number of rows that match the query. COUNT(*) counts all rows including NULLs; COUNT(column) counts only non-NULL values in that column.",
                            "filename": "count.sql",
                            "code": "-- Total rows in the table\nSELECT COUNT(*) FROM users;\n\n-- Count non-NULL values in a specific column\nSELECT COUNT(email) FROM users;\n\n-- Count distinct values\nSELECT COUNT(DISTINCT department) FROM employees;\n\n-- Count with a filter\nSELECT COUNT(*) FROM orders WHERE status = 'pending';\n\n-- Count per group\nSELECT department, COUNT(*) AS total\nFROM employees\nGROUP BY department\nORDER BY total DESC;"
                        },
                        {
                            "term": "SUM",
                            "definition": "Returns the total of all non-NULL numeric values in a column. Returns NULL if all values are NULL.",
                            "filename": "sum.sql",
                            "code": "-- Total salary cost\nSELECT SUM(salary) AS total_salary\nFROM employees;\n\n-- Total revenue from completed orders\nSELECT SUM(total) AS revenue\nFROM orders\nWHERE status = 'completed';\n\n-- Sum per group\nSELECT department, SUM(salary) AS dept_salary\nFROM employees\nGROUP BY department\nORDER BY dept_salary DESC;"
                        },
                        {
                            "term": "AVG",
                            "definition": "Returns the arithmetic mean of all non-NULL numeric values in a column. Ignores NULL values in the calculation.",
                            "filename": "avg.sql",
                            "code": "-- Average salary across all employees\nSELECT AVG(salary) AS avg_salary\nFROM employees;\n\n-- Round the result to 2 decimal places\nSELECT ROUND(AVG(salary), 2) AS avg_salary\nFROM employees;\n\n-- Average salary per department\nSELECT department, ROUND(AVG(salary), 2) AS avg_salary\nFROM employees\nGROUP BY department\nORDER BY avg_salary DESC;\n\n-- Employees earning above the company average\nSELECT id, name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);"
                        },
                        {
                            "term": "MAX",
                            "definition": "Returns the highest value in a column. Works on numeric, text, and date types. NULL values are ignored.",
                            "filename": "max.sql",
                            "code": "-- Highest salary in the company\nSELECT MAX(salary) AS highest_salary\nFROM employees;\n\n-- Most recent order date\nSELECT MAX(created_at) AS latest_order\nFROM orders;\n\n-- Highest salary per department\nSELECT department, MAX(salary) AS highest_salary\nFROM employees\nGROUP BY department\nORDER BY highest_salary DESC;\n\n-- Row with the maximum salary (use ORDER BY + LIMIT)\nSELECT id, name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 1;"
                        },
                        {
                            "term": "MIN",
                            "definition": "Returns the lowest value in a column. Works on numeric, text, and date types. NULL values are ignored.",
                            "filename": "min.sql",
                            "code": "-- Lowest salary in the company\nSELECT MIN(salary) AS lowest_salary\nFROM employees;\n\n-- Earliest order date\nSELECT MIN(created_at) AS first_order\nFROM orders;\n\n-- Lowest salary per department\nSELECT department, MIN(salary) AS lowest_salary\nFROM employees\nGROUP BY department\nORDER BY lowest_salary ASC;\n\n-- Combined: min, max, avg, sum, count in one query\nSELECT\n    COUNT(*)                AS total_employees,\n    ROUND(AVG(salary), 2)   AS avg_salary,\n    MAX(salary)             AS highest_salary,\n    MIN(salary)             AS lowest_salary,\n    SUM(salary)             AS total_salary_cost\nFROM employees;"
                        }
                    ]
                },
                {
                    "type": "table",
                    "headers": ["Function", "Returns", "Ignores NULLs", "Works On"],
                    "rows": [
                        ["COUNT(*)",   "Row count",         "No",  "Any type"],
                        ["COUNT(col)", "Non-NULL row count", "Yes", "Any type"],
                        ["SUM(col)",   "Total",             "Yes", "Numeric"],
                        ["AVG(col)",   "Mean value",        "Yes", "Numeric"],
                        ["MAX(col)",   "Highest value",     "Yes", "Numeric, Text, Date"],
                        ["MIN(col)",   "Lowest value",      "Yes", "Numeric, Text, Date"]
                    ]
                }
            ]
        },

        {
            "id": "grouping",
            "type": "terminology",
            "label": "9. Grouping",
            "heading": "Grouping",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "GROUP BY",
                            "definition": "Collapses rows that share the same value in one or more columns into a single summary row. Every column in the SELECT list must either appear in GROUP BY or be wrapped in an aggregate function.",
                            "filename": "group_by.sql",
                            "code": "-- Count employees per department\nSELECT department, COUNT(*) AS total\nFROM employees\nGROUP BY department;\n\n-- Total salary spend per department\nSELECT department, SUM(salary) AS total_salary\nFROM employees\nGROUP BY department\nORDER BY total_salary DESC;\n\n-- Average salary per department\nSELECT department, ROUND(AVG(salary), 2) AS avg_salary\nFROM employees\nGROUP BY department;\n\n-- Group by multiple columns\nSELECT department, job_title, COUNT(*) AS headcount\nFROM employees\nGROUP BY department, job_title\nORDER BY department, headcount DESC;\n\n-- Order count per status per day\nSELECT DATE(created_at) AS order_date, status, COUNT(*) AS total\nFROM orders\nGROUP BY order_date, status\nORDER BY order_date DESC;"
                        },
                        {
                            "term": "HAVING",
                            "definition": "Filters the groups produced by GROUP BY — it is the WHERE clause for aggregated results. Unlike WHERE (which filters individual rows before grouping), HAVING filters after aggregation.",
                            "filename": "having.sql",
                            "code": "-- Departments with more than 5 employees\nSELECT department, COUNT(*) AS total\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 5;\n\n-- Departments where average salary exceeds 80,000\nSELECT department, ROUND(AVG(salary), 2) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > 80000\nORDER BY avg_salary DESC;\n\n-- Customers with more than 3 orders\nSELECT user_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY user_id\nHAVING COUNT(*) > 3\nORDER BY order_count DESC;\n\n-- WHERE vs HAVING together:\n-- WHERE filters rows first, then HAVING filters the groups\nSELECT department, COUNT(*) AS total\nFROM employees\nWHERE status = 'Active'       -- row-level filter (before grouping)\nGROUP BY department\nHAVING COUNT(*) >= 3;          -- group-level filter (after grouping)"
                        }
                    ]
                },
                {
                    "type": "table",
                    "headers": ["Clause", "Filters", "Runs", "Can Use Aggregates"],
                    "rows": [
                        ["WHERE",  "Individual rows",  "Before GROUP BY", "No"],
                        ["HAVING", "Grouped results",  "After GROUP BY",  "Yes"]
                    ]
                }
            ]
        },

        {
            "id": "string-functions",
            "type": "terminology",
            "label": "10. String Functions",
            "heading": "String Functions",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "CONCAT",
                            "definition": "Joins two or more strings into one. In PostgreSQL you can also use the || operator. CONCAT ignores NULLs; || propagates them.",
                            "filename": "concat.sql",
                            "code": "-- Join first and last name\nSELECT CONCAT(first_name, ' ', last_name) AS full_name\nFROM users;\n\n-- Using || operator (NULL-propagating)\nSELECT first_name || ' ' || last_name AS full_name\nFROM users;\n\n-- CONCAT_WS: join with a separator, skips NULLs\nSELECT CONCAT_WS(', ', city, state, country) AS address\nFROM locations;\n\n-- Concatenate a column with static text\nSELECT 'User: ' || name AS label\nFROM users;"
                        },
                        {
                            "term": "LENGTH",
                            "definition": "Returns the number of characters in a string. Returns NULL if the input is NULL. Use OCTET_LENGTH for byte length of binary/multi-byte strings.",
                            "filename": "length.sql",
                            "code": "-- Length of each user's name\nSELECT name, LENGTH(name) AS name_length\nFROM users;\n\n-- Filter by string length\nSELECT name\nFROM users\nWHERE LENGTH(name) > 10;\n\n-- Find shortest and longest name\nSELECT\n    MIN(LENGTH(name)) AS shortest,\n    MAX(LENGTH(name)) AS longest\nFROM users;"
                        },
                        {
                            "term": "LOWER",
                            "definition": "Converts all characters in a string to lowercase. Commonly used to normalise text before comparison or storage.",
                            "filename": "lower.sql",
                            "code": "-- Convert email to lowercase\nSELECT LOWER(email) AS email\nFROM users;\n\n-- Case-insensitive search using LOWER (portable alternative to ILIKE)\nSELECT *\nFROM users\nWHERE LOWER(name) = 'shivam';\n\n-- Normalise and store\nUPDATE users\nSET email = LOWER(email);"
                        },
                        {
                            "term": "UPPER",
                            "definition": "Converts all characters in a string to uppercase. Useful for displaying headings, codes, or normalising identifiers.",
                            "filename": "upper.sql",
                            "code": "-- Display status in uppercase\nSELECT id, UPPER(status) AS status\nFROM orders;\n\n-- Case-insensitive match\nSELECT *\nFROM users\nWHERE UPPER(name) = 'SHIVAM';\n\n-- Generate an uppercase order code\nSELECT 'ORD-' || UPPER(SUBSTRING(uuid_generate_v4()::TEXT, 1, 8)) AS order_code;"
                        },
                        {
                            "term": "SUBSTRING",
                            "definition": "Extracts a portion of a string by position. SUBSTRING(string FROM start FOR length) — start is 1-based. Also supports regex extraction with SIMILAR TO syntax.",
                            "filename": "substring.sql",
                            "code": "-- Extract first 3 characters\nSELECT SUBSTRING(name FROM 1 FOR 3) AS short_name\nFROM users;\n\n-- Extract domain from email  (position after '@')\nSELECT\n    email,\n    SUBSTRING(email FROM POSITION('@' IN email) + 1) AS domain\nFROM users;\n\n-- Extract year from a date string\nSELECT SUBSTRING(CAST(created_at AS TEXT) FROM 1 FOR 4) AS year\nFROM orders;\n\n-- Shorthand alias: SUBSTR(string, start, length)\nSELECT SUBSTR(phone, 1, 3) AS area_code\nFROM contacts;"
                        },
                        {
                            "term": "REPLACE",
                            "definition": "Replaces all occurrences of a substring within a string with a new substring. Case-sensitive. Returns the original string unchanged if the search substring is not found.",
                            "filename": "replace.sql",
                            "code": "-- Replace a word in a string\nSELECT REPLACE('Hello World', 'World', 'PostgreSQL');\n-- Result: 'Hello PostgreSQL'\n\n-- Remove spaces from a name\nSELECT REPLACE(name, ' ', '') AS username\nFROM users;\n\n-- Mask part of a phone number\nSELECT REPLACE(phone, SUBSTRING(phone FROM 4 FOR 4), '****') AS masked_phone\nFROM contacts;\n\n-- Bulk update: replace old domain in emails\nUPDATE users\nSET email = REPLACE(email, '@oldomain.com', '@newdomain.com')\nWHERE email LIKE '%@olddomain.com';"
                        }
                    ]
                },
                {
                    "type": "table",
                    "headers": ["Function", "Purpose", "Example", "Result"],
                    "rows": [
                        ["CONCAT(a, b)",           "Join strings",           "CONCAT('Hi', ' ', 'Dev')",              "'Hi Dev'"],
                        ["LENGTH(str)",            "Character count",        "LENGTH('Shivam')",                      "6"],
                        ["LOWER(str)",             "Lowercase",              "LOWER('HELLO')",                        "'hello'"],
                        ["UPPER(str)",             "Uppercase",              "UPPER('hello')",                        "'HELLO'"],
                        ["SUBSTRING(str, pos, n)", "Extract substring",      "SUBSTRING('Hello' FROM 1 FOR 3)",       "'Hel'"],
                        ["REPLACE(str, old, new)", "Replace occurrences",    "REPLACE('foo bar', 'bar', 'baz')",      "'foo baz'"]
                    ]
                }
            ]
        },



        {
            "id": "date-functions",
            "type": "terminology",
            "label": "11. Date Functions",
            "heading": "Date Functions",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "NOW()",
                            "definition": "Returns the current date and time (with timezone) at the moment the transaction started. The value stays fixed for the entire transaction — useful for consistent timestamps across multiple operations.",
                            "filename": "now.sql",
                            "code": "-- Current timestamp with timezone\nSELECT NOW();\n-- Result: 2025-06-23 14:32:05.123456+05:30\n\n-- Insert with current timestamp\nINSERT INTO orders (user_id, total, created_at)\nVALUES (1, 1500, NOW());\n\n-- Filter rows from the last 30 days\nSELECT * FROM orders\nWHERE created_at >= NOW() - INTERVAL '30 days';\n\n-- Difference: NOW() vs CURRENT_TIMESTAMP vs CLOCK_TIMESTAMP()\n-- NOW()               → transaction start time (fixed per transaction)\n-- CURRENT_TIMESTAMP   → same as NOW()\n-- CLOCK_TIMESTAMP()   → actual wall-clock time (changes mid-transaction)"
                        },
                        {
                            "term": "CURRENT_DATE",
                            "definition": "Returns today's date only (no time, no timezone) as a DATE value. Ideal for date-only comparisons and filtering without time components.",
                            "filename": "current_date.sql",
                            "code": "-- Today's date\nSELECT CURRENT_DATE;\n-- Result: 2025-06-23\n\n-- Orders placed today\nSELECT * FROM orders\nWHERE DATE(created_at) = CURRENT_DATE;\n\n-- Records from this month\nSELECT * FROM orders\nWHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE);\n\n-- Records from this year\nSELECT * FROM orders\nWHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE);\n\n-- Days since each user registered\nSELECT name, CURRENT_DATE - DATE(created_at) AS days_since_joined\nFROM users;"
                        },
                        {
                            "term": "AGE()",
                            "definition": "Calculates the interval between two timestamps, or between a timestamp and today. Returns a human-readable interval (years, months, days) rather than a raw number.",
                            "filename": "age.sql",
                            "code": "-- Age from a date to today\nSELECT AGE(birthdate) AS age\nFROM users;\n-- Result: 24 years 3 mons 10 days\n\n-- Age between two specific dates\nSELECT AGE('2025-06-23', '2000-03-15') AS age;\n-- Result: 25 years 3 mons 8 days\n\n-- Extract just the year part of the age\nSELECT name,\n       EXTRACT(YEAR FROM AGE(birthdate)) AS age_years\nFROM users;\n\n-- Adults only (18+)\nSELECT * FROM users\nWHERE EXTRACT(YEAR FROM AGE(birthdate)) >= 18;\n\n-- How long since each order was placed\nSELECT id, AGE(created_at) AS order_age\nFROM orders;"
                        },
                        {
                            "term": "DATE_TRUNC()",
                            "definition": "Truncates a timestamp to the specified precision (year, month, week, day, hour, minute, second), zeroing out all less-significant parts. Essential for grouping data by time period.",
                            "filename": "date_trunc.sql",
                            "code": "-- Truncate to the start of the month\nSELECT DATE_TRUNC('month', NOW());\n-- Result: 2025-06-01 00:00:00+05:30\n\n-- Orders grouped by month\nSELECT\n    DATE_TRUNC('month', created_at) AS month,\n    COUNT(*)                         AS total_orders,\n    SUM(total)                       AS revenue\nFROM orders\nGROUP BY month\nORDER BY month DESC;\n\n-- Daily active users\nSELECT\n    DATE_TRUNC('day', created_at) AS day,\n    COUNT(DISTINCT user_id)        AS active_users\nFROM sessions\nGROUP BY day\nORDER BY day DESC;\n\n-- Records from the current week\nSELECT * FROM orders\nWHERE DATE_TRUNC('week', created_at) = DATE_TRUNC('week', CURRENT_DATE);\n\n-- Supported precisions: year, quarter, month, week, day, hour, minute, second"
                        },
                        {
                            "term": "EXTRACT()",
                            "definition": "Pulls out a single numeric field (year, month, day, hour, minute, second, dow, doy, week, quarter) from a date or timestamp. Returns a numeric value suitable for arithmetic and comparisons.",
                            "filename": "extract.sql",
                            "code": "-- Extract individual parts from the current timestamp\nSELECT\n    EXTRACT(YEAR   FROM NOW()) AS year,\n    EXTRACT(MONTH  FROM NOW()) AS month,\n    EXTRACT(DAY    FROM NOW()) AS day,\n    EXTRACT(HOUR   FROM NOW()) AS hour,\n    EXTRACT(MINUTE FROM NOW()) AS minute;\n\n-- Filter by month (all June orders across all years)\nSELECT * FROM orders\nWHERE EXTRACT(MONTH FROM created_at) = 6;\n\n-- Filter by year\nSELECT * FROM orders\nWHERE EXTRACT(YEAR FROM created_at) = 2025;\n\n-- Day of the week (0 = Sunday … 6 = Saturday)\nSELECT name, EXTRACT(DOW FROM created_at) AS weekday\nFROM orders;\n\n-- Orders grouped by quarter\nSELECT\n    EXTRACT(YEAR    FROM created_at) AS year,\n    EXTRACT(QUARTER FROM created_at) AS quarter,\n    COUNT(*) AS total\nFROM orders\nGROUP BY year, quarter\nORDER BY year, quarter;"
                        }
                    ]
                },
                {
                    "type": "table",
                    "headers": ["Function", "Returns", "Includes Time", "Primary Use"],
                    "rows": [
                        ["NOW()",                      "Timestamp with timezone", "Yes", "Current timestamp for inserts & comparisons"],
                        ["CURRENT_DATE",               "Date only",               "No",  "Date-only comparisons, age calc"],
                        ["AGE(date)",                  "Interval (y/m/d)",        "No",  "Human-readable duration between dates"],
                        ["DATE_TRUNC('unit', ts)",     "Truncated timestamp",      "Yes", "Group by day / month / year / week"],
                        ["EXTRACT(field FROM ts)",     "Numeric value",           "Yes", "Filter or sort by year, month, weekday"]
                    ]
                }
            ]
        },

        {
            "id": "math-functions",
            "type": "terminology",
            "label": "12. Mathematical Functions",
            "heading": "Mathematical Functions",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "ROUND",
                            "definition": "Rounds a numeric value to the specified number of decimal places. ROUND(value) rounds to the nearest integer; ROUND(value, n) rounds to n decimal places. Uses banker's rounding (round half to even) by default.",
                            "filename": "round.sql",
                            "code": "-- Round to the nearest integer\nSELECT ROUND(4.5);    -- 5\nSELECT ROUND(4.4);    -- 4\n\n-- Round to 2 decimal places\nSELECT ROUND(19.5678, 2);  -- 19.57\n\n-- Round salary to nearest thousand\nSELECT name, ROUND(salary, -3) AS rounded_salary\nFROM employees;\n\n-- Round average price in a report\nSELECT\n    category,\n    ROUND(AVG(price), 2) AS avg_price\nFROM products\nGROUP BY category\nORDER BY avg_price DESC;"
                        },
                        {
                            "term": "CEIL",
                            "definition": "Returns the smallest integer that is greater than or equal to the input value — always rounds up. Alias: CEILING(). Useful for calculating page counts and minimum quantities.",
                            "filename": "ceil.sql",
                            "code": "-- Always rounds up\nSELECT CEIL(4.1);   -- 5\nSELECT CEIL(4.9);   -- 5\nSELECT CEIL(5.0);   -- 5\nSELECT CEIL(-4.3);  -- -4  (less negative = up)\n\n-- Calculate total pages needed for pagination\n-- Formula: CEIL(total_rows / page_size)\nSELECT CEIL(COUNT(*)::NUMERIC / 10) AS total_pages\nFROM users;\n\n-- Minimum boxes needed to pack items (12 per box)\nSELECT product_id,\n       CEIL(quantity::NUMERIC / 12) AS boxes_needed\nFROM inventory;"
                        },
                        {
                            "term": "FLOOR",
                            "definition": "Returns the largest integer that is less than or equal to the input value — always rounds down. Opposite of CEIL. Useful for bucketing, binning, and age calculations.",
                            "filename": "floor.sql",
                            "code": "-- Always rounds down\nSELECT FLOOR(4.9);   -- 4\nSELECT FLOOR(4.1);   -- 4\nSELECT FLOOR(5.0);   -- 5\nSELECT FLOOR(-4.3);  -- -5  (more negative = down)\n\n-- Age in complete years (no rounding up)\nSELECT name,\n       FLOOR(EXTRACT(EPOCH FROM AGE(birthdate)) / 31557600) AS age_years\nFROM users;\n\n-- Salary band (bucket salaries into 10,000 groups)\nSELECT name,\n       FLOOR(salary / 10000) * 10000 AS salary_band\nFROM employees\nORDER BY salary_band;"
                        },
                        {
                            "term": "RANDOM",
                            "definition": "Returns a random floating-point value between 0.0 (inclusive) and 1.0 (exclusive). Combine with FLOOR or arithmetic to generate random integers within a range. The result changes on every call.",
                            "filename": "random.sql",
                            "code": "-- Random float between 0 and 1\nSELECT RANDOM();\n-- Example result: 0.7341829304\n\n-- Random integer between 1 and 100\nSELECT FLOOR(RANDOM() * 100 + 1)::INT AS random_number;\n\n-- Random integer between min and max (inclusive)\n-- Formula: FLOOR(RANDOM() * (max - min + 1) + min)\nSELECT FLOOR(RANDOM() * (50 - 10 + 1) + 10)::INT AS random_10_to_50;\n\n-- Return 5 random rows from a table\nSELECT * FROM products\nORDER BY RANDOM()\nLIMIT 5;\n\n-- Assign a random score to each row\nSELECT id, name, ROUND((RANDOM() * 100)::NUMERIC, 2) AS random_score\nFROM users;"
                        }
                    ]
                },
                {
                    "type": "table",
                    "headers": ["Function", "Behaviour", "Example Input", "Result"],
                    "rows": [
                        ["ROUND(val, n)",  "Round to n decimal places",          "ROUND(4.567, 2)",   "4.57"],
                        ["CEIL(val)",      "Round up to nearest integer",         "CEIL(4.1)",         "5"],
                        ["FLOOR(val)",     "Round down to nearest integer",       "FLOOR(4.9)",        "4"],
                        ["RANDOM()",       "Random float in [0, 1)",             "RANDOM()",          "e.g. 0.734"],
                        ["FLOOR(RANDOM() * n + 1)", "Random integer 1 → n",     "FLOOR(RANDOM()*10+1)", "e.g. 7"]
                    ]
                }
            ]
        }

    ]
};