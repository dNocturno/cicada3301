'use client';

import { useState } from 'react';

function vigenere(text: string, key: string, encode: boolean): string {
  if (!key) return text;
  const upper = text.toUpperCase();
  const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!keyUpper) return text;

  let result = '';
  let ki = 0;
  for (const ch of upper) {
    if (ch >= 'A' && ch <= 'Z') {
      const t = ch.charCodeAt(0) - 65;
      const k = keyUpper.charCodeAt(ki % keyUpper.length) - 65;
      const c = encode ? (t + k) % 26 : (t - k + 26) % 26;
      result += String.fromCharCode(c + 65);
      ki++;
    } else {
      result += ch;
    }
  }
  return result;
}

export default function VigenereTool() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');

  const output = text && key ? vigenere(text, key, mode === 'encode') : '';

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: '#00ff41' }}>
          Vigenère Cipher
        </h2>
        <p className="text-xs" style={{ color: '#00801f' }}>
          Used in solved sections of Liber Primus with prime-derived keys.
          Letters only — spaces and punctuation pass through unchanged.
        </p>
      </div>

      <div className="flex gap-3">
        {(['encode', 'decode'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="border px-3 py-1 text-xs tracking-widest uppercase transition-colors"
            style={{
              borderColor: mode === m ? '#00ff41' : '#1a3322',
              color: mode === m ? '#00ff41' : '#00801f',
              background: mode === m ? 'rgba(0,255,65,0.05)' : 'transparent',
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs tracking-wider uppercase" style={{ color: '#00801f' }}>Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Enter ciphertext or plaintext..."
            className="w-full border px-3 py-2 text-sm bg-transparent outline-none focus:border-phosphor resize-none"
            style={{ borderColor: '#1a3322', color: '#00ff41', fontFamily: 'inherit' }}
            spellCheck={false}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs tracking-wider uppercase" style={{ color: '#00801f' }}>Key</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Key (letters only)..."
            className="w-full border px-3 py-2 text-sm bg-transparent outline-none focus:border-phosphor"
            style={{ borderColor: '#1a3322', color: '#00ff41', fontFamily: 'inherit' }}
            spellCheck={false}
          />
        </div>

        {output && (
          <div
            className="border p-4"
            style={{ borderColor: '#1a3322', background: '#0d0d0d' }}
          >
            <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: '#003311' }}>
              {mode === 'decode' ? 'Plaintext' : 'Ciphertext'}
            </p>
            <p className="text-sm leading-6 font-mono break-all" style={{ color: '#00ff41' }}>
              {output}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
