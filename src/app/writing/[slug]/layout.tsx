import Heading from "../../../components/heading/Heading";
import Page from "../../../components/page/Page";
import { getContentEntry } from "../../../content/collection";

export default async function WritingEntryLayout({
  params,
  children,
}: LayoutProps<"/writing/[slug]">) {
  const { slug } = await params;
  const { title } = await getContentEntry("writing", slug);

  return (
    <Page backTo="/writing" focusMode>
      <Heading>{title}</Heading>
      {children}
    </Page>
  );
}
