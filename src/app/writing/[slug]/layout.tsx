import Page from "../../../components/page/Page";

export default function WritingEntryLayout({
  children,
}: LayoutProps<"/writing/[slug]">) {
  return (
    <Page backTo="/writing" focusMode>
      {children}
    </Page>
  );
}
