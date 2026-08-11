import Heading from "../../../components/heading/Heading";
import Page from "../../../components/page/Page";
import { getContentEntryModule } from "../../../content/collection";

export default async function WritingEntryLayout({
  params,
  children,
}: LayoutProps<"/writing/[slug]">) {
  const { slug } = await params;
  const { metadata } = await getContentEntryModule("writing", slug);

  return (
    <Page backTo="/writing" focusMode>
      <Heading>{metadata.title}</Heading>
      {children}
    </Page>
  );
}
