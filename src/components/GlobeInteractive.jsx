import React, { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";

const defaultMarkers = [
  { id: "sp", location: [-23.5505, -46.6333], name: "SP" },
  { id: "mt", location: [-12.6819, -56.9211], name: "MT" },
  { id: "go", location: [-16.6869, -49.2648], name: "GO" },
  { id: "pr", location: [-25.2521, -52.0215], name: "PR" },
  { id: "ms", location: [-20.4428, -54.6191], name: "MS" },
  { id: "sc", location: [-27.5969, -48.5495], name: "SC" },
  { id: "rs", location: [-30.0346, -51.2177], name: "RS" },
  { id: "london", location: [51.5074, -0.1278], name: "LONDRES" },
];

export function GlobeInteractive({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
}) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe = null;
    let animationId;
    let phi = 3.5;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0) return;
      if (globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width, height: width * 1.05, // slightly oval to compensate for any optical flattening
        phi: 3.5, theta: 0.2, dark: 0, diffuse: 1.2,
        mapSamples: 20000, mapBrightness: 6,
        baseColor: [1, 1, 1], 
        markerColor: [0, 0.83, 1], 
        glowColor: [0.98, 0.98, 0.98], 
        markerElevation: 0,
        markers: markers.map((m) => ({ location: m.location, size: 0.06 })),
        arcs: [], arcColor: [0, 0.83, 1],
        arcWidth: 0.5, arcHeight: 0.25, opacity: 0.8,
      });

      function animate() {
        if (!isPausedRef.current) phi += speed;
        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => canvas && (canvas.style.opacity = "1"));
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [markers, speed]);

  return (
    <div className={`relative flex items-center justify-center max-w-[700px] mx-auto w-full pt-8 pb-16 ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", aspectRatio: "1 / 1.05", cursor: "grab", opacity: 0,
          transition: "opacity 1.2s ease", borderRadius: "50%", touchAction: "none",
          filter: "drop-shadow(0px 0px 60px rgba(0,212,255,0.4))",
        }}
      />
    </div>
  );
}
