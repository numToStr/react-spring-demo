import React, { useRef, useState, useEffect, useCallback } from "react";

import classes from "./mousetrailcanvas.module.scss";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lifetime = 0;
  }
}

export default () => {
  const [dims, setDims] = useState({
    height: 0,
    width: 0
  });
  const myCanvas = useRef(null);

  const { clientHeight, clientWidth } = document.body;

  const $setDims = useCallback(
    () =>
      setDims({
        height: clientHeight,
        width: clientWidth
      }),
    [clientHeight, clientWidth]
  );

  const startAnimation = useCallback(() => {
    const canvas = myCanvas.current;
    const ctx = canvas.getContext("2d");
    const points = [];

    const addPoint = (x, y) => {
      const point = new Point(x, y);
      points.push(point);
    };

    document.addEventListener("mousemove", ({ clientX, clientY }) => {
      addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    });

    const animatePoints = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const duration = (0.7 * (1 * 1000)) / 60; // Last 80% of a frame per point

      for (let i = 0; i < points.length; ++i) {
        const point = points[i];
        let lastPoint;

        if (points[i - 1] !== undefined) {
          lastPoint = points[i - 1];
        } else lastPoint = point;

        point.lifetime += 1;

        if (point.lifetime > duration) {
          // If the point dies, remove it.
          points.shift();
        } else {
          // Otherwise animate it:

          // As the lifetime goes on, lifePercent goes from 0 to 1.
          const lifePercent = point.lifetime / duration;
          const spreadRate = 7 * (1 - lifePercent);

          ctx.lineJoin = "round";
          ctx.lineWidth = spreadRate;

          // As time increases decrease r and b, increase g to go from purple to green.
          const red = Math.floor(190 - 190 * lifePercent);
          const green = 0;
          const blue = Math.floor(210 + 210 * lifePercent);
          ctx.strokeStyle = `rgb(${red},${green},${blue}`;

          ctx.beginPath();

          ctx.moveTo(lastPoint.x, lastPoint.y);
          ctx.lineTo(point.x, point.y);

          ctx.stroke();
          ctx.closePath();
        }
      }
      requestAnimationFrame(animatePoints);
    };

    animatePoints();
  }, [myCanvas]);

  useEffect(() => {
    $setDims();
    startAnimation();
  }, [$setDims, startAnimation]);

  return (
    <canvas
      className={classes.MyCanvas}
      ref={myCanvas}
      width={dims.width}
      height={dims.height}
    />
  );
};
