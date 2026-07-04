window.notePageData = {
  "title": " Data Types",
  "navLabel": "Operator Sections",
  "hero": {
    "type": "introduction",
    "label": "MongoDB Operators",
    "heading": " BSON Types",
    "text": "A complete reference for MongoDB BSON Data Types and all major Query Operators \u2014 Comparison, Logical, Element, Evaluation, Array, and Update operators \u2014 with real examples, use cases, and interview Q&A."
  },
  "nav": [
    {
      "label": "BSON Types",
      "href": "#bson-types"
    },
    {
      "label": "Comparison",
      "href": "#comparison-operators"
    },
    {
      "label": "Logical",
      "href": "#logical-operators"
    },
    {
      "label": "Element",
      "href": "#element-operators"
    },
    {
      "label": "Evaluation",
      "href": "#evaluation-operators"
    },
    {
      "label": "Array Query",
      "href": "#array-query-operators"
    },
    {
      "label": "Update Fields",
      "href": "#update-field-operators"
    },
    {
      "label": "Update Arrays",
      "href": "#update-array-operators"
    },
    {
      "label": "Projection",
      "href": "#projection-operators"
    },
    {
      "label": "Cheat Sheet",
      "href": "#cheat-sheet"
    },
    {
      "label": "Boxes",
      "href": "#boxes"
    },
    {
      "label": "Comparison Table",
      "href": "#comparison-table"
    },
    {
      "label": "Accordion",
      "href": "#accordion"
    },
    {
      "label": "Interview",
      "href": "#interview"
    },
    {
      "label": "Q&A",
      "href": "#qa"
    },
    {
      "label": "Summary",
      "href": "#summary"
    }
  ],
  "sections": [
    {
      "id": "bson-types",
      "type": "notes",
      "label": "Notes",
      "heading": "BSON Data Types",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "BSON (Binary JSON) is the internal storage format used by MongoDB. It extends JSON with additional data types like ",
            {
              "code": "ObjectId"
            },
            ", ",
            {
              "code": "Date"
            },
            ", ",
            {
              "code": "Decimal128"
            },
            ", and ",
            {
              "code": "Binary"
            },
            ". Every field value in a MongoDB document has a BSON type."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "String",
              "definition": "Stores UTF-8 text. Most common BSON type. Used for names, emails, descriptions. Example: \"firstName\": \"Shivam\""
            },
            {
              "term": "Number (Int32 / Int64 / Double)",
              "definition": "Stores integers or floating-point numbers. Int32 for small numbers, Int64 for large, Double for decimals. Example: \"age\": 25, \"price\": 99.99"
            },
            {
              "term": "Boolean",
              "definition": "Stores true or false. Used for status flags, toggles, feature flags. Example: \"isActive\": true, \"isDeleted\": false"
            },
            {
              "term": "Date",
              "definition": "Stores date and time as milliseconds since Unix epoch. Used for timestamps. Example: \"createdAt\": ISODate(\"2025-06-19T10:00:00Z\")"
            },
            {
              "term": "ObjectId",
              "definition": "12-byte unique identifier auto-generated for every document as _id. Contains timestamp, machine id, process id, and random counter. Example: \"_id\": ObjectId(\"66abc123...\")"
            },
            {
              "term": "Array",
              "definition": "Stores an ordered list of values. Elements can be of any BSON type including nested documents. Example: \"skills\": [\"Node.js\", \"MongoDB\", \"TypeScript\"]"
            },
            {
              "term": "Object (Embedded Document)",
              "definition": "Stores nested documents as field values. Perfect for grouped data like address or profile. Example: \"address\": { \"city\": \"Delhi\", \"pin\": \"110001\" }"
            },
            {
              "term": "Null",
              "definition": "Represents an explicitly absent or undefined value. Different from a missing field. Example: \"middleName\": null"
            },
            {
              "term": "Decimal128",
              "definition": "High-precision decimal type for financial and scientific calculations where floating-point rounding errors are unacceptable. Example: \"price\": NumberDecimal(\"99.9999\")"
            },
            {
              "term": "Binary (BinData)",
              "definition": "Stores raw binary data such as images, files, encrypted content, UUIDs. Example: \"profilePicture\": BinData(0, \"...base64...\")"
            }
          ]
        },
        {
          "type": "code",
          "filename": "bson-types.mongodb",
          "text": "// All BSON types demonstrated in one document\ndb.examples.insertOne({\n\n  // String\n  firstName:     \"Shivam\",\n  email:         \"shivam@example.com\",\n\n  // Number \u2014 Int32\n  age:           25,\n\n  // Number \u2014 Double (decimal)\n  rating:        4.8,\n\n  // Decimal128 \u2014 high precision (finance/science)\n  price:         NumberDecimal(\"999.9999\"),\n\n  // Boolean\n  isActive:      true,\n  isDeleted:     false,\n\n  // Date\n  createdAt:     new Date(),\n  birthDate:     ISODate(\"2000-01-15T00:00:00Z\"),\n\n  // ObjectId \u2014 auto-generated _id, or manual reference\n  _id:           ObjectId(),\n  roleId:        ObjectId(\"66abc123456def789012abcd\"),\n\n  // Array \u2014 mixed or uniform\n  skills:        [\"Node.js\", \"MongoDB\", \"TypeScript\"],\n  scores:        [95, 87, 92],\n\n  // Object \u2014 embedded/nested document\n  address: {\n    city:        \"Delhi\",\n    state:       \"Delhi\",\n    pinCode:     \"110001\",\n    country:     \"India\"\n  },\n\n  // Null \u2014 explicit absence of value\n  middleName:    null,\n\n  // Binary \u2014 raw bytes (images, files, UUIDs)\n  profilePicture: BinData(0, \"aGVsbG8=\")\n\n})"
        },
        {
          "type": "table",
          "headers": [
            "BSON Type",
            "Example Value",
            "Mongoose Type",
            "Use Case"
          ],
          "rows": [
            [
              "String",
              "\"Shivam\"",
              "String",
              "Names, emails, text"
            ],
            [
              "Int32",
              "25",
              "Number",
              "Age, count, quantity"
            ],
            [
              "Double",
              "4.8",
              "Number",
              "Rating, coordinates"
            ],
            [
              "Decimal128",
              "NumberDecimal(\"99.99\")",
              "Decimal128",
              "Price, financial data"
            ],
            [
              "Boolean",
              "true / false",
              "Boolean",
              "Status, flags, toggles"
            ],
            [
              "Date",
              "new Date()",
              "Date",
              "Timestamps, birthdays"
            ],
            [
              "ObjectId",
              "ObjectId(\"66abc...\")",
              "ObjectId",
              "Document _id, references"
            ],
            [
              "Array",
              "[\"a\", \"b\", \"c\"]",
              "[String]",
              "Tags, skills, list data"
            ],
            [
              "Object",
              "{ city: \"Delhi\" }",
              "{}",
              "Embedded sub-documents"
            ],
            [
              "Null",
              "null",
              "\u2014",
              "Explicitly absent value"
            ],
            [
              "Binary",
              "BinData(0, \"...\")",
              "Buffer",
              "Images, files, UUIDs"
            ]
          ]
        }
      ]
    }    
  ]
}