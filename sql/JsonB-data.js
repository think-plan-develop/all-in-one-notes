
window.notePageData =
{
  "title": "PostgreSQL Specific Data Types & JSONB Queries",
  "navLabel": "PostgreSQL sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "PostgreSQL Specific Data Types & JSONB Queries",
    "text": "PostgreSQL offers powerful native data types like UUID, ENUM, ARRAY, JSON, JSONB, and Generated Columns, along with rich JSONB query operators for flexible semi-structured data storage and retrieval."
  },
  "nav": [
    { "label": "Notes", "href": "#notes" },
    { "label": "Definitions", "href": "#terms" },
    { "label": "Diagram", "href": "#diagram" },
    { "label": "Code", "href": "#code" },
    { "label": "JSONB: Create & Insert", "href": "#jsonb-create" },
    { "label": "JSONB: Operators", "href": "#jsonb-operators" },
    { "label": "JSONB: Filtering", "href": "#jsonb-filter" },
    { "label": "JSONB: Updating", "href": "#jsonb-update" },
    { "label": "JSONB: Arrays", "href": "#jsonb-arrays" },
    { "label": "JSONB: Containment", "href": "#jsonb-containment" },
    { "label": "JSONB: Functions", "href": "#jsonb-functions" },
    { "label": "Comparison", "href": "#comparison" },
    { "label": "Boxes", "href": "#boxes" },
    { "label": "Table", "href": "#table-section" },
    { "label": "Accordion", "href": "#accordion" },
    { "label": "Use Cases", "href": "#use-cases" },
    { "label": "Best Practices", "href": "#best-practices" },
    { "label": "Mistakes", "href": "#common-mistakes" },
    { "label": "Interview", "href": "#interview" },
    { "label": "Summary", "href": "#summary" }
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
            "PostgreSQL has native types not found in standard SQL: UUID, ENUM, ARRAY, JSON, JSONB, and Generated Columns.",
            "JSONB stores JSON in a binary decomposed format — faster to query than JSON but slightly slower to write.",
            "JSONB supports GIN indexing, making it highly efficient for searching inside JSON documents.",
            "ARRAY allows a column to hold multiple values of the same type without needing a separate table.",
            "ENUM enforces a fixed set of allowed string values at the database level.",
            "Generated Columns are computed from other columns automatically — STORED means the value is persisted on disk.",
            "UUID is ideal for distributed systems where globally unique IDs are needed without a central sequence."
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
              "term": "UUID",
              "definition": "Universally Unique Identifier — a 128-bit globally unique value used as a primary key, especially in distributed systems where auto-increment IDs would collide across databases.",
              "code": "CREATE TABLE users (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  name TEXT NOT NULL\n);"
            },
            {
              "term": "ENUM",
              "definition": "A custom data type with a fixed ordered list of allowed string values. Values are enforced at the DB level. Adding new values is possible but removing or reordering is not without a full type recreation.",
              "code": "CREATE TYPE order_status AS ENUM ('pending', 'shipped', 'delivered', 'cancelled');\n\nCREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  status order_status DEFAULT 'pending'\n);\n\n-- Add a new value later\nALTER TYPE order_status ADD VALUE 'returned';"
            },
            {
              "term": "ARRAY",
              "definition": "A column that stores multiple values of the same type as an ordered list. Supports operators like ANY(), ALL(), @>, and unnesting. Ideal for flat scalar collections like tags or labels.",
              "code": "CREATE TABLE products (\n  id SERIAL PRIMARY KEY,\n  name TEXT,\n  tags TEXT[]\n);\n\nINSERT INTO products (name, tags)\nVALUES ('Laptop', ARRAY['electronics', 'computers']);\n\n-- Check membership\nSELECT * FROM products WHERE 'electronics' = ANY(tags);\n\n-- Containment: has all these tags?\nSELECT * FROM products WHERE tags @> ARRAY['electronics'];"
            },
            {
              "term": "JSON",
              "definition": "Stores JSON as plain text. Preserves original whitespace, key order, and duplicate keys. Slower to query because PostgreSQL must re-parse the text on every access. Preferred only when you need exact raw input preservation.",
              "code": "CREATE TABLE audit_logs (\n  id SERIAL PRIMARY KEY,\n  raw_payload JSON\n);\n\nINSERT INTO audit_logs (raw_payload)\nVALUES ('{\"event\": \"login\", \"user\": \"alice\"}');\n\n-- Basic text extraction (limited operators)\nSELECT raw_payload->>'event' FROM audit_logs;"
            },
            {
              "term": "JSONB",
              "definition": "Stores JSON in a binary decomposed format. Removes whitespace, deduplicates keys (last value wins), and reorders keys internally. Faster to query, supports GIN indexing, and provides the full set of JSONB operators. Preferred over JSON in almost all cases.",
              "code": "CREATE TABLE profiles (\n  id SERIAL PRIMARY KEY,\n  data JSONB\n);\n\nINSERT INTO profiles (data) VALUES\n('{\"name\": \"Alice\", \"age\": 30, \"address\": {\"city\": \"Mumbai\"}, \"tags\": [\"admin\", \"user\"]}');\n\n-- GIN index for fast searches\nCREATE INDEX idx_profiles_data ON profiles USING GIN (data);"
            },
            {
              "term": "Generated Column",
              "definition": "A column whose value is automatically computed from an expression involving other columns in the same row. The STORED keyword means the computed value is physically saved on disk and updated whenever source columns change. The user cannot manually insert or update a generated column.",
              "code": "CREATE TABLE employees (\n  id SERIAL PRIMARY KEY,\n  first_name TEXT,\n  last_name TEXT,\n  -- Auto-computed, stored on disk\n  full_name TEXT GENERATED ALWAYS AS\n    (first_name || ' ' || last_name) STORED,\n  salary NUMERIC,\n  bonus NUMERIC,\n  -- Computed numeric expression\n  total_comp NUMERIC GENERATED ALWAYS AS\n    (salary + bonus) STORED\n);\n\n-- Cannot do this — will throw an error:\n-- UPDATE employees SET full_name = 'Override';"
            },
            {
              "term": "-> operator",
              "definition": "Extracts a JSON/JSONB object field by key, or an array element by index. Returns JSONB. Used when you need to navigate deeper or pass the result to another operator.",
              "code": "SELECT data -> 'address' FROM profiles;\n-- Returns JSONB: {\"city\": \"Mumbai\"}\n\nSELECT data -> 'tags' -> 0 FROM profiles;\n-- Returns JSONB: \"admin\"\n\n-- Chain to go deeper\nSELECT data -> 'address' -> 'city' FROM profiles;\n-- Returns JSONB: \"Mumbai\""
            },
            {
              "term": "->> operator",
              "definition": "Extracts a JSON/JSONB object field by key, or array element by index. Returns TEXT. Use this in WHERE clauses when comparing with string values, or when you need a plain text result.",
              "code": "SELECT data ->> 'name' FROM profiles;\n-- Returns TEXT: Alice\n\n-- Use in WHERE with string comparison\nSELECT * FROM profiles WHERE data ->> 'name' = 'Alice';\n\n-- Cast to compare with numbers\nSELECT * FROM profiles WHERE (data ->> 'age')::INT > 25;"
            },
            {
              "term": "#> operator",
              "definition": "Extracts a nested JSONB value at a given path specified as a TEXT array. Returns JSONB. Equivalent to chaining multiple -> operators but cleaner for deep paths.",
              "code": "SELECT data #> '{address,city}' FROM profiles;\n-- Returns JSONB: \"Mumbai\"\n\n-- Equivalent to:\nSELECT data -> 'address' -> 'city' FROM profiles;"
            },
            {
              "term": "#>> operator",
              "definition": "Extracts a nested JSONB value at a given path specified as a TEXT array. Returns TEXT. The text-returning version of #>.",
              "code": "SELECT data #>> '{address,city}' FROM profiles;\n-- Returns TEXT: Mumbai\n\n-- Use in WHERE clause\nSELECT * FROM profiles\nWHERE data #>> '{address,city}' = 'Mumbai';"
            },
            {
              "term": "@> operator (containment)",
              "definition": "Checks if the left JSONB value contains the right JSONB value. The right side must be a subset of the left side. Works on objects and arrays. Highly efficient when combined with a GIN index.",
              "code": "-- Does the profile have role admin?\nSELECT * FROM profiles\nWHERE data @> '{\"name\": \"Alice\"}';\n\n-- Does the tags array contain 'admin'?\nSELECT * FROM profiles\nWHERE data @> '{\"tags\": [\"admin\"]}';\n\n-- Works with nested objects\nSELECT * FROM profiles\nWHERE data @> '{\"address\": {\"city\": \"Mumbai\"}}';"
            },
            {
              "term": "<@ operator (contained by)",
              "definition": "Checks if the left JSONB value is contained by the right JSONB value. The reverse of @>. Less common but useful when checking if a known small document is a subset of a stored document.",
              "code": "-- Is '{\"name\": \"Alice\"}' contained in data?\nSELECT * FROM profiles\nWHERE '{\"name\": \"Alice\"}' <@ data;\n\n-- Same result as:\nSELECT * FROM profiles\nWHERE data @> '{\"name\": \"Alice\"}';"
            },
            {
              "term": "? operator (key exists)",
              "definition": "Checks if a string key exists at the top level of a JSONB object, or if a string value exists in a JSONB array. Returns BOOLEAN.",
              "code": "-- Does top-level key 'email' exist?\nSELECT * FROM profiles WHERE data ? 'email';\n\n-- Does 'admin' exist in the tags array?\nSELECT * FROM profiles WHERE data -> 'tags' ? 'admin';"
            },
            {
              "term": "?| operator (any key exists)",
              "definition": "Checks if any of the given keys exist at the top level of a JSONB object. Returns BOOLEAN.",
              "code": "-- Has email OR phone?\nSELECT * FROM profiles\nWHERE data ?| ARRAY['email', 'phone'];"
            },
            {
              "term": "?& operator (all keys exist)",
              "definition": "Checks if all of the given keys exist at the top level of a JSONB object. Returns BOOLEAN.",
              "code": "-- Has BOTH name AND age?\nSELECT * FROM profiles\nWHERE data ?& ARRAY['name', 'age'];"
            },
            {
              "term": "jsonb_set()",
              "definition": "Returns a modified copy of a JSONB value with a new value inserted or replaced at the specified path. Does not modify in place — must be used in an UPDATE SET. The fourth optional argument controls whether to create the path if it does not exist.",
              "code": "-- Update nested field\nUPDATE profiles\nSET data = jsonb_set(data, '{address,city}', '\"Delhi\"')\nWHERE id = 1;\n\n-- Insert new key (create_missing = true, default)\nUPDATE profiles\nSET data = jsonb_set(data, '{email}', '\"alice@example.com\"', true)\nWHERE id = 1;\n\n-- Update array element at index 0\nUPDATE profiles\nSET data = jsonb_set(data, '{tags,0}', '\"superadmin\"')\nWHERE id = 1;"
            },
            {
              "term": "|| operator (merge / concatenate)",
              "definition": "Merges two JSONB objects, with right-side values overwriting left-side keys. Used for shallow top-level updates or adding new fields to a JSONB document.",
              "code": "-- Add or overwrite top-level keys\nUPDATE profiles\nSET data = data || '{\"email\": \"alice@example.com\", \"verified\": true}'\nWHERE id = 1;\n\n-- Merge two objects (right wins on conflict)\nSELECT '{\"a\": 1, \"b\": 2}'::JSONB || '{\"b\": 99, \"c\": 3}'::JSONB;\n-- Result: {\"a\": 1, \"b\": 99, \"c\": 3}"
            },
            {
              "term": "- operator (delete key)",
              "definition": "Removes a key from a JSONB object, or removes an element at an index from a JSONB array. Returns the modified JSONB value.",
              "code": "-- Delete a top-level key\nUPDATE profiles\nSET data = data - 'email'\nWHERE id = 1;\n\n-- Delete multiple keys at once\nUPDATE profiles\nSET data = data - ARRAY['email', 'phone']\nWHERE id = 1;\n\n-- Delete array element at index 0\nSELECT '[\"a\",\"b\",\"c\"]'::JSONB - 0;\n-- Result: [\"b\", \"c\"]"
            },
            {
              "term": "#- operator (delete at path)",
              "definition": "Removes a value at a specific nested path from a JSONB document. The reverse of jsonb_set() — use this to delete nested keys.",
              "code": "-- Delete nested key address.pin\nUPDATE profiles\nSET data = data #- '{address,pin}'\nWHERE id = 1;\n\n-- Delete second element of tags array\nUPDATE profiles\nSET data = data #- '{tags,1}'\nWHERE id = 1;"
            },
            {
              "term": "jsonb_array_elements()",
              "definition": "Expands a JSONB array into a set of individual JSONB rows — like UNNEST for native arrays. Each element becomes a separate row. Use for querying inside arrays.",
              "code": "-- Expand tags array to rows\nSELECT jsonb_array_elements(data -> 'tags') AS tag\nFROM profiles;\n-- Result rows: \"admin\", \"user\"\n\n-- Find profiles with a specific tag\nSELECT DISTINCT p.id\nFROM profiles p,\n     jsonb_array_elements(data -> 'tags') AS tag\nWHERE tag::TEXT = '\"admin\"';"
            },
            {
              "term": "jsonb_array_elements_text()",
              "definition": "Like jsonb_array_elements() but returns TEXT instead of JSONB. Removes the surrounding quotes from string elements, making comparisons cleaner.",
              "code": "SELECT jsonb_array_elements_text(data -> 'tags') AS tag\nFROM profiles;\n-- Result rows: admin, user  (no quotes)\n\n-- Cleaner comparison\nSELECT DISTINCT p.id\nFROM profiles p,\n     jsonb_array_elements_text(data -> 'tags') AS tag\nWHERE tag = 'admin';"
            },
            {
              "term": "jsonb_object_keys()",
              "definition": "Returns all top-level keys of a JSONB object as a set of TEXT rows. Useful for inspecting the schema of dynamic JSONB documents.",
              "code": "SELECT jsonb_object_keys(data) AS key FROM profiles;\n-- Result rows: name, age, address, tags\n\n-- Count keys per row\nSELECT id, COUNT(*) AS num_keys\nFROM profiles,\n     jsonb_object_keys(data) AS key\nGROUP BY id;"
            },
            {
              "term": "jsonb_each()",
              "definition": "Expands the top-level key-value pairs of a JSONB object into rows of (key TEXT, value JSONB). Useful for pivoting or iterating over unknown keys.",
              "code": "SELECT key, value\nFROM profiles,\n     jsonb_each(data);\n-- Result:\n-- key      | value\n-- name     | \"Alice\"\n-- age      | 30\n-- address  | {\"city\": \"Mumbai\"}\n-- tags     | [\"admin\", \"user\"]"
            },
            {
              "term": "jsonb_each_text()",
              "definition": "Like jsonb_each() but returns values as TEXT instead of JSONB. Useful when all values are scalar and you want plain text output.",
              "code": "SELECT key, value\nFROM profiles,\n     jsonb_each_text(data)\nWHERE key IN ('name', 'age');\n-- Result:\n-- key  | value\n-- name | Alice\n-- age  | 30"
            },
            {
              "term": "jsonb_build_object()",
              "definition": "Constructs a JSONB object from alternating key-value arguments. Useful for building JSONB dynamically in queries or SELECT output.",
              "code": "SELECT jsonb_build_object(\n  'name', 'Alice',\n  'age', 30,\n  'active', true\n);\n-- Result: {\"name\": \"Alice\", \"age\": 30, \"active\": true}\n\n-- Build from column values\nSELECT jsonb_build_object('id', id, 'name', data->>'name')\nFROM profiles;"
            },
            {
              "term": "jsonb_build_array()",
              "definition": "Constructs a JSONB array from a list of values. Useful for creating arrays dynamically in queries.",
              "code": "SELECT jsonb_build_array('admin', 'user', 42, true);\n-- Result: [\"admin\", \"user\", 42, true]"
            },
            {
              "term": "jsonb_agg()",
              "definition": "An aggregate function that collects JSONB values from multiple rows into a single JSONB array. Like array_agg() but for JSONB.",
              "code": "-- Aggregate all profile data into one array\nSELECT jsonb_agg(data) FROM profiles;\n\n-- Group by city, collect names\nSELECT\n  data #>> '{address,city}' AS city,\n  jsonb_agg(data ->> 'name') AS names\nFROM profiles\nGROUP BY city;"
            },
            {
              "term": "jsonb_strip_nulls()",
              "definition": "Removes all object fields with NULL values from a JSONB document recursively. Useful for cleaning up documents before storing them.",
              "code": "SELECT jsonb_strip_nulls(\n  '{\"name\": \"Alice\", \"email\": null, \"age\": 30}'\n);\n-- Result: {\"name\": \"Alice\", \"age\": 30}\n\n-- Clean before insert\nINSERT INTO profiles (data)\nVALUES (jsonb_strip_nulls('{\"name\": \"Bob\", \"phone\": null}'));"
            },
            {
              "term": "to_jsonb()",
              "definition": "Converts any SQL value or row to its JSONB representation. Useful for converting query results or composite types to JSONB.",
              "code": "SELECT to_jsonb(42);           -- 42\nSELECT to_jsonb('hello');      -- \"hello\"\nSELECT to_jsonb(ARRAY[1,2,3]); -- [1, 2, 3]\n\n-- Convert a full row to JSONB\nSELECT to_jsonb(p) FROM profiles p;"
            },
            {
              "term": "GIN Index on JSONB",
              "definition": "A Generalized Inverted Index (GIN) on a JSONB column enables fast searches using @>, ?, ?|, and ?& operators. Without it, these operators require a full table scan. Essential for production JSONB queries.",
              "code": "-- Full GIN index (supports @>, ?, ?|, ?&)\nCREATE INDEX idx_profiles_gin ON profiles USING GIN (data);\n\n-- Functional index for a specific field (faster for equality)\nCREATE INDEX idx_profiles_city\n  ON profiles ((data #>> '{address,city}'));\n\n-- jsonb_path_ops GIN (smaller, only supports @>)\nCREATE INDEX idx_profiles_path\n  ON profiles USING GIN (data jsonb_path_ops);"
            }
          ]
        }
      ]
    },
    {
      "id": "diagram",
      "type": "diagram",
      "label": "Diagram",
      "heading": "PostgreSQL Type & JSONB Operator Overview",
      "blocks": [
        {
          "type": "diagram",
          "text": "PostgreSQL Column Types\n├── UUID          → gen_random_uuid()  → globally unique, no sequence\n├── ENUM          → fixed value list    → enforced by DB, hard to change\n├── ARRAY         → TEXT[], INT[]       → multi-value single column\n├── JSON          → plain text          → preserves order, limited operators\n├── JSONB         → binary storage      → GIN index, full operator set\n└── Generated     → STORED expression  → auto-computed from other columns\n\nJSONB Navigation Operators\n├── ->   key/index  → returns JSONB\n├── ->>  key/index  → returns TEXT\n├── #>   path[]     → returns JSONB\n└── #>>  path[]     → returns TEXT\n\nJSONB Containment & Existence\n├── @>   left contains right\n├── <@   left is contained by right\n├── ?    key exists (top level)\n├── ?|   any of keys exist\n└── ?&   all keys exist\n\nJSONB Mutation\n├── jsonb_set()   → update/insert at path\n├── ||            → merge two JSONB objects\n├── -             → delete key or array index\n└── #-            → delete at nested path\n\nJSONB Functions\n├── jsonb_array_elements()      → array to rows (JSONB)\n├── jsonb_array_elements_text() → array to rows (TEXT)\n├── jsonb_object_keys()         → top-level keys as rows\n├── jsonb_each()                → key-value rows (JSONB)\n├── jsonb_each_text()           → key-value rows (TEXT)\n├── jsonb_build_object()        → construct object\n├── jsonb_build_array()         → construct array\n├── jsonb_agg()                 → aggregate rows to array\n├── jsonb_strip_nulls()         → remove null fields\n└── to_jsonb()                  → convert SQL value to JSONB"
        }
      ]
    },
    {
      "id": "code",
      "type": "code-snippet",
      "label": "Code Snippet",
      "heading": "PostgreSQL Types — Full Setup Examples",
      "blocks": [
        {
          "type": "code",
          "filename": "pg_types_setup.sql",
          "text": "-- ─── UUID ───────────────────────────────────────────────\nCREATE TABLE users (\n  id   UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  name TEXT NOT NULL\n);\n\n-- ─── ENUM ────────────────────────────────────────────────\nCREATE TYPE order_status AS ENUM ('pending', 'shipped', 'delivered', 'cancelled');\n\nCREATE TABLE orders (\n  id     SERIAL PRIMARY KEY,\n  status order_status DEFAULT 'pending'\n);\n\n-- Add new ENUM value\nALTER TYPE order_status ADD VALUE 'returned';\n\n-- ─── ARRAY ───────────────────────────────────────────────\nCREATE TABLE products (\n  id   SERIAL PRIMARY KEY,\n  name TEXT,\n  tags TEXT[]\n);\n\nINSERT INTO products (name, tags)\nVALUES ('Laptop', ARRAY['electronics', 'computers']);\n\nSELECT * FROM products WHERE 'electronics' = ANY(tags);\nSELECT * FROM products WHERE tags @> ARRAY['electronics'];\n\n-- ─── GENERATED COLUMN ────────────────────────────────────\nCREATE TABLE employees (\n  id         SERIAL PRIMARY KEY,\n  first_name TEXT,\n  last_name  TEXT,\n  full_name  TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,\n  salary     NUMERIC,\n  bonus      NUMERIC,\n  total_comp NUMERIC GENERATED ALWAYS AS (salary + bonus) STORED\n);"
        }
      ]
    },
    {
      "id": "jsonb-create",
      "type": "code-snippet",
      "label": "JSONB: Create & Insert",
      "heading": "Creating JSONB Columns & Inserting Data",
      "blocks": [
        {
          "type": "code",
          "filename": "jsonb_create_insert.sql",
          "text": "-- ─── Create table with JSONB column ─────────────────────\nCREATE TABLE profiles (\n  id   SERIAL PRIMARY KEY,\n  data JSONB\n);\n\n-- ─── Insert using string literal ─────────────────────────\nINSERT INTO profiles (data) VALUES\n  ('{\"name\": \"Alice\", \"age\": 30, \"active\": true,\n    \"address\": {\"city\": \"Mumbai\", \"pin\": \"400001\"},\n    \"tags\": [\"admin\", \"user\"],\n    \"scores\": [95, 88, 72]}');\n\n-- ─── Insert using ::jsonb cast ────────────────────────────\nINSERT INTO profiles (data)\nVALUES ('{\"name\": \"Bob\", \"age\": 25}' ::JSONB);\n\n-- ─── Insert using jsonb_build_object() ───────────────────\nINSERT INTO profiles (data)\nVALUES (\n  jsonb_build_object(\n    'name', 'Charlie',\n    'age',  28,\n    'tags', jsonb_build_array('editor', 'viewer')\n  )\n);\n\n-- ─── Add GIN index for fast queries ──────────────────────\nCREATE INDEX idx_profiles_gin ON profiles USING GIN (data);\n\n-- ─── Index on specific path (for equality queries) ───────\nCREATE INDEX idx_profiles_name ON profiles ((data ->> 'name'));\nCREATE INDEX idx_profiles_city ON profiles ((data #>> '{address,city}'));"
        }
      ]
    },
    {
      "id": "jsonb-operators",
      "type": "code-snippet",
      "label": "JSONB: Operators",
      "heading": "JSONB Operators: ->, ->>, #>, #>>",
      "blocks": [
        {
          "type": "code",
          "filename": "jsonb_operators.sql",
          "text": "-- ─── -> Extract field → returns JSONB ───────────────────\nSELECT data -> 'name'    FROM profiles;  -- \"Alice\"  (JSONB)\nSELECT data -> 'address' FROM profiles;  -- {\"city\": \"Mumbai\", \"pin\": \"400001\"}\nSELECT data -> 'tags'    FROM profiles;  -- [\"admin\", \"user\"]\nSELECT data -> 'tags' -> 0 FROM profiles; -- \"admin\"  (first element)\n\n-- ─── ->> Extract field → returns TEXT ───────────────────\nSELECT data ->> 'name'   FROM profiles;  -- Alice  (TEXT, no quotes)\nSELECT data ->> 'age'    FROM profiles;  -- 30     (TEXT)\n\n-- Cast TEXT to compare with numbers\nSELECT * FROM profiles WHERE (data ->> 'age')::INT > 25;\n\n-- ─── Chain operators for nested objects ─────────────────\nSELECT data -> 'address' ->> 'city' FROM profiles;  -- Mumbai\n\n-- ─── #> Extract at path → returns JSONB ─────────────────\nSELECT data #> '{address,city}'  FROM profiles;  -- \"Mumbai\"  (JSONB)\nSELECT data #> '{tags,0}'        FROM profiles;  -- \"admin\"\n\n-- ─── #>> Extract at path → returns TEXT ─────────────────\nSELECT data #>> '{address,city}' FROM profiles;  -- Mumbai  (TEXT)\n\n-- Use in WHERE\nSELECT * FROM profiles WHERE data #>> '{address,city}' = 'Mumbai';"
        }
      ]
    },
    {
      "id": "jsonb-filter",
      "type": "code-snippet",
      "label": "JSONB: Filtering",
      "heading": "Filtering JSONB Data (WHERE Clauses)",
      "blocks": [
        {
          "type": "code",
          "filename": "jsonb_filtering.sql",
          "text": "-- ─── Equality on a field ────────────────────────────────\nSELECT * FROM profiles WHERE data ->> 'name' = 'Alice';\n\n-- ─── Numeric comparison (cast required) ─────────────────\nSELECT * FROM profiles WHERE (data ->> 'age')::INT >= 25;\n\n-- ─── Boolean field ───────────────────────────────────────\nSELECT * FROM profiles WHERE (data ->> 'active')::BOOLEAN = true;\n-- Shorthand:\nSELECT * FROM profiles WHERE data -> 'active' = 'true'::JSONB;\n\n-- ─── Filter on nested field ──────────────────────────────\nSELECT * FROM profiles WHERE data #>> '{address,city}' = 'Mumbai';\n-- Or using containment (uses GIN index):\nSELECT * FROM profiles WHERE data @> '{\"address\": {\"city\": \"Mumbai\"}}';\n\n-- ─── Check key existence ─────────────────────────────────\nSELECT * FROM profiles WHERE data ? 'email';        -- has email key\nSELECT * FROM profiles WHERE NOT (data ? 'email');  -- missing email key\n\n-- ─── Filter inside array ─────────────────────────────────\n-- Does tags array contain 'admin'?\nSELECT * FROM profiles WHERE data @> '{\"tags\": [\"admin\"]}';\n\n-- ─── LIKE on JSONB text field ────────────────────────────\nSELECT * FROM profiles WHERE data ->> 'name' ILIKE 'al%';\n\n-- ─── NULL check ──────────────────────────────────────────\nSELECT * FROM profiles WHERE data -> 'email' IS NULL;\nSELECT * FROM profiles WHERE data ->> 'email' IS NULL;"
        }
      ]
    },
    {
      "id": "jsonb-update",
      "type": "code-snippet",
      "label": "JSONB: Updating",
      "heading": "Updating JSONB Data",
      "blocks": [
        {
          "type": "code",
          "filename": "jsonb_updating.sql",
          "text": "-- ─── jsonb_set() — update or insert at a path ───────────\n-- Syntax: jsonb_set(target, path[], new_value, [create_missing])\n\n-- Update existing field\nUPDATE profiles\nSET data = jsonb_set(data, '{age}', '31')\nWHERE id = 1;\n\n-- Update nested field\nUPDATE profiles\nSET data = jsonb_set(data, '{address,city}', '\"Delhi\"')\nWHERE id = 1;\n\n-- Insert new field (create_missing defaults to true)\nUPDATE profiles\nSET data = jsonb_set(data, '{email}', '\"alice@example.com\"', true)\nWHERE id = 1;\n\n-- Update array element at index 0\nUPDATE profiles\nSET data = jsonb_set(data, '{tags,0}', '\"superadmin\"')\nWHERE id = 1;\n\n-- ─── || operator — merge / add top-level keys ────────────\n-- Right side wins on key conflict\nUPDATE profiles\nSET data = data || '{\"email\": \"alice@example.com\", \"verified\": true}'\nWHERE id = 1;\n\n-- ─── - operator — delete key ─────────────────────────────\nUPDATE profiles\nSET data = data - 'email'\nWHERE id = 1;\n\n-- Delete multiple keys\nUPDATE profiles\nSET data = data - ARRAY['email', 'phone']\nWHERE id = 1;\n\n-- ─── #- operator — delete at nested path ─────────────────\nUPDATE profiles\nSET data = data #- '{address,pin}'\nWHERE id = 1;\n\n-- ─── Append to JSONB array ───────────────────────────────\nUPDATE profiles\nSET data = jsonb_set(\n  data,\n  '{tags}',\n  (data -> 'tags') || '[\"moderator\"]'\n)\nWHERE id = 1;"
        }
      ]
    },
    {
      "id": "jsonb-arrays",
      "type": "code-snippet",
      "label": "JSONB: Arrays",
      "heading": "Working with JSONB Arrays",
      "blocks": [
        {
          "type": "code",
          "filename": "jsonb_arrays.sql",
          "text": "-- Sample data has: \"tags\": [\"admin\", \"user\"], \"scores\": [95, 88, 72]\n\n-- ─── Access array elements by index ─────────────────────\nSELECT data -> 'tags' -> 0    FROM profiles;  -- \"admin\" (JSONB)\nSELECT data -> 'tags' ->> 1   FROM profiles;  -- user    (TEXT)\nSELECT data #> '{scores,0}'   FROM profiles;  -- 95\nSELECT data #>> '{scores,2}'  FROM profiles;  -- 72      (TEXT)\n\n-- ─── Expand array to rows ────────────────────────────────\nSELECT jsonb_array_elements(data -> 'tags') AS tag\nFROM profiles;\n-- Rows: \"admin\", \"user\"\n\n-- Returns TEXT rows (cleaner string comparison)\nSELECT jsonb_array_elements_text(data -> 'tags') AS tag\nFROM profiles;\n-- Rows: admin, user\n\n-- ─── Get array length ────────────────────────────────────\nSELECT jsonb_array_length(data -> 'tags')   FROM profiles;  -- 2\nSELECT jsonb_array_length(data -> 'scores') FROM profiles;  -- 3\n\n-- ─── Find rows where array contains a value ──────────────\n-- Approach 1: containment (uses GIN index — preferred)\nSELECT * FROM profiles WHERE data @> '{\"tags\": [\"admin\"]}';\n\n-- Approach 2: unnest and filter\nSELECT DISTINCT p.id, p.data\nFROM profiles p,\n     jsonb_array_elements_text(p.data -> 'tags') AS tag\nWHERE tag = 'admin';\n\n-- ─── Append element to JSONB array ───────────────────────\nUPDATE profiles\nSET data = jsonb_set(\n  data,\n  '{tags}',\n  (data -> 'tags') || '[\"moderator\"]'\n)\nWHERE id = 1;\n\n-- ─── Remove element from JSONB array (by index) ──────────\nUPDATE profiles\nSET data = data #- '{tags,1}'\nWHERE id = 1;\n\n-- ─── Build array dynamically ─────────────────────────────\nSELECT jsonb_build_array('admin', 'user', 42, true);\n-- [\"admin\", \"user\", 42, true]\n\n-- ─── Aggregate rows into JSONB array ─────────────────────\nSELECT jsonb_agg(data ->> 'name') AS names FROM profiles;\n-- [\"Alice\", \"Bob\", \"Charlie\"]"
        }
      ]
    },
    {
      "id": "jsonb-containment",
      "type": "code-snippet",
      "label": "JSONB: Containment",
      "heading": "Containment & Existence Operators (@>, <@, ?, ?|, ?&)",
      "blocks": [
        {
          "type": "code",
          "filename": "jsonb_containment.sql",
          "text": "-- ─── @> Containment: left contains right ────────────────\n-- Check top-level field\nSELECT * FROM profiles WHERE data @> '{\"name\": \"Alice\"}';\n\n-- Check nested field\nSELECT * FROM profiles WHERE data @> '{\"address\": {\"city\": \"Mumbai\"}}';\n\n-- Check array contains a value\nSELECT * FROM profiles WHERE data @> '{\"tags\": [\"admin\"]}';\n\n-- Check multiple conditions\nSELECT * FROM profiles\nWHERE data @> '{\"name\": \"Alice\", \"active\": true}';\n\n-- ─── <@ Contained by: left is subset of right ────────────\nSELECT * FROM profiles\nWHERE '{\"name\": \"Alice\"}' <@ data;\n-- Same result as: data @> '{\"name\": \"Alice\"}'\n\n-- ─── ? Key exists at top level ───────────────────────────\nSELECT * FROM profiles WHERE data ? 'email';        -- has key\nSELECT * FROM profiles WHERE NOT (data ? 'email');  -- missing key\n\n-- Check key in nested object\nSELECT * FROM profiles WHERE data -> 'address' ? 'city';\n\n-- Check if value exists in array\nSELECT * FROM profiles WHERE data -> 'tags' ? 'admin';\n\n-- ─── ?| Any of these keys exist ──────────────────────────\nSELECT * FROM profiles WHERE data ?| ARRAY['email', 'phone'];\n-- Returns rows where data has email OR phone (or both)\n\n-- ─── ?& All of these keys exist ──────────────────────────\nSELECT * FROM profiles WHERE data ?& ARRAY['name', 'age'];\n-- Returns rows where data has BOTH name AND age\n\n-- ─── Combining operators ─────────────────────────────────\nSELECT * FROM profiles\nWHERE data @> '{\"active\": true}'\n  AND data ?& ARRAY['name', 'age']\n  AND (data ->> 'age')::INT > 20;"
        }
      ]
    },
    {
      "id": "jsonb-functions",
      "type": "code-snippet",
      "label": "JSONB: Functions",
      "heading": "JSONB Functions Reference",
      "blocks": [
        {
          "type": "code",
          "filename": "jsonb_functions.sql",
          "text": "-- ─── jsonb_object_keys() — top-level keys as rows ────────\nSELECT jsonb_object_keys(data) AS key FROM profiles;\n-- name, age, active, address, tags, scores\n\n-- ─── jsonb_each() — key-value pairs as rows (JSONB) ──────\nSELECT key, value FROM profiles, jsonb_each(data);\n-- key     | value\n-- name    | \"Alice\"\n-- age     | 30\n-- address | {\"city\": \"Mumbai\", ...}\n\n-- ─── jsonb_each_text() — key-value pairs as rows (TEXT) ──\nSELECT key, value FROM profiles, jsonb_each_text(data);\n-- key     | value\n-- name    | Alice\n-- age     | 30\n\n-- ─── jsonb_build_object() — construct JSONB object ───────\nSELECT jsonb_build_object('name', 'Alice', 'age', 30, 'active', true);\n-- {\"name\": \"Alice\", \"age\": 30, \"active\": true}\n\n-- Build from column values in a query\nSELECT jsonb_build_object('id', id, 'name', data->>'name') FROM profiles;\n\n-- ─── jsonb_build_array() — construct JSONB array ─────────\nSELECT jsonb_build_array('admin', 'user', 42, true);\n-- [\"admin\", \"user\", 42, true]\n\n-- ─── jsonb_agg() — aggregate rows into JSONB array ───────\nSELECT jsonb_agg(data ->> 'name') AS all_names FROM profiles;\n-- [\"Alice\", \"Bob\", \"Charlie\"]\n\nSELECT jsonb_agg(data ORDER BY data->>'name') FROM profiles;\n\n-- ─── jsonb_strip_nulls() — remove null fields ────────────\nSELECT jsonb_strip_nulls('{\"name\": \"Alice\", \"email\": null, \"age\": 30}');\n-- {\"name\": \"Alice\", \"age\": 30}\n\nINSERT INTO profiles (data)\nVALUES (jsonb_strip_nulls('{\"name\": \"Dave\", \"phone\": null}'));\n\n-- ─── to_jsonb() — convert SQL value to JSONB ─────────────\nSELECT to_jsonb(42);            -- 42\nSELECT to_jsonb('hello'::TEXT); -- \"hello\"\nSELECT to_jsonb(ARRAY[1,2,3]);  -- [1, 2, 3]\nSELECT to_jsonb(NOW());         -- \"2025-01-01T12:00:00+00:00\"\n\n-- Convert full row to JSONB\nSELECT to_jsonb(p) FROM profiles p;\n\n-- ─── jsonb_typeof() — get type of a JSONB value ──────────\nSELECT jsonb_typeof(data -> 'name');   -- string\nSELECT jsonb_typeof(data -> 'age');    -- number\nSELECT jsonb_typeof(data -> 'active'); -- boolean\nSELECT jsonb_typeof(data -> 'tags');   -- array\nSELECT jsonb_typeof(data -> 'address');-- object\nSELECT jsonb_typeof(data -> 'missing');-- null"
        }
      ]
    },
    {
      "id": "comparison",
      "type": "comparison",
      "label": "Differentiate / Comparison",
      "heading": "JSON vs JSONB",
      "blocks": [
        {
          "type": "table",
          "headers": ["Feature", "JSON", "JSONB"],
          "rows": [
            ["Storage format", "Plain text", "Binary (decomposed)"],
            ["Write speed", "Faster", "Slightly slower"],
            ["Read/query speed", "Slower", "Faster"],
            ["Key order", "Preserved", "Not preserved"],
            ["Duplicate keys", "Allowed (last wins on read)", "Removed (last value kept)"],
            ["Whitespace", "Preserved", "Removed"],
            ["Indexing", "Not supported", "Supports GIN index"],
            ["Operator support (->, @>, ?)", "Basic (-> and ->> only)", "Full operator set"],
            ["Recommended use", "Logging raw input as-is", "Querying and filtering JSON data"]
          ]
        }
      ]
    },
    {
      "id": "boxes",
      "type": "highlight-box",
      "label": "Highlight Box",
      "heading": "Key Reminders",
      "blocks": [
        {
          "type": "text-box",
          "variant": "remember",
          "title": "Remember",
          "text": "-> returns JSONB, ->> returns TEXT. Use ->> when comparing with string literals in WHERE clauses. Use -> when chaining further navigation or comparing with JSONB values."
        },
        {
          "type": "text-box",
          "variant": "tip",
          "title": "Tip",
          "text": "Always prefer JSONB over JSON unless you specifically need to preserve key order or exact raw whitespace. Add a GIN index on any JSONB column you plan to query at scale."
        },
        {
          "type": "text-box",
          "variant": "warning",
          "title": "Warning",
          "text": "Adding a value to an ENUM type requires ALTER TYPE and cannot be done inside a transaction in older PostgreSQL versions. Removing or reordering ENUM values requires recreating the type entirely."
        },
        {
          "type": "text-box",
          "variant": "note",
          "title": "Note",
          "text": "Generated columns cannot reference other generated columns or use non-immutable functions such as now() or random(). Only STORED generated columns are supported in PostgreSQL — VIRTUAL is not yet implemented."
        },
        {
          "type": "text-box",
          "variant": "interview",
          "title": "Interview",
          "text": "Key distinctions to know: JSON vs JSONB storage and operators, -> vs ->> return types, @> for containment vs ? for key existence, jsonb_set() for nested updates vs || for top-level merges, and why GIN indexes matter for JSONB."
        }
      ]
    },
    {
      "id": "table-section",
      "type": "table-section",
      "label": "JSONB Operators Table",
      "heading": "JSONB Operators & Functions Quick Reference",
      "blocks": [
        {
          "type": "table",
          "headers": ["Operator / Function", "Purpose", "Returns", "Example"],
          "rows": [
            ["->", "Get field or array element", "JSONB", "data -> 'name'"],
            ["->>", "Get field or array element", "TEXT", "data ->> 'name'"],
            ["#>", "Get value at path", "JSONB", "data #> '{address,city}'"],
            ["#>>", "Get value at path", "TEXT", "data #>> '{address,city}'"],
            ["@>", "Left contains right", "BOOLEAN", "data @> '{\"role\":\"admin\"}'"],
            ["<@", "Left is contained by right", "BOOLEAN", "'{\"name\":\"A\"}' <@ data"],
            ["?", "Key exists at top level", "BOOLEAN", "data ? 'email'"],
            ["?|", "Any of keys exist", "BOOLEAN", "data ?| ARRAY['email','phone']"],
            ["?&", "All keys exist", "BOOLEAN", "data ?& ARRAY['name','age']"],
            ["||", "Merge two JSONB objects", "JSONB", "data || '{\"key\":\"val\"}'"],
            ["-", "Delete key or array index", "JSONB", "data - 'email'"],
            ["#-", "Delete at nested path", "JSONB", "data #- '{address,pin}'"],
            ["jsonb_set()", "Update/insert at path", "JSONB", "jsonb_set(data,'{city}','\"Delhi\"')"],
            ["jsonb_array_elements()", "Expand array to JSONB rows", "SETOF JSONB", "jsonb_array_elements(data->'tags')"],
            ["jsonb_array_elements_text()", "Expand array to TEXT rows", "SETOF TEXT", "jsonb_array_elements_text(data->'tags')"],
            ["jsonb_array_length()", "Get array length", "INT", "jsonb_array_length(data->'tags')"],
            ["jsonb_object_keys()", "Top-level keys as rows", "SETOF TEXT", "jsonb_object_keys(data)"],
            ["jsonb_each()", "Key-value rows (JSONB values)", "SETOF RECORD", "jsonb_each(data)"],
            ["jsonb_each_text()", "Key-value rows (TEXT values)", "SETOF RECORD", "jsonb_each_text(data)"],
            ["jsonb_build_object()", "Construct JSONB object", "JSONB", "jsonb_build_object('k','v')"],
            ["jsonb_build_array()", "Construct JSONB array", "JSONB", "jsonb_build_array(1,2,3)"],
            ["jsonb_agg()", "Aggregate rows to JSONB array", "JSONB", "jsonb_agg(data->'name')"],
            ["jsonb_strip_nulls()", "Remove null fields", "JSONB", "jsonb_strip_nulls(data)"],
            ["jsonb_typeof()", "Get type of JSONB value", "TEXT", "jsonb_typeof(data->'age')"],
            ["to_jsonb()", "Convert SQL value to JSONB", "JSONB", "to_jsonb(42)"]
          ]
        }
      ]
    },
    {
      "id": "accordion",
      "type": "accordion",
      "label": "Accordion",
      "heading": "Deep Dive Questions",
      "blocks": [
        {
          "type": "accordion",
          "items": [
            {
              "title": "What is the difference between #> and -> for nested access?",
              "text": "Both navigate nested JSONB but differ in how you specify the path. -> chains key by key: data -> 'address' -> 'city'. #> takes the full path as a TEXT array in one step: data #> '{address,city}'. The #> form is cleaner for deep paths. Both return JSONB. Their text variants #>> and ->> return TEXT."
            },
            {
              "title": "When does @> use the GIN index and when does it not?",
              "text": "The @> operator uses a GIN index when the index is created with the default gin_ops (CREATE INDEX USING GIN(data)) or jsonb_path_ops (USING GIN(data jsonb_path_ops)). It does NOT use a GIN index if you filter using ->> or #>> with a text comparison — for those you need a functional index: CREATE INDEX ON t ((data->>'field'))."
            },
            {
              "title": "How do you delete a key from a JSONB object?",
              "text": "Use the - operator for top-level keys: data - 'key'. Delete multiple keys with: data - ARRAY['key1','key2']. For nested keys use #-: data #- '{address,pin}'. For array elements by index: data - 0 removes the first element from a JSONB array."
            },
            {
              "title": "How do you append an element to a JSONB array column?",
              "text": "Use jsonb_set combined with the || operator: jsonb_set(data, '{tags}', (data -> 'tags') || '[\"newvalue\"]'). The inner expression fetches the existing array, concatenates the new element, and jsonb_set writes it back to the path."
            },
            {
              "title": "What is the difference between jsonb_array_elements() and jsonb_array_elements_text()?",
              "text": "Both expand a JSONB array into rows. jsonb_array_elements() returns JSONB rows — string elements include surrounding quotes (\"admin\"). jsonb_array_elements_text() returns TEXT rows — string elements have no quotes (admin). For string comparisons in WHERE clauses, jsonb_array_elements_text() is cleaner."
            },
            {
              "title": "When should you use jsonb_set() vs the || operator for updates?",
              "text": "Use jsonb_set() when updating or inserting a value at a specific nested path (e.g., inside a nested object or at an array index). Use || when you want to add or overwrite top-level keys with a merge — it is simpler for flat updates. || does not support nested paths; jsonb_set() does."
            }
          ]
        }
      ]
    },
    {
      "id": "use-cases",
      "type": "use-cases",
      "label": "Use Cases",
      "heading": "Real-World Use Cases",
      "blocks": [
        {
          "type": "list",
          "items": [
            "UUID: User IDs in microservices or multi-database systems where auto-increment IDs would collide.",
            "ENUM: Order status (pending, shipped, delivered), user roles (admin, editor, viewer), ticket priority levels.",
            "ARRAY: Storing product tags, user permissions, or multiple phone numbers without a junction table.",
            "JSONB: Storing user profile metadata, feature flags, dynamic form responses, or third-party API payloads.",
            "JSON: Audit logs where you need to preserve the exact raw payload as received from an external system.",
            "Generated Columns: Full name from first + last, total price from quantity * unit price, URL slug from title.",
            "JSONB + GIN Index: Product catalog with dynamic attributes (color, size, material) queryable at scale.",
            "jsonb_array_elements_text(): Finding all users who have a specific role in their roles array.",
            "jsonb_agg(): Building a JSON API response that groups child records inside a parent object.",
            "jsonb_set() + UPDATE: Partially updating a user settings document without overwriting the whole column."
          ]
        }
      ]
    },
    {
      "id": "best-practices",
      "type": "best-practices",
      "label": "Best Practices",
      "heading": "Best Practices",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Always use JSONB over JSON unless you have a specific reason to preserve the exact raw text format.",
            "Add a GIN index on JSONB columns you frequently query with @>, ?, ?|, or ?& operators.",
            "For frequently filtered JSONB fields with equality queries, use a functional index: CREATE INDEX ON t ((data->>'field')).",
            "Use jsonb_strip_nulls() before storing documents to keep them clean and reduce storage overhead.",
            "Use jsonb_typeof() to safely check the type of a JSONB value before casting to avoid runtime errors.",
            "Use jsonb_array_elements_text() instead of jsonb_array_elements() when comparing string elements — avoids quote handling.",
            "Prefer @> for containment checks over unnesting with jsonb_array_elements() — @> uses the GIN index.",
            "Use jsonb_build_object() and jsonb_build_array() to construct JSONB programmatically instead of string concatenation.",
            "Keep JSONB documents shallow — deeply nested structures are harder to index and query efficiently.",
            "Define ENUMs carefully — document all values at design time since removing values requires a full type recreation."
          ]
        }
      ]
    },
    {
      "id": "common-mistakes",
      "type": "common-mistakes",
      "label": "Common Mistakes",
      "heading": "Common Mistakes",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Using JSON instead of JSONB and then wondering why @>, ?, and jsonb_set() don't work.",
            "Forgetting that -> returns JSONB and ->> returns TEXT — comparing data->'age' = 30 fails; use (data->>'age')::INT = 30.",
            "Not adding a GIN index on JSONB columns used in WHERE clauses — results in full table scans at scale.",
            "Using jsonb_array_elements() and then comparing result with a plain string — the JSONB element includes quotes. Use jsonb_array_elements_text() instead.",
            "Trying to manually INSERT or UPDATE a Generated Column — PostgreSQL will throw an error.",
            "Using ENUM for values that may change over time — removing ENUM values requires recreating the type.",
            "Expecting JSON to deduplicate keys — it does not. Only JSONB deduplicates (last value kept).",
            "Using || to update nested fields — it only merges at the top level. Use jsonb_set() for nested updates.",
            "Forgetting to cast JSONB text values: data->>'count' = '5' not data->>'count' = 5.",
            "Creating a GIN index but then querying with ->> equality — that query uses a sequential scan, not the GIN index. Add a functional index for ->> equality."
          ]
        }
      ]
    },
    {
      "id": "interview",
      "type": "interview-questions",
      "label": "Interview Questions",
      "heading": "JSONB Interview Scenarios",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "What is the difference between JSON and JSONB in PostgreSQL?",
              "answer": "JSON stores data as plain text, preserving whitespace, key order, and duplicate keys. JSONB stores data in a binary decomposed format — it removes whitespace, reorders keys, and deduplicates them (last value wins). JSONB is faster to query, supports GIN indexing, and provides the full operator set (@>, ?, jsonb_set, etc.). JSON is slightly faster to write and preserves exact raw input. JSONB is preferred for almost all use cases."
            },
            {
              "question": "What is the difference between -> and ->> operators?",
              "answer": "-> extracts a field or array element and returns JSONB — the result includes type information (string values include quotes). ->> extracts the same but returns TEXT — string values have no surrounding quotes. Use -> when chaining further navigation (data -> 'address' -> 'city') or comparing with JSONB values. Use ->> in WHERE clauses for string comparisons or when the application needs plain text output. Example: data->'age' returns 30 as JSONB, data->>'age' returns '30' as TEXT — you must cast for numeric comparison: (data->>'age')::INT."
            },
            {
              "question": "What is the difference between #> and -> for accessing nested fields?",
              "answer": "Both navigate nested JSONB and return JSONB (#>> and ->> are their TEXT-returning counterparts). The difference is syntax: -> chains one key at a time (data -> 'address' -> 'city'), while #> takes the full path in one step as a TEXT array (data #> '{address,city}'). The #> form is cleaner for deep paths. Both produce identical results."
            },
            {
              "question": "How would you find all profiles where the city is Mumbai using JSONB?",
              "answer": "Two approaches: First, use ->> for text comparison: SELECT * FROM profiles WHERE data #>> '{address,city}' = 'Mumbai'; Second, use @> containment (preferred when a GIN index exists): SELECT * FROM profiles WHERE data @> '{\"address\": {\"city\": \"Mumbai\"}}'; The @> approach uses the GIN index and is faster at scale. The ->> approach requires a functional index on that specific path to be efficient."
            },
            {
              "question": "How would you check if a JSONB column contains a specific key?",
              "answer": "Use the ? operator: SELECT * FROM profiles WHERE data ? 'email'; This checks for key existence at the top level. For a nested key: SELECT * FROM profiles WHERE data -> 'address' ? 'city'; To check if a value exists in a JSONB array: SELECT * FROM profiles WHERE data -> 'tags' ? 'admin'; For multiple keys: use ?| (any exist) or ?& (all must exist)."
            },
            {
              "question": "How do you update only a nested field inside a JSONB column without overwriting the entire document?",
              "answer": "Use jsonb_set(): UPDATE profiles SET data = jsonb_set(data, '{address,city}', '\"Delhi\"') WHERE id = 1; The second argument is the path as a TEXT array, the third is the new JSONB value. For top-level key additions or overwrites, the || merge operator is simpler: SET data = data || '{\"email\": \"alice@example.com\"}'. The || operator only works at the top level; jsonb_set() supports nested paths."
            },
            {
              "question": "How do you delete a key from a JSONB document?",
              "answer": "For a top-level key, use the - operator: UPDATE profiles SET data = data - 'email'; For multiple keys: data - ARRAY['email','phone']. For a nested key, use #-: data #- '{address,pin}'. For removing an array element by index: data #- '{tags,1}' removes the element at index 1."
            },
            {
              "question": "How do you find all rows where a JSONB array contains a specific value?",
              "answer": "Preferred approach using @> (uses GIN index): SELECT * FROM profiles WHERE data @> '{\"tags\": [\"admin\"]}'; Alternative using unnesting (no GIN index benefit): SELECT DISTINCT p.id FROM profiles p, jsonb_array_elements_text(p.data -> 'tags') AS tag WHERE tag = 'admin'; Use @> in production — it is significantly faster with a GIN index."
            },
            {
              "question": "How do you append an element to a JSONB array in a column?",
              "answer": "Use jsonb_set() combined with the || operator to concatenate: UPDATE profiles SET data = jsonb_set(data, '{tags}', (data -> 'tags') || '[\"moderator\"]') WHERE id = 1; The inner expression fetches the existing array, appends the new JSONB element using ||, and jsonb_set writes it back to the path in the document."
            },
            {
              "question": "What is the difference between jsonb_array_elements() and jsonb_array_elements_text()?",
              "answer": "Both expand a JSONB array into a set of rows. jsonb_array_elements() returns JSONB rows — string elements retain surrounding quotes (\"admin\"). jsonb_array_elements_text() returns TEXT rows — string elements have no quotes (admin). When comparing array elements in a WHERE clause, jsonb_array_elements_text() is cleaner: WHERE tag = 'admin' vs WHERE tag::TEXT = '\"admin\"'."
            },
            {
              "question": "How do you index a JSONB column for fast queries? What types of indexes are available?",
              "answer": "Three options: (1) Full GIN index: CREATE INDEX ON profiles USING GIN (data) — supports @>, ?, ?|, ?&. (2) jsonb_path_ops GIN: CREATE INDEX ON profiles USING GIN (data jsonb_path_ops) — smaller index, only supports @>. (3) Functional index on a specific path: CREATE INDEX ON profiles ((data->>'name')) or CREATE INDEX ON profiles ((data #>> '{address,city}')) — used for ->> or #>> equality comparisons in WHERE clauses. A GIN index does NOT help with ->> equality; you need a functional index for that."
            },
            {
              "question": "How would you build a JSONB object dynamically in a SELECT query?",
              "answer": "Use jsonb_build_object() with alternating key-value arguments: SELECT jsonb_build_object('id', id, 'name', data->>'name', 'city', data #>> '{address,city}') FROM profiles; For arrays, use jsonb_build_array(): SELECT jsonb_build_array('admin', 'user', 42); To aggregate multiple rows into a JSONB array, use jsonb_agg(): SELECT jsonb_agg(data ->> 'name') FROM profiles;"
            },
            {
              "question": "How do you get all keys of a JSONB document? How do you iterate over key-value pairs?",
              "answer": "To get all top-level keys as rows: SELECT jsonb_object_keys(data) FROM profiles; To get key-value pairs as rows (with JSONB values): SELECT key, value FROM profiles, jsonb_each(data); To get key-value pairs as rows (with TEXT values): SELECT key, value FROM profiles, jsonb_each_text(data); These are useful for inspecting dynamic schemas or pivoting data."
            },
            {
              "question": "What does jsonb_typeof() return and why is it useful?",
              "answer": "jsonb_typeof() returns the JSON type of a JSONB value as TEXT: 'object', 'array', 'string', 'number', 'boolean', or 'null'. It is useful for safely handling dynamic JSONB documents before casting — for example, checking that a field is a 'number' before casting to INT, or that it is an 'array' before calling jsonb_array_elements(). Without this check, operations on the wrong type throw runtime errors."
            },
            {
              "question": "What is the difference between @> and ? operators for checking array membership?",
              "answer": "Both can check if a JSONB array contains a value but work differently. @> checks for containment — the right side must be a JSONB array: data @> '{\"tags\": [\"admin\"]}'. It uses the GIN index. ? checks if a string exists as a value in a JSONB array or as a key in a JSONB object: data -> 'tags' ? 'admin'. It is more concise for simple string membership checks and also uses the GIN index. For nested array containment with complex conditions, @> is more expressive."
            }
          ]
        }
      ]
    },
    {
      "id": "summary",
      "type": "summary",
      "label": "Summary / Key Takeaways",
      "heading": "Quick Revision",
      "blocks": [
        {
          "type": "list",
          "items": [
            "UUID: globally unique ID for distributed systems — use gen_random_uuid().",
            "ENUM: fixed list of DB-enforced string values — hard to remove values, plan carefully.",
            "ARRAY: multi-value single column — use ANY() for membership, @> for containment.",
            "JSON: plain text storage, preserves order and whitespace — limited operator support.",
            "JSONB: binary storage, fast queries, GIN indexable, full operator set — always prefer over JSON.",
            "Generated Column: STORED expression auto-computed from other columns — cannot be set manually.",
            "-> returns JSONB, ->> returns TEXT, #> returns JSONB at path, #>> returns TEXT at path.",
            "@> checks containment (works on objects and arrays), ? checks key or value existence.",
            "?| means any key exists, ?& means all keys exist, <@ means left is contained by right.",
            "jsonb_set() updates a nested path, || merges top-level keys, - deletes a key, #- deletes at nested path.",
            "jsonb_array_elements() expands arrays to JSONB rows; jsonb_array_elements_text() expands to TEXT rows.",
            "jsonb_each() gives key-value rows, jsonb_object_keys() gives top-level keys, jsonb_typeof() gives value type.",
            "GIN index enables fast @>, ?, ?|, ?& queries. Functional index enables fast ->> equality queries.",
            "Use jsonb_strip_nulls() before storing, jsonb_agg() to aggregate rows, jsonb_build_object() to construct dynamically."
          ]
        }
      ]
    }
  ]
}