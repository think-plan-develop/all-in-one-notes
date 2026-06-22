(function () {
    const contentTypeClasses = {
        "introduction": "type-introduction",
        "notes": "type-notes",
        "terminology": "type-terminology",
        "diagram": "type-diagram",
        "workflow": "type-workflow",
        "code-snippet": "type-code",
        "explanation": "type-explanation",
        "comparison": "type-comparison",
        "use-cases": "type-use-cases",
        "best-practices": "type-best-practices",
        "common-mistakes": "type-common-mistakes",
        "debugging-tips": "type-debugging-tips",
        "interview-questions": "type-interview",
        "qa-section": "type-qa",
        "summary": "type-summary",
        "highlight-box": "type-highlight",
        "warning-box": "type-warning",
        "tip-box": "type-tip",
        "info-card": "type-info",
        "timeline": "type-timeline",
        "checklist": "type-checklist",
        "table-section": "type-table",
        "accordion": "type-accordion",
        "quote": "type-quote",
        "step-by-step": "type-steps"
    };

    const page = document.getElementById("page");
    const jsonPath = document.body.dataset.json;

    function createElement(tagName, className, text) {
        const element = document.createElement(tagName);

        if (className) {
            element.className = className;
        }

        if (text) {
            element.textContent = text;
        }

        return element;
    }

    function appendInlineText(parent, parts) {
        parts.forEach((part) => {
            if (typeof part === "string") {
                parent.append(document.createTextNode(part));
                return;
            }

            if (part.code) {
                parent.append(createElement("code", "", part.code));
            }
        });
    }

    function renderList(block) {
        const list = document.createElement(block.ordered ? "ol" : "ul");

        block.items.forEach((item) => {
            list.append(createElement("li", "", item));
        });

        return list;
    }

   function renderDefinitions(block) {
    const list = createElement("dl", "definition-list");

  block.items.forEach((item) => {
    const dt = createElement("dt", "", item.term);
    const dd = createElement("dd");

    if (item.definition) {
        const text = createElement("div", "definition-text", item.definition);
        dd.append(text);
    }

    if (item.code) {
        const pre = createElement("pre", "code-block");
        pre.innerHTML = highlightCode(item.code);
        dd.append(pre);
    }

    list.append(dt);
    list.append(dd);
});

return list;
   }

    function renderTable(block) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const tbody = document.createElement("tbody");

        block.headers.forEach((header) => {
            headerRow.append(createElement("th", "", header));
        });

        block.rows.forEach((row) => {
            const tableRow = document.createElement("tr");

            row.forEach((cell) => {
                tableRow.append(createElement("td", "", cell));
            });

            tbody.append(tableRow);
        });

        thead.append(headerRow);
        table.append(thead, tbody);

        return table;
    }

    function renderQa(block) {
        const fragment = document.createDocumentFragment();

        block.items.forEach((item) => {
            const card = createElement("div", "qa-card");
            card.append(createElement("h3", "", item.question));
            card.append(createElement("p", "", item.answer));
            fragment.append(card);
        });

        return fragment;
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    function highlightCode(text) {
        const tokenPattern = /(--.*$|\/\/.*$|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b(?:SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|ON|GROUP|BY|ORDER|HAVING|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|ALTER|DROP|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|NOT|NULL|UNIQUE|DEFAULT|INDEX|AND|OR|AS|IN|IS|INT|VARCHAR|DATE|TEXT|BOOLEAN|const|let|var|function|return|if|else|for|while|class|new|await|async|import|from|export|try|catch|throw)\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*(?=\s*\())/gim;

        return String(text).replace(tokenPattern, (match) => {
            const escaped = escapeHtml(match);

            if (/^(--|\/\/|\/\*)/.test(match)) {
                return `<span class="tok-comment">${escaped}</span>`;
            }

            if (/^['"`]/.test(match)) {
                return `<span class="tok-string">${escaped}</span>`;
            }

            if (/^\d/.test(match)) {
                return `<span class="tok-number">${escaped}</span>`;
            }

            if (/^(true|false|null|undefined)$/i.test(match)) {
                return `<span class="tok-literal">${escaped}</span>`;
            }

            if (/^(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|ON|GROUP|BY|ORDER|HAVING|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|ALTER|DROP|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|NOT|NULL|UNIQUE|DEFAULT|INDEX|AND|OR|AS|IN|IS|INT|VARCHAR|DATE|TEXT|BOOLEAN|const|let|var|function|return|if|else|for|while|class|new|await|async|import|from|export|try|catch|throw)$/i.test(match)) {
                return `<span class="tok-keyword">${escaped}</span>`;
            }

            return `<span class="tok-function">${escaped}</span>`;
        });
    }

    function renderTextBox(block) {
        const box = createElement("div", block.variant || "note");

        if (block.title) {
            box.append(createElement("strong", "", block.title));
        }

        if (block.text) {
            box.append(createElement("p", "", block.text));
        }

        return box;
    }

    function renderInfoCard(block) {
        const card = createElement("div", "info-card");

        if (block.title) {
            card.append(createElement("h3", "", block.title));
        }

        if (block.text) {
            card.append(createElement("p", "", block.text));
        }

        return card;
    }

    function renderTimeline(block) {
        const timeline = createElement("div", "timeline");

        block.items.forEach((item) => {
            const row = createElement("div", "timeline-item");
            row.append(createElement("span", "timeline-marker", item.label));
            const body = createElement("div", "timeline-body");
            body.append(createElement("h3", "", item.title));
            body.append(createElement("p", "", item.text));
            row.append(body);
            timeline.append(row);
        });

        return timeline;
    }

    function renderChecklist(block) {
        const list = createElement("div", "checklist");

        block.items.forEach((item) => {
            list.append(createElement("span", "check-item", item));
        });

        return list;
    }

    function renderAccordion(block) {
        const wrapper = createElement("div", "accordion-list");

        block.items.forEach((item) => {
            const details = document.createElement("details");
            details.className = "accordion-item";
            details.append(createElement("summary", "", item.title));
            details.append(createElement("p", "", item.text));
            wrapper.append(details);
        });

        return wrapper;
    }

    function renderQuote(block) {
        const quote = createElement("blockquote", "quote-box");
        quote.append(createElement("p", "", block.text));

        if (block.source) {
            quote.append(createElement("cite", "", block.source));
        }

        return quote;
    }

    function renderSteps(block) {
        const steps = createElement("div", "steps");

        block.items.forEach((item, index) => {
            const row = createElement("div", "step-item");
            row.append(createElement("span", "step-number", String(index + 1)));
            const body = createElement("div", "step-body");
            body.append(createElement("h3", "", item.title));
            body.append(createElement("p", "", item.text));
            row.append(body);
            steps.append(row);
        });

        return steps;
    }

    function renderBlock(block) {
        if (block.type === "paragraph") {
            const paragraph = document.createElement("p");
            appendInlineText(paragraph, block.parts || [block.text]);
            return paragraph;
        }

        if (block.type === "list") return renderList(block);
        if (block.type === "definitions") return renderDefinitions(block);
        if (block.type === "diagram") return createElement("pre", "diagram-box", block.text);

        if (block.type === "code") {
            const wrap = createElement("div", "code-wrap");
            const bar = createElement("div", "code-bar");
            const dots = createElement("div", "dots");
            const pre = createElement("pre", "code-block");
            const code = document.createElement("code");

            dots.append(createElement("span", "dot-r"));
            dots.append(createElement("span", "dot-y"));
            dots.append(createElement("span", "dot-g"));
            bar.append(dots);
            bar.append(createElement("span", "filename", block.filename || "example.sql"));
            code.innerHTML = highlightCode(block.text);
            pre.append(code);
            wrap.append(bar);
            wrap.append(pre);

            return wrap;
        }

        if (block.type === "table") return renderTable(block);
        if (block.type === "qa") return renderQa(block);
        if (block.type === "text-box") return renderTextBox(block);
        if (block.type === "info-card") return renderInfoCard(block);
        if (block.type === "timeline") return renderTimeline(block);
        if (block.type === "checklist") return renderChecklist(block);
        if (block.type === "accordion") return renderAccordion(block);
        if (block.type === "quote") return renderQuote(block);
        if (block.type === "steps") return renderSteps(block);

        return document.createDocumentFragment();
    }

    function addContentTypeClass(element, type) {
        const className = contentTypeClasses[type];

        if (className) {
            element.classList.add(className);
        }
    }

    function renderPage(data) {
        document.title = data.title;
        page.innerHTML = "";

        const hero = createElement("header", "hero note-block");
        hero.dataset.contentType = data.hero.type;
        addContentTypeClass(hero, data.hero.type);
        // hero.append(createElement("span", "content-label", data.hero.label));
        hero.append(createElement("h1", "", data.hero.heading));
        hero.append(createElement("p", "", data.hero.text));
        page.append(hero);

        const nav = createElement("nav", "content-nav");
        nav.setAttribute("aria-label", data.navLabel || "Page sections");

        data.nav.forEach((item) => {
            const link = createElement("a", "", item.label);
            link.href = item.href;
            nav.append(link);
        });

        page.append(nav);

        data.sections.forEach((sectionData) => {
            const section = createElement("section", "note-block");
            section.dataset.contentType = sectionData.type;

            if (sectionData.id) {
                section.id = sectionData.id;
            }

            addContentTypeClass(section, sectionData.type);
            section.append(createElement("span", "content-label", sectionData.label));
            section.append(createElement("h2", "", sectionData.heading));

            sectionData.blocks.forEach((block) => {
                section.append(renderBlock(block));
            });

            page.append(section);
        });
    }

    function loadPageData() {
        if (window.notePageData && !jsonPath) {
            return Promise.resolve(window.notePageData);
        }

        if (window.notePageData && window.location.protocol === "file:") {
            return Promise.resolve(window.notePageData);
        }

        if (!jsonPath) {
            return Promise.reject(new Error("No content source found."));
        }

        return fetch(jsonPath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to load content JSON.");
                }

                return response.json();
            })
            .catch((error) => {
                if (window.notePageData) {
                    return window.notePageData;
                }

                throw error;
            });
    }

    if (!page) {
        return;
    }

    loadPageData()
        .then(renderPage)
        .catch(() => {
            page.append(createElement("section", "note-block type-common-mistakes", "Unable to load content data."));
        });
})();
