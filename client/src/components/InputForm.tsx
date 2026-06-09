import { useState, FC, ChangeEvent, KeyboardEvent } from "react";
import axios, { AxiosError } from "axios";
import {
  Box,
  Input,
  InputAddon,
  Button,
  Flex,
  Field,
  Text,
  Group,
} from "@chakra-ui/react";
import styles from "./InputForm.module.css";

interface InputState {
  longUrl: string;
  urlCode: string;
}

interface ApiResponse {
  urlCode: string;
  [key: string]: any;
}

interface ApiError {
  error: string;
}

export const InputForm: FC = () => {
  const [input, setInput] = useState<InputState>({ longUrl: "", urlCode: "" });
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const clientBaseUrl = window.location.href;
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
    setIsError(false);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleSubmit = (): void => {
    if (!input.longUrl) {
      setIsError(true);
      setUrl("Please add a URL");
      return;
    }
    setIsLoading(true);
    const backendUrl = import.meta.env.VITE_APP_URI;
    axios
      .post<ApiResponse>(`${backendUrl}/api/url/shorten`, input)
      .then((res) => {
        if (res.status) {
          let createUrl = clientBaseUrl + res.data.urlCode;
          setUrl(createUrl);
        }
        setIsLoading(false);
      })
      .catch((error: AxiosError<ApiError>) => {
        let errorMsg = error.response?.data?.error || error.message;
        setUrl(errorMsg);
        setIsLoading(false);
      });
  };

  return (
    <Box
      width="40%"
      margin="auto"
      boxShadow="dark-lg"
      p="6"
      rounded="2xl"
      className={styles.mainContainer}
    >
      {/* Long URL input */}
      <Field.Root invalid={isError} mb={4}>
        <Field.Label>
          Convert long URLs into shortened versions with a single click.
        </Field.Label>
        <Field.HelperText>Enter your Long URL</Field.HelperText>
        <Input
          id="longUrl"
          type="url"
          value={input.longUrl}
          placeholder="Paste here your long URL"
          onChange={handleInputChange}
          onKeyDown={handleEnter}
        />
        {!isError ? (
          <Field.HelperText></Field.HelperText>
        ) : (
          <Field.ErrorText>URL is required.</Field.ErrorText>
        )}
      </Field.Root>

      <Field.Root mb={4}>
        <Field.Label fontSize="md">
          Create personalized and memorable links (Optional)
        </Field.Label>
        <Group width="100%">
          <InputAddon className={styles.BaseUrlAddon} outline={"none"}>
            <Text
              fontSize="xs"
              whiteSpace="nowrap"
              maxW="100%"
              overflow="hidden"
              textOverflow="ellipsis"
              outline={"none"}
            >
              {clientBaseUrl}
            </Text>
          </InputAddon>
          <Input
            placeholder="your personalized code"
            id="urlCode"
            type="text"
            value={input.urlCode}
            onChange={handleInputChange}
            onKeyDown={handleEnter}
          />
        </Group>
      </Field.Root>

      <Button
        colorPalette="blue"
        m={5}
        onClick={handleSubmit}
        loading={isLoading}
        loadingText="Submitting"
      >
        Submit
      </Button>

      {url && (
        <Flex mb={2}>
          <Input value={url} readOnly placeholder="Short URL" />
          <Button onClick={handleCopy} ml={2}>
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </Flex>
      )}
    </Box>
  );
};
