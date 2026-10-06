/**
 * Greek text helpers: accent-insensitive matching and Latin transliteration.
 * The backend mirrors this logic in we_learn_greek/search.py — keep the two in sync.
 */

/** Lowercase, strip accents/diaeresis, and fold final sigma, so "Άνθρωπος" matches "ανθρωπος". */
export function normalizeGreek(text = '') {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/ς/g, 'σ')
    .trim();
}

// Phonetic (how it sounds, not how it's spelled): "είμαι" → "íme", "μπύρα" → "bíra".
// Digraphs first, so "ου" becomes "ou" rather than "o" + "i".
const DIGRAPHS = [
  ['ου', 'ou'],
  ['αι', 'e'],
  ['ει', 'i'],
  ['οι', 'i'],
  ['υι', 'i'],
  ['μπ', 'b'],
  ['ντ', 'd'],
  ['γκ', 'g'],
  ['γγ', 'ng'],
  ['τσ', 'ts'],
  ['τζ', 'tz'],
];

const LETTERS = {
  α: 'a', β: 'v', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th', ι: 'i', κ: 'k', λ: 'l',
  μ: 'm', ν: 'n', ξ: 'x', ο: 'o', π: 'p', ρ: 'r', σ: 's', ς: 's', τ: 't', υ: 'i', φ: 'f',
  χ: 'h', ψ: 'ps', ω: 'o',
};

// αυ/ευ sound like "av"/"ev" before vowels and voiced consonants, "af"/"ef" otherwise.
const VOICED_AFTER_U = new Set('αεηιουωβγδζλμνρ');

/**
 * Transliterate Greek into phonetic Latin letters. Stressed vowels keep their accent (ά → á),
 * so the result works as a pronunciation hint: "άνθρωπος" → "ánthropos".
 */
export function transliterate(text = '') {
  const chars = [...text.normalize('NFC')];
  let out = '';

  for (let i = 0; i < chars.length; i += 1) {
    const raw = chars[i];
    const lower = raw.toLowerCase();
    const base = normalizeGreek(lower);
    const accented = lower !== base && lower.normalize('NFD').includes('́');
    const upper = raw !== lower;
    const next = normalizeGreek(chars[i + 1]?.toLowerCase() ?? '');
    const pair = base + next;

    let latin;
    let consumed = 1;

    if ((base === 'α' || base === 'ε') && next === 'υ') {
      const after = normalizeGreek(chars[i + 2]?.toLowerCase() ?? '');
      latin = (base === 'α' ? 'a' : 'e') + (VOICED_AFTER_U.has(after) ? 'v' : 'f');
      consumed = 2;
    } else {
      const digraph = DIGRAPHS.find(([greek]) => greek === pair);
      if (digraph) {
        latin = digraph[1];
        consumed = 2;
      } else {
        latin = LETTERS[base] ?? raw;
      }
    }

    // In digraphs like "ού" the accent sits on the second letter; carry it to the first vowel.
    const accentInPair =
      consumed === 2 && chars[i + 1] && chars[i + 1].normalize('NFD').includes('́');
    if (accented || accentInPair) {
      latin = latin.replace(/[aeiouy]/, (v) => `${v}́`).normalize('NFC');
    }
    if (upper) latin = latin.charAt(0).toUpperCase() + latin.slice(1);

    out += latin;
    i += consumed - 1;
  }

  return out;
}

/**
 * Collapse spelling variants learners use for the same sound (kalimera / kalhmera,
 * philosophia / filosofia, mpira / bira) so Latin input can match transliterated Greek.
 */
function looseLatin(text) {
  return normalizeGreek(text)
    .replace(/ph/g, 'f')
    .replace(/(kh|ch)/g, 'h')
    .replace(/dh/g, 'd')
    .replace(/mp/g, 'b')
    .replace(/b/g, 'v')
    .replace(/nt/g, 'd')
    .replace(/(gk|gg)/g, 'g')
    .replace(/ks/g, 'x')
    .replace(/ai/g, 'e')
    .replace(/(ei|oi|yi|y)/g, 'i')
    .replace(/ou/g, 'u')
    .replace(/w/g, 'o')
    .replace(/(.)\1+/g, '$1');
}

const LATIN_RE = /[a-z]/i;

/** True if `query` matches `value`: accent-insensitive for Greek, transliteration-aware for Latin. */
export function matchesGreek(value, query) {
  if (!query?.trim()) return true;
  if (!value) return false;
  if (normalizeGreek(value).includes(normalizeGreek(query))) return true;
  if (!LATIN_RE.test(query)) return false;
  return looseLatin(transliterate(value)).includes(looseLatin(query));
}

// Mirrors backend dictionary/validators.py: Greek and Coptic letters (all tonos/dialytika forms,
// final sigma) plus Greek Extended (polytonic), words separated by single spaces.
const GREEK_LETTER = 'ΆΈ-ΊΌΎ-ΡΣ-ώἀ-῿';
const GREEK_WORDS_RE = new RegExp(`^[${GREEK_LETTER}]+( [${GREEK_LETTER}]+)*$`, 'u');

/** Dictionary limits, as enforced by the API (greek_word 2–30; other fields ≤ 30). */
export const WORD_LIMITS = { min: 2, max: 30 };

/** Collapse runs of whitespace the same way the API does before validating. */
export const tidyGreekWord = (text = '') => text.replace(/\s+/g, ' ').trim();

/** Returns a translation key describing what's wrong with a dictionary word, or null if valid. */
export function greekWordError(text) {
  const word = tidyGreekWord(text);
  if (word.length < WORD_LIMITS.min) return 'myWords.errors.tooShort';
  if (word.length > WORD_LIMITS.max) return 'myWords.errors.tooLong';
  if (!GREEK_WORDS_RE.test(word)) return 'myWords.errors.greekOnly';
  return null;
}
