import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RealtyWize — Premium Property Listings in Noida & NCR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #062014 0%, #173124 50%, #1a3a28 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#7eb89a",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 30,
              fontWeight: 500,
            }}
          >
            RealtyWize
          </div>
          <div
            style={{
              fontSize: 80,
              color: "white",
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 1000,
              marginBottom: 30,
            }}
          >
            Premium Property Listings
          </div>
          <div
            style={{
              fontSize: 36,
              color: "rgba(255,255,255,0.7)",
              fontWeight: 300,
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Noida · NCR · Yamuna Expressway Corridor
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
