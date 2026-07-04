window.notePageData = {
  "title": "MongoDB Sorting & Pagination",
  "navLabel": "Sorting & Pagination Sections",
  "hero": {
    "type": "introduction",
    "label": "Sorting & Pagination",
    "heading": "MongoDB Sorting & Pagination",
    "text": "Sorting arranges query results in ascending or descending order, while pagination retrieves documents in manageable chunks. MongoDB provides sort(), limit(), skip(), cursor-based pagination, and infinite scrolling techniques for efficient data retrieval."
  },

  "nav": [
    { "label": "sort()", "href": "#sort" },
    { "label": "limit()", "href": "#limit" },
    { "label": "skip()", "href": "#skip" },
    { "label": "Pagination", "href": "#pagination" },
    { "label": "Cursor Pagination", "href": "#cursor-pagination" },
    { "label": "Infinite Scroll", "href": "#infinite-scroll" },
    { "label": "Terminology", "href": "#terms" },
    { "label": "Notes", "href": "#notes" },
    { "label": "Comparison", "href": "#comparison" },
    { "label": "Workflow", "href": "#workflow" },
    { "label": "Diagram", "href": "#diagram" }
  ],

  "sections": [
    {
      "id": "sort",
      "type": "sorting",
      "label": "sort()",
      "heading": "Sorting Documents",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "The ",
            { "code": "sort()" },
            " method orders query results. Use ",
            { "code": "1" },
            " for ascending order and ",
            { "code": "-1" },
            " for descending order. Multiple fields can also be sorted."
          ]
        },
        {
          "type": "code",
          "filename": "sort.mongodb",
          "text": "// Sort by name (Ascending)\ndb.users.find().sort({ name: 1 });\n\n// Sort by age (Descending)\ndb.users.find().sort({ age: -1 });\n\n// Sort by city then age\ndb.users.find().sort({ city: 1, age: -1 });"
        }
      ]
    },

    {
      "id": "limit",
      "type": "pagination",
      "label": "limit()",
      "heading": "Limit Returned Documents",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "The ",
            { "code": "limit()" },
            " method restricts the number of documents returned by a query. It is commonly used to display only a fixed number of records."
          ]
        },
        {
          "type": "code",
          "filename": "limit.mongodb",
          "text": "// Return first 5 documents\ndb.users.find().limit(5);\n\n// Return first 20 active users\ndb.users.find({ status: 'active' }).limit(20);"
        }
      ]
    },

    {
      "id": "skip",
      "type": "pagination",
      "label": "skip()",
      "heading": "Skip Documents",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "The ",
            { "code": "skip()" },
            " method ignores the specified number of documents before returning results. It is commonly used with ",
            { "code": "limit()" },
            " for page-based navigation."
          ]
        },
        {
          "type": "code",
          "filename": "skip.mongodb",
          "text": "// Skip first 10 documents\ndb.users.find().skip(10);\n\n// Skip first 50 active users\ndb.users.find({ status: 'active' }).skip(50);"
        }
      ]
    },

    {
      "id": "pagination",
      "type": "pagination",
      "label": "Pagination",
      "heading": "Traditional Pagination",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Traditional pagination combines ",
            { "code": "skip()" },
            " and ",
            { "code": "limit()" },
            " to fetch documents page by page. It is simple to implement but becomes slower for very large datasets because MongoDB must scan and discard all skipped documents."
          ]
        },
        {
          "type": "code",
          "filename": "pagination.mongodb",
          "text": "// Page 1\nconst page = 1;\nconst limit = 10;\n\ndb.users.find()\n  .skip((page - 1) * limit)\n  .limit(limit);\n\n// Page 2\ndb.users.find()\n  .skip(10)\n  .limit(10);"
        }
      ]
    },

    {
      "id": "cursor-pagination",
      "type": "pagination",
      "label": "Cursor-based Pagination",
      "heading": "Cursor-based Pagination",
      "blocks": [
        {
          "type": "paragraph",
          "parts": [
            "Cursor-based pagination uses a unique field such as ",
            { "code": "_id" },
            " or ",
            { "code": "createdAt" },
            " instead of ",
            { "code": "skip()" },
            ". It is faster and recommended for APIs and large collections because it avoids scanning skipped documents."
          ]
        },
        {
          "type": "code",
          "filename": "cursor-pagination.mongodb",
          "text": "// First request\ndb.users.find()\n  .sort({ _id: 1 })\n  .limit(10);\n\n// Next page using last _id\ndb.users.find({\n  _id: { $gt: lastId }\n})\n.sort({ _id: 1 })\n.limit(10);"
        }
      ]
    },

 {
  "id": "infinite-scroll",
  "type": "pagination",
  "label": "Infinite Scroll",
  "heading": "Infinite Scroll",
  "blocks": [
    {
      "type": "paragraph",
      "parts": [
        "Infinite scrolling is a UX pattern where new content loads automatically as the user scrolls toward the bottom of the page — eliminating the need for numbered pages or a 'Next' button. On the backend, it is powered by ",
        { "code": "cursor-based pagination" },
        " using a unique field like ",
        { "code": "_id" },
        " or ",
        { "code": "createdAt" },
        " to fetch the next batch of documents without using ",
        { "code": "skip()" },
        "."
      ]
    },

    {
      "type": "code",
      "filename": "infinite-scroll.mongodb",
      "text": "// ── Step 1: Initial Load (no cursor yet) ──────────────────────\ndb.posts.find()\n  .sort({ _id: 1 })\n  .limit(20);\n\n// ── Step 2: Load More (pass last visible _id as cursor) ────────\nconst lastVisibleId = ObjectId(\"64f3a1b2c3d4e5f6a7b8c9d0\");\n\ndb.posts.find({\n  _id: { $gt: lastVisibleId }   // fetch only documents AFTER the cursor\n})\n.sort({ _id: 1 })\n.limit(20);\n\n// ── Step 3: Keep loading more — update lastVisibleId each time ─\n// Repeat Step 2 with the new last _id from each response."
    },

    {
      "type": "paragraph",
      "parts": [
        "On the frontend, a ",
        { "code": "scroll" },
        " event listener or an ",
        { "code": "IntersectionObserver" },
        " detects when the user reaches the bottom of the list. When triggered, the client sends a new request with the last seen ",
        { "code": "_id" },
        " as the cursor, and the server returns the next batch of documents."
      ]
    },

    {
      "type": "code",
      "filename": "infinite-scroll-frontend.js",
      "text": "// ── Frontend: IntersectionObserver approach ───────────────────\nlet lastId = null;\nlet isFetching = false;\n\nconst sentinel = document.querySelector('#scroll-sentinel');\n// sentinel is an empty div placed at the very bottom of your list\n\nconst observer = new IntersectionObserver(async (entries) => {\n  if (entries[0].isIntersecting && !isFetching) {\n    isFetching = true;\n\n    const url = lastId\n      ? `/api/posts?limit=20&cursor=${lastId}`\n      : `/api/posts?limit=20`;\n\n    const res  = await fetch(url);\n    const data = await res.json();\n    // data = { posts: [...], nextCursor: '64f3...' | null }\n\n    appendPostsToUI(data.posts);\n\n    if (data.nextCursor) {\n      lastId = data.nextCursor;   // update cursor for next scroll\n      isFetching = false;\n    } else {\n      observer.disconnect();      // no more data — stop observing\n    }\n  }\n});\n\nobserver.observe(sentinel);"
    },

    {
      "type": "code",
      "filename": "infinite-scroll-api.js",
      "text": "// ── Backend: Express API route ────────────────────────────────\napp.get('/api/posts', async (req, res) => {\n  const limit  = parseInt(req.query.limit) || 20;\n  const cursor = req.query.cursor;           // last _id from client\n\n  const query = cursor\n    ? { _id: { $gt: new ObjectId(cursor) } } // documents AFTER cursor\n    : {};                                     // no cursor = first page\n\n  const posts = await db.collection('posts')\n    .find(query)\n    .sort({ _id: 1 })\n    .limit(limit)\n    .toArray();\n\n  const nextCursor = posts.length === limit\n    ? posts[posts.length - 1]._id.toString() // more pages exist\n    : null;                                   // last page reached\n\n  res.json({ posts, nextCursor });\n});"
    },

    {
      "type": "paragraph",
      "parts": [
        "The key rule: if the number of returned documents equals the requested ",
        { "code": "limit" },
        ", there are likely more pages. If it returns fewer, you have reached the end and should set ",
        { "code": "nextCursor: null" },
        " and stop further requests."
      ]
    }
  ]
},

{
  "id": "infinite-scroll-notes",
  "type": "notes",
  "label": "Infinite Scroll — Notes",
  "heading": "Important Concepts for Infinite Scroll",
  "blocks": [
    {
      "type": "list",
      "items": [
        "Always sort on an indexed field (_id, createdAt) — without an index, each paginated query becomes a full collection scan.",
        "Never use skip() for infinite scroll — at page 50 with skip(1000), MongoDB scans 1000 documents just to discard them.",
        "Use IntersectionObserver on the frontend instead of scroll event listeners — it is more performant and fires only when the sentinel element enters the viewport.",
        "Guard requests with an isFetching flag to prevent duplicate API calls when the user scrolls rapidly.",
        "Always check if nextCursor is null before making the next request — once null, stop observing or disable the load trigger.",
        "If your data is sorted by createdAt instead of _id, ensure a compound index exists on { createdAt: 1, _id: 1 } to handle ties where two documents share the same timestamp.",
        "Infinite scroll is not suitable when users need to jump to a specific position (e.g., page 47 of results) — use numbered pagination instead.",
        "For real-time feeds (e.g., social media), also handle new documents inserted above the current cursor — track a topCursor alongside lastId."
      ]
    }
  ]
},

{
  "id": "infinite-scroll-workflow",
  "type": "workflow",
  "label": "Infinite Scroll — Request Flow",
  "heading": "Infinite Scroll Execution Flow",
  "blocks": [
    {
      "type": "list",
      "ordered": true,
      "items": [
        "Page loads — client fires initial request with no cursor: GET /api/posts?limit=20",
        "Server runs db.posts.find({}).sort({ _id: 1 }).limit(20) and returns 20 documents + nextCursor",
        "Client renders the 20 posts and stores nextCursor = last _id from the response",
        "User scrolls down — IntersectionObserver detects the sentinel div entering the viewport",
        "Client sets isFetching = true and fires: GET /api/posts?limit=20&cursor=<nextCursor>",
        "Server runs db.posts.find({ _id: { $gt: cursor } }).sort({ _id: 1 }).limit(20)",
        "MongoDB returns the next 20 documents after the cursor point",
        "Client appends new posts to the UI and updates nextCursor to the new last _id",
        "Sets isFetching = false — ready for the next scroll trigger",
        "If response returns fewer than 20 documents OR nextCursor is null — client disconnects the observer and shows 'No more posts' message"
      ]
    }
  ]
},

{
  "id": "infinite-scroll-comparison",
  "type": "comparison",
  "label": "Infinite Scroll vs Traditional Pagination",
  "heading": "Infinite Scroll vs Numbered Pagination",
  "blocks": [
    {
      "type": "table",
      "headers": ["Point", "Infinite Scroll", "Numbered Pagination"],
      "rows": [
        ["User Trigger", "Automatic — fires on scroll", "Manual — user clicks a page number or Next"],
        ["Backend Method", "Cursor-based pagination (_id $gt lastId)", "Offset-based pagination (skip + limit)"],
        ["Performance", "Fast — no skip(), uses indexed cursor", "Degrades at high page numbers due to skip()"],
        ["Arbitrary Jump", "Not possible — cannot jump to page 50", "Supported — user can click any page number"],
        ["Best For", "Feeds, social media, product listings", "Search results, admin tables, reports"],
        ["End Detection", "nextCursor === null or result < limit", "currentPage === totalPages"],
        ["UX Feel", "Seamless and continuous", "Structured and navigable"],
        ["Real-time Data", "Handles well with topCursor tracking", "Prone to duplicates or missing items on data changes"]
      ]
    }
  ]
},

{
  "id": "infinite-scroll-diagram",
  "type": "diagram",
  "label": "Infinite Scroll — Diagram",
  "heading": "Infinite Scroll Architecture",
  "blocks": [
    {
      "type": "diagram",
      "text": "[ Browser Viewport ]\n        |\n        | user scrolls down\n        v\n[ Sentinel DIV enters viewport ]\n        |\n        | IntersectionObserver fires\n        v\n[ Frontend: isFetching = true ]\n        |\n        | GET /api/posts?limit=20&cursor=<lastId>\n        v\n[ Express API Route ]\n        |\n        | build query: { _id: { $gt: lastId } }\n        v\n[ MongoDB: find().sort({ _id:1 }).limit(20) ]\n        |\n        | returns 20 documents\n        v\n[ API: extract nextCursor = last doc _id ]\n        |\n        | { posts: [...], nextCursor: '64f...' }\n        v\n[ Frontend: append posts to UI ]\n        |\n        | update lastId = nextCursor\n        | isFetching = false\n        v\n[ If nextCursor === null ] ---> [ Disconnect Observer — End of Feed ]"
    }
  ]
},

    {
      "id": "terms",
      "type": "terminology",
      "label": "Terminology / Key Definitions",
      "heading": "Key Definitions",
      "blocks": [
        {
          "type": "definitions",
          "items": [
            {
              "term": "sort()",
              "definition": "A MongoDB cursor method that orders returned documents based on one or more fields. Accepts 1 for ascending and -1 for descending.",
              "code": ".sort({ field: 1 })"
            },
            {
              "term": "limit()",
              "definition": "A cursor method that caps the maximum number of documents returned by a query. Essential for performance and paginated UIs.",
              "code": ".limit(10)"
            },
            {
              "term": "skip()",
              "definition": "A cursor method that skips over a given number of documents before returning results. Used in offset-based pagination.",
              "code": ".skip(20)"
            },
            {
              "term": "Cursor",
              "definition": "A pointer to the result set of a query. MongoDB returns a cursor object which can be iterated to retrieve documents one by one.",
              "code": "const cursor = db.users.find();"
            },
            {
              "term": "Offset Pagination",
              "definition": "A pagination strategy using skip() and limit() to jump to a specific page. Simple but inefficient for large datasets.",
              "code": ".skip((page - 1) * limit).limit(limit)"
            },
            {
              "term": "Cursor-based Pagination",
              "definition": "A pagination strategy that uses the last seen document's unique field (like _id) as a reference point instead of numeric offsets. Preferred for large or real-time datasets.",
              "code": "{ _id: { $gt: lastId } }"
            },
            {
              "term": "$gt",
              "definition": "A MongoDB comparison query operator meaning 'greater than'. Used in cursor-based pagination to fetch documents after the last seen cursor.",
              "code": "{ _id: { $gt: lastId } }"
            },
            {
              "term": "Infinite Scroll",
              "definition": "A UI pattern where more content is automatically loaded as the user scrolls down. Typically backed by cursor-based pagination on the server side."
            }
          ]
        }
      ]
    },

    {
      "id": "notes",
      "type": "notes",
      "label": "Notes",
      "heading": "Important Concepts",
      "blocks": [
        {
          "type": "list",
          "items": [
            "sort() must be applied before limit() and skip() in the logical query chain, though MongoDB optimizes the execution order internally.",
            "skip() performance degrades on large collections because MongoDB must scan and discard all skipped documents — avoid large skip values in production.",
            "Always sort on an indexed field when using cursor-based pagination to ensure consistent and fast results.",
            "Cursor-based pagination cannot easily support jumping to an arbitrary page number — it is best suited for 'next page' / 'load more' flows.",
            "When using skip() + limit() for pagination, the total page count requires a separate countDocuments() call.",
            "Combining sort(), skip(), and limit() in the wrong order in application code can cause unexpected results — always chain them on the query itself.",
            "_id is always a safe cursor field since it is unique, indexed by default, and monotonically increasing (for ObjectId).",
            "Infinite scroll and cursor pagination are preferred for APIs serving mobile or real-time applications where data changes frequently."
          ]
        }
      ]
    },

    {
      "id": "comparison",
      "type": "comparison",
      "label": "Differentiate / Comparison",
      "heading": "Offset Pagination vs Cursor-based Pagination",
      "blocks": [
        {
          "type": "table",
          "headers": ["Point", "Offset Pagination (skip + limit)", "Cursor-based Pagination"],
          "rows": [
            ["Mechanism", "Uses skip(n) to jump to a page offset", "Uses last document's _id or field as reference"],
            ["Performance", "Slows down significantly on large datasets", "Consistently fast regardless of dataset size"],
            ["Arbitrary Page Jump", "Supported — can jump to any page number", "Not supported — only next/previous navigation"],
            ["Consistency", "May show duplicate or missing items if data changes mid-pagination", "Stable — always fetches from the correct cursor point"],
            ["Use Case", "Admin panels, small datasets, numbered page UIs", "APIs, infinite scroll, large or real-time collections"],
            ["Complexity", "Simple to implement", "Slightly more complex — requires tracking last cursor value"],
            ["Total Count", "Easy with countDocuments()", "Requires separate query; not always needed"],
            ["Recommended For", "Small collections with infrequent changes", "Production APIs and high-volume collections"]
          ]
        }
      ]
    },

    {
      "id": "workflow",
      "type": "workflow",
      "label": "Workflow / Request Flow",
      "heading": "Cursor-based Pagination Request Flow",
      "blocks": [
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Client sends initial request with no cursor — e.g. GET /users?limit=10",
            "Server queries MongoDB: db.users.find().sort({ _id: 1 }).limit(10)",
            "MongoDB returns the first 10 documents sorted by _id ascending",
            "Server extracts the _id of the last document in the result set as the next cursor",
            "Server responds with the documents and the nextCursor value — e.g. { data: [...], nextCursor: '64f1a2b3...' }",
            "Client stores the nextCursor and sends the next request — e.g. GET /users?limit=10&cursor=64f1a2b3...",
            "Server queries MongoDB using the cursor: db.users.find({ _id: { $gt: ObjectId('64f1a2b3...') } }).sort({ _id: 1 }).limit(10)",
            "MongoDB returns the next 10 documents after the cursor point",
            "Steps 4–8 repeat until MongoDB returns fewer documents than the limit, signaling the last page",
            "Server responds with nextCursor: null to indicate no more pages available"
          ]
        }
      ]
    },

    {
      "id": "diagram",
      "type": "diagram",
      "label": "Diagram",
      "heading": "Pagination Strategy Overview",
      "blocks": [
        {
          "type": "diagram",
          "text": "[ Client Request ] --limit + page--> [ Offset Pagination ] --skip((page-1)*limit).limit(n)--> [ MongoDB Collection ] --Documents--> [ Client ]\n\n[ Client Request ] --limit + lastId--> [ Cursor Pagination ] --find({ _id: { $gt: lastId } }).limit(n)--> [ MongoDB Collection ] --Documents + nextCursor--> [ Client ]\n\n[ User Scrolls Down ] --trigger load more--> [ Infinite Scroll Handler ] --cursor request--> [ Cursor Pagination ] --next batch--> [ Append to UI ]"
        }
      ]
    }
  ]
};