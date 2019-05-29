import React, { useState, Fragment } from "react";
import { useTrail, animated } from "react-spring";

const items = ["V", "I", "K", "A", "S"];
const config = { mass: 5, tension: 2000, friction: 200 };

export default () => {
  const [toggle, set] = useState(true);
  const trails = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <React.Fragment>
      <h4>Use Trail</h4>
      <div className="trails-main" onClick={() => set(state => !state)}>
        {trails.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
            }}
          >
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </React.Fragment>
  );
};
