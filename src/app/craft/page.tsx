import Heading from "../../components/heading/Heading";
import List from "../../components/list/List";
import { getContentEntries } from "../../utils/content-collection";

export default async function CraftPage() {
  const entries = await getContentEntries("craft");

  return (
    <>
      <Heading>Craft</Heading>
      <p className="description">
        Collection of interfaces <em>&</em> interactions.
      </p>
      <List entries={entries} collection="craft" showDescription />
    </>
  );
}
