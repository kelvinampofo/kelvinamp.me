import Card from "../../../components/card/Card";
import Loading from "./components/Loading";

import type { ContentEntryMetadata } from "../../collection";

export const metadata: ContentEntryMetadata = {
  title: "Loading Indicators",
  description: "Simple loading state indicators.",
  publishedDate: "2023-11-11",
};

export default function LoadingIndicators() {
  return (
    <>
      <p>
        Simple loading state indicators. A little detail is the two stacked
        animations, one <code>linear</code>, the other eased with a custom{" "}
        <code>ease-in-out</code> curve—giving the second and third spinners a
        bit more “
        <a href="https://youtu.be/Fy0aCDmgnxg?si=dXJARNHwqKVE3PSe">juice</a>”.
      </p>
      <Card style={{ display: "flex", gap: "8px" }}>
        <Loading variant="ios-spinner" />
        <Loading variant="primary-spinner" />
        <Loading variant="secondary-spinner" />
        <Loading variant="loading-dots" />
        <Loading variant="loading-text" />
      </Card>
    </>
  );
}
