import { Metadata } from "next";

import Heading from "../components/heading/Heading";
import Page from "../components/page/Page";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <Page backTo="/">
      <Heading>404 — Not Found</Heading>
      <p>
        You know what else isn’t found? Those old Intel stickers on Windows
        machines—the ones with the hidden holographic chips on the back that
        nobody ever saw.
      </p>
    </Page>
  );
}
