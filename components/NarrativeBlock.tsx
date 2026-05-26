import RichText from './RichText';

export type InlineMediaItem = {
  afterParagraph: number;
  src: string;
  caption: string;
  sourceUrl: string;
  authenticity: 'confirmed' | 'disputed' | 'reconstructed';
};

const BADGE_COLOR: Record<InlineMediaItem['authenticity'], string> = {
  confirmed: '#00801f',
  disputed: '#806000',
  reconstructed: '#1a3322',
};

export default function NarrativeBlock({
  paragraphs,
  inlineMedia,
}: {
  paragraphs: string[];
  inlineMedia?: InlineMediaItem[];
}) {
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <div key={i}>
          <p className="text-sm leading-7" style={{ color: '#00ff41' }}>
            <RichText>{para}</RichText>
          </p>
          {inlineMedia
            ?.filter((m) => m.afterParagraph === i)
            .map((media, j) => (
              <figure
                key={`im-${i}-${j}`}
                className="mt-4 mb-2"
                style={{ borderLeft: '2px solid #1a3322', paddingLeft: '12px' }}
              >
                <img
                  src={media.src}
                  alt={media.caption}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '320px',
                    objectFit: 'contain',
                    border: '1px solid #1a3322',
                    display: 'block',
                  }}
                />
                <figcaption
                  className="text-xs mt-1 flex items-center gap-2"
                  style={{ color: '#00801f' }}
                >
                  <span
                    style={{
                      border: `1px solid ${BADGE_COLOR[media.authenticity]}`,
                      color: BADGE_COLOR[media.authenticity],
                      padding: '0 4px',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {media.authenticity}
                  </span>
                  <span>{media.caption}</span>
                  {' · '}
                  <a
                    href={media.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#00801f', textDecoration: 'underline' }}
                  >
                    source
                  </a>
                </figcaption>
              </figure>
            ))}
        </div>
      ))}
    </div>
  );
}
