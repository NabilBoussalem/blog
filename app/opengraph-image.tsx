import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fef9c3, #dcfce7, #e0f2fe)",
          color: "#065f46",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        Cold Summer Recipes
      </div>
    ),
    {
      ...size,
    },
  );
}
