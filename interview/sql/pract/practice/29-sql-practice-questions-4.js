window.notePageData = {
  "title": "29. SQL Practice Questions 4 - Duplicates, NULLs and Core Patterns",
  "navLabel": "SQL Practice 4 sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "29. SQL Practice Questions 4 - Duplicates, NULLs and Core Patterns",
    "text": "10 solved SQL interview practice questions with complete sample data, simple explanations, and expected results. Questions 31-40 cover distinct salary ranks, duplicate cleanup, NULL handling, empty groups, CASE, NOT EXISTS, and UNION."
  },
  "nav": [
    {
      "label": "Tables & Setup",
      "href": "#tables"
    },
    {
      "label": "31. Second-highest Salary",
      "href": "#q31"
    },
    {
      "label": "32. Ranking Ties",
      "href": "#q32"
    },
    {
      "label": "33. Duplicate Emails",
      "href": "#q33"
    },
    {
      "label": "34. Delete Duplicates",
      "href": "#q34"
    },
    {
      "label": "35. Missing Department",
      "href": "#q35"
    },
    {
      "label": "36. Include Empty Departments",
      "href": "#q36"
    },
    {
      "label": "37. CASE Salary Bands",
      "href": "#q37"
    },
    {
      "label": "38. NOT IN and NULL",
      "href": "#q38"
    },
    {
      "label": "39. UNION vs UNION ALL",
      "href": "#q39"
    },
    {
      "label": "40. NULL Aggregates",
      "href": "#q40"
    },
    {
      "label": "Summary",
      "href": "#summary"
    }
  ],
  "sections": [
    {
      "id": "tables",
      "type": "notes",
      "label": "Tables & Setup",
      "heading": "Sample Tables and Runnable Setup",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "SQL dialect: PostgreSQL. Each set is independent. Run the complete setup once in a practice database; in a later session, run only the SET search_path statement before answering questions. All questions start from the original sample data."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Five stars = first revision priority; four stars = next priority; three stars = stretch practice. Stars are study priorities, not measured interview-frequency statistics. Try writing each query before reading its answer."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Questions 31-40 cover distinct salary ranks, duplicate cleanup, NULL handling, empty groups, CASE, NOT EXISTS, and UNION."
          ]
        },
        {
          "type": "code",
          "filename": "set-4-setup.sql",
          "text": "CREATE SCHEMA sql_practice_4;\nSET search_path TO sql_practice_4;\n\nCREATE TABLE Departments (\ndept_id INT PRIMARY KEY,\ndept_name VARCHAR(40) NOT NULL\n);\n\nINSERT INTO Departments (dept_id, dept_name) VALUES\n(1, 'Engineering'),\n(2, 'Finance'),\n(3, 'HR'),\n(4, 'Legal');\n\nCREATE TABLE Employees (\nemp_id INT PRIMARY KEY,\nemp_name VARCHAR(40) NOT NULL,\ndept_id INT REFERENCES Departments(dept_id),\nmanager_id INT REFERENCES Employees(emp_id),\nsalary NUMERIC(12,2) CHECK (salary >= 0)\n);\n\nINSERT INTO Employees (emp_id, emp_name, dept_id, manager_id, salary) VALUES\n(1, 'Asha', 1, NULL, 120000),\n(2, 'Rohan', 1, 1, 90000),\n(3, 'Meera', 1, 1, 90000),\n(4, 'Kabir', 2, 5, 60000),\n(5, 'Neha', 2, NULL, 100000),\n(6, 'Isha', 2, 5, NULL),\n(7, 'Ravi', NULL, 1, 50000),\n(8, 'Zoya', 3, NULL, 80000);\n\nCREATE TABLE Contacts (\ncontact_id INT PRIMARY KEY,\nemail VARCHAR(100),\nsource VARCHAR(10) NOT NULL CHECK (source IN ('web', 'app'))\n);\n\nINSERT INTO Contacts (contact_id, email, source) VALUES\n(1, 'Ana@example.com', 'web'),\n(2, ' ana@example.com ', 'app'),\n(3, 'bob@example.com', 'web'),\n(4, 'BOB@example.com', 'app'),\n(5, NULL, 'web'),\n(6, NULL, 'app'),\n(7, 'cara@example.com', 'app');"
        },
        {
          "type": "paragraph",
          "parts": [
            "Departments"
          ]
        },
        {
          "type": "table",
          "headers": [
            "dept_id",
            "dept_name"
          ],
          "rows": [
            [
              1,
              "Engineering"
            ],
            [
              2,
              "Finance"
            ],
            [
              3,
              "HR"
            ],
            [
              4,
              "Legal"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Employees"
          ]
        },
        {
          "type": "table",
          "headers": [
            "emp_id",
            "emp_name",
            "dept_id",
            "manager_id",
            "salary"
          ],
          "rows": [
            [
              1,
              "Asha",
              1,
              null,
              120000
            ],
            [
              2,
              "Rohan",
              1,
              1,
              90000
            ],
            [
              3,
              "Meera",
              1,
              1,
              90000
            ],
            [
              4,
              "Kabir",
              2,
              5,
              60000
            ],
            [
              5,
              "Neha",
              2,
              null,
              100000
            ],
            [
              6,
              "Isha",
              2,
              5,
              null
            ],
            [
              7,
              "Ravi",
              null,
              1,
              50000
            ],
            [
              8,
              "Zoya",
              3,
              null,
              80000
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Contacts"
          ]
        },
        {
          "type": "table",
          "headers": [
            "contact_id",
            "email",
            "source"
          ],
          "rows": [
            [
              1,
              "Ana@example.com",
              "web"
            ],
            [
              2,
              " ana@example.com ",
              "app"
            ],
            [
              3,
              "bob@example.com",
              "web"
            ],
            [
              4,
              "BOB@example.com",
              "app"
            ],
            [
              5,
              null,
              "web"
            ],
            [
              6,
              null,
              "app"
            ],
            [
              7,
              "cara@example.com",
              "app"
            ]
          ]
        }
      ]
    },
    {
      "id": "q31",
      "type": "notes",
      "label": "31. Second-highest distinct salary",
      "heading": "31. Second-highest distinct salary ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Return one row containing the second-highest distinct non-NULL salary in the company. Return NULL if it does not exist."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "31-answer.sql",
          "text": "SELECT MAX(salary) AS second_highest_salary\nFROM Employees\nWHERE salary < (SELECT MAX(salary) FROM Employees);"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Find the largest salary, remove that value, and take the largest remaining value. MAX returns NULL when there is nothing left."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: MAX()",
            "Concepts Tested: Scalar subquery",
            "Concepts Tested: Distinct values"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Two employees with the same salary still represent one salary level. For an Nth distinct salary, rank with DENSE_RANK and select rank N."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "second_highest_salary"
          ],
          "rows": [
            [
              "100000.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q32",
      "type": "notes",
      "label": "32. ROW_NUMBER, RANK and DENSE_RANK with ties",
      "heading": "32. ROW_NUMBER, RANK and DENSE_RANK with ties ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Show all three ranking functions for employees with a known salary, highest salary first. Give equal salaries the same RANK and DENSE_RANK; make ROW_NUMBER deterministic with emp_id."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "32-answer.sql",
          "text": "SELECT emp_id, emp_name, salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC, emp_id) AS row_num,\n  RANK() OVER (ORDER BY salary DESC) AS salary_rank,\n  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_salary_rank\nFROM Employees\nWHERE salary IS NOT NULL\nORDER BY salary DESC, emp_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: ROW_NUMBER assigns a unique position. RANK leaves a gap after a tie. DENSE_RANK moves to the next salary level without a gap."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: ROW_NUMBER()",
            "Concepts Tested: RANK()",
            "Concepts Tested: DENSE_RANK()",
            "Concepts Tested: Tie handling"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Do not add emp_id to the RANK or DENSE_RANK ordering when ties must depend only on salary."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "emp_id",
            "emp_name",
            "salary",
            "row_num",
            "salary_rank",
            "dense_salary_rank"
          ],
          "rows": [
            [
              1,
              "Asha",
              "120000.00",
              1,
              1,
              1
            ],
            [
              5,
              "Neha",
              "100000.00",
              2,
              2,
              2
            ],
            [
              2,
              "Rohan",
              "90000.00",
              3,
              3,
              3
            ],
            [
              3,
              "Meera",
              "90000.00",
              4,
              3,
              3
            ],
            [
              8,
              "Zoya",
              "80000.00",
              5,
              5,
              4
            ],
            [
              4,
              "Kabir",
              "60000.00",
              6,
              6,
              5
            ],
            [
              7,
              "Ravi",
              "50000.00",
              7,
              7,
              6
            ]
          ]
        }
      ]
    },
    {
      "id": "q33",
      "type": "notes",
      "label": "33. Find duplicate emails after normalization",
      "heading": "33. Find duplicate emails after normalization ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find non-NULL emails that appear more than once. Ignore letter case and leading or trailing spaces. Return the normalized email and number of rows."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "33-answer.sql",
          "text": "SELECT LOWER(TRIM(email)) AS normalized_email,\n       COUNT(*) AS duplicate_count\nFROM Contacts\nWHERE email IS NOT NULL\nGROUP BY LOWER(TRIM(email))\nHAVING COUNT(*) > 1\nORDER BY normalized_email;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Normalize the email before grouping so that differently formatted copies fall into the same group."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: LOWER()",
            "Concepts Tested: TRIM()",
            "Concepts Tested: GROUP BY",
            "Concepts Tested: HAVING"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Clarify whether email matching is case-sensitive and whether NULL should count as a duplicate."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "normalized_email",
            "duplicate_count"
          ],
          "rows": [
            [
              "ana@example.com",
              2
            ],
            [
              "bob@example.com",
              2
            ]
          ]
        }
      ]
    },
    {
      "id": "q34",
      "type": "notes",
      "label": "34. Delete duplicate emails and keep the smallest ID",
      "heading": "34. Delete duplicate emails and keep the smallest ID ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Remove duplicate non-NULL emails using the same normalization as Q33. Keep the smallest contact_id in each group and keep both NULL-email rows. The practice transaction shows the cleaned table, then rolls back so other questions still use the original data."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "34-answer.sql",
          "text": "BEGIN;\n\nWITH ranked AS (\n  SELECT contact_id,\n         ROW_NUMBER() OVER (\n           PARTITION BY LOWER(TRIM(email))\n           ORDER BY contact_id\n         ) AS rn\n  FROM Contacts\n  WHERE email IS NOT NULL\n)\nDELETE FROM Contacts\nWHERE contact_id IN (\n  SELECT contact_id FROM ranked WHERE rn > 1\n);\n\nSELECT contact_id, email, source\nFROM Contacts\nORDER BY contact_id;\n\nROLLBACK;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: The smallest ID gets row number 1. Delete only rows ranked above 1. Filtering NULL before ranking keeps both unknown emails."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: DELETE",
            "Concepts Tested: CTE",
            "Concepts Tested: ROW_NUMBER()",
            "Concepts Tested: Transaction"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: In an interview, state which row survives. Here the displayed result is the SELECT before ROLLBACK."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "contact_id",
            "email",
            "source"
          ],
          "rows": [
            [
              1,
              "Ana@example.com",
              "web"
            ],
            [
              3,
              "bob@example.com",
              "web"
            ],
            [
              5,
              null,
              "web"
            ],
            [
              6,
              null,
              "app"
            ],
            [
              7,
              "cara@example.com",
              "app"
            ]
          ]
        }
      ]
    },
    {
      "id": "q35",
      "type": "notes",
      "label": "35. Keep employees without a department",
      "heading": "35. Keep employees without a department ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "List every employee and department name. Show Unassigned when dept_id is NULL. Do not remove employees with no department."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "35-answer.sql",
          "text": "SELECT e.emp_id, e.emp_name,\n       COALESCE(d.dept_name, 'Unassigned') AS department\nFROM Employees e\nLEFT JOIN Departments d ON d.dept_id = e.dept_id\nORDER BY e.emp_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: LEFT JOIN keeps the employee even when no department matches. COALESCE supplies the display label for the missing name."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: LEFT JOIN",
            "Concepts Tested: COALESCE()",
            "Concepts Tested: NULL"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: A filter on d.dept_name in WHERE can remove the unmatched rows you wanted to keep."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "emp_id",
            "emp_name",
            "department"
          ],
          "rows": [
            [
              1,
              "Asha",
              "Engineering"
            ],
            [
              2,
              "Rohan",
              "Engineering"
            ],
            [
              3,
              "Meera",
              "Engineering"
            ],
            [
              4,
              "Kabir",
              "Finance"
            ],
            [
              5,
              "Neha",
              "Finance"
            ],
            [
              6,
              "Isha",
              "Finance"
            ],
            [
              7,
              "Ravi",
              "Unassigned"
            ],
            [
              8,
              "Zoya",
              "HR"
            ]
          ]
        }
      ]
    },
    {
      "id": "q36",
      "type": "notes",
      "label": "36. Count employees including empty departments",
      "heading": "36. Count employees including empty departments ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Return each department and its employee count, including Legal with zero employees. Unassigned employees do not belong to a department."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "36-answer.sql",
          "text": "SELECT d.dept_id, d.dept_name,\n       COUNT(e.emp_id) AS employee_count\nFROM Departments d\nLEFT JOIN Employees e ON e.dept_id = d.dept_id\nGROUP BY d.dept_id, d.dept_name\nORDER BY d.dept_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Start with Departments to preserve empty departments. COUNT(e.emp_id) ignores the NULL value produced when no employee matches."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: LEFT JOIN",
            "Concepts Tested: COUNT(column)",
            "Concepts Tested: GROUP BY"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: COUNT(*) would count the preserved empty-department row as 1."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "dept_id",
            "dept_name",
            "employee_count"
          ],
          "rows": [
            [
              1,
              "Engineering",
              3
            ],
            [
              2,
              "Finance",
              3
            ],
            [
              3,
              "HR",
              1
            ],
            [
              4,
              "Legal",
              0
            ]
          ]
        }
      ]
    },
    {
      "id": "q37",
      "type": "notes",
      "label": "37. Count salary bands in one row",
      "heading": "37. Count salary bands in one row ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Return four counts: low salary below 70000, medium salary from 70000 up to but excluding 100000, high salary at least 100000, and unknown salary."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "37-answer.sql",
          "text": "SELECT\n  COUNT(CASE WHEN salary < 70000 THEN 1 END) AS low_count,\n  COUNT(CASE WHEN salary >= 70000 AND salary < 100000\n             THEN 1 END) AS medium_count,\n  COUNT(CASE WHEN salary >= 100000 THEN 1 END) AS high_count,\n  COUNT(CASE WHEN salary IS NULL THEN 1 END) AS unknown_count\nFROM Employees;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Each CASE returns 1 only for its own band. COUNT ignores the NULLs from all other rows."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: CASE",
            "Concepts Tested: Conditional aggregation",
            "Concepts Tested: IS NULL"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Use non-overlapping boundaries. With COUNT(CASE ...), ELSE 0 would incorrectly count non-matching rows too."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "low_count",
            "medium_count",
            "high_count",
            "unknown_count"
          ],
          "rows": [
            [
              2,
              3,
              2,
              1
            ]
          ]
        }
      ]
    },
    {
      "id": "q38",
      "type": "notes",
      "label": "38. Find non-managers without the NOT IN NULL trap",
      "heading": "38. Find non-managers without the NOT IN NULL trap ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find employees who do not manage anyone. manager_id contains NULL values, so the answer must still work when top-level employees have no manager."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Medium"
          ]
        },
        {
          "type": "code",
          "filename": "38-answer.sql",
          "text": "SELECT e.emp_id, e.emp_name\nFROM Employees e\nWHERE NOT EXISTS (\n  SELECT 1 FROM Employees report\n  WHERE report.manager_id = e.emp_id\n)\nORDER BY e.emp_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Keep an employee only when there is no row naming that employee as its manager."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: NOT EXISTS",
            "Concepts Tested: Correlated subquery",
            "Concepts Tested: SQL three-valued logic"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: emp_id NOT IN (SELECT manager_id FROM Employees) returns no matching rows here because the subquery includes NULL. NOT EXISTS avoids that problem."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "emp_id",
            "emp_name"
          ],
          "rows": [
            [
              2,
              "Rohan"
            ],
            [
              3,
              "Meera"
            ],
            [
              4,
              "Kabir"
            ],
            [
              6,
              "Isha"
            ],
            [
              7,
              "Ravi"
            ],
            [
              8,
              "Zoya"
            ]
          ]
        }
      ]
    },
    {
      "id": "q39",
      "type": "notes",
      "label": "39. Combine web and app email lists",
      "heading": "39. Combine web and app email lists ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Combine non-NULL web and app emails after normalization. First return each email once with UNION. Then keep every occurrence with UNION ALL and count occurrences. Both result sets are shown."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "39-answer.sql",
          "text": "SELECT LOWER(TRIM(email)) AS email\nFROM Contacts WHERE source = 'web' AND email IS NOT NULL\nUNION\nSELECT LOWER(TRIM(email)) AS email\nFROM Contacts WHERE source = 'app' AND email IS NOT NULL\nORDER BY email;\n\nWITH combined AS (\n  SELECT LOWER(TRIM(email)) AS email\n  FROM Contacts WHERE source = 'web' AND email IS NOT NULL\n  UNION ALL\n  SELECT LOWER(TRIM(email)) AS email\n  FROM Contacts WHERE source = 'app' AND email IS NOT NULL\n)\nSELECT email, COUNT(*) AS occurrences\nFROM combined\nGROUP BY email\nORDER BY email;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: UNION removes duplicate result rows. UNION ALL keeps them, so the second query can count repeated emails across both sources."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: UNION",
            "Concepts Tested: UNION ALL",
            "Concepts Tested: Deduplication"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Each branch needs the same number of columns with compatible types."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result 1 for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "email"
          ],
          "rows": [
            [
              "ana@example.com"
            ],
            [
              "bob@example.com"
            ],
            [
              "cara@example.com"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result 2 for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "email",
            "occurrences"
          ],
          "rows": [
            [
              "ana@example.com",
              2
            ],
            [
              "bob@example.com",
              2
            ],
            [
              "cara@example.com",
              1
            ]
          ]
        }
      ]
    },
    {
      "id": "q40",
      "type": "notes",
      "label": "40. COUNT and AVG when salaries are NULL",
      "heading": "40. COUNT and AVG when salaries are NULL ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Return total employees, employees with a known salary, missing salaries, average known salary, and the average if the business explicitly decides to treat missing salary as zero. Round averages to two decimals."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Easy"
          ]
        },
        {
          "type": "code",
          "filename": "40-answer.sql",
          "text": "SELECT COUNT(*) AS total_employees,\n       COUNT(salary) AS known_salaries,\n       COUNT(*) - COUNT(salary) AS missing_salaries,\n       ROUND(AVG(salary), 2) AS average_known_salary,\n       ROUND(AVG(COALESCE(salary, 0)), 2) AS average_if_missing_is_zero\nFROM Employees;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: COUNT(*) counts every row. COUNT(salary) and AVG(salary) ignore NULL salary values. Replacing NULL with zero changes the average because those rows now enter the calculation."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: COUNT(*) vs COUNT(column)",
            "Concepts Tested: AVG()",
            "Concepts Tested: COALESCE()"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Unknown does not automatically mean zero. Explain the business assumption before replacing NULL."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Expected result for the sample data:"
          ]
        },
        {
          "type": "table",
          "headers": [
            "total_employees",
            "known_salaries",
            "missing_salaries",
            "average_known_salary",
            "average_if_missing_is_zero"
          ],
          "rows": [
            [
              8,
              7,
              1,
              "84285.71",
              "73750.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "summary",
      "type": "summary",
      "label": "Summary",
      "heading": "Quick Revision",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Distinct salary levels and row positions are different interview requirements.",
            "Normalize values consistently when finding and deleting duplicates.",
            "For empty groups, preserve the parent with LEFT JOIN and count a child key.",
            "NULL is checked with IS NULL; NOT IN needs special care when its input contains NULL.",
            "UNION removes duplicates; UNION ALL preserves them."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Topic references: questions and sample data in this set were written for this collection."
          ]
        },
        {
          "type": "list",
          "items": [
            "LeetCode SQL 50: https://leetcode.com/studyplan/top-sql-50/",
            "Second Highest Salary: https://leetcode.com/problems/second-highest-salary/",
            "Delete Duplicate Emails: https://leetcode.com/problems/delete-duplicate-emails/",
            "PostgreSQL window functions: https://www.postgresql.org/docs/current/functions-window.html"
          ]
        }
      ]
    }
  ]
};
