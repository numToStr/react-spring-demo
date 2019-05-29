import React, { Fragment, useState } from "react";
import { animated, useSpring, useTrail } from "react-spring";

import classes from "./drawer.module.scss";

const initItems = ["Home", "About", "Projects", "Contact"];
const config = { mass: 1, tension: 170, friction: 18 };

export default ({ items = initItems }) => {
  const [show, setShow] = useState(0);
  const [hover, setHover] = useState(false);

  const showDrawer = () => setShow(v => !v);

  const props = useSpring({
    from: { x: 0 },
    to: {
      x: show ? 1 : 0
    }
  });

  const links = useTrail(items.length, {
    config,
    from: {
      opacity: 0,
      xy: [-50, -200],
      height: 0,
      letterSpacing: 0
    },
    to: {
      opacity: show ? 1 : 0,
      xy: show ? [0, 0] : [-50, -200],
      height: show ? 80 : 0,
      letterSpacing: hover ? 20 : 10,
      color: hover ? "#ff0" : "#fff"
    }
  });

  return (
    <Fragment>
      <button className={classes.DrawerButton} onClick={showDrawer}>
        Show
      </button>
      <animated.div
        className={classes.Drawer}
        style={{
          width: props.x
            .interpolate([0, 0.2, 0.5, 1], [0, 50, 80, 100])
            .interpolate(x => `${x}%`)
        }}
      >
        {links.map(({ xy, height, opacity, letterSpacing, color }, index) => (
          <animated.div
            key={items[index]}
            className={classes.DrawerLink}
            style={{
              opacity: opacity.interpolate([0, 0.7, 1], [0, 0.3, 1]),
              transform: xy.interpolate(
                (_x, _y) => `translate3d(${_x}%,${_y}px,0)`
              )
            }}
          >
            <animated.div
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ height, letterSpacing, color }}
            >
              <a href="#!">{items[index]}</a>
            </animated.div>
          </animated.div>
        ))}
      </animated.div>
      <p>This is should be selectable</p>
    </Fragment>
  );
};
