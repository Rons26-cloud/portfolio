import { profile } from "../data/profile.ts";
import { projects } from "../data/projects.ts";
import { skills } from "../data/skills.ts";
import { availableSocials } from "../data/socials.ts";
import type { ChatApiResponse } from "./chat-types.ts";

export type LocalIntent =
  | "GREETING"
  | "THANKS"
  | "FAREWELL"
  | "ABOUT"
  | "PROJECTS"
  | "PROJECT_DETAIL"
  | "SKILLS"
  | "CAPABILITIES"
  | "CONTACT";

export type LocalChatResponse = ChatApiResponse & {
  source: "local";
  intent: LocalIntent;
};

const normalize = (value: string) => value
  .toLocaleLowerCase("id-ID")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const exactPhrases = (input: string, phrases: readonly string[]) => phrases.includes(input);
const hasAny = (input: string, phrases: readonly string[]) => phrases.some((phrase) => input.includes(phrase));

function text(intent: LocalIntent, value: string): LocalChatResponse {
  return { source: "local", intent, type: "text", text: value };
}

function projectResponse(input: string): LocalChatResponse | null {
  const aliases: Array<{ slug: string; terms: string[] }> = [
    { slug: "niagantara", terms: ["niagantara", "niaga ntara", "niagntara"] },
    { slug: "dimsum-lumer", terms: ["dimsum lumer", "dimsum", "dim sum lumer"] },
    { slug: "breakbox", terms: ["breakbox", "break box"] },
    { slug: "petani-nusantara", terms: ["petani nusantara", "petani sawit nusantara", "petani sawit"] },
  ];
  const match = aliases.find((entry) => hasAny(input, entry.terms));
  if (!match) return null;
  const project = projects.find((entry) => entry.slug === match.slug);
  if (!project) return null;
  const technologyText = project.technologies.join(", ");
  return text("PROJECT_DETAIL", `${project.name} adalah ${project.category}. ${project.description} Teknologi: ${technologyText}. Lihat detail: /projects/${project.slug}`);
}

export function resolveLocalResponse(message: string): LocalChatResponse | null {
  const input = normalize(message);
  if (!input) return null;

  if (exactPhrases(input, ["halo", "hallo", "hai", "hi", "hello", "p", "pagi", "selamat pagi", "siang", "selamat siang", "sore", "selamat sore", "malam", "selamat malam"])) {
    return text("GREETING", `Halo! Ada yang ingin kamu tanyakan tentang ${profile.name} atau proyek yang ada di portfolio ini?`);
  }
  if (exactPhrases(input, ["terima kasih", "makasih", "makasi", "thanks", "thank you", "thx"])) {
    return text("THANKS", "Sama-sama! Senang bisa membantu. Kalau perlu, kamu bisa bertanya lagi tentang Xyrons, proyek, atau teknologi yang digunakan.");
  }
  if (exactPhrases(input, ["bye", "dah", "dadah", "sampai jumpa", "sampai nanti"])) {
    return text("FAREWELL", "Sampai jumpa! Semoga harimu menyenangkan.");
  }

  const detailedProject = projectResponse(input);
  if (detailedProject) return detailedProject;

  if (hasAny(input, ["lihat proyek", "lihat project", "daftar proyek", "daftar project", "proyek xyrons", "project xyrons", "proyek kamu", "project kamu", "proyek apa", "project apa"])) {
    const list = projects.map((project) => `${project.name} (/projects/${project.slug})`).join(", ");
    return text("PROJECTS", `Proyek unggulan Xyrons: ${list}. Kamu bisa menyebut nama proyek untuk melihat ringkasannya.`);
  }

  if (hasAny(input, ["skill", "keahlian", "bahasa pemrograman", "teknologi yang digunakan", "tech stack", "stack teknologi", "bisa teknologi apa"])) {
    const groups = skills.map((group) => `${group.category}: ${group.items.map((item) => item.name).join(", ")}`).join("; ");
    return text("SKILLS", `Keahlian dan teknologi Xyrons meliputi ${groups}.`);
  }

  if (hasAny(input, ["apa kelebihan", "kelebihan xyrons", "kemampuan xyrons", "bisa apa", "layanan xyrons", "apa yang dibangun"])) {
    return text("CAPABILITIES", `${profile.name} berfokus membangun website modern dan responsif, produk digital, aplikasi mobile, backend, serta pengalaman interaktif. Pendekatannya menekankan kode yang rapi, interaksi yang matang, dan perhatian pada detail.`);
  }

  if (hasAny(input, ["cara menghubungi", "hubungi xyrons", "kontak", "contact", "sosial media", "social media", "github", "instagram", "tiktok", "facebook", "xyronhub"])) {
    const links = availableSocials.map((social) => `${social.label}: ${social.url}`).join(" | ");
    return text("CONTACT", `Kamu dapat menghubungi atau mengikuti Xyrons melalui ${links}.`);
  }

  if (hasAny(input, ["siapa xyrons", "siap xyrons", "xyrons siapa", "tentang xyrons", "siapa kamu", "pembuat website", "pembuat situs", "developer website ini"])) {
    return text("ABOUT", `${profile.name} adalah ${profile.title} di balik portfolio ini. ${profile.description}`);
  }

  return null;
}
