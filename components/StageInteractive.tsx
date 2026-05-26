'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGameStore } from '@/lib/store';
import type { Stage } from '@/data/stages';
import ArtifactDisplay from './ArtifactDisplay';

type Props = {
  stage: Stage;
  totalStages: number;
};

export default function StageInteractive({ stage, totalStages }: Props) {
  const { completeStage, decisions } = useGameStore();
  const existing = decisions[stage.id];

  const [selected, setSelected] = useState<number | null>(existing?.selectedOption ?? null);
  const [revealed, setRevealed] = useState(existing !== undefined);

  // Sync on navigation between stages
  useEffect(() => {
    const saved = useGameStore.getState().decisions[stage.id];
    setSelected(saved?.selectedOption ?? null);
    setRevealed(saved !== undefined);
  }, [stage.id]);

  const noCorrect = stage.decision.noCorrectAnswer === true;
  const correctIndex = noCorrect
    ? null
    : stage.decision.options.findIndex((o) => o.correct);

  function handleSubmit() {
    if (selected === null) return;
    completeStage(stage.id, selected);
    setRevealed(true);
  }

  const isCorrect = !noCorrect && selected === correctIndex;

  return (
    <div className="space-y-8">
      {/* Decision panel */}
      <div
        className="border p-6 space-y-5"
        style={{ borderColor: '#1a3322', background: '#0d0d0d' }}
      >
        <p className="text-xs tracking-widest uppercase" style={{ color: '#00801f' }}>
          Decision
        </p>
        <p className="text-sm leading-6" style={{ color: '#00ff41' }}>
          {stage.decision.question}
        </p>

        {noCorrect && !revealed && (
          <p className="text-xs italic" style={{ color: '#00801f' }}>
            No single answer is correct. Choose the interpretation you find most compelling.
          </p>
        )}

        <div className="space-y-3">
          {stage.decision.options.map((opt, i) => {
            let borderColor = '#1a3322';
            let textColor = '#00ff41';
            let bg = 'transparent';

            if (revealed) {
              if (noCorrect) {
                borderColor = selected === i ? '#00ff41' : '#1a3322';
                bg = selected === i ? 'rgba(0,255,65,0.05)' : 'transparent';
              } else {
                if (i === correctIndex) {
                  borderColor = '#00ff41';
                  bg = 'rgba(0,255,65,0.05)';
                } else if (selected === i && i !== correctIndex) {
                  borderColor = '#ff4444';
                  textColor = '#ff4444';
                }
              }
            } else if (selected === i) {
              borderColor = '#00ff41';
              bg = 'rgba(0,255,65,0.05)';
            }

            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => !revealed && setSelected(i)}
                className="w-full text-left border p-3 text-sm leading-6 transition-all"
                style={{ borderColor, color: textColor, background: bg, cursor: revealed ? 'default' : 'pointer' }}
              >
                <span style={{ color: '#00801f', marginRight: '0.5rem' }}>
                  [{String.fromCharCode(65 + i)}]
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>

        {!revealed && (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="border px-6 py-2 text-sm tracking-widest uppercase transition-all disabled:opacity-30"
            style={{
              borderColor: selected !== null ? '#00ff41' : '#1a3322',
              color: selected !== null ? '#00ff41' : '#00801f',
            }}
          >
            COMMIT
          </button>
        )}

        {revealed && selected !== null && (
          <div
            className="border-l-2 pl-4 text-sm leading-6"
            style={{
              borderColor: noCorrect ? '#00ff41' : isCorrect ? '#00ff41' : '#ff4444',
              color: '#00ff41',
            }}
          >
            {!noCorrect && (
              <p className="text-xs tracking-wider uppercase mb-2" style={{ color: noCorrect ? '#00ff41' : isCorrect ? '#00ff41' : '#ff4444' }}>
                {isCorrect ? 'Correct' : 'Incorrect'}
              </p>
            )}
            <p>{stage.decision.options[selected].feedback}</p>
          </div>
        )}
      </div>

      {/* Resolution — shown after decision */}
      {revealed && (
        <div className="space-y-4">
          <div className="border-t" style={{ borderColor: '#1a3322' }} />
          <p className="text-xs tracking-widest uppercase" style={{ color: '#00801f' }}>Resolution</p>
          <p className="text-sm leading-7" style={{ color: '#00ff41' }}>
            {stage.resolution.explanation}
          </p>

          {stage.resolution.additionalMedia?.map((media, i) => (
            <ArtifactDisplay key={i} artifact={{ ...media, authenticity: 'confirmed' }} />
          ))}

          {/* Sources */}
          <div className="space-y-1">
            <p className="text-xs tracking-wider uppercase" style={{ color: '#00801f' }}>Sources</p>
            {stage.sources.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs underline hover:text-phosphor"
                style={{ color: '#00801f' }}
              >
                {url}
              </a>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-4">
            {stage.id > 1 && (
              <Link
                href={`/stage/${stage.id - 1}`}
                className="border px-4 py-2 text-xs tracking-widest uppercase transition-colors"
                style={{ borderColor: '#1a3322', color: '#00801f' }}
              >
                ← PREV
              </Link>
            )}
            {stage.id < totalStages && (
              <Link
                href={`/stage/${stage.id + 1}`}
                className="border px-4 py-2 text-xs tracking-widest uppercase transition-colors hover:border-phosphor hover:text-phosphor"
                style={{ borderColor: '#1a3322', color: '#00801f' }}
              >
                NEXT →
              </Link>
            )}
            {stage.id === totalStages && (
              <Link
                href="/ending"
                className="border px-4 py-2 text-xs tracking-widest uppercase transition-colors"
                style={{ borderColor: '#00ff41', color: '#00ff41' }}
              >
                ENDING →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
