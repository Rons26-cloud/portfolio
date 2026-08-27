import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#111827,#080b12)", color: "#fff", fontSize: 38, fontWeight: 800, borderRadius: 14, border: "2px solid #4f7cff" }}>X</div>, size); }
