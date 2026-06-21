window.notePageData = {
    "title": "PostgreSQL vs MongoDB",
    "navLabel": "PostgreSQL vs MongoDB sections",
    "hero": {
        "type": "introduction",
        "label": "Introduction",
        "heading": "PostgreSQL vs MongoDB",
        "text": "PostgreSQL is a relational database that stores data in strictly-typed tables connected by foreign keys, while MongoDB is a document database that stores data as flexible JSON-like documents. The right choice depends on how structured your data is, how it changes over time, how it scales, and how strong your consistency guarantees need to be."
    },
    "nav": [
        { "label": "ACID vs BASE", "href": "#acid-base" },
        { "label": "Consistency vs Availability", "href": "#consistency-availability" },
        { "label": "Normalization vs Denormalization", "href": "#normalization" },
        { "label": "Vertical vs Horizontal Scaling", "href": "#scaling" },
        { "label": "Joins vs Embedding", "href": "#joins-embedding" },
        { "label": "Transactions", "href": "#transactions" },
        { "label": "Replication", "href": "#replication" },
        { "label": "Sharding", "href": "#sharding" },
        { "label": "Schema Design", "href": "#schema-design" },
        { "label": "Use Cases", "href": "#use-cases" },
        { "label": "Q&A", "href": "#qa" }
    ],
    "sections": [
        {
            "id": "acid-base",
            "type": "comparison",
            "label": "ACID vs BASE",
            "heading": "ACID (PostgreSQL) vs BASE (MongoDB)",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "ACID and BASE are two opposing philosophies for how a database guarantees correctness. PostgreSQL is built around ACID by default — every transaction is strict and predictable. MongoDB historically followed BASE — prioritising availability and speed over strict consistency — though modern MongoDB also supports ACID transactions when you explicitly ask for them."
                },
                {
                    "type": "paragraph",
                    "text": "We'll explain ACID fully through PostgreSQL first, then explain BASE fully through MongoDB, so each model is understood on its own terms before comparing them."
                },
                {
                    "type": "note",
                    "text": "ACID — Explained Through PostgreSQL"
                },
                {
                    "type": "paragraph",
                    "text": "ACID is a set of four guarantees that PostgreSQL enforces on every transaction by default, with no extra configuration needed."
                },
                {
                    "type": "qa",
                    "items": [
                        {
                            "question": "A — Atomicity",
                            "answer": "A transaction either fully completes or fully fails — there is no partial state left behind. If one statement inside a transaction fails, PostgreSQL discards every change made so far in that transaction, as if none of it ever ran."
                        },
                        {
                            "question": "C — Consistency",
                            "answer": "Every transaction moves the database from one valid state to another, never violating constraints, foreign keys, or CHECK rules. PostgreSQL refuses to commit a transaction that would leave the database in an invalid state."
                        },
                        {
                            "question": "I — Isolation",
                            "answer": "Concurrent transactions do not interfere with each other's intermediate, uncommitted state. PostgreSQL controls this with isolation levels (Read Committed by default, up to Serializable) so one transaction never sees another's half-finished work."
                        },
                        {
                            "question": "D — Durability",
                            "answer": "Once PostgreSQL returns COMMIT successfully, the change is permanently written to disk (via the Write-Ahead Log) and survives a crash, power loss, or restart — no committed data is ever lost."
                        }
                    ]
                },
                {
                    "type": "code",
                    "label": "PostgreSQL — all four ACID properties in one transaction",
                    "text": "BEGIN;\n\n-- Atomicity: both updates succeed together, or neither does\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\n\n-- Consistency: this CHECK constraint (defined on the table) blocks\n-- the commit entirely if balance ever goes negative\n-- e.g. CHECK (balance >= 0) on the accounts table\n\n-- Isolation: set explicitly if the default isn't strict enough\nSET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n\n-- Durability: once COMMIT returns, this is on disk permanently\nCOMMIT;"
                },
                {
                    "type": "short-answer",
                    "text": "In short: PostgreSQL gives you all four ACID guarantees automatically, on every transaction, with zero extra setup. This is why it's the default choice whenever correctness cannot be compromised — banking, payments, inventory."
                },
                {
                    "type": "note",
                    "text": "BASE — Explained Through MongoDB"
                },
                {
                    "type": "paragraph",
                    "text": "BASE describes the default behaviour of a distributed document database like MongoDB running across a replica set. Instead of guaranteeing strict correctness on every read, it favours staying responsive and lets data catch up over time."
                },
                {
                    "type": "qa",
                    "items": [
                        {
                            "question": "BA — Basically Available",
                            "answer": "MongoDB guarantees a response to every request, even during partial failures like a node going down. If the primary is unreachable, the replica set automatically elects a new primary so writes and reads can continue."
                        },
                        {
                            "question": "S — Soft State",
                            "answer": "The state of the data may change over time even without new writes from the application, because replicas are still catching up to each other in the background. What you read can shift as replication converges."
                        },
                        {
                            "question": "E — Eventual Consistency",
                            "answer": "Given enough time without new writes, all replicas will converge to the same value. A read from a secondary node right after a write might return slightly stale data, but it will become correct shortly after."
                        }
                    ]
                },
                {
                    "type": "code",
                    "label": "MongoDB — BASE behaviour with tunable read/write concern",
                    "text": "// Basically Available: this write returns fast, doesn't wait for every replica\ndb.accounts.updateOne(\n  { _id: 1 },\n  { $inc: { balance: -500 } },\n  { writeConcern: { w: 1 } }\n);\n\n// Soft State + Eventual Consistency: reading from a secondary\n// may return the OLD balance for a moment after the write above\ndb.accounts.find({ _id: 1 }).readPref(\"secondaryPreferred\");\n\n// You can dial BASE back toward stronger consistency when needed:\ndb.accounts.updateOne(\n  { _id: 1 },\n  { $inc: { balance: -500 } },\n  { writeConcern: { w: \"majority\" } }   // waits for most replicas\n);"
                },
                {
                    "type": "short-answer",
                    "text": "In short: MongoDB defaults to staying available and fast, accepting that replicas might briefly disagree. This is tunable per-operation — you trade some availability for consistency using writeConcern and readPref, but it's opt-in rather than automatic like PostgreSQL's ACID."
                },
                {
                    "type": "note",
                    "text": "So Why Wasn't ACID The Default In MongoDB?"
                },
                {
                    "type": "paragraph",
                    "text": "MongoDB did not lack ACID because document databases are technically incapable of it. It was a deliberate early design tradeoff, for three concrete reasons:"
                },
                {
                    "type": "list",
                    "ordered": true,
                    "items": [
                        "The document model was designed to remove the need for multi-document transactions in the first place. By embedding related data inside one document (like a user with their orders nested inside), a single write already updates everything atomically — there was simply nothing left that needed a cross-document transaction.",
                        "Coordinating a transaction across multiple documents, possibly on different shards or replica set members, requires distributed locking and a coordination protocol. That adds real latency and complexity, which conflicted with MongoDB's original priority of staying fast and horizontally scalable above all else.",
                        "Early MongoDB was built and marketed around the AP side of the CAP theorem — always available, eventually consistent. Strict, blocking, serialisable transactions are fundamentally a CP-style guarantee, which pulls in the opposite direction of that original design goal."
                    ]
                },
                {
                    "type": "paragraph",
                    "text": "As applications matured, teams kept running into the other 10-20% of cases — payments, inventory counts, anything touching multiple documents at once — where embedding wasn't enough and they needed a real guarantee. That demand is what pushed MongoDB to add multi-document ACID transactions in version 4.0 (2018), and later extend them across sharded clusters in 4.2."
                },
                {
                    "type": "table",
                    "headers": ["Point", "Why it mattered"],
                    "rows": [
                        ["Single-document writes", "Were already atomic from MongoDB's very first release — this is not what changed in 4.0"],
                        ["Multi-document transactions", "Did not exist before 4.0 — this is specifically what was added"],
                        ["Why so late (2018, ~9 years after launch)", "Required solving distributed consensus and locking across replica sets without destroying the performance MongoDB was known for"],
                        ["Why still not the default today", "Every transaction adds locking and coordination overhead, so MongoDB keeps it opt-in rather than forcing it onto every write"]
                    ]
                },
                {
                    "type": "interview",
                    "text": "Interview framing: don't say \"MongoDB doesn't have ACID.\" Say \"MongoDB's document model made single-document atomicity enough for most use cases, so multi-document ACID transactions were added later, in v4.0, as an opt-in feature rather than the default behaviour PostgreSQL gives you automatically.\" That answer shows you understand the design reasoning, not just the trivia."
                },
                {
                    "type": "remember",
                    "text": "MongoDB has supported multi-document ACID transactions since version 4.0, opt-in via startSession() and withTransaction(). But the database's natural, default behaviour for everyday single-document writes is still BASE-style — fast and eventually consistent, not strictly serialised like PostgreSQL."
                },
                {
                    "type": "table",
                    "headers": ["Property", "PostgreSQL (ACID)", "MongoDB (BASE, default)"],
                    "rows": [
                        ["Guarantee style", "Strict, guaranteed automatically", "Relaxed by default, tunable per operation"],
                        ["On a node failure", "May reject requests to protect correctness", "Keeps responding via automatic failover"],
                        ["Read freshness", "Always reflects the latest commit", "May briefly lag on secondary reads"],
                        ["Configuration needed for strict mode", "None — ACID is the default", "Yes — explicit transactions + majority writeConcern"]
                    ]
                }
            ]
        },
        {
            "id": "consistency-availability",
            "type": "comparison",
            "label": "Consistency vs Availability",
            "heading": "Consistency vs Availability",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "This tradeoff comes directly from the CAP theorem. During a network partition, a distributed system must choose between returning the most correct answer (consistency) or always returning some answer (availability)."
                },
                {
                    "type": "table",
                    "headers": ["Point", "PostgreSQL", "MongoDB"],
                    "rows": [
                        ["Default behaviour", "Strongly consistent — reads always reflect the latest committed write", "Tunable — can be strongly or eventually consistent depending on settings"],
                        ["Single-node reads", "Always consistent", "Always consistent"],
                        ["Replica reads", "Consistent if reading from the primary; replicas can lag slightly", "Configurable via read preference and read concern"],
                        ["Write guarantee", "Synchronous commit by default", "Configurable via write concern (w: 1, majority, etc.)"],
                        ["Typical tradeoff made", "Favors consistency over availability during failures", "Favors availability, with consistency tunable per operation"]
                    ]
                },
                {
                    "type": "code",
                    "label": "MongoDB — tuning consistency per query",
                    "text": "// Strong consistency: wait for majority of replica set to acknowledge\ndb.orders.insertOne(\n  { customer: \"Aman\", total: 1200 },\n  { writeConcern: { w: \"majority\" } }\n);\n\n// Read from primary only — strongest read guarantee\ndb.orders.find().readPref(\"primary\");\n\n// Read from any replica — faster, may be slightly stale\ndb.orders.find().readPref(\"secondaryPreferred\");"
                },
                {
                    "type": "code",
                    "label": "PostgreSQL — read from a replica (logical replication setup)",
                    "text": "-- On a read replica, queries automatically reflect replicated data\n-- Application simply connects to a different connection string:\n\n-- Primary (writes)\npsql \"host=primary.db.internal dbname=app user=app_user\"\n\n-- Replica (reads)\npsql \"host=replica.db.internal dbname=app user=app_user\""
                },
                {
                    "type": "warning",
                    "text": "Reading from a PostgreSQL replica or a MongoDB secondary can return slightly stale data. Never read financial balances from a replica right after a write unless the application explicitly waits for replication to catch up."
                }
            ]
        },
        {
            "id": "normalization",
            "type": "comparison",
            "label": "Normalization vs Denormalization",
            "heading": "Normalization (PostgreSQL) vs Denormalization (MongoDB)",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "Normalization splits data into separate tables to eliminate duplication and enforce integrity. Denormalization duplicates or nests data together so the most common reads need no joins at all."
                },
                {
                    "type": "code",
                    "label": "PostgreSQL — normalized schema (3 tables)",
                    "text": "CREATE TABLE users (\n    id    SERIAL PRIMARY KEY,\n    name  VARCHAR(100) NOT NULL,\n    email VARCHAR(150) UNIQUE NOT NULL\n);\n\nCREATE TABLE orders (\n    id      SERIAL PRIMARY KEY,\n    user_id INT REFERENCES users(id),\n    total   NUMERIC(10,2) NOT NULL,\n    created_at TIMESTAMP DEFAULT now()\n);\n\nCREATE TABLE order_items (\n    id       SERIAL PRIMARY KEY,\n    order_id INT REFERENCES orders(id),\n    product  VARCHAR(150),\n    qty      INT\n);"
                },
                {
                    "type": "code",
                    "label": "MongoDB — denormalized document (embedded)",
                    "text": "{\n  \"_id\": \"u101\",\n  \"name\": \"Aman\",\n  \"email\": \"aman@example.com\",\n  \"orders\": [\n    {\n      \"id\": \"o501\",\n      \"total\": 1200,\n      \"createdAt\": \"2026-06-01T10:00:00Z\",\n      \"items\": [\n        { \"product\": \"Keyboard\", \"qty\": 1 },\n        { \"product\": \"Mouse\", \"qty\": 1 }\n      ]\n    }\n  ]\n}"
                },
                {
                    "type": "table",
                    "headers": ["Point", "Normalization (PostgreSQL)", "Denormalization (MongoDB)"],
                    "rows": [
                        ["Data duplication", "Minimal — each fact stored once", "Common — data duplicated for read speed"],
                        ["Update cost", "Cheap — update one row", "Can be expensive if duplicated data must change everywhere"],
                        ["Read cost", "May require multiple joins", "Usually a single document fetch"],
                        ["Storage", "More space-efficient", "Less space-efficient due to duplication"],
                        ["Best when", "Data integrity and relationships matter most", "Read speed for a known access pattern matters most"]
                    ]
                },
                {
                    "type": "tip",
                    "text": "In MongoDB, model your documents around how the application reads data, not around how the data looks. In PostgreSQL, model your tables around the real-world entities and let JOINs handle the reads."
                }
            ]
        },
        {
            "id": "scaling",
            "type": "comparison",
            "label": "Vertical vs Horizontal Scaling",
            "heading": "Vertical Scaling vs Horizontal Scaling",
            "blocks": [
                {
                    "type": "definitions",
                    "items": [
                        {
                            "term": "Vertical Scaling",
                            "definition": "Increasing the resources (CPU, RAM, disk) of a single server. This is PostgreSQL's traditional default growth path."
                        },
                        {
                            "term": "Horizontal Scaling",
                            "definition": "Adding more servers and distributing data and load across them. This is MongoDB's default growth path via sharding."
                        }
                    ]
                },
                {
                    "type": "table",
                    "headers": ["Point", "PostgreSQL", "MongoDB"],
                    "rows": [
                        ["Default scaling style", "Vertical — bigger machine", "Horizontal — more machines via sharding"],
                        ["Horizontal scaling support", "Possible via Citus, partitioning, or read replicas, but needs setup", "Built in natively via sharded clusters"],
                        ["Read scaling", "Read replicas", "Replica sets with secondary reads"],
                        ["Write scaling", "Harder — usually a single writable primary", "Easier — writes distributed across shards by shard key"],
                        ["Operational complexity", "Lower at small-to-medium scale", "Higher once sharding is introduced"]
                    ]
                },
                {
                    "type": "code",
                    "label": "PostgreSQL — table partitioning (a step toward horizontal-style scaling)",
                    "text": "CREATE TABLE orders (\n    id INT,\n    created_at DATE NOT NULL,\n    total NUMERIC(10,2)\n) PARTITION BY RANGE (created_at);\n\nCREATE TABLE orders_2026_q1 PARTITION OF orders\n    FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');\n\nCREATE TABLE orders_2026_q2 PARTITION OF orders\n    FOR VALUES FROM ('2026-04-01') TO ('2026-07-01');"
                },
                {
                    "type": "code",
                    "label": "MongoDB — enabling sharding on a collection",
                    "text": "sh.enableSharding(\"ecommerce\");\n\nsh.shardCollection(\n  \"ecommerce.orders\",\n  { user_id: \"hashed\" }\n);"
                }
            ]
        },
        {
            "id": "joins-embedding",
            "type": "comparison",
            "label": "Joins vs Embedding",
            "heading": "Joins (PostgreSQL) vs Embedding (MongoDB)",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "PostgreSQL connects related data at query time using JOINs. MongoDB avoids joins by embedding related data directly inside a parent document, though it also supports referencing other documents when embedding doesn't fit."
                },
                {
                    "type": "code",
                    "label": "PostgreSQL — JOIN across tables",
                    "text": "SELECT u.name, o.id AS order_id, o.total\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id\nWHERE u.id = 1\nORDER BY o.created_at DESC;"
                },
                {
                    "type": "code",
                    "label": "MongoDB — embedding (no join needed)",
                    "text": "// Single read returns everything\ndb.users.findOne({ _id: \"u101\" });\n\n// Result already contains nested orders array — no second query"
                },
                {
                    "type": "code",
                    "label": "MongoDB — referencing + $lookup (join-like behaviour)",
                    "text": "// orders collection stores user_id as a reference, not embedded\ndb.orders.aggregate([\n  { $match: { user_id: \"u101\" } },\n  {\n    $lookup: {\n      from: \"users\",\n      localField: \"user_id\",\n      foreignField: \"_id\",\n      as: \"user\"\n    }\n  }\n]);"
                },
                {
                    "type": "table",
                    "headers": ["Point", "PostgreSQL JOIN", "MongoDB Embedding", "MongoDB $lookup"],
                    "rows": [
                        ["Query complexity", "Single query, multiple tables", "Single query, single document", "Single query, multiple collections"],
                        ["Performance at scale", "Good with proper indexes", "Fastest — no join cost", "Slower than embedding, similar to a SQL join"],
                        ["Data duplication", "None", "Possible", "None"],
                        ["Use when", "Relationships are core to many queries", "Child data is always read with the parent", "Child data is large, shared, or queried independently"]
                    ]
                }
            ]
        },
        {
            "id": "transactions",
            "type": "notes",
            "label": "Transactions",
            "heading": "Transactions",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "A transaction groups multiple operations so they succeed or fail together. PostgreSQL transactions are unrestricted across any number of tables. MongoDB transactions work across multiple documents and collections but are typically used more sparingly due to performance overhead."
                },
                {
                    "type": "paragraph",
                    "text": "We'll use one running example across both databases — transferring money between two accounts. The transfer must debit one account and credit another as a single atomic unit; if either step fails, both must roll back."
                },
                {
                    "type": "code",
                    "label": "PostgreSQL — raw SQL transaction with rollback on error",
                    "text": "BEGIN;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\n\n-- SAVEPOINT lets you roll back part of a transaction\nSAVEPOINT before_credit;\n\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- Business rule check — if sender went negative, undo just the debit\n-- (in practice you'd check this in application code before COMMIT)\nROLLBACK TO before_credit;  -- only runs if the check failed\n\nCOMMIT;"
                },
                {
                    "type": "paragraph",
                    "text": "In a real backend you rarely write raw BEGIN/COMMIT — you use an ORM. Here is the exact same transfer using Prisma (PostgreSQL) and Mongoose (MongoDB)."
                },
                {
                    "type": "code",
                    "label": "Prisma schema — accounts model",
                    "text": "// schema.prisma\nmodel Account {\n  id      Int    @id @default(autoincrement())\n  email   String @unique\n  balance Decimal @default(0) @db.Decimal(10, 2)\n}"
                },
                {
                    "type": "code",
                    "label": "Prisma — interactive transaction (recommended for dependent steps)",
                    "text": "import { PrismaClient, Prisma } from '@prisma/client';\nconst prisma = new PrismaClient();\n\nasync function transfer(fromEmail: string, toEmail: string, amount: number) {\n  return prisma.$transaction(async (tx) => {\n    // 1. Debit sender — tx behaves exactly like prisma, but scoped to this transaction\n    const sender = await tx.account.update({\n      where: { email: fromEmail },\n      data: { balance: { decrement: amount } },\n    });\n\n    // 2. Business rule check — if this throws, Prisma auto rolls back everything above\n    if (sender.balance.toNumber() < 0) {\n      throw new Error(`${fromEmail} has insufficient funds`);\n    }\n\n    // 3. Credit receiver\n    const receiver = await tx.account.update({\n      where: { email: toEmail },\n      data: { balance: { increment: amount } },\n    });\n\n    return { sender, receiver };\n  }, {\n    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,\n    timeout: 5000, // ms — abort if the transaction runs too long\n  });\n}"
                },
                {
                    "type": "code",
                    "label": "Prisma — sequential (batch) transaction for independent operations",
                    "text": "// Use the array form when operations DON'T depend on each other's result.\n// All run in one transaction; if any fails, all are rolled back.\nconst [order, orderItem] = await prisma.$transaction([\n  prisma.order.create({\n    data: { userId: 1, total: 1200 },\n  }),\n  prisma.orderItem.create({\n    data: { orderId: 1, product: 'Keyboard', qty: 1 },\n  }),\n]);"
                },
                {
                    "type": "tip",
                    "text": "Use Prisma's array syntax ($transaction([...])) when queries are independent — it's faster because Prisma can prepare them together. Use the interactive callback ($transaction(async (tx) => {...})) only when a later step depends on an earlier step's result, like the balance check above."
                },
                {
                    "type": "code",
                    "label": "Mongoose schema — Account model",
                    "text": "// models/Account.js\nconst { Schema, model } = require('mongoose');\n\nconst accountSchema = new Schema({\n  email:   { type: String, required: true, unique: true },\n  balance: { type: Number, required: true, default: 0 },\n});\n\nmodule.exports = model('Account', accountSchema);"
                },
                {
                    "type": "code",
                    "label": "Mongoose — transaction using withTransaction() (recommended)",
                    "text": "const mongoose = require('mongoose');\nconst Account = require('./models/Account');\n\nasync function transfer(fromEmail, toEmail, amount) {\n  const session = await mongoose.startSession();\n\n  try {\n    await session.withTransaction(async () => {\n      // 1. Debit sender — must pass { session } on every operation\n      const sender = await Account.findOneAndUpdate(\n        { email: fromEmail },\n        { $inc: { balance: -amount } },\n        { new: true, session }\n      );\n\n      // 2. Business rule check — throwing here aborts the whole transaction\n      if (sender.balance < 0) {\n        throw new Error(`${fromEmail} has insufficient funds`);\n      }\n\n      // 3. Credit receiver\n      await Account.findOneAndUpdate(\n        { email: toEmail },\n        { $inc: { balance: amount } },\n        { session }\n      );\n    });\n    // withTransaction already committed by this point\n  } finally {\n    // Always clean up the session, success or failure\n    await session.endSession();\n  }\n}"
                },
                {
                    "type": "code",
                    "label": "Mongoose — manual transaction (more control over commit/abort)",
                    "text": "const session = await mongoose.startSession();\nsession.startTransaction();\n\ntry {\n  const order = await Order.create(\n    [{ userId: 1, total: 1200 }],   // Note: array required when passing { session }\n    { session }\n  );\n\n  await OrderItem.create(\n    [{ orderId: order[0]._id, product: 'Keyboard', qty: 1 }],\n    { session }\n  );\n\n  await session.commitTransaction();\n} catch (err) {\n  await session.abortTransaction();\n  throw err;\n} finally {\n  session.endSession();\n}"
                },
                {
                    "type": "warning",
                    "text": "MongoDB transactions only work against a replica set or sharded cluster — a standalone mongod instance will throw an error. Mongoose's Model.create() also requires the data to be wrapped in an array when passing a session option, which is a common source of bugs."
                },
                {
                    "type": "table",
                    "headers": ["Point", "PostgreSQL (Prisma)", "MongoDB (Mongoose)"],
                    "rows": [
                        ["Scope", "Any number of tables and rows, no special setup needed", "Multi-document, multi-collection — requires a replica set"],
                        ["Recommended API", "$transaction(async (tx) => {...}) for dependent steps", "session.withTransaction(async () => {...}) — auto retries transient errors"],
                        ["Independent operations", "$transaction([...]) array form — runs as one batch", "No array form — wrap in withTransaction() regardless"],
                        ["Auto-rollback on throw", "Yes — any thrown error rolls back the whole tx block", "Yes, only when using withTransaction(); manual sessions need explicit abortTransaction()"],
                        ["Default for single write", "Atomic within the statement, no transaction needed", "Always atomic for a single document, no transaction needed"],
                        ["Performance cost", "Low — core to the PostgreSQL engine", "Higher — adds locking, network, and retry overhead"],
                        ["Common usage", "Used freely and often, even for simple multi-row writes", "Used selectively — only when atomicity across documents truly matters"]
                    ]
                },
                {
                    "type": "remember",
                    "text": "In Prisma, just throwing a regular Error inside $transaction is enough to trigger a full rollback — you never call rollback manually. In Mongoose with withTransaction(), the same is true. Only the manual session.startTransaction() pattern requires you to call abortTransaction() yourself."
                },
                {
                    "type": "warning",
                    "text": "Overusing multi-document transactions in MongoDB defeats the purpose of choosing a document database. If you need transactions on most writes, that's often a signal the data may fit a relational model better."
                }
            ]
        },
        {
            "id": "replication",
            "type": "notes",
            "label": "Replication",
            "heading": "Replication",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "Replication copies data across multiple servers so reads can be distributed and the system can survive a node failure. PostgreSQL uses a primary-replica model; MongoDB uses replica sets with automatic failover."
                },
                {
                    "type": "code",
                    "label": "PostgreSQL — setting up streaming replication (postgresql.conf on primary)",
                    "text": "# postgresql.conf\nwal_level = replica\nmax_wal_senders = 5\nmax_replication_slots = 5\n\n# pg_hba.conf — allow the replica to connect\nhost replication replicator 10.0.0.0/24 md5"
                },
                {
                    "type": "code",
                    "label": "MongoDB — initiating a replica set",
                    "text": "rs.initiate({\n  _id: \"rs0\",\n  members: [\n    { _id: 0, host: \"mongo1:27017\" },\n    { _id: 1, host: \"mongo2:27017\" },\n    { _id: 2, host: \"mongo3:27017\" }\n  ]\n});\n\n// Check status and current primary\nrs.status();"
                },
                {
                    "type": "table",
                    "headers": ["Point", "PostgreSQL", "MongoDB"],
                    "rows": [
                        ["Model", "Primary-replica (streaming replication)", "Replica set (primary + secondaries)"],
                        ["Failover", "Manual or via tools like Patroni/repmgr", "Automatic — secondaries elect a new primary"],
                        ["Read scaling", "Route reads to replicas manually", "Built-in read preference settings"],
                        ["Replication type", "Physical (WAL-based) or logical", "Oplog-based, asynchronous by default"]
                    ]
                },
                {
                    "type": "note",
                    "text": "MongoDB's automatic failover means less manual operational work, but PostgreSQL's replication is extremely mature and battle-tested, especially when paired with tools like Patroni for automated failover."
                }
            ]
        },
        {
            "id": "sharding",
            "type": "notes",
            "label": "Sharding",
            "heading": "Sharding",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "Sharding splits a large dataset across multiple servers, each holding a portion of the data. MongoDB has sharding built into its architecture. PostgreSQL needs an extension or external tool to shard natively."
                },
                {
                    "type": "code",
                    "label": "MongoDB — sharding a collection by a shard key",
                    "text": "sh.enableSharding(\"ecommerce\");\n\n// Hashed shard key spreads writes evenly across shards\nsh.shardCollection(\n  \"ecommerce.orders\",\n  { user_id: \"hashed\" }\n);\n\n// Range-based shard key — good for range queries\nsh.shardCollection(\n  \"ecommerce.events\",\n  { created_at: 1 }\n);"
                },
                {
                    "type": "code",
                    "label": "PostgreSQL — sharding via the Citus extension",
                    "text": "CREATE EXTENSION citus;\n\n-- Mark a table as distributed across worker nodes\nSELECT create_distributed_table('orders', 'user_id');\n\n-- Add a worker node to the cluster\nSELECT citus_add_node('worker1.db.internal', 5432);"
                },
                {
                    "type": "table",
                    "headers": ["Point", "PostgreSQL", "MongoDB"],
                    "rows": [
                        ["Native support", "No — requires Citus or manual partitioning + routing", "Yes — built into the database"],
                        ["Shard key choice", "Defined when distributing a table (Citus)", "Defined when sharding a collection"],
                        ["Operational maturity", "Newer in the SQL world, growing fast", "Mature, used at very large scale (e.g. by large SaaS platforms)"],
                        ["Resharding", "Harder — depends on the tool used", "Supported, but still an operationally heavy task"]
                    ]
                },
                {
                    "type": "remember",
                    "text": "Choosing a bad shard key is one of the most expensive mistakes in either system — it can lead to hot shards where one server gets far more traffic than the others."
                }
            ]
        },
        {
            "id": "schema-design",
            "type": "notes",
            "label": "Schema Design",
            "heading": "Schema Design",
            "blocks": [
                {
                    "type": "paragraph",
                    "text": "PostgreSQL enforces schema at the database level — every row must match the table definition. MongoDB schema is flexible by default but can be enforced using JSON Schema validation rules."
                },
                {
                    "type": "code",
                    "label": "PostgreSQL — schema with constraints",
                    "text": "CREATE TABLE products (\n    id    SERIAL PRIMARY KEY,\n    name  VARCHAR(150) NOT NULL,\n    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),\n    category VARCHAR(50) NOT NULL,\n    in_stock BOOLEAN DEFAULT true\n);\n\n-- Adding a new constraint later requires a migration\nALTER TABLE products\n    ADD CONSTRAINT category_check\n    CHECK (category IN ('electronics', 'clothing', 'books'));"
                },
                {
                    "type": "code",
                    "label": "MongoDB — schema validation rules",
                    "text": "db.createCollection(\"products\", {\n  validator: {\n    $jsonSchema: {\n      bsonType: \"object\",\n      required: [\"name\", \"price\", \"category\"],\n      properties: {\n        name:  { bsonType: \"string\" },\n        price: { bsonType: \"number\", minimum: 0 },\n        category: {\n          enum: [\"electronics\", \"clothing\", \"books\"]\n        }\n      }\n    }\n  }\n});"
                },
                {
                    "type": "table",
                    "headers": ["Point", "PostgreSQL", "MongoDB"],
                    "rows": [
                        ["Default enforcement", "Strict — always enforced", "Optional — flexible unless validation rules are added"],
                        ["Changing the schema", "Requires ALTER TABLE migration", "Just start writing new fields; old documents stay as-is"],
                        ["Data type safety", "Strong, enforced by column types", "Weaker unless validation schema is used"],
                        ["Best practice", "Plan schema upfront, migrate carefully", "Add validation rules once the shape stabilises"]
                    ]
                },
                {
                    "type": "tip",
                    "text": "Treat MongoDB's flexible schema as a starting convenience, not a long-term excuse to skip validation. Add $jsonSchema rules once your collection's shape is established in production."
                }
            ]
        },
        {
            "id": "use-cases",
            "type": "use-cases",
            "label": "Real-world Use Cases",
            "heading": "Real-World Use Cases",
            "blocks": [
                {
                    "type": "table",
                    "headers": ["Scenario", "Better Fit", "Why"],
                    "rows": [
                        ["Banking and payments", "PostgreSQL", "Strict ACID transactions and relational integrity are mandatory"],
                        ["Inventory and ERP systems", "PostgreSQL", "Heavy relationships between products, warehouses, and suppliers"],
                        ["Content management / blogging platform", "MongoDB", "Flexible content blocks and varying post structures fit documents well"],
                        ["Product catalog with varying attributes", "MongoDB", "A laptop and a T-shirt have completely different fields"],
                        ["Real-time analytics dashboards", "MongoDB (or wide-column NoSQL)", "High write volume and flexible event shapes"],
                        ["User authentication and roles", "PostgreSQL", "Strong consistency and well-defined relational structure"],
                        ["IoT sensor data ingestion", "MongoDB", "High-volume writes with varying sensor payload shapes"],
                        ["Reporting and BI tools", "PostgreSQL", "Complex joins, aggregations, and SQL tooling compatibility"],
                        ["Mobile app backend with rapid iteration", "MongoDB", "Schema flexibility supports fast-changing app requirements"],
                        ["Multi-tenant SaaS with strict billing", "PostgreSQL", "Transactions and relational integrity protect billing accuracy"]
                    ]
                },
                {
                    "type": "list",
                    "items": [
                        "Use PostgreSQL when your data is naturally relational and correctness cannot be compromised.",
                        "Use MongoDB when your data shape varies, changes often, or needs to scale horizontally with ease.",
                        "Many real production systems use PostgreSQL for core transactional data and MongoDB for flexible, high-volume content alongside it."
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
                            "question": "Does MongoDB support ACID transactions like PostgreSQL?",
                            "answer": "Yes, since version 4.0, MongoDB supports multi-document ACID transactions. However, they carry more performance overhead than in PostgreSQL, where transactions are core to the engine and used freely."
                        },
                        {
                            "question": "Can PostgreSQL store flexible, schema-less data like MongoDB?",
                            "answer": "Yes, using the JSONB column type. PostgreSQL can store and query JSON documents with indexing support, combining relational structure with document-style flexibility for specific columns."
                        },
                        {
                            "question": "Is MongoDB always faster than PostgreSQL?",
                            "answer": "Not necessarily. MongoDB is often faster for simple document reads that avoid joins. PostgreSQL with proper indexes can be just as fast or faster for relational queries, and is often faster for complex aggregations and joins."
                        },
                        {
                            "question": "Can PostgreSQL scale horizontally like MongoDB?",
                            "answer": "Yes, but it requires extensions like Citus or manual sharding and routing logic. MongoDB has horizontal scaling built into its core architecture from the start."
                        },
                        {
                            "question": "When should I avoid embedding in MongoDB?",
                            "answer": "Avoid embedding when the embedded data grows unbounded (like comments on a popular post), is frequently updated independently, or needs to be queried on its own outside the parent document. Use references and $lookup in those cases instead."
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
                        "PostgreSQL follows ACID by default; MongoDB follows BASE by default but supports ACID transactions when needed.",
                        "PostgreSQL favors consistency; MongoDB allows tuning between consistency and availability per operation.",
                        "PostgreSQL normalizes data into related tables; MongoDB denormalizes by embedding related data together.",
                        "PostgreSQL traditionally scales vertically; MongoDB is built for horizontal scaling via native sharding.",
                        "PostgreSQL uses JOINs to connect data; MongoDB uses embedding or $lookup depending on the access pattern.",
                        "PostgreSQL transactions are cheap and used everywhere; MongoDB transactions are more selective due to overhead.",
                        "PostgreSQL replication is primary-replica with manual or tool-based failover; MongoDB replica sets failover automatically.",
                        "PostgreSQL needs an extension like Citus to shard; MongoDB has sharding built into its core.",
                        "PostgreSQL enforces schema strictly by default; MongoDB schema is flexible unless validation rules are added.",
                        "Choose PostgreSQL for relational integrity and transactions; choose MongoDB for flexible, fast-changing, high-scale document data."
                    ]
                }
            ]
        }
    ]
};