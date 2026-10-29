
window.notePageData = {
  "title": "SQL DISTINCT — Unique Values & Duplicate Removal",
  "navLabel": "DISTINCT sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "SQL DISTINCT — Unique Values & Duplicate Removal",
    "text": "A complete reference for SQL DISTINCT — removing duplicate rows from query results, finding unique values across multiple columns, counting distinct values, combining DISTINCT with WHERE and ORDER BY, and understanding DISTINCT versus GROUP BY."
  },
  "nav": [
    { "label": "Notes", "href": "#notes" },
    { "label": "Basic Syntax", "href": "#basic-syntax" },
    { "label": "Multiple Columns", "href": "#multiple-columns" },
    { "label": "COUNT DISTINCT", "href": "#count-distinct" },
    { "label": "Filtering & Sorting", "href": "#filtering-sorting" },
    { "label": "Comparison", "href": "#comparison" },
    { "label": "Use Cases", "href": "#use-cases" },
    { "label": "Best Practices", "href": "#best-practices" },
    { "label": "Common Mistakes", "href": "#common-mistakes" },
    { "label": "Interview", "href": "#interview" },
    { "label": "Summary", "href": "#summary" }
  ],
  "sections": [
    {
      "id": "notes",
      "type": "notes",
      "label": "Notes",
      "heading": "Key Concepts at a Glance",
      "blocks": [
        {
          "type": "list",
          "items": [
            "DISTINCT removes duplicate rows from the query result.",
            "SELECT DISTINCT column returns unique values for that column.",
            "SELECT DISTINCT column1, column2 returns unique combinations of both columns.",
            "DISTINCT does not delete or modify records in the original table.",
            "COUNT(DISTINCT column) counts unique non-NULL values.",
            "DISTINCT can be combined with WHERE and ORDER BY.",
            "GROUP BY groups rows and is commonly used with aggregate functions.",
            "In most SQL databases, SELECT DISTINCT treats NULL values as one distinct value.",
            "DISTINCT applies to all selected columns together, not independently to each column.",
            "DISTINCT is supported by PostgreSQL, MySQL, SQL Server, and Oracle."
          ]
        }
      ]
    },
    {
      "id": "basic-syntax",
      "type": "terminology",
      "label": "Basic Syntax",
      "heading": "DISTINCT — Basic Usage",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "DISTINCT returns unique rows by eliminating duplicate combinations of values from the selected columns. It affects the query result only and does not change the underlying table."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "SELECT DISTINCT",
              "definition": "Returns only unique values for the selected column or unique combinations of selected columns.",
              "code": "-- Without DISTINCT: duplicates remain\nSELECT department\nFROM employees;\n\n-- With DISTINCT: duplicate departments removed\nSELECT DISTINCT department\nFROM employees;"
            },
            {
              "term": "DISTINCT with multiple values",
              "definition": "DISTINCT considers the complete selected row when identifying duplicates. Duplicate combinations appear only once.",
              "code": "SELECT DISTINCT department, city\nFROM employees;"
            },
            {
              "term": "DISTINCT with NULL",
              "definition": "In most SQL databases, multiple NULL values in a selected column produce one NULL entry in SELECT DISTINCT results.",
              "code": "SELECT DISTINCT phone\nFROM users;"
            }
          ]
        }
      ]
    },
    {
      "id": "multiple-columns",
      "type": "terminology",
      "label": "Multiple Columns",
      "heading": "DISTINCT Across Multiple Columns",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "When multiple columns are selected, DISTINCT removes duplicate combinations. It does not independently make each column unique."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "Unique column combinations",
              "definition": "Returns each department-city pair only once. The same city can appear in different departments.",
              "code": "SELECT DISTINCT department, city\nFROM employee_locations;"
            },
            {
              "term": "Why column order matters",
              "definition": "The selected column order determines the output column order. Uniqueness is based on the combination of selected values.",
              "code": "SELECT DISTINCT city, department\nFROM employee_locations;"
            },
            {
              "term": "DISTINCT does not mean unique per column",
              "definition": "A result can contain repeated department values when paired with different cities.",
              "code": "SELECT DISTINCT department, city\nFROM employee_locations;\n\n-- IT + Hyderabad and IT + Bangalore\n-- are different combinations."
            }
          ]
        }
      ]
    },
    {
      "id": "count-distinct",
      "type": "terminology",
      "label": "COUNT DISTINCT",
      "heading": "COUNT(DISTINCT column)",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "COUNT(DISTINCT column) counts unique non-NULL values. It is useful for calculating unique users, customers, departments, cities, and categories."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "Count unique values",
              "definition": "Counts each distinct non-NULL value once.",
              "code": "SELECT COUNT(DISTINCT customer_id) AS unique_customers\nFROM orders;"
            },
            {
              "term": "Count distinct values after filtering",
              "definition": "WHERE filters rows before the distinct count is calculated.",
              "code": "SELECT COUNT(DISTINCT customer_id) AS unique_customers\nFROM orders\nWHERE status = 'completed';"
            },
            {
              "term": "DISTINCT versus COUNT(*)",
              "definition": "COUNT(*) counts rows, including rows containing NULL values. COUNT(DISTINCT column) counts unique non-NULL values in the specified column.",
              "code": "SELECT\n  COUNT(*) AS total_rows,\n  COUNT(customer_id) AS non_null_ids,\n  COUNT(DISTINCT customer_id) AS unique_customers\nFROM orders;"
            }
          ]
        }
      ]
    },
    {
      "id": "filtering-sorting",
      "type": "terminology",
      "label": "Filtering & Sorting",
      "heading": "DISTINCT with WHERE and ORDER BY",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "DISTINCT works with WHERE to filter records and ORDER BY to sort the resulting unique values."
          ]
        },
        {
          "type": "definitions",
          "items": [
            {
              "term": "DISTINCT with WHERE",
              "definition": "Filters rows first, then returns unique values from the remaining rows.",
              "code": "SELECT DISTINCT department\nFROM employees\nWHERE salary > 50000;"
            },
            {
              "term": "DISTINCT with ORDER BY",
              "definition": "Returns unique values and sorts them in ascending or descending order.",
              "code": "SELECT DISTINCT department\nFROM employees\nORDER BY department ASC;"
            },
            {
              "term": "DISTINCT with multiple conditions",
              "definition": "Combines filtering, unique-value selection, and sorting in one query.",
              "code": "SELECT DISTINCT city\nFROM customers\nWHERE status = 'active'\n  AND city IS NOT NULL\nORDER BY city;"
            }
          ]
        },
        {
          "type": "text-box",
          "variant": "remember",
          "title": "Logical Query Processing",
          "text": "For a typical SELECT query, FROM identifies the source, WHERE filters rows, SELECT expressions are evaluated, DISTINCT removes duplicate result rows, and ORDER BY sorts the results. The exact logical processing rules have database-specific details."
        }
      ]
    },
    {
      "id": "comparison",
      "type": "comparison",
      "label": "Comparison",
      "heading": "DISTINCT vs GROUP BY",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "Point",
            "DISTINCT",
            "GROUP BY"
          ],
          "rows": [
            [
              "Primary purpose",
              "Remove duplicate result rows",
              "Group rows for calculations"
            ],
            [
              "Unique departments",
              "SELECT DISTINCT department",
              "SELECT department GROUP BY department"
            ],
            [
              "Aggregate functions",
              "Can be used with aggregates",
              "Commonly used with COUNT, SUM, AVG"
            ],
            [
              "Count per department",
              "Not sufficient by itself",
              "GROUP BY department with COUNT(*)"
            ],
            [
              "Output",
              "Unique selected combinations",
              "One row per group"
            ]
          ]
        },
        {
          "type": "code",
          "filename": "distinct_vs_group_by.sql",
          "text": "-- DISTINCT: unique departments\nSELECT DISTINCT department\nFROM employees;\n\n-- GROUP BY: employee count per department\nSELECT department, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department;"
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
            "SELECT DISTINCT city FROM customers — find all cities where customers exist.",
            "COUNT(DISTINCT user_id) — calculate the number of unique users.",
            "SELECT DISTINCT department, role FROM employees — identify unique department-role combinations.",
            "SELECT DISTINCT product_id FROM order_items — find products appearing in orders.",
            "SELECT DISTINCT status FROM orders — discover available order statuses.",
            "SELECT DISTINCT country FROM addresses WHERE country IS NOT NULL — retrieve non-NULL countries.",
            "SELECT DISTINCT category FROM products WHERE is_active = true — retrieve categories of active products."
          ]
        }
      ]
    },
    {
      "id": "best-practices",
      "type": "best-practices",
      "label": "Best Practices",
      "heading": "Best Practices",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Select only the columns needed when using DISTINCT.",
            "Remember that DISTINCT evaluates the combination of every selected column.",
            "Use COUNT(DISTINCT column) when you need a count of unique non-NULL values.",
            "Use GROUP BY when you need aggregates such as counts or sums for each group.",
            "Use WHERE to filter rows before DISTINCT is applied.",
            "Do not assume DISTINCT chooses the latest or highest record for each user.",
            "For the latest record per user, use ROW_NUMBER() with PARTITION BY and ORDER BY in a CTE.",
            "On large tables, consider query plans and indexes if DISTINCT is slow."
          ]
        }
      ]
    },
    {
      "id": "common-mistakes",
      "type": "common-mistakes",
      "label": "Common Mistakes",
      "heading": "Common Mistakes",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Assuming SELECT DISTINCT department, city makes department values unique independently.",
            "Using DISTINCT to permanently delete duplicate records — it only changes query output.",
            "Confusing COUNT(DISTINCT column) with COUNT(*).",
            "Assuming COUNT(DISTINCT column) includes NULL — standard COUNT ignores NULL values.",
            "Using DISTINCT to choose the latest record without defining which row should win.",
            "Selecting unnecessary columns, which can prevent otherwise duplicate rows from being considered duplicates.",
            "Using DISTINCT to hide incorrect JOIN logic instead of fixing the join."
          ]
        }
      ]
    },
    {
      "id": "interview",
      "type": "interview-questions",
      "label": "Interview Questions",
      "heading": "DISTINCT Interview Questions",
      "blocks": [
        {
          "type": "qa",
          "items": [
            {
              "question": "What is DISTINCT in SQL?",
              "answer": "DISTINCT removes duplicate rows from the query result based on all selected columns, returning only unique values or combinations."
            },
            {
              "question": "What is the difference between DISTINCT and GROUP BY?",
              "answer": "DISTINCT removes duplicate result combinations. GROUP BY groups rows and is commonly used with aggregate functions such as COUNT, SUM, and AVG."
            },
            {
              "question": "How do you count unique customers?",
              "answer": "Use SELECT COUNT(DISTINCT customer_id) FROM orders. COUNT(DISTINCT) ignores NULL values."
            },
            {
              "question": "What happens when DISTINCT is used on two columns?",
              "answer": "SQL returns unique combinations of both columns. A value in the first column can repeat if it is paired with a different value in the second column."
            },
            {
              "question": "Does DISTINCT modify the original table?",
              "answer": "No. DISTINCT only affects the query result. It does not delete or modify any stored rows."
            },
            {
              "question": "Can DISTINCT be combined with WHERE and ORDER BY?",
              "answer": "Yes. WHERE filters the source rows, DISTINCT removes duplicate result combinations, and ORDER BY sorts the resulting rows."
            },
            {
              "question": "Does COUNT(DISTINCT column) count NULL?",
              "answer": "No. COUNT(DISTINCT column) counts unique non-NULL values."
            },
            {
              "question": "Can DISTINCT return the latest row for each user?",
              "answer": "Not reliably by itself. Use ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC) in a CTE and filter for rn = 1."
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
            "SELECT DISTINCT column returns unique values.",
            "SELECT DISTINCT column1, column2 returns unique combinations of both columns.",
            "COUNT(DISTINCT column) counts unique non-NULL values.",
            "WHERE filters rows before duplicate removal.",
            "ORDER BY sorts the resulting unique rows.",
            "DISTINCT does not modify or delete data from the table.",
            "DISTINCT removes duplicates; GROUP BY groups rows for aggregation.",
            "Use ROW_NUMBER() instead of DISTINCT when you need a specific row, such as the latest record per user."
          ]
        }
      ]
    }
  ]
};
