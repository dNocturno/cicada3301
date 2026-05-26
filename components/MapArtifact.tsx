'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';

type Coord = { lat: number; lng: number; label: string };

function parseCoords(transcript?: string): Coord[] {
  if (!transcript) return [];
  const results: Coord[] = [];
  const linePattern = /(-?\d+\.\d+),\s*(-?\d+\.\d+)\s*[—–-]+\s*(.+)/g;
  let match;
  while ((match = linePattern.exec(transcript)) !== null) {
    results.push({ lat: parseFloat(match[1]), lng: parseFloat(match[2]), label: match[3].trim() });
  }
  return results;
}

export default function MapArtifact({ transcript }: { transcript?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const coords = parseCoords(transcript);

  useEffect(() => {
    if (!containerRef.current || coords.length === 0) return;

    let cancelled = false;

    import('leaflet').then((L) => {
      if (cancelled || !containerRef.current) return;

      // Tear down any previous instance on this div (StrictMode double-invoke)
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current, { zoomControl: true }).setView(
        [coords[0].lat, coords[0].lng],
        2
      );
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      for (const c of coords) {
        L.marker([c.lat, c.lng])
          .addTo(map)
          .bindPopup(`<span style="font-family:monospace;font-size:12px">${c.label}</span>`);
      }
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (coords.length === 0) {
    return (
      <div className="border p-4 text-xs text-center" style={{ borderColor: '#1a3322', color: '#00801f' }}>
        Map data not available.
      </div>
    );
  }

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      <div
        ref={containerRef}
        style={{
          height: 400,
          width: '100%',
          border: '1px solid #1a3322',
          filter: 'invert(1) hue-rotate(180deg) brightness(0.85)',
        }}
      />
      <p className="text-xs mt-1" style={{ color: '#00801f' }}>
        {coords.length} confirmed locations · OpenStreetMap
      </p>
    </>
  );
}
