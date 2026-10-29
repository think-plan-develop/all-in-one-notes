window.notePageData = {
    "title": "07. SQL Operations — Date Functions",
    "navLabel": "Date Functions",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "07. SQL Operations — Date Functions",
        "text": "Work with dates and times in PostgreSQL: NOW, CURRENT_DATE, AGE, DATE_TRUNC and EXTRACT."
    },
    "nav": [
        {
            "label": "Date Functions",
            "href": "#date-functions"
        }
    ],
    "sections": [
        {
            "id": "date-functions",
            "type": "terminology",
            "label": "Date Functions",
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
                    "headers": [
                        "Function",
                        "Returns",
                        "Includes Time",
                        "Primary Use"
                    ],
                    "rows": [
                        [
                            "NOW()",
                            "Timestamp with timezone",
                            "Yes",
                            "Current timestamp for inserts & comparisons"
                        ],
                        [
                            "CURRENT_DATE",
                            "Date only",
                            "No",
                            "Date-only comparisons, age calc"
                        ],
                        [
                            "AGE(date)",
                            "Interval (y/m/d)",
                            "No",
                            "Human-readable duration between dates"
                        ],
                        [
                            "DATE_TRUNC('unit', ts)",
                            "Truncated timestamp",
                            "Yes",
                            "Group by day / month / year / week"
                        ],
                        [
                            "EXTRACT(field FROM ts)",
                            "Numeric value",
                            "Yes",
                            "Filter or sort by year, month, weekday"
                        ]
                    ]
                }
            ]
        }
    ]
};
