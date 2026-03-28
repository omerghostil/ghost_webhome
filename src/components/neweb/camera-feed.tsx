"use client";

import { useRef, useEffect } from "react";
import type { DetectedRegion } from "./use-camera-stream";

const LERP = 0.18;
const MAX_STALE = 12;

interface SmoothBox {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  confidence: number;
  stale: number;
}

interface CameraFeedProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  motionLevelRef: React.RefObject<number>;
  regionsRef: React.RefObject<DetectedRegion[]>;
}

export function CameraFeed({ videoRef, motionLevelRef, regionsRef }: CameraFeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let dx = 0, dy = 0, dw = 0, dh = 0;
    let lastVw = 0, lastVh = 0;
    const smoothBoxes: SmoothBox[] = [];

    const updateCover = (vw: number, vh: number) => {
      if (vw === lastVw && vh === lastVh) return;
      lastVw = vw;
      lastVh = vh;
      const vAspect = vw / vh;
      const cAspect = w / h;
      if (vAspect > cAspect) {
        dh = h; dw = h * vAspect; dx = (w - dw) / 2; dy = 0;
      } else {
        dw = w; dh = w / vAspect; dx = 0; dy = (h - dh) / 2;
      }
    };

    const matchAndSmooth = (targets: DetectedRegion[]) => {
      const used = new Set<number>();
      for (const sb of smoothBoxes) {
        let bestIdx = -1;
        let bestDist = Infinity;
        const scx = sb.x + sb.w / 2;
        const scy = sb.y + sb.h / 2;
        for (let i = 0; i < targets.length; i++) {
          if (used.has(i) || targets[i].label !== sb.label) continue;
          const tcx = targets[i].x + targets[i].w / 2;
          const tcy = targets[i].y + targets[i].h / 2;
          const dist = Math.hypot(tcx - scx, tcy - scy);
          if (dist < bestDist && dist < 0.3) { bestDist = dist; bestIdx = i; }
        }
        if (bestIdx >= 0) {
          const t = targets[bestIdx];
          sb.x += (t.x - sb.x) * LERP;
          sb.y += (t.y - sb.y) * LERP;
          sb.w += (t.w - sb.w) * LERP;
          sb.h += (t.h - sb.h) * LERP;
          sb.confidence += (t.confidence - sb.confidence) * LERP;
          sb.stale = 0;
          used.add(bestIdx);
        } else {
          sb.stale++;
        }
      }
      for (let i = smoothBoxes.length - 1; i >= 0; i--) {
        if (smoothBoxes[i].stale > MAX_STALE) smoothBoxes.splice(i, 1);
      }
      for (let i = 0; i < targets.length; i++) {
        if (used.has(i)) continue;
        const t = targets[i];
        smoothBoxes.push({ ...t, stale: 0 });
      }
    };

    const drawBox = (
      bx: number, by: number, bw: number, bh: number,
      label: string, conf: number, alpha: number,
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      const cornerLen = Math.min(bw, bh) * 0.18;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 1.5;
      const corners = [
        [bx, by + cornerLen, bx, by, bx + cornerLen, by],
        [bx + bw - cornerLen, by, bx + bw, by, bx + bw, by + cornerLen],
        [bx, by + bh - cornerLen, bx, by + bh, bx + cornerLen, by + bh],
        [bx + bw - cornerLen, by + bh, bx + bw, by + bh, bx + bw, by + bh - cornerLen],
      ];
      for (const [x1, y1, x2, y2, x3, y3] of corners) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();
      }

      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.strokeRect(bx, by, bw, bh);
      ctx.setLineDash([]);

      const text = `${label} ${(conf * 100).toFixed(0)}%`;
      ctx.font = "10px system-ui, sans-serif";
      const tw = ctx.measureText(text).width;
      ctx.fillStyle = "rgba(10, 10, 10, 0.7)";
      ctx.fillRect(bx, by - 16, tw + 10, 15);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillText(text, bx + 5, by - 4);

      ctx.restore();
    };

    let frame: number;

    const render = () => {
      const video = videoRef.current;
      const motion = Math.min(1, Math.max(0, motionLevelRef.current));
      ctx.clearRect(0, 0, w, h);

      if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.videoWidth > 0) {
        updateCover(video.videoWidth, video.videoHeight);
        matchAndSmooth(regionsRef.current);

        ctx.save();
        ctx.filter = "grayscale(1) contrast(1.15) brightness(0.8)";
        ctx.globalAlpha = 0.55 + motion * 0.15;
        ctx.drawImage(video, dx, dy, dw, dh);
        ctx.restore();

        for (const sb of smoothBoxes) {
          const bx = dx + sb.x * dw;
          const by = dy + sb.y * dh;
          const bw = sb.w * dw;
          const bh = sb.h * dh;
          const fadeAlpha = Math.max(0, 1 - sb.stale / MAX_STALE);

          ctx.save();
          ctx.globalAlpha = 0.18 * fadeAlpha;
          ctx.beginPath();
          ctx.rect(bx, by, bw, bh);
          ctx.clip();
          ctx.filter = "grayscale(0.4) contrast(1.2) brightness(1.05)";
          ctx.drawImage(video, dx, dy, dw, dh);
          ctx.restore();

          drawBox(bx, by, bw, bh, sb.label, sb.confidence, fadeAlpha);
        }
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [videoRef, motionLevelRef, regionsRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
