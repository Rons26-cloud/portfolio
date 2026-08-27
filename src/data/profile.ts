export const profile = {
  brand: "Xyrons",
  name: "Xyrons",
  title: "Creative Developer & Digital Builder",
  description:
    "I build modern, responsive websites and digital products with clean code, thoughtful interactions, and attention to detail.",
  profileImage: "",
  cvUrl: "",
  email: "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
} as const;

export const about = {
  description: "",
  focus: "",
  location: "",
} as const;

export const stats = [
  { label: "Projects", value: "" },
  { label: "Technologies", value: "" },
  { label: "GitHub", value: "" },
  { label: "Experience", value: "" },
] as const;
