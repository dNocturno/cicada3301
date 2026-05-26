import { GEMATRIA_PRIMUS } from '@/lib/gematria';

export default function GematriaCard() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: '#00ff41' }}>
          Gematria Primus
        </h2>
        <p className="text-xs leading-5" style={{ color: '#00801f' }}>
          29 Anglo-Saxon Elder Futhark runes mapped to the first 29 prime numbers.
          Introduced in the 2013 puzzle; foundational to Liber Primus.
        </p>
      </div>

      <div
        className="border overflow-auto"
        style={{ borderColor: '#1a3322' }}
      >
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: '#0d0d0d', borderBottom: '1px solid #1a3322' }}>
              <th className="px-3 py-2 text-left tracking-wider uppercase" style={{ color: '#00801f' }}>#</th>
              <th className="px-3 py-2 text-left tracking-wider uppercase" style={{ color: '#00801f' }}>Rune</th>
              <th className="px-3 py-2 text-left tracking-wider uppercase" style={{ color: '#00801f' }}>Phonetic</th>
              <th className="px-3 py-2 text-left tracking-wider uppercase" style={{ color: '#00801f' }}>Prime</th>
            </tr>
          </thead>
          <tbody>
            {GEMATRIA_PRIMUS.map((entry) => (
              <tr
                key={entry.position}
                className="border-b"
                style={{ borderColor: '#0d0d0d' }}
              >
                <td className="px-3 py-1.5" style={{ color: '#003311' }}>{entry.position}</td>
                <td className="px-3 py-1.5 text-xl" style={{ color: '#00ff41', lineHeight: 1.4 }}>{entry.rune}</td>
                <td className="px-3 py-1.5 font-mono" style={{ color: '#00ff41' }}>{entry.phonetic}</td>
                <td className="px-3 py-1.5" style={{ color: '#00801f' }}>{entry.prime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs" style={{ color: '#003311' }}>
        Source: uncovering-cicada.fandom.com/wiki/Gematria_Primus
      </p>
    </div>
  );
}
