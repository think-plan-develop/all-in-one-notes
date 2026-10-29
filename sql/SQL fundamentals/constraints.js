window.notePageData = {
    "title": "06. SQL Operations — Constraints",
    "navLabel": "Constraints",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "06. SQL Operations — Constraints",
        "text": "Rules that keep PostgreSQL data valid: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK and DEFAULT."
    },
    "nav": [
        {
            "label": "Constraints",
            "href": "#constraints"
        }
    ],
    "sections": [
        {
            "id": "constraints",
            "type": "terminology",
            "label": "Constraints",
            "heading": "Constraints",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "PRIMARY KEY",
                            "definition": "Uniquely identifies every row in a table. Combines NOT NULL and UNIQUE, and a table can have only one.",
                            "code": "CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100)\n);"
                        },
                        {
                            "term": "FOREIGN KEY",
                            "definition": "Restricts a column's values to those existing in another table's primary key, enforcing a relationship between the two tables.",
                            "code": "CREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    user_id INT REFERENCES users(id)\n);"
                        },
                        {
                            "term": "UNIQUE",
                            "definition": "Ensures every value in a column is different from all others in that column, though unlike a primary key it allows one NULL value.",
                            "code": "CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) UNIQUE\n);"
                        },
                        {
                            "term": "NOT NULL",
                            "definition": "Forces a column to always have a value — NULL is never accepted for that column.",
                            "code": "CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) NOT NULL\n);"
                        },
                        {
                            "term": "CHECK",
                            "definition": "Validates that a column's value satisfies a custom boolean condition before it can be inserted or updated.",
                            "code": "CREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    price NUMERIC(10,2) CHECK (price > 0)\n);"
                        },
                        {
                            "term": "DEFAULT",
                            "definition": "Supplies an automatic value for a column when no value is explicitly provided on insert.",
                            "code": "CREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    status VARCHAR(20) DEFAULT 'pending'\n);"
                        }
                    ]
                },
                {
                    "type": "code",
                    "filename": "constraints-combined.sql",
                    "text": "-- Parent Table\nCREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Child Table Using All Major Constraints\nCREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    user_id INT NOT NULL REFERENCES users(id),\n    order_code VARCHAR(20) UNIQUE NOT NULL,\n    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),\n    status VARCHAR(20) DEFAULT 'pending',\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);"
                }
            ]
        }
    ]
};
