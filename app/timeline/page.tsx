import Link from 'next/link';
import { stages } from '@/data/stages';

const ACT_COLORS: Record<number, string> = {
  1: '#00ff41',
  2: '#00cc33',
  3: '#009922',
  4: '#006611',
};

export default function TimelinePage() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-10 space-y-8">
      <header className="space-y-2">
        <Link href="/" className="text-xs tracking-widest uppercase hover:text-phosphor" style={{ color: '#00801f' }}>
          ← Home
        </Link>
        <h1 className="text-2xl font-bold tracking-widest uppercase glow" style={{ color: '#00ff41' }}>
          COMPLETE TIMELINE
        </h1>
        <p className="text-xs" style={{ color: '#00801f' }}>
          January 4, 2012 — April 4, 2017
        </p>
      </header>

      <div className="border-t" style={{ borderColor: '#1a3322' }} />

      <div className="relative space-y-0">
        {/* Timeline line */}
        <div
          className="absolute left-16 top-0 bottom-0 w-px"
          style={{ background: '#1a3322' }}
        />

        {stages.map((stage) => (
          <div key={stage.id} className="relative flex gap-6 py-4">
            {/* Date column */}
            <div className="w-16 shrink-0 text-right">
              <span className="text-[10px] leading-5" style={{ color: '#003311' }}>
                {stage.dateDisplay.split(',')[0]}
              </span>
            </div>

            {/* Dot */}
            <div
              className="relative z-10 mt-1.5 shrink-0 w-2 h-2 rounded-full border"
              style={{
                borderColor: ACT_COLORS[stage.act],
                background: '#0a0a0a',
              }}
            />

            {/* Content */}
            <div className="flex-1 space-y-1">
              <Link
                href={`/stage/${stage.id}`}
                className="block text-sm font-medium hover:text-phosphor transition-colors"
                style={{ color: ACT_COLORS[stage.act] }}
              >
                {stage.title}
              </Link>
              <p className="text-xs leading-5" style={{ color: '#00801f' }}>
                {stage.narrative[0].slice(0, 120)}…
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Epilogue */}
      <div
        className="border p-4 space-y-2 text-xs leading-6"
        style={{ borderColor: '#1a3322', background: '#0d0d0d' }}
      >
        <p style={{ color: '#00ff41' }}>Present</p>
        <p style={{ color: '#00801f' }}>
          Liber Primus remains unsolved. Community active on Discord (~7,000), IRC #cicadasolvers,
          GitHub cicada-solvers org, and r/cicada (~21,000).
        </p>
        <p style={{ color: '#00801f' }}>
          PGP key 7A35090F has not been revoked.
        </p>
      </div>
    </main>
  );
}
