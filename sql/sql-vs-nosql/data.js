window.notePageData = {
    "title": "SQL vs NoSQL",
    "navLabel": "SQL vs NoSQL sections",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "SQL vs NoSQL",
        "text": "SQL databases use structured tables and relationships, while NoSQL databases use flexible models like documents, key-value pairs, graphs, or wide columns."
    },
    "nav": [
        { "label": "Notes", "href": "#notes" },
        { "label": "Definitions", "href": "#terms" },
        { "label": "Diagram", "href": "#diagram" },
        { "label": "Workflow", "href": "#workflow" },
        { "label": "Comparison", "href": "#comparison" },
        { "label": "Use Cases", "href": "#use-cases" },
        { "label": "Q&A", "href": "#qa" }
    ],
    "sections": [
        {
            "id": "notes",
            "type": "notes",
            "label": "Notes",
            "heading": "Important Concepts",
            "blocks": [
                {
                    "type": "list",
                    "items": [
                        "SQL is best when data has a fixed structure and strong relationships.",
                        "NoSQL is best when data shape changes often or horizontal scaling is a major requirement.",
                        "SQL usually prioritizes consistency and relational integrity; NoSQL often prioritizes flexibility, speed, and scale.",
                        "The right choice depends on query patterns, data relationships, scale, and consistency needs."
                    ]
                }
            ]
        },
        {
            "id": "terms",
            "type": "terminology",
            "label": "Terminology / Key Definitions",
            "heading": "Key Definitions",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "SQL Database",
                            "definition": "A relational database that stores data in tables with rows, columns, schemas, primary keys, and foreign keys."
                        },
                        {
                            "term": "NoSQL Database",
                            "definition": "A non-relational database designed for flexible schemas, high scale, and different data models."
                        },
                        {
                            "term": "Schema",
                            "definition": "The structure that defines tables, fields, data types, and relationships."
                        },
                        {
                            "term": "Horizontal Scaling",
                            "definition": "Adding more servers to distribute data and traffic."
                        }
                    ]
                }
            ]
        },
        {
            "id": "diagram",
            "type": "diagram",
            "label": "Diagram",
            "heading": "Data Model Difference",
            "blocks": [
                {
                    "type": "diagram",
                    "text": "SQL\nUsers table ---- Orders table ---- OrderItems table\n\nNoSQL\nUser document {\n  profile,\n  orders: [embedded order data]\n}"
                }
            ]
        },
        {
            "id": "workflow",
            "type": "workflow",
            "label": "Workflow / Request Flow",
            "heading": "How To Choose",
            "blocks": [
                {
                    "type": "list",
                    "ordered": true,
                    "items": [
                        "List the main data entities and relationships.",
                        "Identify the most common read and write queries.",
                        "Check whether the schema is stable or changes frequently.",
                        "Decide how much consistency is required for important operations.",
                        "Choose SQL for relational consistency or NoSQL for flexible, scalable access patterns."
                    ]
                }
            ]
        },
        {
            "type": "code-snippet",
            "label": "Code Snippet",
            "heading": "Same User Data In Both Styles",
            "blocks": [
                {
                    "type": "code",
                    "text": "-- SQL\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    email VARCHAR(150) UNIQUE\n);\n\n-- NoSQL document\n{\n    \"_id\": \"u101\",\n    \"name\": \"Aman\",\n    \"email\": \"aman@example.com\",\n    \"orders\": [\n        { \"id\": \"o501\", \"total\": 1200 }\n    ]\n}"
                }
            ]
        },
        {
            "type": "explanation",
            "label": "Explanation",
            "heading": "Core Difference",
            "blocks": [
                {
                    "type": "paragraph",
                    "parts": [
                        "In SQL, related data is usually split into tables and connected with ",
                        { "code": "JOIN" },
                        ". In NoSQL, related data may be embedded together in one document to make reads faster."
                    ]
                }
            ]
        },
        {
            "id": "comparison",
            "type": "comparison",
            "label": "Differentiate / Comparison",
            "heading": "SQL vs NoSQL",
            "blocks": [
                {
                    "type": "table",
                    "headers": ["Point", "SQL", "NoSQL"],
                    "rows": [
                        ["Data Model", "Tables, rows, and columns", "Documents, key-value, graph, or wide-column"],
                        ["Schema", "Fixed schema", "Flexible schema"],
                        ["Relationships", "Strong support with joins and foreign keys", "Usually handled by embedding or references"],
                        ["Scaling", "Often vertical first, horizontal with planning", "Designed for horizontal scaling"],
                        ["Transactions", "Strong ACID support", "Varies by database and data model"],
                        ["Examples", "MySQL, PostgreSQL, SQL Server, Oracle", "MongoDB, Redis, Cassandra, DynamoDB"]
                    ]
                }
            ]
        },
        {
            "id": "use-cases",
            "type": "use-cases",
            "label": "Use Cases",
            "heading": "When To Use Each",
            "blocks": [
                {
                    "type": "list",
                    "items": [
                        "Use SQL for banking, ERP, inventory, reporting, and systems with strong relationships.",
                        "Use NoSQL for product catalogs, user activity logs, real-time feeds, IoT data, and rapidly changing content.",
                        "Use both together when one application has relational transactions and flexible high-volume event data."
                    ]
                }
            ]
        },
        {
            "type": "best-practices",
            "label": "Best Practices",
            "heading": "Production Recommendations",
            "blocks": [
                {
                    "type": "list",
                    "items": [
                        "Choose based on access patterns, not popularity.",
                        "Use SQL constraints when data correctness is critical.",
                        "In NoSQL, design documents around the queries your application actually runs.",
                        "Avoid mixing unrelated data in one NoSQL document just because the schema is flexible."
                    ]
                }
            ]
        },
        {
            "type": "common-mistakes",
            "label": "Common Mistakes",
            "heading": "Frequent Errors",
            "blocks": [
                {
                    "type": "list",
                    "items": [
                        "Choosing NoSQL only because it sounds newer.",
                        "Using SQL without indexes for frequent filters and joins.",
                        "Embedding too much data in a NoSQL document until updates become difficult.",
                        "Ignoring consistency requirements before choosing a database."
                    ]
                }
            ]
        },
        {
            "type": "interview-questions",
            "label": "Interview Questions",
            "heading": "Technical Interview Prep",
            "blocks": [
                {
                    "type": "qa",
                    "items": [
                        {
                            "question": "What is the main difference between SQL and NoSQL?",
                            "answer": "SQL is relational and table-based with fixed schemas. NoSQL is non-relational and supports flexible data models such as documents, key-value pairs, graphs, or wide columns."
                        },
                        {
                            "question": "Which is better: SQL or NoSQL?",
                            "answer": "Neither is always better. SQL is usually better for structured relational data and transactions. NoSQL is often better for flexible schemas, high scale, and fast access to document-like data."
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
                            "question": "Can SQL databases scale horizontally?",
                            "answer": "Yes, but it usually needs more planning through replication, sharding, partitioning, or distributed SQL systems."
                        },
                        {
                            "question": "Is MongoDB always schema-less?",
                            "answer": "MongoDB has a flexible schema, but production applications still need consistent document structure and validation rules."
                        }
                    ]
                }
            ]
        },
        {
            "type": "summary",
            "label": "Summary / Key Takeaways",
            "heading": "Quick Revision",
            "blocks": [
                {
                    "type": "list",
                    "items": [
                        "SQL is strong for structured data, relationships, and transactions.",
                        "NoSQL is strong for flexible data, fast reads, and horizontal scaling.",
                        "Choose the database from data shape, query needs, consistency, and scale."
                    ]
                }
            ]
        }
    ]
};
