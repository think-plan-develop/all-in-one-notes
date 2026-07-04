window.notePageData = {
  
  "title": "Mongoose Model Queries",
  "navLabel": "MongoDB Sections",
  "hero": {
    "type": "introduction",
    "label": "MongoDB Overview",
    "heading": "MongoDB",
    "text": "MongoDB is a NoSQL document-oriented database that stores data in BSON documents instead of traditional rows and columns. It is highly scalable, flexible, and widely used in modern Node.js applications."
  },
  "nav": [
    { "label": "Document Queries", "href": "#document-queries" },
    { "label": "Model Queries", "href": "#model-queries" },
   
  ],
  "sections": [


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
}

  ]
};
