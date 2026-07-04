window.notePageData = {
  "title": "MongoDB Operators",
  "navLabel": "Operator Sections",
  "hero": {
    "type": "introduction",
    "label": "MongoDB Operators",
    "heading": "MongoDB Operators",
    "text": "A complete reference for MongoDB all major Query Operators — Comparison, Logical, Element, Evaluation, Array, and Update operators — with real examples, use cases, and interview Q&A."
  },
  "nav": [
    { "label": "Comparison",       "href": "#comparison-operators" },
    { "label": "Logical",          "href": "#logical-operators" },
    { "label": "Element",          "href": "#element-operators" },
    { "label": "Evaluation",       "href": "#evaluation-operators" },
    { "label": "Terminology",      "href": "#terms" },
    { "label": "Comparison Table", "href": "#comparison-table" },
    { "label": "Key Rules",        "href": "#boxes" },
    { "label": "Deep Dive",        "href": "#accordion" }
  ],
  "sections": [

    {
      "id": "comparison-operators",
      "type": "query-section",
      "label": "Comparison Operators",
      "heading": "Comparison Operators",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Comparison operators are used inside a ",
            { "code": "find()" },
            " filter to compare a field value against a given value. They always appear inside a field object like ",
            { "code": "{ field: { $operator: value } }" },
            "."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "$eq — Equal To",
              "definition": "Matches documents where the field equals the specified value. Equivalent to writing { field: value } directly.",
              "code": "db.users.find({ age: { $eq: 25 } })"
            },
            {
              "term": "$ne — Not Equal To",
              "definition": "Matches documents where the field does NOT equal the value. Useful for excluding a specific value.",
              "code": "db.users.find({ role: { $ne: \"guest\" } })"
            },
            {
              "term": "$gt — Greater Than",
              "definition": "Matches documents where the field value is strictly greater than the given value.",
              "code": "db.users.find({ age: { $gt: 18 } })"
            },
            {
              "term": "$gte — Greater Than or Equal",
              "definition": "Matches documents where the field value is greater than or equal to the given value. Includes the boundary value.",
              "code": "db.users.find({ age: { $gte: 18 } })"
            },
            {
              "term": "$lt — Less Than",
              "definition": "Matches documents where the field value is strictly less than the given value.",
              "code": "db.products.find({ price: { $lt: 1000 } })"
            },
            {
              "term": "$lte — Less Than or Equal",
              "definition": "Matches documents where the field value is less than or equal to the given value. Includes the boundary value.",
              "code": "db.products.find({ price: { $lte: 1000 } })"
            },
            {
              "term": "$in — In Array",
              "definition": "Matches documents where the field value equals any value in the provided array. More efficient than multiple $or conditions.",
              "code": "db.users.find({ role: { $in: [\"admin\", \"manager\", \"superadmin\"] } })"
            },
            {
              "term": "$nin — Not In Array",
              "definition": "Matches documents where the field value does NOT equal any value in the provided array. Opposite of $in.",
              "code": "db.users.find({ role: { $nin: [\"guest\", \"banned\"] } })"
            }
          ]
        },
        {
          "type": "code",
          "filename": "comparison-operators.mongodb",
          "text": "// ── $eq ── exact match\ndb.users.find({ age: { $eq: 25 } })\ndb.users.find({ age: 25 })              // shorthand — identical result\n\n// ── $ne ── not equal\ndb.users.find({ role: { $ne: \"guest\" } })\n\n// ── $gt / $gte ── greater than / greater than or equal\ndb.users.find({ age: { $gt: 18 } })\ndb.users.find({ age: { $gte: 18 } })    // includes 18\n\n// ── $lt / $lte ── less than / less than or equal\ndb.users.find({ age: { $lt: 30 } })\ndb.products.find({ stock: { $lte: 10 } })\n\n// ── $in ── match any value in array\ndb.users.find({ role: { $in: [\"admin\", \"manager\", \"superadmin\"] } })\n\n// ── $nin ── exclude values in array\ndb.users.find({ role: { $nin: [\"guest\", \"banned\"] } })\n\n// ── Range: combine operators on one field\ndb.users.find({ age: { $gte: 18, $lte: 60 } })   // 18 <= age <= 60\ndb.products.find({ price: { $gt: 100, $lt: 1000 } })"
        }
      ]
    },

    {
      "id": "logical-operators",
      "type": "query-section",
      "label": "Logical Operators",
      "heading": "Logical Operators",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Logical operators combine multiple conditions. They accept an array of condition objects. ",
            { "code": "$and" },
            " and ",
            { "code": "$or" },
            " are the most common. ",
            { "code": "$nor" },
            " matches documents where none of the conditions are true, and ",
            { "code": "$not" },
            " negates a single condition on one field."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "$and — All Must Match",
              "definition": "Joins two or more conditions with AND logic. ALL conditions must be true. MongoDB applies $and implicitly when listing multiple fields, but explicit $and is needed when the same field appears in multiple conditions.",
              "code": "db.users.find({ $and: [{ age: { $gte: 18 } }, { isActive: true }] })"
            },
            {
              "term": "$or — At Least One Must Match",
              "definition": "Joins two or more conditions with OR logic. At least ONE condition must be true. Commonly used to search across multiple fields.",
              "code": "db.users.find({ $or: [{ email: \"a@x.com\" }, { phone: \"999\" }] })"
            },
            {
              "term": "$nor — None Must Match",
              "definition": "Opposite of $or. Matches documents where NONE of the conditions are true. Useful for strict exclusion of multiple groups at once.",
              "code": "db.users.find({ $nor: [{ role: \"guest\" }, { isActive: false }] })"
            },
            {
              "term": "$not — Negate a Condition",
              "definition": "Inverts a single condition on a field. Takes an expression object (not an array). Also matches documents where the field does not exist.",
              "code": "db.users.find({ age: { $not: { $lt: 18 } } })"
            }
          ]
        },
        {
          "type": "code",
          "filename": "logical-operators.mongodb",
          "text": "// ── $and ── ALL conditions must be true\ndb.users.find({\n  $and: [\n    { age: { $gte: 18 } },\n    { isActive: true },\n    { role: \"user\" }\n  ]\n})\n\n// Implicit $and — same result, cleaner syntax\ndb.users.find({ age: { $gte: 18 }, isActive: true, role: \"user\" })\n\n// ── $or ── at least ONE condition must be true\ndb.users.find({\n  $or: [\n    { email: \"shivam@example.com\" },\n    { phone: \"9999999999\" }\n  ]\n})\n\n// Combine $and + $or\ndb.users.find({\n  isActive: true,\n  $or: [{ role: \"admin\" }, { role: \"manager\" }]\n})\n\n// ── $nor ── NONE of the conditions can be true\ndb.users.find({\n  $nor: [{ role: \"guest\" }, { isActive: false }, { isDeleted: true }]\n})\n\n// ── $not ── negate a condition on ONE field\ndb.users.find({ age: { $not: { $lt: 18 } } })\ndb.users.find({ role: { $not: { $in: [\"guest\", \"banned\"] } } })"
        }
      ]
    },

    {
      "id": "element-operators",
      "type": "query-section",
      "label": "Element Operators",
      "heading": "Element Operators",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Element operators check properties of a field itself rather than its value — whether the field ",
            { "code": "exists" },
            " in the document, or what ",
            { "code": "BSON type" },
            " its value is."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "$exists — Field Existence Check",
              "definition": "Matches documents where the specified field exists (true) or does not exist (false). A field set to null still 'exists' — $exists: true matches it. Use $exists: false to find documents completely missing a field.",
              "code": "db.users.find({ phone: { $exists: true } })"
            },
            {
              "term": "$type — BSON Type Check",
              "definition": "Matches documents where the field's value is of a particular BSON type. Pass the type as a string (\"string\", \"number\", \"bool\", \"date\", \"objectId\", \"array\", \"null\") or its BSON number (e.g. 2 for String, 16 for Int32).",
              "code": "db.users.find({ age: { $type: \"number\" } })"
            }
          ]
        },
        {
          "type": "code",
          "filename": "element-operators.mongodb",
          "text": "// ── $exists ──\ndb.users.find({ phone: { $exists: true } })           // field present\ndb.users.find({ phone: { $exists: false } })          // field missing\ndb.users.find({ deletedAt: { $exists: true } })       // soft-delete check\n\n// null vs $exists: false\ndb.users.find({ middleName: null })                   // null OR missing\ndb.users.find({ middleName: { $exists: false } })     // ONLY missing\n\n// ── $type ──\ndb.users.find({ age: { $type: \"number\" } })\ndb.users.find({ age: { $type: 16 } })                // 16 = Int32\ndb.users.find({ age: { $type: \"string\" } })          // data quality check\ndb.users.find({ tags: { $type: \"array\" } })\ndb.users.find({ age: { $type: [\"string\", \"number\"] } }) // multiple types"
        },
        {
          "type": "table",
          "headers": ["Type Name (String)", "BSON Number", "Example Value"],
          "rows": [
            ["\"double\"",   "1",  "4.8"],
            ["\"string\"",   "2",  "\"Shivam\""],
            ["\"object\"",   "3",  "{ city: \"Delhi\" }"],
            ["\"array\"",    "4",  "[\"a\", \"b\"]"],
            ["\"bool\"",     "8",  "true"],
            ["\"date\"",     "9",  "new Date()"],
            ["\"null\"",     "10", "null"],
            ["\"int\"",      "16", "25"],
            ["\"objectId\"", "7",  "ObjectId(\"66...\")"],
            ["\"decimal\"",  "19", "NumberDecimal(\"99.99\")"]
          ]
        }
      ]
    },

    {
      "id": "evaluation-operators",
      "type": "query-section",
      "label": "Evaluation Operators",
      "heading": "Evaluation Operators",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Evaluation operators evaluate expressions or content within a field. The most used are ",
            { "code": "$regex" },
            " for pattern matching, ",
            { "code": "$text" },
            " for full-text search, and ",
            { "code": "$expr" },
            " to compare two fields within the same document."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "$regex — Regular Expression Match",
              "definition": "Matches documents where the field value matches a regular expression pattern. Supports flags: i (case-insensitive), m (multiline). Use carefully on large collections — it cannot use indexes efficiently unless anchored at the start (^pattern).",
              "code": "db.users.find({ name: { $regex: /shivam/i } })"
            },
            {
              "term": "$text — Full-Text Search",
              "definition": "Performs full-text search on fields that have a text index. Much faster than $regex for large-scale keyword search. Supports language stemming and stop words. Requires a text index to be created first.",
              "code": "db.articles.find({ $text: { $search: \"mongodb\" } })"
            },
            {
              "term": "$expr — Aggregation Expression in Query",
              "definition": "Allows using aggregation pipeline expressions inside a find() filter. Useful for comparing two fields within the same document — something regular comparison operators cannot do.",
              "code": "db.orders.find({ $expr: { $gt: [\"$discount\", \"$tax\"] } })"
            },
            {
              "term": "$where — JavaScript Expression (Deprecated)",
              "definition": "Runs JavaScript expressions as a query filter. Very slow — avoids collection index usage entirely. Never use in production. $expr is the modern replacement.",
              "code": "// Avoid — use $expr instead"
            }
          ]
        },
        {
          "type": "code",
          "filename": "evaluation-operators.mongodb",
          "text": "// ── $regex ──\ndb.users.find({ name: { $regex: /shivam/i } })           // case-insensitive\ndb.users.find({ name: { $regex: /^Shiv/ } })            // starts with\ndb.users.find({ email: { $regex: /\\.com$/ } })          // ends with\ndb.users.find({ name: { $regex: \"kumar\", $options: \"i\" } }) // string form\n\n// ── $text ── (requires text index)\ndb.articles.createIndex({ title: \"text\", content: \"text\" })\ndb.articles.find({ $text: { $search: \"mongodb\" } })\ndb.articles.find({ $text: { $search: \"\\\"aggregation pipeline\\\"\" } }) // phrase\ndb.articles.find({ $text: { $search: \"mongodb -sql\" } }) // exclude word\n\n// Sort by relevance score\ndb.articles.find(\n  { $text: { $search: \"mongodb\" } },\n  { score: { $meta: \"textScore\" } }\n).sort({ score: { $meta: \"textScore\" } })\n\n// ── $expr ── compare two fields in same document\ndb.orders.find({ $expr: { $gt: [\"$discount\", \"$tax\"] } })\ndb.products.find({ $expr: { $gt: [\"$price\", \"$originalPrice\"] } })"
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
              "term": "BSON — Binary JSON",
              "definition": "The binary-encoded serialization format MongoDB uses to store documents. BSON extends JSON with extra types like ObjectId, Date, Decimal128, and binary data, and is faster to parse and more compact than plain JSON.",
              "code": "{ _id: ObjectId(\"665f1a...\"), age: NumberInt(25), createdAt: ISODate(\"2026-01-01\") }"
            },
            {
              "term": "Document",
              "definition": "A single record in MongoDB, stored as a BSON object made of field–value pairs. Roughly equivalent to a row in a relational table, but can hold nested objects and arrays.",
              "code": "{ _id: 1, name: \"Shivam\", role: \"admin\", skills: [\"Node.js\", \"MongoDB\"] }"
            },
            {
              "term": "Collection",
              "definition": "A group of documents, roughly equivalent to a table in a relational database. Collections are schema-less by default — documents in the same collection can have different fields.",
              "code": "db.users   // the 'users' collection"
            },
            {
              "term": "Field",
              "definition": "A key–value pair within a document, similar to a column in a relational row. Field values can be any BSON type, including nested documents or arrays.",
              "code": "{ age: 25 }   // 'age' is the field, 25 is its value"
            },
            {
              "term": "Query Filter",
              "definition": "The object passed to find() (or similar methods) that describes which documents to match. Operators like $gt, $in, and $regex are used inside a query filter.",
              "code": "db.users.find({ age: { $gte: 18 }, isActive: true })"
            },
            {
              "term": "Index",
              "definition": "A data structure that improves the speed of queries on a collection, at the cost of extra write overhead and storage. Without an appropriate index, MongoDB must scan every document (a collection scan) to satisfy a query.",
              "code": "db.users.createIndex({ email: 1 })   // ascending index on email"
            },
            {
              "term": "Cursor",
              "definition": "A pointer to the result set of a query. find() returns a cursor rather than an array directly, allowing results to be iterated, sorted, limited, or skipped without loading everything into memory at once.",
              "code": "db.users.find({ isActive: true }).sort({ age: -1 }).limit(10)"
            },
            {
              "term": "Projection",
              "definition": "The second argument to find() that specifies which fields to include or exclude in the returned documents. 1 includes a field, 0 excludes it — you generally cannot mix inclusion and exclusion (except for _id).",
              "code": "db.users.find({ isActive: true }, { name: 1, email: 1, _id: 0 })"
            },
            {
              "term": "Aggregation Pipeline",
              "definition": "A framework for transforming and computing results over a collection using a sequence of stages (like $match, $group, $sort). More powerful than find() for reshaping, grouping, and computing derived data.",
              "code": "db.orders.aggregate([\n  { $match: { status: \"paid\" } },\n  { $group: { _id: \"$customerId\", total: { $sum: \"$amount\" } } }\n])"
            }
          ]
        }
      ]
    },

    {
      "id": "comparison-table",
      "type": "comparison",
      "label": "Differentiate / Comparison",
      "heading": "When to Use Which Operator",
      "blocks": [
        {
          "type": "table",
          "headers": ["Goal", "Operator to Use", "Example"],
          "rows": [
            ["Find documents older than 18",             "$gt",       "{ age: { $gt: 18 } }"],
            ["Find users who are not guests",            "$ne",       "{ role: { $ne: \"guest\" } }"],
            ["Find users with role admin OR manager",    "$in",       "{ role: { $in: [\"admin\",\"manager\"] } }"],
            ["Find users that are NOT admin or manager", "$nin",      "{ role: { $nin: [\"admin\",\"manager\"] } }"],
            ["Find active users over 18",                "$and",      "{ isActive: true, age: { $gt: 18 } }"],
            ["Search name or email",                     "$or",       "{ $or: [{email:\"..\"},{phone:\"..\"}] }"],
            ["Exclude banned guests and inactive",       "$nor",      "{ $nor: [{role:\"guest\"},{isActive:false}] }"],
            ["Check field exists",                       "$exists",   "{ phone: { $exists: true } }"],
            ["Check field type",                         "$type",     "{ age: { $type: \"number\" } }"],
            ["Name contains 'shiv' (case insensitive)",  "$regex",    "{ name: { $regex: /shiv/i } }"],
            ["Full-text search on indexed fields",       "$text",     "{ $text: { $search: \"mongodb\" } }"],
            ["Array has Node.js AND MongoDB",            "$all",      "{ skills: { $all: [\"Node.js\",\"MongoDB\"] } }"],
            ["Array has exactly 3 elements",             "$size",     "{ skills: { $size: 3 } }"],
            ["Update one field without touching others", "$set",      "{ $set: { age: 25 } }"],
            ["Remove a field from document",             "$unset",    "{ $unset: { token: \"\" } }"],
            ["Increment a view counter",                 "$inc",      "{ $inc: { views: 1 } }"],
            ["Add item to array (allows duplicates)",    "$push",     "{ $push: { skills: \"Go\" } }"],
            ["Add item to array (no duplicates)",        "$addToSet", "{ $addToSet: { tags: \"nodejs\" } }"],
            ["Remove specific value from array",         "$pull",     "{ $pull: { skills: \"PHP\" } }"]
          ]
        }
      ]
    },

    {
      "id": "boxes",
      "type": "highlight-box",
      "label": "Key Rules",
      "heading": "Key Operator Rules",
      "blocks": [
        {
          "type": "text-box",
          "variant": "remember",
          "title": "Remember",
          "text": "Never use update without $set — without it MongoDB replaces the ENTIRE document with only the fields you sent. Always wrap updates in { $set: { ... } }."
        },
        {
          "type": "text-box",
          "variant": "tip",
          "title": "Tip",
          "text": "Use $addToSet instead of $push when adding to arrays where duplicates are not allowed — like tags, skills, or roles. It checks uniqueness automatically."
        },
        {
          "type": "text-box",
          "variant": "warning",
          "title": "Warning",
          "text": "$regex is slow on large collections unless the pattern is anchored at the start (^pattern) and the field is indexed. For full-text search use a text index with $text instead."
        },
        {
          "type": "text-box",
          "variant": "note",
          "title": "Note",
          "text": "$exists: false and { field: null } are different. $exists: false only matches documents where the field is completely absent. { field: null } matches both absent fields AND fields explicitly set to null."
        },
        {
          "type": "text-box",
          "variant": "interview",
          "title": "Interview",
          "text": "What is the difference between $or and $in? — $in checks ONE field against multiple values. $or can check DIFFERENT fields with different conditions. { role: { $in: [\"a\",\"b\"] } } is more efficient than { $or: [{role:\"a\"},{role:\"b\"}] } for the same field."
        }
      ]
    },

    {
      "id": "accordion",
      "type": "accordion",
      "label": "Deep Dive",
      "heading": "Operator Deep Dive",
      "blocks": [
        {
          "type": "accordion",
          "items": [
            {
              "title": "What is the difference between $or and $in?",
              "text": "$in checks ONE field against an array of values — { role: { $in: [\"admin\",\"manager\"] } }. $or checks MULTIPLE fields or conditions — { $or: [{role:\"admin\"},{age:{$gt:30}}] }. When checking the same field against multiple values, $in is more efficient and readable than $or."
            },
            {
              "title": "What is the difference between $pull and $pop?",
              "text": "$pull removes elements by VALUE or condition — { $pull: { skills: \"PHP\" } } removes all occurrences of \"PHP\". $pop removes by POSITION — $pop: { arr: 1 } removes the last element, $pop: { arr: -1 } removes the first. Use $pull when you know the value, $pop when you need to trim the ends."
            },
            {
              "title": "What is the difference between $push and $addToSet?",
              "text": "$push always adds the element to the array, even if it already exists — it allows duplicates. $addToSet adds the element ONLY if it is not already present — it enforces uniqueness. Use $addToSet for tags, roles, or skills where duplicates make no sense."
            },
            {
              "title": "When should you use $elemMatch vs dot notation?",
              "text": "Use $elemMatch when querying arrays of objects where multiple conditions must apply to the SAME element. With dot notation, each condition can be satisfied by different elements, which causes false positives. Example: { scores: { $elemMatch: { subject: \"Math\", score: { $gt: 90 } } } } ensures the same score object satisfies both conditions."
            },
            {
              "title": "What is the difference between $text and $regex for search?",
              "text": "$regex does character-level pattern matching and is flexible but slow on large collections unless anchored with ^. $text uses a pre-built text index and is much faster for keyword search — it supports stemming, stop words, and language awareness. Use $regex for specific pattern matching, use $text for full-text keyword search at scale."
            },
            {
              "title": "What does $expr allow that regular operators cannot?",
              "text": "$expr allows you to compare two fields within the SAME document in a query filter. Example: find orders where discount > tax — { $expr: { $gt: [\"$discount\", \"$tax\"] } }. Regular comparison operators can only compare a field to a literal value, not to another field."
            }
          ]
        }
      ]
    }

  ]
}