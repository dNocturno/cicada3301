import { notFound } from 'next/navigation';
import { stages } from '@/data/stages';
import Sidebar from '@/components/Sidebar';
import ArtifactDisplay from '@/components/ArtifactDisplay';
import StageInteractive from '@/components/StageInteractive';

export async function generateStaticParams() {
  return stages.map((s) => ({ id: String(s.id) }));
}

const ACT_LABELS: Record<number, string> = {
  1: 'ACT I · 2012',
  2: 'ACT II · 2013',
  3: 'ACT III · 2014',
  4: 'ACT IV · 2015–2017',
};

export default async function StagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stageId = parseInt(id, 10);
  const stage = stages.find((s) => s.id === stageId);

  if (!stage) notFound();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className="hidden lg:block w-56 shrink-0 border-r p-6 sticky top-0 h-screen overflow-y-auto"
        style={{ borderColor: '#1a3322', background: '#0a0a0a' }}
      >
        <Sidebar currentId={stage.id} />
      </aside>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Stage header */}
        <header className="space-y-2">
          <div className="flex items-center gap-4 text-xs">
            <span
              className="border px-2 py-0.5 tracking-widest uppercase"
              style={{ borderColor: '#1a3322', color: '#00801f' }}
            >
              {ACT_LABELS[stage.act]}
            </span>
            {stage.location && (
              <span style={{ color: '#003311' }}>{stage.location.name}</span>
            )}
          </div>
          <p className="text-xs tracking-widest" style={{ color: '#00801f' }}>
            {stage.dateDisplay}
          </p>
          <h1
            className="text-2xl font-bold tracking-widest uppercase glow"
            style={{ color: '#00ff41' }}
          >
            {stage.title}
          </h1>
          <div className="flex items-center gap-2 text-xs" style={{ color: '#003311' }}>
            <span>Stage {stage.id} of {stages.length}</span>
          </div>
        </header>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: '#1a3322' }} />

        {/* Narrative */}
        <section className="space-y-4">
          {stage.narrative.map((para, i) => (
            <p key={i} className="text-sm leading-7" style={{ color: '#00ff41' }}>
              {para}
            </p>
          ))}
        </section>

        {/* Artifact */}
        {stage.artifact && (
          <section>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#00801f' }}>
              Evidence
            </p>
            <ArtifactDisplay artifact={stage.artifact} />
          </section>
        )}

        {/* Interactive: decision + resolution */}
        <StageInteractive stage={stage} totalStages={stages.length} />

        {/* Mobile nav */}
        <div className="lg:hidden pt-6 border-t" style={{ borderColor: '#1a3322' }}>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#003311' }}>
            Navigation
          </p>
          <Sidebar currentId={stage.id} />
        </div>
      </main>
    </div>
  );
}
