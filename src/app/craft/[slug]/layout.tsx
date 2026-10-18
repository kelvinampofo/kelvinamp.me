import Heading from "../../../components/heading/Heading";
import Page from "../../../components/page/Page";
import { getContentEntry } from "../../../content/collection";

export default async function CraftEntryLayout({
  params,
  children,
}: LayoutProps<"/craft/[slug]">) {
  const { slug } = await params;
  const { title } = await getContentEntry("craft", slug);

  return (
    <Page backTo="/craft">
      <Heading>{title}</Heading>
      {children}
    </Page>
  );
}
