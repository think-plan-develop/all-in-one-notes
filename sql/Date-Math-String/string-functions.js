window.notePageData = {
    "title": "07. SQL Operations — String Functions",
    "navLabel": "String Functions",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "07. SQL Operations — String Functions",
        "text": "Manipulate text in PostgreSQL: CONCAT, LENGTH, LOWER, UPPER, SUBSTRING and REPLACE."
    },
    "nav": [
        {
            "label": "String Functions",
            "href": "#string-functions"
        }
    ],
    "sections": [
        {
            "id": "string-functions",
            "type": "terminology",
            "label": "String Functions",
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
                    "headers": [
                        "Function",
                        "Purpose",
                        "Example",
                        "Result"
                    ],
                    "rows": [
                        [
                            "CONCAT(a, b)",
                            "Join strings",
                            "CONCAT('Hi', ' ', 'Dev')",
                            "'Hi Dev'"
                        ],
                        [
                            "LENGTH(str)",
                            "Character count",
                            "LENGTH('Shivam')",
                            "6"
                        ],
                        [
                            "LOWER(str)",
                            "Lowercase",
                            "LOWER('HELLO')",
                            "'hello'"
                        ],
                        [
                            "UPPER(str)",
                            "Uppercase",
                            "UPPER('hello')",
                            "'HELLO'"
                        ],
                        [
                            "SUBSTRING(str, pos, n)",
                            "Extract substring",
                            "SUBSTRING('Hello' FROM 1 FOR 3)",
                            "'Hel'"
                        ],
                        [
                            "REPLACE(str, old, new)",
                            "Replace occurrences",
                            "REPLACE('foo bar', 'bar', 'baz')",
                            "'foo baz'"
                        ]
                    ]
                }
            ]
        }
    ]
};
