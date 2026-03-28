import imgLeapScholarIconJpeg from "figma:asset/f079d52ef0cbd818e41ad86ed76b474839709c68.png";

/**
 * Canonical LeapScholar logo icon — matches the Figma Frame2-10-3211 component exactly.
 * Always renders as a circle. Pass `size` in px (number or string). Default 32.
 */
export function LeapLogoIcon({
  size = 32,
  shadow = false,
  border = false,
}: {
  size?: number | string;
  shadow?: boolean;
  border?: boolean;
}) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <div
      style={{
        width: px,
        height: px,
        borderRadius: "999px",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        backgroundColor: "#fff",
        boxShadow: shadow ? "0 2px 10px rgba(79,70,229,0.18)" : undefined,
        border: border ? "1.5px solid rgba(79,70,229,0.14)" : undefined,
      }}
    >
      <img
        src={imgLeapScholarIconJpeg}
        alt="LeapScholar"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
