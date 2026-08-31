# Xyrons

Saya Xyrons, creative developer & digital builder. Portofolio ini berisi kumpulan proyek web dan mobile yang pernah saya kerjakan — dari landing page sampai aplikasi dengan database dan fitur interaktif.

## Teknologi

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide / React Icons

## Cara Menjalankan

Butuh Node.js 20.9+ dan pnpm 11.

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:3000`.

## Struktur Data

Konten portofolio diatur lewat file data agar gampang diedit tanpa menyentuh komponen:

- `src/data/profile.ts` — identitas dan deskripsi
- `src/data/projects.ts` — daftar proyek
- `src/data/skills.ts` — teknologi yang dikuasai
- `src/data/socials.ts` — tautan sosial
- `src/lib/translations.ts` — teks bahasa Indonesia dan Inggris

## Build

```bash
pnpm typecheck
pnpm lint
pnpm build
```
