import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState, FC } from "react";

const Toggle: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    document.body.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <Flex align="center" justify="center">
      <Button
        size="lg"
        colorPalette={isDark ? "orange" : "blue"}
        onClick={() => setIsDark((prev) => !prev)}
      >
        Toggle {isDark ? "dark" : "light"}
      </Button>
    </Flex>
  );
};

export default Toggle;
