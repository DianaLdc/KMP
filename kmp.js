 
// ===== kmp.js =====
// Implementación pura del algoritmo Knuth–Morris–Pratt

function computeLPS(pattern) {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) len = lps[len - 1];
      else { lps[i] = 0; i++; }
    }
  }
  return lps;
}

function kmpSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const matches = [];
  if (m === 0) return matches;

  const lps = computeLPS(pattern);
  let i = 0, j = 0;

  while (i < n) {
    if (text[i] === pattern[j]) {
      i++; j++;
      if (j === m) {
        matches.push(i - j);
        j = lps[j - 1];
      }
    } else {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }

  return matches;
}