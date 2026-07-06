window.notePageData = {
  "title": "SQL Practice Questions - Employees",
  "navLabel": "Employee SQL sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "SQL Practice Questions - Employees",
    "text": "Practice SQL questions based on Employees and Departments tables, covering self joins, grouping, subqueries, and window functions."
  },
  "nav": [
    { "label": "Tables", "href": "#tables" },
    { "label": "1. More Than Manager", "href": "#q1" },
    { "label": "2. 3+ Employees", "href": "#q2" },
    { "label": "3. Every Employee > 70000", "href": "#q3" },
    { "label": "4. Hired Before Manager", "href": "#q4" },
    { "label": "5. Longest Serving", "href": "#q5" },
    { "label": "6. Above Dept Avg", "href": "#q6" },
    { "label": "7. Same Salary", "href": "#q7" },
    { "label": "8. Same Manager & Hire Date", "href": "#q8" },
    { "label": "9. Salary Gap", "href": "#q9" },
    { "label": "10. Top 2 Per Dept", "href": "#q10" },
    { "label": "Summary", "href": "#summary" }
  ],
  "sections": [
    {
      "id": "tables",
      "type": "notes",
      "label": "Tables",
      "heading": "Sample Tables",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "These questions use the following Employees and Departments tables."
          ]
        },
        {
          "type": "table",
          "headers": ["emp_id", "emp_name", "dept_id", "manager_id", "salary", "hire_date"],
          "rows": [
            [101, "Amit", 1, 201, 70000, "2022-01-10"],
            [102, "Rahul", 1, 201, 85000, "2021-05-15"],
            [103, "Neha", 2, 202, 60000, "2023-02-01"],
            [104, "Priya", 3, 203, 90000, "2020-10-18"],
            [105, "Ravi", 1, 201, 70000, "2024-01-01"],
            [106, "Karan", 2, 202, 95000, "2019-06-20"],
            [201, "Raj", 1, null, 120000, "2018-03-10"],
            [202, "Sunil", 2, null, 130000, "2017-07-15"],
            [203, "Meena", 3, null, 125000, "2016-11-25"]
          ]
        },
        {
          "type": "table",
          "headers": ["dept_id", "dept_name"],
          "rows": [
            [1, "IT"],
            [2, "HR"],
            [3, "Sales"],
            [4, "Finance"]
          ]
        },
        {
          "type": "code",
          "filename": "create-employees.sql",
          "text": "CREATE TABLE Employees (\n  emp_id INT PRIMARY KEY,\n  emp_name VARCHAR(50),\n  dept_id INT,\n  manager_id INT,\n  salary INT,\n  hire_date DATE\n);"
        }
      ]
    },
    {
      "id": "q1",
      "type": "notes",
      "label": "1. Employees earning more than their manager",
      "heading": "1. Employees earning more than their manager ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find employees whose salary is greater than their manager's salary."
          ]
        },
        {
          "type": "code",
          "filename": "01-employee-more-than-manager.sql",
          "text": "SELECT\n  e.emp_name AS employee,\n  e.salary AS employee_salary,\n  m.emp_name AS manager,\n  m.salary AS manager_salary\nFROM Employees e\nJOIN Employees m\n  ON e.manager_id = m.emp_id\nWHERE e.salary > m.salary;"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Self Join",
            "Concepts Tested: JOIN",
            "Concepts Tested: WHERE"
          ]
        }
      ]
    },
    {
      "id": "q2",
      "type": "notes",
      "label": "2. Managers with at least 3 employees",
      "heading": "2. Managers with at least 3 employees ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find managers who supervise at least three employees."
          ]
        },
        {
          "type": "code",
          "filename": "02-managers-with-3-plus-employees.sql",
          "text": "SELECT\n  m.emp_id,\n  m.emp_name,\n  COUNT(e.emp_id) AS employee_count\nFROM Employees e\nJOIN Employees m\n  ON e.manager_id = m.emp_id\nGROUP BY\n  m.emp_id,\n  m.emp_name\nHAVING COUNT(e.emp_id) >= 3;"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: GROUP BY",
            "Concepts Tested: HAVING",
            "Concepts Tested: Self Join"
          ]
        }
      ]
    },
    {
      "id": "q3",
      "type": "notes",
      "label": "3. Departments where every employee earns more than ₹70,000",
      "heading": "3. Departments where every employee earns more than ₹70,000 ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find departments in which every employee earns more than ₹70,000."
          ]
        },
        {
          "type": "code",
          "filename": "03-departments-with-every-employee-above-70000.sql",
          "text": "SELECT dept_id\nFROM Employees\nGROUP BY dept_id\nHAVING MIN(salary) > 70000;"
        },
        {
          "type": "paragraph",
          "parts": [
            "Alternative using NOT EXISTS."
          ]
        },
        {
          "type": "code",
          "filename": "03-departments-with-every-employee-above-70000-alt.sql",
          "text": "SELECT DISTINCT dept_id\nFROM Employees e\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM Employees x\n  WHERE x.dept_id = e.dept_id\n    AND x.salary <= 70000\n);"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: GROUP BY",
            "Concepts Tested: HAVING",
            "Concepts Tested: MIN()",
            "Concepts Tested: NOT EXISTS"
          ]
        }
      ]
    },
    {
      "id": "q4",
      "type": "notes",
      "label": "4. Employees hired before their manager",
      "heading": "4. Employees hired before their manager ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find employees who were hired earlier than their manager."
          ]
        },
        {
          "type": "code",
          "filename": "04-employees-hired-before-manager.sql",
          "text": "SELECT\n  e.emp_name,\n  e.hire_date,\n  m.emp_name AS manager,\n  m.hire_date AS manager_hire_date\nFROM Employees e\nJOIN Employees m\n  ON e.manager_id = m.emp_id\nWHERE e.hire_date < m.hire_date;"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Self Join",
            "Concepts Tested: Date comparison"
          ]
        }
      ]
    },
    {
      "id": "q5",
      "type": "notes",
      "label": "5. Longest-serving employee in each department",
      "heading": "5. Longest-serving employee in each department ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find the earliest-hired employee in each department."
          ]
        },
        {
          "type": "code",
          "filename": "05-longest-serving-employee-per-department.sql",
          "text": "SELECT *\nFROM (\n  SELECT\n    *,\n    ROW_NUMBER() OVER (\n      PARTITION BY dept_id\n      ORDER BY hire_date\n    ) AS rn\n  FROM Employees\n) t\nWHERE rn = 1;"
        },
        {
          "type": "paragraph",
          "parts": [
            "Alternative using a correlated subquery."
          ]
        },
        {
          "type": "code",
          "filename": "05-longest-serving-employee-per-department-alt.sql",
          "text": "SELECT *\nFROM Employees e\nWHERE hire_date = (\n  SELECT MIN(hire_date)\n  FROM Employees\n  WHERE dept_id = e.dept_id\n);"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Window Function",
            "Concepts Tested: ROW_NUMBER()",
            "Concepts Tested: PARTITION BY"
          ]
        }
      ]
    },
    {
      "id": "q6",
      "type": "notes",
      "label": "6. Salary above department average but below company average",
      "heading": "6. Salary above department average but below company average ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find employees whose salary is above their department average but below the company average."
          ]
        },
        {
          "type": "code",
          "filename": "06-salary-above-dept-avg-below-company-avg.sql",
          "text": "SELECT\n  emp_name,\n  salary,\n  dept_id\nFROM Employees e\nWHERE salary > (\n  SELECT AVG(salary)\n  FROM Employees\n  WHERE dept_id = e.dept_id\n)\nAND salary < (\n  SELECT AVG(salary)\n  FROM Employees\n);"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Correlated Subquery",
            "Concepts Tested: Aggregate Functions"
          ]
        }
      ]
    },
    {
      "id": "q7",
      "type": "notes",
      "label": "7. Employees sharing the same salary within a department",
      "heading": "7. Employees sharing the same salary within a department ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find departments and salary values where more than one employee shares the same salary."
          ]
        },
        {
          "type": "code",
          "filename": "07-same-salary-in-department.sql",
          "text": "SELECT\n  dept_id,\n  salary,\n  STRING_AGG(emp_name, ', ') AS employees\nFROM Employees\nGROUP BY\n  dept_id,\n  salary\nHAVING COUNT(*) > 1;"
        },
        {
          "type": "paragraph",
          "parts": [
            "Alternative using EXISTS."
          ]
        },
        {
          "type": "code",
          "filename": "07-same-salary-in-department-alt.sql",
          "text": "SELECT *\nFROM Employees e\nWHERE EXISTS (\n  SELECT 1\n  FROM Employees x\n  WHERE x.dept_id = e.dept_id\n    AND x.salary = e.salary\n    AND x.emp_id <> e.emp_id\n);"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: GROUP BY",
            "Concepts Tested: HAVING",
            "Concepts Tested: EXISTS",
            "Concepts Tested: STRING_AGG() (PostgreSQL)"
          ]
        }
      ]
    },
    {
      "id": "q8",
      "type": "notes",
      "label": "8. Employees with the same manager and hire date",
      "heading": "8. Employees with the same manager and hire date ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find groups of employees who share both the same manager and same hire date."
          ]
        },
        {
          "type": "code",
          "filename": "08-same-manager-and-hire-date.sql",
          "text": "SELECT\n  manager_id,\n  hire_date,\n  STRING_AGG(emp_name, ', ') AS employees\nFROM Employees\nGROUP BY\n  manager_id,\n  hire_date\nHAVING COUNT(*) > 1;"
        },
        {
          "type": "paragraph",
          "parts": [
            "Alternative using Self Join."
          ]
        },
        {
          "type": "code",
          "filename": "08-same-manager-and-hire-date-alt.sql",
          "text": "SELECT\n  e1.emp_name,\n  e2.emp_name,\n  e1.manager_id,\n  e1.hire_date\nFROM Employees e1\nJOIN Employees e2\n  ON e1.manager_id = e2.manager_id\n AND e1.hire_date = e2.hire_date\n AND e1.emp_id < e2.emp_id;"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: GROUP BY",
            "Concepts Tested: Self Join"
          ]
        }
      ]
    },
    {
      "id": "q9",
      "type": "notes",
      "label": "9. Salary gap between employee and manager",
      "heading": "9. Salary gap between employee and manager ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find the salary difference between each employee and their manager."
          ]
        },
        {
          "type": "code",
          "filename": "09-salary-gap-between-employee-and-manager.sql",
          "text": "SELECT\n  e.emp_name,\n  e.salary,\n  m.emp_name AS manager,\n  m.salary AS manager_salary,\n  m.salary - e.salary AS salary_gap\nFROM Employees e\nJOIN Employees m\n  ON e.manager_id = m.emp_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "If you want the absolute difference:"
          ]
        },
        {
          "type": "code",
          "filename": "09-salary-gap-between-employee-and-manager-abs.sql",
          "text": "SELECT\n  e.emp_name,\n  m.emp_name AS manager,\n  ABS(e.salary - m.salary) AS salary_gap\nFROM Employees e\nJOIN Employees m\n  ON e.manager_id = m.emp_id;"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Self Join",
            "Concepts Tested: Arithmetic Functions",
            "Concepts Tested: ABS()"
          ]
        }
      ]
    },
    {
      "id": "q10",
      "type": "notes",
      "label": "10. Top 2 highest-paid employees in each department",
      "heading": "10. Top 2 highest-paid employees in each department ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find the top two highest-paid employees in each department."
          ]
        },
        {
          "type": "code",
          "filename": "10-top-2-highest-paid-employees-per-department.sql",
          "text": "SELECT\n  emp_name,\n  dept_id,\n  salary\nFROM (\n  SELECT\n    *,\n    DENSE_RANK() OVER (\n      PARTITION BY dept_id\n      ORDER BY salary DESC\n    ) AS rnk\n  FROM Employees\n) t\nWHERE rnk <= 2;"
        },
        {
          "type": "paragraph",
          "parts": [
            "If you need exactly two employees even when salaries tie, use ROW_NUMBER()."
          ]
        },
        {
          "type": "code",
          "filename": "10-top-2-highest-paid-employees-per-department-row-number.sql",
          "text": "SELECT\n  emp_name,\n  dept_id,\n  salary\nFROM (\n  SELECT\n    *,\n    ROW_NUMBER() OVER (\n      PARTITION BY dept_id\n      ORDER BY salary DESC\n    ) AS rn\n  FROM Employees\n) t\nWHERE rn <= 2;"
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Window Functions",
            "Concepts Tested: DENSE_RANK()",
            "Concepts Tested: ROW_NUMBER()",
            "Concepts Tested: PARTITION BY"
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
            "Self joins are useful when comparing rows from the same table.",
            "GROUP BY and HAVING help answer questions about aggregates and thresholds.",
            "Window functions such as ROW_NUMBER(), DENSE_RANK(), and PARTITION BY are ideal for ranking per group.",
            "Correlated subqueries and NOT EXISTS are common for exclusion-style problems."
          ]
        }
      ]
    }
  ]
};
