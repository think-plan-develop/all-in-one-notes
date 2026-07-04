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
    { "label": "Query Operators", "href": "#query-operators" },
    { "label": "Array Operators", "href": "#array-operators" },
    { "label": "Projection", "href": "#projection" },
    { "label": "Sorting", "href": "#sorting" },
    { "label": "Pagination", "href": "#pagination" }
  ],
  "sections": [

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
          "definition": "Greater Than",
          "code": "db.users.find({ age: { $gt: 18 } })"
        },
        {
          "term": "$gte",
          "definition": "Greater Than or Equal To",
          "code": "db.users.find({ age: { $gte: 18 } })"
        },
        {
          "term": "$lt",
          "definition": "Less Than",
          "code": "db.users.find({ age: { $lt: 60 } })"
        },
        {
          "term": "$lte",
          "definition": "Less Than or Equal To",
          "code": "db.users.find({ age: { $lte: 60 } })"
        },
        {
          "term": "$in",
          "definition": "Match values from provided array.",
          "code": "db.users.find({ role: { $in: ['admin', 'manager'] } })"
        },
        {
          "term": "$nin",
          "definition": "Exclude values from provided array.",
          "code": "db.users.find({ role: { $nin: ['guest'] } })"
        },
        {
          "term": "$and",
          "definition": "All conditions must be true.",
          "code": "db.users.find({ $and: [{ age: { $gt: 18 } }, { status: 'active' }] })"
        },
        {
          "term": "$or",
          "definition": "At least one condition must be true.",
          "code": "db.users.find({ $or: [{ role: 'admin' }, { role: 'manager' }] })"
        },
        {
          "term": "$not",
          "definition": "Negates a condition.",
          "code": "db.users.find({ age: { $not: { $gt: 18 } } })"
        },
        {
          "term": "$eq",
          "definition": "Matches values equal to a specified value.",
          "code": "db.users.find({ status: { $eq: 'active' } })"
        },
        {
          "term": "$ne",
          "definition": "Matches values not equal to a specified value.",
          "code": "db.users.find({ status: { $ne: 'inactive' } })"
        },
        {
          "term": "$exists",
          "definition": "Matches documents that have (or lack) the specified field.",
          "code": "db.users.find({ email: { $exists: true } })"
        },
        {
          "term": "$type",
          "definition": "Matches documents where a field is of the specified BSON type.",
          "code": "db.users.find({ age: { $type: 'int' } })"
        },
        {
          "term": "$regex",
          "definition": "Matches string values against a regular expression pattern.",
          "code": "db.users.find({ name: { $regex: '^A', $options: 'i' } })"
        },
        {
          "term": "$nor",
          "definition": "None of the specified conditions can be true.",
          "code": "db.users.find({ $nor: [{ role: 'guest' }, { status: 'banned' }] })"
        },
        {
          "term": "$expr",
          "definition": "Allows use of aggregation expressions within the query language.",
          "code": "db.orders.find({ $expr: { $gt: ['$spent', '$budget'] } })"
        },
        {
          "term": "$mod",
          "definition": "Matches documents where a field value divided by a divisor has a specified remainder.",
          "code": "db.users.find({ age: { $mod: [2, 0] } })"
        }
      ]
    },
    {
      "type": "code",
      "filename": "operators.mongodb",
      "text": "db.users.find({age:{$gt:18}})\n\ndb.users.find({age:{$gte:18}})\n\ndb.users.find({age:{$lt:60}})\n\ndb.users.find({age:{$lte:60}})\n\ndb.users.find({role:{$in:['admin','manager']}})\n\ndb.users.find({role:{$nin:['guest']}})\n\ndb.users.find({$and:[{age:{$gt:18}},{status:'active'}]})\n\ndb.users.find({$or:[{role:'admin'},{role:'manager'}]})\n\ndb.users.find({age:{$not:{$gt:18}}})\n\ndb.users.find({status:{$eq:'active'}})\n\ndb.users.find({status:{$ne:'inactive'}})\n\ndb.users.find({email:{$exists:true}})\n\ndb.users.find({age:{$type:'int'}})\n\ndb.users.find({name:{$regex:'^A',$options:'i'}})\n\ndb.users.find({$nor:[{role:'guest'},{status:'banned'}]})\n\ndb.orders.find({$expr:{$gt:['$spent','$budget']}})\n\ndb.users.find({age:{$mod:[2,0]}})"
    }
  ]
}
  ]
};