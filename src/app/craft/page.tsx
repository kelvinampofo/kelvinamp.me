import Heading from "../../components/heading/Heading";
import List from "../../components/list/List";
import { getEntries } from "../../utils/entries";

export default async function CraftPage() {
  const demos = await getEntries("craft");

  return (
    <>
      <Heading>Craft</Heading>
      <p className="description">
        Collection of interfaces <em>&</em> interactions.
      </p>
      <List items={demos} kind="craft" basePath="/craft" showDescription />
    </>
  );
}
