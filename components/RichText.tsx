'use client';

type Token =
  | { kind: 'text'; value: string }
  | { kind: 'link'; text: string; url: string }
  | { kind: 'onion'; value: string };

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|(\S*\.onion\b)/g;
  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ kind: 'text', value: input.slice(lastIndex, match.index) });
    }
    if (match[1] && match[2]) {
      tokens.push({ kind: 'link', text: match[1], url: match[2] });
    } else if (match[3]) {
      tokens.push({ kind: 'onion', value: match[3] });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < input.length) {
    tokens.push({ kind: 'text', value: input.slice(lastIndex) });
  }
  return tokens;
}

export default function RichText({ children }: { children: string }) {
  const tokens = tokenize(children);
  return (
    <>
      {tokens.map((t, i) => {
        if (t.kind === 'link') {
          return (
            <a
              key={i}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#00ff41',
                textDecoration: 'underline',
                textDecorationColor: '#1a3322',
                textUnderlineOffset: '3px',
              }}
            >
              {t.text}
            </a>
          );
        }
        if (t.kind === 'onion') {
          return (
            <code
              key={i}
              style={{
                color: '#00801f',
                background: '#0d1f14',
                padding: '1px 5px',
                borderRadius: '2px',
                fontSize: '0.85em',
                border: '1px solid #1a3322',
                letterSpacing: '0.02em',
              }}
            >
              {t.value}
            </code>
          );
        }
        return <span key={i}>{t.value}</span>;
      })}
    </>
  );
}
