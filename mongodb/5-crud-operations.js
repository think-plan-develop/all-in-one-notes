window.notePageData = {
    "title":  "MongoDB CRUD Operations",
    "navLabel":  "CRUD Sections",
    "hero":  {
                 "type":  "introduction",
                 "label":  "",
                 "heading":  "MongoDB CRUD Operations",
                 "text":  "CRUD stands for Create, Read, Update, and Delete — the four fundamental operations performed on any database. In MongoDB, these operations work on documents inside collections using a flexible JSON-style query language, making it intuitive and powerful for modern Node.js applications."
             },
    "nav":  [
                {
                    "label":  "Notes",
                    "href":  "#notes"
                },
                {
                    "label":  "Definitions",
                    "href":  "#terms"
                },
                {
                    "label":  "Diagram",
                    "href":  "#diagram"
                },
                {
                    "label":  "Create",
                    "href":  "#create"
                },
                {
                    "label":  "Read",
                    "href":  "#read"
                },
                {
                    "label":  "Update",
                    "href":  "#update"
                },
                {
                    "label":  "Delete",
                    "href":  "#delete"
                },
                {
                    "label":  "Mongoose",
                    "href":  "#mongoose"
                },
                {
                    "label":  "Comparison",
                    "href":  "#comparison"
                },
                {
                    "label":  "Boxes",
                    "href":  "#boxes"
                },
                {
                    "label":  "Table",
                    "href":  "#table-section"
                },
                {
                    "label":  "Accordion",
                    "href":  "#accordion"
                },
                {
                    "label":  "Timeline",
                    "href":  "#timeline"
                },
                {
                    "label":  "Use Cases",
                    "href":  "#use-cases"
                },
                {
                    "label":  "Best Practices",
                    "href":  "#best-practices"
                },
                {
                    "label":  "Mistakes",
                    "href":  "#common-mistakes"
                },
                {
                    "label":  "Debugging",
                    "href":  "#debugging"
                },
                {
                    "label":  "Interview",
                    "href":  "#interview"
                },
                {
                    "label":  "Q\u0026A",
                    "href":  "#qa"
                },
                {
                    "label":  "Summary",
                    "href":  "#summary"
                }
            ],
    "sections":  [
                    
                     {
                         "id":  "terms",
                         "type":  "terminology",
                         "label":  "Terminology / Key Definitions",
                         "heading":  "CRUD Terminology",
                         "blocks":  [
                                        {
                                            "type":  "definitions",
                                            "items":  [
                                                          {
                                                              "term":  "Create",
                                                              "definition":  "Insert one or more new documents into a collection using insertOne() or insertMany()."
                                                          },
                                                          {
                                                              "term":  "Read",
                                                              "definition":  "Query and retrieve documents from a collection using find(), findOne(), or findById()."
                                                          },
                                                          {
                                                              "term":  "Update",
                                                              "definition":  "Modify existing documents using updateOne(), updateMany(), or findByIdAndUpdate()."
                                                          },
                                                          {
                                                              "term":  "Delete",
                                                              "definition":  "Remove documents from a collection using deleteOne(), deleteMany(), or findByIdAndDelete()."
                                                          },
                                                          {
                                                              "term":  "Filter",
                                                              "definition":  "A JSON query object used to match documents. Example: { age: { $gt: 18 } }."
                                                          },
                                                          {
                                                              "term":  "$set",
                                                              "definition":  "Update operator that modifies specific fields without touching other fields in the document."
                                                          },
                                                          {
                                                              "term":  "$push",
                                                              "definition":  "Update operator that appends a value to an array field."
                                                          },
                                                          {
                                                              "term":  "$pull",
                                                              "definition":  "Update operator that removes a matching value from an array field."
                                                          },
                                                          {
                                                              "term":  "$inc",
                                                              "definition":  "Update operator that increments or decrements a numeric field by a specified value."
                                                          },
                                                          {
                                                              "term":  "Projection",
                                                              "definition":  "Specifies which fields to include or exclude in query results. Example: { name: 1, _id: 0 }."
                                                          },
                                                          {
                                                              "term":  "upsert",
                                                              "definition":  "Option that creates a new document if no matching document is found during an update."
                                                          },
                                                          {
                                                              "term":  "ObjectId",
                                                              "definition":  "A unique 12-byte identifier automatically assigned to every MongoDB document as its _id field."
                                                          }
                                                      ]
                                        }
                                    ]
                     },
                    
                     {
                         "id":  "create",
                         "type":  "code-snippet",
                         "label":  "Code Snippet",
                         "heading":  "CREATE — Insert Documents",
                         "blocks":  [
                                        {
                                            "type":  "paragraph",
                                            "parts":  [
                                                          "Create operations insert new documents into a collection. Use ",
                                                          {
                                                              "code":  "Model.create()"
                                                          },
                                                          " for the simplest approach, or ",
                                                          {
                                                              "code":  "new Model().save()"
                                                          },
                                                          " when you need to manipulate the document before saving. Use ",
                                                          {
                                                              "code":  "insertMany()"
                                                          },
                                                          " to insert multiple documents in one operation."
                                                      ]
                                        },
                                        {
                                            "type":  "code",
                                            "filename":  "create.ts",
                                            "text":  "import User from \u0027./user.model\u0027;\n\n// Method 1: Model.create() — simplest approach\nconst newUser = await User.create({\n  firstName: \u0027Shivam\u0027,\n  lastName:  \u0027Kumar\u0027,\n  email:     \u0027shivam@example.com\u0027,\n  age:       24,\n  isActive:  true\n});\n// runs schema validation + pre/post save hooks\n\n// Method 2: new Model + save() — useful when you need\n// to modify the doc before saving\nconst user = new User({\n  firstName: \u0027Priya\u0027,\n  email:     \u0027priya@example.com\u0027\n});\nuser.firstName = user.firstName.toUpperCase();\nawait user.save();\n\n// Method 3: insertMany — bulk insert\nawait User.insertMany([\n  { firstName: \u0027Raj\u0027,  email: \u0027raj@example.com\u0027  },\n  { firstName: \u0027Arun\u0027, email: \u0027arun@example.com\u0027 }\n]);\n\n// Response shape from create()\n// {\n//   _id:       \u002766abc123...\u0027,\n//   firstName: \u0027Shivam\u0027,\n//   email:     \u0027shivam@example.com\u0027,\n//   isActive:  true,\n//   createdAt: \u00272025-06-19T10:00:00.000Z\u0027,\n//   updatedAt: \u00272025-06-19T10:00:00.000Z\u0027,\n//   __v: 0\n// }"
                                        }
                                    ]
                     },
                     {
                         "id":  "read",
                         "type":  "code-snippet",
                         "label":  "Code Snippet",
                         "heading":  "READ — Query Documents",
                         "blocks":  [
                                        {
                                            "type":  "paragraph",
                                            "parts":  [
                                                          "Read operations retrieve documents from a collection. Use ",
                                                          {
                                                              "code":  "find()"
                                                          },
                                                          " to get multiple documents and ",
                                                          {
                                                              "code":  "findOne()"
                                                          },
                                                          " or ",
                                                          {
                                                              "code":  "findById()"
                                                          },
                                                          " for a single match. Chain ",
                                                          {
                                                              "code":  ".select()"
                                                          },
                                                          ", ",
                                                          {
                                                              "code":  ".sort()"
                                                          },
                                                          ", ",
                                                          {
                                                              "code":  ".skip()"
                                                          },
                                                          ", and ",
                                                          {
                                                              "code":  ".limit()"
                                                          },
                                                          " for projection, sorting, and pagination."
                                                      ]
                                        },
                                        {
                                            "type":  "code",
                                            "filename":  "read.ts",
                                            "text":  "import User from \u0027./user.model\u0027;\n\n// Get ALL documents\nconst allUsers = await User.find();\n\n// Filter by field\nconst activeUsers = await User.find({ isActive: true });\n\n// Comparison operators\nconst adults  = await User.find({ age: { $gte: 18 } });\nconst seniors = await User.find({ age: { $gt: 60 } });\nconst young   = await User.find({ age: { $lt: 30 } });\n\n// findOne — returns first matching document or null\nconst user = await User.findOne({ email: \u0027shivam@example.com\u0027 });\n\n// findById — lookup by _id field\nconst byId = await User.findById(\u002766abc123...\u0027);\n\n// Projection — select specific fields only\nconst names = await User\n  .find()\n  .select(\u0027firstName email -_id\u0027);  // include name,email exclude _id\n\n// Exclude sensitive fields\nconst safe = await User\n  .find()\n  .select(\u0027-password -__v\u0027);\n\n// Sort + Pagination\nconst page  = 2;\nconst limit = 10;\nconst paged = await User\n  .find({ isActive: true })\n  .sort({ createdAt: -1 })       // newest first\n  .skip((page - 1) * limit)      // skip page 1\n  .limit(limit);                 // take 10\n\n// Count total (for pagination meta)\nconst total = await User.countDocuments({ isActive: true });\n\n// Multiple filters with AND logic\nconst result = await User.find({\n  isActive: true,\n  age: { $gte: 18, $lte: 60 }\n});\n\n// OR logic\nconst orResult = await User.find({\n  $or: [\n    { firstName: \u0027Shivam\u0027 },\n    { email: \u0027admin@example.com\u0027 }\n  ]\n});"
                                        }
                                    ]
                     },
                     {
                         "id":  "update",
                         "type":  "code-snippet",
                         "label":  "Code Snippet",
                         "heading":  "UPDATE — Modify Documents",
                         "blocks":  [
                                        {
                                            "type":  "paragraph",
                                            "parts":  [
                                                          "Update operations modify existing documents. Always use ",
                                                          {
                                                              "code":  "$set"
                                                          },
                                                          " to update only specific fields — without it, MongoDB replaces the entire document. Pass ",
                                                          {
                                                              "code":  "{ new: true }"
                                                          },
                                                          " to receive the updated document back from ",
                                                          {
                                                              "code":  "findByIdAndUpdate()"
                                                          },
                                                          ". Always include ",
                                                          {
                                                              "code":  "{ runValidators: true }"
                                                          },
                                                          " so schema rules apply on updates too."
                                                      ]
                                        },
                                        {
                                            "type":  "code",
                                            "filename":  "update.ts",
                                            "text":  "import User from \u0027./user.model\u0027;\n\n// updateOne — update first matching document\n// Returns: { matchedCount, modifiedCount } — NOT the document\nawait User.updateOne(\n  { email: \u0027shivam@example.com\u0027 },      // filter\n  { $set: { firstName: \u0027Shivam V2\u0027 } }  // update only this field\n);\n\n// updateMany — update all matching documents\nawait User.updateMany(\n  { isActive: false },\n  { $set: { isActive: true } }\n);\n\n// findByIdAndUpdate — returns the document\n// { new: true }          → return UPDATED doc (not old)\n// { runValidators: true } → run schema validation on update\nconst updated = await User.findByIdAndUpdate(\n  \u002766abc123...\u0027,\n  { $set: { age: 25 } },\n  { new: true, runValidators: true }\n);\n\n// findOneAndUpdate — by custom filter\nconst result = await User.findOneAndUpdate(\n  { email: \u0027priya@example.com\u0027 },\n  { $set: { lastName: \u0027Sharma\u0027 } },\n  { new: true }\n);\n\n// $inc — increment a numeric field\nawait User.updateOne(\n  { _id: \u002766abc123...\u0027 },\n  { $inc: { age: 1 } }       // age = age + 1\n);\n\n// $push — add item to array field\nawait User.updateOne(\n  { _id: \u002766abc123...\u0027 },\n  { $push: { tags: \u0027nodejs\u0027 } }\n);\n\n// $pull — remove item from array field\nawait User.updateOne(\n  { _id: \u002766abc123...\u0027 },\n  { $pull: { tags: \u0027nodejs\u0027 } }\n);\n\n// upsert — create if not found, update if found\nawait User.updateOne(\n  { email: \u0027new@example.com\u0027 },\n  { $set: { firstName: \u0027New User\u0027, isActive: true } },\n  { upsert: true }\n);"
                                        }
                                    ]
                     },
                     {
                         "id":  "delete",
                         "type":  "code-snippet",
                         "label":  "Code Snippet",
                         "heading":  "DELETE — Remove Documents",
                         "blocks":  [
                                        {
                                            "type":  "paragraph",
                                            "parts":  [
                                                          "Delete operations permanently remove documents. Use ",
                                                          {
                                                              "code":  "findByIdAndDelete()"
                                                          },
                                                          " for single document deletion by ID, and ",
                                                          {
                                                              "code":  "deleteMany()"
                                                          },
                                                          " to remove all matching documents. In production, prefer the ",
                                                          {
                                                              "code":  "soft delete"
                                                          },
                                                          " pattern — set ",
                                                          {
                                                              "code":  "isDeleted: true"
                                                          },
                                                          " instead of permanently removing data."
                                                      ]
                                        },
                                        {
                                            "type":  "code",
                                            "filename":  "delete.ts",
                                            "text":  "import User from \u0027./user.model\u0027;\n\n// deleteOne — delete first matching document\n// Returns: { deletedCount: 1 } — NOT the document\nawait User.deleteOne({ email: \u0027shivam@example.com\u0027 });\n\n// findByIdAndDelete — delete by _id, returns the deleted doc\nconst deleted = await User.findByIdAndDelete(\u002766abc123...\u0027);\nif (!deleted) throw new Error(\u0027User not found\u0027);\n// \u0027deleted\u0027 contains the document that was removed\n\n// deleteMany — delete all matching documents\nawait User.deleteMany({ isActive: false });\n\n// WARNING: empty filter deletes EVERYTHING\n// await User.deleteMany({});  // NEVER do this in production\n\n// Soft Delete Pattern — RECOMMENDED for production\n// Instead of deleting, mark the document as deleted\nconst softDeleted = await User.findByIdAndUpdate(\n  \u002766abc123...\u0027,\n  {\n    $set: {\n      isDeleted:  true,\n      deletedAt:  new Date()\n    }\n  },\n  { new: true }\n);\n\n// Then filter soft-deleted docs out of all queries:\nconst activeUsers = await User.find({\n  isDeleted: { $ne: true }  // $ne = not equal\n});"
                                        }
                                    ]
                     },
                     {
                         "id":  "mongoose",
                         "type":  "code-snippet",
                         "label":  "Code Snippet",
                         "heading":  "Mongoose CRUD — Full Service Layer",
                         "blocks":  [
                                        {
                                            "type":  "paragraph",
                                            "parts":  [
                                                          "A production-style service layer that wraps all four CRUD operations. The service never touches ",
                                                          {
                                                              "code":  "req"
                                                          },
                                                          " or ",
                                                          {
                                                              "code":  "res"
                                                          },
                                                          " — it only works with data and throws structured errors that the controller catches and converts to HTTP responses."
                                                      ]
                                        },
                                        {
                                            "type":  "code",
                                            "filename":  "user.service.ts",
                                            "text":  "import User from \u0027./user.model\u0027;\n\n// CREATE\nexport const createUser = async (data: any) =\u003e {\n  const exists = await User.findOne({ email: data.email });\n  if (exists) {\n    const err: any = new Error(\u0027Email already registered\u0027);\n    err.statusCode  = 409;\n    throw err;\n  }\n  return User.create(data);\n};\n\n// READ ALL — paginated\nexport const getAllUsers = async (page = 1, limit = 10) =\u003e {\n  const skip  = (page - 1) * limit;\n  const total = await User.countDocuments();\n  const users = await User\n    .find()\n    .select(\u0027-password\u0027)\n    .sort({ createdAt: -1 })\n    .skip(skip)\n    .limit(limit);\n  return { users, total, page, pages: Math.ceil(total / limit) };\n};\n\n// READ ONE\nexport const getUserById = async (id: string) =\u003e {\n  const user = await User.findById(id).select(\u0027-password\u0027);\n  if (!user) {\n    const err: any = new Error(\u0027User not found\u0027);\n    err.statusCode  = 404;\n    throw err;\n  }\n  return user;\n};\n\n// UPDATE\nexport const updateUser = async (id: string, data: any) =\u003e {\n  const user = await User.findByIdAndUpdate(\n    id,\n    { $set: data },\n    { new: true, runValidators: true }\n  ).select(\u0027-password\u0027);\n  if (!user) {\n    const err: any = new Error(\u0027User not found\u0027);\n    err.statusCode  = 404;\n    throw err;\n  }\n  return user;\n};\n\n// DELETE\nexport const deleteUser = async (id: string) =\u003e {\n  const user = await User.findByIdAndDelete(id);\n  if (!user) {\n    const err: any = new Error(\u0027User not found\u0027);\n    err.statusCode  = 404;\n    throw err;\n  }\n};"
                                        }
                                    ]
                     },
                     {
                         "id":  "comparison",
                         "type":  "comparison",
                         "label":  "Differentiate / Comparison",
                         "heading":  "MongoDB CRUD vs SQL CRUD",
                         "blocks":  [
                                        {
                                            "type":  "table",
                                            "headers":  [
                                                            "Operation",
                                                            "MongoDB / Mongoose",
                                                            "SQL"
                                                        ],
                                            "rows":  [
                                                         [
                                                             "Create",
                                                             "User.create(data) / insertOne()",
                                                             "INSERT INTO users VALUES (...)"
                                                         ],
                                                         [
                                                             "Read All",
                                                             "User.find()",
                                                             "SELECT * FROM users"
                                                         ],
                                                         [
                                                             "Read One",
                                                             "User.findById(id)",
                                                             "SELECT * FROM users WHERE id = ?"
                                                         ],
                                                         [
                                                             "Filter",
                                                             "User.find({ age: { $gt: 18 } })",
                                                             "SELECT * FROM users WHERE age \u003e 18"
                                                         ],
                                                         [
                                                             "Update One",
                                                             "User.findByIdAndUpdate(id, { $set })",
                                                             "UPDATE users SET ... WHERE id = ?"
                                                         ],
                                                         [
                                                             "Update Many",
                                                             "User.updateMany(filter, { $set })",
                                                             "UPDATE users SET ... WHERE ..."
                                                         ],
                                                         [
                                                             "Delete One",
                                                             "User.findByIdAndDelete(id)",
                                                             "DELETE FROM users WHERE id = ?"
                                                         ],
                                                         [
                                                             "Delete Many",
                                                             "User.deleteMany(filter)",
                                                             "DELETE FROM users WHERE ..."
                                                         ],
                                                         [
                                                             "Count",
                                                             "User.countDocuments(filter)",
                                                             "SELECT COUNT(*) FROM users WHERE ..."
                                                         ],
                                                         [
                                                             "Sort",
                                                             ".sort({ field: -1 })",
                                                             "ORDER BY field DESC"
                                                         ],
                                                         [
                                                             "Pagination",
                                                             ".skip(20).limit(10)",
                                                             "LIMIT 10 OFFSET 20"
                                                         ],
                                                         [
                                                             "Projection",
                                                             ".select(\u0027name email -_id\u0027)",
                                                             "SELECT name, email FROM users"
                                                         ]
                                                     ]
                                        }
                                    ]
                     },
                     {
                         "id":  "boxes",
                         "type":  "highlight-box",
                         "label":  "Highlight Box",
                         "heading":  "Important CRUD Notes",
                         "blocks":  [
                                        {
                                            "type":  "text-box",
                                            "variant":  "remember",
                                            "title":  "Remember",
                                            "text":  "findByIdAndUpdate() returns the OLD document by default. Always pass { new: true } to get the updated document back."
                                        },
                                        {
                                            "type":  "text-box",
                                            "variant":  "short-answer",
                                            "title":  "Short Answer",
                                            "text":  "C = create(). R = find() / findById(). U = findByIdAndUpdate() with $set. D = findByIdAndDelete()."
                                        },
                                        {
                                            "type":  "text-box",
                                            "variant":  "warning",
                                            "title":  "Warning",
                                            "text":  "deleteMany({}) with an empty filter deletes ALL documents in the collection permanently. Always double-check your filter."
                                        },
                                        {
                                            "type":  "text-box",
                                            "variant":  "tip",
                                            "title":  "Tip",
                                            "text":  "Always use { runValidators: true } in update operations. Without it, Mongoose schema validations are skipped on updates."
                                        },
                                        {
                                            "type":  "text-box",
                                            "variant":  "note",
                                            "title":  "Note",
                                            "text":  "Use .select(\u0027-password\u0027) to exclude sensitive fields from all read results instead of manually deleting them from the returned object."
                                        },
                                        {
                                            "type":  "text-box",
                                            "variant":  "interview",
                                            "title":  "Interview",
                                            "text":  "What is the difference between updateOne() and findByIdAndUpdate()? updateOne() returns { matchedCount, modifiedCount }. findByIdAndUpdate() returns the actual document (old or new based on { new: true })."
                                        }
                                    ]
                     },
                     {
                         "id":  "table-section",
                         "type":  "table-section",
                         "label":  "Table Section",
                         "heading":  "Mongoose CRUD Methods Cheat Sheet",
                         "blocks":  [
                                        {
                                            "type":  "table",
                                            "headers":  [
                                                            "Method",
                                                            "Operation",
                                                            "Returns",
                                                            "Key Options"
                                                        ],
                                            "rows":  [
                                                         [
                                                             "Model.create(data)",
                                                             "Create",
                                                             "Created document",
                                                             "—"
                                                         ],
                                                         [
                                                             "new Model(data).save()",
                                                             "Create",
                                                             "Saved document",
                                                             "—"
                                                         ],
                                                         [
                                                             "Model.insertMany([])",
                                                             "Create",
                                                             "Array of documents",
                                                             "ordered, rawResult"
                                                         ],
                                                         [
                                                             "Model.find(filter)",
                                                             "Read",
                                                             "Array of documents",
                                                             "select, sort, skip, limit"
                                                         ],
                                                         [
                                                             "Model.findOne(filter)",
                                                             "Read",
                                                             "Single document or null",
                                                             "select, sort"
                                                         ],
                                                         [
                                                             "Model.findById(id)",
                                                             "Read",
                                                             "Single document or null",
                                                             "select, populate"
                                                         ],
                                                         [
                                                             "Model.countDocuments(filter)",
                                                             "Read",
                                                             "Number",
                                                             "—"
                                                         ],
                                                         [
                                                             "Model.updateOne(filter, update)",
                                                             "Update",
                                                             "{ matchedCount, modifiedCount }",
                                                             "upsert, runValidators"
                                                         ],
                                                         [
                                                             "Model.updateMany(filter, update)",
                                                             "Update",
                                                             "{ matchedCount, modifiedCount }",
                                                             "upsert, runValidators"
                                                         ],
                                                         [
                                                             "Model.findByIdAndUpdate(id,upd)",
                                                             "Update",
                                                             "Document (old or new)",
                                                             "new, runValidators, upsert"
                                                         ],
                                                         [
                                                             "Model.findOneAndUpdate(f, upd)",
                                                             "Update",
                                                             "Document (old or new)",
                                                             "new, runValidators"
                                                         ],
                                                         [
                                                             "Model.deleteOne(filter)",
                                                             "Delete",
                                                             "{ deletedCount }",
                                                             "—"
                                                         ],
                                                         [
                                                             "Model.deleteMany(filter)",
                                                             "Delete",
                                                             "{ deletedCount }",
                                                             "—"
                                                         ],
                                                         [
                                                             "Model.findByIdAndDelete(id)",
                                                             "Delete",
                                                             "Deleted document or null",
                                                             "—"
                                                         ]
                                                     ]
                                        }
                                    ]
                     },
                
                     {
                         "id":  "summary",
                         "type":  "summary",
                         "label":  "Summary / Key Takeaways",
                         "heading":  "CRUD Quick Revision",
                         "blocks":  [
                                        {
                                            "type":  "list",
                                            "items":  [
                                                          "C = Create  →  Model.create() / new Model().save() / insertMany()",
                                                          "R = Read    →  Model.find() / findOne() / findById() + select, sort, skip, limit",
                                                          "U = Update  →  findByIdAndUpdate() with { $set, new: true, runValidators: true }",
                                                          "D = Delete  →  findByIdAndDelete() / soft delete pattern preferred in production",
                                                          "Always use $set in updates to avoid replacing the entire document.",
                                                          "Always pass { new: true } to get the updated document from findByIdAndUpdate().",
                                                          "Always validate incoming data before it reaches the service or model layer.",
                                                          "Use soft delete in production — never hard delete without a recovery strategy.",
                                                          "Use .select(\u0027-password\u0027) to exclude sensitive fields from all query results.",
                                                          "Mongoose wraps all native MongoDB driver methods with schema validation and lifecycle hooks."
                                                      ]
                                        }
                                    ]
                     }
                 ]
};


