import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full space-y-10">

        {/* Logo/title block */}
        <div className="text-center space-y-3">
          <p className="text-xs tracking-[0.4em] text-dim uppercase">
            January 4, 2012 — April 4, 2017
          </p>
          <h1 className="text-4xl font-bold tracking-widest uppercase glow" style={{ color: '#00ff41' }}>
            CICADA 3301
          </h1>
          <p className="text-sm tracking-[0.2em] text-dim uppercase">
            Interactive History
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-border-green" />

        {/* Intro text */}
        <div className="space-y-4 text-sm leading-7" style={{ color: '#00ff41' }}>
          <p>
            Between 2012 and 2017, an anonymous organization known only as Cicada 3301
            ran three puzzle rounds of escalating cryptographic complexity — and then went silent.
          </p>
          <p>
            Every image, coordinate, cipher, and quote in this game comes from documented
            Cicada 3301 history. Nothing has been invented. Where artifacts are unavailable,
            the source is cited.
          </p>
          <p>
            You will not solve Liber Primus. No one has. But you will understand
            how it was built.
          </p>
        </div>

        {/* Warning box */}
        <div
          className="border p-4 text-xs leading-6 space-y-1"
          style={{ borderColor: '#1a3322', background: '#0d0d0d', color: '#00801f' }}
        >
          <p>
            <span style={{ color: '#00ff41' }}>NOTICE:</span> This is a documentary game.
            All cryptographic puzzles presented are historical — they have already been solved
            or remain unsolved by the real-world community.
          </p>
          <p>
            PGP key 7A35090F has not been revoked. No new signed messages have appeared since April 2017.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/stage/1"
            className="flex-1 text-center border py-3 px-6 text-sm font-bold tracking-widest uppercase transition-all hover:bg-phosphor hover:text-terminal hover:glow-box"
            style={{ borderColor: '#00ff41', color: '#00ff41' }}
          >
            BEGIN — JANUARY 4, 2012
          </Link>
          <Link
            href="/timeline"
            className="flex-1 text-center border py-3 px-6 text-sm tracking-widest uppercase transition-colors"
            style={{ borderColor: '#1a3322', color: '#00801f' }}
          >
            TIMELINE
          </Link>
        </div>

        <div className="flex gap-6 text-xs justify-center" style={{ color: '#00801f' }}>
          <Link href="/tools" className="hover:text-phosphor transition-colors tracking-wider uppercase">Tools</Link>
          <Link href="/sources" className="hover:text-phosphor transition-colors tracking-wider uppercase">Sources</Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs" style={{ color: '#003311' }}>
          30 stages · 4 acts · 2012–2017 · Liber Primus unsolved
        </p>
      </div>
    </main>
  );
}
