import Link from 'next/link';
import GematriaCard from '@/components/GematriaCard';
import RuneTranslator from '@/components/RuneTranslator';
import VigenereTool from '@/components/VigenereTool';

export default function ToolsPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10 space-y-8">
      <header className="space-y-2">
        <Link href="/" className="text-xs tracking-widest uppercase hover:text-phosphor" style={{ color: '#00801f' }}>
          ← Home
        </Link>
        <h1 className="text-2xl font-bold tracking-widest uppercase glow" style={{ color: '#00ff41' }}>
          CIPHER TOOLS
        </h1>
        <p className="text-xs" style={{ color: '#00801f' }}>
          Reference tools used in documented Cicada 3301 puzzle solutions.
        </p>
      </header>

      <div className="border-t" style={{ borderColor: '#1a3322' }} />

      <div className="space-y-10">
        <GematriaCard />
        <div className="border-t" style={{ borderColor: '#1a3322' }} />
        <RuneTranslator />
        <div className="border-t" style={{ borderColor: '#1a3322' }} />
        <VigenereTool />
      </div>
    </main>
  );
}
