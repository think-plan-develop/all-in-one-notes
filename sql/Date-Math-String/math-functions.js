window.notePageData = {
    "title": "07. SQL Operations — Mathematical Functions",
    "navLabel": "Mathematical Functions",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "07. SQL Operations — Mathematical Functions",
        "text": "Numeric helpers in PostgreSQL: ROUND, CEIL, FLOOR and RANDOM."
    },
    "nav": [
        {
            "label": "Mathematical Functions",
            "href": "#math-functions"
        }
    ],
    "sections": [
        {
            "id": "math-functions",
            "type": "terminology",
            "label": "Mathematical Functions",
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
                    "headers": [
                        "Function",
                        "Behaviour",
                        "Example Input",
                        "Result"
                    ],
                    "rows": [
                        [
                            "ROUND(val, n)",
                            "Round to n decimal places",
                            "ROUND(4.567, 2)",
                            "4.57"
                        ],
                        [
                            "CEIL(val)",
                            "Round up to nearest integer",
                            "CEIL(4.1)",
                            "5"
                        ],
                        [
                            "FLOOR(val)",
                            "Round down to nearest integer",
                            "FLOOR(4.9)",
                            "4"
                        ],
                        [
                            "RANDOM()",
                            "Random float in [0, 1)",
                            "RANDOM()",
                            "e.g. 0.734"
                        ],
                        [
                            "FLOOR(RANDOM() * n + 1)",
                            "Random integer 1 → n",
                            "FLOOR(RANDOM()*10+1)",
                            "e.g. 7"
                        ]
                    ]
                }
            ]
        }
    ]
};
