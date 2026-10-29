window.notePageData = {
    "title": "08. SQL Functions — NULL Handling & Conditional Logic",
    "navLabel": "NULL Handling & Conditional Logic",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "08. SQL Functions — NULL Handling & Conditional Logic",
        "text": "Handle missing values and add if/else branching inside PostgreSQL queries with COALESCE, NULLIF and CASE WHEN."
    },
    "nav": [
        {
            "label": "COALESCE",
            "href": "#coalesce"
        },
        {
            "label": "Conditional Logic",
            "href": "#conditional"
        }
    ],
    "sections": [
        {
            "id": "coalesce",
            "type": "terminology",
            "label": "COALESCE",
            "heading": "COALESCE — NULL Handling",
            "blocks": [
                {
                    "type": "paragraph",
                    "parts": [
                        {
                            "code": "COALESCE(a, b, c, ...)"
                        },
                        " returns the first non-NULL value from its argument list. It is the standard SQL function for NULL handling and is supported across PostgreSQL, MySQL, SQL Server, and Oracle. It is equivalent to a nested ",
                        {
                            "code": "CASE WHEN a IS NOT NULL THEN a WHEN b IS NOT NULL THEN b ELSE c END"
                        },
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
                },
                {
                    "type": "text-box",
                    "variant": "tip",
                    "title": "Tip",
                    "text": "Use COALESCE in the UPDATE SET clause for partial update APIs — COALESCE($new_value, existing_column) keeps the existing value when the new value is NULL (not provided), and overwrites it when a real value is passed."
                }
            ]
        },
        {
            "id": "conditional",
            "type": "terminology",
            "label": "Conditional Logic",
            "heading": "Conditional Logic — CASE WHEN",
            "blocks": [
                {
                    "type": "paragraph",
                    "parts": [
                        "Conditional functions let you add ",
                        {
                            "code": "if/else"
                        },
                        " branching logic inside a SQL query. The most powerful is ",
                        {
                            "code": "CASE WHEN"
                        },
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
                        }
                    ]
                },
                {
                    "type": "code",
                    "filename": "conditional.sql",
                    "text": "-- CASE WHEN for column transformation\nSELECT\n  order_id,\n  total,\n  CASE\n    WHEN total >= 10000 THEN 'Platinum'\n    WHEN total >= 5000  THEN 'Gold'\n    WHEN total >= 1000  THEN 'Silver'\n    ELSE 'Standard'\n  END AS tier,\n  -- conditional aggregation in same query\n  CASE WHEN shipped_at IS NOT NULL THEN 'Shipped' ELSE 'Pending' END AS ship_status\nFROM orders;\n\n-- CASE WHEN inside GROUP BY for custom bucketing\nSELECT\n  CASE\n    WHEN age < 18 THEN 'Under 18'\n    WHEN age BETWEEN 18 AND 35 THEN '18-35'\n    WHEN age BETWEEN 36 AND 60 THEN '36-60'\n    ELSE 'Over 60'\n  END AS age_group,\n  COUNT(*) AS user_count\nFROM users\nGROUP BY\n  CASE\n    WHEN age < 18 THEN 'Under 18'\n    WHEN age BETWEEN 18 AND 35 THEN '18-35'\n    WHEN age BETWEEN 36 AND 60 THEN '36-60'\n    ELSE 'Over 60'\n  END;"
                },
                {
                    "type": "text-box",
                    "variant": "note",
                    "title": "Note",
                    "text": "NULLIF(value, 0) is the standard way to prevent division-by-zero errors. It converts 0 to NULL, which then makes the entire division expression return NULL instead of throwing an error."
                },
                {
                    "type": "text-box",
                    "variant": "short-answer",
                    "title": "Short Answer",
                    "text": "COALESCE = first non-NULL. NULLIF = NULL when equal. CASE WHEN = if/else in SQL."
                }
            ]
        }
    ]
};
