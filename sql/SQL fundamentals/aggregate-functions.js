window.notePageData = {
    "title": "07. SQL Operations — Aggregate Functions",
    "navLabel": "Aggregate Functions",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "07. SQL Operations — Aggregate Functions",
        "text": "Summarise rows in PostgreSQL: COUNT, SUM, AVG, MAX and MIN."
    },
    "nav": [
        {
            "label": "Aggregate Functions",
            "href": "#aggregate-functions"
        }
    ],
    "sections": [
        {
            "id": "aggregate-functions",
            "type": "terminology",
            "label": "Aggregate Functions",
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
                    "headers": [
                        "Function",
                        "Returns",
                        "Ignores NULLs",
                        "Works On"
                    ],
                    "rows": [
                        [
                            "COUNT(*)",
                            "Row count",
                            "No",
                            "Any type"
                        ],
                        [
                            "COUNT(col)",
                            "Non-NULL row count",
                            "Yes",
                            "Any type"
                        ],
                        [
                            "SUM(col)",
                            "Total",
                            "Yes",
                            "Numeric"
                        ],
                        [
                            "AVG(col)",
                            "Mean value",
                            "Yes",
                            "Numeric"
                        ],
                        [
                            "MAX(col)",
                            "Highest value",
                            "Yes",
                            "Numeric, Text, Date"
                        ],
                        [
                            "MIN(col)",
                            "Lowest value",
                            "Yes",
                            "Numeric, Text, Date"
                        ]
                    ]
                }
            ]
        }
    ]
};
