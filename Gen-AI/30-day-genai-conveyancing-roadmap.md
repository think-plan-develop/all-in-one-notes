# 30-Day GenAI + Conveyancing Project Roadmap

**Project:** Conveyancing Review & Resolution Workspace  
**Target:** A deployed portfolio MVP with document review, suggested actions, clarification requests and tracked resolution.  
**Pace:** About 3 hours a day for 30 days: roughly 90 hours. Day numbers are sequential study days, not fixed calendar dates.  
**Starting point:** You already know React, Node.js, TypeScript, MongoDB and ordinary API development. Reuse familiar authentication and UI patterns. This is a learning-and-build schedule, not a claim that the product has been implemented.

Spend approximately **60 minutes learning, 100 minutes building and 20 minutes checking your work** each day. The final check is part of the day's work. On integration days, use more of the learning block for debugging and consolidation.

## The product you are building

A purchaser uploads transaction documents. The system extracts information, identifies possible inconsistencies and suggests next actions. A lawyer checks the evidence, edits or approves a clarification request, reviews the purchaser's response and records the resolution.

The demonstration should follow a concrete issue: the agreement says unit **12-04**, while a supporting document says **12-40**. The software displays both sources. The lawyer decides whether to raise a query. A corrected upload becomes a new version, and the lawyer reviews it before closing the issue.

### First-release scope

- One law firm, with purchaser and lawyer workflows. Seed users and assignments; a full administration console can follow later.
- Three synthetic document types: purchase agreement, property details sheet and purchaser information form.
- Readable PDF uploads, immutable versions and private downloads.
- Field extraction with evidence, human corrections and document consistency findings.
- Missing-document recommendations using a configured checklist.
- Editable suggested actions and clarification drafts approved by the lawyer.
- Purchaser responses, revised uploads and resolution tracking.
- Case questions with citations to eligible document versions and pages.
- A small approved-template library for clause comparison.
- Read-only AI tools for live case facts, a lawyer worklist, and purchaser guidance.
- Audit history, a basic review record export, evaluation results and an authenticated deployed demo.

Use synthetic transactions and synthetic templates throughout. Required documents, deadlines and acceptable templates are configured demo rules; they do not assert a country's legal requirements.

### Responsibilities

| Owner | Responsibilities |
|---|---|
| AI | Extract candidate information, summarize evidence, explain recorded findings, draft clarification text and answer supported questions. |
| Node.js business logic | Enforce authorization, validate inputs/outputs, calculate required-document gaps, determine allowed actions, compare corresponding fields and enforce state transitions. |
| Lawyer | Verify fields and evidence, confirm or dismiss findings, approve outgoing requests, accept revisions and resolve issues. |

A suggestion is a draft. It never becomes a sent request or review approval merely because the model generated it. A document's processing success is separate from the lawyer's acceptance.

## Tools and technical scope

| Area | Choice |
|---|---|
| Frontend | React + TypeScript; use familiar routing, forms and styling. |
| Backend | Node.js + Express + TypeScript. |
| AI calls | Vercel AI SDK with one supported model provider; keep provider credentials on the server. Choose one text model and one embedding model that meet the required capabilities. |
| Validation | Zod for API requests, model output schemas and tool arguments. |
| Data and retrieval | MongoDB for application records and MongoDB Vector Search for document retrieval. |
| Documents | One PDF text parser with page-level output; private local storage during development and private persistent storage for deployment. |
| Background jobs | BullMQ + Redis; run the worker separately from the API. |
| Verification | Your familiar test runner for deterministic behavior, plus labeled fixtures and a small evaluation script for AI behavior. |
| Deployment | An environment that supports the web app, Node API, background worker, streaming and persistent private files. Verify service limits and costs before provisioning. |

Python, fine-tuning and an orchestration framework are not prerequisites for this release. Learn the underlying model, retrieval and tool-call flows first.

## Milestones

| By day | Demonstrable result |
|---|---|
| 7 | A private upload can be parsed and processed asynchronously into structured candidate fields. |
| 14 | The full review, suggested action, clarification and resolution workflow works locally. |
| 21 | Case questions return source-linked answers, clause comparison works on a small library, and a development evaluation report exists. |
| 27 | Read-only tools, next-action guidance, dashboards and the complete workflow pass targeted checks. |
| 30 | An authenticated demo, held-out evaluation results and a reproducible README are available. |

## Daily roadmap

### Day 1 — Define the product and understand GenAI

**Learn these subtopics**

- [ ] AI, ML, GenAI and LLMs: what each term means.
- [ ] Training versus inference; tokens, context windows and hallucinations.
- [ ] Which decisions belong to business rules, AI suggestions and the lawyer.
- [ ] The case lifecycle: upload, review, clarify, revise and resolve.

**Build in the project**

- [ ] Set up one repository with React + TypeScript and Express + TypeScript; add a health endpoint and environment-variable example.
- [ ] Write the role matrix and three document types. Prepare three synthetic cases with expected names, property IDs, amounts and dates; reserve another case for final evaluation.

**Done when:** Both apps start locally. You can explain the full case workflow and show the expected answers for your sample documents.

**Reference:** [AI SDK introduction](https://ai-sdk.dev/docs/introduction).

### Day 2 — Make the first model call from Node.js

**Learn these subtopics**

- [ ] Provider APIs, model selection and server-side credentials.
- [ ] System instructions, user input and context.
- [ ] Input/output token usage; quality, latency and cost trade-offs.
- [ ] Timeouts and basic error handling.

**Build in the project**

- [ ] Connect one model provider using the AI SDK and create a server-only summarization endpoint.
- [ ] Submit a synthetic agreement excerpt and return a short summary; record model ID, duration and token usage when provided.

**Done when:** React receives a summary through Express, credentials stay on the server, and a failed model request displays a useful error.

**Reference:** [AI SDK text generation](https://ai-sdk.dev/docs/ai-sdk-core/generating-text).

### Day 3 — Prompting and structured extraction

**Learn these subtopics**

- [ ] Clear instructions and zero-shot versus few-shot prompting.
- [ ] JSON schemas and Zod validation.
- [ ] Missing information: null versus invented values.
- [ ] Schema-valid output versus factually correct output.

**Build in the project**

- [ ] Define a small extraction schema for purchaser name, property ID, unit number, purchase price with currency, and completion date.
- [ ] Extract fields from a sample excerpt with supporting quotes. Return null when evidence is missing; reject structurally invalid output.

**Done when:** An excerpt with no completion date produces null. A valid JSON response is still checked against the source facts.

**Reference:** [AI SDK structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data).

### Day 4 — Cases, roles and permission boundaries

**Learn these subtopics**

- [ ] Application authorization versus instructions in a prompt.
- [ ] Case membership and document visibility.
- [ ] How user data reaches an LLM and why scope matters.
- [ ] Data modeling for documents, findings and review actions.

**Build in the project**

- [ ] Reuse a familiar authentication pattern and seed purchaser and lawyer accounts; implement case creation and assignment.
- [ ] Create the initial collections for users, cases, documents, document versions, findings, requests and audit events. Enforce case access on the server.

**Done when:** A purchaser can open their case, but cannot read another purchaser's case or invoke a lawyer-only operation.

### Day 5 — Private uploads and document versions

**Learn these subtopics**

- [ ] Source identity: case, document and version identifiers.
- [ ] Why a model response must refer to an exact document version.
- [ ] File constraints and untrusted uploads.
- [ ] Document state versus AI processing state.

**Build in the project**

- [ ] Build the upload list with size/type limits and private file access. Store each upload as an immutable document version.
- [ ] Introduce processing states queued, processing, ready and failed; review states remain separate. Expose a current-version pointer.

**Done when:** Uploading a replacement preserves the original file. A document is not automatically accepted when AI processing finishes.

### Day 6 — Extract PDF text with page references

**Learn these subtopics**

- [ ] Selectable PDF text versus scanned images.
- [ ] OCR purpose and common extraction errors.
- [ ] Page-level provenance and searchable text.
- [ ] Empty, corrupt, encrypted and oversized inputs.

**Build in the project**

- [ ] Use one PDF parser to extract text page by page and save page numbers with each version.
- [ ] Support readable PDFs first. Detect scans or insufficient text and mark them as needing a readable replacement; document the later OCR extension.

**Done when:** A source quote opens the correct page. A scan produces an actionable state instead of a fabricated extraction.

### Day 7 — Background processing and ingestion checkpoint

**Learn these subtopics**

- [ ] Queue, producer and worker responsibilities.
- [ ] Retries, exponential backoff and bounded concurrency.
- [ ] Idempotent jobs and duplicate delivery.
- [ ] Separating a document-processing failure from a case-review decision.

**Build in the project**

- [ ] Move PDF parsing and extraction into BullMQ jobs with Redis. Use document version plus pipeline version as the logical deduplication key.
- [ ] Show processing progress and a retry action. Integrate the Day 3 extractor with stored page text; use remaining time to fix Days 1–6 issues.

**Done when:** Uploading does not wait for model completion. Retrying the same job does not create duplicate results or erase reviewed corrections.

**Reference:** [BullMQ retries](https://docs.bullmq.io/guide/retrying-failing-jobs).

### Day 8 — Document classification and extraction quality

**Learn these subtopics**

- [ ] Classification with an explicit unknown type.
- [ ] Document-specific extraction instructions.
- [ ] Date, currency and identifier normalization.
- [ ] Small labeled evaluation sets and field accuracy.

**Build in the project**

- [ ] Support the three chosen document types with type-specific schemas and an unknown/manual-review path.
- [ ] Evaluate extraction against labeled fixture fields. Preserve raw text, normalized value, document version and supporting page for every field.

**Done when:** The system distinguishes purchase price from deposit and flags ambiguous values for review instead of silently choosing.

**Reference:** [AI SDK structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data).

### Day 9 — Lawyer review screen and source evidence

**Learn these subtopics**

- [ ] Human review of model output.
- [ ] Evidence-backed UI and traceability.
- [ ] Why a model's self-reported confidence is not a calibrated probability.
- [ ] Preserving human corrections separately from machine extraction.

**Build in the project**

- [ ] Build a split screen with the document on one side and extracted fields on the other.
- [ ] Add accept/correct actions, supporting-page links and audit records identifying who changed what. Keep raw extraction immutable.

**Done when:** The lawyer can verify and correct a field. Rerunning extraction does not overwrite the reviewed value.

### Day 10 — Missing-document checks and recommendations

**Learn these subtopics**

- [ ] Deterministic checklists versus generated suggestions.
- [ ] Configured requirements versus inferred requirements.
- [ ] Missing, unprocessed and rejected documents as different states.
- [ ] Writing actionable explanations from known facts.

**Build in the project**

- [ ] Configure the three required document types for the demo transaction and calculate missing-document findings in Node.js.
- [ ] Generate a concise explanation and proposed upload request from those findings. Keep the configured checklist as the source of requirements.

**Done when:** A processing failure is not presented as an absent document, and the model cannot invent a new mandatory document type.

### Day 11 — Cross-document consistency review

**Learn these subtopics**

- [ ] Comparing corresponding fields with the same business meaning.
- [ ] Normalization, exact matching and ambiguous near matches.
- [ ] Precision versus recall in mismatch detection.
- [ ] Potential finding versus confirmed issue.

**Build in the project**

- [ ] Compare purchaser and property details across documents, preserving both source values and their pages.
- [ ] Use normalized extraction to propose findings; allow the lawyer to confirm or dismiss them. Avoid claiming the system knows which conflicting source is correct.

**Done when:** The unit-number mismatch 12-04 versus 12-40 is shown with both sources, while a deposit is never compared to the total purchase price.

### Day 12 — Suggested actions and clarification drafts

**Learn these subtopics**

- [ ] Structured recommendations: issue, evidence, proposed action and recipient role.
- [ ] Prompting with verified case facts.
- [ ] Grounded drafting and unsupported requests.
- [ ] Draft, approved and dismissed suggestion states.

**Build in the project**

- [ ] For a confirmed issue, generate a suggested action and editable clarification request.
- [ ] Add approve, edit and dismiss controls. Keep sending and task creation as explicit lawyer actions after server validation.

**Done when:** The draft references the correct document and issue; merely generating it does not send a message or change the review decision.

**Reference:** [AI SDK structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data).

### Day 13 — Purchaser responses and issue resolution

**Learn these subtopics**

- [ ] Human approval checkpoints in an AI-assisted workflow.
- [ ] State machines and allowed transitions.
- [ ] Clear purchaser guidance based on approved requests.
- [ ] Audit events and action ownership.

**Build in the project**

- [ ] Implement a clarification flow: draft, sent, responded, under review and resolved. Add purchaser replies and replacement uploads.
- [ ] Build the purchaser task screen and in-app notifications. Only the lawyer can resolve an issue after review.

**Done when:** A purchaser can respond but cannot approve their own correction. An unrelated user cannot view the request or its attachments.

### Day 14 — Revisions and the first complete workflow

**Learn these subtopics**

- [ ] Stale AI output and stale review decisions.
- [ ] Version-aware comparisons and superseded findings.
- [ ] Re-review after relevant evidence changes.
- [ ] Integration checks using realistic exception scenarios.

**Build in the project**

- [ ] Reprocess replacement documents and preserve links to prior versions, findings and replies.
- [ ] Run the complete mismatch scenario from upload through lawyer-approved resolution. Add a basic review record export and use remaining time for catch-up.

**Done when:** A previously accepted version does not silently approve its replacement. The completed scenario retains a readable audit trail.

### Day 15 — RAG and document chunking

**Learn these subtopics**

- [ ] RAG: retrieve evidence before generating an answer.
- [ ] Chunk size, overlap and heading-aware splitting.
- [ ] Metadata: case, document, version, page and visibility.
- [ ] Why ingestion and question answering are separate workflows.

**Build in the project**

- [ ] Create chunks from the extracted page text with stable IDs and source metadata.
- [ ] Keep internal lawyer notes separate from purchaser-visible documents and record which document versions are active.

**Done when:** Every chunk can be traced back to a page and version, and chunk preparation preserves authorization metadata.

**Reference:** [MongoDB RAG](https://www.mongodb.com/docs/vector-search/tutorials/rag/).

### Day 16 — Embeddings and vector storage

**Learn these subtopics**

- [ ] Embeddings as numerical representations of meaning.
- [ ] Similarity search and vector dimensions.
- [ ] Choosing one embedding model and keeping indexing/query models consistent.
- [ ] Batching, reuse and embedding cost.

**Build in the project**

- [ ] Embed the stored chunks and create a MongoDB Vector Search index with the metadata filters your retrieval needs.
- [ ] Store the embedding model identifier. Reuse embeddings for unchanged text while preserving separate case and visibility records.

**Done when:** A semantic query retrieves a relevant passage even when wording differs. Mixing incompatible embedding dimensions is prevented.

**Reference:** [MongoDB RAG](https://www.mongodb.com/docs/vector-search/tutorials/rag/).

### Day 17 — Retrieval with permissions

**Learn these subtopics**

- [ ] Top-k retrieval and relevance.
- [ ] Metadata prefilters and server-derived access scope.
- [ ] Retrieval evaluation before answer generation.
- [ ] Active versions, deleted documents and stale search results.

**Build in the project**

- [ ] Derive allowed cases and document visibility from the authenticated user; apply that scope to retrieval before text enters the prompt.
- [ ] Retrieve only eligible current versions. Log returned source IDs for development and verify ownership again before returning source links.

**Done when:** A purchaser question cannot retrieve another case or an internal lawyer note, even if the question contains a guessed document ID.

**Reference:** [MongoDB RAG](https://www.mongodb.com/docs/vector-search/tutorials/rag/).

### Day 18 — Grounded answers with citations

**Learn these subtopics**

- [ ] Building prompts from retrieved passages.
- [ ] Citation identifiers and source-page references.
- [ ] Abstaining when evidence is insufficient.
- [ ] Evidence existence versus evidence actually supporting a claim.

**Build in the project**

- [ ] Add a case-question endpoint that answers using retrieved material and returns citations to specific document versions/pages.
- [ ] Validate citation IDs against retrieved sources and provide an explicit insufficient-evidence response. Manually inspect whether answers are supported.

**Done when:** A question with a known answer cites the right passage. An unanswerable question does not invent a date, clause or case fact.

**Reference:** [MongoDB RAG](https://www.mongodb.com/docs/vector-search/tutorials/rag/).

### Day 19 — Streaming and the React question panel

**Learn these subtopics**

- [ ] Streaming responses and partial output.
- [ ] Cancellation with AbortController.
- [ ] Conversation context and token budgets.
- [ ] Safe display of generated Markdown and errors.

**Build in the project**

- [ ] Add a streaming question panel inside the case workspace with source links, loading, stop and retry controls.
- [ ] Limit conversation context and handle stream failure. Perform authorization before streaming any document content.

**Done when:** The user can stop generation, recover from a failed stream and open cited pages without seeing incomplete JSON as final data.

**Reference:** [AI SDK text generation](https://ai-sdk.dev/docs/ai-sdk-core/generating-text).

### Day 20 — Clause comparison against approved templates

**Learn these subtopics**

- [ ] A versioned reference library and retrieval scope.
- [ ] Extracting corresponding clauses and preserving quotations.
- [ ] Differences versus legal validity.
- [ ] Small structured outputs for comparison results.

**Build in the project**

- [ ] Seed a small library of three synthetic, firm-approved clause templates and show document text beside the matching template.
- [ ] Generate a difference summary with source references. Allow a lawyer to accept, dismiss or turn it into a review issue.

**Done when:** A changed date or obligation is highlighted accurately; if no relevant template exists, the system requests manual review.

**Reference:** [AI SDK structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data).

### Day 21 — Evaluate RAG and improve one weakness

**Learn these subtopics**

- [ ] Retrieval hit rate/recall at k on a labeled set.
- [ ] Answer correctness, citation support and abstention.
- [ ] Development questions versus held-out evaluation questions.
- [ ] Prompt/model versioning and controlled comparisons.

**Build in the project**

- [ ] Write 20 development questions covering answerable, missing-evidence, outdated-version and inaccessible-source scenarios.
- [ ] Score retrieval and answers; change one factor such as chunk size or prompt wording, then compare. Use remaining time to fix integration issues.

**Done when:** You have a reproducible report showing actual results, denominators and failure examples, with the final held-out case still unused.

### Day 22 — Tool calling for live case information

**Learn these subtopics**

- [ ] Tool name, description and input schema.
- [ ] Model requests a tool; the server executes it.
- [ ] Runtime validation and per-call authorization.
- [ ] Tool results versus model-generated assertions.

**Build in the project**

- [ ] Expose three read-only tools: getCaseStatus, listMissingDocuments and listOpenIssues.
- [ ] Derive the case context on the server, validate arguments and cap the workflow at two tool-execution rounds plus a final answer.

**Done when:** The assistant reports current issues from stored records; a forged case ID is rejected and a tool failure is shown clearly.

**Reference:** [AI SDK tool calling](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling).

### Day 23 — Next-action recommendations with approval

**Learn these subtopics**

- [ ] Fixed workflows versus autonomous agent loops.
- [ ] Business-rule eligibility and task dependencies.
- [ ] Human approval before state-changing operations.
- [ ] Revalidating a suggestion when the case changes.

**Build in the project**

- [ ] Calculate eligible next actions in Node.js and let the model explain those actions in plain language.
- [ ] Attach explicit buttons for lawyer-approved requests or review assignments. Recheck permissions and current case state when a button is used.

**Done when:** The assistant cannot close a case or send a request on its own. A stale recommendation cannot bypass a changed case condition.

**Reference:** [AI SDK tool calling](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling).

### Day 24 — Lawyer worklist and purchaser guidance

**Learn these subtopics**

- [ ] Summarizing live structured data with source references.
- [ ] Configured priority rules versus subjective model scoring.
- [ ] Audience-specific explanations and visibility.
- [ ] Briefs that distinguish facts, open questions and proposed actions.

**Build in the project**

- [ ] Build the lawyer dashboard ordered by configured due dates and unresolved work; add a concise case brief.
- [ ] Improve purchaser guidance using approved requests and visible case milestones. Reuse the in-app notification flow.

**Done when:** Lawyer and purchaser views explain the same case appropriately, and purchaser output contains no private lawyer notes.

### Day 25 — Prompt injection and access-control checks

**Learn these subtopics**

- [ ] Untrusted document instructions and prompt injection.
- [ ] Least-privilege retrieval/tools and server enforcement.
- [ ] Output validation and safe rendering.
- [ ] Sensitive data in prompts, logs and exports.

**Build in the project**

- [ ] Add fixtures with malicious instructions embedded in a document and requests to reveal another case.
- [ ] Check every source download, retrieval query, tool call and export for authorization; sanitize rendered content and redact logs.

**Done when:** The targeted tests do not leak other cases, execute document instructions or perform unapproved actions. Record limitations rather than claiming complete protection.

### Day 26 — Reliability and usage controls

**Learn these subtopics**

- [ ] Timeouts, transient failures and bounded retries.
- [ ] Token budgets and model-call accounting.
- [ ] Version-aware caching and invalidation.
- [ ] Observability: model/prompt versions, latency, failures and usage.

**Build in the project**

- [ ] Add application request quotas, output limits and cost estimates based on provider usage; use a shared gate for new calls.
- [ ] Key cached results by case/visibility, document versions, model and prompt. Expose failure states and record retries without storing sensitive document text in general logs.

**Done when:** A timeout does not leave the UI stuck; a quota blocks new app requests; changed documents invalidate related cached answers. Concurrent in-flight usage is accounted for.

**Reference:** [BullMQ retries](https://docs.bullmq.io/guide/retrying-failing-jobs).

### Day 27 — End-to-end behavior and concurrent review

**Learn these subtopics**

- [ ] Deterministic application tests versus variable model evaluations.
- [ ] Mocked provider responses and a small real-provider smoke test.
- [ ] Optimistic concurrency and version-bound decisions.
- [ ] Regression checks for previously fixed AI failures.

**Build in the project**

- [ ] Test upload, extraction, confirmed finding, draft approval, purchaser response, replacement review and issue resolution.
- [ ] Test simultaneous review edits, duplicate jobs and unauthorized actions. Ensure stale approvals fail rather than overwriting newer decisions.

**Done when:** The core workflow passes meaningful automated checks, and a small real-model run confirms the actual integration still works.

### Day 28 — Deploy the complete demo

**Learn these subtopics**

- [ ] Frontend, API and background-worker deployment responsibilities.
- [ ] Private persistent storage and secret management.
- [ ] Streaming support, worker uptime and operational logs.
- [ ] Environment configuration and authenticated demo access.

**Build in the project**

- [ ] Deploy the React app, Express API and BullMQ worker with MongoDB, Redis and private persistent document storage.
- [ ] Configure environment variables, HTTPS, allowed origins and authenticated demo users. Seed synthetic cases and verify the entire deployed workflow.

**Done when:** A fresh browser session can complete the demo, and app/worker restarts do not lose documents or accepted review history.

### Day 29 — Evaluate with unseen data

**Learn these subtopics**

- [ ] Held-out evaluation and avoiding test-set tuning.
- [ ] Field extraction accuracy and mismatch precision/recall.
- [ ] Supported-answer rate, correct abstention and citation quality.
- [ ] Observed latency and per-case/model-call cost.

**Build in the project**

- [ ] Use the reserved synthetic case and create 10 previously unused questions. Include missing evidence and a realistic document revision.
- [ ] Run extraction, mismatch checks and question answering; publish actual counts, metrics and limitations. Fix critical errors and clearly label any reruns after tuning.

**Done when:** The report separates development results from held-out results and makes no unsupported accuracy or production-readiness claim.

### Day 30 — Finish, document and demonstrate

**Learn these subtopics**

- [ ] Explaining RAG, structured extraction and tool calling in business terms.
- [ ] Documenting failure modes and human-review boundaries.
- [ ] Selecting evidence of useful project outcomes.
- [ ] Planning extensions from observed limitations.

**Build in the project**

- [ ] Use the day as a bug-fix buffer, polish the main screens, and write setup instructions plus a short architecture explanation.
- [ ] Record a 5-minute demo: upload conflicting documents, review a finding, approve a request, upload a correction, resolve the issue and ask a cited question. Include evaluation results.

**Done when:** The repository, running demo, sample data and README let another developer reproduce the workflow; known limitations and the next improvements are documented.

## Evaluation and completion checks

Use a small, manually verified reference set. Create the development examples early, then keep the fourth synthetic case separate until Day 29.

| What to measure | How to check it |
|---|---|
| Field extraction | Correct extracted values divided by labeled fields; report missing/ambiguous fields separately. |
| Mismatch detection | Report true findings, false alarms and missed known mismatches; compute precision and recall from those counts. |
| Retrieval | Check whether the relevant eligible source passage appears in the returned top-k results. |
| Answers | Judge correctness and whether each substantive claim is supported by the cited passage. |
| Abstention | Check whether the app appropriately declines to answer questions without sufficient evidence. |
| Citations | Verify source ownership, document version, page and actual support for the answer. |
| Authorization | Test other-case IDs, private notes, source downloads, tools and exports. |
| Operations | Record observed duration, failed calls, retry behavior, tokens and estimated cost. |

Report results on the actual small sample with denominators and examples. Development scores are for tuning. Held-out results must remain separate; if you tune on a held-out failure, label the rerun accordingly.

### Day 30 acceptance checklist

- [ ] A purchaser can access only their assigned case and permitted documents.
- [ ] A lawyer can review extracted fields with source evidence.
- [ ] Missing-document rules and potential cross-document mismatches are visible.
- [ ] A lawyer can edit and approve a clarification; generation alone sends nothing.
- [ ] A purchaser can respond and upload a new version.
- [ ] A relevant new version requires re-review, preserves history and invalidates stale outputs.
- [ ] The lawyer can resolve issues and export the review record.
- [ ] Case questions include valid source references or an insufficient-evidence response.
- [ ] Read-only tools obey server-side permissions and bounded execution.
- [ ] The worklist and purchaser guidance follow stored case facts and configured rules.
- [ ] The deployed application and worker retain data across restarts.
- [ ] The README includes setup, sample data, architecture, real evaluation results and known limitations.

## Scope protection and follow-on work

The core outcome is the complete review-and-resolution flow, including recommendations and approval. If a day overruns, use the catch-up time on Days 7, 14 and 21 and the Day 30 finishing buffer. Keep access control, evidence links, version handling and human approval in the first release.

If further scope reduction is needed, defer clause-library comparison, streaming polish and tool calling before weakening the core workflow. Keep their learning sessions as small isolated exercises and label them as not integrated.

After the 30-day release, extend based on measured failures:

1. OCR for scanned PDFs, with page evidence and manual correction of uncertain extraction.
2. Seller-side and second-law-firm collaboration, with explicit sharing permissions.
3. Hybrid keyword/vector retrieval and reranking when evaluation shows a retrieval problem.
4. Signing-provider and external-identity sandbox integrations.
5. More document types and a managed template/checklist editor.
6. MCP or an orchestration framework when real integration or workflow complexity justifies it.

## Official learning references

- [AI SDK introduction](https://ai-sdk.dev/docs/introduction)
- [AI SDK text generation](https://ai-sdk.dev/docs/ai-sdk-core/generating-text)
- [AI SDK structured data](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data)
- [AI SDK tool calling](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling)
- [MongoDB RAG](https://www.mongodb.com/docs/vector-search/tutorials/rag/)
- [BullMQ retries](https://docs.bullmq.io/guide/retrying-failing-jobs)

These references explain the tool capabilities. The daily order, scope and checkpoints above are a proposed curriculum tailored to the agreed project. Use the documentation matching your installed package versions.

