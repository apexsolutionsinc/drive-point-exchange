'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Marquee } from '@/components/ui/marquee';

interface Brand {
  name: string;
  url: string;
  file: string;
  accent: string;
}

const brands: Brand[] = [
  { name: 'Toyota', url: 'https://www.toyota.com', file: 'toyota.png', accent: '#E63946' },
  { name: 'Honda', url: 'https://www.honda.com', file: 'honda.png', accent: '#457B9D' },
  { name: 'Ford', url: 'https://www.ford.com', file: 'ford.png', accent: '#1D3557' },
  { name: 'Chevrolet', url: 'https://www.chevrolet.com', file: 'chevrolet.png', accent: '#F4A261' },
  { name: 'BMW', url: 'https://www.bmw.com', file: 'bmw.png', accent: '#A8DADC' },
  { name: 'Mercedes-Benz', url: 'https://www.mercedes-benz.com', file: 'mercedes.png', accent: '#B0B0B0' },
  { name: 'Audi', url: 'https://www.audiusa.com', file: 'audi.png', accent: '#6C63FF' },
  { name: 'Nissan', url: 'https://www.nissanusa.com', file: 'nissan.png', accent: '#E76F51' },
  { name: 'Hyundai', url: 'https://www.hyundai.com', file: 'hyundai.png', accent: '#2A9D8F' },
  { name: 'Kia', url: 'https://www.kia.com', file: 'kia.png', accent: '#264653' },
  { name: 'Volkswagen', url: 'https://www.vw.com', file: 'volkswagen.png', accent: '#3A86FF' },
  { name: 'Subaru', url: 'https://www.subaru.com', file: 'subaru.png', accent: '#FFBE0B' },
  { name: 'Mazda', url: 'https://www.mazdausa.com', file: 'mazda.png', accent: '#D90429' },
  { name: 'Lexus', url: 'https://www.lexus.com', file: 'lexus.png', accent: '#FFD166' },
  { name: 'Jeep', url: 'https://www.jeep.com', file: 'jeep.png', accent: '#52B788' },
];

function BrandCard({ brand }: { brand: Brand }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  function handleMouse(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <a
      ref={cardRef}
      href={brand.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      className="group relative flex items-center justify-center w-[140px] h-[100px] transition-all duration-300 ease-out hover:scale-110 hover:z-20"
      aria-label={`${brand.name} — official website`}
    >
      <div
        className="absolute inset-0 rounded-lg border backdrop-blur-sm transition-all duration-500 ease-out"
        style={{
          backgroundColor: `${brand.accent}15`,
          borderColor: `${brand.accent}30`,
        }}
      />
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        style={{
          background: `radial-gradient(180px circle at ${mouse.x}% ${mouse.y}%, rgba(45,184,67,0.2) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        style={{
          background: `radial-gradient(60px circle at ${mouse.x}% ${mouse.y}%, rgba(45,184,67,0.5) 0%, transparent 70%)`,
        }}
      />
      <div className="absolute inset-[3px] rounded-md bg-white/90" />
      <Image
        src={`/brands/${brand.file}`}
        alt={brand.name}
        fill
        sizes="140px"
        className="relative z-10 object-contain p-4 transition-all duration-500 ease-out group-hover:scale-110"
      />
    </a>
  );
}

export function CarBrandMarquee() {
  return (
    <div className="relative w-full">
      {/* ── Grid watermark ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10L30 20L20 30L10 20Z' fill='none' stroke='%23fff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Fade edges ── */}
      <div className="absolute inset-y-0 left-0 w-48 z-10 bg-gradient-to-r from-slate-950/60 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 z-10 bg-gradient-to-l from-slate-950/60 to-transparent pointer-events-none" />

      {/* ── Logo gallery ── */}
      <div className="relative py-12">
        <Marquee pauseOnHover duration="50s" gap="2rem">
          {brands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </Marquee>
      </div>

      {/* ── Colophon ── */}
      <div className="relative pb-6">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white/90 px-6 py-4 border border-white/20">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              All policies administered by
            </span>
            <Image
              src="/brands/naac.png"
              alt="NAAC"
              width={200}
              height={80}
              className="h-12 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
