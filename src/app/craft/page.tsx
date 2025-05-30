import Heading from "../../components/heading/Heading";
import List from "../../components/list/List";
import styles from "../../styles/layout.module.css";

import { getDemos } from "./utils";

export default async function CraftPage() {
  const demos = await getDemos();

  return (
    <>
      <Heading>Craft</Heading>
      <p className={styles.description}>
        Collection of web prototypes <em>&</em> interfaces.
      </p>
      <List
        items={demos}
        basePath="/craft"
        showDescription
        dateFormat="MMMM yyyy"
      />
    </>
  );
}
