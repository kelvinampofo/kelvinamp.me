import { createRoute, type ContentEntryModule } from "../../../content/route";

const entries = import.meta.glob<ContentEntryModule>(
  "../../../content/writing/*/index.tsx"
);

const writingRoute = createRoute("writing", (slug) =>
  entries[`../../../content/writing/${slug}/index.tsx`]?.()
);

export default writingRoute.EntryPage;
export const generateMetadata = writingRoute.generateMetadata;
export const generateStaticParams = writingRoute.generateStaticParams;

// disable dynamic fallback so unknown slugs immediately 404
export const dynamicParams = false;
