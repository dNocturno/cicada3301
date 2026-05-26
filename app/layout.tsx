import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const ibm = IBM_Plex_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ibm',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cicada 3301 — Interactive History',
  description: 'A documentary-style interactive game covering the complete documented history of Cicada 3301 (2012–2017).',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ibm.variable}>
      <body style={{ fontFamily: 'var(--font-ibm), monospace' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: 'url(/artifacts/2012-welcome-image.jpg)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '60vmin',
            opacity: 0.04,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        {children}
      </body>
    </html>
  );
}
