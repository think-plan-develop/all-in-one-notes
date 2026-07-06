window.notePageData = {
  "title": "PostgreSQL Basics Practice",
  "navLabel": "PostgreSQL basics",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "PostgreSQL Basics Practice",
    "text": "A beginner-friendly PostgreSQL practice note covering SELECT, WHERE, ORDER BY, GROUP BY, JOINs, subqueries, string/date functions, CASE, and window functions."
  },
  "nav": [
    { "label": "Overview", "href": "#overview" },
    { "label": "Filtering", "href": "#filtering" },
    { "label": "Sorting & Aggregation", "href": "#aggregation" },
    { "label": "Joins", "href": "#joins" },
    { "label": "Subqueries", "href": "#subqueries" },
    { "label": "String & Date", "href": "#string-date" },
    { "label": "CASE & Duplicates", "href": "#case-duplicates" },
    { "label": "Window Functions", "href": "#window" },
    { "label": "Summary", "href": "#summary" }
  ],
  "sections": [
    {
      "id": "overview",
      "type": "notes",
      "label": "Overview",
      "heading": "PostgreSQL Basics Overview",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "This note collects common PostgreSQL practice queries in the same style as the earlier SQL notes, with each concept shown as a code example."
          ]
        },
        {
          "type": "list",
          "items": [
            "SELECT and WHERE for basic filtering",
            "ORDER BY for sorting",
            "GROUP BY and HAVING for aggregation",
            "JOINs for combining tables",
            "Subqueries for nested logic",
            "String, date, CASE, and window functions"
          ]
        }
      ]
    },
    {
      "id": "filtering",
      "type": "notes",
      "label": "Filtering",
      "heading": "Basic SELECT and Filtering",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Use these queries to fetch rows based on conditions, ranges, patterns, and list membership."
          ]
        },
        {
          "type": "code",
          "filename": "basic-filtering.sql",
          "text": "-- 1. Display all employees\nSELECT * FROM Employees;\n\n-- 2. Display only employee names\nSELECT name FROM Employees;\n\n-- 3. Employees whose salary is greater than 50000\nSELECT * FROM Employees WHERE salary > 50000;\n\n-- 4. Employees from Hyderabad\nSELECT * FROM Employees WHERE city = 'Hyderabad';\n\n-- 5. Employees whose age is between 25 and 35\nSELECT * FROM Employees WHERE age BETWEEN 25 AND 35;\n\n-- 6. Employees whose name starts with 'A'\nSELECT * FROM Employees WHERE name LIKE 'A%';\n\n-- 7. Employees whose name ends with 'n'\nSELECT * FROM Employees WHERE name LIKE '%n';\n\n-- 8. Employees whose name contains 'ar'\nSELECT * FROM Employees WHERE name LIKE '%ar%';\n\n-- 9. Salary NOT between 30000 and 50000\nSELECT * FROM Employees WHERE salary NOT BETWEEN 30000 AND 50000;\n\n-- 10. Employees from Hyderabad or Bangalore\nSELECT * FROM Employees WHERE city IN ('Hyderabad', 'Bangalore');"
        }
      ]
    },
    {
      "id": "aggregation",
      "type": "notes",
      "label": "Sorting & Aggregation",
      "heading": "Sorting and Aggregation Queries",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "These queries demonstrate sorting, limiting, counting, averaging, and using HAVING with grouped results."
          ]
        },
        {
          "type": "code",
          "filename": "sorting-aggregation.sql",
          "text": "-- 11. Sort by salary ascending\nSELECT * FROM Employees ORDER BY salary ASC;\n\n-- 12. Sort by salary descending\nSELECT * FROM Employees ORDER BY salary DESC;\n\n-- 13. Sort by department then salary\nSELECT * FROM Employees ORDER BY department, salary DESC;\n\n-- 14. Top 5 highest-paid employees\nSELECT * FROM Employees ORDER BY salary DESC LIMIT 5;\n\n-- 15. Skip first 10 records\nSELECT * FROM Employees OFFSET 10;\n\n-- 16. Total number of employees\nSELECT COUNT(*) FROM Employees;\n\n-- 17. Average salary\nSELECT AVG(salary) FROM Employees;\n\n-- 18. Maximum salary\nSELECT MAX(salary) FROM Employees;\n\n-- 19. Minimum salary\nSELECT MIN(salary) FROM Employees;\n\n-- 20. Total salary paid\nSELECT SUM(salary) FROM Employees;\n\n-- 21. Count employees in each department\nSELECT department, COUNT(*) FROM Employees GROUP BY department;\n\n-- 22. Average salary by department\nSELECT department, AVG(salary) FROM Employees GROUP BY department;\n\n-- 23. Highest salary in each department\nSELECT department, MAX(salary) FROM Employees GROUP BY department;\n\n-- 24. Lowest salary in each department\nSELECT department, MIN(salary) FROM Employees GROUP BY department;\n\n-- 25. Departments having more than 5 employees\nSELECT department, COUNT(*) FROM Employees GROUP BY department HAVING COUNT(*) > 5;\n\n-- 26. Departments whose average salary > 60000\nSELECT department, AVG(salary) FROM Employees GROUP BY department HAVING AVG(salary) > 60000;\n\n-- 27. Departments where total salary > 500000\nSELECT department, SUM(salary) FROM Employees GROUP BY department HAVING SUM(salary) > 500000;\n\n-- 28. Cities having more than 3 employees\nSELECT city, COUNT(*) FROM Employees GROUP BY city HAVING COUNT(*) > 3;\n\n-- 29. Departments whose max salary > 100000\nSELECT department, MAX(salary) FROM Employees GROUP BY department HAVING MAX(salary) > 100000;\n\n-- 30. Departments whose minimum salary > 30000\nSELECT department, MIN(salary) FROM Employees GROUP BY department HAVING MIN(salary) > 30000;"
        }
      ]
    },
    {
      "id": "joins",
      "type": "notes",
      "label": "Joins",
      "heading": "JOINs and Relationship Queries",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "These queries join Employees, Departments, Customers, and Orders to retrieve related data."
          ]
        },
        {
          "type": "code",
          "filename": "joins.sql",
          "text": "-- 31. Employee name with department name\nSELECT e.name, d.dept_name\nFROM Employees e\nJOIN Departments d ON e.department = d.dept_id;\n\n-- 32. Employees without a department\nSELECT *\nFROM Employees e\nLEFT JOIN Departments d ON e.department = d.dept_id\nWHERE d.dept_id IS NULL;\n\n-- 33. All departments even if no employees exist\nSELECT d.dept_name, e.name\nFROM Departments d\nLEFT JOIN Employees e ON d.dept_id = e.department;\n\n-- 34. Customers who placed orders\nSELECT DISTINCT c.*\nFROM Customers c\nJOIN Orders o ON c.customer_id = o.customer_id;\n\n-- 35. Customers who never placed orders\nSELECT c.*\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id\nWHERE o.customer_id IS NULL;\n\n-- 36. Orders with customer names\nSELECT o.order_id, c.name, o.amount\nFROM Orders o\nJOIN Customers c ON o.customer_id = c.customer_id;\n\n-- 37. Employees with manager names (Self Join)\nSELECT e.name AS employee, m.name AS manager\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.emp_id;\n\n-- 38. All customers with their orders\nSELECT c.name, o.order_id, o.amount\nFROM Customers c\nLEFT JOIN Orders o ON c.customer_id = o.customer_id;\n\n-- 39. Departments with employee count\nSELECT d.dept_name, COUNT(e.emp_id)\nFROM Departments d\nLEFT JOIN Employees e ON d.dept_id = e.department\nGROUP BY d.dept_name;\n\n-- 40. Department with highest average salary\nSELECT department, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY department\nORDER BY avg_salary DESC\nLIMIT 1;"
        }
      ]
    },
    {
      "id": "subqueries",
      "type": "notes",
      "label": "Subqueries",
      "heading": "Subqueries and Nested Queries",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Use subqueries for comparisons, ranking, and existence checks."
          ]
        },
        {
          "type": "code",
          "filename": "subqueries.sql",
          "text": "-- 41. Second highest salary\nSELECT MAX(salary)\nFROM Employees\nWHERE salary < (SELECT MAX(salary) FROM Employees);\n\n-- 42. Third highest salary\nSELECT DISTINCT salary\nFROM Employees\nORDER BY salary DESC\nOFFSET 2 LIMIT 1;\n\n-- 43. Employees earning above average salary\nSELECT *\nFROM Employees\nWHERE salary > (SELECT AVG(salary) FROM Employees);\n\n-- 44. Employees earning highest salary\nSELECT *\nFROM Employees\nWHERE salary = (SELECT MAX(salary) FROM Employees);\n\n-- 45. Employees in same department as John\nSELECT *\nFROM Employees\nWHERE department = (SELECT department FROM Employees WHERE name = 'John');\n\n-- 46. Salary above department average\nSELECT *\nFROM Employees e\nWHERE salary > (SELECT AVG(salary) FROM Employees WHERE department = e.department);\n\n-- 47. Salary below company average\nSELECT *\nFROM Employees\nWHERE salary < (SELECT AVG(salary) FROM Employees);\n\n-- 48. Customers placing more than 5 orders\nSELECT customer_id, COUNT(*)\nFROM Orders\nGROUP BY customer_id\nHAVING COUNT(*) > 5;\n\n-- 49. Departments having no employees\nSELECT *\nFROM Departments d\nWHERE NOT EXISTS (SELECT 1 FROM Employees e WHERE e.department = d.dept_id);\n\n-- 50. Employees hired after oldest employee\nSELECT *\nFROM Employees\nWHERE joining_date > (SELECT MIN(joining_date) FROM Employees);"
        }
      ]
    },
    {
      "id": "string-date",
      "type": "notes",
      "label": "String and Date",
      "heading": "String and Date Functions",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "These examples show common string manipulation and date arithmetic in PostgreSQL."
          ]
        },
        {
          "type": "code",
          "filename": "string-date.sql",
          "text": "-- 51. Employee names in uppercase\nSELECT UPPER(name) FROM Employees;\n\n-- 52. Employee names in lowercase\nSELECT LOWER(name) FROM Employees;\n\n-- 53. First 3 letters of names\nSELECT SUBSTRING(name, 1, 3) FROM Employees;\n\n-- 54. Length of each employee name\nSELECT name, LENGTH(name) FROM Employees;\n\n-- 55. Replace 'a' with '@'\nSELECT REPLACE(name, 'a', '@') FROM Employees;\n\n-- 56. Employees joined this year\nSELECT *\nFROM Employees\nWHERE EXTRACT(YEAR FROM joining_date) = EXTRACT(YEAR FROM CURRENT_DATE);\n\n-- 57. Joined in last 30 days\nSELECT *\nFROM Employees\nWHERE joining_date >= CURRENT_DATE - INTERVAL '30 days';\n\n-- 58. Years of experience\nSELECT name, EXTRACT(YEAR FROM AGE(CURRENT_DATE, joining_date)) AS experience\nFROM Employees;\n\n-- 59. Orders placed today\nSELECT * FROM Orders WHERE order_date = CURRENT_DATE;\n\n-- 60. Orders placed this month\nSELECT *\nFROM Orders\nWHERE EXTRACT(MONTH FROM order_date) = EXTRACT(MONTH FROM CURRENT_DATE)\n  AND EXTRACT(YEAR FROM order_date) = EXTRACT(YEAR FROM CURRENT_DATE);"
        }
      ]
    },
    {
      "id": "case-duplicates",
      "type": "notes",
      "label": "CASE and Duplicates",
      "heading": "CASE Logic and Duplicate Handling",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Use CASE expressions for custom labels and GROUP BY to find duplicates."
          ]
        },
        {
          "type": "code",
          "filename": "case-duplicates.sql",
          "text": "-- 61. Employee grade using CASE\nSELECT name, salary,\n  CASE\n    WHEN salary >= 100000 THEN 'A'\n    WHEN salary >= 70000 THEN 'B'\n    ELSE 'C'\n  END AS grade\nFROM Employees;\n\n-- 62. Display order status text\nSELECT order_id,\n  CASE status\n    WHEN 'P' THEN 'Pending'\n    WHEN 'C' THEN 'Completed'\n    WHEN 'X' THEN 'Cancelled'\n  END AS status\nFROM Orders;\n\n-- 63. Junior/Senior by experience\nSELECT name,\n  CASE\n    WHEN AGE(CURRENT_DATE, joining_date) >= INTERVAL '5 years' THEN 'Senior'\n    ELSE 'Junior'\n  END AS level\nFROM Employees;\n\n-- 64. Find duplicate employee names\nSELECT name, COUNT(*)\nFROM Employees\nGROUP BY name\nHAVING COUNT(*) > 1;\n\n-- 65. Delete duplicate records\nDELETE FROM Employees e1\nUSING Employees e2\nWHERE e1.ctid < e2.ctid\n  AND e1.name = e2.name;\n\n-- 66. Find duplicate emails\nSELECT email, COUNT(*)\nFROM Customers\nGROUP BY email\nHAVING COUNT(*) > 1;"
        }
      ]
    },
    {
      "id": "window",
      "type": "notes",
      "label": "Window Functions",
      "heading": "Window Functions and Ranking",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Window functions help rank rows, compute running totals, and compare values relative to neighbors."
          ]
        },
        {
          "type": "code",
          "filename": "window-functions.sql",
          "text": "-- 67. Assign row numbers by salary\nSELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num\nFROM Employees;\n\n-- 68. Rank employees by salary\nSELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rank\nFROM Employees;\n\n-- 69. Dense rank employees\nSELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank\nFROM Employees;\n\n-- 70. Top 3 salaries using DENSE_RANK()\nSELECT *\nFROM (\n  SELECT *, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n  FROM Employees\n) t\nWHERE rnk <= 3;\n\n-- 71. Running total of salaries\nSELECT name, salary, SUM(salary) OVER (ORDER BY salary) AS running_total\nFROM Employees;\n\n-- 72. Previous employee salary\nSELECT name, salary, LAG(salary) OVER (ORDER BY salary) AS previous_salary\nFROM Employees;\n\n-- 73. Next employee salary\nSELECT name, salary, LEAD(salary) OVER (ORDER BY salary) AS next_salary\nFROM Employees;\n\n-- 74. Salary difference from previous employee\nSELECT name, salary, salary - LAG(salary) OVER (ORDER BY salary) AS salary_difference\nFROM Employees;\n\n-- 75. Highest-paid employee in each department\nSELECT *\nFROM (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn\n  FROM Employees\n) t\nWHERE rn = 1;"
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
            "Use SELECT and WHERE for basic retrieval and filtering.",
            "Use ORDER BY to sort rows and LIMIT/OFFSET for paging.",
            "Use GROUP BY and HAVING for aggregations and thresholds.",
            "Use JOINs to combine data from related tables.",
            "Use subqueries for nested logic and comparisons.",
            "Use CASE, string functions, date functions, and window functions for advanced analysis."
          ]
        }
      ]
    }
  ]
};
