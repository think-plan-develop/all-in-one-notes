window.notePageData = {
  "title": "MongoDB Projection",
  "navLabel": "Projection Sections",
  "hero": {
    "type": "introduction",
    "label": "MongoDB Projection",
    "heading": "MongoDB Projection",
    "text": "Projection controls which fields MongoDB returns in query results. It helps reduce network traffic and improve query performance by returning only the required fields from a document."
  },

  "nav": [
    { "label": "Include Fields", "href": "#include-fields" },
    { "label": "Exclude Fields", "href": "#exclude-fields" },
    { "label": "Nested Projection", "href": "#nested-projection" },
    { "label": "Slice Arrays", "href": "#slice-arrays" },
    { "label": "Positional Projection", "href": "#positional-projection" }
  ],

  "sections": [
    {
      "id": "include-fields",
      "type": "projection",
      "label": "Include Fields",
      "heading": "Including Specific Fields",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Use a value of 1 to include specific fields in the returned document. The _id field is included automatically unless explicitly excluded."
          ]
        },
        {
          "type": "code",
          "filename": "include-fields.mongodb",
          "text": "// Return only name and email\n// _id is included by default\n\ndb.users.find(\n  {},\n  {\n    name: 1,\n    email: 1\n  }\n);"
        }
      ]
    },

    {
      "id": "exclude-fields",
      "type": "projection",
      "label": "Exclude Fields",
      "heading": "Excluding Specific Fields",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Use a value of 0 to exclude fields from the result. Except for _id, MongoDB does not allow mixing inclusion and exclusion in the same projection."
          ]
        },
        {
          "type": "code",
          "filename": "exclude-fields.mongodb",
          "text": "// Exclude password and salary fields\n\ndb.users.find(\n  {},\n  {\n    password: 0,\n    salary: 0\n  }\n);"
        }
      ]
    },

    {
      "id": "nested-projection",
      "type": "projection",
      "label": "Nested Projection",
      "heading": "Project Nested Document Fields",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Use dot notation to return only selected fields from embedded documents."
          ]
        },
        {
          "type": "code",
          "filename": "nested-projection.mongodb",
          "text": "// Return only city and state from address\n\ndb.users.find(\n  {},\n  {\n    'address.city': 1,\n    'address.state': 1\n  }\n);"
        }
      ]
    },

    {
      "id": "slice-arrays",
      "type": "projection",
      "label": "Slice Arrays",
      "heading": "Return Limited Array Elements",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "The $slice projection operator returns only a portion of an array. You can retrieve the first N elements, last N elements, or a specific range."
          ]
        },
        {
          "type": "code",
          "filename": "slice.mongodb",
          "text": "// First 5 comments\n\ndb.posts.find(\n  {},\n  {\n    comments: { $slice: 5 }\n  }\n);\n\n// Last 3 comments\n\ndb.posts.find(\n  {},\n  {\n    comments: { $slice: -3 }\n  }\n);"
        }
      ]
    },

    {
      "id": "positional-projection",
      "type": "projection",
      "label": "Positional Projection",
      "heading": "Return Matching Array Element",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "The positional ($) projection operator returns only the first array element that matches the query condition instead of returning the entire array."
          ]
        },
        {
          "type": "code",
          "filename": "positional.mongodb",
          "text": "// Return only the matching marks element\n\ndb.students.find(\n  {\n    'marks.subject': 'Math'\n  },\n  {\n    'marks.$': 1\n  }\n);"
        }
      ]
    }
  ]
};