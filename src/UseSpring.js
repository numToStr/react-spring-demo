import React, { Fragment } from "react";
import { animated, useSpring, config } from "react-spring";

export default () => {
  const props = useSpring({
    from: { opacity: 0, fontSize: 0 },
    to: async next => {
      while (true) {
        await next({ opacity: 1, fontSize: 20 });
        await next({ opacity: 0, fontSize: 0 });
        await next({ opacity: 1, fontSize: 20 });
      }
    },
    config: config.wobbly
  });
  return (
    <Fragment>
      <div class="spring-main">
        <h4>Use Spring</h4>
        <animated.div style={props}>Hello World</animated.div>
      </div>
    </Fragment>
  );
};
