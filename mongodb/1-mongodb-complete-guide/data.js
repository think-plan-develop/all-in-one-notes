window.notePageData = {
  
  "title": "MongoDB Complete Guide",
  "navLabel": "MongoDB Sections",
  "hero": {
    "type": "introduction",
    "label": "MongoDB Overview",
    "heading": "MongoDB",
    "text": "MongoDB is a NoSQL document-oriented database that stores data in BSON documents instead of traditional rows and columns. It is highly scalable, flexible, and widely used in modern Node.js applications."
  },
  "nav": [
    { "label": "Notes", "href": "#notes" },
    { "label": "Definitions", "href": "#terms" },
    { "label": "Database Queries", "href": "#database-queries" },
    { "label": "Collection Queries", "href": "#collection-queries" },
    { "label": "Document Queries", "href": "#document-queries" },
    { "label": "Model Queries", "href": "#model-queries" },
    { "label": "Diagram", "href": "#diagram" },
    { "label": "Workflow", "href": "#workflow" },
    { "label": "Code", "href": "#code" },
    { "label": "Explanation", "href": "#explanation" },
    { "label": "Comparison", "href": "#comparison" },

    { "label": "Query Operators", "href": "#query-operators" },
{ "label": "Array Operators", "href": "#array-operators" },
{ "label": "Projection", "href": "#projection" },
{ "label": "Sorting", "href": "#sorting" },
{ "label": "Pagination", "href": "#pagination" },
{ "label": "Aggregation", "href": "#aggregation" },
{ "label": "Indexing", "href": "#indexing" },
{ "label": "Relationships", "href": "#relationships" },
{ "label": "Transactions", "href": "#transactions" },
{ "label": "Replication", "href": "#replication" },
{ "label": "Sharding", "href": "#sharding" },

    { "label": "Boxes", "href": "#boxes" },
    { "label": "Info", "href": "#info" },
    { "label": "Timeline", "href": "#timeline" },
    { "label": "Checklist", "href": "#checklist" },
    { "label": "Table", "href": "#table-section" },
    { "label": "Accordion", "href": "#accordion" },
    { "label": "Quote", "href": "#quote" },
    { "label": "Steps", "href": "#steps" },
    { "label": "Use Cases", "href": "#use-cases" },
    { "label": "Best Practices", "href": "#best-practices" },
    { "label": "Mistakes", "href": "#common-mistakes" },
    { "label": "Debugging", "href": "#debugging" },
    { "label": "Interview", "href": "#interview" },
    { "label": "Q&A", "href": "#qa" },
    { "label": "Summary", "href": "#summary" }
  ],
  "sections": [
    {
      "id": "notes",
      "type": "notes",
      "label": "Notes",
      "heading": "Important MongoDB Concepts",
      "blocks": [
        {
          "type": "list",
          "items": [
            "MongoDB is a NoSQL Database.",
            "Stores data in BSON format.",
            "Collections replace tables.",
            "Documents replace rows.",
            "Supports horizontal scaling.",
            "Supports indexing and aggregation.",
            "Schema is optional but recommended.",
            "Works very well with Node.js."
          ]
        }
      ]
    },
    {
  "id": "terms",
  "type": "terminology",
  "label": "Terminology / Key Definitions",
  "heading": "MongoDB Core Terminology",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "Database",
          "definition": "A logical container that stores collections. One MongoDB server can contain multiple databases. Example: ecommerce, school_management, inventory_management."
        },
        {
          "term": "Collection",
          "definition": "A collection is a group of MongoDB documents. It is similar to a table in SQL databases but does not require a fixed schema."
        },
        {
          "term": "Document",
          "definition": "A document is the basic unit of data in MongoDB stored in BSON format. It is similar to a row in SQL."
        },
        {
          "term": "Field",
          "definition": "A key-value pair inside a document. Example: firstName, email, age."
        },
        {
          "term": "BSON",
          "definition": "Binary JSON format used internally by MongoDB. Supports additional types like Date, ObjectId and Binary."
        },
        {
          "term": "ObjectId",
          "definition": "Default unique identifier generated automatically for every MongoDB document."
        },
        {
          "term": "Schema",
          "definition": "Blueprint defining document structure. MongoDB is schema-flexible but Mongoose schemas provide consistency."
        },
        {
          "term": "Model",
          "definition": "Mongoose abstraction created from a schema. Models provide CRUD methods for database operations."
        },
        {
          "term": "Index",
          "definition": "Special data structure that improves query performance and reduces collection scans."
        },
        {
          "term": "Aggregation Pipeline",
          "definition": "Framework used to process data through stages such as $match, $group, $project and $sort."
        },
        {
          "term": "Replica Set",
          "definition": "Group of MongoDB servers maintaining the same data for high availability and failover."
        },
        {
          "term": "Sharding",
          "definition": "Horizontal scaling strategy that distributes data across multiple servers."
        },
        {
          "term": "Embedded Document",
          "definition": "Nested document stored inside another document."
        },
        {
          "term": "Reference",
          "definition": "Relationship technique where one document stores another document's ObjectId."
        },
        {
          "term": "Cursor",
          "definition": "Pointer returned by queries which allows iteration through query results."
        }
      ]
    }
  ]
},
{
  "id": "database-queries",
  "type": "query-section",
  "label": "Database Queries",
  "heading": "Database Operations",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "show dbs",
          "definition": "Display all databases available on the MongoDB server."
        },
        {
          "term": "use databaseName",
          "definition": "Switch to or create a database."
        },
        {
          "term": "db.dropDatabase()",
          "definition": "Delete the currently selected database."
        }
      ]
    },
    {
      "type": "code",
      "filename": "database.mongodb",
      "text": "show dbs\n\nuse ecommerce\n\nuse school_management\n\ndb.dropDatabase()"
    }
  ]
},
{
  "id": "collection-queries",
  "type": "query-section",
  "label": "Collection Queries",
  "heading": "Collection Operations",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "db.createCollection()",
          "definition": "Create a new collection."
        },
        {
          "term": "show collections",
          "definition": "List all collections in the current database."
        },
        {
          "term": "db.collection.drop()",
          "definition": "Delete a collection."
        }
      ]
    },
    {
      "type": "code",
      "filename": "collection.mongodb",
      "text": "db.createCollection('users')\n\ndb.createCollection('products')\n\nshow collections\n\ndb.users.drop()"
    }
  ]
},
{
  "id": "document-queries",
  "type": "query-section",
  "label": "Document Queries",
  "heading": "Document CRUD Operations",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "insertOne()",
          "definition": "Insert a single document."
        },
        {
          "term": "insertMany()",
          "definition": "Insert multiple documents."
        },
        {
          "term": "find()",
          "definition": "Retrieve multiple documents."
        },
        {
          "term": "findOne()",
          "definition": "Retrieve a single document."
        },
        {
          "term": "updateOne()",
          "definition": "Update first matching document."
        },
        {
          "term": "updateMany()",
          "definition": "Update multiple documents."
        },
        {
          "term": "deleteOne()",
          "definition": "Delete one document."
        },
        {
          "term": "deleteMany()",
          "definition": "Delete multiple documents."
        }
      ]
    },
    {
      "type": "code",
      "filename": "document.mongodb",
      "text": "db.users.insertOne({name:'Shivam',age:25})\n\ndb.users.insertMany([{name:'Rahul'},{name:'Aman'}])\n\ndb.users.find()\n\ndb.users.findOne({name:'Shivam'})\n\ndb.users.updateOne({name:'Shivam'},{$set:{age:26}})\n\ndb.users.updateMany({},{$set:{status:'active'}})\n\ndb.users.deleteOne({name:'Shivam'})\n\ndb.users.deleteMany({status:'inactive'})"
    }
  ]
},

{
  "id": "model-queries",
  "type": "query-section",
  "label": "Model Queries",
  "heading": "Mongoose Model Methods",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "create()",
          "definition": "Create and save a new document."
        },
        {
          "term": "find()",
          "definition": "Fetch all matching documents."
        },
        {
          "term": "findOne()",
          "definition": "Fetch first matching document."
        },
        {
          "term": "findById()",
          "definition": "Fetch document using ObjectId."
        },
        {
          "term": "updateOne()",
          "definition": "Update first matching document."
        },
        {
          "term": "updateMany()",
          "definition": "Update multiple documents."
        },
        {
          "term": "findOneAndUpdate()",
          "definition": "Update and return document."
        },
        {
          "term": "findByIdAndUpdate()",
          "definition": "Update document using id."
        },
        {
          "term": "deleteOne()",
          "definition": "Delete first matching document."
        },
        {
          "term": "deleteMany()",
          "definition": "Delete multiple documents."
        },
        {
          "term": "findByIdAndDelete()",
          "definition": "Delete document using id."
        },
        {
          "term": "aggregate()",
          "definition": "Execute aggregation pipeline."
        },
        {
          "term": "populate()",
          "definition": "Load referenced documents."
        },
        {
          "term": "lean()",
          "definition": "Return plain JavaScript objects instead of Mongoose documents."
        }
      ]
    },
    {
      "type": "code",
      "filename": "user.service.ts",
      "text": "await User.create(data)\n\nawait User.find()\n\nawait User.findOne({email})\n\nawait User.findById(id)\n\nawait User.updateOne({_id:id},{$set:data})\n\nawait User.findByIdAndUpdate(id,data,{new:true})\n\nawait User.deleteOne({_id:id})\n\nawait User.findByIdAndDelete(id)\n\nawait User.aggregate([])\n\nawait User.find().populate('role')\n\nawait User.find().lean()"
    }
  ]
},
    {
      "id": "diagram",
      "type": "diagram",
      "label": "Diagram",
      "heading": "MongoDB Architecture",
      "blocks": [
        {
          "type": "diagram",
          "text": "Client --> Node.js API --> MongoDB Driver --> Database --> Collection --> Document"
        }
      ]
    },
    {
      "id": "explanation",
      "type": "explanation",
      "label": "Explanation",
      "heading": "Detailed Explanation",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "MongoDB stores data inside ",
            {
              "code": "documents"
            },
            " rather than rows. Each document can have flexible structure which allows developers to evolve applications without complex migrations."
          ]
        }
      ]
    },
    {
      "id": "comparison",
      "type": "comparison",
      "label": "Differentiate / Comparison",
      "heading": "MongoDB vs SQL",
      "blocks": [
        {
          "type": "table",
          "headers": ["Feature", "MongoDB", "SQL Database"],
          "rows": [
            ["Storage", "Document", "Table"],
            ["Schema", "Flexible", "Fixed"],
            ["Scaling", "Horizontal", "Vertical"],
            ["Query", "JSON Style", "SQL"],
            ["Relationships", "Embedded Documents", "Joins"]
          ]
        }
      ]
    },

    {
  "id": "query-operators",
  "type": "query-operators",
  "label": "Query Operators",
  "heading": "MongoDB Query Operators",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "$gt",
          "definition": "Greater Than"
        },
        {
          "term": "$gte",
          "definition": "Greater Than or Equal To"
        },
        {
          "term": "$lt",
          "definition": "Less Than"
        },
        {
          "term": "$lte",
          "definition": "Less Than or Equal To"
        },
        {
          "term": "$in",
          "definition": "Match values from provided array."
        },
        {
          "term": "$nin",
          "definition": "Exclude values from provided array."
        },
        {
          "term": "$and",
          "definition": "All conditions must be true."
        },
        {
          "term": "$or",
          "definition": "At least one condition must be true."
        },
        {
          "term": "$not",
          "definition": "Negates a condition."
        }
      ]
    },
    {
      "type": "code",
      "filename": "operators.mongodb",
      "text": "db.users.find({age:{$gt:18}})\n\ndb.users.find({age:{$gte:18}})\n\ndb.users.find({age:{$lt:60}})\n\ndb.users.find({age:{$lte:60}})\n\ndb.users.find({role:{$in:['admin','manager']}})\n\ndb.users.find({role:{$nin:['guest']}})\n\ndb.users.find({$and:[{age:{$gt:18}},{status:'active'}]})\n\ndb.users.find({$or:[{role:'admin'},{role:'manager'}]})\n\ndb.users.find({age:{$not:{$gt:18}}})"
    }
  ]
},
{
  "id": "array-operators",
  "type": "array-operators",
  "label": "Array Operators",
  "heading": "Working With Arrays",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "$all",
          "definition": "Matches documents containing all specified elements."
        },
        {
          "term": "$size",
          "definition": "Matches arrays of specific length."
        },
        {
          "term": "$elemMatch",
          "definition": "Matches documents with array elements satisfying criteria."
        },
        {
          "term": "$push",
          "definition": "Add element to array."
        },
        {
          "term": "$pull",
          "definition": "Remove element from array."
        }
      ]
    },
    {
      "type": "code",
      "filename": "arrays.mongodb",
      "text": "db.users.find({skills:{$all:['NodeJS','MongoDB']}})\n\ndb.users.find({skills:{$size:3}})\n\ndb.users.updateOne({_id:id},{$push:{skills:'TypeScript'}})\n\ndb.users.updateOne({_id:id},{$pull:{skills:'PHP'}})"
    }
  ]
},
{
  "id": "projection",
  "type": "projection",
  "label": "Projection",
  "heading": "Selecting Specific Fields",
  "blocks": [
    {
      "type": "paragraph",
      "parts": [
        "Projection is used to return only required fields from documents."
      ]
    },
    {
      "type": "code",
      "filename": "projection.mongodb",
      "text": "db.users.find({},{name:1,email:1})\n\ndb.users.find({},{password:0})\n\ndb.users.findOne({},{name:1})"
    }
  ]
},
{
  "id": "sorting",
  "type": "sorting",
  "label": "Sorting",
  "heading": "Sort Query Results",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "1",
          "definition": "Ascending order."
        },
        {
          "term": "-1",
          "definition": "Descending order."
        }
      ]
    },
    {
      "type": "code",
      "filename": "sorting.mongodb",
      "text": "db.users.find().sort({name:1})\n\ndb.users.find().sort({age:-1})\n\ndb.users.find().sort({createdAt:-1})"
    }
  ]
},
{
  "id": "pagination",
  "type": "pagination",
  "label": "Pagination",
  "heading": "Pagination Techniques",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "skip()",
          "definition": "Skip documents."
        },
        {
          "term": "limit()",
          "definition": "Limit returned documents."
        }
      ]
    },
    {
      "type": "code",
      "filename": "pagination.mongodb",
      "text": "db.users.find().skip(0).limit(10)\n\ndb.users.find().skip(10).limit(10)\n\ndb.users.find().skip(20).limit(10)"
    }
  ]
},
{
  "id": "indexing",
  "type": "indexing",
  "label": "Indexing",
  "heading": "MongoDB Indexes",
  "blocks": [
    {
      "type": "definitions",
      "items": [
        {
          "term": "Single Field Index",
          "definition": "Index on one field."
        },
        {
          "term": "Compound Index",
          "definition": "Index on multiple fields."
        },
        {
          "term": "Text Index",
          "definition": "Used for text searching."
        },
        {
          "term": "Unique Index",
          "definition": "Prevents duplicate values."
        }
      ]
    },
    {
      "type": "code",
      "filename": "index.mongodb",
      "text": "db.users.createIndex({email:1})\n\ndb.users.createIndex({firstName:1,lastName:1})\n\ndb.users.createIndex({email:1},{unique:true})\n\ndb.users.getIndexes()"
    }
  ]
},
{
  "id": "relationships",
  "type": "relationships",
  "label": "Relationships",
  "heading": "Embedding vs Referencing",
  "blocks": [
    {
      "type": "table",
      "headers": [
        "Feature",
        "Embedding",
        "Referencing"
      ],
      "rows": [
        [
          "Storage",
          "Inside Same Document",
          "Separate Documents"
        ],
        [
          "Performance",
          "Faster Reads",
          "Additional Query"
        ],
        [
          "Data Duplication",
          "Possible",
          "Minimal"
        ],
        [
          "Use Case",
          "Address, Profile",
          "Users, Orders"
        ]
      ]
    }
  ]
},

    {
      "id": "boxes",
      "type": "highlight-box",
      "label": "Highlight Box",
      "heading": "Important Notes",
      "blocks": [
        {
          "type": "text-box",
          "variant": "remember",
          "title": "Remember",
          "text": "Collection = Table, Document = Row."
        },
        {
          "type": "text-box",
          "variant": "short-answer",
          "title": "Short Answer",
          "text": "MongoDB is a document database."
        },
        {
          "type": "text-box",
          "variant": "warning",
          "title": "Warning",
          "text": "Avoid creating indexes on every field."
        },
        {
          "type": "text-box",
          "variant": "tip",
          "title": "Tip",
          "text": "Use projection to fetch only required fields."
        },
        {
          "type": "text-box",
          "variant": "note",
          "title": "Note",
          "text": "Schema validation should be implemented even in NoSQL systems."
        },
        {
          "type": "text-box",
          "variant": "interview",
          "title": "Interview",
          "text": "Explain difference between embedding and referencing."
        }
      ]
    },
    {
      "id": "info",
      "type": "info-card",
      "label": "Info Card",
      "heading": "MongoDB Overview",
      "blocks": [
        {
          "type": "info-card",
          "title": "Why MongoDB?",
          "text": "Fast development, flexible schema, easy scaling, and strong Node.js ecosystem support."
        }
      ]
    },


    {
      "id": "accordion",
      "type": "accordion",
      "label": "Accordion",
      "heading": "MongoDB Concepts",
      "blocks": [
        {
          "type": "accordion",
          "items": [
            {
              "title": "What is a Collection?",
              "text": "A collection is a group of related documents."
            },
            {
              "title": "What is BSON?",
              "text": "BSON is Binary JSON used by MongoDB."
            },
            {
              "title": "What is Aggregation?",
              "text": "Framework for processing and transforming data."
            }
          ]
        }
      ]
    },
    {
      "id": "quote",
      "type": "quote",
      "label": "Quote",
      "heading": "MongoDB Philosophy",
      "blocks": [
        {
          "type": "quote",
          "text": "Model data according to application requirements, not database limitations.",
          "source": "MongoDB Best Practice"
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
            "E-Commerce Applications",
            "Social Media Platforms",
            "Real-Time Analytics",
            "Content Management Systems",
            "IoT Applications",
            "Chat Applications",
            "Learning Management Systems"
          ]
        }
      ]
    },
    {
      "id": "best-practices",
      "type": "best-practices",
      "label": "Best Practices",
      "heading": "MongoDB Best Practices",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Create indexes carefully.",
            "Use schema validation.",
            "Avoid unnecessary document nesting.",
            "Implement pagination.",
            "Use aggregation efficiently.",
            "Monitor slow queries.",
            "Use projections for optimized reads."
          ]
        }
      ]
    },
    {
      "id": "common-mistakes",
      "type": "common-mistakes",
      "label": "Common Mistakes",
      "heading": "Common MongoDB Mistakes",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Missing indexes.",
            "Over-normalization.",
            "Huge documents.",
            "Fetching unnecessary fields.",
            "Ignoring validation.",
            "No backup strategy."
          ]
        }
      ]
    },
    {
      "id": "debugging",
      "type": "debugging-tips",
      "label": "Debugging Tips",
      "heading": "MongoDB Debugging Tips",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Use explain() to analyze queries.",
            "Check indexes.",
            "Enable mongoose debug mode.",
            "Monitor query execution time.",
            "Review connection logs."
          ]
        }
      ]
    },
    {
      "id": "interview",
      "type": "interview-questions",
      "label": "Interview Questions",
      "heading": "MongoDB Interview Questions",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "What is MongoDB?",
              "answer": "MongoDB is a NoSQL document database."
            },
            {
              "question": "Difference between Collection and Document?",
              "answer": "Collection contains documents; document contains actual data."
            },
            {
              "question": "What is Aggregation Pipeline?",
              "answer": "Framework used for advanced data processing."
            },
            {
              "question": "What is Indexing?",
              "answer": "Technique used to improve query performance."
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
              "question": "Is MongoDB relational?",
              "answer": "No, MongoDB is a NoSQL database."
            },
            {
              "question": "Can MongoDB handle millions of records?",
              "answer": "Yes, MongoDB is designed for scalability."
            },
            {
              "question": "Does MongoDB support transactions?",
              "answer": "Yes, multi-document transactions are supported."
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
            "MongoDB is a document-oriented NoSQL database.",
            "Collection = Table.",
            "Document = Row.",
            "BSON is internal storage format.",
            "Indexes improve performance.",
            "Aggregation handles analytics.",
            "Mongoose simplifies MongoDB usage in Node.js."
          ]
        }
      ]
    }
  ]
};
