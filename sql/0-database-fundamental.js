window.notePageData = 
{
  "title": "System Catalog (Data Dictionary)",
  "navLabel": "Topic sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "System Catalog (Data Dictionary)",
    "text": "PostgreSQL's internal metadata store — a set of tables in pg_catalog that describe every database object: tables, columns, indexes, constraints, schemas, users, and functions."
  },
  "nav": [
    { "label": "Definitions", "href": "#terms" },
    { "label": "Diagram", "href": "#diagram" },
    { "label": "Code", "href": "#code" },
    { "label": "Comparison", "href": "#comparison" },
    { "label": "Boxes", "href": "#boxes" },
    { "label": "Table", "href": "#table-section" },
    { "label": "Accordion", "href": "#accordion" },
    { "label": "Interview", "href": "#interview" },
    { "label": "Q&A", "href": "#qa" }
  ],
  "sections": [
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
      "id": "terms",
      "type": "terminology",
      "label": "Terminology / Key Definitions",
      "heading": "Key Definitions",
      "blocks": [
        {
          "type": "definitions",
          "items": [
            {
              "term": "pg_class",
              "definition": "Stores metadata for every relation: tables, views, indexes, sequences. One row per relation.",
              "code": "SELECT relname, relkind FROM pg_class WHERE relkind = 'r';"
            },
            {
              "term": "pg_attribute",
              "definition": "One row per column for every table. Always filter attnum > 0 AND NOT attisdropped to get real user-defined columns only.",
              "code": "SELECT attname FROM pg_attribute WHERE attrelid = 'users'::regclass AND attnum > 0 AND NOT attisdropped;"
            },
            {
              "term": "pg_index",
              "definition": "Describes indexes: which table, which columns, uniqueness, whether it is a primary key.",
              "code": "SELECT indexrelid::regclass AS index_name FROM pg_index WHERE indrelid = 'orders'::regclass;"
            },
            {
              "term": "pg_constraint",
              "definition": "Records all constraints. contype: 'p' = PK, 'f' = FK, 'u' = unique, 'c' = check.",
              "code": "SELECT conname, contype FROM pg_constraint WHERE conrelid = 'orders'::regclass;"
            },
            {
              "term": "pg_namespace",
              "definition": "Holds schemas. Every object belongs to a namespace identified by its OID.",
              "code": "SELECT nspname FROM pg_namespace WHERE nspname NOT LIKE 'pg_%';"
            },
            {
              "term": "pg_roles",
              "definition": "Public view over pg_authid (hides password hashes). Lists all roles and their attributes.",
              "code": "SELECT rolname, rolsuper, rolcanlogin FROM pg_roles;"
            },
            {
              "term": "pg_proc",
              "definition": "Stores all functions and procedures: name, argument types, return type, language, source code.",
              "code": "SELECT proname, prosrc FROM pg_proc WHERE proname = 'my_function';"
            },
            {
              "term": "OID (Object Identifier)",
              "definition": "Internal unsigned integer assigned to every catalog object. Stable across renames. Used as FK across catalog tables. Use ::regclass to resolve name to OID cleanly.",
              "code": "SELECT oid, relname FROM pg_class WHERE relname = 'orders';"
            }
          ]
        }
      ]
    },
    {
      "id": "diagram",
      "type": "diagram",
      "label": "Diagram",
      "heading": "Catalog Relationship Map",
      "blocks": [
        {
          "type": "diagram",
          "text": "pg_namespace (schemas)\n       │ oid → pg_class.relnamespace\n       ▼\npg_class (tables / views / indexes / sequences)\n       │                        │\n       │ oid → pg_attribute     │ oid → pg_index.indrelid\n       │       .attrelid        │\n       ▼                        ▼\npg_attribute              pg_index\n(columns)                 (index metadata)\n       │\n       │ atttypid → pg_type.oid\n       ▼\npg_type (data types)\n\npg_class.oid ──────────► pg_constraint.conrelid\n                          (PK / FK / CHECK / UNIQUE)\n\npg_proc ◄── pg_namespace.oid\npg_roles ───────────────► pg_class.relowner"
        }
      ]
    },
    {
      "id": "code",
      "type": "code-snippet",
      "label": "Code Snippet",
      "heading": "Catalog Query Cookbook",
      "blocks": [
        {
          "type": "code",
          "filename": "system_catalog.sql",
          "text": "-- ── Get all user tables ───────────────────────────────────────────────\nSELECT schemaname, tablename\nFROM   pg_tables\nWHERE  schemaname NOT IN ('pg_catalog', 'information_schema');\n\n\n-- ── Get all columns of a table ────────────────────────────────────────\nSELECT attname AS column_name\nFROM   pg_attribute\nWHERE  attrelid = 'orders'::regclass\n  AND  attnum > 0\n  AND  NOT attisdropped\nORDER  BY attnum;\n\n\n-- ── Get all columns of a table with datatype ──────────────────────────\nSELECT\n  attname                                    AS column_name,\n  format_type(atttypid, atttypmod)           AS data_type,\n  attnotnull                                 AS not_null\nFROM   pg_attribute\nWHERE  attrelid = 'orders'::regclass\n  AND  attnum > 0\n  AND  NOT attisdropped\nORDER  BY attnum;\n\n\n-- ── Get all indexes of a table ────────────────────────────────────────\nSELECT\n  i.relname        AS index_name,\n  ix.indisunique   AS is_unique,\n  ix.indisprimary  AS is_primary\nFROM   pg_index ix\nJOIN   pg_class i ON i.oid = ix.indexrelid\nWHERE  ix.indrelid = 'orders'::regclass;\n\n\n-- ── Get all foreign keys of a table ──────────────────────────────────\nSELECT\n  conname               AS fk_name,\n  confrelid::regclass   AS references_table\nFROM   pg_constraint\nWHERE  conrelid = 'orders'::regclass\n  AND  contype = 'f';\n\n\n-- ── Get all constraints of a table ───────────────────────────────────\nSELECT\n  conname  AS constraint_name,\n  contype  AS type,       -- p=PK  f=FK  u=UNIQUE  c=CHECK\n  pg_get_constraintdef(oid) AS definition\nFROM   pg_constraint\nWHERE  conrelid = 'orders'::regclass;\n\n\n-- ── Get all tables that reference a given table (reverse FK lookup) ───\nSELECT\n  conname               AS fk_name,\n  conrelid::regclass    AS from_table\nFROM   pg_constraint\nWHERE  confrelid = 'users'::regclass\n  AND  contype = 'f';\n\n\n-- ── Get all functions in public schema ───────────────────────────────\nSELECT\n  proname                                  AS function_name,\n  pg_get_function_arguments(oid)           AS arguments,\n  pg_get_function_result(oid)              AS return_type\nFROM   pg_proc\nWHERE  pronamespace = 'public'::regnamespace;\n\n\n-- ── Get all schemas ───────────────────────────────────────────────────\nSELECT nspname AS schema_name\nFROM   pg_namespace\nWHERE  nspname NOT LIKE 'pg_%'\n  AND  nspname != 'information_schema';\n\n\n-- ── Get all roles/users ───────────────────────────────────────────────\nSELECT rolname, rolsuper, rolcanlogin, rolcreatedb\nFROM   pg_roles\nORDER  BY rolname;"
        }
      ]
    },
    {
      "id": "comparison",
      "type": "comparison",
      "label": "Differentiate / Comparison",
      "heading": "pg_catalog vs information_schema",
      "blocks": [
        {
          "type": "table",
          "headers": ["Point", "pg_catalog", "information_schema"],
          "rows": [
            ["Standard", "PostgreSQL-specific", "SQL standard (ISO/IEC)"],
            ["Detail", "Full internals exposed", "Limited SQL-standard subset"],
            ["Portability", "PostgreSQL only", "Works across MySQL, SQL Server etc."],
            ["Performance", "Faster — direct table access", "Slower — views with joins"],
            ["Best for", "DBA tooling, ORMs, introspection", "Portable schema inspection code"]
          ]
        }
      ]
    },
    {
      "id": "boxes",
      "type": "highlight-box",
      "label": "Highlight Box",
      "heading": "Key Points",
      "blocks": [
        {
          "type": "text-box",
          "variant": "short-answer",
          "title": "One-Line Interview Definition",
          "text": "System Catalog is a collection of PostgreSQL-maintained metadata tables that store information about database objects such as tables, columns, indexes, constraints, schemas, users, and functions."
        },
        {
          "type": "text-box",
          "variant": "warning",
          "title": "Warning",
          "text": "Never run UPDATE, INSERT, or DELETE on catalog tables directly — this will corrupt the database. Always use DDL statements (CREATE, ALTER, DROP)."
        },
        {
          "type": "text-box",
          "variant": "tip",
          "title": "Tip",
          "text": "Use ::regclass cast to resolve table names to OIDs cleanly: 'orders'::regclass instead of manually looking up OIDs from pg_class."
        },
        {
          "type": "text-box",
          "variant": "note",
          "title": "Note",
          "text": "Always filter pg_attribute with attnum > 0 AND NOT attisdropped — otherwise you get system columns (ctid, xmin) and ghost entries from dropped columns."
        },
        {
          "type": "text-box",
          "variant": "interview",
          "title": "Interview",
          "text": "How would you find all indexes on a table programmatically? — Query pg_index joined with pg_class on indrelid = pg_class.oid."
        }
      ]
    },
    {
      "id": "table-section",
      "type": "table-section",
      "label": "Table Section",
      "heading": "Core Catalog Tables at a Glance",
      "blocks": [
        {
          "type": "table",
          "headers": ["Catalog Table", "What It Stores", "Key Columns"],
          "rows": [
            ["pg_class", "Tables, views, indexes, sequences", "relname, relkind, oid"],
            ["pg_attribute", "Columns of every relation", "attname, atttypid, attnum, attisdropped"],
            ["pg_index", "Index metadata", "indrelid, indisunique, indisprimary"],
            ["pg_constraint", "PK, FK, CHECK, UNIQUE constraints", "conname, contype, confrelid"],
            ["pg_namespace", "Schemas", "nspname, nspowner"],
            ["pg_proc", "Functions and procedures", "proname, prosrc, prolang"],
            ["pg_type", "Data types (built-in + custom)", "typname, typtype"],
            ["pg_roles", "Database roles", "rolname, rolsuper, rolcanlogin"]
          ]
        }
      ]
    },
    {
      "id": "accordion",
      "type": "accordion",
      "label": "Accordion",
      "heading": "Common Catalog Questions",
      "blocks": [
        {
          "type": "accordion",
          "items": [
            {
              "title": "Why do I see extra rows in pg_attribute?",
              "text": "PostgreSQL keeps rows for dropped columns (attisdropped = true) and system columns (attnum < 0 or = 0). Always filter: attnum > 0 AND NOT attisdropped."
            },
            {
              "title": "What is the difference between pg_tables and pg_class?",
              "text": "pg_class is the raw catalog covering all relation types (tables, views, indexes, sequences). pg_tables is a convenience view that filters to ordinary tables only (relkind = 'r') and joins in schema and owner names for readability."
            },
            {
              "title": "What does ::regclass do?",
              "text": "It casts a table name string to its OID and back, making catalog queries readable without manual OID lookups. 'orders'::regclass resolves to the OID of the orders table in the current search path."
            },
            {
              "title": "Can I use information_schema instead of pg_catalog?",
              "text": "Yes for simple queries, but information_schema is slower (it uses views with filters) and exposes less detail. Use pg_catalog for PostgreSQL-specific tooling; use information_schema for portable cross-database code."
            }
          ]
        }
      ]
    },
    {
      "id": "interview",
      "type": "interview-questions",
      "label": "Interview Questions",
      "heading": "Interview Questions",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "What is the PostgreSQL system catalog?",
              "answer": "A set of tables and views in pg_catalog schema that store metadata about every database object. PostgreSQL maintains them automatically whenever DDL is executed."
            },
            {
              "question": "What is an OID and why does PostgreSQL use it?",
              "answer": "An Object Identifier — an internal unsigned integer assigned to every catalog object. OIDs are stable across renames and used as foreign keys to cross-reference rows across catalog tables."
            },
            {
              "question": "What happens to the system catalog when you run CREATE TABLE?",
              "answer": "PostgreSQL inserts a row into pg_class, one row per column into pg_attribute, rows into pg_constraint for constraints, and rows into pg_index for the PK index — all in the same transaction."
            },
            {
              "question": "What is the difference between pg_catalog and information_schema?",
              "answer": "pg_catalog is PostgreSQL-specific, exposes full internals, and is faster. information_schema is SQL-standard, portable across engines, but slower and less detailed."
            }
          ]
        }
      ]
    },
    {
  "id": "qa",
  "type": "terminology",
  "label": "Catalog Query Q&A",
  "heading": "Catalog Query Q&A",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "Get all tables in the database",
          "definition": "Query pg_tables and exclude system schemas.",
          "code": "SELECT schemaname, tablename FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema');"
        },
        {
          "term": "Get all columns of a table",
          "definition": "Query pg_attribute filtered to user-defined columns only.",
          "code": "SELECT attname AS column_name FROM pg_attribute WHERE attrelid = 'orders'::regclass AND attnum > 0 AND NOT attisdropped ORDER BY attnum;"
        },
        {
          "term": "Get all columns of a table with datatype",
          "definition": "Same as above but use format_type() to resolve the type OID to a human-readable name.",
          "code": "SELECT attname AS column_name, format_type(atttypid, atttypmod) AS data_type FROM pg_attribute WHERE attrelid = 'orders'::regclass AND attnum > 0 AND NOT attisdropped ORDER BY attnum;"
        },
        {
          "term": "Get all indexes on a table",
          "definition": "Join pg_index with pg_class on indexrelid to get index names and properties.",
          "code": "SELECT i.relname AS index_name, ix.indisunique, ix.indisprimary FROM pg_index ix JOIN pg_class i ON i.oid = ix.indexrelid WHERE ix.indrelid = 'orders'::regclass;"
        },
        {
          "term": "Get all foreign keys of a table",
          "definition": "Query pg_constraint with contype = 'f' to get FK constraints and the table they reference.",
          "code": "SELECT conname AS fk_name, confrelid::regclass AS references_table FROM pg_constraint WHERE conrelid = 'orders'::regclass AND contype = 'f';"
        },
        {
          "term": "Get all tables that reference a given table",
          "definition": "Reverse FK lookup — query pg_constraint on confrelid (the referenced table's OID).",
          "code": "SELECT conname, conrelid::regclass AS from_table FROM pg_constraint WHERE confrelid = 'users'::regclass AND contype = 'f';"
        },
        {
          "term": "Get all constraints of a table",
          "definition": "Query pg_constraint and use pg_get_constraintdef() to get a readable definition for each constraint.",
          "code": "SELECT conname, contype, pg_get_constraintdef(oid) AS definition FROM pg_constraint WHERE conrelid = 'orders'::regclass;"
        },
        {
          "term": "Get all functions in a schema",
          "definition": "Query pg_proc filtered by pronamespace using ::regnamespace cast.",
          "code": "SELECT proname, pg_get_function_arguments(oid) AS args FROM pg_proc WHERE pronamespace = 'public'::regnamespace;"
        },
        {
          "term": "Get all schemas in the database",
          "definition": "Query pg_namespace and exclude built-in PostgreSQL schemas.",
          "code": "SELECT nspname FROM pg_namespace WHERE nspname NOT LIKE 'pg_%' AND nspname != 'information_schema';"
        },
        {
          "term": "Get all roles and users",
          "definition": "Query pg_roles (a safe view over pg_authid that hides password hashes).",
          "code": "SELECT rolname, rolsuper, rolcanlogin, rolcreatedb FROM pg_roles ORDER BY rolname;"
        }
      ]
    }
  ]
}
  ]
}