import { Heading } from "@chakra-ui/react";
import { InputForm } from "./components/InputForm";
import { JSX } from "react/jsx-runtime";

export default function Homepage(): JSX.Element {
  return (
    <>
      <Heading as="h3" size="xl" m={"3% 0% 2% 0%"}>
        URL Shortener
      </Heading>
      <InputForm />
    </>
  );
}
