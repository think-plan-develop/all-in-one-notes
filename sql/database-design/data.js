window.notePageData = {
    "title": "Database Design",
    "navLabel": "Database design sections",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "Database Design",
        "text": "Design databases effectively by choosing the right entities, relationships, keys, and constraints before writing queries."
    },
    "nav": [
        { "label": "Notes", "href": "#notes" },
        { "label": "Definitions", "href": "#terms" },
        { "label": "Diagram", "href": "#diagram" },
        { "label": "Workflow", "href": "#workflow" },
        { "label": "Code", "href": "#code" },
        { "label": "Comparison", "href": "#comparison" },
        { "label": "Boxes", "href": "#boxes" },
        { "label": "Timeline", "href": "#timeline" },
        { "label": "Checklist", "href": "#checklist" },
        { "label": "Accordion", "href": "#accordion" },
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
                        "A database design starts from business rules, not from tables.",
                        "Entities become tables, attributes become columns, and relationships become keys or junction tables.",
                        "Good design reduces duplicate data while keeping reads and writes practical."
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
                            "term": "Entity",
                            "definition": "A real-world object or concept, such as User, Order, Product, or Payment."
                        },
                        {
                            "term": "Primary Key",
                            "definition": "A column that uniquely identifies each row in a table."
                        },
                        {
                            "term": "Foreign Key",
                            "definition": "A column that creates a relationship with another table's primary key."
                        },
                        {
                            "term": "Normalization",
                            "definition": "The process of organizing data to reduce duplication and update problems."
                        }
                    ]
                }
            ]
        },
        {
            "id": "diagram",
            "type": "diagram",
            "label": "Diagram",
            "heading": "Simple Order System",
            "blocks": [
                {
                    "type": "diagram",
                    "text": "User 1 ----- * Order\nOrder 1 ---- * OrderItem\nProduct 1 -- * OrderItem"
                }
            ]
        },
        {
            "id": "workflow",
            "type": "workflow",
            "label": "Workflow / Request Flow",
            "heading": "Design Workflow",
            "blocks": [
                {
                    "type": "list",
                    "ordered": true,
                    "items": [
                        "Collect requirements and business rules.",
                        "Identify entities and their attributes.",
                        "Define relationships and cardinality.",
                        "Choose primary keys and foreign keys.",
                        "Normalize tables, then denormalize only when performance needs it."
                    ]
                }
            ]
        },
        {
            "id": "code",
            "type": "code-snippet",
            "label": "Code Snippet",
            "heading": "Example Schema",
            "blocks": [
                {
                    "type": "code",
                    "filename": "schema.sql",
                    "text": "CREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(150) UNIQUE NOT NULL\n);\n\nCREATE TABLE orders (\n    id INT PRIMARY KEY,\n    user_id INT NOT NULL,\n    order_date DATE NOT NULL,\n    FOREIGN KEY (user_id) REFERENCES users(id)\n);"
                }
            ]
        },
        {
            "type": "explanation",
            "label": "Explanation",
            "heading": "Why This Design Works",
            "blocks": [
                {
                    "type": "paragraph",
                    "parts": [
                        "The ",
                        { "code": "users" },
                        " table stores customer details once. The ",
                        { "code": "orders" },
                        " table stores order-specific data and keeps a foreign key to the user who placed the order."
                    ]
                }
            ]
        },
        {
            "id": "comparison",
            "type": "comparison",
            "label": "Differentiate / Comparison",
            "heading": "Normalization vs Denormalization",
            "blocks": [
                {
                    "type": "table",
                    "headers": ["Point", "Normalization", "Denormalization"],
                    "rows": [
                        ["Goal", "Reduce duplicate data", "Improve read performance"],
                        ["Used When", "Data consistency is most important", "Reports or read-heavy pages are slow"],
                        ["Risk", "More joins", "Duplicate data can become inconsistent"]
                    ]
                }
            ]
        },
        {
            "id": "boxes",
            "type": "highlight-box",
            "label": "Highlight Box",
            "heading": "High-Value Design Notes",
            "blocks": [
                {
                    "type": "text-box",
                    "variant": "remember",
                    "title": "Remember",
                    "text": "Design tables around real business rules first. Performance tuning comes after the relationships are correct."
                },
                {
                    "type": "text-box",
                    "variant": "short-answer",
                    "title": "Short Answer",
                    "text": "A good schema stores each fact once, connects related facts clearly, and makes common queries predictable."
                }
            ]
        },
        {
            "type": "warning-box",
            "label": "Warning Box",
            "heading": "Design Warnings",
            "blocks": [
                {
                    "type": "text-box",
                    "variant": "warning",
                    "title": "Warning",
                    "text": "Do not skip foreign keys in relational databases unless you have a very clear reason and another way to protect data integrity."
                }
            ]
        },
        {
            "type": "tip-box",
            "label": "Tip Box",
            "heading": "Practical Tip",
            "blocks": [
                {
                    "type": "text-box",
                    "variant": "tip",
                    "title": "Tip",
                    "text": "Write the top five read queries before finalizing the schema. This makes indexes and relationship choices much easier."
                }
            ]
        },
        {
            "type": "info-card",
            "label": "Info Card",
            "heading": "Useful Context",
            "blocks": [
                {
                    "type": "info-card",
                    "title": "Normalization is not anti-performance",
                    "text": "Normalization protects correctness. If reads become slow, use indexes, query tuning, caching, or selective denormalization."
                }
            ]
        },
        {
            "id": "timeline",
            "type": "timeline",
            "label": "Timeline",
            "heading": "Database Design Timeline",
            "blocks": [
                {
                    "type": "timeline",
                    "items": [
                        {
                            "label": "01",
                            "title": "Requirement Analysis",
                            "text": "Understand users, actions, reports, and business rules."
                        },
                        {
                            "label": "02",
                            "title": "Conceptual Model",
                            "text": "Identify entities, attributes, and relationships."
                        },
                        {
                            "label": "03",
                            "title": "Logical Design",
                            "text": "Create tables, keys, constraints, and normalized relationships."
                        },
                        {
                            "label": "04",
                            "title": "Physical Design",
                            "text": "Add indexes, data types, storage decisions, and performance tuning."
                        }
                    ]
                }
            ]
        },
        {
            "id": "checklist",
            "type": "checklist",
            "label": "Checklist",
            "heading": "Schema Review Checklist",
            "blocks": [
                {
                    "type": "checklist",
                    "items": [
                        "Primary keys",
                        "Foreign keys",
                        "Unique constraints",
                        "Required indexes",
                        "Audit columns",
                        "Clear data types",
                        "No duplicate facts"
                    ]
                }
            ]
        },
        {
            "type": "table-section",
            "label": "Table Section",
            "heading": "Priority Table",
            "blocks": [
                {
                    "type": "table",
                    "headers": ["Priority", "Design Item", "Why It Matters"],
                    "rows": [
                        ["Critical", "Primary and foreign keys", "Protect identity and relationships"],
                        ["High Impact", "Indexes for common queries", "Improve read performance"],
                        ["High Impact", "Correct data types", "Avoid storage and validation problems"]
                    ]
                }
            ]
        },
        {
            "id": "accordion",
            "type": "accordion",
            "label": "Accordion",
            "heading": "Expandable Design Details",
            "blocks": [
                {
                    "type": "accordion",
                    "items": [
                        {
                            "title": "When should I create a junction table?",
                            "text": "Use a junction table when two entities have a many-to-many relationship, such as students and courses."
                        },
                        {
                            "title": "When should I add an index?",
                            "text": "Add indexes for columns used often in WHERE filters, JOIN conditions, ORDER BY clauses, and uniqueness checks."
                        },
                        {
                            "title": "When is denormalization acceptable?",
                            "text": "Denormalization is acceptable when it solves a proven read-performance issue and the duplicate data can be updated safely."
                        }
                    ]
                }
            ]
        },
        {
            "type": "quote",
            "label": "Quote",
            "heading": "Design Principle",
            "blocks": [
                {
                    "type": "quote",
                    "text": "Store facts once, relate them clearly, and optimize only after the access pattern is known.",
                    "source": "Database design rule of thumb"
                }
            ]
        },
        {
            "type": "step-by-step",
            "label": "Step-by-Step",
            "heading": "Build A Schema Step By Step",
            "blocks": [
                {
                    "type": "steps",
                    "items": [
                        {
                            "title": "Find nouns",
                            "text": "Turn important business nouns into candidate entities."
                        },
                        {
                            "title": "Find relationships",
                            "text": "Decide whether each relationship is one-to-one, one-to-many, or many-to-many."
                        },
                        {
                            "title": "Add constraints",
                            "text": "Use keys, uniqueness, required fields, and foreign keys to protect correctness."
                        },
                        {
                            "title": "Test queries",
                            "text": "Run common reads and writes, then add indexes where the query plan needs help."
                        }
                    ]
                }
            ]
        },
        {
            "type": "use-cases",
            "label": "Use Cases",
            "heading": "Where Database Design Matters",
            "blocks": [
                {
                    "type": "list",
                    "items": [
                        "E-commerce orders, carts, payments, and inventory.",
                        "Banking systems where transaction consistency is critical.",
                        "Analytics tables where fast reporting matters."
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
                        "Use meaningful constraints: NOT NULL, UNIQUE, and foreign keys.",
                        "Index columns used often in joins, filters, and sorting.",
                        "Keep audit columns like created_at and updated_at."
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
                        "Using one large table for unrelated data.",
                        "Missing foreign keys between related tables.",
                        "Adding indexes everywhere without checking query patterns."
                    ]
                }
            ]
        },
        {
            "type": "debugging-tips",
            "label": "Debugging Tips",
            "heading": "Troubleshooting Guidance",
            "blocks": [
                {
                    "type": "list",
                    "items": [
                        "Use EXPLAIN to understand query execution plans.",
                        "Check whether foreign key values actually exist in parent tables.",
                        "Look for duplicate rows when unique constraints are missing."
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
                            "question": "What is normalization?",
                            "answer": "Normalization is organizing tables to reduce duplicate data and avoid insert, update, and delete anomalies."
                        },
                        {
                            "question": "When should you denormalize?",
                            "answer": "Denormalize when repeated joins make important read queries too slow and the duplication can be managed safely."
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
                            "question": "Why do we need foreign keys?",
                            "answer": "Foreign keys protect relationships so child records cannot point to missing parent records."
                        },
                        {
                            "question": "Is every foreign key automatically indexed?",
                            "answer": "No. Some databases create indexes automatically in specific cases, but you should verify and add indexes based on query needs."
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
                        "Start with entities, relationships, and business rules.",
                        "Use keys and constraints to protect data correctness.",
                        "Normalize first, then optimize with indexes and selective denormalization."
                    ]
                }
            ]
        }
    ]
}
;
