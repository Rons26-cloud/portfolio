import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "niagantara", name: "NIAGANTARA", category: "Business Management Platform",
    description: "Platform management untuk bisnis, toko, cabang, user, operasional, dan dashboard.", image: "/assets/images/projects/niagantara.png",
    technologies: ["Next.js", "TypeScript", "Supabase"], githubUrl: "", liveUrl: "https://niagantara-web.pages.dev/",
    problem: "Operasional bisnis multi-cabang membutuhkan informasi yang terpusat dan alur kerja yang konsisten.",
    solution: "Satu platform terstruktur untuk mengelola bisnis, toko, cabang, pengguna, operasional, dan dashboard.",
    features: ["Manajemen bisnis dan cabang", "Kontrol pengguna", "Dashboard operasional"], screenshots: [],
  },
  {
    slug: "dimsum-lumer", name: "Dimsum Lumer", category: "E-Commerce & Mobile App",
    description: "Website dan aplikasi commerce untuk brand Dimsum Lumer.", image: "/assets/images/projects/dimsum-lumer.png",
    technologies: ["React", "Flutter", "Supabase"], githubUrl: "", liveUrl: "https://dimsum-lumerr.pages.dev/",
    problem: "Brand membutuhkan pengalaman commerce yang konsisten di web dan perangkat mobile.",
    solution: "Pengalaman belanja lintas platform dengan katalog dan data yang terintegrasi.",
    features: ["Katalog produk", "Pengalaman mobile", "Backend terintegrasi"], screenshots: [],
  },
  {
    slug: "breakbox", name: "BreakBox", category: "Business & Booking Experience",
    description: "Website untuk konsep bisnis BreakBox, booking, informasi ruangan, dan pengalaman pelanggan.", image: "https://raw.githubusercontent.com/xyrons/breakbox/main/preview.png",
    technologies: [], githubUrl: "", liveUrl: "",
    problem: "Pelanggan membutuhkan cara ringkas untuk memahami ruangan dan melakukan booking.",
    solution: "Website informatif yang menyatukan discovery, informasi ruangan, dan alur booking.",
    features: ["Informasi ruangan", "Alur booking", "Pengalaman pelanggan"], screenshots: [],
  },
  {
    slug: "petani-nusantara", name: "Petani Nusantara", category: "Open World Farming Game",
    description: "Game farming open world dengan ekonomi, multiplayer, kendaraan, perdagangan, dan sistem kehidupan virtual.", image: "https://raw.githubusercontent.com/xyrons/petani-nusantara/main/preview.png",
    technologies: ["Unity", "C#"], githubUrl: "", liveUrl: "",
    problem: "Membangun simulasi farming yang luas namun tetap menyatukan ekonomi dan interaksi pemain.",
    solution: "Dunia terbuka dengan sistem kehidupan, kendaraan, perdagangan, dan multiplayer yang saling terhubung.",
    features: ["Open world farming", "Ekonomi dan perdagangan", "Multiplayer dan kendaraan"], screenshots: [],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
