window.notePageData = {
    "title": "07. SQL Operations — Sorting & Pagination",
    "navLabel": "Sorting & Pagination",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "07. SQL Operations — Sorting & Pagination",
        "text": "Order result sets and split them into pages in PostgreSQL: ORDER BY, LIMIT and OFFSET."
    },
    "nav": [
        {
            "label": "Sorting",
            "href": "#sorting"
        },
        {
            "label": "Limiting Results",
            "href": "#limiting-results"
        }
    ],
    "sections": [
        {
            "id": "sorting",
            "type": "terminology",
            "label": "Sorting",
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
            "label": "Limiting Results",
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
        }
    ]
};
