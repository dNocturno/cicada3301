export type RuneEntry = {
  rune: string;
  phonetic: string;
  prime: number;
  position: number;
};

export const GEMATRIA_PRIMUS: RuneEntry[] = [
  { position: 1,  rune: 'ᚠ', phonetic: 'F',  prime: 2   },
  { position: 2,  rune: 'ᚢ', phonetic: 'U',  prime: 3   },
  { position: 3,  rune: 'ᚦ', phonetic: 'TH', prime: 5   },
  { position: 4,  rune: 'ᚩ', phonetic: 'O',  prime: 7   },
  { position: 5,  rune: 'ᚱ', phonetic: 'R',  prime: 11  },
  { position: 6,  rune: 'ᚲ', phonetic: 'C',  prime: 13  },
  { position: 7,  rune: 'ᚷ', phonetic: 'G',  prime: 17  },
  { position: 8,  rune: 'ᚹ', phonetic: 'W',  prime: 19  },
  { position: 9,  rune: 'ᚺ', phonetic: 'H',  prime: 23  },
  { position: 10, rune: 'ᚾ', phonetic: 'N',  prime: 29  },
  { position: 11, rune: 'ᛁ', phonetic: 'I',  prime: 31  },
  { position: 12, rune: 'ᛄ', phonetic: 'J',  prime: 37  },
  { position: 13, rune: 'ᛇ', phonetic: 'EO', prime: 41  },
  { position: 14, rune: 'ᛈ', phonetic: 'P',  prime: 43  },
  { position: 15, rune: 'ᛉ', phonetic: 'Z',  prime: 47  },
  { position: 16, rune: 'ᛋ', phonetic: 'S',  prime: 53  },
  { position: 17, rune: 'ᛏ', phonetic: 'T',  prime: 59  },
  { position: 18, rune: 'ᛒ', phonetic: 'B',  prime: 61  },
  { position: 19, rune: 'ᛖ', phonetic: 'E',  prime: 67  },
  { position: 20, rune: 'ᛗ', phonetic: 'M',  prime: 71  },
  { position: 21, rune: 'ᛚ', phonetic: 'L',  prime: 73  },
  { position: 22, rune: 'ᛜ', phonetic: 'NG', prime: 79  },
  { position: 23, rune: 'ᛞ', phonetic: 'D',  prime: 83  },
  { position: 24, rune: 'ᛟ', phonetic: 'OE', prime: 89  },
  { position: 25, rune: 'ᚪ', phonetic: 'A',  prime: 97  },
  { position: 26, rune: 'ᚫ', phonetic: 'AE', prime: 101 },
  { position: 27, rune: 'ᚣ', phonetic: 'Y',  prime: 103 },
  { position: 28, rune: 'ᛡ', phonetic: 'IO', prime: 107 },
  { position: 29, rune: 'ᛠ', phonetic: 'EA', prime: 109 },
];

// Map latin char(s) → rune (uppercase key)
const latinToRune: Record<string, string> = {};
for (const entry of GEMATRIA_PRIMUS) {
  latinToRune[entry.phonetic.toUpperCase()] = entry.rune;
}

export function textToRunes(input: string): string {
  const upper = input.toUpperCase();
  let result = '';
  let i = 0;
  while (i < upper.length) {
    // Try two-char digraphs first (TH, EO, NG, OE, AE, IO, EA)
    const two = upper.slice(i, i + 2);
    if (latinToRune[two]) {
      result += latinToRune[two];
      i += 2;
    } else {
      const one = upper[i];
      result += latinToRune[one] ?? one;
      i++;
    }
  }
  return result;
}

export function textToGematriaValue(input: string): number {
  const upper = input.toUpperCase();
  let total = 0;
  let i = 0;
  while (i < upper.length) {
    const two = upper.slice(i, i + 2);
    const twoEntry = GEMATRIA_PRIMUS.find(e => e.phonetic.toUpperCase() === two);
    if (twoEntry) {
      total += twoEntry.prime;
      i += 2;
    } else {
      const oneEntry = GEMATRIA_PRIMUS.find(e => e.phonetic.toUpperCase() === upper[i]);
      if (oneEntry) total += oneEntry.prime;
      i++;
    }
  }
  return total;
}
