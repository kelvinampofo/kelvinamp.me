import Page from "../../../components/page/Page";

export default function CraftEntryLayout({
  children,
}: LayoutProps<"/craft/[slug]">) {
  return <Page backTo="/craft">{children}</Page>;
}
