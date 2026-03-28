"use client";

import { useRef, useState, useCallback } from "react";

export interface DetectedRegion {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  confidence: number;
}

const MIN_DETECTION_SCORE = 0.4;

export function useCameraStream() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const motionLevelRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPersonDetected, setIsPersonDetected] = useState(false);
  const previousGrayRef = useRef<Uint8Array | null>(null);
  const regionsRef = useRef<DetectedRegion[]>([]);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.playsInline = true;
      video.muted = true;
      await video.play();
      videoRef.current = video;
      setIsReady(true);

      const tf = await import("@tensorflow/tfjs");
      await tf.ready();
      const cocoSsd = await import("@tensorflow-models/coco-ssd");
      const model = await cocoSsd.load({ base: "lite_mobilenet_v2" });

      const sampleW = 72;
      const sampleH = 54;
      const sampleCanvas = new OffscreenCanvas(sampleW, sampleH);
      const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

      let isActive = true;
      let isDetecting = false;

      const detectLoop = async () => {
        if (!isActive) return;
        if (!isDetecting && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          isDetecting = true;
          try {
            const predictions = await model.detect(video);
            regionsRef.current = predictions
              .filter((p) => p.score > MIN_DETECTION_SCORE)
              .map((p) => {
                const nx = p.bbox[0] / video.videoWidth;
                const ny = p.bbox[1] / video.videoHeight;
                const nw = p.bbox[2] / video.videoWidth;
                const nh = p.bbox[3] / video.videoHeight;
                const shrink = p.class === "person" ? 0.12 : 0;
                return {
                  x: nx + nw * shrink,
                  y: ny + nh * shrink,
                  w: nw * (1 - shrink * 2),
                  h: nh * (1 - shrink * 2),
                  label: p.class.toUpperCase(),
                  confidence: p.score,
                };
              });
            setIsPersonDetected(
              predictions.some((p) => p.class === "person" && p.score > MIN_DETECTION_SCORE),
            );
          } catch { /* silent */ }
          isDetecting = false;
        }
        if (isActive) setTimeout(detectLoop, 300);
      };

      const motionLoop = () => {
        if (!isActive) return;
        if (sampleCtx && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          sampleCtx.drawImage(video, 0, 0, sampleW, sampleH);
          const pixels = sampleCtx.getImageData(0, 0, sampleW, sampleH).data;
          const currentGray = new Uint8Array(sampleW * sampleH);
          for (let i = 0, p = 0; i < pixels.length; i += 4, p++) {
            currentGray[p] = (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) | 0;
          }
          const prev = previousGrayRef.current;
          if (prev) {
            let diffSum = 0;
            for (let i = 0; i < currentGray.length; i++) {
              diffSum += Math.abs(currentGray[i] - prev[i]);
            }
            const normalized = Math.min(1, Math.max(0, (diffSum / currentGray.length - 3) / 26));
            motionLevelRef.current = motionLevelRef.current * 0.78 + normalized * 0.22;
          }
          previousGrayRef.current = currentGray;
        }
        requestAnimationFrame(motionLoop);
      };

      detectLoop();
      requestAnimationFrame(motionLoop);

      return () => {
        isActive = false;
        stream.getTracks().forEach((t) => t.stop());
        video.srcObject = null;
        videoRef.current = null;
      };
    } catch {
      setHasError(true);
    }
    return undefined;
  }, []);

  return { videoRef, motionLevelRef, regionsRef, isReady, hasError, isPersonDetected, start };
}

export function captureFrameAsBase64(video: HTMLVideoElement): string {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.drawImage(video, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.85);
}
