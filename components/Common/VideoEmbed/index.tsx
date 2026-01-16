import React from "react";

const getEmbedUrl = (url: string) => {
  if (!url) return null;

  // YOUTUBE
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id =
      url.split("v=")[1]?.split("&")[0] ||
      url.split("youtu.be/")[1]?.split("?")[0];

    return `https://www.youtube.com/embed/${id}`;
  }

  // VIMEO
  if (url.includes("vimeo.com")) {
    const id = url.split("vimeo.com/")[1].split("?")[0];
    return `https://player.vimeo.com/video/${id}`;
  }

  return null;
};

export default function VideoEmbed({ url, ratio = "16/9" }: { url: string; ratio?: string }) {
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) return null;

  return (
    <div style={{ position: "relative", paddingTop: ratio === "16/9" ? "56.25%" : "75%" }}>
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}