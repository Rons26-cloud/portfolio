import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, color: "white", background: "radial-gradient(circle at 75% 20%,#342a80 0,#0a1020 35%,#05070b 75%)" }}><div style={{ color: "#78a1ff", fontSize: 28, marginBottom: 25 }}>Creative portfolio</div><div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -6 }}>{profile.brand}</div><div style={{ fontSize: 42, color: "#bdc5d6", marginTop: 20 }}>{profile.title}</div></div>, size); }
