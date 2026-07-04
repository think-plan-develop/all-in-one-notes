window.notePageData = {
  "title": "MongoDB Array Operators",
  "navLabel": "Array Operator Sections",
  "hero": {
    "type": "introduction",
    "label": "MongoDB Array Operators",
    "heading": "MongoDB Array Operators",
    "text": "A complete reference for MongoDB array operators — both querying array fields and updating them — with real examples, use cases, and interview Q&A."
  },
  "nav": [
    {
      "label": "Array Query",
      "href": "#array-query-operators"
    },
    {
      "label": "Update Arrays",
      "href": "#update-array-operators"
    }
  ],
  "sections": [
    {
      "id": "array-query-operators",
      "type": "query-section",
      "label": "Array Query Operators",
      "heading": "Array Query Operators",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Array operators are used to query documents with array fields. ",
            { "code": "$all" },
            " checks that all values exist in the array, ",
            { "code": "$size" },
            " checks the array length, and ",
            { "code": "$elemMatch" },
            " applies multiple conditions to a single array element."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "$all — Array Contains All",
              "definition": "Matches documents where the array field contains ALL of the specified values (in any order). If any value is missing, the document is excluded. Example: find users who have BOTH Node.js AND MongoDB skills.",
              "code": "db.users.find({ skills: { $all: [\"Node.js\", \"MongoDB\"] } })"
            },
            {
              "term": "$size — Array Length Match",
              "definition": "Matches documents where the array field has exactly the specified number of elements. Does not accept ranges ($gt, $lt). To query ranges of array sizes, use $where or check array index existence.",
              "code": "db.users.find({ skills: { $size: 3 } })"
            },
            {
              "term": "$elemMatch — Array Element Condition",
              "definition": "Matches documents where at least one array element satisfies ALL the given conditions simultaneously. Without $elemMatch, each condition can be satisfied by a different element. Use $elemMatch when elements are objects with multiple fields.",
              "code": "db.students.find({ scores: { $elemMatch: { subject: \"Math\", score: { $gte: 90 } } } })"
            }
          ]
        },
        {
          "type": "code",
          "filename": "array-operators.mongodb",
          "text": "// ── $all ── array must contain ALL specified values\ndb.users.find({ skills: { $all: [\"Node.js\", \"MongoDB\"] } })\n// Matches users who have BOTH Node.js AND MongoDB (order doesn't matter)\n\ndb.products.find({ tags: { $all: [\"sale\", \"featured\"] } })\n// Matches products tagged as BOTH sale AND featured\n\n\n// ── $size ── exact array length\ndb.users.find({ skills: { $size: 3 } })\n// Matches users who have EXACTLY 3 skills\n\ndb.orders.find({ items: { $size: 1 } })\n// Matches orders with exactly 1 item\n\n\n// ── $elemMatch ── one element must satisfy all conditions\n// Array of objects: scores = [{ subject: \"Math\", score: 95 }, ...]\ndb.students.find({\n  scores: {\n    $elemMatch: {\n      subject: \"Math\",\n      score:   { $gte: 90 }\n    }\n  }\n})\n// Matches students with a Math score >= 90 (same element must satisfy BOTH)\n\n// Without $elemMatch — WRONG for object arrays\n// This would match if 'subject' is Math in one element\n// AND 'score' >= 90 in ANY other element\ndb.students.find({\n  \"scores.subject\": \"Math\",\n  \"scores.score\":   { $gte: 90 }\n})\n\n// Dot notation — query field inside array of objects\ndb.orders.find({ \"items.productId\": \"abc123\" })\ndb.users.find({ \"address.city\": \"Delhi\" })"
        }
      ]
    },
    {
      "id": "update-array-operators",
      "type": "query-section",
      "label": "Update Array Operators",
      "heading": "Update Array Operators",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "These operators modify array fields inside documents. Use ",
            { "code": "$push" },
            " to add elements, ",
            { "code": "$pull" },
            " to remove specific elements, ",
            { "code": "$pop" },
            " to remove from the ends, ",
            { "code": "$addToSet" },
            " to add only if the value does not already exist, and the positional operators ",
            { "code": "$" },
            ", ",
            { "code": "$[]" },
            ", and ",
            { "code": "$[<identifier>]" },
            " to target which array element(s) get updated."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "$push — Add Element to Array",
              "definition": "Appends one or more elements to an array field. If the field does not exist, it is created as an array. Use with $each to push multiple elements at once. Use with $position to insert at a specific index.",
              "code": "db.users.updateOne({ _id: id }, { $push: { skills: \"TypeScript\" } })"
            },
            {
              "term": "$pull — Remove Matching Elements",
              "definition": "Removes all elements from an array that match a specified value or condition. Can remove by exact value or by a query condition using operators like $gt, $in.",
              "code": "db.users.updateOne({ _id: id }, { $pull: { skills: \"PHP\" } })"
            },
            {
              "term": "$addToSet — Add Only if Unique",
              "definition": "Adds an element to an array only if it does not already exist. Prevents duplicate values automatically. Ideal for tags, categories, watchlists — any set-like array.",
              "code": "db.users.updateOne({ _id: id }, { $addToSet: { tags: \"nodejs\" } })"
            },
            {
              "term": "$pop — Remove First or Last",
              "definition": "Removes the first (-1) or last (1) element of an array. Does not target by value — only by position.",
              "code": "db.users.updateOne({ _id: id }, { $pop: { skills: -1 } })"
            },
            {
              "term": "$pullAll — Remove Multiple Exact Values",
              "definition": "Removes all occurrences of all specified values from the array at once. Unlike $pull, it does not accept query operators — only exact values.",
              "code": "db.users.updateOne({ _id: id }, { $pullAll: { skills: [\"PHP\", \"jQuery\", \"Flash\"] } })"
            },
            {
              "term": "$each — Modifier for $push / $addToSet",
              "definition": "Used with $push or $addToSet to insert multiple elements in a single operation instead of calling the operator repeatedly.",
              "code": "db.users.updateOne({ _id: id }, { $push: { skills: { $each: [\"Docker\", \"AWS\", \"Redis\"] } } })"
            },
            {
              "term": "$slice — Limit Array Size after $push",
              "definition": "Used with $push and $each to limit the array to a maximum number of elements after pushing. Positive = keep from start, Negative = keep from end.",
              "code": "db.users.updateOne({ _id: id }, { $push: { notifications: { $each: [], $slice: -5 } } })"
            },
            {
              "term": "$position — Insert at Specific Index",
              "definition": "Used with $push and $each to specify the index at which new elements should be inserted, instead of appending them to the end of the array.",
              "code": "db.users.updateOne({ _id: id }, { $push: { skills: { $each: [\"Go\"], $position: 0 } } })"
            },
            {
              "term": "$ — First Match Positional Operator",
              "definition": "Identifies the first array element that matches the query condition, so an update can target that specific element without knowing its index in advance.",
              "code": "db.students.updateOne({ \"scores.subject\": \"Math\" }, { $set: { \"scores.$.score\": 95 } })"
            },
            {
              "term": "$[] — All Elements Positional Operator",
              "definition": "Applies the update to every element in the array field, useful for bulk-modifying a property across all array entries in one call.",
              "code": "db.students.updateOne({ _id: id }, { $set: { \"scores.$[].reviewed\": true } })"
            },
            {
              "term": "$[<identifier>] — Filtered Positional Operator",
              "definition": "Applies the update only to array elements that match a condition defined in arrayFilters, allowing precise multi-element updates without $elemMatch on the query side.",
              "code": "db.students.updateMany({}, { $set: { \"scores.$[elem].bonus\": 5 } }, { arrayFilters: [{ \"elem.score\": { $gte: 90 } }] })"
            }
          ]
        },
        {
          "type": "code",
          "filename": "update-array-operators.mongodb",
          "text": "// ── $push ── add one element to array\ndb.users.updateOne(\n  { _id: id },\n  { $push: { skills: \"TypeScript\" } }\n)\n\n// $push with $each — add multiple elements at once\ndb.users.updateOne(\n  { _id: id },\n  { $push: { skills: { $each: [\"Docker\", \"AWS\", \"Redis\"] } } }\n)\n\n// $push with $each + $position — insert at index 0 (beginning)\ndb.users.updateOne(\n  { _id: id },\n  { $push: { skills: { $each: [\"Go\"], $position: 0 } } }\n)\n\n// $push with $slice — keep only last 5 notifications\ndb.users.updateOne(\n  { _id: id },\n  {\n    $push: {\n      notifications: {\n        $each:  [{ msg: \"New login\", at: new Date() }],\n        $slice: -5   // keep last 5 only\n      }\n    }\n  }\n)\n\n\n// ── $pull ── remove matching elements\ndb.users.updateOne(\n  { _id: id },\n  { $pull: { skills: \"PHP\" } }  // remove \"PHP\" from skills array\n)\n\n// $pull with condition — remove elements matching criteria\ndb.orders.updateOne(\n  { _id: orderId },\n  { $pull: { items: { price: { $lt: 10 } } } }  // remove cheap items\n)\n\n\n// ── $addToSet ── add only if not already present\ndb.users.updateOne(\n  { _id: id },\n  { $addToSet: { tags: \"nodejs\" } }  // no duplicate if \"nodejs\" exists\n)\n\n// $addToSet with $each\ndb.users.updateOne(\n  { _id: id },\n  { $addToSet: { tags: { $each: [\"mongodb\", \"typescript\"] } } }\n)\n\n\n// ── $pop ── remove first or last element\ndb.users.updateOne(\n  { _id: id },\n  { $pop: { skills: 1 } }   //  1 = remove LAST element\n)\ndb.users.updateOne(\n  { _id: id },\n  { $pop: { skills: -1 } }  // -1 = remove FIRST element\n)\n\n\n// ── $pullAll ── remove multiple exact values at once\ndb.users.updateOne(\n  { _id: id },\n  { $pullAll: { skills: [\"PHP\", \"jQuery\", \"Flash\"] } }\n)\n\n\n// ── $ (positional) ── update the first matching array element\n// scores = [{ subject: \"Math\", score: 80 }, { subject: \"Science\", score: 70 }]\ndb.students.updateOne(\n  { \"scores.subject\": \"Math\" },\n  { $set: { \"scores.$.score\": 95 } }\n)\n// Only the Math element's score is updated\n\n\n// ── $[] (all positional) ── update every element in the array\ndb.students.updateOne(\n  { _id: id },\n  { $set: { \"scores.$[].reviewed\": true } }\n)\n// Every object in scores gets reviewed: true\n\n\n// ── $[<identifier>] (filtered positional) ── update only matching elements\ndb.students.updateMany(\n  {},\n  { $set: { \"scores.$[elem].bonus\": 5 } },\n  { arrayFilters: [{ \"elem.score\": { $gte: 90 } }] }\n)\n// Only elements where score >= 90 get a bonus field added"
        }
      ]
    }
  ]
};