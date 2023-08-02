import React, { useEffect, useRef } from "react";

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let w;
    let h;

    const setCanvasExtents = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    setCanvasExtents();

    window.addEventListener("resize", setCanvasExtents);

    const makeStars = (count) => {
      const out = [];
      for (let i = 0; i < count; i++) {
        const s = {
          x: Math.random() * 1600 - 800,
          y: Math.random() * 900 - 450,
          z: Math.random() * 1000,
        };
        out.push(s);
      }
      return out;
    };

    //별 개수
    let stars = makeStars(2500);

    const clear = () => {
      context.fillStyle = "#030712";
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const putPixel = (x, y, brightness) => {
      const intensity = brightness * 255;
      const rgb = `rgb(${intensity},${intensity},${intensity})`;
      context.fillStyle = rgb;
      context.fillRect(x, y, 1, 1);
    };

    const moveStars = (distance) => {
      const count = stars.length;
      for (let i = 0; i < count; i++) {
        const s = stars[i];
        s.z -= distance;
        while (s.z <= 1) {
          s.z += 1000;
        }
      }
    };

    let prevTime;
    const init = (time) => {
      prevTime = time;
      requestAnimationFrame(tick);
    };

    const tick = (time) => {
      const elapsed = time - prevTime;
      prevTime = time;

      //속도 조정
      moveStars(elapsed * 0.05);

      clear();

      const cx = w / 2;
      const cy = h / 2;

      const count = stars.length;
      for (let i = 0; i < count; i++) {
        const star = stars[i];

        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);

        if (x < 0 || x >= w || y < 0 || y >= h) {
          continue;
        }

        const d = star.z / 1000.0;
        const b = 1 - d * d;

        putPixel(x, y, b);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(init);

    return () => {
      window.removeEventListener("resize", setCanvasExtents);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: "hidden",
        margin: 0,
        padding: 0,
        zIndex: -1,
      }}
    />
  );
};

export default Background;
