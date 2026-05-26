'use client';

import { useState } from 'react';
import { textToRunes, textToGematriaValue } from '@/lib/gematria';

export default function RuneTranslator() {
  const [input, setInput] = useState('');
  const runes = input ? textToRunes(input) : '';
  const value = input ? textToGematriaValue(input) : null;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: '#00ff41' }}>
          Rune Translator
        </h2>
        <p className="text-xs" style={{ color: '#00801f' }}>
          Converts Latin text to Elder Futhark runes using Gematria Primus phonetics.
          Handles digraphs: TH, EO, NG, OE, AE, IO, EA.
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
          className="w-full border px-3 py-2 text-sm bg-transparent outline-none focus:border-phosphor transition-colors"
          style={{ borderColor: '#1a3322', color: '#00ff41', fontFamily: 'inherit' }}
          spellCheck={false}
        />

        {runes && (
          <div
            className="border p-4 space-y-3"
            style={{ borderColor: '#1a3322', background: '#0d0d0d' }}
          >
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: '#003311' }}>Runes</p>
              <p className="text-3xl leading-relaxed tracking-widest" style={{ color: '#00ff41' }}>
                {runes}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: '#003311' }}>Gematria value</p>
              <p className="text-lg font-bold" style={{ color: '#00ff41' }}>
                {value?.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs" style={{ color: '#003311' }}>
        Note: Characters without Gematria Primus equivalents are passed through unchanged.
        Space, punctuation, and numerals are not mapped.
      </p>
    </div>
  );
}
