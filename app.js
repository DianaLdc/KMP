
// ===== app.js =====

const textInput = document.getElementById("textInput");
const patternInput = document.getElementById("patternInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const caseSensitive = document.getElementById("caseSensitive");
const meta = document.getElementById("meta");
const resultText = document.getElementById("resultText");
const positions = document.getElementById("positions");

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
}

function highlightMatches(text, pattern, matches) {
  let output = "";
  let i = 0;
  const m = pattern.length;
  const starts = new Set(matches);

  while (i < text.length) {
    if (starts.has(i)) {
      output += `<span class="highlight">${escapeHtml(text.substr(i, m))}</span>`;
      i += m;
    } else {
      output += escapeHtml(text[i]);
      i++;
    }
  }
  resultText.innerHTML = output;
}

function runSearch() {
  const rawText = textInput.value;
  const rawPattern = patternInput.value;
  if (!rawPattern.trim()) {
    meta.textContent = "Por favor, escribe un patrón para buscar.";
    resultText.textContent = rawText;
    positions.textContent = "";
    return;
  }

  const text = caseSensitive.checked ? rawText : rawText.toLowerCase();
  const pattern = caseSensitive.checked ? rawPattern : rawPattern.toLowerCase();

  const start = performance.now();
  const matches = kmpSearch(text, pattern);
  const end = performance.now();
  const time = (end - start).toFixed(4);

  highlightMatches(rawText, rawPattern, matches);
  meta.textContent = `Coincidencias encontradas: ${matches.length} | Tiempo de ejecución: ${time} ms`;
  positions.textContent = matches.length > 0 
    ? "Posiciones encontradas (índice 0): " + matches.join(", ")
    : "No se encontraron coincidencias.";
}

function clearSearch() {
  patternInput.value = "";
  resultText.textContent = textInput.value;
  meta.textContent = "Esperando búsqueda...";
  positions.textContent = "";
}

searchBtn.addEventListener("click", runSearch);
clearBtn.addEventListener("click", clearSearch);

// Ejecuta búsqueda inicial
runSearch();