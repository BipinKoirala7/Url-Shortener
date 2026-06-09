import { Heading } from "@chakra-ui/react";
import { useEffect, FC } from "react";
import { useParams } from "react-router-dom";

interface RouteParams {
  urlCode?: string;
}

const ShortUrlRedirect: FC = () => {
  const { urlCode } = useParams<keyof RouteParams>() as RouteParams;
  const serverBaseUrl = import.meta.env.VITE_APP_URI;

  const redirect = (): void => {
    let url = serverBaseUrl + `/${urlCode}`;
    window.location.replace(url);
  };

  useEffect(() => {
    if (urlCode) {
      redirect();
    }
  }, [urlCode]);

  return (
    <div>
      <Heading as="h3" size="xl" m={"3% 0% 2% 0%"}>
        Redirecting...
      </Heading>
    </div>
  );
};

export default ShortUrlRedirect;
