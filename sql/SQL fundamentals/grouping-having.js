window.notePageData = {
    "title": "07. SQL Operations — Grouping & Aggregate Filtering",
    "navLabel": "Grouping & Aggregate Filtering",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "07. SQL Operations — Grouping & Aggregate Filtering",
        "text": "Group rows and filter the groups in PostgreSQL: GROUP BY and HAVING."
    },
    "nav": [
        {
            "label": "Grouping & Aggregate Filtering",
            "href": "#grouping-having"
        }
    ],
    "sections": [
        {
            "id": "grouping-having",
            "type": "terminology",
            "label": "Grouping & Aggregate Filtering",
            "heading": "Grouping & Aggregate Filtering",
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
                    "headers": [
                        "Clause",
                        "Filters",
                        "Runs",
                        "Can Use Aggregates"
                    ],
                    "rows": [
                        [
                            "WHERE",
                            "Individual rows",
                            "Before GROUP BY",
                            "No"
                        ],
                        [
                            "HAVING",
                            "Grouped results",
                            "After GROUP BY",
                            "Yes"
                        ]
                    ]
                }
            ]
        }
    ]
};
