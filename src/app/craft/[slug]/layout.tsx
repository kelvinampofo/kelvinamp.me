import Heading from "../../../components/heading/Heading";
import Page from "../../../components/page/Page";
import { getContentEntryModule } from "../../../content/collection";

export default async function CraftEntryLayout({
  params,
  children,
}: LayoutProps<"/craft/[slug]">) {
  const { slug } = await params;
  const { metadata } = await getContentEntryModule("craft", slug);

  return (
    <Page backTo="/craft">
      <Heading>{metadata.title}</Heading>
      {children}
    </Page>
  );
}
