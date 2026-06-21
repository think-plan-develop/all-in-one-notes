window.notePageData = {
    "title": "SQL vs NoSQL",
    "navLabel": "SQL vs NoSQL sections",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "SQL vs NoSQL",
        "text": "SQL databases use structured tables and relationships, while NoSQL databases use flexible models like documents, key-value pairs, graphs, or wide columns. Choosing correctly between the two directly impacts how your application scales, how consistent your data stays, and how fast your queries run."
    },
    "nav": [
        { "label": "Notes", "href": "#notes" },
        { "label": "Definitions", "href": "#terms" },
        { "label": "NoSQL Types", "href": "#nosql-types" },
        { "label": "CAP Theorem", "href": "#cap" },
        { "label": "Diagram", "href": "#diagram" },
        { "label": "Workflow", "href": "#workflow" },
        { "label": "Comparison", "href": "#comparison" },
        { "label": "Use Cases", "href": "#use-cases" },
        { "label": "Polyglot", "href": "#polyglot" },
        { "label": "Decision Checklist", "href": "#checklist" },
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
                            "definition": "A relational database that stores data in tables with rows, columns, schemas, primary keys, and foreign keys. Every row in a table must follow the same column structure."
                        },
                        {
                            "term": "NoSQL Database",
                            "definition": "A non-relational database designed for flexible schemas, high scale, and different data models. Different records in the same collection can have completely different fields."
                        },
                        {
                            "term": "Schema",
                            "definition": "The structure that defines tables, fields, data types, and relationships. SQL enforces it strictly; NoSQL leaves it mostly up to the application."
                        },
                        {
                            "term": "Horizontal Scaling",
                            "definition": "Adding more servers to distribute data and traffic across many machines. NoSQL databases are built for this from the ground up."
                        },
                        {
                            "term": "Vertical Scaling",
                            "definition": "Upgrading a single server with more CPU, RAM, or storage. SQL databases traditionally relied on this approach before distributed SQL emerged."
                        },
                        {
                            "term": "Index",
                            "definition": "A data structure that speeds up lookups on a column or field. Both SQL and NoSQL databases support indexes, and choosing the right ones is critical for performance."
                        },
                        {
                            "term": "Sharding",
                            "definition": "Splitting a large dataset across multiple servers based on a shard key. Common in NoSQL (MongoDB, Cassandra) and increasingly supported in distributed SQL systems."
                        },
                        {
                            "term": "Replication",
                            "definition": "Copying data to multiple servers so reads can be distributed and data survives a server failure. Both SQL and NoSQL support it with different consistency guarantees."
                        }
                    ]
                }
            ]
        },
        {
            "id": "nosql-types",
            "type": "notes",
            "label": "NoSQL Types",
            "heading": "The 4 Types of NoSQL Databases",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "NoSQL is not a single technology — it is a category of four distinct data models, each built to solve a different problem."
                },
                {
                    "type": "table",
                    "headers": ["Type", "How Data Is Stored", "Best For", "Examples"],
                    "rows": [
                        [
                            "Document",
                            "JSON-like documents with nested fields and arrays",
                            "User profiles, product catalogs, CMS content, mobile apps",
                            "MongoDB, Firestore, CouchDB"
                        ],
                        [
                            "Key-Value",
                            "A simple key mapped to a value (string, number, or binary blob)",
                            "Sessions, caching, leaderboards, shopping carts",
                            "Redis, DynamoDB, Memcached"
                        ],
                        [
                            "Wide-Column",
                            "Rows with dynamic columns, optimised for huge datasets written and read by row key",
                            "IoT time-series, event logs, analytics at massive scale",
                            "Cassandra, HBase, ScyllaDB"
                        ],
                        [
                            "Graph",
                            "Nodes (entities) and edges (relationships) with properties on both",
                            "Social networks, fraud detection, recommendation engines, knowledge graphs",
                            "Neo4j, Amazon Neptune, ArangoDB"
                        ]
                    ]
                },
                {
                    "type": "note",
                    "text": "Most developers who say 'NoSQL' are thinking of document databases like MongoDB. Always check which NoSQL type actually fits your problem before choosing a database."
                }
            ]
        },
        {
            "id": "cap",
            "type": "notes",
            "label": "CAP Theorem",
            "heading": "CAP Theorem — Why NoSQL Makes Tradeoffs",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "The CAP Theorem states that any distributed database can only guarantee two of the following three properties at the same time — never all three simultaneously."
                },
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "C — Consistency",
                            "definition": "Every read returns the most recent write or an error. All nodes in the cluster see the same data at the same time."
                        },
                        {
                            "term": "A — Availability",
                            "definition": "Every request gets a response, even if some nodes are down. The response may not reflect the very latest write."
                        },
                        {
                            "term": "P — Partition Tolerance",
                            "definition": "The system continues to operate even if messages between nodes are lost or delayed. In any real network, partition tolerance is mandatory."
                        }
                    ]
                },
                {
                    "type": "remember",
                    "text": "Because network partitions always happen in practice, every distributed database must be Partition Tolerant. This means the real choice is between Consistency and Availability — either CP (SQL, HBase) or AP (Cassandra, DynamoDB, CouchDB)."
                },
                {
                    "type": "table",
                    "headers": ["Guarantee", "What It Means In Practice", "Typical Databases"],
                    "rows": [
                        ["CP — Consistent + Partition Tolerant", "Always returns accurate data; may refuse requests during a partition", "PostgreSQL, MySQL, HBase, MongoDB (with write concern)"],
                        ["AP — Available + Partition Tolerant", "Always responds, but data may be slightly stale during a partition", "Cassandra, DynamoDB, CouchDB, Redis"],
                        ["CA — Consistent + Available", "Only possible on a single node with no network partition risk — not practical for distributed systems", "Single-node SQL (no clustering)"]
                    ]
                },
                {
                    "type": "tip",
                    "text": "CAP is a simplification. Modern systems like Google Spanner and CockroachDB blur the lines using techniques like TrueTime and consensus protocols. In interviews, know the tradeoff — not just the label."
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
                    "text": "── SQL (Relational) ──────────────────────────────────────────\n\n  Users Table          Orders Table         OrderItems Table\n  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐\n  │ id  │ name   │──┐  │ id │ user_id │──┐  │ id │ order_id │\n  │ 1   │ Aman   │  └─▶│ 1  │   1     │  └─▶│ 1  │    1     │\n  │ 2   │ Priya  │     │ 2  │   1     │     │ 2  │    2     │\n  └──────────────┘     └──────────────┘     └──────────────┘\n           Relationships enforced by foreign keys + JOINs\n\n── NoSQL (Document) ──────────────────────────────────────────\n\n  Single User Document\n  {\n    \"_id\": \"u1\",\n    \"name\": \"Aman\",\n    \"email\": \"aman@example.com\",\n    \"orders\": [\n      { \"id\": \"o1\", \"total\": 1200,\n        \"items\": [ { \"product\": \"Keyboard\", \"qty\": 1 } ] }\n    ]\n  }\n           All related data embedded — no JOIN needed\n\n── NoSQL (Key-Value) ─────────────────────────────────────────\n\n  session:u1  →  { \"token\": \"abc123\", \"expires\": 1720000000 }\n  session:u2  →  { \"token\": \"xyz789\", \"expires\": 1720000060 }\n\n── NoSQL (Graph) ─────────────────────────────────────────────\n\n  (Aman) ──[FOLLOWS]──▶ (Priya)\n  (Aman) ──[LIKES]────▶ (Post#42)\n  (Priya) ─[AUTHORED]─▶ (Post#42)"
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
                        "Estimate the expected data volume and traffic scale.",
                        "Choose SQL for relational consistency or NoSQL for flexible, scalable access patterns.",
                        "Consider polyglot persistence if the application has both relational and high-volume flexible data needs."
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
                    "text": "-- SQL: data split across normalised tables\nCREATE TABLE users (\n    id    INT PRIMARY KEY,\n    name  VARCHAR(100),\n    email VARCHAR(150) UNIQUE\n);\n\nCREATE TABLE orders (\n    id      INT PRIMARY KEY,\n    user_id INT REFERENCES users(id),\n    total   DECIMAL(10,2)\n);\n\n-- Query requires a JOIN\nSELECT u.name, o.total\nFROM users u\nJOIN orders o ON o.user_id = u.id\nWHERE u.id = 1;\n\n\n-- NoSQL (MongoDB): all data in one document, no JOIN needed\n{\n    \"_id\": \"u101\",\n    \"name\": \"Aman\",\n    \"email\": \"aman@example.com\",\n    \"orders\": [\n        { \"id\": \"o501\", \"total\": 1200, \"item\": \"Keyboard\" },\n        { \"id\": \"o502\", \"total\": 350,  \"item\": \"Mouse\"    }\n    ]\n}\n\n// Query returns everything in one round-trip\ndb.users.findOne({ _id: \"u101\" });"
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
                        ". In NoSQL, related data may be embedded together in one document to make reads faster and eliminate the need for multiple round-trips to the database."
                    ]
                },
                {
                    "type": "paragraph",
                    "text": "This is the fundamental design tradeoff: SQL normalises data to eliminate duplication and enforce integrity, while NoSQL denormalises data to make the most common queries as fast and simple as possible."
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
                        ["Schema", "Fixed, enforced by the database", "Flexible, enforced by the application"],
                        ["Relationships", "Strong support with joins and foreign keys", "Usually handled by embedding or application-level references"],
                        ["Scaling", "Often vertical first; horizontal with planning", "Built for horizontal scaling from the start"],
                        ["Transactions", "Strong ACID support across multiple tables", "Varies — document-level or limited multi-document support"],
                        ["Query Language", "Standardised SQL across most databases", "Database-specific APIs or query languages"],
                        ["Consistency", "Strong consistency by default", "Eventual consistency common; tunable in some systems"],
                        ["Best For", "Banking, ERP, inventory, reporting", "Catalogs, feeds, sessions, IoT, real-time events"],
                        ["Examples", "MySQL, PostgreSQL, SQL Server, Oracle", "MongoDB, Redis, Cassandra, DynamoDB, Neo4j"]
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
                        "Use SQL for banking, ERP, inventory, reporting, and systems with strong relationships and strict consistency.",
                        "Use Document NoSQL for product catalogs, user profiles, CMS platforms, and mobile app backends where data shape varies.",
                        "Use Key-Value NoSQL for sessions, caching, leaderboards, rate limiting, and shopping cart data.",
                        "Use Wide-Column NoSQL for IoT sensor streams, event logs, analytics pipelines, and time-series data at massive scale.",
                        "Use Graph NoSQL for social networks, fraud detection, recommendation engines, and knowledge graphs where relationships are the primary query.",
                        "Use both SQL and NoSQL together when one application has transactional data and high-volume flexible event data."
                    ]
                }
            ]
        },
        {
            "id": "polyglot",
            "type": "best-practices",
            "label": "Polyglot Persistence",
            "heading": "Polyglot Persistence — Using Both Together",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "Polyglot persistence means using different databases for different parts of the same application, each chosen for the specific data it holds and the queries it needs to serve."
                },
                {
                    "type": "tip",
                    "text": "Real production systems almost never use just one database. The skill is knowing which database to use for which job — not picking one winner."
                },
                {
                    "type": "paragraph",
                    "text": "Example — a mid-scale e-commerce platform:"
                },
                {
                    "type": "table",
                    "headers": ["Part of the App", "Database Used", "Why"],
                    "rows": [
                        ["User accounts, orders, payments", "PostgreSQL (SQL)", "Strong consistency and transactions are mandatory — a payment must never be lost or duplicated"],
                        ["Product catalog", "MongoDB (Document)", "Products have wildly different attributes — a laptop has CPU and RAM fields, a T-shirt has size and colour"],
                        ["Sessions and auth tokens", "Redis (Key-Value)", "Sub-millisecond reads, automatic expiry with TTL, no complex queries needed"],
                        ["Search (product names, descriptions)", "Elasticsearch", "Full-text search with ranking, filters, and autocomplete is a specialised problem"],
                        ["User activity feed and events", "Cassandra (Wide-Column)", "Append-only writes at very high volume, queried by user ID and time range"]
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
                        "Choose based on access patterns and query shape, not on popularity or what your team already knows.",
                        "Use SQL constraints and foreign keys when data correctness is non-negotiable.",
                        "In NoSQL, design documents and row keys around the queries your application actually runs — not around the data shape.",
                        "Avoid embedding too much into a single NoSQL document; large documents that update frequently create write amplification.",
                        "Always add indexes on fields used in filters and sorts, in both SQL and NoSQL.",
                        "Use a connection pool in production — opening a new database connection per request is a common performance killer."
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
                        "Choosing NoSQL only because it sounds newer or more scalable without checking whether the problem actually needs it.",
                        "Using SQL without indexes for frequent filters and joins — this causes full table scans at scale.",
                        "Embedding too much data in a NoSQL document until the document grows so large that partial updates become expensive.",
                        "Ignoring consistency requirements before choosing a database — financial data should almost never be eventually consistent.",
                        "Treating all four NoSQL types as interchangeable — a graph database is completely different from a key-value store.",
                        "Not thinking about how data will be queried — designing a schema around how data looks instead of how it will be read leads to slow queries."
                    ]
                }
            ]
        },
        {
            "id": "checklist",
            "type": "checklist",
            "label": "Decision Checklist",
            "heading": "Should I Use SQL or NoSQL? — Quick Checklist",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "Use this checklist to quickly narrow down your choice before designing the database layer."
                },
                {
                    "type": "table",
                    "headers": ["Question", "If YES → lean toward", "If NO → lean toward"],
                    "rows": [
                        ["Is the data highly relational with many joins?", "SQL", "NoSQL"],
                        ["Is the schema fixed and unlikely to change often?", "SQL", "NoSQL"],
                        ["Do you need strong ACID transactions across multiple records?", "SQL", "NoSQL (or a distributed SQL)"],
                        ["Is data volume expected to reach billions of rows or petabytes?", "NoSQL", "SQL"],
                        ["Are most queries a simple lookup by a single key or ID?", "NoSQL (Key-Value)", "SQL or Document NoSQL"],
                        ["Are relationships between entities more important than the entities themselves?", "NoSQL (Graph)", "SQL or Document NoSQL"],
                        ["Is the data shape different for every record?", "NoSQL (Document)", "SQL"],
                        ["Do you need full-text search as the primary query?", "Elasticsearch / Solr", "SQL or Document NoSQL"]
                    ]
                },
                {
                    "type": "remember",
                    "text": "No checklist replaces understanding your access patterns. Run a spike — prototype with real query shapes and measure before committing to a database in production."
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
                            "answer": "SQL is relational and table-based with fixed schemas and strong ACID guarantees. NoSQL is non-relational and supports flexible data models — documents, key-value, wide-column, or graph — often trading strict consistency for scale and speed."
                        },
                        {
                            "question": "Which is better: SQL or NoSQL?",
                            "answer": "Neither is always better. SQL is usually better for structured relational data and transactions. NoSQL is often better for flexible schemas, horizontal scale, and fast access to specific data models. Many real systems use both."
                        },
                        {
                            "question": "What is the CAP Theorem and why does it matter?",
                            "answer": "CAP states a distributed database can only guarantee two of: Consistency, Availability, and Partition Tolerance. Since partitions always happen, the real choice is CP (always accurate, may be unavailable) or AP (always responds, data may be slightly stale). This is why NoSQL databases make different tradeoffs than SQL."
                        },
                        {
                            "question": "What is polyglot persistence?",
                            "answer": "Using multiple different databases within one application, each chosen for a specific job. For example, PostgreSQL for transactions, Redis for sessions, and MongoDB for a product catalog — each optimised for its access pattern."
                        },
                        {
                            "question": "When would you choose a graph database over a document database?",
                            "answer": "When the relationships between entities are the primary subject of queries — for example, finding mutual friends, detecting fraud rings, or building a recommendation engine. Document databases model the entities well; graph databases model the connections well."
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
                            "answer": "Yes, but it usually needs more planning through replication, sharding, partitioning, or distributed SQL systems like CockroachDB or PlanetScale. It is more effort than most NoSQL systems where horizontal scaling is built in."
                        },
                        {
                            "question": "Is MongoDB always schema-less?",
                            "answer": "MongoDB has a flexible schema by default, but production applications still need consistent document structure. MongoDB supports JSON Schema validation to enforce field types and required fields at the database level."
                        },
                        {
                            "question": "Can NoSQL databases do transactions?",
                            "answer": "Yes, but with limits. MongoDB supports multi-document ACID transactions since version 4.0. DynamoDB supports transactions across up to 100 items. Cassandra has lightweight transactions with some performance cost. They are generally less capable than SQL transactions across many tables."
                        },
                        {
                            "question": "Is Redis a permanent database or just a cache?",
                            "answer": "Redis can be both. It supports AOF (append-only file) and RDB (snapshot) persistence modes, making it viable as a primary database for the right use case. However, it is most commonly used as a cache or session store in front of a primary SQL or NoSQL database."
                        },
                        {
                            "question": "What does eventual consistency mean in practice?",
                            "answer": "It means that after a write, different nodes in the cluster may return different values for a short window of time before they synchronise. For a social media like count this is fine. For a bank balance this is not acceptable. Always match consistency level to the business requirement."
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
                        "SQL is strong for structured, relational data, complex queries, and ACID transactions.",
                        "NoSQL comes in four types: Document, Key-Value, Wide-Column, and Graph — each built for a different problem.",
                        "The CAP Theorem means every distributed database trades either consistency or availability during a network partition.",
                        "Polyglot persistence — using multiple databases in one application — is standard in real production systems.",
                        "Always choose based on access patterns, consistency needs, data shape, and scale — not on what is trending."
                    ]
                }
            ]
        }
    ]
};