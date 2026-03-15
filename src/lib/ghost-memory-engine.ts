export const CHANGE_THRESHOLD = 8;
export const QUICK_INTERVAL_MS = 3000;
export const FULL_INTERVAL_MS = 30000;

/**
 * השוואת pixel diff בין שני ImageData buffers.
 * מחזיר אחוז הפיקסלים שהשתנו (0-100).
 */
export function computePixelDiff(
  prevData: Uint8ClampedArray,
  currData: Uint8ClampedArray,
  width: number,
  height: number
): number {
  if (prevData.length !== currData.length) return 100;

  const totalPixels = width * height;
  const channelThreshold = 30;
  let changedPixels = 0;

  for (let i = 0; i < prevData.length; i += 4) {
    const dr = Math.abs(prevData[i] - currData[i]);
    const dg = Math.abs(prevData[i + 1] - currData[i + 1]);
    const db = Math.abs(prevData[i + 2] - currData[i + 2]);

    if (dr > channelThreshold || dg > channelThreshold || db > channelThreshold) {
      changedPixels++;
    }
  }

  return (changedPixels / totalPixels) * 100;
}

/**
 * לכידת frame מ-video element והמרה ל-base64 data URL.
 * מחזיר גם את ה-ImageData לצורך השוואת pixel diff.
 */
export function captureFrame(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  targetWidth = 512
): { dataUrl: string; imageData: ImageData } | null {
  if (!video.videoWidth || !video.videoHeight) return null;

  const scale = targetWidth / video.videoWidth;
  const w = targetWidth;
  const h = Math.round(video.videoHeight * scale);

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(video, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.7);

  return { dataUrl, imageData };
}

export function formatTimestamp(): string {
  return new Date().toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
