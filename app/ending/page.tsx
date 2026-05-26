'use client';

import Link from 'next/link';
import { useGameStore, type EndingChoice } from '@/lib/store';

const theories: { id: EndingChoice; label: string; body: string }[] = [
  {
    id: 'nsa',
    label: 'Intelligence Agency Recruitment',
    body: 'NSA, GCHQ, or equivalent. The canary traps, individual unique puzzles, dead man\'s switch tasking, and global physical reach all align with intelligence community talent scouting. The privacy-first philosophy is either cover or a genuine ideological framing for the work. No intelligence agency has confirmed involvement.',
  },
  {
    id: 'private-group',
    label: 'Private Cryptography Collective',
    body: 'A well-funded, globally distributed group of privacy advocates, cryptographers, and technologists with no state affiliation. The dead man\'s switch assignment, the Liber Primus philosophy, and the censorship-resistance focus align with civil liberties motivations. The 2013 project failure suggests the group was real but organizationally limited.',
  },
  {
    id: 'art-project',
    label: 'Conceptual Art Project',
    body: 'A sophisticated ARG or conceptual art piece where the puzzle itself was the point — not the recruitment of anyone. The philosophical content of Liber Primus supports an artistic reading. Against this: confirmed winners were given operational tasks in 2012 and 2013, which is inconsistent with a purely artistic purpose.',
  },
  {
    id: 'hoax',
    label: 'Elaborate Hoax',
    body: 'No real organization, no real winners, no real mission. Just an exceptionally well-constructed puzzle. Against this: multiple confirmed winners (including Marcus Wanner, age 15) accessed post-puzzle forums and were assigned tasks. Their accounts are limited but consistent with real operations.',
  },
];

export default function EndingPage() {
  const { endingChoice, setEndingChoice, completedStages } = useGameStore();
  const completed = completedStages.length;

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-10 space-y-8">
      <header className="space-y-2">
        <Link href="/stage/30" className="text-xs tracking-widest uppercase hover:text-phosphor" style={{ color: '#00801f' }}>
          ← Stage 30
        </Link>
        <h1 className="text-2xl font-bold tracking-widest uppercase glow" style={{ color: '#00ff41' }}>
          ENDING
        </h1>
        <p className="text-xs" style={{ color: '#00801f' }}>
          {completed} of 30 stages completed
        </p>
      </header>

      <div className="border-t" style={{ borderColor: '#1a3322' }} />

      <div className="space-y-4 text-sm leading-7" style={{ color: '#00ff41' }}>
        <p>
          Cicada 3301: 2012–2017. Three puzzle rounds. One unreleased book.
          A dead man&apos;s switch project that fell apart. A final message warning about false paths.
          Then silence.
        </p>
        <p>
          The PGP key 7A35090F has not been revoked.
          No new signed messages have appeared since April 4, 2017.
        </p>
        <p>
          Liber Primus remains unsolved.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-xs tracking-widest uppercase" style={{ color: '#00801f' }}>
          Your conclusion
        </p>
        <p className="text-sm" style={{ color: '#00ff41' }}>
          Based on everything you have seen: who were they?
        </p>

        <div className="space-y-3">
          {theories.map((t) => {
            const isSelected = endingChoice === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setEndingChoice(t.id)}
                className="w-full text-left border p-4 space-y-2 transition-all"
                style={{
                  borderColor: isSelected ? '#00ff41' : '#1a3322',
                  background: isSelected ? 'rgba(0,255,65,0.05)' : 'transparent',
                }}
              >
                <p className="text-sm font-medium" style={{ color: '#00ff41' }}>{t.label}</p>
                {isSelected && (
                  <p className="text-xs leading-6" style={{ color: '#00801f' }}>{t.body}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {endingChoice && (
        <div
          className="border p-6 space-y-4 text-sm leading-7"
          style={{ borderColor: '#1a3322', background: '#0d0d0d' }}
        >
          <p style={{ color: '#00ff41' }}>
            "Beware false paths. Always verify PGP signature from 7A35090F."
          </p>
          <p className="text-xs" style={{ color: '#00801f' }}>
            — Cicada 3301, April 4, 2017. Final known authenticated message.
          </p>
          <p className="text-xs" style={{ color: '#003311' }}>
            This is their last verified instruction. Everything else — including this game —
            is interpretation.
          </p>
          <p className="text-xs font-bold tracking-widest" style={{ color: '#003311' }}>
            3301
          </p>
        </div>
      )}

      <div className="flex gap-4 text-xs">
        <Link href="/" className="border px-4 py-2 tracking-widest uppercase" style={{ borderColor: '#1a3322', color: '#00801f' }}>
          ← Home
        </Link>
        <Link href="/stage/1" className="border px-4 py-2 tracking-widest uppercase" style={{ borderColor: '#1a3322', color: '#00801f' }}>
          Restart
        </Link>
      </div>
    </main>
  );
}
