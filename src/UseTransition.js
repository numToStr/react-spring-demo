import React, { useState } from "react";
import { animated, useTransition } from "react-spring";

const Springs = () => {
  const [items] = useState([
    {
      key: "a9sd97",
      text: 1
    },
    {
      key: "aslkdjfkasdf",
      text: 2
    },
    {
      key: "ajdlfjkasfdaf4",
      text: 3
    },
    {
      key: "sdkfjlj",
      text: 4
    }
  ]);

  const transitions = useTransition(items, item => item.key, {
    from: { transform: "translate3d(0,-40px,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(0,-40px,0)" }
  });
  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      {item.text}
    </animated.div>
  ));
};

export default Springs;
