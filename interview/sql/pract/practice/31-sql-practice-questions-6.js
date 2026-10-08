window.notePageData = {
  "title": "31. SQL Practice Questions 6 - Activity, Retention and Sequences",
  "navLabel": "SQL Practice 6 sections",
  "hero": {
    "type": "introduction",
    "label": "Introduction",
    "heading": "31. SQL Practice Questions 6 - Activity, Retention and Sequences",
    "text": "10 solved SQL interview practice questions with complete sample data, simple explanations, and expected results. Questions 51-60 cover distinct active users, login streaks, retention, sessions, inactivity, date comparisons, and consecutive values. All timestamps represent UTC wall-clock values."
  },
  "nav": [
    {
      "label": "Tables & Setup",
      "href": "#tables"
    },
    {
      "label": "51. Daily Active Users",
      "href": "#q51"
    },
    {
      "label": "52. 3-Day Login Streaks",
      "href": "#q52"
    },
    {
      "label": "53. Day-One Retention",
      "href": "#q53"
    },
    {
      "label": "54. 30-Minute Sessions",
      "href": "#q54"
    },
    {
      "label": "55. January Only Users",
      "href": "#q55"
    },
    {
      "label": "56. New vs Returning Users",
      "href": "#q56"
    },
    {
      "label": "57. Gaps Between Logins",
      "href": "#q57"
    },
    {
      "label": "58. Rising Temperature",
      "href": "#q58"
    },
    {
      "label": "59. Consecutive Values",
      "href": "#q59"
    },
    {
      "label": "60. Active Every Day",
      "href": "#q60"
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
            "Questions 51-60 cover distinct active users, login streaks, retention, sessions, inactivity, date comparisons, and consecutive values. All timestamps represent UTC wall-clock values."
          ]
        },
        {
          "type": "code",
          "filename": "set-6-setup.sql",
          "text": "CREATE SCHEMA sql_practice_6;\nSET search_path TO sql_practice_6;\n\nCREATE TABLE Users (\nuser_id INT PRIMARY KEY,\nuser_name VARCHAR(40) NOT NULL\n);\n\nINSERT INTO Users (user_id, user_name) VALUES\n(1, 'Asha'),\n(2, 'Rohan'),\n(3, 'Meera'),\n(4, 'Kabir'),\n(5, 'Isha');\n\nCREATE TABLE Logins (\nlogin_id INT PRIMARY KEY,\nuser_id INT NOT NULL REFERENCES Users(user_id),\nlogin_at TIMESTAMP NOT NULL\n);\n\nINSERT INTO Logins (login_id, user_id, login_at) VALUES\n(1, 1, '2024-01-01 09:00:00'),\n(2, 1, '2024-01-01 09:10:00'),\n(3, 1, '2024-01-01 09:40:00'),\n(4, 1, '2024-01-01 10:11:00'),\n(5, 2, '2024-01-01 12:00:00'),\n(6, 1, '2024-01-02 09:00:00'),\n(7, 3, '2024-01-02 11:00:00'),\n(8, 1, '2024-01-03 09:00:00'),\n(9, 2, '2024-01-03 12:00:00'),\n(10, 3, '2024-01-03 11:00:00'),\n(11, 2, '2024-01-04 12:00:00'),\n(12, 1, '2024-01-05 09:00:00'),\n(13, 1, '2024-01-06 09:00:00'),\n(14, 1, '2024-01-07 09:00:00'),\n(15, 1, '2024-02-01 09:00:00'),\n(16, 4, '2024-02-01 10:00:00'),\n(17, 3, '2024-02-02 11:00:00');\n\nCREATE TABLE Weather (\nrecord_date DATE PRIMARY KEY,\ntemperature NUMERIC(5,1) NOT NULL\n);\n\nINSERT INTO Weather (record_date, temperature) VALUES\n('2024-01-01', 20),\n('2024-01-02', 25),\n('2024-01-03', 22),\n('2024-01-05', 30),\n('2024-01-06', 31);\n\nCREATE TABLE EventValues (\nevent_id INT PRIMARY KEY,\nvalue INT NOT NULL\n);\n\nINSERT INTO EventValues (event_id, value) VALUES\n(1, 7),\n(2, 7),\n(4, 7),\n(5, 2),\n(8, 2),\n(9, 3),\n(10, 3),\n(12, 3),\n(13, 3),\n(14, 7);"
        },
        {
          "type": "paragraph",
          "parts": [
            "Users"
          ]
        },
        {
          "type": "table",
          "headers": [
            "user_id",
            "user_name"
          ],
          "rows": [
            [
              1,
              "Asha"
            ],
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
              5,
              "Isha"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Logins"
          ]
        },
        {
          "type": "table",
          "headers": [
            "login_id",
            "user_id",
            "login_at"
          ],
          "rows": [
            [
              1,
              1,
              "2024-01-01 09:00:00"
            ],
            [
              2,
              1,
              "2024-01-01 09:10:00"
            ],
            [
              3,
              1,
              "2024-01-01 09:40:00"
            ],
            [
              4,
              1,
              "2024-01-01 10:11:00"
            ],
            [
              5,
              2,
              "2024-01-01 12:00:00"
            ],
            [
              6,
              1,
              "2024-01-02 09:00:00"
            ],
            [
              7,
              3,
              "2024-01-02 11:00:00"
            ],
            [
              8,
              1,
              "2024-01-03 09:00:00"
            ],
            [
              9,
              2,
              "2024-01-03 12:00:00"
            ],
            [
              10,
              3,
              "2024-01-03 11:00:00"
            ],
            [
              11,
              2,
              "2024-01-04 12:00:00"
            ],
            [
              12,
              1,
              "2024-01-05 09:00:00"
            ],
            [
              13,
              1,
              "2024-01-06 09:00:00"
            ],
            [
              14,
              1,
              "2024-01-07 09:00:00"
            ],
            [
              15,
              1,
              "2024-02-01 09:00:00"
            ],
            [
              16,
              4,
              "2024-02-01 10:00:00"
            ],
            [
              17,
              3,
              "2024-02-02 11:00:00"
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Weather"
          ]
        },
        {
          "type": "table",
          "headers": [
            "record_date",
            "temperature"
          ],
          "rows": [
            [
              "2024-01-01",
              20
            ],
            [
              "2024-01-02",
              25
            ],
            [
              "2024-01-03",
              22
            ],
            [
              "2024-01-05",
              30
            ],
            [
              "2024-01-06",
              31
            ]
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "EventValues"
          ]
        },
        {
          "type": "table",
          "headers": [
            "event_id",
            "value"
          ],
          "rows": [
            [
              1,
              7
            ],
            [
              2,
              7
            ],
            [
              4,
              7
            ],
            [
              5,
              2
            ],
            [
              8,
              2
            ],
            [
              9,
              3
            ],
            [
              10,
              3
            ],
            [
              12,
              3
            ],
            [
              13,
              3
            ],
            [
              14,
              7
            ]
          ]
        }
      ]
    },
    {
      "id": "q51",
      "type": "notes",
      "label": "51. Daily active users without double counting",
      "heading": "51. Daily active users without double counting ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Report January 1-7, 2024. For each date, return distinct users with at least one login, including dates with zero users."
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
          "filename": "51-answer.sql",
          "text": "WITH calendar AS (\n  SELECT d::date AS day\n  FROM GENERATE_SERIES(\n    TIMESTAMP '2024-01-01', TIMESTAMP '2024-01-07', INTERVAL '1 day'\n  ) AS g(d)\n)\nSELECT c.day, COUNT(DISTINCT l.user_id) AS active_users\nFROM calendar c\nLEFT JOIN Logins l\n  ON l.login_at >= c.day\n AND l.login_at < c.day + INTERVAL '1 day'\nGROUP BY c.day\nORDER BY c.day;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Join each calendar date to the logins within that day. DISTINCT counts a user once even if they logged in several times."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: COUNT(DISTINCT)",
            "Concepts Tested: Calendar",
            "Concepts Tested: Timestamp range"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: COUNT(*) measures login rows, not active users."
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
            "day",
            "active_users"
          ],
          "rows": [
            [
              "2024-01-01",
              2
            ],
            [
              "2024-01-02",
              2
            ],
            [
              "2024-01-03",
              3
            ],
            [
              "2024-01-04",
              1
            ],
            [
              "2024-01-05",
              1
            ],
            [
              "2024-01-06",
              1
            ],
            [
              "2024-01-07",
              1
            ]
          ]
        }
      ]
    },
    {
      "id": "q52",
      "type": "notes",
      "label": "52. Login streaks of at least three days",
      "heading": "52. Login streaks of at least three days ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find every streak of at least three consecutive calendar days for each user. Return user_id, streak start, streak end, and days in the streak. Multiple logins on one day count as one day."
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
          "filename": "52-answer.sql",
          "text": "WITH days AS (\n  SELECT DISTINCT user_id, login_at::date AS day\n  FROM Logins\n), grouped AS (\n  SELECT user_id, day,\n         day - (ROW_NUMBER() OVER (\n           PARTITION BY user_id ORDER BY day\n         ))::int AS streak_key\n  FROM days\n)\nSELECT user_id, MIN(day) AS streak_start,\n       MAX(day) AS streak_end, COUNT(*) AS streak_days\nFROM grouped\nGROUP BY user_id, streak_key\nHAVING COUNT(*) >= 3\nORDER BY user_id, streak_start;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: For consecutive dates, subtracting their increasing row numbers produces the same date key. Group that key to collect each uninterrupted streak."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Gaps and islands",
            "Concepts Tested: ROW_NUMBER()",
            "Concepts Tested: Date arithmetic",
            "Concepts Tested: DISTINCT"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Remove duplicate login dates before assigning row numbers. Otherwise several logins on one day can break the grouping."
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
            "user_id",
            "streak_start",
            "streak_end",
            "streak_days"
          ],
          "rows": [
            [
              1,
              "2024-01-01",
              "2024-01-03",
              3
            ],
            [
              1,
              "2024-01-05",
              "2024-01-07",
              3
            ]
          ]
        }
      ]
    },
    {
      "id": "q53",
      "type": "notes",
      "label": "53. Day-one retention after the first login",
      "heading": "53. Day-one retention after the first login ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Return the percentage of users who logged in on the calendar day immediately after their first-ever login. The denominator is users who have at least one login; exclude users who never logged in. Round to two decimals."
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
          "filename": "53-answer.sql",
          "text": "WITH first_login AS (\n  SELECT user_id, MIN(login_at::date) AS first_day\n  FROM Logins\n  GROUP BY user_id\n)\nSELECT ROUND(100.0 * COUNT(CASE WHEN EXISTS (\n  SELECT 1 FROM Logins l\n  WHERE l.user_id = f.user_id\n    AND l.login_at >= f.first_day + INTERVAL '1 day'\n    AND l.login_at < f.first_day + INTERVAL '2 days'\n) THEN 1 END) / NULLIF(COUNT(*), 0), 2) AS day_one_retention_percent\nFROM first_login f;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Build one row per user with their first login date. EXISTS checks whether they returned on the next calendar day without multiplying users with multiple return logins."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: MIN()",
            "Concepts Tested: EXISTS",
            "Concepts Tested: Retention denominator",
            "Concepts Tested: Percentage"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: The next calendar day is different from within 24 hours. State the chosen definition."
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
            "day_one_retention_percent"
          ],
          "rows": [
            [
              "50.00"
            ]
          ]
        }
      ]
    },
    {
      "id": "q54",
      "type": "notes",
      "label": "54. Group events into 30-minute sessions",
      "heading": "54. Group events into 30-minute sessions ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Sessionize all login events, then display sessions that started on January 1, 2024. A new session starts when the gap from the previous event for that user is greater than 30 minutes. A gap of exactly 30 minutes stays in the same session."
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Difficulty: Hard"
          ]
        },
        {
          "type": "code",
          "filename": "54-answer.sql",
          "text": "WITH previous AS (\n  SELECT login_id, user_id, login_at,\n         LAG(login_at) OVER (\n           PARTITION BY user_id ORDER BY login_at, login_id\n         ) AS previous_at\n  FROM Logins\n), flags AS (\n  SELECT *, CASE\n    WHEN previous_at IS NULL\n      OR login_at - previous_at > INTERVAL '30 minutes'\n    THEN 1 ELSE 0 END AS new_session\n  FROM previous\n), numbered AS (\n  SELECT *, SUM(new_session) OVER (\n    PARTITION BY user_id ORDER BY login_at, login_id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS session_number\n  FROM flags\n), sessions AS (\n  SELECT user_id, session_number, MIN(login_at) AS session_start,\n         MAX(login_at) AS session_end, COUNT(*) AS event_count\n  FROM numbered\n  GROUP BY user_id, session_number\n)\nSELECT * FROM sessions\nWHERE session_start >= TIMESTAMP '2024-01-01'\n  AND session_start < TIMESTAMP '2024-01-02'\nORDER BY user_id, session_number;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: LAG finds the previous event. Mark the beginning of each session, then cumulatively add those markers to assign a session number."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: LAG()",
            "Concepts Tested: CASE",
            "Concepts Tested: Running SUM()",
            "Concepts Tested: Sessionization"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Create sessions before filtering the report date, so a session crossing midnight is not accidentally split."
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
            "user_id",
            "session_number",
            "session_start",
            "session_end",
            "event_count"
          ],
          "rows": [
            [
              1,
              1,
              "2024-01-01 09:00:00",
              "2024-01-01 09:40:00",
              3
            ],
            [
              1,
              2,
              "2024-01-01 10:11:00",
              "2024-01-01 10:11:00",
              1
            ],
            [
              2,
              1,
              "2024-01-01 12:00:00",
              "2024-01-01 12:00:00",
              1
            ]
          ]
        }
      ]
    },
    {
      "id": "q55",
      "type": "notes",
      "label": "55. Active in January but inactive in February",
      "heading": "55. Active in January but inactive in February ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find users who logged in during January 2024 but had no login during February 2024. Return each user once."
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
          "filename": "55-answer.sql",
          "text": "SELECT u.user_id, u.user_name\nFROM Users u\nWHERE EXISTS (\n  SELECT 1 FROM Logins l\n  WHERE l.user_id = u.user_id\n    AND l.login_at >= TIMESTAMP '2024-01-01'\n    AND l.login_at < TIMESTAMP '2024-02-01'\n)\nAND NOT EXISTS (\n  SELECT 1 FROM Logins l\n  WHERE l.user_id = u.user_id\n    AND l.login_at >= TIMESTAMP '2024-02-01'\n    AND l.login_at < TIMESTAMP '2024-03-01'\n)\nORDER BY u.user_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: The first condition requires activity in January. The second rules out any February activity."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: EXISTS",
            "Concepts Tested: NOT EXISTS",
            "Concepts Tested: Month boundaries"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Checking login_at outside February on individual rows does not prove the user had no February login."
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
            "user_id",
            "user_name"
          ],
          "rows": [
            [
              2,
              "Rohan"
            ]
          ]
        }
      ]
    },
    {
      "id": "q56",
      "type": "notes",
      "label": "56. Monthly new and returning active users",
      "heading": "56. Monthly new and returning active users ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "For each month with activity, count active users whose first-ever login is in that month as new; count other active users as returning. Use first login, not account creation, to define new."
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
          "filename": "56-answer.sql",
          "text": "WITH first_seen AS (\n  SELECT user_id,\n         DATE_TRUNC('month', MIN(login_at))::date AS first_month\n  FROM Logins\n  GROUP BY user_id\n), active AS (\n  SELECT DISTINCT user_id,\n         DATE_TRUNC('month', login_at)::date AS month\n  FROM Logins\n)\nSELECT a.month, COUNT(*) AS active_users,\n       COUNT(CASE WHEN a.month = f.first_month THEN 1 END) AS new_users,\n       COUNT(CASE WHEN a.month > f.first_month THEN 1 END) AS returning_users\nFROM active a\nJOIN first_seen f ON f.user_id = a.user_id\nGROUP BY a.month\nORDER BY a.month;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Reduce activity to one row per user per month, then compare that month with the user's first active month."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: COUNT(DISTINCT) pattern",
            "Concepts Tested: CTE",
            "Concepts Tested: Conditional aggregation"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Returning means first seen in an earlier month; it does not require being active in the immediately previous month."
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
            "month",
            "active_users",
            "new_users",
            "returning_users"
          ],
          "rows": [
            [
              "2024-01-01",
              3,
              3,
              0
            ],
            [
              "2024-02-01",
              3,
              1,
              2
            ]
          ]
        }
      ]
    },
    {
      "id": "q57",
      "type": "notes",
      "label": "57. Find long gaps between active dates",
      "heading": "57. Find long gaps between active dates ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "For each user, compare each distinct active date with the next active date. Return gaps longer than one day, showing both calendar-day distance and the number of completely inactive days between them."
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
          "filename": "57-answer.sql",
          "text": "WITH days AS (\n  SELECT DISTINCT user_id, login_at::date AS day\n  FROM Logins\n), next_dates AS (\n  SELECT user_id, day,\n         LEAD(day) OVER (PARTITION BY user_id ORDER BY day) AS next_day\n  FROM days\n)\nSELECT user_id, day, next_day,\n       next_day - day AS day_distance,\n       next_day - day - 1 AS inactive_days_between\nFROM next_dates\nWHERE next_day - day > 1\nORDER BY user_id, day;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: LEAD reads the next active date. Subtracting dates gives calendar-day distance; subtract one more to exclude the two active endpoints."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: LEAD()",
            "Concepts Tested: Date subtraction",
            "Concepts Tested: DISTINCT"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: January 1 to January 3 is a two-day distance but only one completely inactive day."
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
            "user_id",
            "day",
            "next_day",
            "day_distance",
            "inactive_days_between"
          ],
          "rows": [
            [
              1,
              "2024-01-03",
              "2024-01-05",
              2,
              1
            ],
            [
              1,
              "2024-01-07",
              "2024-02-01",
              25,
              24
            ],
            [
              2,
              "2024-01-01",
              "2024-01-03",
              2,
              1
            ],
            [
              3,
              "2024-01-03",
              "2024-02-02",
              30,
              29
            ]
          ]
        }
      ]
    },
    {
      "id": "q58",
      "type": "notes",
      "label": "58. Warmer than the previous calendar day",
      "heading": "58. Warmer than the previous calendar day ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find dates warmer than the immediately previous calendar day. If the previous day is missing from Weather, exclude that date."
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
          "filename": "58-answer.sql",
          "text": "SELECT today.record_date, today.temperature,\n       yesterday.temperature AS previous_temperature\nFROM Weather today\nJOIN Weather yesterday\n  ON yesterday.record_date = today.record_date - 1\nWHERE today.temperature > yesterday.temperature\nORDER BY today.record_date;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Join by the actual previous date, then compare temperatures. January 5 has no January 4 record, so it must not qualify."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: Self join",
            "Concepts Tested: Date arithmetic",
            "Concepts Tested: Missing-date semantics"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: LAG alone means previous row, which is not necessarily yesterday when dates are missing."
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
            "record_date",
            "temperature",
            "previous_temperature"
          ],
          "rows": [
            [
              "2024-01-02",
              "25.0",
              "20.0"
            ],
            [
              "2024-01-06",
              "31.0",
              "30.0"
            ]
          ]
        }
      ]
    },
    {
      "id": "q59",
      "type": "notes",
      "label": "59. Same value in three consecutive rows",
      "heading": "59. Same value in three consecutive rows ⭐⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Return each value that appears in at least three consecutive rows ordered by event_id. Event IDs may have gaps; consecutive means adjacent rows in that order."
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
          "filename": "59-answer.sql",
          "text": "WITH next_values AS (\n  SELECT event_id, value,\n         LEAD(value, 1) OVER (ORDER BY event_id) AS next_value,\n         LEAD(value, 2) OVER (ORDER BY event_id) AS second_next_value\n  FROM EventValues\n)\nSELECT DISTINCT value\nFROM next_values\nWHERE value = next_value AND value = second_next_value\nORDER BY value;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Look one and two rows ahead. If all three values match, the current row begins a qualifying run. DISTINCT reports a long run only once."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: LEAD() offsets",
            "Concepts Tested: Consecutive rows",
            "Concepts Tested: DISTINCT"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Do not require event_id + 1 and event_id + 2 unless the question explicitly means consecutive numeric IDs."
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
            "value"
          ],
          "rows": [
            [
              3
            ],
            [
              7
            ]
          ]
        }
      ]
    },
    {
      "id": "q60",
      "type": "notes",
      "label": "60. Users active on every day in a date range",
      "heading": "60. Users active on every day in a date range ⭐⭐⭐⭐",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Find users with at least one login on each day from January 1 through January 3, 2024, inclusive. Extra logins on the same day must not count toward another day."
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
          "filename": "60-answer.sql",
          "text": "SELECT u.user_id, u.user_name\nFROM Users u\nJOIN Logins l ON l.user_id = u.user_id\nWHERE l.login_at >= TIMESTAMP '2024-01-01'\n  AND l.login_at < TIMESTAMP '2024-01-04'\nGROUP BY u.user_id, u.user_name\nHAVING COUNT(DISTINCT l.login_at::date) =\n       DATE '2024-01-03' - DATE '2024-01-01' + 1\nORDER BY u.user_id;"
        },
        {
          "type": "paragraph",
          "parts": [
            "How it works: Restrict logins to the required interval, then check that the distinct active-date count equals the inclusive interval length."
          ]
        },
        {
          "type": "list",
          "items": [
            "Concepts Tested: COUNT(DISTINCT)",
            "Concepts Tested: HAVING",
            "Concepts Tested: Inclusive date count"
          ]
        },
        {
          "type": "paragraph",
          "parts": [
            "Interview tip: Using COUNT(*) could incorrectly accept three logins on one day."
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
            "user_id",
            "user_name"
          ],
          "rows": [
            [
              1,
              "Asha"
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
            "Choose the grain first: events, distinct dates, users, or user-months.",
            "Consecutive dates, consecutive rows, and consecutive numeric IDs are different requirements.",
            "LAG reads backward and LEAD reads forward within the chosen ordering.",
            "Remove same-day duplicates before building a date streak.",
            "For retention, define first activity, return window, and denominator explicitly."
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
            "Game Play Analysis IV: https://leetcode.com/problems/game-play-analysis-iv/",
            "PostgreSQL window functions: https://www.postgresql.org/docs/current/functions-window.html",
            "PostgreSQL date/time functions: https://www.postgresql.org/docs/current/functions-datetime.html"
          ]
        }
      ]
    }
  ]
};
