import React from "react";
import { chakra, shouldForwardProp } from "@chakra-ui/react";

const BaseIcon = (props) => {
  var iconProps = {
    ...{ className: `${"icon ri-" + props.name + " " + props.className}` },
    ...(props.onClick && { onClick: props.onClick }),
  };

  return <i {...iconProps} />;
};

const Icon = chakra(BaseIcon, {
  shouldForwardProp: (prop) => {
    const isChakraProp = !shouldForwardProp(prop);
    if (isChakraProp) return false;
    return ["name", "onClick"].includes(prop);
  },
  baseStyle: (props) => {
    return {
      color: props.color || "currentcolor",
      fontSize: props.fontSize || "md",
    };
  },
});

export { Icon };
