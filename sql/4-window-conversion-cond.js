window.notePageData = {
  "title": "SQL Functions — Window, Conversion, Conditional & COALESCE",
  "navLabel": "SQL Functions sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "SQL Functions — Window, Conversion, Conditional & COALESCE",
    "text": "A complete reference for four essential SQL function categories — Window Functions for ranked and running calculations across rows, Conversion Functions for casting between data types, Conditional Functions for branching logic inside queries, and COALESCE for handling NULL values cleanly."
  },
  "nav": [
    { "label": "Notes",           "href": "#notes" },
    { "label": "Window Functions","href": "#window" },
    { "label": "Conversion",      "href": "#conversion" },
    { "label": "Conditional",     "href": "#conditional" },
    { "label": "COALESCE",        "href": "#coalesce" },
    { "label": "Diagram",         "href": "#diagram" },
    { "label": "Comparison",      "href": "#comparison" },
    { "label": "Boxes",           "href": "#boxes" },
    { "label": "Use Cases",       "href": "#use-cases" },
    { "label": "Best Practices",  "href": "#best-practices" },
    { "label": "Mistakes",        "href": "#common-mistakes" },
    { "label": "Interview",       "href": "#interview" },
    { "label": "Q&A",             "href": "#qa" },
    { "label": "Summary",         "href": "#summary" }
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
            "Window functions compute a value across a set of rows related to the current row — without collapsing them into one row like GROUP BY does.",
            "OVER() is the mandatory clause that turns an aggregate into a window function.",
            "PARTITION BY divides rows into groups; ORDER BY defines the order within each group.",
            "ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD, SUM/AVG/COUNT OVER are all window functions.",
            "Conversion functions cast a value from one data type to another — CAST(), CONVERT(), TO_CHAR(), TO_DATE(), TO_NUMBER().",
            "Conditional functions return different values based on a condition — CASE WHEN, IF(), IIF(), NULLIF(), NVL().",
            "COALESCE(a, b, c) returns the first non-NULL value in the list — the safest way to handle NULLs in SQL.",
            "NULLIF(a, b) returns NULL if a = b, otherwise returns a — the inverse of COALESCE.",
            "Window functions are evaluated AFTER WHERE, GROUP BY, and HAVING — but BEFORE ORDER BY and LIMIT.",
            "CAST() is ANSI SQL standard and works across all databases; CONVERT() syntax varies by database."
          ]
        }
      ]
    },

    {
      "id": "window",
      "type": "terminology",
      "label": "Window Functions",
      "heading": "Window Functions",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "A window function performs a calculation across a set of rows that are related to the current row. Unlike ",
            { "code": "GROUP BY" },
            ", window functions do not collapse rows — each row keeps its identity and gains an extra computed column."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "OVER()",
              "definition": "The clause that defines a window function. Without OVER(), SUM() or AVG() are aggregate functions that collapse rows. With OVER(), they become window functions that return one value per row.",
              "code": "SELECT name, salary,\n  SUM(salary) OVER() AS total_salary\nFROM employees;"
            },
            {
              "term": "PARTITION BY",
              "definition": "Divides rows into groups (partitions) before the window function is applied. Works like GROUP BY but without collapsing rows — each row still appears in the result.",
              "code": "SELECT name, dept, salary,\n  SUM(salary) OVER(PARTITION BY dept) AS dept_total\nFROM employees;"
            },
            {
              "term": "ORDER BY inside OVER()",
              "definition": "Defines the order of rows within each partition. Required for ranking functions and running totals. Makes SUM() compute a running cumulative sum instead of a total.",
              "code": "SELECT name, salary,\n  SUM(salary) OVER(ORDER BY id) AS running_total\nFROM employees;"
            },
            {
              "term": "ROW_NUMBER()",
              "definition": "Assigns a unique sequential integer to every row within a partition. Always unique — even if two rows have the same value, they get different numbers. Use for pagination or deduplication.",
              "code": "SELECT name, dept, salary,\n  ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary DESC) AS rn\nFROM employees;"
            },
            {
              "term": "RANK()",
              "definition": "Assigns a rank within a partition. Rows with the same value get the same rank — but the next rank skips. Example: two rows tied at rank 1 mean the next row is rank 3, not rank 2.",
              "code": "SELECT name, salary,\n  RANK() OVER(ORDER BY salary DESC) AS rnk\nFROM employees;"
            },
            {
              "term": "DENSE_RANK()",
              "definition": "Like RANK() but without gaps. Two rows tied at rank 1 mean the next row is rank 2, not rank 3. Use when you need consecutive rank numbers without skipping.",
              "code": "SELECT name, salary,\n  DENSE_RANK() OVER(ORDER BY salary DESC) AS dense_rnk\nFROM employees;"
            },
            {
              "term": "NTILE(n)",
              "definition": "Divides rows into n roughly equal buckets and assigns a bucket number to each row. Useful for percentile analysis — NTILE(4) creates quartiles, NTILE(100) creates percentiles.",
              "code": "SELECT name, salary,\n  NTILE(4) OVER(ORDER BY salary) AS quartile\nFROM employees;"
            },
            {
              "term": "LAG(column, offset, default)",
              "definition": "Returns the value from a previous row within the partition. Offset defaults to 1 (the immediately preceding row). Default is returned if there is no prior row. Used to compare a row with the row before it.",
              "code": "SELECT name, salary,\n  LAG(salary, 1, 0) OVER(ORDER BY id) AS prev_salary,\n  salary - LAG(salary, 1, 0) OVER(ORDER BY id) AS diff\nFROM employees;"
            },
            {
              "term": "LEAD(column, offset, default)",
              "definition": "Returns the value from a following row within the partition. The mirror of LAG. Used to compare a row with the row after it — for example, to find the next month's sales.",
              "code": "SELECT name, salary,\n  LEAD(salary, 1) OVER(ORDER BY id) AS next_salary\nFROM employees;"
            },
            {
              "term": "FIRST_VALUE() / LAST_VALUE()",
              "definition": "Returns the first or last value in the window frame. LAST_VALUE requires an explicit frame clause (ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) because the default frame stops at the current row.",
              "code": "SELECT name, salary,\n  FIRST_VALUE(salary) OVER(PARTITION BY dept ORDER BY salary DESC) AS top_salary,\n  LAST_VALUE(salary)  OVER(PARTITION BY dept ORDER BY salary DESC\n    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS bottom_salary\nFROM employees;"
            },
            {
              "term": "SUM / AVG / COUNT / MIN / MAX OVER()",
              "definition": "Standard aggregates become window functions when OVER() is added. They compute across the window without collapsing rows — allowing you to show both the row detail and the aggregate in the same query.",
              "code": "SELECT name, dept, salary,\n  AVG(salary) OVER(PARTITION BY dept) AS dept_avg,\n  salary - AVG(salary) OVER(PARTITION BY dept) AS diff_from_avg\nFROM employees;"
            }
          ]
        },
        {
          "type": "text-box",
          "variant": "remember",
          "title": "Window Function Execution Order",
          "text": "Window functions run AFTER WHERE, GROUP BY, and HAVING — but BEFORE the final ORDER BY and LIMIT. This means you cannot filter on a window function result using WHERE. Wrap the whole query in a subquery or CTE and filter on the outer query."
        }
      ]
    },

    {
      "id": "conversion",
      "type": "terminology",
      "label": "Conversion Functions",
      "heading": "Conversion Functions",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Conversion functions change a value from one data type to another. The ANSI-standard function is ",
            { "code": "CAST()" },
            ". PostgreSQL also supports ",
            { "code": "::shorthand" },
            " and various TO_* functions for formatted conversions."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "CAST(value AS type)",
              "definition": "The ANSI-standard type conversion function. Works across all major databases. Converts a value to the specified data type — fails with an error if the conversion is not possible.",
              "code": "-- text to integer\nSELECT CAST('42' AS INTEGER);\n\n-- integer to text\nSELECT CAST(42 AS TEXT);\n\n-- text to date\nSELECT CAST('2026-06-27' AS DATE);\n\n-- numeric to decimal with precision\nSELECT CAST(price AS NUMERIC(10,2)) FROM products;"
            },
            {
              "term": ":: (PostgreSQL cast shorthand)",
              "definition": "PostgreSQL-specific syntax for CAST — shorter and more readable. Behaves identically to CAST() but is not portable to other databases.",
              "code": "-- equivalent to CAST('42' AS INTEGER)\nSELECT '42'::INTEGER;\n\nSELECT '2026-06-27'::DATE;\n\nSELECT price::NUMERIC(10,2) FROM products;"
            },
            {
              "term": "TO_CHAR(value, format)",
              "definition": "Converts a number or date to a formatted text string. The format mask controls the output. Very useful for displaying dates and numbers in a specific human-readable pattern.",
              "code": "-- date to formatted string\nSELECT TO_CHAR(NOW(), 'DD/MM/YYYY');\n-- output: 27/06/2026\n\nSELECT TO_CHAR(NOW(), 'Month DD, YYYY HH24:MI');\n-- output: June 27, 2026 14:30\n\n-- number to formatted string\nSELECT TO_CHAR(1234567.89, 'FM9,999,999.00');\n-- output: 1,234,567.89"
            },
            {
              "term": "TO_DATE(string, format)",
              "definition": "Converts a text string to a DATE using a format mask. The format must match the pattern of the input string exactly.",
              "code": "SELECT TO_DATE('27/06/2026', 'DD/MM/YYYY');\n-- returns: 2026-06-27 as DATE\n\nSELECT TO_DATE('June 27 2026', 'Month DD YYYY');"
            },
            {
              "term": "TO_TIMESTAMP(string, format)",
              "definition": "Converts a text string to a TIMESTAMP. Like TO_DATE() but includes time information.",
              "code": "SELECT TO_TIMESTAMP('27/06/2026 14:30:00', 'DD/MM/YYYY HH24:MI:SS');\n-- returns: 2026-06-27 14:30:00"
            },
            {
              "term": "TO_NUMBER(string, format)",
              "definition": "Converts a formatted text string to a NUMERIC value. The format mask tells PostgreSQL how to parse the string.",
              "code": "SELECT TO_NUMBER('1,234,567.89', 'FM9,999,999.99');\n-- returns: 1234567.89 as NUMERIC"
            }
          ]
        },
        {
          "type": "code",
          "filename": "conversion.sql",
          "text": "-- Practical conversion examples\n\n-- Safe integer conversion (avoid error on bad input)\nSELECT\n  CASE WHEN col ~ '^[0-9]+$'\n    THEN CAST(col AS INTEGER)\n    ELSE NULL\n  END AS safe_int\nFROM raw_data;\n\n-- Format a price column for display\nSELECT\n  name,\n  TO_CHAR(price, 'FM$9,999,999.00') AS formatted_price\nFROM products;\n\n-- Parse a date from a user-input string\nINSERT INTO orders (created_at)\nVALUES (TO_TIMESTAMP('27-06-2026 09:15', 'DD-MM-YYYY HH24:MI'));\n\n-- Cast across joins to align types\nSELECT u.name, o.total\nFROM users u\nJOIN orders o ON o.user_id = CAST(u.id AS INT);"
        },
        {
          "type": "text-box",
          "variant": "warning",
          "title": "Warning",
          "text": "CAST() throws a hard error if the conversion fails — for example CAST('abc' AS INTEGER) will crash the query. In PostgreSQL, use a CASE WHEN or TRY_CAST equivalent to handle bad data safely. Always validate source data before casting."
        }
      ]
    },

    {
      "id": "conditional",
      "type": "terminology",
      "label": "Conditional Functions",
      "heading": "Conditional Functions",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Conditional functions let you add ",
            { "code": "if/else" },
            " branching logic inside a SQL query. The most powerful is ",
            { "code": "CASE WHEN" },
            ", which works in SELECT, WHERE, ORDER BY, and GROUP BY clauses."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "CASE WHEN ... THEN ... ELSE ... END",
              "definition": "The standard SQL conditional expression. Evaluates each WHEN condition in order and returns the THEN value for the first match. If no condition matches, returns the ELSE value — or NULL if ELSE is omitted. Works anywhere an expression is valid.",
              "code": "-- Searched CASE: each WHEN is a boolean condition\nSELECT\n  name,\n  salary,\n  CASE\n    WHEN salary >= 100000 THEN 'Senior'\n    WHEN salary >= 60000  THEN 'Mid'\n    WHEN salary >= 30000  THEN 'Junior'\n    ELSE 'Intern'\n  END AS level\nFROM employees;\n\n-- Simple CASE: compares one expression against values\nSELECT\n  name,\n  CASE status\n    WHEN 'A' THEN 'Active'\n    WHEN 'I' THEN 'Inactive'\n    WHEN 'S' THEN 'Suspended'\n    ELSE 'Unknown'\n  END AS status_label\nFROM users;"
            },
            {
              "term": "CASE WHEN in ORDER BY",
              "definition": "You can use CASE WHEN inside ORDER BY to define a custom sort order that cannot be expressed with a simple column sort.",
              "code": "SELECT name, status\nFROM orders\nORDER BY\n  CASE status\n    WHEN 'urgent'   THEN 1\n    WHEN 'pending'  THEN 2\n    WHEN 'shipped'  THEN 3\n    ELSE 4\n  END;"
            },
            {
              "term": "CASE WHEN in aggregate (conditional aggregation)",
              "definition": "Combining CASE WHEN with aggregate functions lets you pivot or filter inside an aggregation — computing multiple different counts or sums in a single query without multiple GROUP BY passes.",
              "code": "-- Count active vs inactive users per department in one query\nSELECT\n  dept,\n  COUNT(CASE WHEN is_active = true  THEN 1 END) AS active_count,\n  COUNT(CASE WHEN is_active = false THEN 1 END) AS inactive_count,\n  SUM(CASE WHEN salary > 80000     THEN salary ELSE 0 END) AS high_earner_payroll\nFROM employees\nGROUP BY dept;"
            },
            {
              "term": "NULLIF(expression1, expression2)",
              "definition": "Returns NULL if expression1 equals expression2, otherwise returns expression1. Primary use: prevent division-by-zero errors by making the denominator NULL instead of zero, which then propagates NULL through the division safely.",
              "code": "-- Division-by-zero protection\nSELECT\n  total_revenue / NULLIF(total_orders, 0) AS avg_order_value\nFROM sales_summary;\n\n-- Returns NULL when values are equal, otherwise first value\nSELECT NULLIF('active', 'active');  -- NULL\nSELECT NULLIF('active', 'inactive'); -- 'active'"
            },
            {
              "term": "IIF(condition, true_value, false_value)",
              "definition": "A shorthand conditional available in SQL Server and Access. Not available in PostgreSQL or MySQL natively — use CASE WHEN instead. Equivalent to a two-branch CASE WHEN.",
              "code": "-- SQL Server / Access only\nSELECT name,\n  IIF(salary > 50000, 'High', 'Low') AS salary_band\nFROM employees;\n\n-- PostgreSQL equivalent\nSELECT name,\n  CASE WHEN salary > 50000 THEN 'High' ELSE 'Low' END AS salary_band\nFROM employees;"
            }
          ]
        },
        {
          "type": "code",
          "filename": "conditional.sql",
          "text": "-- CASE WHEN for column transformation\nSELECT\n  order_id,\n  total,\n  CASE\n    WHEN total >= 10000 THEN 'Platinum'\n    WHEN total >= 5000  THEN 'Gold'\n    WHEN total >= 1000  THEN 'Silver'\n    ELSE 'Standard'\n  END AS tier,\n  -- conditional aggregation in same query\n  CASE WHEN shipped_at IS NOT NULL THEN 'Shipped' ELSE 'Pending' END AS ship_status\nFROM orders;\n\n-- CASE WHEN inside GROUP BY for custom bucketing\nSELECT\n  CASE\n    WHEN age < 18 THEN 'Under 18'\n    WHEN age BETWEEN 18 AND 35 THEN '18-35'\n    WHEN age BETWEEN 36 AND 60 THEN '36-60'\n    ELSE 'Over 60'\n  END AS age_group,\n  COUNT(*) AS user_count\nFROM users\nGROUP BY\n  CASE\n    WHEN age < 18 THEN 'Under 18'\n    WHEN age BETWEEN 18 AND 35 THEN '18-35'\n    WHEN age BETWEEN 36 AND 60 THEN '36-60'\n    ELSE 'Over 60'\n  END;"
        }
      ]
    },

    {
      "id": "coalesce",
      "type": "terminology",
      "label": "COALESCE",
      "heading": "COALESCE — NULL Handling",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            { "code": "COALESCE(a, b, c, ...)" },
            " returns the first non-NULL value from its argument list. It is the standard SQL function for NULL handling and is supported across PostgreSQL, MySQL, SQL Server, and Oracle. It is equivalent to a nested ",
            { "code": "CASE WHEN a IS NOT NULL THEN a WHEN b IS NOT NULL THEN b ELSE c END" },
            " but far more readable."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "COALESCE — basic usage",
              "definition": "Returns the first argument that is not NULL. If all arguments are NULL, returns NULL. Takes any number of arguments. All arguments must be of compatible types.",
              "code": "-- Returns 'N/A' if nickname is NULL, otherwise nickname\nSELECT COALESCE(nickname, 'N/A') AS display_name\nFROM users;\n\n-- Tries phone first, then mobile, then email as contact\nSELECT COALESCE(phone, mobile, email, 'No contact') AS contact\nFROM users;"
            },
            {
              "term": "COALESCE for default values",
              "definition": "The most common use — provide a fallback value when a column is NULL. Avoids NULL appearing in reports or calculations.",
              "code": "-- Show 0 instead of NULL for missing scores\nSELECT\n  student_id,\n  COALESCE(math_score,    0) AS math,\n  COALESCE(english_score, 0) AS english,\n  COALESCE(math_score, 0) + COALESCE(english_score, 0) AS total\nFROM scores;"
            },
            {
              "term": "COALESCE in aggregations",
              "definition": "NULL values are ignored by SUM, AVG, and COUNT. But when displaying aggregated results, COALESCE ensures NULL outputs are replaced with meaningful defaults.",
              "code": "SELECT\n  dept,\n  COALESCE(SUM(bonus), 0)   AS total_bonus,\n  COALESCE(AVG(salary), 0)  AS avg_salary\nFROM employees\nGROUP BY dept;"
            },
            {
              "term": "COALESCE for UPDATE — keeping existing value",
              "definition": "A powerful pattern: when doing a partial update via an API, use COALESCE so that columns not provided in the request keep their existing values. The new value takes precedence if not NULL, otherwise the old value is kept.",
              "code": "-- API sends only the fields the user changed.\n-- Any NULL input means 'keep the existing value'\nUPDATE users\nSET\n  name     = COALESCE($1, name),\n  email    = COALESCE($2, email),\n  phone    = COALESCE($3, phone)\nWHERE id = $4;\n\n-- If $1 is NULL (not sent), name stays as-is.\n-- If $1 is 'Aman', name updates to 'Aman'."
            },
            {
              "term": "COALESCE vs NULLIF — together",
              "definition": "NULLIF converts a specific value to NULL. COALESCE then replaces that NULL with a fallback. Combined, they let you treat both NULL and a sentinel value (like empty string or zero) as the same missing case.",
              "code": "-- Treat empty string AND NULL both as 'Unknown'\nSELECT\n  COALESCE(NULLIF(TRIM(bio), ''), 'Unknown') AS bio\nFROM users;\n\n-- NULLIF converts '' to NULL\n-- COALESCE then replaces NULL with 'Unknown'"
            },
            {
              "term": "COALESCE vs CASE WHEN IS NULL",
              "definition": "COALESCE(a, b) is exactly equivalent to CASE WHEN a IS NOT NULL THEN a ELSE b END. COALESCE is shorter and clearer. Prefer COALESCE for simple NULL fallback, CASE WHEN for more complex conditional logic.",
              "code": "-- These three are identical:\nSELECT COALESCE(phone, 'N/A') FROM users;\n\nSELECT CASE WHEN phone IS NOT NULL THEN phone ELSE 'N/A' END FROM users;\n\nSELECT CASE WHEN phone IS NULL THEN 'N/A' ELSE phone END FROM users;"
            }
          ]
        },
        {
          "type": "code",
          "filename": "coalesce.sql",
          "text": "-- COALESCE chained fallback — try multiple columns in order\nSELECT\n  id,\n  COALESCE(preferred_name, first_name, username, 'Anonymous') AS display_name,\n  COALESCE(work_email, personal_email, 'no-email@example.com') AS contact_email\nFROM users;\n\n-- COALESCE in JOIN to handle optional relationship\nSELECT\n  o.id,\n  o.total,\n  COALESCE(c.name, 'Guest') AS customer_name\nFROM orders o\nLEFT JOIN customers c ON c.id = o.customer_id;\n\n-- COALESCE + NULLIF to sanitize dirty data\nSELECT\n  id,\n  COALESCE(\n    NULLIF(TRIM(address), ''),\n    NULLIF(TRIM(alt_address), ''),\n    'No Address On File'\n  ) AS mailing_address\nFROM contacts;\n\n-- Partial UPDATE pattern — only update fields that are provided\nUPDATE products\nSET\n  name        = COALESCE($1, name),\n  price       = COALESCE($2, price),\n  description = COALESCE($3, description),\n  updated_at  = NOW()\nWHERE id = $4;"
        },
        {
          "type": "text-box",
          "variant": "tip",
          "title": "Tip — COALESCE is short-circuit evaluated",
          "text": "COALESCE stops evaluating as soon as it finds the first non-NULL argument. This matters for performance when later arguments are expensive subqueries or function calls — if an earlier argument is not NULL, the later ones are never executed."
        }
      ]
    },

    {
      "id": "diagram",
      "type": "diagram",
      "label": "Diagram",
      "heading": "How Window Functions Work vs GROUP BY",
      "blocks": [
        {
          "type": "diagram",
          "variant": "flow",
          "items": [
            { "label": "Raw Rows",     "note": "all rows from table" },
            { "label": "WHERE filter", "note": "rows filtered" },
            { "label": "GROUP BY",     "note": "rows collapsed (aggregate)" },
            { "label": "HAVING",       "note": "groups filtered" },
            { "label": "OVER()",       "note": "window computed here" },
            { "label": "ORDER BY",     "note": "final sort" },
            { "label": "LIMIT",        "note": "rows trimmed" }
          ]
        },
        {
          "type": "diagram",
          "variant": "ascii",
          "text": "GROUP BY — collapses rows\n  dept   salary\n  ─────────────\n  Eng    90000   ← one row per dept, detail lost\n  Sales  70000\n\nWINDOW OVER(PARTITION BY dept) — keeps all rows\n  name    dept   salary  dept_avg\n  ──────────────────────────────\n  Alice   Eng    95000   90000   ← detail preserved\n  Bob     Eng    85000   90000\n  Carol   Sales  75000   70000\n  Dave    Sales  65000   70000"
        },
        {
          "type": "diagram",
          "variant": "layers",
          "items": [
            { "label": "COALESCE(a, b, c)",   "note": "returns first non-NULL" },
            { "label": "NULLIF(a, b)",         "note": "returns NULL when a = b" },
            { "label": "CASE WHEN",            "note": "branching conditional logic" },
            { "label": "CAST() / ::",          "note": "type conversion" },
            { "label": "Window OVER()",        "note": "row-level calculation across partition" }
          ]
        }
      ]
    },

    {
      "id": "comparison",
      "type": "comparison",
      "label": "Comparison",
      "heading": "Function Comparison",
      "blocks": [
        {
          "type": "table",
          "headers": ["Function", "Category", "Returns", "NULL behaviour", "PostgreSQL?"],
          "rows": [
            ["ROW_NUMBER()",     "Window",     "Unique integer per row",           "Ignores NULL in ORDER",    "✅ Yes"],
            ["RANK()",           "Window",     "Rank with gaps on ties",           "NULL treated as equal",    "✅ Yes"],
            ["DENSE_RANK()",     "Window",     "Rank without gaps",                "NULL treated as equal",    "✅ Yes"],
            ["LAG(col, n)",      "Window",     "Value from n rows back",           "Returns default if none",  "✅ Yes"],
            ["LEAD(col, n)",     "Window",     "Value from n rows ahead",          "Returns default if none",  "✅ Yes"],
            ["CAST(x AS type)",  "Conversion", "Value in new type",                "CAST(NULL) = NULL",        "✅ Yes"],
            ["TO_CHAR(val, fmt)","Conversion", "Formatted text string",            "TO_CHAR(NULL) = NULL",     "✅ Yes"],
            ["TO_DATE(str, fmt)","Conversion", "DATE value",                       "TO_DATE(NULL) = NULL",     "✅ Yes"],
            ["CASE WHEN",        "Conditional","Value from matching branch",        "NULL if no ELSE + no match","✅ Yes"],
            ["NULLIF(a, b)",     "Conditional","NULL if a=b, else a",              "Returns NULL intentionally","✅ Yes"],
            ["COALESCE(a,b,...)", "NULL",      "First non-NULL in list",           "Returns NULL only if ALL are NULL","✅ Yes"]
          ]
        },
        {
          "type": "table",
          "headers": ["Point", "RANK()", "DENSE_RANK()", "ROW_NUMBER()"],
          "rows": [
            ["Ties",       "Same rank",   "Same rank",   "Always unique"],
            ["After tie",  "Skips numbers (1,1,3)", "No skip (1,1,2)", "Always sequential"],
            ["Use when",   "Reporting top-N with ties shown", "Ranking without gaps", "Pagination, deduplication"],
            ["Example",    "Sales leaderboard", "Grade distribution", "Get 1st row per group"]
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
          "text": "Window functions cannot be used in WHERE or HAVING — they are evaluated after those clauses. To filter on a window function result, wrap the query in a CTE or subquery and filter the outer query."
        },
        {
          "type": "text-box",
          "variant": "short-answer",
          "title": "Short Answer",
          "text": "COALESCE = first non-NULL. NULLIF = NULL when equal. CASE WHEN = if/else in SQL. CAST = type conversion. OVER() = turns aggregate into window function. PARTITION BY = group without collapsing."
        },
        {
          "type": "text-box",
          "variant": "warning",
          "title": "Warning",
          "text": "LAST_VALUE() returns the current row's value by default (not the last in the partition) because the default frame is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. Always add ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING when using LAST_VALUE."
        },
        {
          "type": "text-box",
          "variant": "tip",
          "title": "Tip",
          "text": "Use COALESCE in the UPDATE SET clause for partial update APIs — COALESCE($new_value, existing_column) keeps the existing value when the new value is NULL (not provided), and overwrites it when a real value is passed."
        },
        {
          "type": "text-box",
          "variant": "note",
          "title": "Note",
          "text": "NULLIF(value, 0) is the standard way to prevent division-by-zero errors. It converts 0 to NULL, which then makes the entire division expression return NULL instead of throwing an error."
        },
        {
          "type": "text-box",
          "variant": "interview",
          "title": "Interview",
          "text": "What is the difference between ROW_NUMBER, RANK, and DENSE_RANK? ROW_NUMBER always gives unique numbers. RANK gives the same number for ties but skips. DENSE_RANK gives the same number for ties without skipping. Example: three rows tied at rank 1 — ROW_NUMBER gives 1,2,3; RANK gives 1,1,3; DENSE_RANK gives 1,1,2."
        }
      ]
    },

    {
      "id": "use-cases",
      "type": "use-cases",
      "label": "Use Cases",
      "heading": "Real-World Use Cases",
      "blocks": [
        {
          "type": "list",
          "items": [
            "ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC) — get the most recent order per user (filter WHERE rn = 1 in a CTE).",
            "RANK() OVER(ORDER BY revenue DESC) — build a sales leaderboard showing tied positions correctly.",
            "SUM(amount) OVER(PARTITION BY user_id ORDER BY date) — running total of spending per user over time.",
            "LAG(revenue) OVER(ORDER BY month) — calculate month-over-month revenue growth by comparing each month to the previous.",
            "NTILE(100) OVER(ORDER BY score) — assign percentile ranks to students or customers.",
            "CAST(user_input AS DATE) — validate and convert date strings submitted from a form.",
            "TO_CHAR(created_at, 'YYYY-MM') — group orders by year-month for reporting without losing the timestamp.",
            "CASE WHEN in SELECT — create a derived label column (tier, status, category) without altering the table.",
            "CASE WHEN in GROUP BY — create custom age buckets or salary bands without a separate lookup table.",
            "COALESCE(phone, mobile, email) — find the best available contact method without multiple IS NULL checks.",
            "COALESCE($new_value, existing_column) in UPDATE — implement partial update API so unset fields keep their value.",
            "NULLIF(denominator, 0) — protect every division expression in reporting queries from crashing on zero denominators.",
            "COALESCE + NULLIF together — treat both NULL and empty string as missing, then provide a single fallback."
          ]
        }
      ]
    },

    {
      "id": "best-practices",
      "type": "best-practices",
      "label": "Best Practices",
      "heading": "Best Practices",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Always add an ORDER BY inside OVER() for ranking functions — without it, the result is non-deterministic and different runs may give different row numbers.",
            "Use CTEs (WITH clause) to compute window functions and then filter the outer query — never filter window results in WHERE directly.",
            "Always add ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING when using LAST_VALUE() to get the actual last value in the partition.",
            "Prefer CAST() over database-specific conversion functions when writing portable SQL that may run on multiple databases.",
            "Use TO_CHAR() for all date formatting in reports — never convert dates to strings with string concatenation.",
            "Always use COALESCE() around nullable columns before arithmetic — NULL + anything = NULL will silently produce wrong totals.",
            "Use NULLIF() defensively on every denominator in a division expression to prevent runtime division-by-zero errors.",
            "Prefer COALESCE over CASE WHEN x IS NULL THEN ... for simple NULL fallback — it is shorter and reads more naturally.",
            "Use conditional aggregation (CASE WHEN inside COUNT/SUM) instead of multiple separate queries to pivot data.",
            "Name window function columns clearly — avoid generic names like col1; use rn, rank, running_total, prev_value instead."
          ]
        }
      ]
    },

    {
      "id": "common-mistakes",
      "type": "common-mistakes",
      "label": "Common Mistakes",
      "heading": "Common Mistakes",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Trying to use a window function alias in a WHERE clause — this fails because WHERE runs before the window is computed. Use a CTE or subquery instead.",
            "Using LAST_VALUE() without ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING — returns current row value, not actual last.",
            "Forgetting ELSE in CASE WHEN — if no condition matches and there is no ELSE, the result is NULL, which silently corrupts calculations.",
            "Using CAST() on untrusted user input without validation — a non-numeric string will throw a runtime error that crashes the query.",
            "Assuming COALESCE evaluates all arguments — it is short-circuit: once a non-NULL is found, remaining arguments are not evaluated.",
            "Confusing NULLIF(a, b) with COALESCE(a, b) — NULLIF makes NULL when values match; COALESCE replaces NULL with a fallback.",
            "Writing price / total instead of price / NULLIF(total, 0) — a zero denominator causes a division-by-zero error in production.",
            "Using ROW_NUMBER() without ORDER BY inside OVER() — the row numbers are assigned in arbitrary order and not reproducible.",
            "Forgetting PARTITION BY when only per-group ranking is needed — without it, ROW_NUMBER numbers across the entire table.",
            "Using RANK() when ROW_NUMBER() is needed for pagination — RANK() can produce gaps that break LIMIT/OFFSET pagination logic."
          ]
        }
      ]
    },

    {
      "id": "interview",
      "type": "interview-questions",
      "label": "Interview Questions",
      "heading": "Interview Questions",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "What is a window function and how is it different from GROUP BY?",
              "answer": "A window function computes a value across a set of rows related to the current row and returns one result per row, keeping all rows intact. GROUP BY collapses multiple rows into one row per group, losing the individual row detail. OVER() is what makes a function a window function. Without OVER(), SUM() is an aggregate that collapses rows. With OVER(), SUM() returns a value for each row without collapsing."
            },
            {
              "question": "What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?",
              "answer": "All three assign numbers within a partition ordered by a column. ROW_NUMBER always assigns unique numbers — no two rows share a number even if they tie. RANK assigns the same number to tied rows but skips the next number — two rows at rank 1 means the next rank is 3. DENSE_RANK assigns the same number to tied rows but never skips — two rows at rank 1 means the next rank is 2. Use ROW_NUMBER for pagination and deduplication, RANK/DENSE_RANK for leaderboards."
            },
            {
              "question": "How do you get the top 1 row per group using a window function?",
              "answer": "Use ROW_NUMBER() OVER(PARTITION BY group_column ORDER BY sort_column) in a CTE or subquery, then filter WHERE rn = 1 in the outer query. This is safer than using DISTINCT ON or a correlated subquery because it is explicit, readable, and handles ties predictably."
            },
            {
              "question": "What does PARTITION BY do inside OVER()?",
              "answer": "PARTITION BY divides the rows into groups before the window function is applied, similar to GROUP BY — but without collapsing the rows. The window function is computed independently within each partition. Without PARTITION BY, the window covers the entire result set."
            },
            {
              "question": "Can you use a window function in a WHERE clause?",
              "answer": "No. Window functions are evaluated after WHERE, GROUP BY, and HAVING. You cannot reference a window function alias in WHERE or HAVING. The correct approach is to wrap the query in a CTE or subquery, compute the window function there, and then filter on the result in the outer query using WHERE."
            },
            {
              "question": "What is the difference between COALESCE and NULLIF?",
              "answer": "COALESCE takes a list of values and returns the first one that is not NULL — it replaces NULL with a fallback. NULLIF takes two values and returns NULL if they are equal, otherwise returns the first value — it converts a specific value into NULL. They are often used together: NULLIF turns an unwanted value (like empty string) into NULL, and COALESCE then replaces that NULL with a meaningful default."
            },
            {
              "question": "What is the difference between CAST() and :: in PostgreSQL?",
              "answer": "They are functionally identical — both convert a value to a different data type. CAST(value AS type) is ANSI-standard SQL and works across PostgreSQL, MySQL, SQL Server, and Oracle. The :: shorthand is PostgreSQL-specific and more concise but not portable. Use CAST() when writing SQL that may run on multiple database systems."
            },
            {
              "question": "How do you calculate a running total in SQL?",
              "answer": "Use SUM() as a window function with ORDER BY inside OVER(). SUM(amount) OVER(PARTITION BY user_id ORDER BY date) computes the cumulative sum of amount for each user, ordered by date, adding each row's amount to the total so far. The default frame (RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) is what makes it a running sum rather than a total."
            },
            {
              "question": "What is LAG() and when would you use it?",
              "answer": "LAG(column, n, default) returns the value from n rows before the current row within the partition's ORDER BY. If there is no prior row (the current row is first), it returns the default value instead of NULL. It is most commonly used to compare a row against the previous row — for example, month-over-month revenue change, yesterday's stock price, or the previous event timestamp for a user."
            },
            {
              "question": "How do you prevent a division-by-zero error in SQL?",
              "answer": "Wrap the denominator in NULLIF(denominator, 0). NULLIF returns NULL when the denominator is zero, which then makes the entire division return NULL instead of throwing a runtime error. Example: revenue / NULLIF(orders, 0) returns NULL when orders is zero, rather than crashing. You can then wrap the whole expression in COALESCE(..., 0) to show 0 instead of NULL in the output."
            },
            {
              "question": "What is conditional aggregation and why is it useful?",
              "answer": "Conditional aggregation is using CASE WHEN inside an aggregate function like COUNT or SUM. It lets you compute multiple different aggregations in a single query — for example, COUNT(CASE WHEN status = 'active' THEN 1 END) and COUNT(CASE WHEN status = 'inactive' THEN 1 END) in the same SELECT with one GROUP BY. This avoids writing multiple separate queries and is more efficient than using subqueries or self-joins."
            },
            {
              "question": "What is NTILE() and what are its common uses?",
              "answer": "NTILE(n) divides the rows in a partition into n roughly equal buckets and assigns each row a bucket number from 1 to n. NTILE(4) creates quartiles, NTILE(10) creates deciles, NTILE(100) creates percentiles. Common uses: identifying the top 25% of customers by spend, dividing test scores into grade bands, or splitting rows evenly across n processing groups."
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
              "question": "Can I use multiple window functions in the same SELECT?",
              "answer": "Yes — you can use as many window functions as needed in a single SELECT. Each one can have a different PARTITION BY and ORDER BY. You can even give a window a name using the WINDOW keyword and reference it by name to avoid repeating the same OVER() clause."
            },
            {
              "question": "What happens if COALESCE receives all NULL arguments?",
              "answer": "COALESCE returns NULL if every argument in the list is NULL. It only returns a non-NULL value if at least one argument is not NULL. This is expected behaviour — if no fallback is available, NULL is the correct result."
            },
            {
              "question": "What is the difference between COALESCE and NVL?",
              "answer": "NVL(a, b) is Oracle-specific and only accepts exactly two arguments. COALESCE(a, b, c, ...) is ANSI SQL standard and accepts any number of arguments. They behave the same for two arguments. Use COALESCE for portability — it works in PostgreSQL, MySQL, SQL Server, and Oracle."
            },
            {
              "question": "Does CASE WHEN short-circuit like IF does in programming?",
              "answer": "In most databases including PostgreSQL, CASE WHEN does short-circuit — it evaluates conditions in order and stops at the first match. However, the SQL standard does not guarantee this, and some databases may evaluate all branches in certain situations (for example, inside aggregate functions or subqueries). Do not rely on short-circuit for side effects in SQL."
            },
            {
              "question": "Can window functions be used with GROUP BY in the same query?",
              "answer": "Yes, but carefully. When GROUP BY is used, each row in the result is already an aggregated group. Window functions are then applied to those grouped rows, not the original rows. This means you can use window functions on the result of a GROUP BY — for example, computing a running total of monthly group sums."
            },
            {
              "question": "What is the WINDOW keyword in PostgreSQL?",
              "answer": "The WINDOW clause lets you name a window definition and reuse it across multiple window functions without repeating the OVER() clause. Example: SELECT SUM(s) OVER w, AVG(s) OVER w FROM t WINDOW w AS (PARTITION BY dept ORDER BY date). This makes queries cleaner when many functions share the same window definition."
            },
            {
              "question": "What is TO_CHAR() most commonly used for?",
              "answer": "TO_CHAR() is most commonly used to format dates and timestamps into human-readable strings for display in reports, or to extract specific parts of a date as text (year, month name, day of week). It is also used to format large numbers with commas and currency symbols for display purposes. It always returns TEXT, not a date or number type."
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
            "Window functions use OVER() and compute across related rows without collapsing them — unlike GROUP BY.",
            "PARTITION BY groups rows for the window; ORDER BY orders them within each partition.",
            "ROW_NUMBER = always unique. RANK = ties share rank, gaps after. DENSE_RANK = ties share rank, no gaps.",
            "LAG gets a previous row's value; LEAD gets a next row's value — both used for row-to-row comparisons.",
            "Window functions run AFTER WHERE/GROUP BY/HAVING — filter their results in an outer query or CTE.",
            "CAST(value AS type) is the ANSI-standard type conversion; :: is PostgreSQL shorthand for the same thing.",
            "TO_CHAR formats dates and numbers to text; TO_DATE parses text to DATE; TO_TIMESTAMP parses text to TIMESTAMP.",
            "CASE WHEN is SQL's if/else — works in SELECT, WHERE, ORDER BY, GROUP BY, and inside aggregates.",
            "Conditional aggregation (CASE WHEN inside SUM/COUNT) pivots data in one query without multiple GROUP BY passes.",
            "COALESCE(a, b, c) returns the first non-NULL — the standard tool for NULL fallback and default values.",
            "NULLIF(a, b) returns NULL when a equals b — primary use is preventing division-by-zero with NULLIF(denominator, 0).",
            "COALESCE + NULLIF together: NULLIF converts empty string to NULL, COALESCE provides the fallback."
          ]
        }
      ]
    }

  ]
};