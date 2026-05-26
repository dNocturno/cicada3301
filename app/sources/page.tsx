import Link from 'next/link';
import { stages } from '@/data/stages';

export default function SourcesPage() {
  // Collect unique sources across all stages
  const allSources = new Map<string, number[]>();
  for (const stage of stages) {
    for (const url of stage.sources) {
      if (!allSources.has(url)) allSources.set(url, []);
      allSources.get(url)!.push(stage.id);
    }
  }

  // Key primary sources
  const primary = [
    {
      label: 'Uncovering Cicada Wiki',
      url: 'https://uncovering-cicada.fandom.com/wiki/Cicada_3301',
      note: 'Community wiki, most comprehensive single source',
    },
    {
      label: 'Connor Tumbleson — Puzzle Solve Series (Parts 1–4)',
      url: 'https://connortumbleson.com/2021/01/18/the-cicada-3301-mystery/',
      note: 'Detailed technical walkthrough of all three puzzle rounds',
    },
    {
      label: 'cicada-solvers GitHub',
      url: 'https://github.com/cicada-solvers/3301book',
      note: 'Community organization; Liber Primus image and translation archives',
    },
    {
      label: 'iddqd Cicada archive',
      url: 'https://github.com/iddqd/cicada',
      note: 'Audio files, poster photos, LP images',
    },
    {
      label: 'Internet Archive — 3301.iso',
      url: 'https://archive.org/details/3301.iso',
      note: 'Cicada OS bootable ISO (~130MB)',
    },
    {
      label: 'Internet Archive — 761.mp3',
      url: 'https://archive.org/details/cicada-761',
      note: '"The Instar Emergence" audio file',
    },
    {
      label: 'Phone recording (YouTube)',
      url: 'https://www.youtube.com/watch?v=k24ZrFR2IUQ',
      note: '(214) 390-9608 — "Very good. You have done well."',
    },
    {
      label: 'Gematria Primus — Uncovering Cicada Wiki',
      url: 'https://uncovering-cicada.fandom.com/wiki/Gematria_Primus',
      note: 'Rune-to-prime mapping reference',
    },
    {
      label: 'DEF CON 31 talk — Cracking Cicada 3301',
      url: 'https://www.defcon.org/html/defcon-31/dc-31-speakers.html',
      note: 'August 2023 presentation by Taiiwo, Artorias, Puck, TheClockworkBird',
    },
  ];

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-10 space-y-8">
      <header className="space-y-2">
        <Link href="/" className="text-xs tracking-widest uppercase hover:text-phosphor" style={{ color: '#00801f' }}>
          ← Home
        </Link>
        <h1 className="text-2xl font-bold tracking-widest uppercase glow" style={{ color: '#00ff41' }}>
          SOURCES
        </h1>
        <p className="text-xs" style={{ color: '#00801f' }}>
          All content sourced from documented Cicada 3301 history. Nothing fabricated.
        </p>
      </header>

      <div className="border-t" style={{ borderColor: '#1a3322' }} />

      <section className="space-y-4">
        <h2 className="text-xs tracking-widest uppercase" style={{ color: '#00801f' }}>Primary Sources</h2>
        {primary.map((src, i) => (
          <div key={i} className="border-l-2 pl-4 space-y-1" style={{ borderColor: '#1a3322' }}>
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline hover:text-phosphor transition-colors block"
              style={{ color: '#00ff41' }}
            >
              {src.label}
            </a>
            <p className="text-xs" style={{ color: '#00801f' }}>{src.note}</p>
          </div>
        ))}
      </section>

      <div className="border-t" style={{ borderColor: '#1a3322' }} />

      <section className="space-y-2">
        <h2 className="text-xs tracking-widest uppercase" style={{ color: '#00801f' }}>All Sources by Stage</h2>
        {Array.from(allSources.entries()).map(([url, stageIds]) => (
          <div key={url} className="flex gap-3 text-xs">
            <span style={{ color: '#003311', minWidth: 60 }}>
              Stage {stageIds.join(', ')}
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-phosphor transition-colors truncate"
              style={{ color: '#00801f' }}
            >
              {url}
            </a>
          </div>
        ))}
      </section>

      <div
        className="border p-4 text-xs leading-6"
        style={{ borderColor: '#1a3322', background: '#0d0d0d', color: '#00801f' }}
      >
        <p>
          <span style={{ color: '#00ff41' }}>Verification:</span> All authentic Cicada 3301
          communications were signed with PGP key 7A35090F (full fingerprint 0x181F01E57A35090F).
          This key can be used to verify any claimed Cicada message.
          Unsigned messages claiming to be from Cicada should be treated as impostors.
        </p>
      </div>
    </main>
  );
}
