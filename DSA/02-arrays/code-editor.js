(() => {
  const editor = document.querySelector(".editor");
  const textarea = editor?.querySelector("textarea");
  if (!textarea) return;

  const surface = document.createElement("div");
  surface.className = "editor-surface";

  const highlighted = document.createElement("pre");
  highlighted.setAttribute("aria-hidden", "true");
  const highlightedCode = document.createElement("code");
  highlighted.append(highlightedCode);

  textarea.parentNode.insertBefore(surface, textarea);
  surface.append(highlighted, textarea);

  const tokens = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|var|if|else|return|function|new|for|while|class|try|catch|throw|true|false|null|undefined|typeof|instanceof)\b|\b(?:console|Math|Array|JSON|Number|String)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*(?=\s*\()|[=+\-*\/%<>!]+/g;
  const escapeHtml = value => value.replace(/[&<>"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[char]);

  function updateHighlight() {
    const source = textarea.value || " ";
    let output = "";
    let position = 0;
    tokens.lastIndex = 0;

    for (const match of source.matchAll(tokens)) {
      const token = match[0];
      let type = "operator";
      if (/^(\/\/|\/\*)/.test(token)) type = "comment";
      else if (/^["'`]/.test(token)) type = "string";
      else if (/^\d/.test(token)) type = "number";
      else if (/^(const|let|var|if|else|return|function|new|for|while|class|try|catch|throw|true|false|null|undefined|typeof|instanceof)$/.test(token)) type = "keyword";
      else if (/^(console|Math|Array|JSON|Number|String)$/.test(token)) type = "builtin";
      else if (/^[A-Za-z_$]/.test(token)) type = "function";
      output += escapeHtml(source.slice(position, match.index));
      output += `<span class="tok-${type}">${escapeHtml(token)}</span>`;
      position = match.index + token.length;
    }

    output += escapeHtml(source.slice(position));
    highlightedCode.innerHTML = output + (source.endsWith("\n") ? " " : "");
  }

  textarea.addEventListener("input", updateHighlight);
  textarea.addEventListener("scroll", () => {
    highlighted.scrollTop = textarea.scrollTop;
    highlighted.scrollLeft = textarea.scrollLeft;
  });
  updateHighlight();
})();
