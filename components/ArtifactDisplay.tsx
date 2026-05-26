'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { ArtifactRecord } from '@/data/stages';

const MapArtifact = dynamic(() => import('./MapArtifact'), { ssr: false });

function EvidenceCaption({ caption, sourceUrl, authenticity }: {
  caption: string;
  sourceUrl: string;
  authenticity: 'confirmed' | 'disputed' | 'reconstructed';
}) {
  const colors = {
    confirmed: '#00ff41',
    disputed: '#ff9900',
    reconstructed: '#0099ff',
  };
  return (
    <div className="mt-2 space-y-1">
      <p className="text-xs leading-5" style={{ color: '#00801f' }}>{caption}</p>
      <div className="flex items-center gap-3 text-xs">
        <span
          className="border px-1.5 py-0.5 text-[10px] tracking-wider uppercase"
          style={{ borderColor: colors[authenticity], color: colors[authenticity] }}
        >
          {authenticity}
        </span>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-phosphor transition-colors"
          style={{ color: '#00801f' }}
        >
          source ↗
        </a>
      </div>
    </div>
  );
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Cicada 3301 audio recording"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: '1px solid #1a3322' }}
      />
    </div>
  );
}

function AudioPlayer({ src }: { src: string }) {
  return (
    <audio
      controls
      className="w-full"
      style={{ filter: 'invert(1) hue-rotate(100deg)' }}
    >
      <source src={src} />
      Audio not supported.
    </audio>
  );
}

function TextArtifact({ transcript }: { transcript?: string }) {
  return (
    <div
      className="border p-4 text-xs leading-6 overflow-auto max-h-64 whitespace-pre-wrap"
      style={{ borderColor: '#1a3322', background: '#0d0d0d', color: '#00ff41', fontFamily: 'monospace' }}
    >
      {transcript ?? '[transcript not available]'}
    </div>
  );
}

export default function ArtifactDisplay({ artifact }: { artifact: ArtifactRecord }) {
  if (!artifact) return null;

  const isYouTubeId = (s: string) => /^[A-Za-z0-9_-]{11}$/.test(s);

  return (
    <div className="space-y-2">
      {artifact.type === 'image' && (
        <div className="relative w-full" style={{ minHeight: 200 }}>
          <Image
            src={artifact.src}
            alt={artifact.caption}
            fill
            className="object-contain"
            style={{ border: '1px solid #1a3322' }}
            unoptimized
          />
        </div>
      )}

      {artifact.type === 'audio' && (
        isYouTubeId(artifact.src)
          ? <YouTubeEmbed videoId={artifact.src} />
          : <AudioPlayer src={artifact.src} />
      )}

      {artifact.type === 'video' && (
        <YouTubeEmbed videoId={artifact.src} />
      )}

      {artifact.type === 'text' && (
        <TextArtifact transcript={artifact.transcript} />
      )}

      {artifact.type === 'map' && (
        <MapArtifact transcript={artifact.transcript} />
      )}

      {artifact.note && (
        <p className="text-xs italic" style={{ color: '#00801f' }}>
          Note: {artifact.note}
        </p>
      )}

      <EvidenceCaption
        caption={artifact.caption}
        sourceUrl={artifact.sourceUrl}
        authenticity={artifact.authenticity}
      />
    </div>
  );
}
