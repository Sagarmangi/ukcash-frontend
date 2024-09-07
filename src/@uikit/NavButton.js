import React from "react";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Icon } from "./Icon";

const NavButton = ({
  to,
  icon,
  label,
  showIcon,
  //   color = "flat.green",
  color,
  colorScheme,
  ...rest
}) => {
  return (
    <Button
      as={NavLink}
      to={to}
      fontWeight="500"
      {...(showIcon && {
        leftIcon: <Icon mr="1.5" fontSize="1.5rem" name={icon} color={color} />,
      })}
      _active={{ bg: "rgba(0,0,0,0.15)" }}
      bg="transparent"
      _hover={{
        bg: "rgba(0,0,0,0.15)",
        textDecoration: "none",
        _text: { textDecoration: "none" },
      }}
      borderLeft="3px solid transparent"
      rounded="none"
      color={color}
      fontSize="15px"
      shadow="none"
      w="100%"
      h="58px"
      justifyContent="flex-start"
      textAlign="left"
      pl={showIcon ? 3 : 9}
      className={`${"dash-nav " + colorScheme || ""}`}
      {...rest}
    >
      {label}
    </Button>
  );
};

export { NavButton };
