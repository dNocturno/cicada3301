'use client';

import Link from 'next/link';
import { useGameStore } from '@/lib/store';
import { stages } from '@/data/stages';

const ACT_LABELS: Record<number, string> = {
  1: 'ACT I · 2012',
  2: 'ACT II · 2013',
  3: 'ACT III · 2014',
  4: 'ACT IV · 2015–2017',
};

export default function Sidebar({ currentId }: { currentId: number }) {
  const { completedStages, unlockedTools } = useGameStore();

  const grouped: Record<number, typeof stages> = { 1: [], 2: [], 3: [], 4: [] };
  for (const s of stages) grouped[s.act].push(s);

  return (
    <nav className="space-y-6 text-xs" style={{ color: '#00801f' }}>
      {/* Logo */}
      <Link href="/" className="block text-sm font-bold tracking-widest uppercase glow" style={{ color: '#00ff41' }}>
        CICADA 3301
      </Link>

      {/* Stage list */}
      {([1, 2, 3, 4] as const).map((act) => (
        <div key={act} className="space-y-1">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#003311' }}>
            {ACT_LABELS[act]}
          </p>
          {grouped[act].map((s) => {
            const isCurrent = s.id === currentId;
            const isDone = completedStages.includes(s.id);
            return (
              <Link
                key={s.id}
                href={`/stage/${s.id}`}
                className="flex items-center gap-2 py-0.5 pr-2 transition-colors hover:text-phosphor"
                style={{ color: isCurrent ? '#00ff41' : '#00801f' }}
              >
                <span style={{ color: isDone ? '#00ff41' : '#003311', minWidth: 12 }}>
                  {isDone ? '✓' : '○'}
                </span>
                <span className="truncate">{s.title}</span>
              </Link>
            );
          })}
        </div>
      ))}

      {/* Tools (unlocked progressively) */}
      {unlockedTools.length > 0 && (
        <div className="space-y-1 pt-2 border-t" style={{ borderColor: '#1a3322' }}>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#003311' }}>TOOLS</p>
          <Link href="/tools" className="block hover:text-phosphor transition-colors" style={{ color: '#00801f' }}>
            → Cipher Tools
          </Link>
        </div>
      )}

      {/* Nav */}
      <div className="space-y-1 pt-2 border-t" style={{ borderColor: '#1a3322' }}>
        <Link href="/timeline" className="block hover:text-phosphor transition-colors">Timeline</Link>
        <Link href="/sources" className="block hover:text-phosphor transition-colors">Sources</Link>
      </div>
    </nav>
  );
}
