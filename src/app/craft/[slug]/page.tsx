import { createRoute, type ContentEntryModule } from "../../../content/route";

const entries = import.meta.glob<ContentEntryModule>(
  "../../../content/craft/*/index.tsx"
);

const craftRoute = createRoute("craft", (slug) =>
  entries[`../../../content/craft/${slug}/index.tsx`]?.()
);

export default craftRoute.EntryPage;
export const generateMetadata = craftRoute.generateMetadata;
export const generateStaticParams = craftRoute.generateStaticParams;

// disable dynamic fallback so unknown slugs immediately 404
export const dynamicParams = false;
