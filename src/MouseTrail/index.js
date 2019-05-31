import React, { Fragment, useState, useEffect } from "react";
import { animated, useTrail } from "react-spring";

import classes from "./mousetrail.module.scss";

// const items = [">", ">", ">", ">", ">", ">", ">", ">", ">"];
const items = Array.from({ length: 20 }, () => "*");

export default () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const trails = useTrail(items.length, {
    from: {
      xy: [0, 0],
      x: 0,
      y: 0
    },
    to: {
      xy: [coords.x, coords.y],
      x: coords.x,
      y: coords.y
    },
    config: {
      clamp: true
    }
  });

  useEffect(() => {
    const onMove = ({ clientX: x, clientY: y }) => setCoords({ x, y });

    window.addEventListener("mousemove", onMove);
  }, []);

  return (
    <Fragment>
      <div>{JSON.stringify(coords)}</div>
      {trails.map(({ xy, x, y }, index) => (
        <animated.span
          class={classes.Trail}
          key={index}
          style={{
            top: y,
            left: x
            // transform: xy.interpolate(
            //   (_x, _y) => `translate(${_x - window.innerWidth / 2}px,${_y}px)`
            // )
          }}
        >
          {items[index]}
        </animated.span>
      ))}
    </Fragment>
  );
};
