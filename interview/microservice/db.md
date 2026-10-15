# Database Architecture in Microservices — Complete Notes

Technologies: Node.js + MongoDB + PostgreSQL Priority: ⭐ Very Important Focus: Architecture, database ownership, isolation, scaling, configuration, and interview preparation.

## MongoDB — Database Architecture Comparison

| Level     | Architecture                                                         | Advantages                                                                        | Disadvantages                                                |
| --------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Level 1   | Same cluster → Same database → Separate collections                  | Simple setup, low cost, easy maintenance.                                         | Weak logical isolation; collection-level permissions needed. |
| Level 2 ⭐ | Same cluster → Separate databases → Separate collections per service | Clear data ownership, easier database-level security, independent schema changes. | Shared CPU/RAM; cluster failure can affect all services.     |
| Level 3   | Separate clusters → Separate databases                               | Independent scaling, stronger fault isolation, dedicated resources.               | Higher cost, complex deployment and monitoring.              |

## PostgreSQL — Database Architecture Comparison

| Level     | Architecture                                     | Advantages                                                                      | Disadvantages                                                |
| --------- | ------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Level 1   | Same instance → Same database → Separate schemas | Simple setup, low cost, schema-level separation.                                | Shared resources; requires careful schema/table permissions. |
| Level 2 ⭐ | Same instance → Separate databases               | Clear database ownership, easier access control, independent schema migrations. | Shared CPU/RAM; instance failure affects all databases.      |
| Level 3   | Separate instances/clusters → Separate databases | Independent scaling, stronger fault isolation, dedicated resources.             | Higher infrastructure cost, more maintenance and monitoring. |

Interview takeaway:

- Level 1: Basic logical separation — suitable for smaller applications.
- Level 2 ⭐: Database-level logical separation — good practical starting point for microservices.
- Level 3: Infrastructure-level isolation — preferred when independent database scaling, reliability, or security requirements justify the cost.

Remember: All three approaches can support microservices. The most important principle is independent data ownership, not the number of databases or clusters.





## 1. Database Architecture in Microservices

In microservices architecture, an application is divided into multiple independent services, each responsible for a particular business capability.

For example, a Digital Property Transfer System might contain:

- Auth Service: Users, login, registration, and authentication.
- Property Service: Property information and transactions.
- Document Service: Document metadata and verification.
- Review Service: Property ratings and reviews.
- Payment Service: Payment processing and refunds.

The most important database design principle is:

Each microservice should own its data. Other services should communicate through APIs or events instead of directly accessing another service's database tables or collections.

There are three common ways to organize microservice data in MongoDB and PostgreSQL.

| Approach | MongoDB                             | PostgreSQL                        |
| -------- | ----------------------------------- | --------------------------------- |
| 1        | Same database, separate collections | Same database, separate schemas   |
| 2 ⭐      | Same cluster, separate databases    | Same instance, separate databases |
| 3        | Separate clusters                   | Separate instances/clusters       |

These approaches differ mainly in logical isolation, security boundaries, resource sharing, infrastructure scaling, and operational cost.

# 2. Approach 1 — Same Database, Separate Collections or Schemas

## 2.1 MongoDB: Same Database, Separate Collections

All microservices connect to one MongoDB database, but every microservice owns specific collections.

MongoDB Cluster

Database: property_portal

Auth Service

users, sessions

Property Service

properties

Document Service

documents

Review Service

reviews

All collections exist inside one logical database, with separate service ownership.

### Example structure

```
MongoDB Cluster
└── property_portal
    ├── users            → Auth Service
    ├── sessions         → Auth Service
    ├── properties       → Property Service
    ├── documents        → Document Service
    └── reviews          → Review Service
```

Configuration example

```
# Auth Service
MONGO_URI=mongodb+srv://auth_user:<password>@cluster.example.mongodb.net/property_portal

# Review Service
MONGO_URI=mongodb+srv://review_user:<password>@cluster.example.mongodb.net/property_portal
```

Both services use the same database but should have different database users.

Important: MongoDB's built-in database-level `readWrite` role would give access to all collections in that database. To enforce collection ownership, configure custom collection-level roles.

### Advantages

- Simple database setup and administration.
- Suitable for small systems or gradual monolith migrations.
- Services can independently manage their application logic.
- Infrastructure cost is low because everything uses the same cluster.

### Disadvantages

- Weaker separation between service data.
- Collection-level access control requires additional configuration.
- Developers may accidentally access another service's collections.
- Database-wide changes and operations may affect multiple services.
- Shared cluster resource contention and failures remain possible.

## 2.2 PostgreSQL: Same Database, Separate Schemas

In PostgreSQL, the comparable approach is to use separate schemas.

A schema is a logical namespace inside a PostgreSQL database that contains tables and other database objects.

```
PostgreSQL Instance
└── property_portal
    ├── auth_schema
    │   ├── users
    │   └── sessions
    │
    ├── property_schema
    │   └── properties
    │
    ├── document_schema
    │   └── documents
    │
    └── review_schema
        └── reviews
```

### Example SQL

```
CREATE DATABASE property_portal;

-- Connect to property_portal

CREATE SCHEMA auth_schema;
CREATE SCHEMA property_schema;
CREATE SCHEMA review_schema;

CREATE TABLE auth_schema.users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE property_schema.properties (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200) NOT NULL
);
```

### Configuration

```
# Auth Service
DATABASE_URL=postgresql://auth_user:<password>@localhost:5432/property_portal

# Review Service
DATABASE_URL=postgresql://review_user:<password>@localhost:5432/property_portal
```

The database name is identical. Each service should use its own login role with access restricted to its schema and tables.

For example, Auth Service can manage `auth_schema.users` but should not access `property_schema.properties`.

### Advantages

- Schemas make business boundaries explicit.
- Schema-level access controls can enforce ownership.
- Easy to introduce when splitting a monolith.
- Centralized database infrastructure simplifies administration.

### Disadvantages

- All services share a database and PostgreSQL instance.
- Incorrect privileges can permit cross-service queries.
- Database-wide operations create shared dependencies.
- Independent database-level administration and migration are limited.

### MongoDB vs PostgreSQL at Level 1

| MongoDB                       | PostgreSQL                  |
| ----------------------------- | --------------------------- |
| One database                  | One database                |
| Collections owned by services | Schemas owned by services   |
| Collection-level roles        | Schema and table privileges |
| `property_portal.reviews`     | `review_schema.reviews`     |

Technical distinction: A MongoDB collection corresponds more closely to a PostgreSQL table. PostgreSQL schemas are namespaces for multiple objects, so these designs are conceptually similar but not structurally identical.

# 3. Approach 2 — Same Cluster or Instance, Separate Databases ⭐

This is often a good practical starting approach for microservices when the workload does not justify dedicated database infrastructure for each service.

## 3.1 MongoDB: Same Cluster, Separate Databases

All microservices use one MongoDB cluster, but each owns a different logical database.

Shared MongoDB Cluster

Auth Service

auth_db

Property Service

property_db

Document Service

document_db

Review Service

review_db

### Structure

```
MongoDB Cluster
├── auth_db
│   ├── users
│   └── sessions
│
├── property_db
│   ├── properties
│   └── transactions
│
├── document_db
│   └── documents
│
└── review_db
    └── reviews
```

### Configuration

```
# Auth Service
MONGO_URI=mongodb+srv://auth_user:<password>@cluster.example.mongodb.net/auth_db

# Property Service
MONGO_URI=mongodb+srv://property_user:<password>@cluster.example.mongodb.net/property_db

# Review Service
MONGO_URI=mongodb+srv://review_user:<password>@cluster.example.mongodb.net/review_db
```

Notice:

- The hostname is the same.
- Each database name is different.
- Each service can have its own database credentials.
- Each user should have permissions only for its respective database.

For example, `auth_user` can receive the `readWrite` role on `auth_db` without receiving access to `property_db`.

### Advantages

1. Clear database ownership: Each service manages its own database.
2. Simpler permissions: Database-level access controls are straightforward.
3. Independent schema evolution: One service can modify its collections without changing another service's database.
4. Easier future migration: Individual databases can be moved to dedicated clusters.
5. Lower infrastructure cost: All databases share one cluster.

### Disadvantages

- CPU, memory, storage capacity, and database connections are still shared.
- A cluster-wide outage can affect all services.
- Heavy traffic from one service may impact another.
- Database infrastructure cannot scale independently per service.
- Cross-service data consistency still needs explicit coordination.

## 3.2 PostgreSQL: Same Instance, Separate Databases

In PostgreSQL, one server instance can manage multiple databases.

```
PostgreSQL Instance
├── auth_db
│   └── public.users
│
├── property_db
│   └── public.properties
│
├── document_db
│   └── public.documents
│
└── review_db
    └── public.reviews
```

### Configuration

```
CREATE DATABASE auth_db;
CREATE DATABASE property_db;
CREATE DATABASE document_db;
CREATE DATABASE review_db;
```

```
# Auth Service
DATABASE_URL=postgresql://auth_user:<password>@localhost:5432/auth_db

# Property Service
DATABASE_URL=postgresql://property_user:<password>@localhost:5432/property_db
```

These examples assume roles and their permissions have been configured separately. In production, secure credentials appropriately.

### Advantages

- Clear database separation.
- Database-level access controls.
- Independent schema migrations.
- Independent database object naming.
- Practical for a limited number of services on shared infrastructure.

### Disadvantages

- Instance resources and availability are shared.
- Independent database scaling is not available without moving databases elsewhere.
- Database maintenance can create shared operational impact.
- Queries across different databases are not available through ordinary PostgreSQL joins.

Important PostgreSQL detail: You cannot simply write a normal SQL join across `auth_db` and `property_db` using a single PostgreSQL connection. Special mechanisms such as foreign data wrappers are required, and using them to bypass service ownership is generally not recommended.

## 3.3 Why is Approach 2 Preferred Over Approach 1?

Consider the Auth and Property services.

With one shared database, a user with unrestricted database-level `readWrite` permissions could access both Auth and Property collections.

With separate MongoDB databases, you can restrict the Auth user to `auth_db`.

Likewise, separate PostgreSQL databases create clearer administrative and access-control boundaries.

| Factor                   | Same database                          | Separate databases                   |
| ------------------------ | -------------------------------------- | ------------------------------------ |
| Logical separation       | Collection/schema level                | Database level                       |
| Access control           | Finer-grained permissions often needed | Database-level permissions available |
| Ownership visibility     | Requires conventions                   | Clearer                              |
| Infrastructure isolation | None                                   | None                                 |
| Resource scaling         | Shared                                 | Shared                               |
| Future separation        | More restructuring may be needed       | Often simpler                        |

The real difference is administrative and logical isolation, not automatic performance improvement.

# 4. Approach 3 — Separate Database Cluster or Instance per Microservice

In this design, each service gets dedicated database infrastructure.

This is the strongest of the three approaches for infrastructure isolation.

Independent Database Infrastructure

Auth Service

Auth DB Cluster

Property Service

Property DB Cluster

Document Service

Document DB Cluster

Review Service

Review DB Cluster

## 4.1 MongoDB: Separate Clusters

```
Auth Service
└── MongoDB Auth Cluster
    └── auth_db

Property Service
└── MongoDB Property Cluster
    └── property_db

Document Service
└── MongoDB Document Cluster
    └── document_db

Review Service
└── MongoDB Review Cluster
    └── review_db
```

### Configuration

```
# Auth Service
MONGO_URI=mongodb+srv://auth_user:<password>@auth-cluster.example.mongodb.net/auth_db

# Property Service
MONGO_URI=mongodb+srv://property_user:<password>@property-cluster.example.mongodb.net/property_db
```

Each service has a separate MongoDB cluster hostname and its own provisioned database infrastructure.

## 4.2 PostgreSQL: Separate Instances

```
Auth Service
└── PostgreSQL Instance A
    └── auth_db

Property Service
└── PostgreSQL Instance B
    └── property_db

Document Service
└── PostgreSQL Instance C
    └── document_db

Review Service
└── PostgreSQL Instance D
    └── review_db
```

### Configuration

```
# Auth Service
DATABASE_URL=postgresql://auth_user:<password>@auth-db.example:5432/auth_db

# Property Service
DATABASE_URL=postgresql://property_user:<password>@property-db.example:5432/property_db
```

For example, separate managed PostgreSQL instances can be created using Amazon RDS.

## 4.3 Why Use Separate Clusters?

Imagine the Document Service experiences a huge increase in traffic.

It performs large numbers of metadata reads and writes for document processing.

### Shared cluster

The Document Service consumes a large share of database resources.

Consequences:

- Property queries may become slower.
- Auth queries may experience increased latency.
- All services may encounter connection or resource pressure.

### Separate clusters

Document Service runs on its own database infrastructure.

Benefits:

- Scale its database compute and storage independently.
- Heavy document workload does not directly consume Property cluster resources.
- Database maintenance can be scheduled separately.
- Database failures can be isolated from other independent clusters.

Note: Application-level dependencies can still propagate failures. Separate clusters do not automatically guarantee complete service availability.

## 4.4 Disadvantages

- More expensive infrastructure.
- More database deployments to maintain.
- Additional monitoring and backups.
- More security and network configurations.
- Greater operational complexity.

Therefore, separate clusters should be introduced when they solve a measurable workload, isolation, security, or availability requirement.

# 5. Complete Comparison — MongoDB and PostgreSQL

| Feature                         | Level 1: Shared DB         | Level 2: Separate DBs  | Level 3: Dedicated infrastructure         |
| ------------------------------- | -------------------------- | ---------------------- | ----------------------------------------- |
| MongoDB design                  | Separate collections       | Separate databases     | Separate clusters                         |
| PostgreSQL design               | Separate schemas           | Separate databases     | Separate instances                        |
| Physical infrastructure         | Shared                     | Shared                 | Separate                                  |
| Logical isolation               | Basic                      | Stronger               | Stronger                                  |
| Security permissions            | Collection/schema level    | Database level         | Instance + database level                 |
| Independent service deployment  | Yes                        | Yes                    | Yes                                       |
| Independent DB resource scaling | No                         | No                     | Yes                                       |
| Database fault isolation        | Limited                    | Limited                | Stronger                                  |
| Database configuration autonomy | Limited                    | Partial                | High                                      |
| Infrastructure cost             | Low                        | Low to moderate        | Higher                                    |
| Operational complexity          | Low                        | Moderate               | High                                      |
| Preferred use case              | Small systems or migration | General starting point | High-load or isolation-sensitive services |

# 6. Database Ownership and Inter-Service Communication ⭐

Database organization alone does not make an application a good microservices architecture.

Service ownership is more important than the number of databases or clusters.

Suppose a user submits a review for property `P101`.

The Review Service needs to verify that the property exists.

## Incorrect approach

Review Service directly queries the Property Service database.

```
// Avoid cross-service database access
db.properties.findOne({
  propertyId: "P101"
});
```

This creates coupling because Review Service depends on the Property Service's internal database structure.

If the Property Service changes its schema, Review Service might break.

## Recommended approach

Frontend

POST /reviews

API Gateway

Routes request

Review Service

Checks property ID

Property Service API

Validates property

Review Service

Saves the review

Review Database

Stores review document/row

The Review Service can use a Property Service API to validate the property. For suitable use cases, it may instead maintain locally replicated property information through events.

### How do we store references between services?

MongoDB

```
{
  _id: ObjectId("..."),
  propertyId: "P101",
  rating: 5,
  comment: "Good property"
}
```

PostgreSQL

```
CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5)
);
```

The `propertyId` or `property_id` is a logical reference.

When Property and Review services own different databases, PostgreSQL cannot enforce a normal foreign key relationship across them. Similarly, MongoDB does not provide relational foreign-key enforcement across service-owned databases.

The application manages cross-service references and consistency through APIs, events, and appropriate workflow rules.

# 7. Important Interview Scenario — Both Use the Same Infrastructure

Interviewer: If separate databases and separate collections both use the same MongoDB cluster, aren't they effectively the same?

Recommended answer:

> Both approaches share the same physical database infrastructure, so they have similar resource-sharing and cluster-availability characteristics.
>
> The key difference is logical isolation and access control.
>
> With separate databases, each microservice owns a logical database, making database-level permissions, ownership, and schema management clearer.
>
> With separate collections inside one database, ownership depends on collection-level permissions and stricter development conventions.
>
> Therefore, although the infrastructure is shared, separate databases provide cleaner administrative boundaries. Neither approach automatically gives independent database scaling.

This explanation also applies to PostgreSQL, replacing collections with schemas.

# 8. Important Interview Scenario — Why Separate Clusters?

Interviewer: Why would you move a microservice to its own MongoDB cluster or PostgreSQL instance?

Recommended answer:

> A dedicated database cluster is useful when a microservice needs independent resource scaling, stronger failure isolation, specialized database configuration, or separate operational controls.
>
> For example, if Document Service generates heavy database traffic, putting it on a dedicated cluster prevents that workload from directly consuming the Property Service database resources.
>
> However, dedicated infrastructure increases cost and operational complexity, so I would introduce it based on measurable requirements rather than using it for every service automatically.

# 9. Frequently Asked Interview Questions

1\. Does every microservice need a separate database?

2\. Does every microservice need a separate MongoDB cluster?

3\. Can two microservices use one PostgreSQL database?

Yes. They can own separate schemas with appropriate roles and privileges.

4\. Can microservices share database tables or collections?

5\. Which approach provides independent database scaling?

6\. Do separate MongoDB databases improve performance automatically?

7\. Can one microservice access another service's database?

8\. What if one MongoDB cluster goes down?

9\. What is the equivalent of separate collections in PostgreSQL?

10\. Should we always start with database-per-service?

# 10. Recommended Architecture for Your Project

For a Node.js-based Digital Property Transfer System, I would choose a hybrid deployment strategy, starting with separate logical databases on shared infrastructure.

Node.js Microservices

Shared Database Infrastructure

auth_db

property_db

review_db

Dedicated Document DB

When workload isolation is needed

Dedicated Payment DB

When security or operational isolation justifies it

Conceptual target architecture. Dedicated database instances are optional, not mandatory.

### My preference by situation

| Situation                                        | Preferred design                                                  |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| Small Node.js learning project                   | One database with clearly owned collections/schemas is acceptable |
| New microservices project with moderate traffic  | ⭐ Separate logical databases on shared cluster/instance           |
| Several teams with independent service ownership | Separate logical databases with dedicated credentials             |
| High database traffic in one service             | Dedicated database cluster/instance for that service              |
| Strong infrastructure isolation required         | Dedicated clusters/instances                                      |
| Uncertain business boundaries and small team     | Consider a modular monolith first                                 |

For actual document files such as PDFs and signed agreements, use suitable object storage, such as Amazon S3. MongoDB or PostgreSQL can store document metadata, references, ownership, and processing status.

## 11. Final Revision Notes

MongoDB

- Level 1: Same cluster → Same database → Separate collections.
- Level 2 ⭐: Same cluster → Separate databases → Separate collections per service.
- Level 3: Separate clusters → Separate databases → Stronger infrastructure isolation.

PostgreSQL

- Level 1: Same instance → Same database → Separate schemas.
- Level 2 ⭐: Same instance → Separate databases.
- Level 3: Separate instances/clusters → Separate databases → Stronger infrastructure isolation.

Three lines to remember for interviews:

1. Data ownership determines which service is responsible for reading and modifying a particular set of business data.
2. Logical isolation separates service data through collections, schemas, or databases and can be enforced using permissions.
3. Infrastructure isolation uses dedicated database deployments to provide independent resource scaling and stronger fault isolation.

Final recommendation: For most small-to-medium Node.js microservices projects, start with separate logical databases on shared MongoDB or PostgreSQL infrastructure, enforce permissions and service boundaries, and introduce dedicated clusters only when operational requirements justify them.