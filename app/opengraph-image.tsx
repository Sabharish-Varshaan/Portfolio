import { ImageResponse } from "next/og";

export const alt = "Sabharish Varshaan S, Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#07080b", color: "#e8ebf1", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", color: "#b6ff3b", fontSize: 30, letterSpacing: 4, textTransform: "uppercase" }}>Backend Engineer</div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 800, letterSpacing: -4, marginTop: 20 }}>Sabharish Varshaan S</div>
        <div style={{ display: "flex", fontSize: 38, color: "#8a93a6", marginTop: 24 }}>Secure, scalable APIs · Python · FastAPI · PostgreSQL</div>
      </div>
    ),
    size
  );
}
